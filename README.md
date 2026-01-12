
# 🔐 SecureGen — Intelligent Password & Passphrase Generator

![SecureGen Banner](https://via.placeholder.com/1200x600/0f172a/60a5fa?text=SecureGen+Password+Generator)

> **One-line Pitch**: A security-first smart password generator that creates cryptographically secure passwords, visualizes entropy, estimates crack time, and supports passphrases, human-readable, and paranoia modes using modern web cryptography APIs.

## 🧠 Problem Statement

Most people reuse weak passwords, don’t understand what "strong" means, or use unsafe generators. **SecureGen** solves this with:
*   **Cryptographically Secure Randomness**: Uses `crypto.getRandomValues()` instead of `Math.random()`.
*   **Real-time Analysis**: Instant feedback on entropy and crack time.
*   **Privacy First**: 100% client-side, zero data leaves the device.

## ✅ Core Features

### 1. Generation Engine
*   **Modes**: Random, Human-readable (Pronounceable), Passphrase (XKCD style), and Paranoia.
*   **Customization**: Length (8-64), Uppercase, Lowercase, Numbers, Symbols, Exclude Similar.
*   **Security**: Web Crypto API for true randomness.

### 2. Strength Analysis
*   Real-time strength meter (Weak → Ultra).
*   Entropy calculation in bits.
*   Estimated time to crack (Brute-force estimation).
*   Pattern detection warnings.

### 3. Security Modes
*   **🔒 Normal Mode**: Full control.
*   **🧠 Smart Mode**: Pattern avoidance tips.
*   **☢️ Paranoia Mode**: Forces 32+ chars, all charsets, max entropy settings.

## 🧱 Tech Stack

*   **Frontend**: React (TypeScript) + Vite
*   **Styling**: Tailwind CSS + Glassmorphism
*   **Icons**: Lucide React
*   **Crypto**: Web Crypto API (Native browser support)
*   **Deployment**: Static (Netlify/Vercel compatible)

## 📸 Screenshots

*(To be added after deployment - Planned screenshots)*
1.  **Home Screen**: Main generator interface with glassmorphism UI.
2.  **Paranoia Mode**: Warning UI with high-entropy stream.
3.  **Strength Breakdown**: Visual indicators for bits and crack time.

## 🚀 Getting Started

1.  **Clone the repo**
    ```bash
    git clone https://github.com/yourusername/secure-gen.git
    cd secure-gen
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Locally**
    ```bash
    npm run dev
    ```

## 🛡️ Security Architecture

*   **Client-Side Only**: No backend server. No database.
*   **Memory Safety**: Passwords are generated in memory and cleared on page refresh (React state).
*   **No Logging**: No analytics or tracking scripts.

## 🏆 Resume Points

*   Designed and built a **security-focussed password generator** using **Web Crypto API** with entropy analysis and crack-time estimation.
*   Implemented **real-time strength analysis algorithms** to calculate entropy bits and detect common weak patterns.
*   Built a **fully client-side architecture** ensuring zero storage, zero logging, and complete user privacy.
*   Designed a **premium UI** with glassmorphism, responsive layout, and interactive micro-animations using **Tailwind CSS**.

---
*Built with ❤️ and 🔐 by [Your Name]*
