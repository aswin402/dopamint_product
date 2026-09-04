import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, Coins, Zap, ExternalLink } from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import { Modal, Button } from '../ui';
import { useCryptoStore } from '../../store/useCryptoStore';
import { triggerCelebration } from '../../lib/confetti';
import { truncateAddress } from '../../lib/formatters';

export const UpgradeProModal: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'tier-starter' | 'tier-pro' | 'tier-unlimited'>('tier-pro');
  const navigate = useNavigate();

  const isOpen = useCryptoStore((s) => s.isUpgradeProModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const userProfile = useCryptoStore((s) => s.userProfile);

  const handleClose = () => {
    setModalState('isUpgradeProModalOpen', false);
  };

  const handleCheckout = () => {
    triggerCelebration();
    alert('🎉 Credits added successfully to your connected Web3 wallet balance!');
    handleClose();
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
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Buy AI Credits & Pro"
      subtitle={`Wallet: ${truncateAddress(userProfile.walletAddress)}`}
      icon={<img src={crownLogo} alt="dopamint crown" className="w-5 h-5 object-contain" />}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {/* Credit Packages Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
            Select Credit Package
          </label>
          <div className="grid grid-cols-1 gap-2">
            {creditPackages.map((pkg) => {
              const isSelected = selectedPlan === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPlan(pkg.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#485442]/10 dark:bg-[#55604e]/20 border-[#485442] dark:border-[#55604e] shadow-2xs ring-1 ring-[#485442]'
                      : 'bg-[var(--bg-app)] border-[var(--border-color)] hover:border-[#485442]/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#485442] dark:bg-[#55604e] text-white'
                          : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)]'
                      }`}
                    >
                      {pkg.id === 'tier-pro' ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <Coins className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs text-[var(--text-primary)]">{pkg.name}</h4>
                        {pkg.popular && (
                          <span className="px-2 py-0.2 rounded-full bg-[#485442] dark:bg-[#55604e] text-white text-[9.5px] font-extrabold uppercase">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{pkg.credits}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-extrabold text-base text-[var(--text-primary)]">
                      {pkg.price}
                    </div>
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
              <div
                key={i}
                className="flex items-center gap-2 text-[11.5px] text-[var(--text-secondary)]"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </div>
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleCheckout}
          icon={<Coins className="w-4 h-4" />}
        >
          Buy Credits & Top Up Balance
        </Button>

        <button
          type="button"
          onClick={() => {
            handleClose();
            navigate('/buy-credits');
          }}
          className="w-full text-center text-xs font-semibold text-[#485442] dark:text-[#8ba082] hover:underline flex items-center justify-center gap-1.5 pt-1 cursor-pointer"
        >
          <span>Open full pricing & usage calculator</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </Modal>
  );
};
