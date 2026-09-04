import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Coins, ExternalLink, Shield } from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import { Modal, Button } from '../ui';
import { useCryptoStore } from '../../store/useCryptoStore';
import { triggerCelebration } from '../../lib/confetti';
import { truncateAddress } from '../../lib/formatters';

export const UpgradeProModal: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('pack-20');
  const navigate = useNavigate();

  const isOpen = useCryptoStore((s) => s.isUpgradeProModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const userProfile = useCryptoStore((s) => s.userProfile);
  const addCredits = useCryptoStore((s) => s.addCredits);

  const handleClose = () => {
    setModalState('isUpgradeProModalOpen', false);
  };

  const packages = [
    {
      id: 'pack-10',
      name: 'Starter Top-Up',
      credits: 1000,
      creditsLabel: '1,000 Credits',
      price: '$10',
      priceNum: 10,
      desc: 'Quick questions, spot prices & basic sentiment.',
      popular: false,
    },
    {
      id: 'pack-20',
      name: 'Trader Top-Up',
      credits: 2000,
      creditsLabel: '2,000 Credits',
      price: '$20',
      priceNum: 20,
      desc: 'Active trading, mempool scans & deep reasoning.',
      popular: true,
      badge: 'Popular',
    },
    {
      id: 'pack-50',
      name: 'Power Top-Up',
      credits: 5250,
      creditsLabel: '5,250 Credits',
      price: '$50',
      priceNum: 50,
      desc: 'Includes +250 free bonus credits (+5%).',
      popular: false,
      badge: '+5% Bonus',
    },
    {
      id: 'pack-100',
      name: 'Pro Top-Up',
      credits: 11000,
      creditsLabel: '11,000 Credits',
      price: '$100',
      priceNum: 100,
      desc: 'Smart contract audits & autonomous trading bots.',
      popular: false,
      badge: '+10% Bonus',
    },
  ];

  const selectedPkg = packages.find((p) => p.id === selectedId) || packages[1];

  const handleCheckout = () => {
    addCredits(selectedPkg.credits);
    triggerCelebration();
    alert(`🎉 Successfully added ${selectedPkg.credits.toLocaleString()} credits to your wallet balance!`);
    handleClose();
  };

  const perks = [
    'No monthly fees — pure pay-as-you-go',
    'Credits never expire until consumed',
    'Instant 1-click reload with Base USDC or Card',
    'Access all models: Claude 3.7 Sonnet, DeepSeek R1, GPT-4o',
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Top Up Credits"
      subtitle={`Balance: ${userProfile.apiCallsRemaining.toLocaleString()} cr • Wallet: ${truncateAddress(userProfile.walletAddress)}`}
      icon={<img src={crownLogo} alt="dopamint crown" className="w-5 h-5 object-contain" />}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {/* Credit Packages Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
              Select Top-Up Amount
            </label>
            <span className="text-[11px] text-[var(--text-secondary)] font-medium">
              $1 = 100 Credits
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {packages.map((pkg) => {
              const isSelected = selectedId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedId(pkg.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#485442]/10 dark:bg-[#55604e]/20 border-[#485442] dark:border-[#55604e] shadow-2xs ring-1 ring-[#485442]'
                      : 'bg-[var(--bg-app)] border-[var(--border-color)] hover:border-[#485442]/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs text-[var(--text-primary)]">{pkg.name}</h4>
                        {pkg.badge && (
                          <span className="px-1.5 py-0.2 rounded-full bg-[#485442] dark:bg-[#55604e] text-white text-[9px] font-extrabold uppercase">
                            {pkg.badge}
                          </span>
                        )}
                      </div>
                      <div className="font-extrabold text-base text-[#485442] dark:text-[#8ba082] mt-0.5">
                        {pkg.creditsLabel}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-base text-[var(--text-primary)]">
                        {pkg.price}
                      </div>
                      <span className="text-[9.5px] text-[var(--text-muted)]">One-time</span>
                    </div>
                  </div>
                  <p className="text-[10.5px] text-[var(--text-secondary)] mt-2">
                    {pkg.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Perks Checklist */}
        <div className="p-3.5 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)] space-y-2">
          <span className="text-[11px] font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#485442] dark:text-[#8ba082]" />
            Pay-As-You-Go Guarantees:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {perks.map((perk, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]"
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
          Top Up {selectedPkg.price} ({selectedPkg.creditsLabel})
        </Button>

        <button
          type="button"
          onClick={() => {
            handleClose();
            navigate('/buy-credits');
          }}
          className="w-full text-center text-xs font-semibold text-[#485442] dark:text-[#8ba082] hover:underline flex items-center justify-center gap-1.5 pt-1 cursor-pointer"
        >
          <span>Need a custom amount or auto-reload? Open Top Up page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </Modal>
  );
};
