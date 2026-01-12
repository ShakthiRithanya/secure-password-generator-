
import { useState, useEffect } from 'react'
import { PasswordDisplay } from './components/PasswordDisplay'
import { Controls, type UIMode } from './components/Controls'
import { StrengthMeter } from './components/StrengthMeter'
import { generatePassword, type GeneratorOptions, type GenerationMode } from './utils/passwordGenerator'
import { analyzeStrength, type StrengthResult } from './utils/strengthAnalyzer'
import { ShieldCheck, Lock } from 'lucide-react'

function App() {
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<UIMode>('random');
  const [strength, setStrength] = useState<StrengthResult | null>(null);

  const [options, setOptions] = useState<GeneratorOptions>({
    length: 16,
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSymbols: true,
    excludeSimilar: false,
  });

  // Generate password when options or mode changes
  const handleGenerate = () => {
    // Map UI mode to Logic mode
    let logicMode: GenerationMode = 'random';
    if (mode === 'pronounceable') logicMode = 'pronounceable';
    if (mode === 'passphrase') logicMode = 'passphrase';
    // Paranoia uses 'random' but options are implicitly strictly set by Controls component on change.

    // Safety check for Paranoia enforcement just in case
    let currentOptions = { ...options };
    if (mode === 'paranoia') {
      currentOptions = {
        length: Math.max(options.length, 20),
        useUppercase: true,
        useLowercase: true,
        useNumbers: true,
        useSymbols: true,
        excludeSimilar: false
      };
    }

    const newPassword = generatePassword(logicMode, currentOptions);
    setPassword(newPassword);
  };

  useEffect(() => {
    handleGenerate();
  }, [options, mode]);

  useEffect(() => {
    setStrength(analyzeStrength(password));
  }, [password]);

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center">

      {/* Header */}
      <header className="mb-10 text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20">
            <Lock className="text-white" size={32} />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight">
          SecureGen
        </h1>
        <p className="text-white/50 text-sm md:text-base max-w-md mx-auto">
          Intelligent, client-side encryption key & password generator with entropy analysis.
        </p>
      </header>

      {/* Main Card */}
      <main className="w-full max-w-3xl space-y-6">

        {/* Output Section */}
        <section className="space-y-4">
          <PasswordDisplay password={password} onGenerate={handleGenerate} />
          {strength && <StrengthMeter strength={strength} />}
        </section>

        {/* Controls Section */}
        <section>
          <Controls
            mode={mode}
            setMode={setMode}
            options={options}
            setOptions={setOptions}
          />
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-white/30 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldCheck size={14} />
          <span>100% Client-Side. No data leaves your device.</span>
        </div>
        <p>&copy; {new Date().getFullYear()} SecureGen. Built for security.</p>
      </footer>

    </div>
  )
}

export default App
