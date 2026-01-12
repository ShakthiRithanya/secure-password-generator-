
import React, { useState } from 'react';
import { Copy, RefreshCw, Eye, EyeOff, Check } from 'lucide-react';

interface PasswordDisplayProps {
    password: string;
    onGenerate: () => void;
}

export const PasswordDisplay: React.FC<PasswordDisplayProps> = ({ password, onGenerate }) => {
    const [hidden, setHidden] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!password) return;
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full relative group">
            <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[160px] transition-all duration-300 hover:shadow-2xl hover:bg-white/10">

                {/* Password Text */}
                <div className="w-full text-center relative mb-6">
                    <div
                        className={`font-mono text-3xl md:text-5xl font-bold break-all tracking-tight transition-all duration-300 ${hidden ? 'blur-md select-none' : ''} ${!password ? 'text-white/30' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300'}`}
                    >
                        {password || "Gener@t0r"}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 rounded-full glass-button text-sm font-medium hover:scale-105 active:scale-95"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                        onClick={onGenerate}
                        className="p-2 rounded-full glass-button hover:rotate-180 transition-transform duration-500"
                        title="Generate new"
                    >
                        <RefreshCw size={20} />
                    </button>

                    <button
                        onClick={() => setHidden(!hidden)}
                        className="p-2 rounded-full glass-button hover:scale-105"
                        title={hidden ? "Show password" : "Hide password"}
                    >
                        {hidden ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};
