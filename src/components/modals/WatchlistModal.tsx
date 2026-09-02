import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowUpRight, MessageSquare } from 'lucide-react';
import { Modal } from '../ui';
import { useCryptoStore } from '../../store/useCryptoStore';
import { formatCurrency, formatPercentage, formatTimestamp } from '../../lib/formatters';
import { TokenIcon } from '../common/TokenIcon';

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

  const handleClose = () => {
    setModalState('isWatchlistModalOpen', false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Favourites"
      subtitle={`${favouriteChats.length} saved chats · ${watchlist.length} tracked tokens`}
      icon={<Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
      maxWidth="max-w-xl"
    >
      <div className="space-y-4 max-h-[65vh] flex flex-col">
        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab('chats')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'chats'
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-2xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Favourite Chats</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8A9E7F] font-bold">
              {favouriteChats.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'tokens'
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-2xs'
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
        <div className="overflow-y-auto space-y-2 flex-1 pr-1">
          {activeTab === 'chats' ? (
            favouriteChats.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                    No favourite chats yet
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                    Click the star icon at the top of any conversation to bookmark it here for instant access.
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
                      handleClose();
                    }}
                    className="flex items-center justify-between p-3 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl hover:border-[#485442]/50 transition-all shadow-2xs cursor-pointer group"
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
                        <h5 className="font-semibold text-xs text-[var(--text-primary)] group-hover:text-[#485442] dark:group-hover:text-[#8A9E7F] transition-colors truncate">
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
            coins.map((coin) => {
              const isSaved = watchlist.includes(coin.id);
              const isPositive = coin.change24h >= 0;

              return (
                <div
                  key={coin.id}
                  className="flex items-center justify-between p-3 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl hover:border-[#485442]/40 transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleWatchlist(coin.id)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-amber-400' : 'text-[var(--text-muted)]'
                        }`}
                      />
                    </button>

                    <TokenIcon symbol={coin.symbol} size={32} />

                    <div>
                      <h5 className="font-bold text-xs text-[var(--text-primary)]">
                        {coin.name}
                      </h5>
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
                          isPositive
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {formatPercentage(coin.change24h)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCoinId(coin.id);
                        handleClose();
                        createNewChat(
                          `Analyze current technical indicators and buy/sell levels for ${coin.name} (${coin.symbol})`
                        );
                      }}
                      title="Ask dopamint about this coin"
                      className="p-2 bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] text-[#485442] dark:text-[#8A9E7F] rounded-xl border border-[var(--border-color)] shadow-2xs transition-colors cursor-pointer"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
};
