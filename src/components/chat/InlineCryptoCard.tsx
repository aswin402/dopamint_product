import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import type { PriceSnapshot } from '../../types/crypto';
import { formatCurrency, formatPercentage, generateSvgCurvePath } from '../../lib/formatters';
import { useCryptoStore } from '../../store/useCryptoStore';
import { TokenIcon } from '../common/TokenIcon';

interface InlineCryptoCardProps {
  snapshot: PriceSnapshot;
}

export const InlineCryptoCard: React.FC<InlineCryptoCardProps> = ({ snapshot }) => {
  const setSelectedCoinId = useCryptoStore((s) => s.setSelectedCoinId);
  const setModalState = useCryptoStore((s) => s.setModalState);

  const isPositive = snapshot.change24h >= 0;
  const strokeColor = isPositive ? 'var(--green-trend)' : 'var(--red-trend)';
  const fillColor = isPositive ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)';

  const { pathD, areaD } = generateSvgCurvePath(snapshot.sparkline, 140, 48, 4);

  return (
    <div className="my-4 p-3.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-soft flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <TokenIcon symbol={snapshot.symbol} size={36} />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[var(--text-primary)]">{snapshot.name}</span>
            <span className="text-xs text-[var(--text-muted)] font-medium">{snapshot.symbol}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-bold text-base text-[var(--text-primary)] tabular-nums">
              {formatCurrency(snapshot.priceUsd)}
            </span>
            <span
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-md text-[11px] font-bold ${
                isPositive ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {formatPercentage(snapshot.change24h)}
            </span>
          </div>
        </div>
      </div>

      <div className="w-32 h-12 flex items-center justify-center">
        <svg width="140" height="48" className="overflow-visible">
          <path d={areaD} fill={fillColor} />
          <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <button
        onClick={() => {
          setSelectedCoinId(snapshot.coinId);
          setModalState('isPortfolioModalOpen', true);
        }}
        className="px-3 py-1.5 bg-[var(--bg-app)] hover:bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold rounded-xl border border-[var(--border-color)] transition-colors flex items-center gap-1"
      >
        <span>Trade / Analyze</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
