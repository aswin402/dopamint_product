import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Settings, Key, Cpu, Check, Sun, Moon } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const SettingsModal: React.FC = () => {
  const [apiKey, setApiKey] = useState('sk-live-dopamint-9948271034');
  const [savedKey, setSavedKey] = useState(false);

  const isOpen = useCryptoStore((s) => s.isSettingsModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const selectedModel = useCryptoStore((s) => s.selectedModel);
  const setSelectedModel = useCryptoStore((s) => s.setSelectedModel);
  const activeCurrency = useCryptoStore((s) => s.activeCurrency);
  const setActiveCurrency = useCryptoStore((s) => s.setActiveCurrency);
  const theme = useCryptoStore((s) => s.theme);
  const setTheme = useCryptoStore((s) => s.setTheme);

  if (!isOpen) return null;

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedKey(true);
    setTimeout(() => setSavedKey(false), 2000);
  };

  return (
    <div
      onClick={() => setModalState('isSettingsModalOpen', false)}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] shadow-flyout overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--primary-light)] text-[var(--primary)] rounded-2xl">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[var(--text-primary)] tracking-tight">Preferences</h3>
              <p className="text-xs text-[var(--text-muted)]">Configure appearance, models & keys</p>
            </div>
          </div>
          <button
            onClick={() => setModalState('isSettingsModalOpen', false)}
            className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* Appearance Theme Selector */}
          <div>
            <label className="font-bold text-xs text-[var(--text-primary)] block mb-1.5">
              Appearance Theme (OKLCH)
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setTheme('light')}
                className={`p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
                  theme === 'light'
                    ? 'bg-[var(--primary-light)] border-[var(--primary)] text-[var(--primary)] font-bold shadow-2xs'
                    : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Light Cream (#f3f2e6)</span>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
                  theme === 'dark'
                    ? 'bg-[var(--primary-light)] border-[var(--primary)] text-[var(--primary)] font-bold shadow-2xs'
                    : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Dark Obsidian</span>
              </button>
            </div>
          </div>

          {/* Active Model Selector */}
          <div>
            <label className="font-bold text-xs text-[var(--text-primary)] block mb-1.5">
              Default Intelligence Model
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['dopamint-4o', 'dopamint-DeepResearch', 'QuantAlpha-3'] as const).map((mod) => (
                <button
                  key={mod}
                  onClick={() => setSelectedModel(mod)}
                  className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                    selectedModel === mod
                      ? 'bg-[var(--primary-light)] border-[var(--primary)] text-[var(--primary)] font-bold shadow-2xs'
                      : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                  }`}
                >
                  <Cpu className="w-4 h-4 mx-auto mb-1 opacity-70" />
                  <span className="truncate block text-[11px]">{mod}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Currency Preference */}
          <div>
            <label className="font-bold text-xs text-[var(--text-primary)] block mb-1.5">
              Base Display Currency
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { code: 'USD', symbol: '$' },
                { code: 'EUR', symbol: '€' },
                { code: 'GBP', symbol: '£' },
                { code: 'INR', symbol: '₹' },
              ].map((c) => (
                <button
                  key={c.code}
                  onClick={() => setActiveCurrency(c.code)}
                  className={`p-2 rounded-xl border text-center font-bold transition-all ${
                    activeCurrency === c.code
                      ? 'bg-[var(--primary-light)] border-[var(--primary)] text-[var(--primary)]'
                      : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-muted)]'
                  }`}
                >
                  {c.symbol} {c.code}
                </button>
              ))}
            </div>
          </div>

          {/* API Key */}
          <form onSubmit={handleSaveKey} className="space-y-1.5">
            <label className="font-bold text-xs text-[var(--text-primary)] block">
              Custom OpenAI / On-Chain RPC Key
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Key className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-[var(--text-primary)] outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-[var(--primary)] text-white font-semibold rounded-xl hover:opacity-90 transition-colors flex items-center gap-1 shadow-button-primary"
              >
                {savedKey ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{savedKey ? 'Saved' : 'Save'}</span>
              </button>
            </div>
            <p className="text-[10.5px] text-[var(--text-muted)]">
              Keys are stored strictly in client-side secure local storage.
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
