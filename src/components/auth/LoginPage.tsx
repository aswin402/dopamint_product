import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check,
  Copy,
  Lock,
  ArrowRight,
  RefreshCw,
  Sun,
  Moon,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const LoginPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [generatedAddress, setGeneratedAddress] = useState('0x4F2a91C8392F865eE824A1054E5F36423c9E3c76');

  const navigate = useNavigate();
  const theme = useCryptoStore((s) => s.theme);
  const toggleTheme = useCryptoStore((s) => s.toggleTheme);
  const login = useCryptoStore((s) => s.login);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateNewWallet = () => {
    const randomHex = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('').toUpperCase();
    const dynamicAddr = `0x4F2a${randomHex}92F865eE824A1054E5F36423c9E3c76`;
    setGeneratedAddress(dynamicAddr);
  };

  const handleFinishLogin = () => {
    login(generatedAddress, 'trader@dopamint.ai');
    navigate('/');
  };

  const truncateAddress = (addr: string) => {
    if (addr.length < 12) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen w-screen bg-[var(--bg-app)] text-[var(--text-primary)] flex flex-col items-center justify-center p-4 relative select-text transition-colors duration-200">
      {/* Top Floating Theme Toggle */}
      <header className="absolute top-6 right-6 flex items-center gap-2 z-10">
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          className="p-2.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all shadow-2xs cursor-pointer"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>
      </header>

      {/* Centered Wallet Ready Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-[430px] bg-[var(--bg-card)] rounded-[28px] border border-[var(--border-color)] shadow-card p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="flex flex-col items-center text-center space-y-5">
          {/* Checkmark Graphic */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center ring-4 ring-emerald-500/15 shadow-soft"
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

          {/* Primary CTA: Go to dashboard */}
          <button
            onClick={handleFinishLogin}
            className="w-full h-11 bg-[#485442] dark:bg-[#55604e] hover:opacity-90 text-white font-semibold text-sm rounded-2xl transition-all shadow-button-primary flex items-center justify-center gap-2 cursor-pointer mt-1"
          >
            <span>Go to dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
