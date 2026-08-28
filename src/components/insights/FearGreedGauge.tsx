import React from 'react';
import { motion } from 'framer-motion';

interface FearGreedGaugeProps {
  value: number; // 0 to 100
  classification: string;
}

export const FearGreedGauge: React.FC<FearGreedGaugeProps> = ({ value, classification }) => {
  // Semi-circle arc: from -180 deg (left) to 0 deg (right)
  const angle = -180 + (value / 100) * 180;

  // Arc path constants
  const cx = 50;
  const cy = 46;
  const r = 36;
  const strokeWidth = 7;

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="relative w-28 h-16 flex items-center justify-center">
        <svg viewBox="0 0 100 55" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="fearGreedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="30%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#84CC16" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>

          {/* Background Track Arc */}
          <path
            d={`M 14,${cy} A ${r},${r} 0 0,1 86,${cy}`}
            fill="none"
            stroke="#F0F2F6"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active Gradient Arc */}
          <path
            d={`M 14,${cy} A ${r},${r} 0 0,1 86,${cy}`}
            fill="none"
            stroke="url(#fearGreedGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Center Needle / Hub */}
          <motion.g
            initial={{ rotate: -180, originX: `${cx}px`, originY: `${cy}px` }}
            animate={{ rotate: angle, originX: `${cx}px`, originY: `${cy}px` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <line
              x1={cx}
              y1={cy}
              x2={cx + 26}
              y2={cy}
              stroke="#111111"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx={cx} cy={cy} r="4" fill="#111111" />
          </motion.g>
        </svg>

        {/* Numeric value readout in center bottom */}
        <div className="absolute bottom-0 text-center">
          <span className="text-[17px] font-bold text-[#111111] tabular-nums leading-none">
            {value}
          </span>
        </div>
      </div>

      <span className="text-[11px] font-semibold text-[#10B981] mt-1 tracking-tight">
        {classification}
      </span>
    </div>
  );
};
