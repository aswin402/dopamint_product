import React from 'react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { formatCurrency, formatPercentage } from '../../lib/formatters';

export const TopCoinsTable: React.FC = () => {
  const coins = useCryptoStore((s) => s.coins);
  const selectedCoinId = useCryptoStore((s) => s.selectedCoinId);
  const setSelectedCoinId = useCryptoStore((s) => s.setSelectedCoinId);
  const setModalState = useCryptoStore((s) => s.setModalState);

  const topFive = coins.slice(0, 5);

  const renderCoinIcon = (symbol: string) => {
    switch (symbol) {
      case 'BTC':
        return (
          <div className="w-5 h-5 rounded-full bg-[#F7931A] text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 shadow-2xs">
            ₿
          </div>
        );
      case 'ETH':
        return (
          <div className="w-5 h-5 rounded-full bg-[#627EEA] text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 shadow-2xs">
            ♦
          </div>
        );
      case 'USDT':
        return (
          <div className="w-5 h-5 rounded-full bg-[#26A17B] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 shadow-2xs">
            ₮
          </div>
        );
      case 'BNB':
        return (
          <div className="w-5 h-5 rounded-full bg-[#F3BA2F] text-white flex items-center justify-center font-bold text-[9px] flex-shrink-0 shadow-2xs">
            BNB
          </div>
        );
      case 'SOL':
        return (
          <div className="w-5 h-5 rounded-full bg-[#9945FF] text-white flex items-center justify-center font-extrabold text-[10px] flex-shrink-0 shadow-2xs">
            ≡
          </div>
        );
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-[#5B5CEB] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
            {symbol.slice(0, 2)}
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ECECEC] p-4 shadow-card select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-[#111111] tracking-tight">Top Coins</h3>
        <button
          onClick={() => setModalState('isWatchlistModalOpen', true)}
          className="text-xs font-semibold text-[#5B5CEB] hover:underline"
        >
          View All
        </button>
      </div>

      {/* Table Header Row */}
      <div className="flex items-center justify-between text-[11px] font-semibold text-[#8E8E93] pb-2 border-b border-[#F0F2F6]">
        <div className="flex items-center gap-3">
          <span className="w-3 text-center">#</span>
          <span>Coin</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="w-16 text-right">Price</span>
          <span className="w-12 text-right">24h %</span>
        </div>
      </div>

      {/* Coin Rows */}
      <div className="divide-y divide-[#F0F2F6]">
        {topFive.map((coin) => {
          const isSelected = coin.id === selectedCoinId;
          const isPositive = coin.change24h >= 0;

          return (
            <div
              key={coin.id}
              onClick={() => setSelectedCoinId(coin.id)}
              className={`flex items-center justify-between py-2.5 px-1.5 rounded-xl cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-[#EEF0FD]/80 text-[#111111]'
                  : 'hover:bg-[#F9FAFC] text-[#333333]'
              }`}
            >
              {/* # and Icon + Name */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[11px] font-medium text-[#8E8E93] w-3 text-center">
                  {coin.rank}
                </span>
                {renderCoinIcon(coin.symbol)}
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-xs font-bold text-[#111111] truncate">{coin.name}</span>
                  <span className="text-[11px] text-[#8E8E93] font-medium">{coin.symbol}</span>
                </div>
              </div>

              {/* Price & 24h Change */}
              <div className="flex items-center gap-6 flex-shrink-0">
                <span className="text-xs font-bold text-[#111111] w-16 text-right tabular-nums">
                  {formatCurrency(coin.price)}
                </span>
                <span
                  className={`text-[11px] font-bold w-12 text-right tabular-nums ${
                    isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
                  }`}
                >
                  {formatPercentage(coin.change24h)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
