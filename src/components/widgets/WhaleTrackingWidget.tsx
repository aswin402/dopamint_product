import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { TokenIcon } from '../common/TokenIcon';

export const WhaleTrackingWidget: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const whaleTxs = [
    {
      id: 'tx-1',
      entity: '0x4a2…f91',
      fullAddr: '0x4a2c91838947f91a0c8427eef892',
      amount: '+2,400 ETH',
      amountUsd: '≈ $8.42M',
      symbol: 'ETH',
      type: 'inflow' as const,
      label: 'Accumulation',
      timeAgo: '12m ago',
    },
    {
      id: 'tx-2',
      entity: 'Fund wallet',
      fullAddr: '0x992b49c018274aefb817',
      amount: '-1.1m USDC',
      amountUsd: '≈ $1.10M',
      symbol: 'USDC',
      type: 'outflow' as const,
      label: 'Treasury Outflow',
      timeAgo: '45m ago',
    },
    {
      id: 'tx-3',
      entity: '0x9d7…3c2',
      fullAddr: '0x9d7a284918e3c28a01',
      amount: '+800k SOL',
      amountUsd: '≈ $112.0M',
      symbol: 'SOL',
      type: 'inflow' as const,
      label: 'Whale Buy',
      timeAgo: '2h ago',
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-2">
      {whaleTxs.map((tx, idx) => {
        const isInflow = tx.type === 'inflow';

        return (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: idx * 0.04 }}
            className="flex items-center justify-between p-2.5 rounded-[18px] bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs group hover:border-[#485442]/30 transition-all"
          >
            {/* Left: Token & Entity */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[var(--bg-card)] flex items-center justify-center shadow-2xs flex-shrink-0">
                <TokenIcon symbol={tx.symbol} size={22} />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[12px] font-mono font-bold text-[var(--text-primary)]">
                    {tx.entity}
                  </span>
                  <button
                    onClick={() => handleCopy(tx.id, tx.fullAddr)}
                    title="Copy Address"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    {copiedId === tx.id ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                    )}
                  </button>
                </div>

                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                  {tx.label} · {tx.timeAgo}
                </div>
              </div>
            </div>

            {/* Right: Quantity & Value */}
            <div className="text-right flex-shrink-0">
              <div
                className={`text-[12.5px] font-mono font-extrabold flex items-center justify-end ${
                  isInflow
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {isInflow ? (
                  <ArrowDownLeft className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                )}
                {tx.amount}
              </div>
              <div className="text-[10px] text-[var(--text-muted)] font-mono">
                {tx.amountUsd}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
