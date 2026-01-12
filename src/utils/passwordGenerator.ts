
// Basic word list for passphrase generation
const WORD_LIST = [
    "abuse", "adult", "agent", "anger", "apple", "award", "basis", "beach", "birth", "block", "blood", "board", "brain", "bread", "break", "brown", "buyer", "cause", "chain", "chair", "chest", "chief", "child", "china", "claim", "class", "clock", "coach", "coast", "court", "cover", "cream", "crime", "cross", "crowd", "crown", "cycle", "dance", "death", "depth", "doubt", "draft", "drama", "dream", "dress", "drink", "drive", "earth", "enemy", "entry", "error", "event", "faith", "fault", "field", "fight", "final", "floor", "focus", "force", "frame", "frank", "front", "fruit", "glass", "grant", "grass", "green", "group", "guide", "heart", "henry", "horse", "hotel", "house", "image", "index", "input", "issue", "japan", "jones", "judge", "knife", "layer", "level", "light", "limit", "lunch", "major", "march", "match", "metal", "model", "money", "month", "motor", "mouth", "music", "night", "noise", "north", "novel", "nurse", "offer", "order", "other", "owner", "panel", "paper", "party", "peace", "phase", "phone", "piece", "pilot", "pitch", "place", "plane", "plant", "plate", "point", "pound", "power", "press", "price", "pride", "prize", "proof", "queen", "radio", "range", "ratio", "reply", "right", "river", "round", "route", "rugby", "scale", "scene", "scope", "score", "sense", "shape", "share", "sheep", "sheet", "shift", "shirt", "shock", "sight", "simon", "skill", "sleep", "smile", "smith", "smoke", "sound", "south", "space", "speed", "spite", "sport", "squad", "staff", "stage", "start", "state", "steam", "steel", "stock", "stone", "store", "study", "stuff", "style", "sugar", "table", "taste", "terry", "theme", "thing", "title", "total", "touch", "tower", "track", "trade", "train", "trend", "trial", "trust", "truth", "uncle", "union", "unity", "value", "video", "visit", "voice", "waste", "watch", "water", "while", "white", "whole", "woman", "world", "write", "youth"
];

export type GenerationMode = 'random' | 'pronounceable' | 'passphrase';

export interface GeneratorOptions {
    length: number;
    useUppercase: boolean;
    useLowercase: boolean;
    useNumbers: boolean;
    useSymbols: boolean;
    excludeSimilar: boolean;
    separator?: string; // For passphrases
    capitalize?: boolean; // For passphrases
}

const CHAR_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    similar: 'Il1O05S2Z', // Characters that are often confused
};

export const generatePassword = (mode: GenerationMode, options: GeneratorOptions): string => {
    switch (mode) {
        case 'passphrase':
            return generatePassphrase(options);
        case 'pronounceable':
            // For pronounceable, we often stick to a simpler alternating pattern
            // Length here is strictly character count
            return generatePronounceable(options);
        case 'random':
        default:
            return generateRandom(options);
    }
};

const getCryptoRandom = (max: number): number => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
};

const generateRandom = (options: GeneratorOptions): string => {
    let charset = '';
    if (options.useLowercase) charset += CHAR_SETS.lowercase;
    if (options.useUppercase) charset += CHAR_SETS.uppercase;
    if (options.useNumbers) charset += CHAR_SETS.numbers;
    if (options.useSymbols) charset += CHAR_SETS.symbols;

    if (options.excludeSimilar) {
        // Remove similar chars
        // This is a simple regex replace for each char in similar string
        const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const similarChars = options.excludeSimilar ? CHAR_SETS.similar.split('') : [];
        similarChars.forEach(char => {
            charset = charset.replace(new RegExp(escapeRegExp(char), 'g'), '');
        });
    }

    if (charset.length === 0) return ''; // Fallback or empty

    let password = '';
    for (let i = 0; i < options.length; i++) {
        const randomIndex = getCryptoRandom(charset.length);
        password += charset[randomIndex];
    }

    return password;
};

const generatePronounceable = (options: GeneratorOptions): string => {
    // Simple CQC or CVC pattern
    // Consonants and Vowels
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const vowels = 'aeiou';

    let password = '';

    // We try to alternate.
    // If length is large, just repeat pattern.
    for (let i = 0; i < options.length; i++) {
        let char = '';
        if (i % 2 === 0) {
            char = consonants[getCryptoRandom(consonants.length)];
        } else {
            char = vowels[getCryptoRandom(vowels.length)];
        }

        // Apply casing
        if (options.useUppercase && (i === 0 || (options.useUppercase && Math.random() > 0.8 && i > 0))) {
            // Simple logic: Capitalize first usually, or random if requested.
            // Actually, for pronounceable, sticking to lowercase is easier to read, 
            // but if user wants Uppercase, we should add some.
            // Let's just capitalize the first letter if Uppercase is selected, 
            // or maybe scatter them if needed, but strictly 'pronounceable' mostly implies word-like.
            // Let's Capitalize first letter if useUppercase is true.
        }

        // We need to adhere to options strictly? 
        // If user wants numbers, we often append them in pronounceable passwords.
        // If users wants symbols, we append them.

        password += char;
    }

    // Post-processing to satisfy requirements
    // If useUppercase, uppercase the first char?
    if (options.useUppercase) {
        password = password.charAt(0).toUpperCase() + password.slice(1);
    }

    // If useNumbers, append or replace? Appending numbers at the end is common for "Pronounceable"
    if (options.useNumbers) {
        // Replace last chars? Or just append? 
        // Length is fixed. So we might need to replace pattern logic.
        // Let's replace the last 1 or 2 chars if length permits.
        if (options.length > 2) {
            password = password.slice(0, -2) + getCryptoRandom(10) + getCryptoRandom(10);
        }
    }

    // If useSymbols
    if (options.useSymbols) {
        if (options.length > 3) {
            password = password.slice(0, -1) + CHAR_SETS.symbols[getCryptoRandom(CHAR_SETS.symbols.length)];
        }
    }

    return password;
}

const generatePassphrase = (options: GeneratorOptions): string => {
    // Length for passphrase usually effectively means "Word Count"
    // But the UI slider is 8-64 chars.
    // We might need to map or just use a different logic.
    // Assuming the UI will pass a reasonable "Word Count" if mode is passphrase.
    // Or we try to fill 'length' with words.

    // Let's assume options.length is passed as "Character length" from the slider.
    // A standard passphrase word is ~5 chars.
    // If length is 20, we fit ~3-4 words.

    let password = '';
    let words = [];

    // Try to fit words until length is reached
    while (password.length < options.length) {
        const word = WORD_LIST[getCryptoRandom(WORD_LIST.length)];
        words.push(options.capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word);
        password = words.join(options.separator || '-');

        if (password.length > options.length + 5) break;
    }

    // If we slightly overshot or undershot, it's okay for passphrase usually, 
    // but if we need strict length, we might trim, but trimming a word breaks "passphrase".
    // The slider for Passphrase mode should probably control "Word Count" directly in the UI.
    // For now, let's just return the joined words.

    // Enhancer: "Use Numbers" -> add number to one of the words?
    if (options.useNumbers) {
        words[0] = words[0] + getCryptoRandom(10);
    }
    if (options.useSymbols) {
        words[words.length - 1] = words[words.length - 1] + '!';
    }

    return words.join(options.separator || '-');
};
