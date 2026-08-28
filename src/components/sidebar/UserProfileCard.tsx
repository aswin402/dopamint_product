import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Sparkles,
  Settings,
  CreditCard,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const UserProfileCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="relative pt-2 border-t border-[var(--border-color)]" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 rounded-2xl hover:bg-[var(--bg-hover)] transition-colors group text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[var(--border-color)]"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-[var(--bg-card)]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-[var(--text-primary)] truncate tracking-tight">
                {userProfile.name}
              </span>
              <span className="px-1.5 py-0.2 bg-[var(--primary-light)] text-[var(--primary)] text-[10px] font-bold rounded-md">
                PRO
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] truncate">{userProfile.email}</p>
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
            <div className="px-3 py-2 border-b border-[var(--border-color)] mb-1">
              <p className="text-xs text-[var(--text-muted)]">Monthly Queries</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  {userProfile.apiCallsRemaining.toLocaleString()} / 5,000 remaining
                </span>
                <span className="text-[10px] text-green-600 font-bold">97%</span>
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
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors text-left"
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
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors text-left"
            >
              <Settings className="w-4 h-4 text-[var(--text-muted)]" />
              Preferences & API Keys
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setModalState('isUpgradeProModalOpen', true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--primary)] hover:bg-[var(--primary-light)] rounded-xl transition-colors text-left"
            >
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              Manage Pro Subscription
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setModalState('isPortfolioModalOpen', true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors text-left"
            >
              <CreditCard className="w-4 h-4 text-[var(--text-muted)]" />
              Billing & Invoices
            </button>

            <div className="border-t border-[var(--border-color)] my-1" />

            <button
              onClick={() => {
                setIsOpen(false);
                alert('Session locked. Re-authenticate to continue.');
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 rounded-xl transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
