import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Bell,
  Search,
  Copy,
  Check,
  Zap,
  Flame,
  Trophy,
  Target,
  Gift,
  Diamond,
  Rocket,
  TrendingUp,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

interface LeaderboardUser {
  rank: number;
  walletAddress: string;
  fullAddress: string;
  tagline: string;
  xpWeek: number;
  xpAllTime: number;
  swaps: number;
  referrals: number;
  streakDays: number;
  isCurrentUser?: boolean;
}

const LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    rank: 1,
    walletAddress: '0x71Cd...9B02',
    fullAddress: '0x71Cd4231865eE824A1054E5F36423c9E9B02',
    tagline: '50 swaps · 20 referrals · Season 1 Leader',
    xpWeek: 128420,
    xpAllTime: 1455000,
    swaps: 50,
    referrals: 20,
    streakDays: 42,
  },
  {
    rank: 2,
    walletAddress: '0x9A2b...44Fe',
    fullAddress: '0x9A2b38291054E5F36423c9E3c76A105444Fe',
    tagline: '30-day streak · 38 swaps',
    xpWeek: 86140,
    xpAllTime: 1128000,
    swaps: 38,
    referrals: 15,
    streakDays: 30,
  },
  {
    rank: 3,
    walletAddress: '0x3E44...7710',
    fullAddress: '0x3E4491C8392F865eE824A1054E5F364237710',
    tagline: '10 swaps · 14 referrals',
    xpWeek: 54280,
    xpAllTime: 894000,
    swaps: 10,
    referrals: 14,
    streakDays: 19,
  },
  {
    rank: 4,
    walletAddress: '0xD219...5C3A',
    fullAddress: '0xD2193b8291054E5F36423c9E3c76A10545C3A',
    tagline: 'Priority quant tester · 12 referrals',
    xpWeek: 32960,
    xpAllTime: 642000,
    swaps: 24,
    referrals: 12,
    streakDays: 14,
  },
  {
    rank: 5,
    walletAddress: '0xA8F1...C920',
    fullAddress: '0xA8F11054E5F36423c9E3c76A105444FeC920',
    tagline: 'Early tester · 8 swaps',
    xpWeek: 21480,
    xpAllTime: 510000,
    swaps: 8,
    referrals: 7,
    streakDays: 11,
  },
  {
    rank: 6,
    walletAddress: '0xE802...19BD',
    fullAddress: '0xE80291C8392F865eE824A1054E5F3642319BD',
    tagline: 'Automated research analyst',
    xpWeek: 14760,
    xpAllTime: 437500,
    swaps: 6,
    referrals: 5,
    streakDays: 9,
  },
  {
    rank: 7,
    walletAddress: '0xC5A0...7E14',
    fullAddress: '0xC5A038291054E5F36423c9E3c76A10547E14',
    tagline: 'Active contributor · 4 swaps',
    xpWeek: 11250,
    xpAllTime: 362000,
    swaps: 4,
    referrals: 3,
    streakDays: 7,
  },
  {
    rank: 8,
    walletAddress: '0x19B3...52DE',
    fullAddress: '0x19B3865eE824A1054E5F36423c9E9B0252DE',
    tagline: 'Community researcher · 2 referrals',
    xpWeek: 8940,
    xpAllTime: 298000,
    swaps: 3,
    referrals: 2,
    streakDays: 5,
  },
  {
    rank: 9,
    walletAddress: '0x8842...31AA',
    fullAddress: '0x884238291054E5F36423c9E3c76A105431AA',
    tagline: 'DeFi yield scout',
    xpWeek: 6450,
    xpAllTime: 245000,
    swaps: 2,
    referrals: 1,
    streakDays: 4,
  },
  {
    rank: 10,
    walletAddress: '0x49F0...B210',
    fullAddress: '0x49F01054E5F36423c9E3c76A105444FeB210',
    tagline: 'Multi-agent prompt tester',
    xpWeek: 4200,
    xpAllTime: 198000,
    swaps: 2,
    referrals: 1,
    streakDays: 3,
  },
];

