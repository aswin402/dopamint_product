import React from 'react';
import { Wallet, Plus } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { TokenIcon } from '../common/TokenIcon';

export const PortfolioSummaryWidget: React.FC = () => {
  const setModalState = useCryptoStore((s) => s.setModalState);

  const assets = [
    { symbol: 'ETH', name: 'Ethereum', balance: '2.45 ETH', valUsd: '$8,421.20', change: '+3.4%' },
    { symbol: 'USDC', name: 'USD Coin', balance: '3,500.00 USDC', valUsd: '$3,500.00', change: '0.0%' },
    { symbol: 'AERO', name: 'Aerodrome', balance: '1,840 AERO', valUsd: '$2,392.00', change: '+8.1%' },
  ];

  return (
    <div className="space-y-2.5">
      {/* Portfolio Balance Header */}
      <div className="p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-1 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[var(--text-muted)]">
            Total Testnet Value
          </span>
          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            +4.8% (24h)
          </span>
        </div>
        <div className="text-[16px] font-mono font-bold text-[var(--text-primary)]">
          $14,313.20
        </div>
      </div>

      {/* Asset rows */}
      <div className="space-y-1.5">
        {assets.map((ast) => (
          <div
            key={ast.symbol}
            className="flex items-center justify-between p-2 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <TokenIcon symbol={ast.symbol} size={22} />
              <div>
                <div className="text-[12px] font-bold text-[var(--text-primary)]">
                  {ast.symbol}
                </div>
                <div className="text-[10px] text-[var(--text-muted)]">
                  {ast.balance}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[12px] font-mono font-bold text-[var(--text-primary)]">
                {ast.valUsd}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                {ast.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action to open full modal */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setModalState('isPortfolioModalOpen', true)}
          className="flex-1 py-1.5 px-3 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-[11px] font-semibold text-[var(--text-primary)] transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          <Wallet className="w-3 h-3" />
          <span>Full Portfolio</span>
        </button>
        <button
          onClick={() => setModalState('isWatchlistModalOpen', true)}
          className="py-1.5 px-3 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-[11px] font-semibold text-[var(--text-primary)] transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          <span>Watchlist</span>
        </button>
      </div>
    </div>
  );
};
