import React, { useState } from 'react';
import { Award, Flame, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const XpQuestsWidget: React.FC = () => {
  const setActivePage = useCryptoStore((s) => s.setActivePage);
  const [claimed, setClaimed] = useState(false);

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = 82; // 82% to level 8
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="space-y-3">
      {/* Apple Activity Rings Style Progress Card */}
      <div className="p-3.5 rounded-[20px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs flex items-center justify-between gap-3">
        {/* Left: Text stats */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              XP Progression
            </span>
            <span className="text-[9.5px] px-1.5 py-0.2 rounded-full font-bold bg-[#485442]/10 text-[#485442] dark:text-[#8A9E7F]">
              Top 1%
            </span>
          </div>

          <div className="text-[15px] font-extrabold text-[var(--text-primary)] leading-tight">
            Level 7 Pioneer
          </div>

          <div className="text-[13px] font-mono font-bold text-[#485442] dark:text-[#8A9E7F]">
            245,000 XP
          </div>

          <div className="text-[10px] text-[var(--text-muted)]">
            55,000 XP to Level 8
          </div>
        </div>

        {/* Right: Apple Fitness Style Circular Ring */}
        <div className="relative w-18 h-18 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
            {/* Background Track */}
            <circle
              cx="36"
              cy="36"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-black/5 dark:text-white/10"
            />
            {/* Active Progress Ring */}
            <circle
              cx="36"
              cy="36"
              r={radius}
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#485442" />
                <stop offset="100%" stopColor="#8A9E7F" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Trophy Icon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <Award className="w-5 h-5 text-[#485442] dark:text-[#8A9E7F]" />
            <span className="text-[9px] font-mono font-bold text-[var(--text-primary)]">
              82%
            </span>
          </div>
        </div>
      </div>

      {/* Streak Banner with Instant Claim */}
      <div className="p-3 rounded-[18px] bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-orange-500/20 shadow-2xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center">
            <Flame className="w-4 h-4 fill-orange-500" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-[var(--text-primary)]">
              5-Day Streak 🔥
            </div>
            <div className="text-[10px] text-orange-600 dark:text-orange-400 font-semibold">
              +1,500 XP Daily Boost
            </div>
          </div>
        </div>

        <button
          onClick={() => setClaimed(true)}
          disabled={claimed}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer ${
            claimed
              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
              : 'bg-[#485442] text-white hover:opacity-90'
          }`}
        >
          {claimed ? 'Claimed ✓' : 'Claim'}
        </button>
      </div>

      {/* Daily Quests Summary */}
      <div className="p-2.5 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
          <span>Active Quests</span>
          <span className="text-[#485442] dark:text-[#8A9E7F]">3 / 4 Done</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11.5px] p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)]">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-medium text-[var(--text-primary)]">Execute 1 Testnet Swap</span>
            </div>
            <span className="text-[10.5px] font-mono font-bold text-emerald-600 dark:text-emerald-400">+500 XP</span>
          </div>

          <div className="flex items-center justify-between text-[11.5px] p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)]">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span className="font-medium text-[var(--text-primary)]">Ask AI Market Analysis</span>
            </div>
            <span className="text-[10.5px] font-mono font-bold text-blue-600 dark:text-blue-400">+250 XP</span>
          </div>
        </div>
      </div>

      {/* Open Full Hub */}
      <button
        onClick={() => setActivePage('points')}
        className="w-full py-2.5 px-3 rounded-[16px] bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
      >
        <span>Open XP & Quests Hub</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
