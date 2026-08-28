import React from 'react';
import { motion } from 'framer-motion';
import { X, Star, ArrowUpRight } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { formatCurrency, formatPercentage } from '../../lib/formatters';

export const WatchlistModal: React.FC = () => {
  const isOpen = useCryptoStore((s) => s.isWatchlistModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const coins = useCryptoStore((s) => s.coins);
  const watchlist = useCryptoStore((s) => s.watchlist);
  const toggleWatchlist = useCryptoStore((s) => s.toggleWatchlist);
  const setSelectedCoinId = useCryptoStore((s) => s.setSelectedCoinId);
  const createNewChat = useCryptoStore((s) => s.createNewChat);

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
        className="w-full max-w-xl bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] shadow-flyout overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-2xl">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[var(--text-primary)] tracking-tight">Saved Watchlist</h3>
              <p className="text-xs text-[var(--text-muted)]">
                {watchlist.length} tracked tokens with real-time volatility
              </p>
            </div>
          </div>
          <button
            onClick={() => setModalState('isWatchlistModalOpen', false)}
            className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Coins */}
        <div className="p-6 overflow-y-auto space-y-2 flex-1">
          {coins.map((coin) => {
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
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
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
                    className="p-2 bg-[var(--bg-card)] hover:bg-[var(--primary-light)] text-[var(--primary)] rounded-xl border border-[var(--border-color)] shadow-2xs transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
