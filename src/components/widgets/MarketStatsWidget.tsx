import React from 'react';
import { Zap, Activity, PieChart, BarChart3, ArrowUpRight } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const MarketStatsWidget: React.FC = () => {
  const marketOverview = useCryptoStore((s) => s.marketOverview);

  const fg = marketOverview.fearAndGreedIndex;
  const fgColor =
    fg.value >= 75
      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      : fg.value >= 55
      ? 'text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/20'
      : fg.value >= 45
      ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20'
      : 'text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20';

  return (
    <div className="space-y-2.5">
      {/* Fear & Greed Index Hero Card */}
      <div className="p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-2 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#485442] dark:text-[#8A9E7F]" />
            <span className="text-[11px] font-semibold text-[var(--text-secondary)]">
              Fear & Greed Index
            </span>
          </div>
          <span className={`text-[10.5px] px-2 py-0.5 rounded-full font-bold border ${fgColor}`}>
            {fg.value} · {fg.classification}
          </span>
        </div>

        {/* Visual Multi-Segment Bar */}
        <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden relative flex">
          <div className="h-full w-1/4 bg-red-500/70" />
          <div className="h-full w-1/4 bg-amber-500/70" />
          <div className="h-full w-1/4 bg-lime-500/70" />
          <div className="h-full w-1/4 bg-emerald-500/90" />
          {/* Active pointer notch */}
          <div
            className="absolute top-0 bottom-0 w-1.5 bg-black dark:bg-white rounded-full shadow-xs -ml-0.5 transition-all duration-500"
            style={{ left: `${Math.min(Math.max(fg.value, 2), 98)}%` }}
          />
        </div>
      </div>

      {/* 2x2 Metric Grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Base Gas Fee */}
        <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs space-y-1">
          <div className="flex items-center gap-1 text-[10.5px] text-[var(--text-muted)] font-medium">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>Base Gas Fee</span>
          </div>
          <div className="text-[13px] font-mono font-bold text-[var(--text-primary)]">
            {marketOverview.ethGasGwei || 0.001} Gwei
          </div>
          <div className="text-[9.5px] text-emerald-600 dark:text-emerald-400 font-medium">
            ⚡ &lt; $0.001 / tx
          </div>
        </div>

        {/* BTC Dominance */}
        <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs space-y-1">
          <div className="flex items-center gap-1 text-[10.5px] text-[var(--text-muted)] font-medium">
            <PieChart className="w-3 h-3 text-blue-500" />
            <span>BTC Dominance</span>
          </div>
          <div className="text-[13px] font-mono font-bold text-[var(--text-primary)]">
            {marketOverview.btcDominance}%
          </div>
          <div className="text-[9.5px] text-emerald-600 dark:text-emerald-400 flex items-center font-medium">
            <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />
            +{marketOverview.btcDominanceChange24h || 0.2}% 24h
          </div>
        </div>

        {/* Total Market Cap */}
        <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs space-y-1">
          <div className="flex items-center gap-1 text-[10.5px] text-[var(--text-muted)] font-medium">
            <BarChart3 className="w-3 h-3 text-purple-500" />
            <span>Total MCap</span>
          </div>
          <div className="text-[13px] font-mono font-bold text-[var(--text-primary)]">
            ${(marketOverview.totalMarketCap / 1e12).toFixed(2)}T
          </div>
          <div className="text-[9.5px] text-emerald-600 dark:text-emerald-400 flex items-center font-medium">
            <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />
            +{marketOverview.totalMarketCapChange24h}%
          </div>
        </div>

        {/* 24h Global Volume */}
        <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs space-y-1">
          <div className="flex items-center gap-1 text-[10.5px] text-[var(--text-muted)] font-medium">
            <Activity className="w-3 h-3 text-emerald-500" />
            <span>24h DEX Vol</span>
          </div>
          <div className="text-[13px] font-mono font-bold text-[var(--text-primary)]">
            ${(marketOverview.volume24h / 1e9).toFixed(1)}B
          </div>
          <div className="text-[9.5px] text-emerald-600 dark:text-emerald-400 flex items-center font-medium">
            <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />
            +{marketOverview.volume24hChange24h || 4.1}%
          </div>
        </div>
      </div>
    </div>
  );
};
