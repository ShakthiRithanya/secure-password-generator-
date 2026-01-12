
import React from 'react';
import type { GeneratorOptions, GenerationMode } from '../utils/passwordGenerator';
import { Settings2, Type, MessageSquare, ShieldAlert, Sparkles } from 'lucide-react';

export type UIMode = GenerationMode | 'paranoia';

interface ControlsProps {
    mode: UIMode;
    setMode: (mode: UIMode) => void;
    options: GeneratorOptions;
    setOptions: (options: GeneratorOptions) => void;
}

export const Controls: React.FC<ControlsProps> = ({ mode, setMode, options, setOptions }) => {

    const handleModeChange = (newMode: UIMode) => {
        setMode(newMode);

        // Apply presets
        if (newMode === 'paranoia') {
            setOptions({
                ...options,
                length: 32,
                useUppercase: true,
                useLowercase: true,
                useNumbers: true,
                useSymbols: true,
                excludeSimilar: false,
            });
        } else if (newMode === 'passphrase') {
            // Default acceptable length for passphrase logic (chars)
            setOptions({ ...options, length: 25 });
        } else if (newMode === 'pronounceable') {
            setOptions({ ...options, useSymbols: false, useNumbers: true, length: 12 });
        }
    };

    const handleOptionChange = (key: keyof GeneratorOptions, value: boolean | number) => {
        if (mode === 'paranoia') return; // Locked in paranoia mode
        setOptions({ ...options, [key]: value });
    };

    return (
        <div className="glass-panel p-6 rounded-2xl w-full">

            {/* Mode Tabs */}
            <div className="grid grid-cols-4 gap-2 mb-8 bg-black/20 p-1 rounded-xl">
                {[
                    { id: 'random', label: 'Random', icon: <Sparkles size={16} /> },
                    { id: 'pronounceable', label: 'Readable', icon: <Type size={16} /> },
                    { id: 'passphrase', label: 'Phrase', icon: <MessageSquare size={16} /> },
                    { id: 'paranoia', label: 'Paranoia', icon: <ShieldAlert size={16} /> },
                ].map((m) => (
                    <button
                        key={m.id}
                        onClick={() => handleModeChange(m.id as UIMode)}
                        className={`flex flex-col md:flex-row items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${mode === m.id
                            ? 'bg-blue-600/80 text-white shadow-lg'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        {m.icon}
                        <span className="hidden md:inline">{m.label}</span>
                    </button>
                ))}
            </div>

            {/* Sliders & Toggles */}
            <div className="space-y-6">

                {/* Length Slider */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-sm font-medium text-white/80">
                            {mode === 'passphrase' ? 'Max Length' : 'Password Length'}
                        </span>
                        <span className="text-xl font-bold text-blue-300">{options.length}</span>
                    </div>
                    <input
                        type="range"
                        min={mode === 'passphrase' ? 12 : 6}
                        max={64}
                        value={options.length}
                        onChange={(e) => handleOptionChange('length', Number(e.target.value))}
                        disabled={mode === 'paranoia'}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {mode === 'paranoia' && <p className="text-xs text-red-300/80 mt-1">* Length locked in Paranoia Mode</p>}
                </div>

                {/* Checkbox Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { id: 'useUppercase', label: 'Uppercase (A-Z)' },
                        { id: 'useLowercase', label: 'Lowercase (a-z)' },
                        { id: 'useNumbers', label: 'Numbers (0-9)' },
                        { id: 'useSymbols', label: 'Symbols (!@#)' },
                        { id: 'excludeSimilar', label: 'No Similar (i/l, 0/O)' },
                    ].map((opt) => (
                        <label
                            key={opt.id}
                            className={`flex items-center gap-3 p-3 rounded-xl border border-transparent transition-all duration-200 cursor-pointer ${mode === 'paranoia' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5 hover:border-white/5'
                                } ${
                                //@ts-ignore
                                options[opt.id] ? 'bg-blue-500/10 border-blue-500/30' : ''
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                //@ts-ignore
                                options[opt.id] ? 'bg-blue-500 border-blue-500' : 'border-white/30 bg-white/5'
                                }`}>
                                {/* @ts-ignore */}
                                {options[opt.id] && <Settings2 size={12} className="text-white" />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                //@ts-ignore
                                checked={options[opt.id]}
                                //@ts-ignore
                                onChange={(e) => handleOptionChange(opt.id, e.target.checked)}
                                disabled={mode === 'paranoia'}
                            />
                            <span className="text-sm text-white/80 select-none">{opt.label}</span>
                        </label>
                    ))}
                </div>

            </div>
        </div>
    );
};
