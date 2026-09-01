import React from 'react';
import { motion } from 'framer-motion';
import { Zap, PieChart, BarChart3, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const MarketStatsWidget: React.FC = () => {
  const marketOverview = useCryptoStore((s) => s.marketOverview);
  const fg = marketOverview.fearAndGreedIndex;

  // Mini sparkline SVG generator for 24h market trend
  const sparklinePoints = [35, 42, 38, 55, 60, 58, 68, 75, 72, 85, 90, 88, 95];
  const min = Math.min(...sparklinePoints);
  const max = Math.max(...sparklinePoints);
  const width = 120;
  const height = 36;
  const pointsString = sparklinePoints
    .map((val, idx) => {
      const x = (idx / (sparklinePoints.length - 1)) * width;
      const y = height - ((val - min) / (max - min || 1)) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  const fgColor =
    fg.value >= 75
      ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
      : fg.value >= 55
      ? 'text-lime-500 bg-lime-500/10 border-lime-500/20'
      : fg.value >= 45
      ? 'text-amber-500 bg-amber-500/10 border-amber-500/20'
      : 'text-rose-500 bg-rose-500/10 border-rose-500/20';

  return (
    <div className="space-y-3">
      {/* iOS Hero: Fear & Greed Gauge Card */}
      <div className="p-3.5 rounded-[20px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Market Sentiment
            </span>
          </div>
          <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${fgColor}`}>
            {fg.classification}
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[var(--text-primary)] font-mono tracking-tight">
              {fg.value}
            </span>
            <span className="text-xs font-semibold text-[var(--text-muted)]">/ 100</span>
          </div>

          {/* Mini Sentiment Bar */}
          <div className="text-right">
            <span className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-end">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              +4 pts vs yesterday
            </span>
            <span className="text-[9.5px] text-[var(--text-muted)]">Updated hourly</span>
          </div>
        </div>

        {/* Multi-segment iOS Gauge Track */}
        <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden relative flex">
          <div className="h-full w-1/4 bg-rose-500/70" />
          <div className="h-full w-1/4 bg-amber-500/70" />
          <div className="h-full w-1/4 bg-lime-500/70" />
          <div className="h-full w-1/4 bg-emerald-500/90" />
          {/* Active pointer notch */}
          <motion.div
            initial={{ left: 0 }}
            animate={{ left: `${Math.min(Math.max(fg.value, 4), 96)}%` }}
            transition={{ type: 'spring', damping: 15 }}
            className="absolute top-0 bottom-0 w-2 bg-white dark:bg-black border border-black/20 dark:border-white/40 rounded-full shadow-md -ml-1"
          />
        </div>
      </div>

      {/* 2x2 iOS Compact Metric Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Base Gas Fee Card */}
        <div className="p-3 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs flex flex-col justify-between space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Base Gas
            </span>
            <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Zap className="w-3 h-3" />
            </div>
          </div>
          <div>
            <div className="text-[15px] font-mono font-extrabold text-[var(--text-primary)]">
              {marketOverview.ethGasGwei || 0.001} Gwei
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              Instant · &lt; $0.001
            </div>
          </div>
        </div>

        {/* BTC Dominance Card */}
        <div className="p-3 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs flex flex-col justify-between space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              BTC Dom
            </span>
            <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <PieChart className="w-3 h-3" />
            </div>
          </div>
          <div>
            <div className="text-[15px] font-mono font-extrabold text-[var(--text-primary)]">
              {marketOverview.btcDominance}%
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center mt-0.5">
              <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />
              +{marketOverview.btcDominanceChange24h || 0.3}% 24h
            </div>
          </div>
        </div>

        {/* Total Crypto Market Cap with Sparkline */}
        <div className="col-span-2 p-3 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              <BarChart3 className="w-3 h-3 text-purple-500" />
              <span>Total Market Cap</span>
            </div>
            <div className="text-[16px] font-mono font-extrabold text-[var(--text-primary)]">
              ${(marketOverview.totalMarketCap / 1e12).toFixed(2)} Trillion
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center">
              <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />
              +{marketOverview.totalMarketCapChange24h}% (24h)
            </div>
          </div>

          {/* Mini Sparkline Chart */}
          <div className="w-[120px] h-[36px] flex-shrink-0">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="mcapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <polygon
                points={`0,${height} ${pointsString} ${width},${height}`}
                fill="url(#mcapGrad)"
              />
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsString}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
