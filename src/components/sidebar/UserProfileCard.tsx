import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Sparkles,
  Settings,
  LogOut,
  Sun,
  Moon,
  Copy,
  Check,
  Wallet,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const UserProfileCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const userProfile = useCryptoStore((s) => s.userProfile);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const theme = useCryptoStore((s) => s.theme);
  const toggleTheme = useCryptoStore((s) => s.toggleTheme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(userProfile.walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative pt-2 border-t border-[var(--border-color)]" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 rounded-2xl hover:bg-[var(--bg-hover)] transition-colors group text-left cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Web3 Wallet Identicon Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#3b4635] via-[#485442] to-[#8A9E7F] flex items-center justify-center text-white ring-2 ring-[var(--border-color)] shadow-2xs">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[var(--bg-card)]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-[var(--text-primary)] truncate tracking-tight">
                {userProfile.name}
              </span>
              <span className="px-1.5 py-0.2 bg-[var(--primary-light)] text-[var(--primary)] text-[9.5px] font-bold rounded-md uppercase">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-[var(--text-muted)] truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>{userProfile.ensName || 'Ethereum Mainnet'}</span>
            </p>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Account Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-flyout z-50 space-y-1"
          >
            {/* Wallet Address Copy Card */}
            <div className="px-3 py-2.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] mb-1.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Connected Wallet
                </span>
                <span className="text-[10.5px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Mainnet
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-0.5">
                <span className="text-xs font-mono font-medium text-[var(--text-primary)] truncate">
                  {userProfile.walletAddress}
                </span>
                <button
                  onClick={handleCopyAddress}
                  title="Copy Full Address"
                  className="p-1 rounded-md hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Monthly Query Usage */}
            <div className="px-3 py-2 border-b border-[var(--border-color)] mb-1">
              <p className="text-xs text-[var(--text-muted)]">Monthly AI Queries</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  {userProfile.apiCallsRemaining.toLocaleString()} / 5,000 remaining
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">97%</span>
              </div>
              <div className="w-full bg-[var(--bg-app)] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-[var(--primary)] h-full rounded-full w-[97%]" />
              </div>
            </div>

            <button
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                {theme === 'light' ? <Moon className="w-4 h-4 text-[var(--text-muted)]" /> : <Sun className="w-4 h-4 text-amber-400" />}
                <span>Theme: {theme === 'light' ? 'Light' : 'Dark'}</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-[var(--bg-app)] text-[var(--text-muted)] rounded border border-[var(--border-color)] uppercase font-bold">
                {theme}
              </span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setModalState('isSettingsModalOpen', true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors text-left cursor-pointer"
            >
              <Settings className="w-4 h-4 text-[var(--text-muted)]" />
              Preferences & API Keys
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setModalState('isAuthModalOpen', true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--primary)] hover:bg-[var(--primary-light)] rounded-xl transition-colors text-left cursor-pointer font-semibold"
            >
              <Wallet className="w-4 h-4 text-[var(--primary)]" />
              Connect / Switch Wallet
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setModalState('isUpgradeProModalOpen', true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors text-left cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              Manage Pro Subscription
            </button>

            <div className="border-t border-[var(--border-color)] my-1" />

            <button
              onClick={() => {
                setIsOpen(false);
                setModalState('isAuthModalOpen', true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 rounded-xl transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              Disconnect Wallet
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
