import React from 'react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import { FearGreedGauge } from './FearGreedGauge';

export const MarketOverviewCard: React.FC = () => {
  const marketOverview = useCryptoStore((s) => s.marketOverview);
  const setModalState = useCryptoStore((s) => s.setModalState);

  return (
    <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-4 shadow-card select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="font-bold text-sm text-[var(--text-primary)] tracking-tight">Market Overview</h3>
        <button
          onClick={() => setModalState('isPortfolioModalOpen', true)}
          className="text-xs font-semibold text-[var(--primary)] hover:underline"
        >
          View All
        </button>
      </div>

      {/* 2x2 Grid + Fear & Greed Gauge matching screenshot */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-2">
        {/* Market Cap */}
        <div>
          <p className="text-[11px] font-medium text-[var(--text-muted)]">Market Cap</p>
          <p className="text-[15px] font-bold text-[var(--text-primary)] tabular-nums mt-0.5">
            {formatCurrency(marketOverview.totalMarketCap, 'USD', true)}
          </p>
          <span className="text-[10.5px] font-bold text-green-600 dark:text-green-400">
            {formatPercentage(marketOverview.totalMarketCapChange24h)}
          </span>
        </div>

        {/* 24h Volume */}
        <div>
          <p className="text-[11px] font-medium text-[var(--text-muted)]">24h Volume</p>
          <p className="text-[15px] font-bold text-[var(--text-primary)] tabular-nums mt-0.5">
            {formatCurrency(marketOverview.volume24h, 'USD', true)}
          </p>
          <span className="text-[10.5px] font-bold text-green-600 dark:text-green-400">
            {formatPercentage(marketOverview.volume24hChange24h)}
          </span>
        </div>

        {/* BTC Dominance */}
        <div>
          <p className="text-[11px] font-medium text-[var(--text-muted)]">BTC Dominance</p>
          <p className="text-[15px] font-bold text-[var(--text-primary)] tabular-nums mt-0.5">
            {marketOverview.btcDominance.toFixed(2)}%
          </p>
          <span className="text-[10.5px] font-bold text-red-600 dark:text-red-400">
            {formatPercentage(marketOverview.btcDominanceChange24h)}
          </span>
        </div>

        {/* Fear & Greed Gauge Meter */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-[11px] font-medium text-[var(--text-muted)] mb-1">Fear & Greed Index</p>
          <FearGreedGauge
            value={marketOverview.fearAndGreedIndex.value}
            classification={marketOverview.fearAndGreedIndex.classification}
          />
        </div>
      </div>
    </div>
  );
};
