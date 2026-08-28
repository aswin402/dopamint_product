import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Check, Coins, Zap } from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import { useCryptoStore } from '../../store/useCryptoStore';
import { triggerCelebration } from '../../lib/confetti';

export const UpgradeProModal: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'tier-starter' | 'tier-pro' | 'tier-unlimited'>('tier-pro');

  const isOpen = useCryptoStore((s) => s.isUpgradeProModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const userProfile = useCryptoStore((s) => s.userProfile);

  if (!isOpen) return null;

  const handleCheckout = () => {
    triggerCelebration();
    alert('🎉 Credits added successfully to your connected Web3 wallet balance!');
    setModalState('isUpgradeProModalOpen', false);
  };

  const creditPackages = [
    {
      id: 'tier-starter' as const,
      name: 'Starter Pack',
      credits: '5,000 AI Credits',
      price: '$9',
      desc: 'Ideal for occasional on-chain audits & sentiment analysis.',
      popular: false,
    },
    {
      id: 'tier-pro' as const,
      name: 'Pro Trader',
      credits: '25,000 AI Credits',
      price: '$29',
      desc: 'Deep Research, subagent execution, and real-time mempool scanning.',
      popular: true,
    },
    {
      id: 'tier-unlimited' as const,
      name: 'Whale Unlimited',
      credits: '100,000 AI Credits',
      price: '$79',
      desc: 'Unmetered high-speed GPU priority & continuous DEX arbitrage bots.',
      popular: false,
    },
  ];

  const perks = [
    'Unlimited Deep Research & On-Chain Reasoning',
    'Real-Time Bloomberg & TradingView Level 2 Data Feed',
    'Solidity & Rust Smart Contract Vulnerability Audits',
    'Multi-Exchange Arbitrage & DEX Liquidity Subagents',
    'Dedicated Priority High-Speed GPU Infrastructure',
  ];

  return (
    <div
      onClick={() => setModalState('isUpgradeProModalOpen', false)}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] shadow-flyout p-6 space-y-5 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center p-1.5 shadow-2xs">
              <img src={crownLogo} alt="dopamint crown" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-[var(--text-primary)] uppercase tracking-wider block">
                Buy AI Credits & Pro
              </span>
              <span className="text-[11px] text-[var(--text-muted)]">
                Wallet: <strong className="font-mono text-[var(--text-primary)]">{userProfile.name}</strong>
              </span>
            </div>
          </div>
          <button
            onClick={() => setModalState('isUpgradeProModalOpen', false)}
            className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Credit Packages Selection */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
            Select Credit Package
          </label>
          <div className="grid grid-cols-1 gap-2.5">
            {creditPackages.map((pkg) => {
              const isSelected = selectedPlan === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPlan(pkg.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[var(--primary-light)]/40 border-[var(--primary)] shadow-2xs ring-1 ring-[var(--primary)]'
                      : 'bg-[var(--bg-app)] border-[var(--border-color)] hover:border-[var(--primary)]/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)]'
                      }`}
                    >
                      {pkg.id === 'tier-pro' ? <Sparkles className="w-4 h-4" /> : <Coins className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs text-[var(--text-primary)]">{pkg.name}</h4>
                        {pkg.popular && (
                          <span className="px-2 py-0.2 rounded-full bg-[var(--primary)] text-white text-[9.5px] font-extrabold uppercase">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{pkg.credits}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-extrabold text-base text-[var(--text-primary)]">{pkg.price}</div>
                    <span className="text-[10px] text-[var(--text-muted)]">One-time</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Perks Checklist */}
        <div className="p-3.5 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)] space-y-2">
          <span className="text-[11px] font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            All Plans Include:
          </span>
          <div className="space-y-1.5">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-2 text-[11.5px] text-[var(--text-secondary)]">
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </div>
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Button */}
        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCheckout}
          className="w-full py-3 bg-[var(--primary)] hover:opacity-90 text-white font-bold text-sm rounded-2xl shadow-button-primary transition-opacity flex items-center justify-center gap-2 cursor-pointer"
        >
          <Coins className="w-4 h-4" />
          <span>Buy Credits & Top Up Balance</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
