import React from 'react';
import { motion } from 'framer-motion';

interface FearGreedGaugeProps {
  value: number; // 0 to 100
  classification: string;
}

export const FearGreedGauge: React.FC<FearGreedGaugeProps> = ({ value, classification }) => {
  // Geometry parameters in SVG viewBox (100 x 58)
  const cx = 50;
  const cy = 44;
  const r = 34;
  const strokeWidth = 7;

  // Percentage from 0 to 1
  const clampedVal = Math.max(0, Math.min(100, value));
  const pct = clampedVal / 100;
  const theta = Math.PI * (1 - pct); // in radians (180deg down to 0deg)

  // Tip of needle (needle length = 20)
  const needleLen = 20;
  const needleX = cx + needleLen * Math.cos(theta);
  const needleY = cy - needleLen * Math.sin(theta);

  // Indicator pip on the outer arc rim
  const pipX = cx + r * Math.cos(theta);
  const pipY = cy - r * Math.sin(theta);

  // Dynamic classification color
  const getClassificationColor = (val: number) => {
    if (val >= 55) return '#10B981'; // Green (Greed / Extreme Greed)
    if (val >= 45) return '#F59E0B'; // Amber (Neutral)
    return '#EF4444'; // Red (Fear / Extreme Fear)
  };

  const statusColor = getClassificationColor(clampedVal);

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-32 h-18 flex items-center justify-center">
        <svg viewBox="0 0 100 56" className="w-full h-full overflow-hidden">
          <defs>
            <linearGradient id="fearGreedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="25%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="75%" stopColor="#84CC16" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <filter id="pipGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.25)" />
            </filter>
          </defs>

          {/* Background Track Arc */}
          <path
            d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
            fill="none"
            stroke="#F0F2F6"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active Gradient Arc */}
          <path
            d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
            fill="none"
            stroke="url(#fearGreedGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Needle Line */}
          <motion.line
            initial={{ x2: cx - needleLen, y2: cy }}
            animate={{ x2: needleX, y2: needleY }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            x1={cx}
            y1={cy}
            stroke="#111111"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Pivot Center Cap */}
          <circle cx={cx} cy={cy} r="3.5" fill="#111111" />
          <circle cx={cx} cy={cy} r="1.5" fill="#FFFFFF" />

          {/* Marker Dot / Pip on the Gauge Arc */}
          <motion.circle
            initial={{ cx: cx - r, cy }}
            animate={{ cx: pipX, cy: pipY }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            r="3.5"
            fill="#FFFFFF"
            stroke="#111111"
            strokeWidth="1.8"
            filter="url(#pipGlow)"
          />
        </svg>

        {/* Numeric value readout in center */}
        <div className="absolute top-[26px] text-center pointer-events-none">
          <span className="text-[17px] font-extrabold text-[#111111] tabular-nums tracking-tight">
            {value}
          </span>
        </div>
      </div>

      {/* Sentiment Classification */}
      <span
        className="text-[12px] font-bold tracking-tight mt-0.5"
        style={{ color: statusColor }}
      >
        {classification}
      </span>
    </div>
  );
};
