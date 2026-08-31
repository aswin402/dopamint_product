import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Zap,
  Gift,
  Target,
  Flame,
  Trophy,
  Rocket,
  Diamond,
  Medal,
} from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import { useCryptoStore } from '../../store/useCryptoStore';

export const LeaderboardPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'alltime'>('week');

  const setModalState = useCryptoStore((s) => s.setModalState);
  const userProfile = useCryptoStore((s) => s.userProfile);

  const truncateAddress = (addr: string) => {
    if (!addr || addr.length < 10) return '0x4F2...8Ae1';
    return `${addr.slice(0, 5)}...${addr.slice(-4)}`;
  };

  // Top 3 Podium Data
  const top1 = {
    rank: 1,
    address: '0x71Cd...9B02',
    fullAddress: '0x71Cd4231865eE824A1054E5F36423c9E9B02',
    xp: timeframe === 'week' ? '6,140' : '84,500',
    swaps: 50,
    referrals: 20,
    avatarColor: 'from-amber-400 to-orange-500',
    podiumHeight: 'h-28 sm:h-32',
    podiumBg: 'bg-gradient-to-t from-amber-500/25 to-amber-500/10 border-t-2 border-amber-500',
  };

  const top2 = {
    rank: 2,
    address: '0x9A2b...44Fe',
    fullAddress: '0x9A2b38291054E5F36423c9E3c76A105444Fe',
    xp: timeframe === 'week' ? '4,820' : '62,100',
    streak: '30-day streak',
    avatarColor: 'from-blue-400 to-indigo-500',
    podiumHeight: 'h-20 sm:h-24',
    podiumBg: 'bg-gradient-to-t from-slate-400/20 to-slate-400/5 border-t-2 border-slate-400',
  };

  const top3 = {
    rank: 3,
    address: '0x3E44...7710',
    fullAddress: '0x3E4491C8392F865eE824A1054E5F364237710',
    xp: timeframe === 'week' ? '4,110' : '48,900',
    swaps: 10,
    avatarColor: 'from-emerald-400 to-teal-600',
    podiumHeight: 'h-14 sm:h-18',
    podiumBg: 'bg-gradient-to-t from-amber-700/20 to-amber-700/5 border-t-2 border-amber-700',
  };

  // Table rankings 4-7
  const rankings = [
    {
      rank: 4,
      address: '0xD219...5C3A',
      xp: timeframe === 'week' ? '3,890 XP' : '41,200 XP',
      avatarBg: 'bg-[#C9A984] text-white',
    },
    {
      rank: 5,
      address: '0xA8F1...C920',
      xp: timeframe === 'week' ? '3,650 XP' : '38,750 XP',
      avatarBg: 'bg-[#89A8D4] text-white',
    },
    {
      rank: 6,
      address: '0xE802...19BD',
      xp: timeframe === 'week' ? '3,402 XP' : '35,400 XP',
      avatarBg: 'bg-[#D288A3] text-white',
    },
    {
      rank: 7,
      address: '0xC5A0...7E14',
      xp: timeframe === 'week' ? '3,190 XP' : '32,150 XP',
      avatarBg: 'bg-[#A888D4] text-white',
    },
  ];

  // Current User Standing
  const currentUserStanding = {
    rank: 128,
    address: truncateAddress(userProfile.walletAddress),
    xp: '2,140 XP',
    delta: '▲12',
  };

  // Top Achievements This Week
  const achievements = [
    {
      id: 'first-swap',
      name: 'First swap',
      icon: <Medal className="w-5 h-5 text-amber-500" />,
      bg: 'bg-gradient-to-b from-amber-400 to-amber-600',
    },
    {
      id: '10-swaps',
      name: '10 Swaps',
      icon: <Target className="w-5 h-5 text-red-500" />,
      bg: 'bg-gradient-to-b from-red-400 to-red-600',
    },
    {
      id: '50-swaps',
      name: '50 Swaps',
      icon: <Trophy className="w-5 h-5 text-amber-500" />,
      bg: 'bg-gradient-to-b from-amber-300 to-amber-500',
    },
    {
      id: '7-streak',
      name: '7-day streak',
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      bg: 'bg-gradient-to-b from-orange-400 to-orange-600',
    },
    {
      id: '30-streak',
      name: '30-day streak',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      bg: 'bg-gradient-to-b from-yellow-300 to-amber-500',
    },
    {
      id: '5-ref',
      name: '5 Referrals',
      icon: <Gift className="w-5 h-5 text-pink-500" />,
      bg: 'bg-gradient-to-b from-pink-400 to-rose-600',
    },
    {
      id: '20-ref',
      name: '20 Referrals',
      icon: <Diamond className="w-5 h-5 text-cyan-400" />,
      bg: 'bg-gradient-to-b from-cyan-300 to-blue-500',
    },
    {
      id: 'top-100',
      name: 'Top 100',
      icon: <Rocket className="w-5 h-5 text-purple-400" />,
      bg: 'bg-gradient-to-b from-purple-400 to-indigo-600',
    },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] text-[var(--text-primary)] px-4 sm:px-8 md:px-12 py-6 scroll-smooth transition-colors duration-200">
      <div className="max-w-[1000px] mx-auto space-y-6 pb-20">
        {/* ═══════════════════════════════════════════════════════════
         *  1. TOP BAR
         * ═══════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Leaderboard
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalState('isAlertsModalOpen', true)}
              title="Notifications"
              className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all shadow-2xs cursor-pointer relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--primary)]" />
            </button>

            <div
              className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 p-0.5 flex items-center justify-center text-white font-bold text-xs shadow-2xs cursor-pointer hover:opacity-90 transition-opacity"
              title="Your Standing"
            >
              <div className="w-full h-full bg-[#18181b] dark:bg-[#121214] rounded-[10px] flex items-center justify-center">
                <span className="text-[11px] font-mono text-purple-400 font-bold">0x</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  2. SUB-HEADER WITH TIMEFRAME PILL
         * ═══════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-[13.5px] text-[var(--text-muted)] font-medium">
            Top testers by XP this week
          </p>

          {/* Timeframe Switcher */}
          <div className="inline-flex items-center p-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-2xs">
            <button
              onClick={() => setTimeframe('week')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                timeframe === 'week'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-app)] shadow-2xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              This week
            </button>
            <button
              onClick={() => setTimeframe('alltime')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                timeframe === 'alltime'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-app)] shadow-2xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              All time
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  3. TOP 3 PODIUM SECTION
         * ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[26px] p-6 sm:p-10 shadow-card relative overflow-hidden"
        >
          <div className="flex items-end justify-center gap-4 sm:gap-10 pt-8 pb-2">
            {/* Rank 2 Podium (Left) */}
            <div className="flex flex-col items-center flex-1 max-w-[170px]">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 p-0.5 shadow-md flex items-center justify-center mb-2.5">
                <div className="w-full h-full rounded-full bg-[#181a20] flex items-center justify-center text-xs sm:text-sm font-bold text-blue-300 font-mono">
                  #2
                </div>
              </div>
              <span className="text-xs sm:text-[13px] font-bold text-[var(--text-primary)] tracking-tight">
                {top2.address}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-semibold mt-0.5">
                {top2.xp} XP
              </span>
              <div className="flex items-center gap-1 text-[11px] font-medium text-amber-500 mt-1 mb-3">
                <Flame className="w-3 h-3 fill-amber-500" />
                <span>{top2.streak}</span>
              </div>
              <div className={`w-full ${top2.podiumHeight} ${top2.podiumBg} rounded-t-2xl flex items-center justify-center font-bold text-xs sm:text-sm text-[var(--text-muted)]`}>
                2
              </div>
            </div>

            {/* Rank 1 Podium (Center - Elevated) */}
            <div className="flex flex-col items-center flex-1 max-w-[190px] -mt-6">
              <div className="relative mb-2.5">
                {/* Crown on top */}
                <img
                  src={crownLogo}
                  alt="crown"
                  className="w-7 h-7 sm:w-8 sm:h-8 absolute -top-5 left-1/2 -translate-x-1/2 object-contain filter drop-shadow-sm"
                />
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-0.5 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#1f1a14] flex items-center justify-center text-sm sm:text-base font-extrabold text-amber-400 font-mono">
                    #1
                  </div>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)] tracking-tight">
                {top1.address}
              </span>
              <span className="text-xs sm:text-[13px] text-amber-500 font-bold mt-0.5">
                {top1.xp} XP
              </span>
              <div className="flex items-center gap-2 text-[10.5px] sm:text-[11px] font-medium text-[var(--text-muted)] mt-1 mb-3">
                <span className="flex items-center gap-0.5">
                  <Gift className="w-3 h-3 text-pink-500" /> {top1.referrals} ref
                </span>
                <span>·</span>
                <span className="flex items-center gap-0.5">
                  <Target className="w-3 h-3 text-red-500" /> {top1.swaps} swaps
                </span>
              </div>
              <div className={`w-full ${top1.podiumHeight} ${top1.podiumBg} rounded-t-2xl flex items-center justify-center font-extrabold text-sm sm:text-base text-amber-500 shadow-xs`}>
                1
              </div>
            </div>

            {/* Rank 3 Podium (Right) */}
            <div className="flex flex-col items-center flex-1 max-w-[170px]">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-600 p-0.5 shadow-md flex items-center justify-center mb-2.5">
                <div className="w-full h-full rounded-full bg-[#141d18] flex items-center justify-center text-xs sm:text-sm font-bold text-emerald-400 font-mono">
                  #3
                </div>
              </div>
              <span className="text-xs sm:text-[13px] font-bold text-[var(--text-primary)] tracking-tight">
                {top3.address}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-semibold mt-0.5">
                {top3.xp} XP
              </span>
              <div className="flex items-center gap-1 text-[11px] font-medium text-red-500 mt-1 mb-3">
                <Target className="w-3 h-3" />
                <span>{top3.swaps} swaps</span>
              </div>
              <div className={`w-full ${top3.podiumHeight} ${top3.podiumBg} rounded-t-2xl flex items-center justify-center font-bold text-xs sm:text-sm text-[var(--text-muted)]`}>
                3
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
         *  4. RANKINGS TABLE (ROWS 4-7 + HIGHLIGHTED YOU ROW)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[22px] p-2 sm:p-3 shadow-card space-y-1">
          {rankings.map((row) => (
            <div
              key={row.rank}
              className="flex items-center justify-between px-4 sm:px-6 py-3.5 hover:bg-[var(--bg-hover)] rounded-xl transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="w-6 text-xs sm:text-sm font-bold text-[var(--text-muted)]">
                  {row.rank}
                </span>
                <div className={`w-7 h-7 rounded-full ${row.avatarBg} flex items-center justify-center text-[10px] font-bold flex-shrink-0`}>
                  0x
                </div>
                <span className="text-xs sm:text-[13.5px] font-semibold text-[var(--text-primary)] truncate font-mono">
                  {row.address}
                </span>
              </div>
              <span className="text-xs sm:text-[13.5px] font-bold text-[var(--text-primary)] flex-shrink-0">
                {row.xp}
              </span>
            </div>
          ))}

          {/* Current User Standing Row (Highlighted in Green / Mint) */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/25 rounded-2xl transition-all mt-1.5 shadow-2xs">
            <div className="flex items-center gap-4 min-w-0">
              <span className="w-6 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {currentUserStanding.rank}
              </span>
              <div className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                0x
              </div>
              <span className="text-xs sm:text-[13.5px] font-bold text-[var(--text-primary)] truncate font-mono">
                You · {currentUserStanding.address}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs sm:text-[13.5px] font-extrabold text-[var(--text-primary)]">
                {currentUserStanding.xp}
              </span>
              <span className="text-xs font-extrabold text-emerald-500 flex items-center gap-0.5">
                {currentUserStanding.delta}
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  5. TOP ACHIEVEMENTS THIS WEEK SECTION
         * ═══════════════════════════════════════════════════════════ */}
        <div className="space-y-3.5 pt-2">
          <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
            Top achievements this week
          </h2>

          {/* 8 Badges Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-3.5">
            {achievements.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ y: -3 }}
                className="flex flex-col items-center text-center p-2.5 bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] hover:border-[var(--primary)] rounded-2xl transition-all shadow-2xs cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center mb-2 shadow-inner-sm group-hover:scale-105 transition-transform">
                  {badge.icon}
                </div>
                <span className="text-[11px] font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors leading-tight">
                  {badge.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
