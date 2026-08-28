import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Check } from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import { useCryptoStore } from '../../store/useCryptoStore';
import { triggerCelebration } from '../../lib/confetti';

export const UpgradeProModal: React.FC = () => {
  const isOpen = useCryptoStore((s) => s.isUpgradeProModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);

  if (!isOpen) return null;

  const handleCheckout = () => {
    triggerCelebration();
    alert('🎉 Congratulations! You have unlocked dopamint Pro with unlimited Deep Research and on-chain RPC intelligence.');
    setModalState('isUpgradeProModalOpen', false);
  };

  const perks = [
    'Unlimited Deep Research & On-Chain Reasoning',
    'Real-Time Bloomberg & TradingView Level 2 Data Feed',
    'Solidity & Rust Smart Contract Vulnerability Audits',
    'Automated Multi-Exchange Arbitrage Scanner',
    'Custom Sub-Second Webhook & Telegram Alerts',
    'Dedicated Priority High-Speed GPU Infrastructure',
  ];

  return (
    <div
      onClick={() => setModalState('isUpgradeProModalOpen', false)}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] shadow-flyout p-6 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center p-1.5 shadow-2xs">
              <img src={crownLogo} alt="dopamint crown" className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold text-sm text-[var(--text-primary)] uppercase tracking-wider">
              dopamint Pro
            </span>
          </div>
          <button
            onClick={() => setModalState('isUpgradeProModalOpen', false)}
            className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Banner */}
        <div className="p-5 bg-[var(--primary)] text-white rounded-2xl shadow-card">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs font-semibold text-white/80 uppercase tracking-wider">Pro Tier</p>
              <h3 className="text-3xl font-extrabold mt-1">$29<span className="text-sm font-medium text-white/80"> / month</span></h3>
            </div>
            <span className="px-2.5 py-1 bg-white/20 rounded-full text-[11px] font-bold">
              Save 20% Annual
            </span>
          </div>
          <p className="text-xs text-white/85 mt-2 leading-relaxed">
            Institutional-grade algorithmic crypto analysis, automated portfolio rebalancing, and unmetered AI queries.
          </p>
        </div>

        {/* Perks Checklist */}
        <div className="space-y-2.5">
          {perks.map((perk, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-[var(--text-primary)]">
              <div className="w-4 h-4 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span className="font-medium">{perk}</span>
            </div>
          ))}
        </div>

        {/* Checkout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCheckout}
          className="w-full py-3.5 bg-[var(--primary)] hover:opacity-90 text-white font-bold text-sm rounded-2xl shadow-button-primary transition-opacity flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Upgrade to Pro Now</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
