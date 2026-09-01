import React from 'react';
import { Wallet, Plus, ArrowUpRight } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { TokenIcon } from '../common/TokenIcon';

export const PortfolioSummaryWidget: React.FC = () => {
  const setModalState = useCryptoStore((s) => s.setModalState);

  const assets = [
    { symbol: 'ETH', name: 'Ethereum', balance: '2.45 ETH', valUsd: '$8,421.20', pct: 59, change: '+3.4%', color: '#627EEA' },
    { symbol: 'USDC', name: 'USD Coin', balance: '3,500.00 USDC', valUsd: '$3,500.00', pct: 24, change: '0.0%', color: '#2775CA' },
    { symbol: 'AERO', name: 'Aerodrome', balance: '1,840 AERO', valUsd: '$2,392.00', pct: 17, change: '+8.1%', color: '#0052FF' },
  ];

  return (
    <div className="space-y-3">
      {/* Apple Wallet Style Card Pass */}
      <div className="p-4 rounded-[22px] bg-gradient-to-br from-[#364432] to-[#252E22] text-white shadow-soft relative overflow-hidden space-y-3">
        {/* Subtle Watermark Glow */}
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/5 blur-xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
            <Wallet className="w-3.5 h-3.5" />
            <span>Base Sepolia Testnet</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            +4.8% 24h
          </span>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-white/60 font-medium">
            Total Valuation
          </div>
          <div className="text-2xl font-extrabold font-mono tracking-tight text-white mt-0.5">
            $14,313.20
          </div>
        </div>

        {/* Multi-segment Allocation Bar */}
        <div className="space-y-1">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden flex gap-0.5">
            {assets.map((ast) => (
              <div
                key={ast.symbol}
                style={{ width: `${ast.pct}%`, backgroundColor: ast.color }}
                className="h-full first:rounded-l-full last:rounded-r-full"
                title={`${ast.symbol}: ${ast.pct}%`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[9.5px] text-white/70 pt-0.5">
            {assets.map((ast) => (
              <span key={ast.symbol} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ast.color }} />
                <span>{ast.symbol} {ast.pct}%</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Breakdown List */}
      <div className="space-y-1.5">
        {assets.map((ast) => (
          <div
            key={ast.symbol}
            className="flex items-center justify-between p-2.5 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[var(--bg-card)] flex items-center justify-center shadow-2xs">
                <TokenIcon symbol={ast.symbol} size={22} />
              </div>
              <div>
                <div className="text-[12.5px] font-bold text-[var(--text-primary)]">
                  {ast.symbol}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] font-mono">
                  {ast.balance}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[12.5px] font-mono font-bold text-[var(--text-primary)]">
                {ast.valUsd}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-end">
                <ArrowUpRight className="w-2.5 h-2.5 mr-0.2" />
                {ast.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
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