export const LeaderboardPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'alltime'>('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const setModalState = useCryptoStore((s) => s.setModalState);
  const userProfile = useCryptoStore((s) => s.userProfile);

  const truncateAddress = (addr: string) => {
    if (!addr || addr.length < 10) return '0x4F2...8Ae1';
    return `${addr.slice(0, 5)}...${addr.slice(-4)}`;
  };

  const handleCopy = (address: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const filteredUsers = useMemo(() => {
    return LEADERBOARD_USERS.filter((user) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        user.walletAddress.toLowerCase().includes(q) ||
        user.fullAddress.toLowerCase().includes(q) ||
        user.tagline.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const currentUserData = {
    rank: 128,
    walletAddress: truncateAddress(userProfile.walletAddress),
    fullAddress: userProfile.walletAddress || '0x4F2d6C781054E5F36423c9E3c76A10548Ae1',
    tagline: 'Top 5% · Active Beta Tester',
    xpWeek: 2140,
    xpAllTime: 48500,
    delta: '+12',
  };

  // 8 Minimalist Achievements
  const achievements = [
    { id: 'first-swap', name: 'First swap', desc: 'Executed 1st DEX trade', icon: Target },
    { id: '10-swaps', name: '10 Swaps', desc: 'Active testnet trader', icon: Zap },
    { id: '50-swaps', name: '50 Swaps', desc: 'Power DeFi explorer', icon: Trophy },
    { id: '7-streak', name: '7-day streak', desc: 'Consistent check-ins', icon: Flame },
    { id: '30-streak', name: '30-day streak', desc: 'Daily alpha researcher', icon: Flame },
    { id: '5-ref', name: '5 Referrals', desc: 'Ecosystem growth builder', icon: Gift },
    { id: '20-ref', name: '20 Referrals', desc: 'Alpha syndicator tier', icon: Diamond },
    { id: 'top-100', name: 'Top 100', desc: 'Elite Leaderboard rank', icon: Rocket },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] text-[var(--text-primary)] px-4 sm:px-8 md:px-12 py-6 scroll-smooth transition-colors duration-200">
      <div className="max-w-[860px] mx-auto space-y-6 pb-20">
        {/* ═══════════════════════════════════════════════════════════
         *  TOP BAR HEADER
         * ═══════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
              Track top community testers and earn XP rewards on Base testnet
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setModalState('isAlertsModalOpen', true)}
              title="Notifications"
              className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all shadow-2xs cursor-pointer relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--primary)]" />
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  CONTROLS: SEARCH & TIMEFRAME PILL
         * ═══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] focus-within:border-[var(--primary)] rounded-xl text-xs w-full sm:w-72 transition-colors">
            <Search className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wallet ID or address..."
              className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[10px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Timeframe Switcher */}
          <div className="inline-flex items-center p-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-2xs self-start sm:self-auto">
            <button
              onClick={() => setTimeframe('week')}
              className={`px-3.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                timeframe === 'week'
                  ? 'bg-[var(--primary)] text-white shadow-2xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Last 7 days
            </button>
            <button
              onClick={() => setTimeframe('alltime')}
              className={`px-3.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                timeframe === 'alltime'
                  ? 'bg-[var(--primary)] text-white shadow-2xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              All time
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  MODERN MINIMAL LEADERBOARD CARD (MATCHING REFERENCE EXACTLY)
         * ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-card overflow-hidden"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-[var(--border-color)]">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                Top testers by XP
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                {timeframe === 'week' ? 'Last 7 days' : 'All-time total points'}
              </p>
            </div>

            <span className="text-xs font-semibold px-3 py-1 bg-[var(--bg-app)] text-[var(--text-secondary)] rounded-full border border-[var(--border-color)]">
              Top {filteredUsers.length}
            </span>
          </div>

          {/* Table List Rows */}
          <div className="divide-y divide-[var(--border-color)]">
            {filteredUsers.map((user) => {
              const isRank1 = user.rank === 1;
              const formattedRank = user.rank < 10 ? `0${user.rank}` : `${user.rank}`;
              const xpDisplay =
                timeframe === 'week'
                  ? `${user.xpWeek.toLocaleString()} XP`
                  : `${user.xpAllTime.toLocaleString()} XP`;

              return (
                <div
                  key={user.rank}
                  className="group flex items-center justify-between px-6 py-4 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                >
                  {/* Left & Center: Rank + Wallet info */}
                  <div className="flex items-center gap-5 sm:gap-6 min-w-0 pr-4">
                    {/* Rank Column */}
                    <div className="w-6 sm:w-8 flex items-center justify-start flex-shrink-0">
                      {isRank1 ? (
                        <Crown className="w-5 h-5 text-[var(--text-primary)] dark:text-amber-400 stroke-[2]" />
                      ) : (
                        <span className="font-mono text-xs sm:text-[13px] font-medium text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                          {formattedRank}
                        </span>
                      )}
                    </div>

                    {/* Wallet ID & Subtitle Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm sm:text-[15px] text-[var(--text-primary)] font-mono tracking-tight group-hover:text-[var(--primary)] transition-colors truncate">
                          {user.walletAddress}
                        </span>
                        <button
                          onClick={(e) => handleCopy(user.fullAddress, e)}
                          title="Copy Full Address"
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[var(--bg-app)] rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                        >
                          {copiedAddress === user.fullAddress ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                        {user.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Right: XP Score */}
                  <div className="text-right flex-shrink-0">
                    <span className="font-bold text-sm sm:text-[15px] text-[var(--text-primary)] tabular-nums">
                      {xpDisplay}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Current User Standing Row (Pinned at bottom of card) */}
          <div className="border-t-2 border-[var(--border-color)] bg-[var(--bg-app)]/70 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-5 sm:gap-6 min-w-0 pr-4">
              <div className="w-6 sm:w-8 flex items-center justify-start flex-shrink-0">
                <span className="font-mono text-xs sm:text-[13px] font-bold text-[var(--primary)]">
                  {currentUserData.rank}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm sm:text-[15px] text-[var(--text-primary)] font-mono tracking-tight truncate">
                    You · {currentUserData.walletAddress}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[var(--primary-light)] text-[var(--primary)] rounded-md">
                    Connected
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                  {currentUserData.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-right flex-shrink-0">
              <span className="font-extrabold text-sm sm:text-[15px] text-[var(--text-primary)] tabular-nums">
                {timeframe === 'week'
                  ? `${currentUserData.xpWeek.toLocaleString()} XP`
                  : `${currentUserData.xpAllTime.toLocaleString()} XP`}
              </span>
              <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                {currentUserData.delta}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
         *  TOP ACHIEVEMENTS THIS WEEK (CLEAN MINIMAL SVG ICONS)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
              Weekly Achievements
            </h3>
            <span className="text-xs text-[var(--text-muted)]">
              Unlock milestones to boost multiplier
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {achievements.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-3.5 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--primary)]/50 rounded-2xl transition-all shadow-2xs group flex items-start gap-3 cursor-pointer"
                >
                  <div className="p-2 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-primary)] group-hover:text-[var(--primary)] group-hover:scale-105 transition-all flex-shrink-0">
                    <IconComponent className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--primary)] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5 truncate">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
