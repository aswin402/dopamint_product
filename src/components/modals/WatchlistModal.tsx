import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ArrowUpRight, MessageSquare } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { formatCurrency, formatPercentage, formatTimestamp } from '../../lib/formatters';

export const WatchlistModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'tokens'>('chats');

  const isOpen = useCryptoStore((s) => s.isWatchlistModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const conversations = useCryptoStore((s) => s.conversations);
  const toggleFavouriteConversation = useCryptoStore((s) => s.toggleFavouriteConversation);
  const setActiveConversation = useCryptoStore((s) => s.setActiveConversation);
  const coins = useCryptoStore((s) => s.coins);
  const watchlist = useCryptoStore((s) => s.watchlist);
  const toggleWatchlist = useCryptoStore((s) => s.toggleWatchlist);
  const setSelectedCoinId = useCryptoStore((s) => s.setSelectedCoinId);
  const createNewChat = useCryptoStore((s) => s.createNewChat);

  const favouriteChats = conversations.filter((c) => c.isFavourite);

  if (!isOpen) return null;

  return (
    <div
      onClick={() => setModalState('isWatchlistModalOpen', false)}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] shadow-flyout overflow-hidden flex flex-col max-h-[82vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-2xl">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[var(--text-primary)] tracking-tight">Favourites</h3>
              <p className="text-xs text-[var(--text-muted)]">
                {favouriteChats.length} saved chats · {watchlist.length} tracked tokens
              </p>
            </div>
          </div>
          <button
            onClick={() => setModalState('isWatchlistModalOpen', false)}
            className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-1 border-b border-[var(--border-color)] bg-[var(--bg-app)]">
          <button
            onClick={() => setActiveTab('chats')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'chats'
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-2xs border border-[var(--border-color)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Favourite Chats</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-[var(--primary-light)] text-[var(--primary)] font-bold">
              {favouriteChats.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tokens')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'tokens'
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-2xs border border-[var(--border-color)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Tracked Tokens</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] font-bold">
              {watchlist.length}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-2 flex-1">
          {activeTab === 'chats' ? (
            /* Favourite Chats List */
            favouriteChats.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">No favourite chats yet</h4>
                  <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                    Click the star <Star className="w-3 h-3 inline fill-amber-400 text-amber-400" /> icon at the top of any conversation or in the chat menu to bookmark it here for instant access.
                  </p>
                </div>
              </div>
            ) : (
              <AnimatePresence>
                {favouriteChats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => {
                      setActiveConversation(chat.id);
                      setModalState('isWatchlistModalOpen', false);
                    }}
                    className="flex items-center justify-between p-3.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl hover:border-[var(--primary)]/50 transition-all shadow-2xs cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavouriteConversation(chat.id);
                        }}
                        title="Remove from favourites"
                        className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star className="w-4 h-4 fill-amber-400" />
                      </button>

                      <div className="min-w-0">
                        <h5 className="font-semibold text-xs text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors truncate">
                          {chat.title}
                        </h5>
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                          {formatTimestamp(chat.updatedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] uppercase">
                        {chat.model.replace('dopamint-', '')}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )
          ) : (
            /* Tracked Coins List */
            coins.map((coin) => {
              const isSaved = watchlist.includes(coin.id);
              const isPositive = coin.change24h >= 0;

              return (
                <div
                  key={coin.id}
                  className="flex items-center justify-between p-3.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl hover:border-[var(--primary)]/40 transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleWatchlist(coin.id)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : 'text-[var(--text-muted)]'}`} />
                    </button>

                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white"
                      style={{ backgroundColor: coin.color }}
                    >
                      {coin.symbol.slice(0, 3)}
                    </div>

                    <div>
                      <h5 className="font-bold text-xs text-[var(--text-primary)]">{coin.name}</h5>
                      <p className="text-[11px] text-[var(--text-muted)]">{coin.symbol}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-xs text-[var(--text-primary)] tabular-nums">
                        {formatCurrency(coin.price)}
                      </p>
                      <p
                        className={`text-[11px] font-semibold tabular-nums ${
                          isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {formatPercentage(coin.change24h)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCoinId(coin.id);
                        setModalState('isWatchlistModalOpen', false);
                        createNewChat(`Analyze current technical indicators and buy/sell levels for ${coin.name} (${coin.symbol})`);
                      }}
                      title="Ask dopamint about this coin"
                      className="p-2 bg-[var(--bg-card)] hover:bg-[var(--primary-light)] text-[var(--primary)] rounded-xl border border-[var(--border-color)] shadow-2xs transition-colors cursor-pointer"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
};
