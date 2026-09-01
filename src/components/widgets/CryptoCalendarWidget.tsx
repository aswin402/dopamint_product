import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Lock, Zap, Landmark, Globe } from 'lucide-react';
import { INITIAL_CALENDAR_EVENTS, type CalendarEvent } from '../../data/calendarData';

export const CryptoCalendarWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Unlock' | 'Macro' | 'Mainnet'>('All');

  const filteredEvents = activeTab === 'All'
    ? INITIAL_CALENDAR_EVENTS
    : INITIAL_CALENDAR_EVENTS.filter((e) => e.category === activeTab);

  const getCategoryIcon = (cat: CalendarEvent['category']) => {
    switch (cat) {
      case 'Unlock':
        return <Lock className="w-3 h-3 text-amber-500" />;
      case 'Mainnet':
        return <Zap className="w-3 h-3 text-emerald-500" />;
      case 'Macro':
        return <Landmark className="w-3 h-3 text-purple-500" />;
      case 'Governance':
        return <Globe className="w-3 h-3 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-3">
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {(['All', 'Unlock', 'Macro', 'Mainnet'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all flex-shrink-0 cursor-pointer text-[11px] ${
              activeTab === tab
                ? 'bg-[#485442] text-white shadow-2xs'
                : 'bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] border border-[var(--border-color)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((evt, idx) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, delay: idx * 0.03 }}
              className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-1.5 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  {getCategoryIcon(evt.category)}
                  <span className="text-[10.5px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                    {evt.category}
                  </span>
                </div>
                <span
                  className={`text-[9.5px] px-1.5 py-0.2 rounded-md font-semibold ${
                    evt.impact === 'High'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                  }`}
                >
                  {evt.impact} Impact
                </span>
              </div>

              <h5 className="text-[12px] font-semibold text-[var(--text-primary)] leading-snug">
                {evt.title}
              </h5>

              {evt.amount && (
                <div className="text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  Unlock: {evt.amount}
                </div>
              )}

              <div className="flex items-center justify-between text-[10.5px] text-[var(--text-muted)] pt-0.5 border-t border-[var(--border-color)]/50">
                <span className="flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5" />
                  {evt.date}
                </span>
                <span className="font-medium text-[#485442] dark:text-[#8A9E7F]">
                  {evt.timeRemaining}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
