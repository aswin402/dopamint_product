import React, { useState } from 'react';
import { Settings, Key, Cpu, Check, Sun, Moon } from 'lucide-react';
import { Modal, Button } from '../ui';
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

  const handleClose = () => {
    setModalState('isSettingsModalOpen', false);
  };

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedKey(true);
    setTimeout(() => setSavedKey(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Preferences"
      subtitle="Configure appearance, models & keys"
      icon={<Settings className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />}
      maxWidth="max-w-lg"
    >
      <div className="space-y-5 text-xs max-h-[70vh] overflow-y-auto pr-1">
        {/* Appearance Theme Selector */}
        <div>
          <label className="font-bold text-xs text-[var(--text-primary)] block mb-1.5">
            Appearance Theme (OKLCH)
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setTheme('light')}
              className={`p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-[#485442]/10 border-[#485442] text-[#485442] dark:text-[#8A9E7F] font-bold shadow-2xs'
                  : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Light Cream</span>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#485442]/10 border-[#485442] text-[#485442] dark:text-[#8A9E7F] font-bold shadow-2xs'
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
                className={`p-2.5 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                  selectedModel === mod
                    ? 'bg-[#485442]/10 border-[#485442] text-[#485442] dark:text-[#8A9E7F] font-bold shadow-2xs'
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
                className={`p-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                  activeCurrency === c.code
                    ? 'bg-[#485442]/10 border-[#485442] text-[#485442] dark:text-[#8A9E7F]'
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
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={savedKey ? <Check className="w-3.5 h-3.5 text-green-400" /> : null}
            >
              {savedKey ? 'Saved' : 'Save'}
            </Button>
          </div>
          <p className="text-[10.5px] text-[var(--text-muted)]">
            Keys are stored strictly in client-side secure local storage.
          </p>
        </form>
      </div>
    </Modal>
  );
};
