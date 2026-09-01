import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Plus,
  Check,
  RotateCcw,
  Search,
  Newspaper,
  Calendar,
  BarChart2,
  TrendingUp,
  Award,
  Wallet,
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

  const categories = ['All', 'Market', 'News', 'Activity', 'Portfolio'];

  const filteredCatalog = WIDGET_CATALOG.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getWidgetIcon = (type: WidgetType) => {
    switch (type) {
      case 'crypto-news':
        return <Newspaper className="w-5 h-5 text-[#485442] dark:text-[#8A9E7F]" />;
      case 'crypto-calendar':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'market-stats':
        return <BarChart2 className="w-5 h-5 text-purple-500" />;
      case 'trending-coins':
        return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'xp-quests':
        return <Award className="w-5 h-5 text-amber-500" />;
      case 'portfolio-summary':
        return <Wallet className="w-5 h-5 text-[#485442] dark:text-[#8A9E7F]" />;
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
        {/* Modal Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-color)] flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Widget Catalog
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Add modular widgets to your right-side insights sidebar.
            </p>
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
              placeholder="Search available widgets..."
              className="w-full h-10 pl-9.5 pr-4 bg-[var(--bg-app)] border border-[var(--border-color)] focus:border-[#485442] dark:focus:border-[#8A9E7F] rounded-xl text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex-shrink-0 cursor-pointer ${
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
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredCatalog.length === 0 ? (
            <div className="text-center py-10 space-y-2 text-xs text-[var(--text-muted)]">
              <p>No widgets found matching "{searchQuery}"</p>
            </div>
          ) : (
            filteredCatalog.map((item: WidgetCatalogItem) => {
              const active = isAlreadyAdded(item.type);

              return (
                <div
                  key={item.type}
                  className="p-3.5 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] hover:border-[#485442]/30 transition-all flex items-start justify-between gap-3 shadow-2xs"
                >
                  {/* Left: Icon & Description */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs mt-0.5">
                      {getWidgetIcon(item.type)}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[13px] font-bold text-[var(--text-primary)]">
                          {item.title}
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] font-medium">
                          {item.category}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11.5px] text-[var(--text-secondary)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Add / Added Button */}
                  <div className="flex-shrink-0 pt-0.5">
                    {active ? (
                      <button
                        onClick={() => addWidget(item.type, item.defaultTitle)}
                        className="px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1.5 hover:bg-[var(--bg-hover)] transition-all cursor-pointer shadow-2xs"
                        title="Add another instance"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Add +</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => addWidget(item.type, item.defaultTitle)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#485442] dark:bg-[#55604e] hover:opacity-90 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-button-primary cursor-pointer"
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
            className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Layout</span>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-primary)] font-semibold hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
