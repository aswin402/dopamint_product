import React from 'react';
import { ArrowUpRight, ArrowDownRight, Activity, Zap, Layers } from 'lucide-react';
import { TokenIcon } from '../common/TokenIcon';

export const MarketOverviewWidget: React.FC = () => {
  // Sparkline data for BTC rally to $71,240
  const btcSparkline = [68400, 68900, 69200, 68800, 69800, 70400, 70100, 70900, 71240];
  const min = Math.min(...btcSparkline);
  const max = Math.max(...btcSparkline);
  const width = 110;
  const height = 34;

  const points = btcSparkline
    .map((val, idx) => {
      const x = (idx / (btcSparkline.length - 1)) * width;
      const y = height - ((val - min) / (max - min || 1)) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  const fgValue = 62; // 62 · Greed

  return (
    <div className="space-y-3">
      {/* Hero: BTC Price & Intraday Sparkline */}
      <div className="p-3.5 rounded-[20px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[var(--bg-card)] flex items-center justify-center shadow-2xs">
              <TokenIcon symbol="BTC" size={22} />
            </div>
            <div>
              <div className="text-[12.5px] font-bold text-[var(--text-primary)] leading-none">
                Bitcoin
              </div>
              <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                BTC / USD
              </div>
            </div>
          </div>

          <span className="inline-flex items-center text-[10.5px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />
            +2.1% 24h
          </span>
        </div>

        <div className="flex items-end justify-between pt-1">
          <div>
            <div className="text-[9.5px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              BTC Price
            </div>
            <div className="text-2xl font-extrabold font-mono text-[var(--text-primary)] tracking-tight">
              $71,240
            </div>
          </div>

          {/* SVG Sparkline */}
          <div className="w-[110px] h-[34px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="btcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <polygon
                points={`0,${height} ${points} ${width},${height}`}
                fill="url(#btcGrad)"
              />
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3-Card Metrics Grid */}
      <div className="grid grid-cols-3 gap-2">
        {/* Fear & Greed */}
        <div className="p-2.5 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            <Activity className="w-2.5 h-2.5 text-lime-500" />
            <span>Sentiment</span>
          </div>
          <div className="text-[14px] font-mono font-extrabold text-[var(--text-primary)]">
            {fgValue}
          </div>
          <div className="text-[9.5px] font-bold text-lime-600 dark:text-lime-400">
            Greed
          </div>
        </div>

        {/* Funding Rate */}
        <div className="p-2.5 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            <Zap className="w-2.5 h-2.5 text-amber-500" />
            <span>Funding</span>
          </div>
          <div className="text-[14px] font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
            0.014%
          </div>
          <div className="text-[9.5px] text-[var(--text-muted)]">
            8h avg
          </div>
        </div>

        {/* Open Interest */}
        <div className="p-2.5 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            <Layers className="w-2.5 h-2.5 text-purple-500" />
            <span>Open Int.</span>
          </div>
          <div className="text-[14px] font-mono font-extrabold text-[var(--text-primary)]">
            $18.4b
          </div>
          <div className="text-[9.5px] text-rose-500 font-semibold flex items-center">
            <ArrowDownRight className="w-2 h-2 mr-0.2" />
            -3.4% 24h
          </div>
        </div>
      </div>
    </div>
  );
};
