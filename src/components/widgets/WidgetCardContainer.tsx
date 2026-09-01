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

  const getWidgetIcon = (type: WidgetType) => {
    switch (type) {
      case 'crypto-news':
        return <Newspaper className="w-3.5 h-3.5 text-[#485442] dark:text-[#8A9E7F]" />;
      case 'crypto-calendar':
        return <Calendar className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />;
      case 'market-stats':
        return <BarChart2 className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />;
      case 'trending-coins':
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />;
      case 'xp-quests':
        return <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />;
      case 'portfolio-summary':
        return <Wallet className="w-3.5 h-3.5 text-[#485442] dark:text-[#8A9E7F]" />;
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -6 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs overflow-hidden transition-colors"
    >
      {/* Widget Header Bar */}
      <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-[var(--border-color)]/60 bg-[var(--bg-card-subtle)]/40 select-none">
        {/* Left: Icon & Title */}
        <div
          onClick={() => toggleWidgetExpand(widget.id)}
          className="flex items-center gap-2 min-w-0 cursor-pointer flex-1 group"
        >
          <div className="p-1 rounded-lg bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs group-hover:border-[#485442]/40 transition-colors">
            {getWidgetIcon(widget.type)}
          </div>
          <h4 className="text-[12.5px] font-semibold text-[var(--text-primary)] truncate group-hover:text-[#485442] dark:group-hover:text-[#8A9E7F] transition-colors">
            {widget.title}
          </h4>
        </div>

        {/* Right: Controls (Move up/down, Expand, Delete) */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {/* Move Up */}
          <button
            onClick={() => moveWidgetUp(widget.id)}
            disabled={index === 0}
            title="Move Widget Up"
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-all"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>

          {/* Move Down */}
          <button
            onClick={() => moveWidgetDown(widget.id)}
            disabled={index === totalCount - 1}
            title="Move Widget Down"
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-all"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Expand/Collapse Toggle */}
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
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer ml-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Widget Body with smooth accordion collapse */}
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
            <div className="p-3">
              {renderWidgetContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
