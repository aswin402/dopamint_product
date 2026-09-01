import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Info } from 'lucide-react';
import { TokenIcon } from '../common/TokenIcon';

export const ExchangeNetflowWidget: React.FC = () => {
  const flows = [
    {
      id: 'fl-1',
      from: 'BTC',
      to: 'exchanges',
      amount: '+1,240 BTC',
      valUsd: '≈ $88.3M',
      type: 'inflow' as const, // inflow to exchange -> sell pressure
      signal: 'Inflow · Sell Pressure Risk',
    },
    {
      id: 'fl-2',
      from: 'ETH',
      to: 'wallets',
      amount: '-9,600 ETH',
      valUsd: '≈ $33.6M',
      type: 'outflow' as const, // outflow to wallets -> holding/staking
      signal: 'Outflow · Cold Storage',
    },
  ];

  return (
    <div className="space-y-2.5">
      {/* Flow Cards */}
      <div className="space-y-2">
        {flows.map((flow, idx) => {
          const isExchangeInflow = flow.type === 'inflow';

          return (
            <motion.div
              key={flow.id}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: idx * 0.04 }}
              className="p-3 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TokenIcon symbol={flow.from} size={20} />
                  <div className="flex items-center gap-1.5 text-[12px] font-bold text-[var(--text-primary)]">
                    <span>{flow.from}</span>
                    <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
                    <span className="capitalize">{flow.to}</span>
                  </div>
                </div>

                <div
                  className={`text-[13px] font-mono font-extrabold ${
                    isExchangeInflow
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {flow.amount}
                </div>
              </div>

              <div className="flex items-center justify-between text-[10.5px]">
                <span className="text-[var(--text-muted)] font-mono">{flow.valUsd}</span>
                <span
                  className={`font-semibold ${
                    isExchangeInflow
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {flow.signal}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Predictive Guidance Insight Box */}
      <div className="p-2.5 rounded-[16px] bg-[#485442]/10 dark:bg-[#8A9E7F]/15 border border-[#485442]/20 flex items-start gap-2 shadow-2xs">
        <Info className="w-3.5 h-3.5 text-[#485442] dark:text-[#8A9E7F] flex-shrink-0 mt-0.5" />
        <p className="text-[11px] font-medium text-[var(--text-primary)] leading-snug">
          Net inflow to exchanges often precedes sell pressure.
        </p>
      </div>
    </div>
  );
};
