import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Check,
  Copy,
  Lock,
  ArrowRight,
  Wallet,
  Loader2,
} from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import { useCryptoStore } from '../../store/useCryptoStore';

export const AuthWalletModal: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedAddress, setGeneratedAddress] = useState('0x4F2a91C8392F865eE824A1054E5F36423c9E3c76');

  const isOpen = useCryptoStore((s) => s.isAuthModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);

  if (!isOpen) return null;

  const handleClose = () => {
    setModalState('isAuthModalOpen', false);
    setTimeout(() => {
      setStep(1);
      setEmail('');
      setIsLoading(false);
    }, 200);
  };

  const handleStartAuth = (providerName: string, customEmail?: string) => {
    setIsLoading(true);
    // Generate simulated dynamic deterministic wallet address
    const randomSuffix = Math.random().toString(16).substring(2, 6).toUpperCase();
    const dynamicAddr = `0x4F2a${randomSuffix}92F865eE824A1054E5F36423c9E3c76`;
    setGeneratedAddress(dynamicAddr);

    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      if (customEmail) setEmail(customEmail);
      else if (!email) setEmail(providerName === 'google' ? 'alex.investor@gmail.com' : 'alex@icloud.com');
    }, 1000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    handleStartAuth('email', email.trim());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinishLogin = () => {
    // Update store with new wallet
    const truncated = `${generatedAddress.slice(0, 6)}...${generatedAddress.slice(-4)}`;
    const store = useCryptoStore.getState();
    useCryptoStore.setState({
      userProfile: {
        ...store.userProfile,
        name: truncated,
        email: email || 'alex@email.com',
        walletAddress: generatedAddress,
        ensName: 'alex.eth',
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

        {/* 1. Stepped Progress Pill Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              step === 1
                ? 'bg-[var(--primary-light)] text-[var(--primary)] font-bold border border-transparent shadow-2xs'
                : 'bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-muted)] font-medium'
            }`}
          >
            1 · Sign in
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              step === 2
                ? 'bg-[var(--primary-light)] text-[var(--primary)] font-bold border border-transparent shadow-2xs'
                : 'bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-muted)] font-medium'
            }`}
          >
            2 · Wallet ready
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            /* STEP 1: Sign in (Matching Image 1) */
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center text-center space-y-5"
            >
              {/* Crown Emblem */}
              <div className="w-13 h-13 rounded-2xl bg-[#111310] dark:bg-[#1C1C1C] border border-[#2B3028] dark:border-[#333] flex items-center justify-center shadow-soft">
                <img
                  src={crownLogo}
                  alt="dopamint crown"
                  className="w-7 h-7 object-contain filter drop-shadow-xs"
                />
              </div>

              {/* Heading & Subtitle */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight leading-snug">
                  Welcome to Dopamint
                </h2>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-[340px]">
                  Your AI co-pilot for on-chain research and trading. Sign in to get a wallet instantly — no seed phrase required.
                </p>
              </div>

              {/* Social Login Options */}
              <div className="w-full space-y-2.5 pt-1">
                {/* Google Button */}
                <button
                  onClick={() => handleStartAuth('google')}
                  disabled={isLoading}
                  className="w-full h-11 px-4 rounded-2xl bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-semibold flex items-center justify-center gap-3 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Apple Button */}
                <button
                  onClick={() => handleStartAuth('apple')}
                  disabled={isLoading}
                  className="w-full h-11 px-4 rounded-2xl bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-semibold flex items-center justify-center gap-3 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.85-12-14.43-6.04-9.33-10.74-19.82-14.1-31.47-3.37-11.64-5.06-22.75-5.06-33.32 0-14.88 3.73-27.16 11.2-36.83 7.47-9.67 16.92-14.62 28.36-14.85 4.8 0 10.36 1.34 16.69 4.02 6.33 2.68 10.34 4.09 12.04 4.23 2.12-.27 6.47-1.78 13.06-4.54 6.58-2.75 12.29-3.95 17.12-3.6 12.63.85 22.82 5.62 30.56 14.32-11.05 6.7-16.44 15.98-16.18 27.84.27 9.4 3.86 17.27 10.78 23.6 6.92 6.34 15.19 9.87 24.82 10.6-2.22 6.74-4.94 13.52-8.17 20.35zm-33.8-106.9c-.1-1.33-.24-2.8-.42-4.4-.3-2.67-.18-5.32.36-7.94.54-2.62 1.54-5.04 3-7.26 1.46-2.22 3.37-4.14 5.73-5.75 4.14-2.88 9.07-4.52 14.78-4.92.1 1.47.24 3.01.42 4.61.3 2.68.17 5.34-.4 7.98-.57 2.64-1.57 5.06-3.01 7.26-1.44 2.2-3.36 4.11-5.76 5.73-4.17 2.87-9.07 4.43-14.7 4.69z" />
                  </svg>
                  <span>Continue with Apple</span>
                </button>

                {/* Web3 Wallet Direct Connect */}
                <button
                  onClick={() => handleStartAuth('web3')}
                  disabled={isLoading}
                  className="w-full h-11 px-4 rounded-2xl bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-semibold flex items-center justify-center gap-3 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  <Wallet className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />
                  <span>Connect Web3 Wallet</span>
                </button>
              </div>

              {/* Divider: or */}
              <div className="w-full flex items-center gap-3">
                <div className="flex-1 h-[1px] bg-[var(--border-color)]" />
                <span className="text-xs text-[var(--text-muted)] font-medium">or</span>
                <div className="flex-1 h-[1px] bg-[var(--border-color)]" />
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className="w-full flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="flex-1 h-11 px-4 bg-[var(--bg-app)] border border-[var(--border-color)] focus:border-[#485442] dark:focus:border-[#55604e] rounded-2xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="h-11 px-5 bg-[#485442] dark:bg-[#55604e] hover:opacity-90 text-white font-semibold text-sm rounded-2xl transition-all shadow-button-primary flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
              </form>

              {/* Trust Badge */}
              <div className="w-full p-3 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)] flex items-center gap-2.5 text-left shadow-2xs">
                <Lock className="w-4 h-4 text-[#7A7D75] dark:text-[#888] flex-shrink-0" />
                <p className="text-[11.5px] text-[var(--text-secondary)] leading-snug">
                  <span className="font-semibold text-[var(--text-primary)]">Non-custodial wallet</span>, powered by Privy — you control your keys
                </p>
              </div>

              {/* Footer Terms */}
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                By continuing you agree to Dopamint's <span className="underline hover:text-[var(--text-primary)] cursor-pointer">Terms</span> and confirm you've read the <span className="underline hover:text-[var(--text-primary)] cursor-pointer">Testnet Risk Disclosure</span>.
              </p>
            </motion.div>
          ) : (
            /* STEP 2: Wallet ready (Matching Image 2) */
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center text-center space-y-5"
            >
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
                  We created a secure wallet for <span className="font-semibold text-[var(--text-primary)]">{email || 'your account'}</span>. It's empty for now — fund it whenever you're ready to trade.
                </p>
              </div>

              {/* Generated Address Card (Dashed Border) */}
              <div className="w-full p-3.5 bg-[var(--bg-app)] rounded-2xl border border-dashed border-[var(--border-color)] flex items-center justify-between shadow-2xs">
                <span className="font-mono text-xs font-semibold text-[var(--text-primary)] tracking-wide">
                  {truncateAddress(generatedAddress)}
                </span>
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

              {/* Primary CTA: Go to dashboard */}
              <button
                onClick={handleFinishLogin}
                className="w-full h-11 bg-[#485442] dark:bg-[#55604e] hover:opacity-90 text-white font-semibold text-sm rounded-2xl transition-all shadow-button-primary flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Go to dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
