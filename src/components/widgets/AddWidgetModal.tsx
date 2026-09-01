import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Plus,
  Check,
  RotateCcw,
  Search,
  BarChart2,
  Lock,
  ListPlus,
  Compass,
  ArrowLeftRight,
  BookOpen,
  MessageSquare,
  Wallet,
  Sparkles,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { WIDGET_CATALOG, type WidgetCatalogItem } from '../../data/widgetsData';
import type { WidgetType } from '../../types/crypto';

export const AddWidgetModal: React.FC = () => {
  const isOpen = useCryptoStore((s) => s.isAddWidgetModalOpen);
  const setIsOpen = useCryptoStore((s) => s.setIsAddWidgetModalOpen);
  const activeWidgets = useCryptoStore((s) => s.widgets);
  const addWidget = useCryptoStore((s) => s.addWidget);
  const resetWidgetsToDefault = useCryptoStore((s) => s.resetWidgetsToDefault);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Market', 'Whales', 'Flows', 'Portfolio'];

  const filteredCatalog = WIDGET_CATALOG.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getWidgetIconBadge = (type: WidgetType) => {
    switch (type) {
      case 'market-overview':
        return {
          icon: <BarChart2 className="w-5 h-5 text-white" />,
          bg: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20',
        };
      case 'token-unlock':
        return {
          icon: <Lock className="w-5 h-5 text-white" />,
          bg: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20',
        };
      case 'listing-feed':
        return {
          icon: <ListPlus className="w-5 h-5 text-white" />,
          bg: 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20',
        };
      case 'whale-tracking':
        return {
          icon: <Compass className="w-5 h-5 text-white" />,
          bg: 'bg-gradient-to-br from-purple-500 to-violet-600 shadow-purple-500/20',
        };
      case 'exchange-netflow':
        return {
          icon: <ArrowLeftRight className="w-5 h-5 text-white" />,
          bg: 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/20',
        };
      case 'order-book':
        return {
          icon: <BookOpen className="w-5 h-5 text-white" />,
          bg: 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/20',
        };
      case 'sentiment-news':
        return {
          icon: <MessageSquare className="w-5 h-5 text-white" />,
          bg: 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/20',
        };
      case 'portfolio-summary':
        return {
          icon: <Wallet className="w-5 h-5 text-white" />,
          bg: 'bg-gradient-to-br from-[#485442] to-[#2B3527] shadow-emerald-950/20',
        };
    }
  };

  const isAlreadyAdded = (type: WidgetType) => {
    return activeWidgets.some((w) => w.type === type);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity"
      onClick={() => setIsOpen(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[540px] max-h-[85vh] bg-[var(--bg-card)] rounded-[28px] border border-[var(--border-color)] shadow-flyout flex flex-col overflow-hidden"
      >
        {/* iOS Widget Gallery Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-color)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#485442]/10 dark:bg-[#8A9E7F]/20 text-[#485442] dark:text-[#8A9E7F] flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">
                Trading Widget Gallery
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Add modular smart widgets to your crypto sidebar.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-4 border-b border-[var(--border-color)] space-y-3 bg-[var(--bg-card-subtle)]/30">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search widgets (Unlock, Whale, Orderbook, Netflow...)"
              className="w-full h-10 pl-9.5 pr-4 bg-[var(--bg-app)] border border-[var(--border-color)] focus:border-[#485442] dark:focus:border-[#8A9E7F] rounded-[14px] text-xs font-medium text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors"
            />
          </div>

          {/* Segmented Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-[10px] text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#485442] text-white shadow-2xs'
                    : 'bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredCatalog.length === 0 ? (
            <div className="text-center py-10 space-y-2 text-xs text-[var(--text-muted)]">
              <p>No widgets found matching "{searchQuery}"</p>
            </div>
          ) : (
            filteredCatalog.map((item: WidgetCatalogItem) => {
              const active = isAlreadyAdded(item.type);
              const badge = getWidgetIconBadge(item.type);

              return (
                <div
                  key={item.type}
                  className="p-3.5 rounded-[20px] bg-[var(--bg-app)] border border-[var(--border-color)] hover:border-[#485442]/40 transition-all flex items-start justify-between gap-3 shadow-2xs"
                >
                  {/* Left: App Icon & Description */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-[14px] ${badge.bg} flex items-center justify-center shadow-xs flex-shrink-0 mt-0.5`}>
                      {badge.icon}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[13px] font-bold text-[var(--text-primary)]">
                          {item.title}
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] font-semibold">
                          {item.category}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11.5px] text-[var(--text-secondary)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Add Action */}
                  <div className="flex-shrink-0 pt-1">
                    {active ? (
                      <button
                        onClick={() => addWidget(item.type, item.defaultTitle)}
                        className="px-3 py-1.5 rounded-[12px] bg-[var(--bg-card)] border border-[var(--border-color)] text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5 hover:bg-[var(--bg-hover)] transition-all cursor-pointer shadow-2xs"
                        title="Add another instance"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Added +</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => addWidget(item.type, item.defaultTitle)}
                        className="px-3.5 py-1.5 rounded-[12px] bg-[#485442] dark:bg-[#55604e] hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-button-primary cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[var(--border-color)] bg-[var(--bg-card-subtle)]/30 flex items-center justify-between text-xs">
          <button
            onClick={resetWidgetsToDefault}
            className="flex items-center gap-1.5 font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default Stack</span>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-1.5 rounded-[12px] bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
