import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Lock, ArrowRight, RefreshCw } from 'lucide-react';
import { Modal, Button } from '../ui';
import { useCryptoStore } from '../../store/useCryptoStore';
import { walletService } from '../../api/walletService';

export const AuthWalletModal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const userProfile = useCryptoStore((s) => s.userProfile);
  const [generatedAddress, setGeneratedAddress] = useState(
    userProfile.walletAddress || '0x4F2a91C8392F865eE824A1054E5F36423c9E3c76'
  );

  const isOpen = useCryptoStore((s) => s.isAuthModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);

  const handleClose = () => {
    setModalState('isAuthModalOpen', false);
  };

  const handleGenerateNewWallet = () => {
    const dynamicAddr = walletService.generateRandomWalletAddress();
    setGeneratedAddress(dynamicAddr);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinishLogin = () => {
    const truncated = walletService.formatAddress(generatedAddress);
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="max-w-[430px]"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center text-center space-y-4 pt-1">
        {/* Checkmark Graphic */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-13 h-13 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center ring-4 ring-emerald-500/15"
        >
          <Check className="w-6 h-6 stroke-[3]" />
        </motion.div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
            Your wallet is ready
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-[340px]">
            We created a secure non-custodial wallet for your session. It's empty for now — fund it on testnet whenever you're ready.
          </p>
        </div>

        {/* Generated Address Card */}
        <div className="w-full p-3 bg-[var(--bg-app)] rounded-2xl border border-dashed border-[var(--border-color)] flex items-center justify-between shadow-2xs">
          <span className="font-mono text-xs font-semibold text-[var(--text-primary)] tracking-wide">
            {walletService.formatAddress(generatedAddress)}
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
          <span className="px-2.5 py-0.5 bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] text-[11px] font-medium rounded-full">
            Base Sepolia
          </span>
          <span className="px-2.5 py-0.5 bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] text-[11px] font-medium rounded-full">
            Testnet
          </span>
          <span className="px-2.5 py-0.5 bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] text-[11px] font-medium rounded-full">
            Powered by Privy
          </span>
        </div>

        {/* Trust Guarantee Badge */}
        <div className="w-full p-2.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] flex items-center gap-2 text-left shadow-2xs">
          <Lock className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" />
          <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
            <span className="font-semibold text-[var(--text-primary)]">Non-custodial smart wallet</span> — you control your keys.
          </p>
        </div>

        {/* Primary CTA */}
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={handleFinishLogin}
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          Confirm & Continue
        </Button>
      </div>
    </Modal>
  );
};
