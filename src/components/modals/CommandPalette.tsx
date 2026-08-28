import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MessageSquare,
  TrendingUp,
  Plus,
  Settings,
  Star,
  X,
  ArrowRight,
  Sun,
  Moon,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const CommandPalette: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const isOpen = useCryptoStore((s) => s.isCommandPaletteOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const conversations = useCryptoStore((s) => s.conversations);
  const setActiveConversation = useCryptoStore((s) => s.setActiveConversation);
  const createNewChat = useCryptoStore((s) => s.createNewChat);
  const coins = useCryptoStore((s) => s.coins);
  const setSelectedCoinId = useCryptoStore((s) => s.setSelectedCoinId);
  const theme = useCryptoStore((s) => s.theme);
  const toggleTheme = useCryptoStore((s) => s.toggleTheme);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const chatItems = conversations
    .filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))
    .map((c) => ({
      id: `chat-${c.id}`,
      type: 'chat',
      title: c.title,
      subtitle: 'Jump to conversation',
      icon: <MessageSquare className="w-4 h-4 text-[var(--primary)]" />,
      action: () => {
        setActiveConversation(c.id);
        setModalState('isCommandPaletteOpen', false);
      },
    }));

  const coinItems = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
    )
    .map((coin) => ({
      id: `coin-${coin.id}`,
      type: 'coin',
      title: `${coin.name} (${coin.symbol})`,
      subtitle: `View live charts & orderbook ($${coin.price.toLocaleString()})`,
      icon: <TrendingUp className="w-4 h-4 text-green-500" />,
      action: () => {
        setSelectedCoinId(coin.id);
        setModalState('isCommandPaletteOpen', false);
      },
    }));

  const actionItems = [
    {
      id: 'act-new-chat',
      type: 'action',
      title: 'Start New Conversation',
      subtitle: 'Create a fresh crypto chat context (⌘N)',
      icon: <Plus className="w-4 h-4 text-[var(--primary)]" />,
      action: () => {
        createNewChat();
        setModalState('isCommandPaletteOpen', false);
      },
    },
    {
      id: 'act-toggle-theme',
      type: 'action',
      title: `Switch Theme to ${theme === 'light' ? 'Dark' : 'Light'} Mode`,
      subtitle: 'Toggle between OKLCH light cream and dark obsidian',
      icon: theme === 'light' ? <Moon className="w-4 h-4 text-[var(--primary)]" /> : <Sun className="w-4 h-4 text-amber-400" />,
      action: () => {
        toggleTheme();
        setModalState('isCommandPaletteOpen', false);
      },
    },
    {
      id: 'act-watchlist',
      type: 'action',
      title: 'Open Watchlist',
      subtitle: 'View saved tokens and custom price alerts',
      icon: <Star className="w-4 h-4 text-amber-500" />,
      action: () => {
        setModalState('isWatchlistModalOpen', true);
        setModalState('isCommandPaletteOpen', false);
      },
    },
    {
      id: 'act-portfolio',
      type: 'action',
      title: 'Portfolio & P&L Manager',
      subtitle: 'Track asset allocation and return on investment',
      icon: <TrendingUp className="w-4 h-4 text-blue-500" />,
      action: () => {
        setModalState('isPortfolioModalOpen', true);
        setModalState('isCommandPaletteOpen', false);
      },
    },
    {
      id: 'act-settings',
      type: 'action',
      title: 'Preferences & API Keys',
      subtitle: 'Configure AI models, temperature, and currency',
      icon: <Settings className="w-4 h-4 text-[var(--text-muted)]" />,
      action: () => {
        setModalState('isSettingsModalOpen', true);
        setModalState('isCommandPaletteOpen', false);
      },
    },
  ].filter((a) => a.title.toLowerCase().includes(query.toLowerCase()));

  const allItems = [...actionItems, ...chatItems, ...coinItems];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, allItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allItems.length) % Math.max(1, allItems.length));
    } else if (e.key === 'Enter' && allItems[selectedIndex]) {
      e.preventDefault();
      allItems[selectedIndex].action();
    }
  };

  return (
    <div
      onClick={() => setModalState('isCommandPaletteOpen', false)}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] shadow-flyout overflow-hidden"
      >
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-color)]">
          <Search className="w-5 h-5 text-[var(--text-muted)] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, search chats, or find coins..."
            className="w-full text-sm font-medium text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none bg-transparent"
          />
          <button
            onClick={() => setModalState('isCommandPaletteOpen', false)}
            className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
          {allItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-[var(--text-muted)]">
              No matching commands or conversations found.
            </div>
          ) : (
            allItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-2xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-[var(--primary-light)] text-[var(--text-primary)]' : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs">
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <p className="font-semibold text-xs text-[var(--text-primary)] truncate">{item.title}</p>
                      <p className="text-[11px] text-[var(--text-muted)] truncate">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 text-[var(--primary)] transition-opacity ${
                      isSelected ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-app)] border-t border-[var(--border-color)] text-[11px] text-[var(--text-muted)]">
          <span>Use ↑ ↓ to navigate</span>
          <span>Press ↵ to select • Esc to close</span>
        </div>
      </motion.div>
    </div>
  );
};
