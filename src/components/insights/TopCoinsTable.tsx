import React from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { formatCurrency, formatPercentage } from '../../lib/formatters';

export const TopCoinsTable: React.FC = () => {
  const coins = useCryptoStore((s) => s.coins);
  const selectedCoinId = useCryptoStore((s) => s.selectedCoinId);
  const setSelectedCoinId = useCryptoStore((s) => s.setSelectedCoinId);
  const watchlist = useCryptoStore((s) => s.watchlist);
  const toggleWatchlist = useCryptoStore((s) => s.toggleWatchlist);
  const setModalState = useCryptoStore((s) => s.setModalState);

  const topCoins = coins.slice(0, 5);

  return (
    <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-4 shadow-card select-none">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-[var(--text-primary)] tracking-tight">Top Coins</h3>
        <button
          onClick={() => setModalState('isWatchlistModalOpen', true)}
          className="text-xs font-semibold text-[var(--primary)] hover:underline"
        >
          Watchlist ({watchlist.length})
        </button>
      </div>

      <div className="space-y-1.5">
        {topCoins.map((coin) => {
          const isSelected = coin.id === selectedCoinId;
          const isPositive = coin.change24h >= 0;
          const isSaved = watchlist.includes(coin.id);

          return (
            <div
              key={coin.id}
              onClick={() => setSelectedCoinId(coin.id)}
              className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-180 ${
                isSelected
                  ? 'bg-[var(--primary-light)] border border-[var(--primary)]/30'
                  : 'hover:bg-[var(--bg-hover)]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWatchlist(coin.id);
                  }}
                  className="p-0.5 text-[var(--text-muted)] hover:text-amber-400"
                >
                  <Star
                    className={`w-3.5 h-3.5 ${
                      isSaved ? 'text-amber-400 fill-amber-400' : 'text-[var(--text-muted)]'
                    }`}
                  />
                </button>

                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] text-white flex-shrink-0"
                  style={{ backgroundColor: coin.color }}
                >
                  {coin.symbol.slice(0, 3)}
                </div>

                <div className="truncate">
                  <p className="font-bold text-xs text-[var(--text-primary)] truncate">{coin.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{coin.symbol}</p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-bold text-xs text-[var(--text-primary)] tabular-nums">
                  {formatCurrency(coin.price)}
                </p>
                <div
                  className={`flex items-center justify-end text-[10px] font-bold ${
                    isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5 mr-0.5" />
                  )}
                  {formatPercentage(coin.change24h)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
