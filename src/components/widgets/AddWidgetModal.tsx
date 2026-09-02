import React, { useState } from 'react';
import {
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
  LayoutGrid,
} from 'lucide-react';
import { Modal, Button } from '../ui';
import { useCryptoStore } from '../../store/useCryptoStore';
import { WIDGET_CATALOG } from '../../data/widgetsData';
import type { WidgetType } from '../../types/crypto';

export const AddWidgetModal: React.FC = () => {
  const isOpen = useCryptoStore((s) => s.isAddWidgetModalOpen);
  const setIsOpen = useCryptoStore((s) => s.setIsAddWidgetModalOpen);
  const activeWidgets = useCryptoStore((s) => s.widgets);
  const addWidget = useCryptoStore((s) => s.addWidget);
  const resetWidgetsToDefault = useCryptoStore((s) => s.resetWidgetsToDefault);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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
          icon: <BarChart2 className="w-4 h-4 text-white" />,
          bg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
        };
      case 'token-unlock':
        return {
          icon: <Lock className="w-4 h-4 text-white" />,
          bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
        };
      case 'listing-feed':
        return {
          icon: <ListPlus className="w-4 h-4 text-white" />,
          bg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
        };
      case 'whale-tracking':
        return {
          icon: <Compass className="w-4 h-4 text-white" />,
          bg: 'bg-gradient-to-br from-purple-500 to-violet-600',
        };
      case 'exchange-netflow':
        return {
          icon: <ArrowLeftRight className="w-4 h-4 text-white" />,
          bg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
        };
      case 'order-book':
        return {
          icon: <BookOpen className="w-4 h-4 text-white" />,
          bg: 'bg-gradient-to-br from-rose-500 to-pink-600',
        };
      case 'sentiment-news':
        return {
          icon: <MessageSquare className="w-4 h-4 text-white" />,
          bg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
        };
      case 'portfolio-summary':
        return {
          icon: <Wallet className="w-4 h-4 text-white" />,
          bg: 'bg-gradient-to-br from-[#485442] to-[#2B3527]',
        };
    }
  };

  const isAlreadyAdded = (type: WidgetType) => {
    return activeWidgets.some((w) => w.type === type);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Add Telemetry Widget"
      subtitle="Customize your right-hand insights panel with modular crypto widgets"
      icon={<LayoutGrid className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-3.5 max-h-[70vh] flex flex-col">
        {/* Search and Categories Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search widget catalog..."
              className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl pl-8.5 pr-3 py-1.5 text-xs text-[var(--text-primary)] outline-none focus:border-[#485442]"
            />
          </div>

          <Button
            size="xs"
            variant="ghost"
            onClick={resetWidgetsToDefault}
            icon={<RotateCcw className="w-3 h-3" />}
          >
            Reset
          </Button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#485442] dark:bg-[#55604e] text-white'
                  : 'bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto flex-1 pr-1">
          {filteredCatalog.map((item) => {
            const added = isAlreadyAdded(item.type);
            const { icon, bg } = getWidgetIconBadge(item.type);

            return (
              <div
                key={item.type}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                  added
                    ? 'bg-[var(--bg-app)]/60 border-[var(--border-color)] opacity-75'
                    : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[#485442]/50 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}
                  >
                    {icon}
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <h4 className="font-bold text-xs text-[var(--text-primary)] truncate">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[var(--border-color)]/50">
                  <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase">
                    {item.category}
                  </span>

                  {added ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </span>
                  ) : (
                    <Button
                      size="xs"
                      variant="primary"
                      onClick={() => addWidget(item.type)}
                      icon={<Plus className="w-3 h-3" />}
                    >
                      Add Widget
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
