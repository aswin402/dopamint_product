import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { TokenIcon } from '../common/TokenIcon';
import { formatCurrency } from '../../lib/formatters';

// Generate SVG smooth mini sparkline
const MiniSparkline: React.FC<{ data: number[]; isPositive: boolean }> = ({ data, isPositive }) => {
  const uid = useId().replace(/:/g, '');
  const min = Math.min(...data);
  const max = Math.max(...data);
  const width = 54;
  const height = 24;
  const strokeColor = isPositive ? '#10B981' : '#F43F5E';
  const gradId = `sparkGrad-${isPositive ? 'pos' : 'neg'}-${uid}`;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / (max - min || 1)) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-[54px] h-[24px] overflow-visible flex-shrink-0">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#${gradId})`}
      />
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

export const TrendingCoinsWidget: React.FC = () => {
  const coins = useCryptoStore((s) => s.coins);
  const sendMessage = useCryptoStore((s) => s.sendMessage);
  const createNewChat = useCryptoStore((s) => s.createNewChat);
  const activePage = useCryptoStore((s) => s.activePage);
  const setActivePage = useCryptoStore((s) => s.setActivePage);

  const trendingList = coins.slice(0, 5);

  const handleAskAboutToken = (symbol: string, name: string) => {
    if (activePage !== 'dashboard') {
      setActivePage('dashboard');
    }
    const prompt = `Give me a real-time market analysis and key levels for $${symbol} (${name}) on Base.`;
    createNewChat(prompt);
    sendMessage(prompt);
  };

  return (
    <div className="space-y-1.5">
      {trendingList.map((coin, idx) => {
        const isPositive = coin.change24h >= 0;
        const sparkData = coin.history24h.map((h) => h.price);

        return (
          <motion.div
            key={coin.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: idx * 0.03 }}
            className="group flex items-center justify-between p-2.5 rounded-[18px] bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] hover:border-[#485442]/30 transition-all shadow-2xs"
          >
            {/* Left: Icon & Symbol */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex-shrink-0 w-7 h-7 rounded-full shadow-2xs flex items-center justify-center bg-[var(--bg-card)]">
                <TokenIcon symbol={coin.symbol} size={22} />
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-bold text-[var(--text-primary)] leading-none">
                  {coin.symbol}
                </div>
                <div className="text-[10.5px] text-[var(--text-muted)] truncate max-w-[70px] mt-0.5">
                  {coin.name}
                </div>
              </div>
            </div>

            {/* Middle: Apple Stocks Mini Sparkline */}
            <div className="hidden sm:block">
              <MiniSparkline data={sparkData.length > 0 ? sparkData : [10, 12, 11, 14, 13, 16]} isPositive={isPositive} />
            </div>

            {/* Right: Price & iOS Pill Badge */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="text-right">
                <div className="text-[12.5px] font-mono font-bold text-[var(--text-primary)] leading-none">
                  {formatCurrency(coin.price)}
                </div>
                <span
                  className={`inline-flex items-center text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md mt-1 ${
                    isPositive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {isPositive ? <ArrowUpRight className="w-2.5 h-2.5 mr-0.2" /> : <ArrowDownRight className="w-2.5 h-2.5 mr-0.2" />}
                  {isPositive ? '+' : ''}{coin.change24h.toFixed(2)}%
                </span>
              </div>

              {/* Instant AI Analyze Action */}
              <button
                onClick={() => handleAskAboutToken(coin.symbol, coin.name)}
                title={`Ask AI to analyze $${coin.symbol}`}
                className="w-6 h-6 rounded-lg bg-[var(--bg-card)] hover:bg-[#485442] hover:text-white border border-[var(--border-color)] text-[var(--text-muted)] transition-all flex items-center justify-center cursor-pointer shadow-2xs opacity-80 group-hover:opacity-100"
              >
                <Sparkles className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
