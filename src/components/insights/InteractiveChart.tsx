import React, { useState } from 'react';
import { ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { formatCurrency, formatPercentage, generateSvgCurvePath } from '../../lib/formatters';
import type { TimeframeOption } from '../../types/crypto';

export const InteractiveChart: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const coins = useCryptoStore((s) => s.coins);
  const selectedCoinId = useCryptoStore((s) => s.selectedCoinId);
  const selectedTimeframe = useCryptoStore((s) => s.selectedTimeframe);
  const setSelectedTimeframe = useCryptoStore((s) => s.setSelectedTimeframe);

  const coin = coins.find((c) => c.id === selectedCoinId) || coins[0];

  let historyData = coin.history24h;
  if (selectedTimeframe === '7D') historyData = coin.history7d;
  if (selectedTimeframe === '1M') historyData = coin.history1m;

  const prices = historyData.map((d) => d.price);
  const isPositive = coin.change24h >= 0;
  const strokeColor = isPositive ? '#10B981' : '#EF4444';
  const fillColor = isPositive ? 'url(#greenGradient)' : 'url(#redGradient)';

  const chartWidth = 290;
  const chartHeight = 110;
  const { pathD, areaD, min, max, points } = generateSvgCurvePath(prices, chartWidth, chartHeight, 8);

  const activeHoverPoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;
  const activeHoverPrice = hoverIndex !== null && prices[hoverIndex] ? prices[hoverIndex] : coin.price;

  const timeframes: TimeframeOption[] = ['1H', '24H', '7D', '1M', '1Y', 'ALL'];

  return (
    <div className="bg-white rounded-2xl border border-[#ECECEC] p-4 shadow-card select-none">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#F7931A] text-white flex items-center justify-center font-bold text-[11px] shadow-2xs">
            ₿
          </div>
          <span className="font-bold text-sm text-[#111111] tracking-tight">
            {coin.name} ({coin.symbol})
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 px-2 py-1 bg-[#F7F8FA] hover:bg-[#F0F2F6] border border-[#ECECEC] text-xs font-semibold text-[#111111] rounded-lg transition-colors"
          >
            <span>{selectedTimeframe}</span>
            <ChevronDown className="w-3 h-3 text-[#8E8E93]" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-20 bg-white rounded-xl border border-[#ECECEC] shadow-flyout z-30 py-1">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => {
                    setSelectedTimeframe(tf);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1 text-xs font-medium transition-colors ${
                    selectedTimeframe === tf
                      ? 'bg-[#EEF0FD] text-[#5B5CEB] font-bold'
                      : 'text-[#333333] hover:bg-[#F7F8FA]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-xl font-extrabold text-[#111111] tabular-nums tracking-tight">
          {formatCurrency(activeHoverPrice)}
        </span>
        <span
          className={`inline-flex items-center text-xs font-bold ${
            isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
          }`}
        >
          {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
          {formatPercentage(coin.change24h)}
        </span>
      </div>

      <div className="relative w-full h-[120px] pt-1">
        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[9.5px] font-medium text-[#A0A0A5] select-none pointer-events-none">
          <span>{formatCurrency(max, 'USD', true)}</span>
          <span>{formatCurrency((max + min) / 2, 'USD', true)}</span>
          <span>{formatCurrency(min, 'USD', true)}</span>
        </div>

        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full overflow-visible pl-6"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path d={areaD} fill={fillColor} />

          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((p, idx) => (
            <rect
              key={idx}
              x={p.x - chartWidth / (points.length * 2)}
              y={0}
              width={chartWidth / points.length}
              height={chartHeight}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(idx)}
              className="cursor-crosshair"
            />
          ))}

          {activeHoverPoint && (
            <g>
              <line
                x1={activeHoverPoint.x}
                y1={0}
                x2={activeHoverPoint.x}
                y2={chartHeight}
                stroke="#A0A0A5"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle
                cx={activeHoverPoint.x}
                cy={activeHoverPoint.y}
                r="4.5"
                fill={strokeColor}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>

      <div className="flex items-center justify-between text-[10px] font-medium text-[#8E8E93] pt-1 px-1 border-t border-[#F0F2F6] select-none">
        <span>12AM</span>
        <span>6AM</span>
        <span>12PM</span>
        <span>6PM</span>
        <span>12AM</span>
      </div>
    </div>
  );
};
