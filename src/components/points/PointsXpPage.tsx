import React, { useState } from 'react';
import {
  Zap,
  Flame,
  Calendar,
  TrendingUp,
  MessageSquare,
  Bot,
  FileText,
  CheckCircle2,
  Check,
  Crown,
  Star,
  Lock,
  Gift,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { triggerConfetti } from '../../lib/confetti';

interface QuestItem {
  id: string;
  title: string;
  xp: number;
  progressText: string;
  percent: number;
  icon: React.ElementType;
  isClaimable?: boolean;
  isClaimed?: boolean;
  isInProgress?: boolean;
}

const LEVEL_MILESTONES = [
  {
    level: 1,
    name: 'Member',
    xp: '0 XP',
    perks: 'Standard AI chat & live market data',
    status: 'completed',
  },
  {
    level: 5,
    name: 'Pro Explorer',
    xp: '100K XP',
    perks: '50% discount on AI Pro subscription',
    status: 'completed',
  },
  {
    level: 7,
    name: 'Quant Pioneer',
    xp: '245K XP',
    perks: 'Priority subagents & high-speed inference',
    status: 'active',
  },
  {
    level: 10,
    name: 'Genesis',
    xp: '500K XP',
    perks: 'Genesis retroactive allocation · Tier 1',
    status: 'locked',
  },
];

export const PointsXpPage: React.FC = () => {
  const [totalXp, setTotalXp] = useState(245000);
  const [hasClaimedDaily, setHasClaimedDaily] = useState(false);
  const [claimedQuests, setClaimedQuests] = useState<string[]>(['quest-4']);

  const userProfile = useCryptoStore((s) => s.userProfile);

  const truncateAddress = (addr: string) => {
    if (!addr || addr.length < 10) return '0x4F2...8Ae1';
    return `${addr.slice(0, 5)}...${addr.slice(-4)}`;
  };

  const streakDays = [
    { day: 'Day 1', xp: '+500', active: true, completed: true },
    { day: 'Day 2', xp: '+1K', active: true, completed: true },
    { day: 'Day 3', xp: '+1K', active: true, completed: true },
    { day: 'Day 4', xp: '+1K', active: true, completed: true },
    { day: 'Day 5', xp: '+5K', active: true, isCurrent: true },
    { day: 'Day 6', xp: '+7.5K', active: false },
    { day: 'Day 7', xp: '+15K', active: false, isBonus: true },
  ];

  const quests: QuestItem[] = [
    {
      id: 'quest-1',
      title: 'Run 3 Deep Research Queries',
      xp: 2500,
      progressText: '3 of 3 completed',
      percent: 100,
      icon: MessageSquare,
      isClaimable: true,
    },
    {
      id: 'quest-2',
      title: 'Trigger Multi-Agent Quant Workflow',
      xp: 5000,
      progressText: '1 of 1 completed',
      percent: 100,
      icon: Bot,
      isClaimable: true,
    },
    {
      id: 'quest-3',
      title: 'Inspect 5 AI-Verified Sources in Side Panel',
      xp: 1500,
      progressText: '4 of 5 reviewed',
      percent: 80,
      icon: FileText,
      isInProgress: true,
    },
    {
      id: 'quest-4',
      title: 'Execute First On-Chain Testnet Swap',
      xp: 25000,
      progressText: 'Completed',
      percent: 100,
      icon: CheckCircle2,
      isClaimed: true,
    },
  ];

  const handleClaimDaily = () => {
    if (!hasClaimedDaily) {
      setHasClaimedDaily(true);
      setTotalXp((prev) => prev + 5000);
      triggerConfetti();
    }
  };

  const handleClaimQuest = (questId: string, xpAmount: number) => {
    if (!claimedQuests.includes(questId)) {
      setClaimedQuests((prev) => [...prev, questId]);
      setTotalXp((prev) => prev + xpAmount);
      triggerConfetti();
    }
  };

  const recentActivities = [
    {
      id: 'act-1',
      title: 'Daily Streak Bonus (Day 5)',
      time: 'Just now',
      xp: '+5,000 XP',
      icon: Flame,
    },
    {
      id: 'act-2',
      title: 'Multi-Agent Quant Workflow Milestone',
      time: '2 hours ago',
      xp: '+12,500 XP',
      icon: Bot,
    },
    {
      id: 'act-3',
      title: 'Referral Commission from 0x38b2...9821',
      time: '4 hours ago',
      xp: '+36,250 XP',
      icon: Gift,
    },
    {
      id: 'act-4',
      title: 'Deep Research Synthesis Query',
      time: 'Yesterday',
      xp: '+2,500 XP',
      icon: MessageSquare,
    },
    {
      id: 'act-5',
      title: 'Conversation Star Saved Milestone',
      time: '2 days ago',
      xp: '+5,000 XP',
      icon: Star,
    },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] text-[var(--text-primary)] px-4 sm:px-8 md:px-12 py-8 scroll-smooth transition-colors duration-200">
      <div className="max-w-[880px] mx-auto space-y-10 pb-24">
        {/* ═══════════════════════════════════════════════════════════
         *  1. OPEN EDITORIAL HERO — UNBOXED & REFINED
         * ═══════════════════════════════════════════════════════════ */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--primary-light)] px-2.5 py-0.5 rounded-full border border-[var(--primary)]/20">
                  Rewards Hub
                </span>
                <span className="text-xs text-[var(--text-muted)]">·</span>
                <span className="text-xs font-mono font-medium text-[var(--text-muted)]">
                  {truncateAddress(userProfile.walletAddress)} · Season 1
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15]">
                Points & XP Hub
              </h1>

              <p className="text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed pt-1">
                Earn XP points through daily check-ins, AI agent workflows, and community referrals. Climb the leaderboard to unlock ecosystem rewards.
              </p>
            </div>

            {/* Total XP Balance Display */}
            <div className="p-3 sm:p-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xs self-start sm:self-auto flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center flex-shrink-0">
                <Crown className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                  Total XP Balance
                </span>
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-[var(--text-primary)] tabular-nums">
                  {totalXp.toLocaleString()}{' '}
                  <span className="text-xs font-semibold text-[var(--primary)] ml-0.5">XP</span>
                </span>
              </div>
            </div>
          </div>

          {/* Combined Level Progress & Streak Module (Single Unified Card) */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-card space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Level Progress (7 Cols) */}
              <div className="lg:col-span-7 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] font-mono text-xs font-extrabold flex items-center justify-center">
                      7
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-[var(--text-primary)]">
                        Level 7 · Quant Pioneer
                      </h2>
                      <span className="text-[11px] text-[var(--text-muted)]">
                        45% to Level 8 (300,000 XP)
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-semibold font-mono text-[var(--primary)]">
                    55,000 XP to next
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="w-full h-2 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                      style={{ width: '45%' }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                    <span>245,000 XP</span>
                    <span>300,000 XP</span>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] pt-1">
                  Next perk: Priority quant execution & 25% query fee rebate on Base testnet.
                </p>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block lg:col-span-1 flex justify-center">
                <div className="w-px h-24 bg-[var(--border-color)]" />
              </div>

              {/* Daily Streak Check-in (4 Cols) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[var(--primary)]" />
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      5-Day Streak
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[var(--primary)]">
                    Day 5 Active
                  </span>
                </div>

                {/* 7-Day Scrubber */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {streakDays.map((day) => (
                    <div
                      key={day.day}
                      className={`p-1 rounded-lg border text-[10px] transition-all ${
                        day.completed
                          ? 'bg-[var(--primary-light)] border-[var(--primary)]/30 text-[var(--primary)] font-bold'
                          : day.isCurrent
                          ? 'bg-[var(--primary)] text-white dark:text-[#ECECEC] border-[var(--primary)] font-bold shadow-2xs'
                          : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-muted)]'
                      }`}
                    >
                      <span className="block text-[9px] uppercase">{day.day.replace('Day ', 'D')}</span>
                      <span className="block font-mono text-[10px] mt-0.5">{day.xp}</span>
                    </div>
                  ))}
                </div>

                {/* Claim Button */}
                <button
                  onClick={handleClaimDaily}
                  disabled={hasClaimedDaily}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[var(--primary)] hover:opacity-90 disabled:opacity-40 text-white dark:text-[#ECECEC] text-xs font-semibold rounded-xl transition-all shadow-2xs cursor-pointer disabled:cursor-not-allowed"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {hasClaimedDaily ? 'Daily Check-in Claimed' : 'Check in (+5,000 XP)'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  2. UNIFIED METRICS STRIP (NO SEPARATE BOXES)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-card">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-[var(--border-color)]">
            {/* Metric 1 */}
            <div className="md:px-6 first:pl-0">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                <Crown className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>Lifetime XP</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] tabular-nums">
                245,000
              </div>
              <div className="text-xs font-medium text-[var(--text-muted)] mt-1">
                Leaderboard Rank #128
              </div>
            </div>

            {/* Metric 2 */}
            <div className="md:px-6">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>Weekly Velocity</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] tabular-nums">
                48,500
              </div>
              <div className="text-xs font-medium text-[var(--primary)] mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+18% this week</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="md:px-6">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                <Zap className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>XP Multiplier</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--primary)] tabular-nums">
                1.50x
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">
                Ambassador Level Active
              </div>
            </div>

            {/* Metric 4 */}
            <div className="md:px-6 last:pr-0">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>Active Quests</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] tabular-nums">
                3 <span className="text-base font-normal text-[var(--text-muted)]">/ 4</span>
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">
                2 bounties ready to claim
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  3. ACTIVE QUESTS & BOUNTIES (CLEAN DATA LIST)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                Daily & Weekly Quests
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Complete platform tasks to earn direct XP boosts.
              </p>
            </div>

            <span className="text-xs font-semibold px-3 py-1 bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20 rounded-full">
              {claimedQuests.length} of {quests.length} Completed
            </span>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-card divide-y divide-[var(--border-color)]">
            {quests.map((q) => {
              const IconComp = q.icon;
              const isClaimedNow = claimedQuests.includes(q.id);

              return (
                <div
                  key={q.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--bg-hover)] transition-colors text-xs"
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center flex-shrink-0 shadow-2xs">
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                          {q.title}
                        </span>
                        <span className="font-mono text-xs font-bold text-[var(--primary)]">
                          +{q.xp.toLocaleString()} XP
                        </span>
                      </div>

                      {/* Progress */}
                      <div className="flex items-center gap-3 max-w-sm">
                        <div className="w-full h-1.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                            style={{ width: `${q.percent}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-[var(--text-muted)] font-medium flex-shrink-0 font-mono">
                          {q.progressText}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="self-end sm:self-center flex-shrink-0">
                    {q.isClaimed || isClaimedNow ? (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--primary-light)] text-[var(--primary)] font-semibold text-xs rounded-lg border border-[var(--primary)]/20">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Claimed</span>
                      </div>
                    ) : q.isClaimable ? (
                      <button
                        onClick={() => handleClaimQuest(q.id, q.xp)}
                        className="px-3.5 py-1.5 bg-[var(--primary)] hover:opacity-90 text-white dark:text-[#ECECEC] text-xs font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
                      >
                        Claim XP
                      </button>
                    ) : (
                      <span className="text-xs text-[var(--text-muted)] font-medium px-2 py-1">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  4. LEVEL PERKS MILESTONES (FLUID TIMELINE, NO NESTED BOXES)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-card space-y-6">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
              Level Progression Roadmap
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Unlock priority infrastructure, higher subagent allocations, and genesis rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEVEL_MILESTONES.map((m) => (
              <div
                key={m.level}
                className={`p-4 rounded-xl transition-all space-y-2 ${
                  m.status === 'active'
                    ? 'bg-[var(--primary-light)] border border-[var(--primary)]/40 shadow-2xs'
                    : 'bg-[var(--bg-app)] border border-[var(--border-color)]/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10.5px] font-bold uppercase tracking-wider ${
                      m.status === 'active'
                        ? 'text-[var(--primary)]'
                        : 'text-[var(--text-muted)]'
                    }`}
                  >
                    Level {m.level}
                  </span>
                  {m.status === 'completed' && (
                    <Check className="w-3.5 h-3.5 text-[var(--primary)] stroke-[2.5]" />
                  )}
                  {m.status === 'active' && (
                    <span className="text-[9.5px] font-bold px-1.5 py-0.2 bg-[var(--primary)] text-white dark:text-[#ECECEC] rounded uppercase tracking-wider">
                      Current
                    </span>
                  )}
                  {m.status === 'locked' && (
                    <Lock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  )}
                </div>

                <div className="flex items-baseline justify-between gap-1">
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">
                    {m.name}
                  </h3>
                  <span className="font-mono text-xs font-semibold text-[var(--primary)]">
                    {m.xp}
                  </span>
                </div>

                <p className="text-[11px] text-[var(--text-secondary)] pt-1.5 border-t border-[var(--border-color)]/50 leading-relaxed">
                  {m.perks}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  5. RECENT XP ACTIVITY LEDGER (CLEAN OPEN TABLE)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                Recent XP Activity
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Verified XP minting events and daily check-in rewards
              </p>
            </div>
            <span className="text-xs text-[var(--text-muted)]">
              Latest 5 events
            </span>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-card divide-y divide-[var(--border-color)]">
            {recentActivities.map((act) => {
              const IconComponent = act.icon;
              return (
                <div
                  key={act.id}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-[var(--bg-hover)] transition-colors text-xs"
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-4">
                    <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center flex-shrink-0 shadow-2xs">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs sm:text-[13px] text-[var(--text-primary)] truncate">
                        {act.title}
                      </h4>
                      <span className="text-[11px] text-[var(--text-muted)] block mt-0.5">
                        {act.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-mono font-bold text-xs sm:text-[13px] text-[var(--primary)]">
                    <span>{act.xp}</span>
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
