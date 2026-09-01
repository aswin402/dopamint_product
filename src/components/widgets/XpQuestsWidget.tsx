import React from 'react';
import { Award, Flame, CheckCircle, ArrowRight } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const XpQuestsWidget: React.FC = () => {
  const setActivePage = useCryptoStore((s) => s.setActivePage);

  return (
    <div className="space-y-2.5">
      {/* XP Level Banner */}
      <div className="p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-2 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#485442]/15 dark:bg-[#8A9E7F]/20 text-[#485442] dark:text-[#8A9E7F] flex items-center justify-center font-bold text-xs">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[12px] font-bold text-[var(--text-primary)] leading-none">
                Level 7 Pioneer
              </div>
              <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                Top 1% Trader
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[13px] font-mono font-bold text-[#485442] dark:text-[#8A9E7F]">
              245,000 XP
            </div>
            <div className="text-[9.5px] text-emerald-600 dark:text-emerald-400 font-medium">
              +1,200 today
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="w-full h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
            <div className="h-full bg-[#485442] dark:bg-[#8A9E7F] rounded-full w-[82%]" />
          </div>
          <div className="flex items-center justify-between text-[9.5px] text-[var(--text-muted)]">
            <span>245,000 / 300,000 XP</span>
            <span>82% to Level 8</span>
          </div>
        </div>
      </div>

      {/* Streak & Quests List */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between p-2 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500/20" />
            <span className="text-[11.5px] font-semibold text-[var(--text-primary)]">
              5-Day Login Streak
            </span>
          </div>
          <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-1.5 py-0.2 rounded-md">
            Active 🔥
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[11.5px] font-medium text-[var(--text-primary)]">
              Daily AI Query Quest
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
            +500 XP
          </span>
        </div>
      </div>

      {/* View full hub button */}
      <button
        onClick={() => setActivePage('points')}
        className="w-full py-2 px-3 rounded-xl bg-[var(--bg-card)] hover:bg-[#485442] hover:text-white border border-[var(--border-color)] text-[11.5px] font-semibold text-[var(--text-secondary)] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
      >
        <span>Open XP & Quests Hub</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};
