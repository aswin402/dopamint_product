import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Landmark } from 'lucide-react';
import { TokenIcon } from '../common/TokenIcon';

export const SentimentNewsWidget: React.FC = () => {
  return (
    <div className="space-y-2.5">
      {/* Social Buzz Velocity Hero */}
      <div className="p-3.5 rounded-[20px] bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/5 border border-purple-500/20 shadow-2xs space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[var(--bg-card)] flex items-center justify-center shadow-2xs">
              <TokenIcon symbol="SOL" size={18} />
            </div>
            <span className="text-[12.5px] font-extrabold text-[var(--text-primary)]">
              SOL Social Velocity
            </span>
          </div>

          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            +34%
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)] pt-0.5">
          <span>Social mention volume spike</span>
          <span className="font-semibold text-purple-600 dark:text-purple-400">High Buzz 🔥</span>
        </div>
      </div>

      {/* Headlines List */}
      <div className="space-y-1.5">
        {/* ETF Inflow Headline */}
        <motion.div
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-2.5 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Institutional Inflows
            </span>
            <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-0.5">
              <Clock className="w-2.5 h-2.5" />
              2h ago
            </span>
          </div>
          <h5 className="text-[12px] font-bold text-[var(--text-primary)] leading-snug">
            Bitcoin ETFs see record $378M single-day net inflows
          </h5>
        </motion.div>

        {/* EU Regulatory News */}
        <motion.div
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          className="p-2.5 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1">
              <Landmark className="w-2.5 h-2.5" />
              Regulatory News · EU
            </span>
            <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-0.5">
              <Clock className="w-2.5 h-2.5" />
              5h ago
            </span>
          </div>
          <h5 className="text-[12px] font-bold text-[var(--text-primary)] leading-snug">
            EU MiCA framework roadmap finalized for regulated exchange compliance
          </h5>
        </motion.div>
      </div>
    </div>
  );
};
