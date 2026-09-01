import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Clock } from 'lucide-react';
import { INITIAL_NEWS } from '../../data/newsData';

export const CryptoNewsWidget: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'DeFi', 'Layer 2', 'Macro', 'Institutional'];

  const filteredNews = selectedCategory === 'All'
    ? INITIAL_NEWS
    : INITIAL_NEWS.filter((n) => n.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-3">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all flex-shrink-0 cursor-pointer text-[11px] ${
              selectedCategory === cat
                ? 'bg-[#485442] text-white shadow-2xs'
                : 'bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] border border-[var(--border-color)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {filteredNews.map((item, idx) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, delay: idx * 0.03 }}
              className="group block p-2.5 rounded-xl bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] hover:border-[#485442]/40 transition-all shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-semibold text-[#485442] dark:text-[#8A9E7F] uppercase tracking-wider">
                  {item.source}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[9.5px] px-1.5 py-0.2 rounded-md font-medium ${
                      item.sentiment === 'bullish'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : item.sentiment === 'bearish'
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                        : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20'
                    }`}
                  >
                    {item.sentiment}
                  </span>
                  <ExternalLink className="w-3 h-3 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors opacity-0 group-hover:opacity-100" />
                </div>
              </div>

              <h5 className="text-[12px] font-semibold text-[var(--text-primary)] group-hover:text-[#485442] dark:group-hover:text-[#8A9E7F] transition-colors leading-snug line-clamp-2 mt-1">
                {item.title}
              </h5>

              <div className="flex items-center gap-2 mt-1.5 text-[10.5px] text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {item.timeAgo}
                </span>
                <span>•</span>
                <span>{item.readTime}</span>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
