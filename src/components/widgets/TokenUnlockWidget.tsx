import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export const TokenUnlockWidget: React.FC = () => {
  const unlocks = [
    {
      symbol: 'ARB',
      name: 'Arbitrum',
      time: 'in 3d',
      pctSupply: '4.2% supply',
      amountUsd: '$14.8M',
      impact: 'High',
      dateBadge: { month: 'SEP', day: '04' },
    },
    {
      symbol: 'STRK',
      name: 'Starknet',
      time: 'in 9d',
      pctSupply: '1.8% supply',
      amountUsd: '$6.2M',
      impact: 'Medium',
      dateBadge: { month: 'SEP', day: '10' },
    },
    {
      symbol: 'TIA',
      name: 'Celestia',
      time: 'in 14d',
      pctSupply: '0.6% supply',
      amountUsd: '$3.1M',
      impact: 'Low',
      dateBadge: { month: 'SEP', day: '15' },
    },
  ];

  return (
    <div className="space-y-2.5">
      {/* Header Info Pill */}
      <div className="flex items-center justify-between px-1 text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
        <span className="flex items-center gap-1">
          <Lock className="w-3 h-3 text-amber-500" />
          <span>Major Cliff Unlocks</span>
        </span>
        <span className="text-amber-600 dark:text-amber-400 font-mono text-[10px]">
          Next 14 Days
        </span>
      </div>

      {/* Unlock Items */}
      <div className="space-y-2">
        {unlocks.map((item, idx) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: idx * 0.04 }}
            className="flex items-center justify-between p-2.5 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs group hover:border-[#485442]/30 transition-all"
          >
            {/* Left: Token & Calendar Tile */}
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Apple Calendar Mini Tile */}
              <div className="w-10 h-11 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col items-center justify-center flex-shrink-0 shadow-2xs">
                <span className="text-[8.5px] font-extrabold uppercase text-rose-500 leading-none">
                  {item.dateBadge.month}
                </span>
                <span className="text-[14px] font-extrabold font-mono text-[var(--text-primary)] leading-none mt-0.5">
                  {item.dateBadge.day}
                </span>
              </div>

              {/* Token Info */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-extrabold text-[var(--text-primary)]">
                    {item.symbol}
                  </span>
                  <span className="text-[10.5px] font-bold px-1.5 py-0.2 rounded-md bg-[#485442]/10 text-[#485442] dark:text-[#8A9E7F]">
                    {item.time}
                  </span>
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] font-medium mt-0.5">
                  {item.name}
                </div>
              </div>
            </div>

            {/* Right: Supply % & Dollar Value */}
            <div className="text-right flex-shrink-0">
              <div className="text-[12.5px] font-mono font-extrabold text-amber-600 dark:text-amber-400">
                {item.pctSupply}
              </div>
              <div className="text-[10px] text-[var(--text-muted)] font-mono">
                ≈ {item.amountUsd}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
