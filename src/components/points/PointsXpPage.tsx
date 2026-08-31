import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Flame,
  Calendar,
  Users,
  Wallet,
  TrendingUp,
  MessageSquare,
  Bot,
  FileText,
  CheckCircle2,
  Check,
  Bookmark,
  Lock,
  Gift,
  Star,
  Repeat,
  ArrowRight,
} from 'lucide-react';
import { TokenIcon } from '../common/TokenIcon';
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

export const PointsXpPage: React.FC = () => {
  const [totalXp, setTotalXp] = useState(245000);
  const [hasClaimedDaily, setHasClaimedDaily] = useState(false);
  const [claimedBonus, setClaimedBonus] = useState(false);
  const [claimedQuests, setClaimedQuests] = useState<string[]>(['quest-4']);

  const streakDays = [
    { day: 'Day 1', xp: '+500', active: true },
    { day: 'Day 2', xp: '+1K', active: true },
    { day: 'Day 3', xp: '+1K', active: true },
    { day: 'Day 4', xp: '+1K', active: true },
    { day: 'Day 5', xp: '+5K', active: true, isCurrent: true },
    { day: 'Day 6', xp: '+7.5K', active: false },
    { day: 'Day 7', xp: '+15K', active: false, isBonus: true },
  ];

  const quests: QuestItem[] = [
    {
      id: 'quest-1',
      title: 'Run 3 Deep Research Queries',
      xp: 2500,
      progressText: 'Progress: 3 / 3',
      percent: 100,
      icon: MessageSquare,
      isClaimable: true,
    },
    {
      id: 'quest-2',
      title: 'Trigger Multi-Agent Quant Workflow',
      xp: 5000,
      progressText: 'Progress: 1 / 1',
      percent: 100,
      icon: Bot,
      isClaimable: true,
    },
    {
      id: 'quest-3',
      title: 'Inspect 5 AI Verified Sources in Right Panel',
      xp: 1500,
      progressText: 'Progress: 4 / 5',
      percent: 80,
      icon: FileText,
      isInProgress: true,
    },
    {
      id: 'quest-4',
      title: 'Top up Base Sepolia Testnet ETH',
      xp: 25000,
      progressText: 'Progress: Completed',
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

  const handleClaimBonus = () => {
    if (!claimedBonus) {
      setClaimedBonus(true);
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
      iconBg: 'bg-amber-500/10 text-amber-500',
    },
    {
      id: 'act-2',
      title: 'Testnet Top-up Bonus (2.50 ETH)',
      time: '2 hours ago',
      xp: '+62,500 XP',
      icon: Repeat,
      iconBg: 'bg-emerald-500/10 text-emerald-500',
    },
    {
      id: 'act-3',
      title: 'Referral Commission from 0x38b2...9821',
      time: '4 hours ago',
      xp: '+36,250 XP',
      icon: Gift,
      iconBg: 'bg-pink-500/10 text-pink-500',
    },
    {
      id: 'act-4',
      title: 'Completed QuantAlpha-3 Execution',
      time: 'Yesterday',
      xp: '+12,000 XP',
      icon: Bot,
      iconBg: 'bg-indigo-500/10 text-indigo-500',
    },
    {
      id: 'act-5',
      title: 'Star Conversation Milestone',
      time: '2 days ago',
      xp: '+5,000 XP',
      icon: Star,
      iconBg: 'bg-amber-500/10 text-amber-500',
    },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] text-[var(--text-primary)] px-4 sm:px-8 md:px-12 py-6 scroll-smooth transition-colors duration-200">
      <div className="max-w-[920px] mx-auto space-y-6 pb-20">
        {/* ═══════════════════════════════════════════════════════════
         *  1. TOP BAR HEADER
         * ═══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Zap className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Points & XP Hub
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Earn XP through AI interactions, testnet activity, and referrals.
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase block">
              Total XP Balance
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-xl sm:text-2xl font-extrabold text-amber-500 tabular-nums">
                {totalXp.toLocaleString()} XP
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  2. TOP ROW: LEVEL CARD & 5-DAY STREAK CARD
         * ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Card 1: Level Progress */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-6 shadow-card flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center font-extrabold text-base shadow-md flex-shrink-0">
                7
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)] tracking-tight">
                  Level 7 · Quant Pioneer
                </h2>
                <p className="text-xs text-orange-500 font-semibold mt-0.5">
                  45% to Level 8
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-full h-2.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: '45%' }}
                />
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)] font-mono">
                <span>245,000 XP</span>
                <span>300,000 XP</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: 5-Day Streak */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-6 shadow-card space-y-3.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <Flame className="w-4 h-4 fill-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">5-Day Streak</h3>
                  <p className="text-[11px] text-[var(--text-muted)]">Check in daily to earn more XP</p>
                </div>
              </div>

              <span className="text-xs font-bold px-2.5 py-0.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 rounded-full">
                5 Days
              </span>
            </div>

            {/* 7-Day Badges */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
              {streakDays.map((day) => (
                <div
                  key={day.day}
                  className={`p-1.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    day.isBonus
                      ? 'bg-purple-500/10 border-purple-500/40 text-purple-600 dark:text-purple-400'
                      : day.active
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400'
                      : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-muted)] opacity-60'
                  }`}
                >
                  <span className="text-[10px] font-semibold block">{day.day}</span>
                  <span className="text-[11px] font-bold block mt-0.5">{day.xp}</span>
                </div>
              ))}
            </div>

            {/* Claim Daily Button */}
            <button
              onClick={handleClaimDaily}
              disabled={hasClaimedDaily}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--text-primary)] hover:opacity-95 disabled:opacity-50 text-[var(--bg-app)] text-xs font-bold rounded-xl shadow-button-primary transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{hasClaimedDaily ? 'Daily Bonus Claimed (+5,000 XP)' : 'Claim Daily Bonus (+5,000 XP)'}</span>
            </button>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  3. 4-COLUMN STATS BAR
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 shadow-card">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-color)]">
            {/* Stat 1: Friends Invited */}
            <div className="flex flex-col justify-between pt-3 sm:pt-0 sm:px-3 first:pt-0 first:px-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  Friends Invited
                </span>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[var(--text-primary)] tabular-nums">
                  18
                </p>
                <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-0.5 mt-0.5">
                  <TrendingUp className="w-3 h-3" />
                  +4 this week
                </span>
              </div>
            </div>

            {/* Stat 2: Referral XP Earned */}
            <div className="flex flex-col justify-between pt-3 sm:pt-0 sm:px-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Zap className="w-4 h-4 fill-amber-500" />
                </div>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  XP Earned
                </span>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-amber-500 tabular-nums">
                  450,000 XP
                </p>
                <span className="text-[11px] text-[var(--text-muted)] font-medium mt-0.5 block">
                  20% lifetime commission
                </span>
              </div>
            </div>

            {/* Stat 3: Testnet Volume */}
            <div className="flex flex-col justify-between pt-3 sm:pt-0 sm:px-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center">
                  <TokenIcon symbol="ETH" size={20} />
                </div>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  Testnet Volume
                </span>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[var(--text-primary)] tabular-nums">
                  103.0 ETH
                </p>
                <span className="text-[11px] text-[var(--text-muted)] font-medium mt-0.5 block">
                  Sepolia Testnet
                </span>
              </div>
            </div>

            {/* Stat 4: Pending Bonus */}
            <div className="flex flex-col justify-between pt-3 sm:pt-0 sm:pl-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  Pending Bonus
                </span>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[var(--text-primary)] tabular-nums">
                  {claimedBonus ? '0.00 ETH' : '0.45 ETH'}
                </p>
                <button
                  onClick={handleClaimBonus}
                  disabled={claimedBonus}
                  className="mt-2 w-full py-1.5 px-3 bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] disabled:opacity-60 text-xs font-bold text-[var(--text-primary)] rounded-xl transition-all shadow-2xs cursor-pointer text-center"
                >
                  {claimedBonus ? 'Claimed to Wallet' : 'Claim to Wallet'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  4. ACTIVE QUESTS CARD
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-card overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-[var(--border-color)]">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                Active Quests
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Complete daily tasks to earn XP.
              </p>
            </div>

            <span className="text-xs font-semibold px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full">
              4 of 7 Completed
            </span>
          </div>

          {/* Quests List */}
          <div className="divide-y divide-[var(--border-color)]">
            {quests.map((q) => {
              const IconComp = q.icon;
              const isClaimedNow = claimedQuests.includes(q.id);

              return (
                <div
                  key={q.id}
                  className="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--bg-hover)] transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] flex-shrink-0 mt-0.5 sm:mt-0 shadow-2xs">
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                          {q.title}
                        </span>
                        <span className="text-xs font-extrabold text-amber-500 font-mono">
                          +{q.xp.toLocaleString()} XP
                        </span>
                      </div>

                      {/* Progress Bar & Text */}
                      <div className="space-y-1">
                        <span className="text-[11px] text-[var(--text-muted)] font-medium block">
                          {q.progressText}
                        </span>
                        <div className="w-full max-w-[320px] h-1.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              q.isClaimed || isClaimedNow
                                ? 'bg-emerald-500'
                                : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                            }`}
                            style={{ width: `${q.percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Action Button */}
                  <div className="self-end sm:self-center flex-shrink-0">
                    {q.isClaimed || isClaimedNow ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    ) : q.isClaimable ? (
                      <button
                        onClick={() => handleClaimQuest(q.id, q.xp)}
                        className="px-4 py-1.5 bg-[var(--text-primary)] hover:opacity-90 text-[var(--bg-app)] text-xs font-bold rounded-xl shadow-button-primary transition-all cursor-pointer"
                      >
                        Claim XP
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-1.5 bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-muted)] text-xs font-medium rounded-xl cursor-not-allowed"
                      >
                        In Progress
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer View All */}
          <div className="p-3 bg-[var(--bg-app)]/50 border-t border-[var(--border-color)] text-center">
            <button className="text-xs font-bold text-[var(--text-primary)] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer">
              <span>View all quests</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  5. LEVEL PERKS CARD
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                Level Perks
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Unlock exclusive features as you level up.
              </p>
            </div>

            <button className="text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 cursor-pointer">
              <span>View all levels</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Level Perk Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Level 1 */}
            <div className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Level 1 · Member
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xs font-bold text-[var(--text-primary)] leading-snug">
                Standard AI Chat & Live Market Data
              </p>
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 block tracking-wider uppercase">
                Unlocked
              </span>
            </div>

            {/* Level 5 */}
            <div className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Level 5 · Pro Explorer
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xs font-bold text-[var(--text-primary)] leading-snug">
                50% Discount on AI Pro Subscription
              </p>
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 block tracking-wider uppercase">
                Unlocked
              </span>
            </div>

            {/* Level 7 (CURRENT ACTIVE LEVEL) */}
            <div className="p-4 bg-[var(--bg-app)] border-2 border-purple-500 dark:border-purple-400 rounded-2xl space-y-2.5 relative shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-300 uppercase tracking-wider">
                  Level 7 · Current
                </span>
                <Bookmark className="w-4 h-4 text-purple-500 fill-purple-500" />
              </div>
              <p className="text-xs font-bold text-[var(--text-primary)] leading-snug">
                High-Speed Inference & Priority Subagents
              </p>
              <span className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 block tracking-wider uppercase">
                Active Level
              </span>
            </div>

            {/* Level 10 (Locked) */}
            <div className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Level 10 · Genesis
                </span>
                <Lock className="w-4 h-4 text-[var(--text-muted)]" />
              </div>
              <p className="text-xs font-bold text-[var(--text-primary)] leading-snug">
                Genesis Retroactive Airdrop Tier 1
              </p>
              <span className="text-[10px] font-extrabold text-orange-500 block tracking-wider uppercase">
                Unlocks at 500k XP
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  6. RECENT XP ACTIVITY CARD
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-card overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-[var(--border-color)]">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                Recent XP Activity
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Your latest XP earnings.
              </p>
            </div>

            <button className="text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 cursor-pointer">
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Activity Rows */}
          <div className="divide-y divide-[var(--border-color)]">
            {recentActivities.map((act) => {
              const IconComponent = act.icon;
              return (
                <div
                  key={act.id}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-[var(--bg-hover)] transition-colors text-xs"
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-4">
                    <div className={`w-8 h-8 rounded-xl ${act.iconBg} flex items-center justify-center flex-shrink-0 shadow-2xs`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-[13px] text-[var(--text-primary)] truncate">
                        {act.title}
                      </h4>
                      <span className="text-[11px] text-[var(--text-muted)] block mt-0.5">
                        {act.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-right flex-shrink-0 font-mono font-bold text-xs sm:text-[13px] text-amber-500">
                    <Zap className="w-3.5 h-3.5 fill-amber-500 flex-shrink-0" />
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
