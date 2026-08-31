import React, { useState } from 'react';
import {
  Zap,
  Flame,
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  TrendingUp,
  Coins,
  Bot,
  Calendar,
  Gift,
} from 'lucide-react';

export const PointsXpPage: React.FC = () => {
  const [hasClaimedDaily, setHasClaimedDaily] = useState(false);
  const [claimedQuests, setClaimedQuests] = useState<string[]>(['quest-1']);
  const [activeXp, setActiveXp] = useState(245000);

  const streakDays = [
    { day: 'Day 1', xp: '+500 XP', done: true },
    { day: 'Day 2', xp: '+1,000 XP', done: true },
    { day: 'Day 3', xp: '+1,500 XP', done: true },
    { day: 'Day 4', xp: '+2,500 XP', done: true },
    { day: 'Day 5', xp: '+5,000 XP', done: true, isToday: true },
    { day: 'Day 6', xp: '+7,500 XP', done: false },
    { day: 'Day 7', xp: '+15k XP + 🎁', done: false, isBonus: true },
  ];

  const handleClaimDaily = () => {
    if (!hasClaimedDaily) {
      setHasClaimedDaily(true);
      setActiveXp((prev) => prev + 5000);
    }
  };

  const handleClaimQuest = (id: string, xpAmount: number) => {
    if (!claimedQuests.includes(id)) {
      setClaimedQuests((prev) => [...prev, id]);
      setActiveXp((prev) => prev + xpAmount);
    }
  };

  const quests = [
    {
      id: 'quest-daily-1',
      title: 'Run 3 Deep Research Queries',
      category: 'Daily Quest',
      xp: 2500,
      progress: '3/3',
      isCompleted: true,
    },
    {
      id: 'quest-daily-2',
      title: 'Trigger Multi-Agent Quant Workflow',
      category: 'Daily Quest',
      xp: 5000,
      progress: '1/1',
      isCompleted: true,
    },
    {
      id: 'quest-daily-3',
      title: 'Inspect 5 AI Verified Sources in Right Panel',
      category: 'Daily Quest',
      xp: 1500,
      progress: '4/5',
      isCompleted: false,
    },
    {
      id: 'quest-milestone-1',
      title: 'Top up Base Sepolia Testnet ETH',
      category: 'Milestone',
      xp: 25000,
      progress: 'Completed',
      isCompleted: true,
    },
    {
      id: 'quest-milestone-2',
      title: 'Invite 5 Active Traders via Referral Link',
      category: 'Milestone',
      xp: 50000,
      progress: '3/5',
      isCompleted: false,
    },
    {
      id: 'quest-milestone-3',
      title: 'Star 3 Favorite Conversations',
      category: 'Milestone',
      xp: 5000,
      progress: 'Completed',
      isCompleted: true,
    },
    {
      id: 'quest-milestone-4',
      title: 'Connect Warpcast / Farcaster Social ID',
      category: 'Special Quest',
      xp: 10000,
      progress: 'Ready',
      isCompleted: false,
    },
  ];

  const xpHistory = [
    {
      title: 'Daily Streak Bonus (Day 5)',
      time: 'Just now',
      category: 'Daily Check-in',
      xp: '+5,000 XP',
      icon: Flame,
      iconColor: 'text-amber-500',
    },
    {
      title: 'Testnet Top-up Bonus (2.50 ETH)',
      time: '2 hours ago',
      category: 'Deposit XP',
      xp: '+62,500 XP',
      icon: Coins,
      iconColor: 'text-emerald-500',
    },
    {
      title: 'Referral Commission from 0x38b2...9821',
      time: '4 hours ago',
      category: 'Referrals',
      xp: '+36,250 XP',
      icon: Gift,
      iconColor: 'text-purple-500',
    },
    {
      title: 'Completed QuantAlpha-3 Execution',
      time: 'Yesterday',
      category: 'AI Task',
      xp: '+12,000 XP',
      icon: Bot,
      iconColor: 'text-blue-500',
    },
    {
      title: 'Star Conversation Milestone',
      time: '2 days ago',
      category: 'Milestone',
      xp: '+5,000 XP',
      icon: Sparkles,
      iconColor: 'text-amber-400',
    },
  ];

  const currentLevel = 7;
  const currentLevelXp = 245000;
  const nextLevelXp = 300000;
  const progressPercent = Math.round(((currentLevelXp - 200000) / (nextLevelXp - 200000)) * 100);

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] text-[var(--text-primary)] transition-colors duration-200">
      {/* ─────────────────────────────────────────────────────────────
       *  TOP HEADER
       * ───────────────────────────────────────────────────────────── */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-card)] px-6 py-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 text-amber-500 flex items-center justify-center border border-amber-500/20 shadow-xs flex-shrink-0">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  Points & XP Hub
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-wide">
                  Level {currentLevel} · Quant Pioneer
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  2.5x Multiplier
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                Earn XP through daily AI research, testnet deposits, maintaining streaks, and referring friends.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
                Total XP Balance
              </span>
              <div className="flex items-center gap-1 text-2xl sm:text-3xl font-black font-mono text-amber-500">
                <Zap className="w-6 h-6 fill-current" />
                <span>{activeXp.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6">
        {/* ─────────────────────────────────────────────────────────────
         *  LEVEL PROGRESSION & STREAK BANNER
         * ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Level Progress Card */}
          <div className="md:col-span-7 p-6 sm:p-7 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm space-y-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[var(--primary)] text-white font-black text-lg flex items-center justify-center shadow-xs">
                  {currentLevel}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[var(--text-primary)]">
                    Level {currentLevel}: Quant Pioneer
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Tier unlocks priority LLM inference & 50% Pro subscription discount
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-[var(--primary)] bg-[var(--primary-light)] px-3 py-1 rounded-full">
                {progressPercent}% to Level {currentLevel + 1}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-3.5 bg-[var(--bg-app)] rounded-full overflow-hidden p-0.5 border border-[var(--border-color)]">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-[var(--primary)] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-[var(--text-muted)] font-mono">
                <span>{activeXp.toLocaleString()} XP</span>
                <span>{nextLevelXp.toLocaleString()} XP (Level {currentLevel + 1})</span>
              </div>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">
                  XP Multiplier
                </span>
                <span className="text-sm font-extrabold text-amber-500 font-mono">2.5x Boost</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">
                  Weekly Yield
                </span>
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">+12.4%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">
                  Retroactive Tier
                </span>
                <span className="text-sm font-extrabold text-purple-500 font-mono">Tier Alpha</span>
              </div>
            </div>
          </div>

          {/* Daily Streak Card */}
          <div className="md:col-span-5 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-500/10 via-[var(--bg-card)] to-[var(--bg-card)] border border-amber-500/30 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center shadow-2xs">
                  <Flame className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[var(--text-primary)]">
                    5-Day Streak Active
                  </h3>
                  <span className="text-xs text-[var(--text-muted)]">Check in daily for multipliers</span>
                </div>
              </div>

              <span className="text-xs font-black text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                🔥 5 Days
              </span>
            </div>

            {/* Streak 7 Days Mini Badges */}
            <div className="grid grid-cols-7 gap-1 text-center pt-2">
              {streakDays.map((s, idx) => (
                <div
                  key={idx}
                  className={`p-1.5 rounded-xl border text-[10px] font-bold space-y-0.5 ${
                    s.done
                      ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-400'
                      : s.isBonus
                      ? 'bg-purple-500/10 border-purple-500/30 text-purple-500'
                      : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-muted)]'
                  }`}
                >
                  <span>{s.day}</span>
                  <span className="block text-[9px] font-mono">{s.xp}</span>
                </div>
              ))}
            </div>

            {/* Claim Daily Button */}
            <button
              onClick={handleClaimDaily}
              disabled={hasClaimedDaily}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-button-primary cursor-pointer flex items-center justify-center gap-2 ${
                hasClaimedDaily
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-[var(--primary)] hover:opacity-95 text-white'
              }`}
            >
              {hasClaimedDaily ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Claimed +5,000 XP Today!</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Claim Daily Check-in (+5,000 XP)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
         *  ACTIVE QUESTS & BOUNTIES
         * ───────────────────────────────────────────────────────────── */}
        <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-extrabold text-base text-[var(--text-primary)]">
                Active Quests & XP Tasks
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Complete daily prompts, subagents tasks, and on-chain testnet deposits
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
              {quests.filter((q) => q.isCompleted).length} of {quests.length} Completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {quests.map((quest) => {
              const isClaimed = claimedQuests.includes(quest.id);

              return (
                <div
                  key={quest.id}
                  className="p-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-between gap-3 hover:border-[var(--primary)]/40 transition-all"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.2 rounded bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)]">
                        {quest.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-500">
                        +{quest.xp.toLocaleString()} XP
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">
                      {quest.title}
                    </h4>
                    <span className="text-[11px] text-[var(--text-muted)] block">
                      Progress: {quest.progress}
                    </span>
                  </div>

                  <div>
                    {isClaimed ? (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Claimed
                      </span>
                    ) : quest.isCompleted ? (
                      <button
                        onClick={() => handleClaimQuest(quest.id, quest.xp)}
                        className="px-3.5 py-1.5 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:opacity-95 transition-all shadow-button-primary cursor-pointer"
                      >
                        Claim XP
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] text-xs font-medium">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
         *  LEVEL UNLOCKS & ECOSYSTEM UTILITY
         * ───────────────────────────────────────────────────────────── */}
        <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-4">
          <div>
            <h3 className="font-extrabold text-base text-[var(--text-primary)]">
              Level Perks & Retroactive Utility
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              XP unlocks exclusive AI features, fee rebates, and genesis allocation rights
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            <div className="p-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--primary)]">Level 1 · Member</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xs text-[var(--text-primary)] font-semibold">Standard AI Chat & Live Market Data</p>
              <span className="text-[10px] text-emerald-600 font-bold uppercase">Unlocked</span>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--primary)]">Level 5 · Pro Explorer</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xs text-[var(--text-primary)] font-semibold">50% Discount on AI Pro Subscription</p>
              <span className="text-[10px] text-emerald-600 font-bold uppercase">Unlocked</span>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--primary-light)]/40 border-2 border-[var(--primary)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--primary)]">Level 7 · Current</span>
                <Award className="w-4 h-4 text-[var(--primary)]" />
              </div>
              <p className="text-xs text-[var(--text-primary)] font-semibold">High-Speed Inference & Priority Subagents</p>
              <span className="text-[10px] text-[var(--primary)] font-bold uppercase">Active Level</span>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-2 opacity-75">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-muted)]">Level 10 · Genesis</span>
                <Lock className="w-4 h-4 text-[var(--text-muted)]" />
              </div>
              <p className="text-xs text-[var(--text-muted)] font-medium">Genesis Retroactive Airdrop Tier 1</p>
              <span className="text-[10px] text-amber-500 font-bold uppercase">Unlocks at 500k XP</span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
         *  RECENT XP ACTIVITY HISTORY LOG
         * ───────────────────────────────────────────────────────────── */}
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-2xs">
          <div className="px-6 py-4 border-b border-[var(--border-color)] flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-[var(--text-primary)]">
                Recent XP Activity Log
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Real-time reward points distribution history
              </p>
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="divide-y divide-[var(--border-color)]">
            {xpHistory.map((item, idx) => {
              const IconComp = item.icon;

              return (
                <div
                  key={idx}
                  className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-[var(--bg-hover)] transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-9 h-9 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 ${item.iconColor}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-[var(--text-muted)]">
                        {item.category} • {item.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex-shrink-0">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-mono text-xs sm:text-sm font-black text-amber-500">
                      {item.xp}
                    </span>
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
