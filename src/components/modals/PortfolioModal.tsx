import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, PieChart, Trash2 } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import { triggerConfetti } from '../../lib/confetti';

export const PortfolioModal: React.FC = () => {
  const [selectedCoinToAdd, setSelectedCoinToAdd] = useState('bitcoin');
  const [amountToAdd, setAmountToAdd] = useState('');
  const [buyPriceToAdd, setBuyPriceToAdd] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const isOpen = useCryptoStore((s) => s.isPortfolioModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const portfolio = useCryptoStore((s) => s.portfolio);
  const coins = useCryptoStore((s) => s.coins);
  const addPortfolioPosition = useCryptoStore((s) => s.addPortfolioPosition);
  const removePortfolioPosition = useCryptoStore((s) => s.removePortfolioPosition);

  // Compute live portfolio stats immutably with useMemo
  const positionsWithLiveData = useMemo(() => {
    return portfolio.map((pos) => {
      const liveCoin = coins.find((c) => c.id === pos.coinId);
      const currentPrice = liveCoin ? liveCoin.price : pos.currentPrice;
      const invested = pos.amount * pos.buyPriceAvg;
      const value = pos.amount * currentPrice;
      const pnl = value - invested;
      const pnlPercent = invested > 0 ? (pnl / invested) * 100 : 0;

      return {
        ...pos,
        currentPrice,
        invested,
        value,
        pnl,
        pnlPercent,
      };
    });
  }, [portfolio, coins]);

  const totalInvested = useMemo(() => {
    return positionsWithLiveData.reduce((acc, pos) => acc + pos.invested, 0);
  }, [positionsWithLiveData]);

  const totalCurrentValue = useMemo(() => {
    return positionsWithLiveData.reduce((acc, pos) => acc + pos.value, 0);
  }, [positionsWithLiveData]);

  const totalPnl = totalCurrentValue - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

  if (!isOpen) return null;

  const isTotalPositive = totalPnl >= 0;

  const handleAddPosition = (e: React.FormEvent) => {
    e.preventDefault();
    const coin = coins.find((c) => c.id === selectedCoinToAdd);
    if (!coin || !amountToAdd || !buyPriceToAdd) return;

    addPortfolioPosition({
      coinId: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      amount: parseFloat(amountToAdd),
      buyPriceAvg: parseFloat(buyPriceToAdd),
      currentPrice: coin.price,
      color: coin.color,
    });

    setAmountToAdd('');
    setBuyPriceToAdd('');
    setIsAdding(false);
    triggerConfetti();
  };

  return (
    <div
      onClick={() => setModalState('isPortfolioModalOpen', false)}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-3xl border border-[#ECECEC] shadow-flyout overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ECECEC]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#EEF0FD] text-[#5B5CEB] rounded-2xl">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#111111] tracking-tight">Portfolio Tracker</h3>
              <p className="text-xs text-[#8E8E93]">Live asset allocation and profit & loss</p>
            </div>
          </div>
          <button
            onClick={() => setModalState('isPortfolioModalOpen', false)}
            className="p-1.5 rounded-xl text-[#8E8E93] hover:text-[#111111] hover:bg-[#F0F2F6]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Total Value Summary Card */}
        <div className="p-6 bg-[#F7F8FA] border-b border-[#ECECEC]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#ECECEC] shadow-2xs">
              <p className="text-xs font-medium text-[#8E8E93]">Total Portfolio Value</p>
              <p className="text-xl font-bold text-[#111111] tabular-nums mt-1">
                {formatCurrency(totalCurrentValue)}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#ECECEC] shadow-2xs">
              <p className="text-xs font-medium text-[#8E8E93]">Total Investment</p>
              <p className="text-xl font-bold text-[#111111] tabular-nums mt-1">
                {formatCurrency(totalInvested)}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#ECECEC] shadow-2xs">
              <p className="text-xs font-medium text-[#8E8E93]">Total Profit / Loss</p>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span
                  className={`text-xl font-bold tabular-nums ${
                    isTotalPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
                  }`}
                >
                  {formatCurrency(totalPnl)}
                </span>
                <span
                  className={`text-xs font-bold ${
                    isTotalPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
                  }`}
                >
                  ({formatPercentage(totalPnlPercent)})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Positions Table */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-[#111111]">Holdings ({portfolio.length})</h4>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5B5CEB] text-white text-xs font-semibold rounded-xl hover:bg-[#4F50D9] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Asset</span>
            </button>
          </div>

          {/* Add Asset Inline Form */}
          {isAdding && (
            <form
              onSubmit={handleAddPosition}
              className="p-4 bg-[#F7F8FA] border border-[#ECECEC] rounded-2xl space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#8E8E93] block mb-1">
                    Select Coin
                  </label>
                  <select
                    value={selectedCoinToAdd}
                    onChange={(e) => setSelectedCoinToAdd(e.target.value)}
                    className="w-full bg-white border border-[#ECECEC] rounded-xl px-3 py-1.5 text-xs text-[#111111] outline-none"
                  >
                    {coins.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#8E8E93] block mb-1">
                    Holdings Amount
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="e.g. 1.5"
                    value={amountToAdd}
                    onChange={(e) => setAmountToAdd(e.target.value)}
                    required
                    className="w-full bg-white border border-[#ECECEC] rounded-xl px-3 py-1.5 text-xs text-[#111111] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#8E8E93] block mb-1">
                    Buy Price ($)
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="e.g. 62000"
                    value={buyPriceToAdd}
                    onChange={(e) => setBuyPriceToAdd(e.target.value)}
                    required
                    className="w-full bg-white border border-[#ECECEC] rounded-xl px-3 py-1.5 text-xs text-[#111111] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1 text-xs text-[#666666] hover:bg-[#EAEAEA] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#5B5CEB] text-white text-xs font-semibold rounded-lg hover:bg-[#4F50D9]"
                >
                  Save Position
                </button>
              </div>
            </form>
          )}

          {/* Positions List */}
          <div className="space-y-2">
            {positionsWithLiveData.map((pos) => (
              <div
                key={pos.id}
                className="flex items-center justify-between p-3.5 bg-white border border-[#ECECEC] rounded-2xl hover:border-[#5B5CEB]/30 transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-2xs"
                    style={{ backgroundColor: pos.color }}
                  >
                    {pos.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#111111]">{pos.name}</h5>
                    <p className="text-[11px] text-[#8E8E93]">
                      {pos.amount} {pos.symbol} @ {formatCurrency(pos.buyPriceAvg)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-xs text-[#111111] tabular-nums">
                      {formatCurrency(pos.value)}
                    </p>
                    <p
                      className={`text-[11px] font-semibold tabular-nums ${
                        pos.pnl >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                      }`}
                    >
                      {formatCurrency(pos.pnl)} ({formatPercentage(pos.pnlPercent)})
                    </p>
                  </div>

                  <button
                    onClick={() => removePortfolioPosition(pos.id)}
                    className="p-1.5 text-[#8E8E93] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
