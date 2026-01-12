
export interface StrengthResult {
    score: number; // 0-4
    label: string; // Weak, Fair, Good, Strong, Ultra
    entropy: number;
    crackTime: string;
    tips: string[];
}

export const analyzeStrength = (password: string): StrengthResult => {
    if (!password) return { score: 0, label: 'Empty', entropy: 0, crackTime: '0s', tips: [] };

    // 1. Calculate Entropy
    const poolSize = getPoolSize(password);
    const entropy = Math.log2(Math.pow(poolSize, password.length));

    // 2. Estimate Crack Time (Offline Fast Crack)
    // Assuming a powerful cracking rig can doing 100 Billion guesses/sec (very high end) for MD5,
    // but for complex hashes it's slower. Let's assume 10^10 guesses/second as a conservative "fast" offline attack.
    const guessesPerSecond = 1e10;
    const seconds = Math.pow(poolSize, password.length) / guessesPerSecond;

    const crackTime = formatTime(seconds);

    // 3. Determine Score Pattern Penalties
    let score = 0;
    // Based strictly on Entropy for base score
    if (entropy > 128) score = 4;
    else if (entropy > 80) score = 3;
    else if (entropy > 60) score = 2;
    else if (entropy > 35) score = 1;
    else score = 0;

    // Patterns check
    const tips: string[] = [];
    if (password.length < 12 && entropy > 50) {
        tips.push("Length is the most important factor. Aim for 12+ characters.");
    }
    if (!/[A-Z]/.test(password)) tips.push("Add uppercase letters to increase strength.");
    if (!/[0-9]/.test(password)) tips.push("Add numbers to increase strength.");
    if (!/[^A-Za-z0-9]/.test(password)) tips.push("Add symbols for extra security.");

    // Deduct for very bad patterns
    if (/^[a-zA-Z]+$/.test(password) && password.length < 10) {
        // Only letters and short
        score = Math.min(score, 1);
    }

    if (/^123/.test(password) || /qwerty/i.test(password)) {
        tips.push("Avoid common keyboard patterns like 'qwerty' or '123'.");
        score = Math.max(0, score - 1);
    }

    const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Ultra'];

    return {
        score,
        label: labels[score],
        entropy: Math.round(entropy),
        crackTime,
        tips,
    };
};

const getPoolSize = (password: string): number => {
    let pool = 0;
    if (/[a-z]/.test(password)) pool += 26;
    if (/[A-Z]/.test(password)) pool += 26;
    if (/[0-9]/.test(password)) pool += 10;
    if (/[^A-Za-z0-9]/.test(password)) pool += 32;
    return pool === 0 ? 1 : pool;
};

const formatTime = (seconds: number): string => {
    if (seconds < 1) return 'Instant';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
    if (seconds < 315360000000) return `${Math.round(seconds / 3153600000)} centuries`;
    return 'Forever';
};
