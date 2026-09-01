import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  X,
  Newspaper,
  Calendar,
  BarChart2,
  TrendingUp,
  Award,
  Wallet,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import type { WidgetConfig, WidgetType } from '../../types/crypto';
import { CryptoNewsWidget } from './CryptoNewsWidget';
import { CryptoCalendarWidget } from './CryptoCalendarWidget';
import { MarketStatsWidget } from './MarketStatsWidget';
import { TrendingCoinsWidget } from './TrendingCoinsWidget';
import { XpQuestsWidget } from './XpQuestsWidget';
import { PortfolioSummaryWidget } from './PortfolioSummaryWidget';

interface WidgetCardContainerProps {
  widget: WidgetConfig;
  index: number;
  totalCount: number;
}

export const WidgetCardContainer: React.FC<WidgetCardContainerProps> = ({
  widget,
  index,
  totalCount,
}) => {
  const removeWidget = useCryptoStore((s) => s.removeWidget);
  const toggleWidgetExpand = useCryptoStore((s) => s.toggleWidgetExpand);
  const moveWidgetUp = useCryptoStore((s) => s.moveWidgetUp);
  const moveWidgetDown = useCryptoStore((s) => s.moveWidgetDown);

  const getWidgetIconBadge = (type: WidgetType) => {
    switch (type) {
      case 'crypto-news':
        return {
          icon: <Newspaper className="w-3.5 h-3.5 text-white" />,
          bg: 'bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/20',
        };
      case 'crypto-calendar':
        return {
          icon: <Calendar className="w-3.5 h-3.5 text-white" />,
          bg: 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20',
        };
      case 'market-stats':
        return {
          icon: <BarChart2 className="w-3.5 h-3.5 text-white" />,
          bg: 'bg-gradient-to-br from-purple-500 to-violet-600 shadow-purple-500/20',
        };
      case 'trending-coins':
        return {
          icon: <TrendingUp className="w-3.5 h-3.5 text-white" />,
          bg: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20',
        };
      case 'xp-quests':
        return {
          icon: <Award className="w-3.5 h-3.5 text-white" />,
          bg: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20',
        };
      case 'portfolio-summary':
        return {
          icon: <Wallet className="w-3.5 h-3.5 text-white" />,
          bg: 'bg-gradient-to-br from-[#485442] to-[#2B3527] shadow-emerald-950/20',
        };
    }
  };

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'crypto-news':
        return <CryptoNewsWidget />;
      case 'crypto-calendar':
        return <CryptoCalendarWidget />;
      case 'market-stats':
        return <MarketStatsWidget />;
      case 'trending-coins':
        return <TrendingCoinsWidget />;
      case 'xp-quests':
        return <XpQuestsWidget />;
      case 'portfolio-summary':
        return <PortfolioSummaryWidget />;
      default:
        return null;
    }
  };

  const badge = getWidgetIconBadge(widget.type);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -6 }}
      transition={{ duration: 0.2 }}
      className="group rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-[0_3px_14px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] overflow-hidden transition-all duration-200"
    >
      {/* iOS Widget Header Bar */}
      <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-[var(--border-color)]/50 bg-[var(--bg-card-subtle)]/30 select-none">
        {/* Left: App Icon Badge & Bold Title */}
        <div
          onClick={() => toggleWidgetExpand(widget.id)}
          className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
        >
          <div className={`w-6 h-6 rounded-lg ${badge.bg} flex items-center justify-center shadow-xs flex-shrink-0`}>
            {badge.icon}
          </div>
          <h4 className="text-[13px] font-bold text-[var(--text-primary)] tracking-tight truncate">
            {widget.title}
          </h4>
        </div>

        {/* Right: iOS Controls */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {/* Move Up */}
          <button
            onClick={() => moveWidgetUp(widget.id)}
            disabled={index === 0}
            title="Move Up"
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>

          {/* Move Down */}
          <button
            onClick={() => moveWidgetDown(widget.id)}
            disabled={index === totalCount - 1}
            title="Move Down"
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Expand/Collapse */}
          <button
            onClick={() => toggleWidgetExpand(widget.id)}
            title={widget.isExpanded ? 'Collapse Widget' : 'Expand Widget'}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all cursor-pointer ml-0.5"
          >
            <motion.div
              animate={{ rotate: widget.isExpanded ? 180 : 0 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.div>
          </button>

          {/* Remove Widget */}
          <button
            onClick={() => removeWidget(widget.id)}
            title="Remove Widget"
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer ml-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Widget Body */}
      <AnimatePresence initial={false}>
        {widget.isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-3.5">
              {renderWidgetContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
