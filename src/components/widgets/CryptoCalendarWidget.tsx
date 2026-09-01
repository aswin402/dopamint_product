import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Zap, Landmark, Globe, Clock } from 'lucide-react';
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

  // Parse date into Month and Day for iOS Calendar badge
  const parseDateBadge = (dateStr: string) => {
    const parts = dateStr.split(' ');
    const month = parts[0] || 'SEP';
    const day = parts[1]?.replace(',', '') || '01';
    return { month, day };
  };

  return (
    <div className="space-y-3">
      {/* iOS Segmented Filter */}
      <div className="flex items-center p-1 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] overflow-x-auto no-scrollbar gap-1">
        {(['All', 'Unlock', 'Macro', 'Mainnet'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex-shrink-0 cursor-pointer ${
              activeTab === tab
                ? 'bg-[var(--bg-card)] text-[#485442] dark:text-[#8A9E7F] shadow-2xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Events List with Apple Calendar Tiles */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((evt, idx) => {
            const { month, day } = parseDateBadge(evt.date);

            return (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15, delay: idx * 0.03 }}
                className="flex items-center gap-3 p-2.5 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs group hover:border-[#485442]/30 transition-all"
              >
                {/* iOS Calendar Date Tile */}
                <div className="w-11 h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col items-center justify-center flex-shrink-0 shadow-2xs overflow-hidden">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-rose-500 leading-none">
                    {month}
                  </span>
                  <span className="text-[16px] font-extrabold text-[var(--text-primary)] font-mono leading-none mt-0.5">
                    {day}
                  </span>
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(evt.category)}
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                        {evt.category}
                      </span>
                    </div>

                    <span
                      className={`text-[9.5px] px-1.5 py-0.2 rounded-md font-bold ${
                        evt.impact === 'High'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      {evt.impact}
                    </span>
                  </div>

                  <h5 className="text-[12px] font-bold text-[var(--text-primary)] leading-snug line-clamp-1">
                    {evt.title}
                  </h5>

                  <div className="flex items-center justify-between text-[10.5px]">
                    {evt.amount ? (
                      <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400 text-[10.5px]">
                        {evt.amount}
                      </span>
                    ) : (
                      <span className="text-[var(--text-muted)] flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        {evt.timeRemaining}
                      </span>
                    )}

                    <span className="font-semibold text-[#485442] dark:text-[#8A9E7F] text-[10.5px]">
                      {evt.timeRemaining}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
