import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Bell, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
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

  if (!isOpen) return null;

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
    <div
      onClick={() => setModalState('isAlertsModalOpen', false)}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-3xl border border-[#ECECEC] shadow-flyout overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ECECEC]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#EEF0FD] text-[#5B5CEB] rounded-2xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#111111] tracking-tight">Price Alerts</h3>
              <p className="text-xs text-[#8E8E93]">Target triggers with browser audio notifications</p>
            </div>
          </div>
          <button
            onClick={() => setModalState('isAlertsModalOpen', false)}
            className="p-1.5 rounded-xl text-[#8E8E93] hover:text-[#111111] hover:bg-[#F0F2F6]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-[#111111] uppercase tracking-wider">
              Configured Triggers ({alerts.length})
            </h4>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#5B5CEB] text-white text-xs font-semibold rounded-xl hover:bg-[#4F50D9] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Alert</span>
            </button>
          </div>

          {/* Add Form */}
          {isAdding && (
            <form onSubmit={handleAdd} className="p-4 bg-[#F7F8FA] border border-[#ECECEC] rounded-2xl space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#8E8E93] block mb-1">Coin</label>
                  <select
                    value={selectedCoin}
                    onChange={(e) => setSelectedCoin(e.target.value)}
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
                  <label className="text-[11px] font-semibold text-[#8E8E93] block mb-1">Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as 'above' | 'below')}
                    className="w-full bg-white border border-[#ECECEC] rounded-xl px-3 py-1.5 text-xs text-[#111111] outline-none"
                  >
                    <option value="above">Price Rises Above</option>
                    <option value="below">Price Drops Below</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#8E8E93] block mb-1">Target Price ($)</label>
                <input
                  type="number"
                  step="any"
                  placeholder="e.g. 72000"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  required
                  className="w-full bg-white border border-[#ECECEC] rounded-xl px-3 py-1.5 text-xs text-[#111111] outline-none"
                />
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
                  Save Alert
                </button>
              </div>
            </form>
          )}

          {/* List */}
          <div className="space-y-2">
            {alerts.map((alt) => (
              <div
                key={alt.id}
                className="flex items-center justify-between p-3 bg-[#F7F8FA] border border-[#ECECEC] rounded-2xl shadow-2xs"
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
                    <h5 className="font-bold text-xs text-[#111111]">{alt.name} ({alt.symbol})</h5>
                    <p className="text-[11px] text-[#8E8E93]">
                      When price is {alt.condition} {formatCurrency(alt.targetPrice)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePriceAlert(alt.id)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                      alt.isActive
                        ? 'bg-[#ECFDF5] text-[#10B981]'
                        : 'bg-[#F0F2F6] text-[#8E8E93]'
                    }`}
                  >
                    {alt.isActive ? 'Active' : 'Paused'}
                  </button>

                  <button
                    onClick={() => removePriceAlert(alt.id)}
                    className="p-1.5 text-[#8E8E93] hover:text-red-500 rounded-lg hover:bg-red-50"
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
