import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Check,
  Copy,
  Lock,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const AuthWalletModal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const userProfile = useCryptoStore((s) => s.userProfile);
  const [generatedAddress, setGeneratedAddress] = useState(
    userProfile.walletAddress || '0x4F2a91C8392F865eE824A1054E5F36423c9E3c76'
  );

  const isOpen = useCryptoStore((s) => s.isAuthModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);

  if (!isOpen) return null;

  const handleClose = () => {
    setModalState('isAuthModalOpen', false);
  };

  const handleGenerateNewWallet = () => {
    const randomHex = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('').toUpperCase();
    const dynamicAddr = `0x4F2a${randomHex}92F865eE824A1054E5F36423c9E3c76`;
    setGeneratedAddress(dynamicAddr);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinishLogin = () => {
    const truncated = `${generatedAddress.slice(0, 6)}...${generatedAddress.slice(-4)}`;
    const store = useCryptoStore.getState();
    useCryptoStore.setState({
      userProfile: {
        ...store.userProfile,
        name: truncated,
        walletAddress: generatedAddress,
      },
    });
    handleClose();
  };

  const truncateAddress = (addr: string) => {
    if (addr.length < 12) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] bg-[var(--bg-card)] rounded-[28px] border border-[var(--border-color)] shadow-flyout p-6 sm:p-7 relative overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center space-y-5 pt-2">
          {/* Checkmark Graphic */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center ring-4 ring-emerald-500/15"
          >
            <Check className="w-7 h-7 stroke-[3]" />
          </motion.div>

          {/* Title & Description */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              Your wallet is ready
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-[340px]">
              We created a secure non-custodial wallet for your session. It's empty for now — fund it on testnet whenever you're ready to trade.
            </p>
          </div>

          {/* Generated Address Card (Dashed Border) */}
          <div className="w-full p-3.5 bg-[var(--bg-app)] rounded-2xl border border-dashed border-[var(--border-color)] flex items-center justify-between shadow-2xs">
            <span className="font-mono text-xs font-semibold text-[var(--text-primary)] tracking-wide">
              {truncateAddress(generatedAddress)}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleGenerateNewWallet}
                title="Generate new address"
                className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs font-semibold text-[#485442] dark:text-[#8A9E7F] hover:underline cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Network Badges */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] text-[11px] font-medium rounded-full">
              Base Sepolia
            </span>
            <span className="px-3 py-1 bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] text-[11px] font-medium rounded-full">
              Testnet
            </span>
            <span className="px-3 py-1 bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] text-[11px] font-medium rounded-full">
              Powered by Privy
            </span>
          </div>

          {/* Trust Guarantee Badge */}
          <div className="w-full p-3 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)] flex items-center gap-2.5 text-left shadow-2xs">
            <Lock className="w-4 h-4 text-[#7A7D75] dark:text-[#888] flex-shrink-0" />
            <p className="text-[11.5px] text-[var(--text-secondary)] leading-snug">
              <span className="font-semibold text-[var(--text-primary)]">Non-custodial smart wallet</span> — you control your keys.
            </p>
          </div>

          {/* Primary CTA: Done / Go to dashboard */}
          <button
            onClick={handleFinishLogin}
            className="w-full h-11 bg-[#485442] dark:bg-[#55604e] hover:opacity-90 text-white font-semibold text-sm rounded-2xl transition-all shadow-button-primary flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Confirm & Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
