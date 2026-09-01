import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { TokenIcon } from '../common/TokenIcon';
import { formatCurrency } from '../../lib/formatters';

export const TrendingCoinsWidget: React.FC = () => {
  const coins = useCryptoStore((s) => s.coins);
  const sendMessage = useCryptoStore((s) => s.sendMessage);
  const createNewChat = useCryptoStore((s) => s.createNewChat);
  const activePage = useCryptoStore((s) => s.activePage);
  const setActivePage = useCryptoStore((s) => s.setActivePage);

  // Take top 4 trending coins
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
    <div className="space-y-2">
      {trendingList.map((coin, idx) => {
        const isPositive = coin.change24h >= 0;

        return (
          <motion.div
            key={coin.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: idx * 0.03 }}
            className="group flex items-center justify-between p-2 rounded-xl bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] hover:border-[#485442]/30 transition-all shadow-2xs"
          >
            {/* Left Token info */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex-shrink-0">
                <TokenIcon symbol={coin.symbol} size={26} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12.5px] font-bold text-[var(--text-primary)]">
                    {coin.symbol}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] truncate max-w-[80px]">
                    {coin.name}
                  </span>
                </div>
                <div className="text-[11.5px] font-mono font-semibold text-[var(--text-primary)]">
                  {formatCurrency(coin.price)}
                </div>
              </div>
            </div>

            {/* Right Action & % Change */}
            <div className="flex items-center gap-2">
              <span
                className={`text-[10.5px] font-mono font-semibold px-2 py-0.5 rounded-md flex items-center gap-0.5 ${
                  isPositive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                }`}
              >
                {isPositive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                {isPositive ? '+' : ''}
                {coin.change24h.toFixed(2)}%
              </span>

              <button
                onClick={() => handleAskAboutToken(coin.symbol, coin.name)}
                title={`Ask AI to analyze $${coin.symbol}`}
                className="p-1 rounded-lg bg-[var(--bg-card)] hover:bg-[#485442] hover:text-white border border-[var(--border-color)] text-[var(--text-muted)] transition-all cursor-pointer shadow-2xs"
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
