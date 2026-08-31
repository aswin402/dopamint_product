import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Sparkles,
  Zap,
  Coins,
  Copy,
  Check,
  Search,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Users,
  Clock,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const LeaderboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'season1' | 'alltime' | 'weekly'>('season1');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isTopupOpen, setIsTopupOpen] = useState(false);
  const [topupAmount, setTopupAmount] = useState('2.5');

  const leaderboard = useCryptoStore((s) => s.leaderboard);
  const topupTestnet = useCryptoStore((s) => s.topupTestnet);
  const userProfile = useCryptoStore((s) => s.userProfile);

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

  const filteredLeaderboard = leaderboard.filter(
    (entry) =>
      entry.walletAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.badge && entry.badge.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] text-[var(--text-primary)] transition-colors duration-200">
      {/* ─────────────────────────────────────────────────────────────
       *  TOP HEADER
       * ───────────────────────────────────────────────────────────── */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-card)] px-6 py-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 shadow-xs flex-shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  Leaderboard
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-wide">
                  Season 1 Live
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Base Sepolia
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                Ranked by testnet deposit volume and AI interaction XP. Top participants qualify for retroactive rewards.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTopupOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs sm:text-sm font-semibold shadow-button-primary hover:opacity-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Top up Testnet ETH</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6">
        {/* ─────────────────────────────────────────────────────────────
         *  SEASON STATS CARDS
         * ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className="text-xs font-medium">Total Testnet Volume</span>
              <Coins className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)]">
              2,845.5 ETH
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% this week</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className="text-xs font-medium">Total XP Minted</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)]">
              5,840,000 XP
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Multiplier active (2.5x)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className="text-xs font-medium">Active Wallets</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)]">
              1,428
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Base Sepolia Testnet
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className="text-xs font-medium">Season 1 Closes In</span>
              <Clock className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)]">
              14d 08h 24m
            </div>
            <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
              Snapshot on Day 30
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
         *  CURRENT USER STANDING CARD
         * ───────────────────────────────────────────────────────────── */}
        {currentUserEntry && (
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-app)] to-[var(--bg-card)] border border-[var(--primary)]/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] text-white font-extrabold text-base flex items-center justify-center shadow-xs flex-shrink-0">
                #{currentUserEntry.rank}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm sm:text-base font-mono font-bold text-[var(--text-primary)]">
                    {currentUserEntry.walletAddress}
                  </span>
                  <span className="px-2 py-0.5 bg-[var(--primary-light)] text-[var(--primary)] text-xs font-bold rounded-md uppercase">
                    Your Connected Wallet
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs sm:text-sm text-[var(--text-muted)] mt-1.5">
                  <span>
                    Testnet Top-up: <strong className="text-[var(--text-primary)]">{currentUserEntry.testnetTopupEth} ETH</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Rank Tier: <strong className="text-amber-500">Top 5%</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 self-end md:self-auto flex-shrink-0">
              <div className="text-right">
                <div className="flex items-center justify-end gap-1.5 text-base sm:text-lg font-black text-amber-500">
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{currentUserEntry.xpPoints.toLocaleString()} XP</span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">Season 1 Points</span>
              </div>

              <button
                onClick={() => setIsTopupOpen(true)}
                className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:opacity-95 transition-all shadow-button-primary cursor-pointer"
              >
                Top up & Boost XP
              </button>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
         *  TOP 3 PODIUM CARDS
         * ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* #2 Rank */}
          {top2 && (
            <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-slate-300/40 dark:border-slate-700/50 shadow-2xs relative flex flex-col justify-between order-2 md:order-1">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-slate-300/30 text-slate-600 dark:text-slate-300 flex items-center justify-center font-black text-sm">
                  🥈 #2
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
                  Silver Tier
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[var(--text-primary)] block truncate">
                  {truncateWallet(top2.walletAddress)}
                </span>
                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-[var(--text-muted)]">Top-up:</span>
                  <span className="font-bold font-mono text-[var(--text-primary)]">{top2.testnetTopupEth} ETH</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Total XP:</span>
                  <span className="font-extrabold font-mono text-amber-500">{top2.xpPoints.toLocaleString()} XP</span>
                </div>
              </div>
            </div>
          )}

          {/* #1 Rank (Gold Center) */}
          {top1 && (
            <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-500/10 via-[var(--bg-card)] to-[var(--bg-card)] border-2 border-amber-500/50 shadow-md relative flex flex-col justify-between order-1 md:order-2">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-500 flex items-center justify-center font-black text-base shadow-xs">
                  👑 #1
                </div>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                  Gold Champion
                </span>
              </div>
              <div className="space-y-1.5">
                <span className="text-sm font-mono font-black text-[var(--text-primary)] block truncate">
                  {truncateWallet(top1.walletAddress)}
                </span>
                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-[var(--text-muted)]">Top-up Volume:</span>
                  <span className="font-bold font-mono text-[var(--text-primary)] text-sm">{top1.testnetTopupEth} ETH</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Total XP:</span>
                  <span className="font-black font-mono text-amber-500 text-sm">{top1.xpPoints.toLocaleString()} XP</span>
                </div>
              </div>
            </div>
          )}

          {/* #3 Rank */}
          {top3 && (
            <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-amber-800/20 dark:border-amber-700/30 shadow-2xs relative flex flex-col justify-between order-3 md:order-3">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-amber-700/20 text-amber-700 dark:text-amber-500 flex items-center justify-center font-black text-sm">
                  🥉 #3
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-700/10 text-amber-700 dark:text-amber-400 uppercase">
                  Bronze Tier
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[var(--text-primary)] block truncate">
                  {truncateWallet(top3.walletAddress)}
                </span>
                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-[var(--text-muted)]">Top-up:</span>
                  <span className="font-bold font-mono text-[var(--text-primary)]">{top3.testnetTopupEth} ETH</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Total XP:</span>
                  <span className="font-extrabold font-mono text-amber-500">{top3.xpPoints.toLocaleString()} XP</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────
         *  TAB FILTERS & SEARCH
         * ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] self-start">
            <button
              onClick={() => setActiveTab('season1')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'season1'
                  ? 'bg-[var(--primary)] text-white shadow-2xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Season 1 (Active)</span>
            </button>

            <button
              onClick={() => setActiveTab('alltime')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'alltime'
                  ? 'bg-[var(--primary)] text-white shadow-2xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>All-Time</span>
            </button>

            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'weekly'
                  ? 'bg-[var(--primary)] text-white shadow-2xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>Weekly Topups</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search wallet ID or badge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 text-xs bg-[var(--bg-card)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl border border-[var(--border-color)] focus:border-[var(--primary)] outline-none transition-all"
            />
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
         *  FULL LEADERBOARD TABLE
         * ───────────────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-2xs">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-5 py-3 border-b border-[var(--border-color)] bg-[var(--bg-app)] text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            <span className="col-span-2 sm:col-span-1">Rank</span>
            <span className="col-span-5 sm:col-span-5">Wallet Address</span>
            <span className="col-span-3 sm:col-span-3 text-right">Testnet Topup</span>
            <span className="col-span-2 sm:col-span-3 text-right">XP Points</span>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[var(--border-color)]">
            {filteredLeaderboard.map((entry) => {
              const isCurrentUser =
                entry.isCurrentUser ||
                entry.walletAddress.toLowerCase() === (userProfile.walletAddress || '').toLowerCase();

              return (
                <div
                  key={entry.walletAddress}
                  className={`grid grid-cols-12 items-center px-5 py-3.5 transition-colors ${
                    isCurrentUser
                      ? 'bg-[var(--primary-light)]/50 font-medium'
                      : 'hover:bg-[var(--bg-hover)]'
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-2 sm:col-span-1 flex items-center">
                    {entry.rank === 1 ? (
                      <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-500 flex items-center justify-center font-black text-xs">
                        👑 1
                      </span>
                    ) : entry.rank === 2 ? (
                      <span className="w-7 h-7 rounded-lg bg-slate-300/30 text-slate-600 dark:text-slate-300 flex items-center justify-center font-black text-xs">
                        🥈 2
                      </span>
                    ) : entry.rank === 3 ? (
                      <span className="w-7 h-7 rounded-lg bg-amber-700/20 text-amber-700 dark:text-amber-500 flex items-center justify-center font-black text-xs">
                        🥉 3
                      </span>
                    ) : (
                      <span className="font-mono text-xs font-semibold text-[var(--text-muted)] pl-1">
                        #{entry.rank}
                      </span>
                    )}
                  </div>

                  {/* Wallet ID */}
                  <div className="col-span-5 sm:col-span-5 flex items-center gap-2 min-w-0 pr-2">
                    <span
                      className={`font-mono text-xs sm:text-sm truncate ${
                        isCurrentUser
                          ? 'font-bold text-[var(--primary)]'
                          : 'text-[var(--text-primary)]'
                      }`}
                    >
                      {truncateWallet(entry.walletAddress)}
                    </span>

                    {entry.badge && (
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] whitespace-nowrap">
                        {entry.badge}
                      </span>
                    )}

                    <button
                      onClick={() => handleCopy(entry.walletAddress)}
                      title="Copy Address"
                      className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors flex-shrink-0 cursor-pointer"
                    >
                      {copiedAddress === entry.walletAddress ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <a
                      href={`https://sepolia.basescan.org/address/${entry.walletAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View on BaseScan"
                      className="hidden sm:block p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors flex-shrink-0"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Testnet Topup */}
                  <div className="col-span-3 sm:col-span-3 text-right">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                      {entry.testnetTopupEth.toFixed(2)} ETH
                    </span>
                    <span className="hidden sm:block text-[10.5px] text-[var(--text-muted)]">
                      Base Sepolia
                    </span>
                  </div>

                  {/* XP Points */}
                  <div className="col-span-2 sm:col-span-3 text-right">
                    <div className="inline-flex items-center justify-end gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-app)] border border-[var(--border-color)]">
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-mono text-xs sm:text-sm font-extrabold text-[var(--text-primary)]">
                        {entry.xpPoints.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
       *  TOPUP MODAL / POPUP
       * ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isTopupOpen && (
          <div
            onClick={() => setIsTopupOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[var(--bg-card)] rounded-[24px] border border-[var(--border-color)] shadow-flyout p-6 space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[var(--text-primary)]">
                      Top up Base Sepolia Testnet
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      Deposit testnet ETH to gain leaderboard XP points
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleTopupSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-2">
                    Select Testnet ETH Amount:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {['1.0', '2.5', '5.0', '10.0'].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setTopupAmount(val)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          topupAmount === val
                            ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-xs'
                            : 'bg-[var(--bg-app)] text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        +{val} ETH
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs text-[var(--text-muted)] space-y-1">
                  <div className="flex justify-between">
                    <span>Est. XP Earned:</span>
                    <strong className="text-amber-500">
                      +{(parseFloat(topupAmount || '0') * 25000).toLocaleString()} XP
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Network:</span>
                    <span className="font-mono text-[var(--text-primary)]">Base Sepolia (84532)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsTopupOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:opacity-95 transition-all shadow-button-primary cursor-pointer"
                  >
                    Confirm Deposit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
