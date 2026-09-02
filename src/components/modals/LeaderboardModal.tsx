import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Copy, Check, Zap, Plus, Coins } from 'lucide-react';
import { Modal, Button } from '../ui';
import { useCryptoStore } from '../../store/useCryptoStore';
import { walletService } from '../../api/walletService';

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

  const handleClose = () => {
    setModalState('isLeaderboardModalOpen', false);
  };

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Testnet Topup Leaderboard"
      subtitle="Ranked by testnet deposit volume & XP points."
      icon={<Trophy className="w-4 h-4 text-amber-500" />}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-3 max-h-[70vh] flex flex-col">
        {/* Top Actions & Quick Topup Drawer */}
        <div className="flex items-center justify-between gap-2">
          {/* Season / Period Filter Tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('season1')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'season1'
                  ? 'bg-[#485442] dark:bg-[#55604e] text-white'
                  : 'bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
            >
              Season 1
            </button>
            <button
              onClick={() => setActiveTab('alltime')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'alltime'
                  ? 'bg-[#485442] dark:bg-[#55604e] text-white'
                  : 'bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
            >
              All-Time
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'weekly'
                  ? 'bg-[#485442] dark:bg-[#55604e] text-white'
                  : 'bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
            >
              Weekly
            </button>
          </div>

          <Button
            size="xs"
            variant="primary"
            onClick={() => setIsTopupOpen(!isTopupOpen)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            {isTopupOpen ? 'Close Faucet' : 'Top up Testnet ETH'}
          </Button>
        </div>

        <AnimatePresence>
          {isTopupOpen && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleTopupSubmit}
              className="p-3 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl flex items-center justify-between gap-2 flex-wrap"
            >
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  Base Sepolia Faucet:
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {['1.0', '2.5', '5.0', '10.0'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTopupAmount(preset)}
                    className={`px-2 py-0.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      topupAmount === preset
                        ? 'bg-[#485442] dark:bg-[#55604e] text-white border-transparent'
                        : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)]'
                    }`}
                  >
                    +{preset} ETH
                  </button>
                ))}

                <Button type="submit" variant="primary" size="xs">
                  Deposit & Earn XP
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Current User Standing Highlight Card */}
        {currentUserEntry && (
          <div className="p-3 rounded-2xl bg-[var(--bg-app)] border border-[#485442]/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#485442] dark:bg-[#55604e] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                #{currentUserEntry.rank}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-[var(--text-primary)] truncate">
                    {walletService.formatAddress(currentUserEntry.walletAddress)}
                  </span>
                  <span className="px-1.5 py-0.2 bg-[#485442]/10 text-[#485442] dark:text-[#8A9E7F] text-[10px] font-bold rounded-md uppercase">
                    Your Wallet
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Deposit: {currentUserEntry.testnetTopupEth} ETH
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-extrabold text-amber-500">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{currentUserEntry.xpPoints.toLocaleString()} XP</span>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
          <div className="grid grid-cols-12 px-3 py-1 text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            <span className="col-span-2 sm:col-span-1">Rank</span>
            <span className="col-span-5 sm:col-span-6">Wallet ID</span>
            <span className="col-span-3 sm:col-span-3 text-right">Testnet Topup</span>
            <span className="col-span-2 sm:col-span-2 text-right">Points (XP)</span>
          </div>

          {leaderboard.map((entry) => {
            const isCurrentUser =
              entry.isCurrentUser ||
              entry.walletAddress.toLowerCase() === (userProfile.walletAddress || '').toLowerCase();
            const isTop3 = entry.rank <= 3;

            return (
              <div
                key={entry.walletAddress}
                className={`grid grid-cols-12 items-center p-2.5 rounded-2xl border transition-all ${
                  isCurrentUser
                    ? 'bg-[#485442]/10 border-[#485442] shadow-2xs'
                    : isTop3
                    ? 'bg-[var(--bg-app)] border-[var(--border-color)]'
                    : 'bg-[var(--bg-card)] border-[var(--border-color)]/70 hover:bg-[var(--bg-app)]'
                }`}
              >
                <div className="col-span-2 sm:col-span-1 flex items-center gap-1">
                  {entry.rank === 1 ? (
                    <span className="w-5 h-5 rounded-lg bg-amber-400/20 text-amber-500 flex items-center justify-center font-extrabold text-xs">
                      1
                    </span>
                  ) : entry.rank === 2 ? (
                    <span className="w-5 h-5 rounded-lg bg-slate-300/30 text-slate-600 dark:text-slate-300 flex items-center justify-center font-extrabold text-xs">
                      2
                    </span>
                  ) : entry.rank === 3 ? (
                    <span className="w-5 h-5 rounded-lg bg-amber-700/20 text-amber-700 dark:text-amber-500 flex items-center justify-center font-extrabold text-xs">
                      3
                    </span>
                  ) : (
                    <span className="font-mono text-xs font-semibold text-[var(--text-muted)] pl-1">
                      #{entry.rank}
                    </span>
                  )}
                </div>

                <div className="col-span-5 sm:col-span-6 flex items-center gap-2 min-w-0 pr-2">
                  <span
                    className={`font-mono text-xs truncate ${
                      isCurrentUser
                        ? 'font-bold text-[#485442] dark:text-[#8A9E7F]'
                        : 'font-medium text-[var(--text-primary)]'
                    }`}
                  >
                    {walletService.formatAddress(entry.walletAddress)}
                  </span>

                  <button
                    onClick={() => handleCopy(entry.walletAddress)}
                    title="Copy Wallet ID"
                    className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0 cursor-pointer"
                  >
                    {copiedAddress === entry.walletAddress ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>

                <div className="col-span-3 sm:col-span-3 text-right">
                  <span className="text-xs font-bold text-[var(--text-primary)] font-mono">
                    {entry.testnetTopupEth.toFixed(2)} ETH
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-2 text-right">
                  <span className="font-mono text-xs font-extrabold text-[var(--text-primary)]">
                    {entry.xpPoints.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
