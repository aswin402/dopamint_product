import React, { useState, useMemo } from 'react';
import { Plus, PieChart, Trash2 } from 'lucide-react';
import { Modal, Button } from '../ui';
import { useCryptoStore } from '../../store/useCryptoStore';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import { TokenIcon } from '../common/TokenIcon';
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

  const handleClose = () => {
    setModalState('isPortfolioModalOpen', false);
  };

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
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Portfolio Tracker"
      subtitle="Live asset allocation and profit & loss"
      icon={<PieChart className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {/* Total Value Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-[var(--bg-app)] p-3.5 rounded-2xl border border-[var(--border-color)]">
            <p className="text-xs font-medium text-[var(--text-muted)]">Portfolio Value</p>
            <p className="text-lg font-bold text-[var(--text-primary)] tabular-nums mt-0.5">
              {formatCurrency(totalCurrentValue)}
            </p>
          </div>

          <div className="bg-[var(--bg-app)] p-3.5 rounded-2xl border border-[var(--border-color)]">
            <p className="text-xs font-medium text-[var(--text-muted)]">Total Investment</p>
            <p className="text-lg font-bold text-[var(--text-primary)] tabular-nums mt-0.5">
              {formatCurrency(totalInvested)}
            </p>
          </div>

          <div className="bg-[var(--bg-app)] p-3.5 rounded-2xl border border-[var(--border-color)]">
            <p className="text-xs font-medium text-[var(--text-muted)]">Profit / Loss</p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span
                className={`text-lg font-bold tabular-nums ${
                  isTotalPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {formatCurrency(totalPnl)}
              </span>
              <span
                className={`text-xs font-bold ${
                  isTotalPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                ({formatPercentage(totalPnlPercent)})
              </span>
            </div>
          </div>
        </div>

        {/* Holdings Header */}
        <div className="flex items-center justify-between pt-2">
          <h4 className="font-bold text-sm text-[var(--text-primary)]">
            Holdings ({portfolio.length})
          </h4>
          <Button
            size="xs"
            variant="primary"
            onClick={() => setIsAdding(!isAdding)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Asset
          </Button>
        </div>

        {/* Add Asset Inline Form */}
        {isAdding && (
          <form
            onSubmit={handleAddPosition}
            className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
                  Select Coin
                </label>
                <select
                  value={selectedCoinToAdd}
                  onChange={(e) => setSelectedCoinToAdd(e.target.value)}
                  className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-3 py-1.5 text-xs text-[var(--text-primary)] outline-none"
                >
                  {coins.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
                  Holdings Amount
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="e.g. 1.5"
                  value={amountToAdd}
                  onChange={(e) => setAmountToAdd(e.target.value)}
                  required
                  className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-3 py-1.5 text-xs text-[var(--text-primary)] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
                  Buy Price ($)
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="e.g. 62000"
                  value={buyPriceToAdd}
                  onChange={(e) => setBuyPriceToAdd(e.target.value)}
                  required
                  className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-3 py-1.5 text-xs text-[var(--text-primary)] outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="ghost" size="xs" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="xs">
                Save Position
              </Button>
            </div>
          </form>
        )}

        {/* Positions List */}
        <div className="space-y-2">
          {positionsWithLiveData.map((pos) => (
            <div
              key={pos.id}
              className="flex items-center justify-between p-3 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl hover:border-[#485442]/50 transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <TokenIcon symbol={pos.symbol} size={36} />
                <div>
                  <h5 className="font-bold text-xs text-[var(--text-primary)]">{pos.name}</h5>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    {pos.amount} {pos.symbol} @ {formatCurrency(pos.buyPriceAvg)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-xs text-[var(--text-primary)] tabular-nums">
                    {formatCurrency(pos.value)}
                  </p>
                  <p
                    className={`text-[11px] font-semibold tabular-nums ${
                      pos.pnl >= 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {formatCurrency(pos.pnl)} ({formatPercentage(pos.pnlPercent)})
                  </p>
                </div>

                <button
                  onClick={() => removePortfolioPosition(pos.id)}
                  className="p-1.5 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
