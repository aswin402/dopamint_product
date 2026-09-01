import React from 'react';
import { AlertCircle, ArrowDown, ArrowUp } from 'lucide-react';

export const OrderBookDepthWidget: React.FC = () => {
  const bids = [
    { price: '71,220', size: '14.2', depthPct: 85 },
    { price: '71,180', size: '28.6', depthPct: 65 },
    { price: '71,100', size: '42.1', depthPct: 45 },
  ];

  const asks = [
    { price: '71,260', size: '12.4', depthPct: 80 },
    { price: '71,320', size: '19.8', depthPct: 55 },
    { price: '71,600', size: '8.2', depthPct: 20 }, // thins past 71.6k
  ];

  return (
    <div className="space-y-3">
      {/* Mid Market Price Bar */}
      <div className="p-2.5 rounded-[16px] bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-between shadow-2xs">
        <span className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
          BTC / USD Mid Price
        </span>
        <span className="text-[14px] font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
          $71,240.00
        </span>
      </div>

      {/* 2-Column Depth Visualization: Bids Left | Asks Right */}
      <div className="grid grid-cols-2 gap-2">
        {/* Bids Column (Left - Green) */}
        <div className="space-y-1.5 p-2 rounded-[16px] bg-[var(--bg-app)] border border-[var(--border-color)]">
          <div className="flex items-center justify-between text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider pb-0.5 border-b border-[var(--border-color)]/60">
            <span className="flex items-center gap-0.5">
              <ArrowUp className="w-2.5 h-2.5" />
              Bids
            </span>
            <span>Qty</span>
          </div>

          {bids.map((b) => (
            <div key={b.price} className="relative py-1 px-1.5 rounded-lg overflow-hidden flex items-center justify-between text-[11px] font-mono">
              {/* Depth fill background */}
              <div
                className="absolute inset-y-0 left-0 bg-emerald-500/10 rounded-lg pointer-events-none"
                style={{ width: `${b.depthPct}%` }}
              />
              <span className="font-bold text-emerald-600 dark:text-emerald-400 relative z-10">
                ${b.price}
              </span>
              <span className="text-[var(--text-secondary)] relative z-10 text-[10.5px]">
                {b.size}
              </span>
            </div>
          ))}
        </div>

        {/* Asks Column (Right - Red) */}
        <div className="space-y-1.5 p-2 rounded-[16px] bg-[var(--bg-app)] border border-[var(--border-color)]">
          <div className="flex items-center justify-between text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider pb-0.5 border-b border-[var(--border-color)]/60">
            <span className="flex items-center gap-0.5">
              <ArrowDown className="w-2.5 h-2.5" />
              Asks
            </span>
            <span>Qty</span>
          </div>

          {asks.map((a) => (
            <div key={a.price} className="relative py-1 px-1.5 rounded-lg overflow-hidden flex items-center justify-between text-[11px] font-mono">
              {/* Depth fill background */}
              <div
                className="absolute inset-y-0 right-0 bg-rose-500/10 rounded-lg pointer-events-none"
                style={{ width: `${a.depthPct}%` }}
              />
              <span className="font-bold text-rose-600 dark:text-rose-400 relative z-10">
                ${a.price}
              </span>
              <span className="text-[var(--text-secondary)] relative z-10 text-[10.5px]">
                {a.size}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Spot Liquidity Notice */}
      <div className="p-2.5 rounded-[16px] bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 shadow-2xs">
        <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] font-medium text-[var(--text-primary)] leading-snug">
          Bids left, asks right — <span className="font-bold text-amber-600 dark:text-amber-400">spot liquidity thins past $71.6k</span>.
        </p>
      </div>
    </div>
  );
};
