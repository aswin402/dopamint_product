import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trophy,
  Sparkles,
  Copy,
  Check,
  Zap,
  Plus,
  Coins,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const LeaderboardModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'season1' | 'alltime' | 'weekly'>('season1');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isTopupOpen, setIsTopupOpen] = useState(false);
  const [topupAmount, setTopupAmount] = useState('2.5');

  const isOpen = useCryptoStore((s) => s.isLeaderboardModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const leaderboard = useCryptoStore((s) => s.leaderboard);
  const topupTestnet = useCryptoStore((s) => s.topupTestnet);
  const userProfile = useCryptoStore((s) => s.userProfile);

  if (!isOpen) return null;

  const currentUserEntry =
    leaderboard.find(
      (entry) =>
        entry.isCurrentUser ||
        entry.walletAddress.toLowerCase() === (userProfile.walletAddress || '').toLowerCase()
    ) || leaderboard[13];

  const handleCopy = (addr: string) => {
    navigator.clipboard.writeText(addr);
    setCopiedAddress(addr);
    setTimeout(() => setCopiedAddress(null), 1800);
  };

  const handleTopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(topupAmount);
    if (!isNaN(val) && val > 0) {
      topupTestnet(val);
      setIsTopupOpen(false);
    }
  };

  const truncateWallet = (addr: string) => {
    if (addr.length < 14) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div
      onClick={() => setModalState('isLeaderboardModalOpen', false)}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[var(--bg-card)] rounded-[28px] border border-[var(--border-color)] shadow-flyout overflow-hidden flex flex-col max-h-[88vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-[var(--text-primary)] tracking-tight">
                  Testnet Topup Leaderboard
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-[var(--primary-light)] text-[var(--primary)] uppercase">
                  Season 1
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Ranked by testnet deposit volume & XP points. Only wallet IDs are displayed.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTopupOpen(!isTopupOpen)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold shadow-button-primary hover:opacity-95 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Top up Testnet</span>
            </button>

            <button
              onClick={() => setModalState('isLeaderboardModalOpen', false)}
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Topup Drawer / Form */}
        <AnimatePresence>
          {isTopupOpen && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleTopupSubmit}
              className="px-6 py-3.5 bg-[var(--bg-app)] border-b border-[var(--border-color)] flex items-center justify-between gap-3 flex-wrap"
            >
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  Top up Base Sepolia Testnet ETH:
                </span>
              </div>

              <div className="flex items-center gap-2">
                {['1.0', '2.5', '5.0', '10.0'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTopupAmount(preset)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      topupAmount === preset
                        ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                        : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    +{preset} ETH
                  </button>
                ))}

                <button
                  type="submit"
                  className="px-3.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                >
                  Deposit & Earn XP
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Current User Standing Highlight Card */}
        {currentUserEntry && (
          <div className="px-6 pt-4 pb-2">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[var(--bg-app)] to-[var(--bg-card)] border border-[var(--primary)]/30 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white font-bold text-sm flex items-center justify-center shadow-xs flex-shrink-0">
                  #{currentUserEntry.rank}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[var(--text-primary)] truncate">
                      {truncateWallet(currentUserEntry.walletAddress)}
                    </span>
                    <span className="px-1.5 py-0.2 bg-[var(--primary-light)] text-[var(--primary)] text-[10px] font-bold rounded-md uppercase">
                      Your Wallet
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[var(--text-muted)] mt-0.5">
                    Testnet Top-up: <span className="font-semibold text-[var(--text-primary)]">{currentUserEntry.testnetTopupEth} ETH</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-xs font-extrabold text-amber-500 dark:text-amber-400">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{currentUserEntry.xpPoints.toLocaleString()} XP</span>
                  </div>
                  <span className="text-[10.5px] text-[var(--text-muted)]">Season 1 Standing</span>
                </div>

                <button
                  onClick={() => setIsTopupOpen(true)}
                  className="sm:hidden px-3 py-1.5 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold cursor-pointer"
                >
                  Top up
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Filters */}
        <div className="flex items-center gap-2 px-6 pt-2 pb-1 border-b border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab('season1')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'season1'
                ? 'bg-[var(--bg-app)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-2xs font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Season 1 (Active)</span>
          </button>

          <button
            onClick={() => setActiveTab('alltime')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'alltime'
                ? 'bg-[var(--bg-app)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-2xs font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>All-Time</span>
          </button>

          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'weekly'
                ? 'bg-[var(--bg-app)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-2xs font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>Weekly Topups</span>
          </button>
        </div>

        {/* Leaderboard Table / Rows */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          {/* Table Column Headers */}
          <div className="grid grid-cols-12 px-3 py-1 text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            <span className="col-span-2 sm:col-span-1">Rank</span>
            <span className="col-span-5 sm:col-span-6">Wallet ID</span>
            <span className="col-span-3 sm:col-span-3 text-right">Testnet Topup</span>
            <span className="col-span-2 sm:col-span-2 text-right">Points (XP)</span>
          </div>

          {/* Table List Items */}
          <div className="space-y-1.5">
            {leaderboard.map((entry) => {
              const isCurrentUser =
                entry.isCurrentUser ||
                entry.walletAddress.toLowerCase() === (userProfile.walletAddress || '').toLowerCase();

              const isTop3 = entry.rank <= 3;

              return (
                <div
                  key={entry.walletAddress}
                  className={`grid grid-cols-12 items-center p-3 rounded-2xl border transition-all ${
                    isCurrentUser
                      ? 'bg-[var(--primary-light)]/40 border-[var(--primary)] shadow-2xs'
                      : isTop3
                      ? 'bg-[var(--bg-app)] border-[var(--border-color)] hover:border-[var(--primary)]/40'
                      : 'bg-[var(--bg-card)] border-[var(--border-color)]/70 hover:bg-[var(--bg-app)] hover:border-[var(--border-color)]'
                  }`}
                >
                  {/* Rank Column */}
                  <div className="col-span-2 sm:col-span-1 flex items-center gap-1">
                    {entry.rank === 1 ? (
                      <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-500 flex items-center justify-center font-extrabold text-xs">
                        👑 1
                      </span>
                    ) : entry.rank === 2 ? (
                      <span className="w-6 h-6 rounded-lg bg-slate-300/30 text-slate-600 dark:text-slate-300 flex items-center justify-center font-extrabold text-xs">
                        🥈 2
                      </span>
                    ) : entry.rank === 3 ? (
                      <span className="w-6 h-6 rounded-lg bg-amber-700/20 text-amber-700 dark:text-amber-500 flex items-center justify-center font-extrabold text-xs">
                        🥉 3
                      </span>
                    ) : (
                      <span className="font-mono text-xs font-semibold text-[var(--text-muted)] pl-1.5">
                        #{entry.rank}
                      </span>
                    )}
                  </div>

                  {/* Wallet ID Column (Only Wallet ID) */}
                  <div className="col-span-5 sm:col-span-6 flex items-center gap-2 min-w-0 pr-2">
                    <span
                      className={`font-mono text-xs truncate ${
                        isCurrentUser
                          ? 'font-bold text-[var(--primary)]'
                          : 'font-medium text-[var(--text-primary)]'
                      }`}
                    >
                      {truncateWallet(entry.walletAddress)}
                    </span>

                    {entry.badge && (
                      <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] whitespace-nowrap">
                        {entry.badge}
                      </span>
                    )}

                    <button
                      onClick={() => handleCopy(entry.walletAddress)}
                      title="Copy Wallet ID"
                      className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors flex-shrink-0 cursor-pointer"
                    >
                      {copiedAddress === entry.walletAddress ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  {/* Testnet Topup Column */}
                  <div className="col-span-3 sm:col-span-3 text-right">
                    <span className="text-xs font-bold text-[var(--text-primary)] font-mono">
                      {entry.testnetTopupEth.toFixed(2)} ETH
                    </span>
                    <span className="hidden sm:block text-[10px] text-[var(--text-muted)]">
                      Base Sepolia
                    </span>
                  </div>

                  {/* Points (XP) Column */}
                  <div className="col-span-2 sm:col-span-2 text-right">
                    <div className="inline-flex items-center justify-end gap-1 px-2 py-0.5 rounded-lg bg-[var(--bg-app)] border border-[var(--border-color)]">
                      <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="font-mono text-xs font-extrabold text-[var(--text-primary)]">
                        {entry.xpPoints.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
