import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Sparkles,
  Settings,
  CreditCard,
  LogOut,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const UserProfileCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const userProfile = useCryptoStore((s) => s.userProfile);
  const setModalState = useCryptoStore((s) => s.setModalState);

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
    <div className="relative pt-2 border-t border-[#ECECEC]" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 rounded-2xl hover:bg-[#F0F2F6] transition-colors group text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#ECECEC]"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-[#111111] truncate tracking-tight">
                {userProfile.name}
              </span>
              <span className="px-1.5 py-0.2 bg-[#EEF0FD] text-[#5B5CEB] text-[10px] font-bold rounded-md">
                PRO
              </span>
            </div>
            <p className="text-xs text-[#8E8E93] truncate">{userProfile.email}</p>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-[#8E8E93] group-hover:text-[#111111] transition-transform duration-200 ${
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
            className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-white rounded-2xl border border-[#ECECEC] shadow-flyout z-50 space-y-1"
          >
            <div className="px-3 py-2 border-b border-[#F0F2F6] mb-1">
              <p className="text-xs text-[#8E8E93]">Monthly Queries</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-semibold text-[#111111]">
                  {userProfile.apiCallsRemaining.toLocaleString()} / 5,000 remaining
                </span>
                <span className="text-[10px] text-green-600 font-bold">97%</span>
              </div>
              <div className="w-full bg-[#F0F2F6] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-[#5B5CEB] h-full rounded-full w-[97%]" />
              </div>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                setModalState('isSettingsModalOpen', true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#333333] hover:text-[#111111] hover:bg-[#F7F8FA] rounded-xl transition-colors text-left"
            >
              <Settings className="w-4 h-4 text-[#666666]" />
              Preferences & API Keys
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setModalState('isUpgradeProModalOpen', true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#5B5CEB] hover:bg-[#EEF0FD] rounded-xl transition-colors text-left"
            >
              <Sparkles className="w-4 h-4 text-[#5B5CEB]" />
              Manage Pro Subscription
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setModalState('isPortfolioModalOpen', true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#333333] hover:text-[#111111] hover:bg-[#F7F8FA] rounded-xl transition-colors text-left"
            >
              <CreditCard className="w-4 h-4 text-[#666666]" />
              Billing & Invoices
            </button>

            <div className="border-t border-[#F0F2F6] my-1" />

            <button
              onClick={() => {
                setIsOpen(false);
                alert('Session locked. Re-authenticate to continue.');
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
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
