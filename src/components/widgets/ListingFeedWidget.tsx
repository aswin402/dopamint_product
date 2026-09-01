import React from 'react';
import { motion } from 'framer-motion';

export const ListingFeedWidget: React.FC = () => {
  const listings = [
    {
      id: 'lst-1',
      token: 'PYTH',
      action: 'listed on OKX',
      tag: 'New Listing',
      type: 'new' as const,
      exchange: 'OKX',
      timeAgo: '1h ago',
    },
    {
      id: 'lst-2',
      token: 'XYZ',
      action: 'delisted, Binance',
      tag: 'Delisting',
      type: 'delist' as const,
      exchange: 'Binance',
      timeAgo: '3h ago',
    },
    {
      id: 'lst-3',
      token: 'JUP',
      action: 'perp added, Bybit',
      tag: 'New Perp Pair',
      type: 'perp' as const,
      exchange: 'Bybit',
      timeAgo: '5h ago',
    },
  ];

  return (
    <div className="space-y-2">
      {listings.map((item, idx) => {
        const isNew = item.type === 'new';
        const isDelist = item.type === 'delist';

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: idx * 0.04 }}
            className="flex items-center justify-between p-2.5 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs group hover:border-[#485442]/30 transition-all"
          >
            {/* Left: Token and Action */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-bold text-[11px] shadow-2xs ${
                  isDelist
                    ? 'bg-rose-500/10 text-rose-500'
                    : isNew
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                }`}
              >
                {item.token[0]}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12.5px] font-extrabold text-[var(--text-primary)]">
                    {item.token}
                  </span>
                  <span className="text-[11.5px] text-[var(--text-secondary)] truncate">
                    {item.action}
                  </span>
                </div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.2">
                  {item.exchange} · {item.timeAgo}
                </div>
              </div>
            </div>

            {/* Right: Status Pill */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                isDelist
                  ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/25'
                  : isNew
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25'
                  : 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/25'
              }`}
            >
              {item.tag}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};
