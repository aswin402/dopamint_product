import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Clock, Newspaper, ArrowUpRight } from 'lucide-react';
import { INITIAL_NEWS } from '../../data/newsData';

export const CryptoNewsWidget: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'DeFi', 'Layer 2', 'Macro'];

  const filteredNews = selectedCategory === 'All'
    ? INITIAL_NEWS
    : INITIAL_NEWS.filter((n) => n.category.toLowerCase() === selectedCategory.toLowerCase());

  const heroNews = filteredNews[0];
  const secondaryNews = filteredNews.slice(1);

  return (
    <div className="space-y-3">
      {/* iOS Segmented Pill Filter */}
      <div className="flex items-center p-1 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] overflow-x-auto no-scrollbar gap-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex-shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[var(--bg-card)] text-[#485442] dark:text-[#8A9E7F] shadow-2xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Apple News Style Hero Headline Card */}
      {heroNews && (
        <motion.a
          key={heroNews.id}
          href={heroNews.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="group block p-3.5 rounded-[20px] bg-[var(--bg-app)] border border-[var(--border-color)] hover:border-[#485442]/40 transition-all shadow-2xs space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-[#485442]/10 dark:bg-[#8A9E7F]/20 text-[#485442] dark:text-[#8A9E7F] flex items-center justify-center font-bold text-[9px]">
                <Newspaper className="w-2.5 h-2.5" />
              </span>
              <span className="text-[10px] font-bold text-[#485442] dark:text-[#8A9E7F] uppercase tracking-wider">
                {heroNews.source}
              </span>
            </div>
            <span
              className={`text-[9.5px] px-2 py-0.5 rounded-full font-bold ${
                heroNews.sentiment === 'bullish'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-500/10 text-slate-600'
              }`}
            >
              {heroNews.sentiment}
            </span>
          </div>

          <h4 className="text-[13px] font-bold text-[var(--text-primary)] group-hover:text-[#485442] dark:group-hover:text-[#8A9E7F] transition-colors leading-snug">
            {heroNews.title}
          </h4>

          <div className="flex items-center justify-between pt-1 text-[10.5px] text-[var(--text-muted)] border-t border-[var(--border-color)]/60">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {heroNews.timeAgo} · {heroNews.readTime}
            </span>
            <span className="flex items-center gap-0.5 text-[#485442] dark:text-[#8A9E7F] font-semibold group-hover:underline">
              <span>Read</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </motion.a>
      )}

      {/* Secondary Compact Articles */}
      <div className="space-y-1.5">
        <AnimatePresence mode="popLayout">
          {secondaryNews.map((item, idx) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, delay: idx * 0.03 }}
              className="group flex items-start justify-between gap-2.5 p-2.5 rounded-[16px] bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] hover:border-[#485442]/30 transition-all shadow-2xs"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-bold text-[#485442] dark:text-[#8A9E7F] uppercase">
                    {item.source}
                  </span>
                  <span className="text-[9.5px] text-[var(--text-muted)]">• {item.timeAgo}</span>
                </div>
                <h5 className="text-[11.5px] font-semibold text-[var(--text-primary)] group-hover:text-[#485442] dark:group-hover:text-[#8A9E7F] transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h5>
              </div>

              <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100" />
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
