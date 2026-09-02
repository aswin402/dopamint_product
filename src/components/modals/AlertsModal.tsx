import React, { useState } from 'react';
import { Bell, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Modal, Button } from '../ui';
import { useCryptoStore } from '../../store/useCryptoStore';
import { formatCurrency } from '../../lib/formatters';

export const AlertsModal: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  const [isAdding, setIsAdding] = useState(false);

  const isOpen = useCryptoStore((s) => s.isAlertsModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const alerts = useCryptoStore((s) => s.alerts);
  const coins = useCryptoStore((s) => s.coins);
  const addPriceAlert = useCryptoStore((s) => s.addPriceAlert);
  const togglePriceAlert = useCryptoStore((s) => s.togglePriceAlert);
  const removePriceAlert = useCryptoStore((s) => s.removePriceAlert);

  const handleClose = () => {
    setModalState('isAlertsModalOpen', false);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const coin = coins.find((c) => c.id === selectedCoin);
    if (!coin || !targetPrice) return;

    addPriceAlert({
      coinId: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      targetPrice: parseFloat(targetPrice),
      condition,
      isActive: true,
    });

    setTargetPrice('');
    setIsAdding(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Price Alerts"
      subtitle="Target triggers with browser audio notifications"
      icon={<Bell className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs text-[var(--text-primary)] uppercase tracking-wider">
            Configured Triggers ({alerts.length})
          </h4>
          <Button
            size="xs"
            variant="primary"
            onClick={() => setIsAdding(!isAdding)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            New Alert
          </Button>
        </div>

        {/* Add Form */}
        {isAdding && (
          <form
            onSubmit={handleAdd}
            className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
                  Coin
                </label>
                <select
                  value={selectedCoin}
                  onChange={(e) => setSelectedCoin(e.target.value)}
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
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as 'above' | 'below')}
                  className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-3 py-1.5 text-xs text-[var(--text-primary)] outline-none"
                >
                  <option value="above">Price Rises Above</option>
                  <option value="below">Price Drops Below</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
                Target Price ($)
              </label>
              <input
                type="number"
                step="any"
                placeholder="e.g. 72000"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                required
                className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-3 py-1.5 text-xs text-[var(--text-primary)] outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="ghost" size="xs" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="xs">
                Save Alert
              </Button>
            </div>
          </form>
        )}

        {/* List */}
        <div className="space-y-2">
          {alerts.map((alt) => (
            <div
              key={alt.id}
              className="flex items-center justify-between p-3 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl text-white ${
                    alt.condition === 'above' ? 'bg-[#10B981]' : 'bg-[#EF4444]'
                  }`}
                >
                  {alt.condition === 'above' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[var(--text-primary)]">
                    {alt.name} ({alt.symbol})
                  </h5>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    When price is {alt.condition} {formatCurrency(alt.targetPrice)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePriceAlert(alt.id)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                    alt.isActive
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                      : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-color)]'
                  }`}
                >
                  {alt.isActive ? 'Active' : 'Paused'}
                </button>

                <button
                  onClick={() => removePriceAlert(alt.id)}
                  className="p-1.5 text-[var(--text-muted)] hover:text-red-500 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors"
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
