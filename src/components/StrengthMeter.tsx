
import React from 'react';
import type { StrengthResult } from '../utils/strengthAnalyzer';
import { Shield, ShieldAlert, ShieldCheck, Clock, Brain } from 'lucide-react';

interface StrengthMeterProps {
    strength: StrengthResult;
}

export const StrengthMeter: React.FC<StrengthMeterProps> = ({ strength }) => {
    const getColor = (score: number) => {
        switch (score) {
            case 0: return 'bg-red-500';
            case 1: return 'bg-orange-500';
            case 2: return 'bg-yellow-500';
            case 3: return 'bg-blue-500';
            case 4: return 'bg-green-500'; // Ultra
            default: return 'bg-gray-500';
        }
    };

    const getLabelColor = (score: number) => {
        switch (score) {
            case 0: return 'text-red-400';
            case 1: return 'text-orange-400';
            case 2: return 'text-yellow-400';
            case 3: return 'text-blue-400';
            case 4: return 'text-green-400';
            default: return 'text-gray-400';
        }
    }

    const getIcon = (score: number) => {
        if (score >= 4) return <ShieldCheck className="text-green-400" size={24} />;
        if (score >= 2) return <Shield className="text-blue-400" size={24} />;
        return <ShieldAlert className="text-red-400" size={24} />;
    }

    return (
        <div className="w-full space-y-4">

            {/* Header Info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {getIcon(strength.score)}
                    <div className="flex flex-col">
                        <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Strength</span>
                        <span className={`text-lg font-bold ${getLabelColor(strength.score)}`}>{strength.label}</span>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Cracking Time</span>
                    <div className="flex items-center gap-1.5 text-white/90 font-medium">
                        <Clock size={14} className="text-purple-400" />
                        <span>{strength.crackTime}</span>
                    </div>
                </div>
            </div>

            {/* Progress Bars */}
            <div className="flex gap-2 h-2 w-full">
                {[0, 1, 2, 3].map((index) => (
                    <div
                        key={index}
                        className={`h-full flex-1 rounded-full transition-all duration-500 ${index < strength.score || (strength.score === 4 && index === 3) // Fill logic
                            ? getColor(strength.score)
                            : 'bg-white/5'
                            } ${index < strength.score ? 'shadow-[0_0_10px_rgba(0,0,0,0.3)]' : ''}`}
                    />
                ))}
            </div>

            {/* Stats & Insights */}
            <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="glass-panel p-3 rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                        <Brain size={18} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-white/50">Entropy</span>
                        <span className="text-sm font-semibold">{strength.entropy} bits</span>
                    </div>
                </div>
                {/* Maybe another stat or just spacer */}
                <div className="glass-panel p-3 rounded-xl flex flex-col justify-center">
                    <span className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Verdict</span>
                    <span className="text-xs text-white/80 leading-tight">
                        {strength.score >= 3 ? "Excellent resilience against brute-force." : "Susceptible to modern cracking tools."}
                    </span>
                </div>
            </div>

            {/* Tips */}
            {strength.tips.length > 0 && (
                <div className="glass-panel p-4 rounded-xl text-sm space-y-2 border-l-4 border-yellow-500/50">
                    <span className="font-semibold text-yellow-200 block mb-1">Security Tips:</span>
                    <ul className="list-disc list-inside space-y-1 text-white/70 text-xs">
                        {strength.tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
};
