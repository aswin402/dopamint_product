import React from 'react';
import { Wallet, Plus } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const PortfolioSummaryWidget: React.FC = () => {
  const setModalState = useCryptoStore((s) => s.setModalState);

  return (
    <div className="space-y-3">
      {/* Apple Wallet Style Card Pass */}
      <div className="p-4 rounded-[22px] bg-gradient-to-br from-[#364432] to-[#252E22] text-white shadow-soft relative overflow-hidden space-y-3">
        {/* Ambient Glow */}
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/5 blur-xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
            <Wallet className="w-3.5 h-3.5" />
            <span>Trading Portfolio</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            +$1,120 24h
          </span>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-white/60 font-medium">
            Total Value
          </div>
          <div className="text-2xl font-extrabold font-mono tracking-tight text-white mt-0.5">
            $48,210.00
          </div>
        </div>

        {/* Exposure Section */}
        <div className="space-y-1.5 pt-1 border-t border-white/10">
          <div className="flex items-center justify-between text-[10.5px]">
            <span className="text-white/70 font-medium">Asset Exposure</span>
            <span className="font-mono font-bold text-emerald-300">62% BTC/ETH</span>
          </div>

          {/* Segmented Exposure Bar */}
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden flex gap-0.5">
            <div className="h-full bg-amber-400 rounded-l-full" style={{ width: '62%' }} title="BTC/ETH: 62%" />
            <div className="h-full bg-blue-400" style={{ width: '24%' }} title="USDC/Stables: 24%" />
            <div className="h-full bg-purple-400 rounded-r-full" style={{ width: '14%' }} title="Alts: 14%" />
          </div>

          <div className="flex items-center justify-between text-[9.5px] text-white/60 pt-0.5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>BTC/ETH 62%</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Stables 24%</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>Alts 14%</span>
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setModalState('isPortfolioModalOpen', true)}
          className="py-2 px-3 rounded-[16px] bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <Wallet className="w-3.5 h-3.5 text-[#485442] dark:text-[#8A9E7F]" />
          <span>Full Portfolio</span>
        </button>
        <button
          onClick={() => setModalState('isWatchlistModalOpen', true)}
          className="py-2 px-3 rounded-[16px] bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5 text-[#485442] dark:text-[#8A9E7F]" />
          <span>Watchlist</span>
        </button>
      </div>
    </div>
  );
};
