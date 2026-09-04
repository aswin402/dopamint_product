import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Coins,
  Wallet,
  CreditCard,
  Zap,
  CheckCircle2,
  RefreshCw,
  Copy,
  Check,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { triggerCelebration } from '../../lib/confetti';
import { truncateAddress } from '../../lib/formatters';

interface PresetOption {
  amount: number;
  credits: number;
  bonus?: number;
  label?: string;
}

const PRESET_OPTIONS: PresetOption[] = [
  { amount: 10, credits: 1000 },
  { amount: 20, credits: 2000, label: 'Standard' },
  { amount: 50, credits: 5000, bonus: 250 },
  { amount: 100, credits: 10000, bonus: 1000 },
];

const METERING_RATES = [
  { action: 'Fast Query & Live Market Stats', cost: '1 credit', usd: '$0.01', model: 'GPT-4o Mini / Haiku' },
  { action: 'Live DEX Screener & Liquidity Pools', cost: '1 credit', usd: '$0.01', model: 'Base / Solana RPC' },
  { action: 'Deep Reasoning & Macro Thesis', cost: '3 credits', usd: '$0.03', model: 'Claude 3.7 / o3-mini' },
  { action: 'Autonomous Mempool & Arbitrage Agent', cost: '5 credits', usd: '$0.05', model: 'Subagent Swarm' },
  { action: 'Smart Contract Security Audit', cost: '10 credits', usd: '$0.10', model: 'Bytecode Decompiler' },
  { action: 'Multi-Token Portfolio Rebalance', cost: '15 credits', usd: '$0.15', model: 'Execution Agent' },
];

interface LedgerItem {
  id: string;
  date: string;
  amount: number;
  credits: number;
  method: string;
  hash: string;
}

const INITIAL_LEDGER: LedgerItem[] = [
  { id: 'tx-4891', date: 'Sep 3, 2026', amount: 20, credits: 2000, method: 'Base USDC', hash: '0x8f3c...91b2' },
  { id: 'tx-4210', date: 'Aug 29, 2026', amount: 50, credits: 5250, method: 'Card (••4242)', hash: 'ch_3Pf8...89a' },
  { id: 'tx-3904', date: 'Aug 18, 2026', amount: 20, credits: 2000, method: 'Base USDC', hash: '0x3a19...d041' },
];

export const BuyCreditsPage: React.FC = () => {
  const navigate = useNavigate();

  // Store
  const userProfile = useCryptoStore((s) => s.userProfile);
  const addCredits = useCryptoStore((s) => s.addCredits);

  // Top-Up Amount State
  const [selectedPreset, setSelectedPreset] = useState<number>(20);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customAmount, setCustomAmount] = useState<number>(30);

  // Payment & Auto-Reload
  const [paymentMethod, setPaymentMethod] = useState<'base_usdc' | 'card' | 'solana'>('base_usdc');
  const [autoReload, setAutoReload] = useState<boolean>(false);
  const [autoReloadThreshold, setAutoReloadThreshold] = useState<number>(500);

  // Status & Feedback
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedWallet, setCopiedWallet] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [ledger, setLedger] = useState<LedgerItem[]>(INITIAL_LEDGER);

  // Derived calculation
  const activeAmount = isCustom ? customAmount : selectedPreset;
  const calculateCredits = (usd: number) => {
    const base = Math.round(usd * 100);
    let bonus = 0;
    if (usd >= 100) bonus = Math.round(base * 0.1);
    else if (usd >= 50) bonus = Math.round(base * 0.05);
    return { base, bonus, total: base + bonus };
  };

  const currentCalc = calculateCredits(activeAmount);

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(userProfile.walletAddress);
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  const handleExecuteTopUp = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      addCredits(currentCalc.total);
      triggerCelebration();

      const newTx: LedgerItem = {
        id: `tx-${Math.floor(5000 + Math.random() * 4999)}`,
        date: 'Just now',
        amount: activeAmount,
        credits: currentCalc.total,
        method: paymentMethod === 'base_usdc' ? 'Base USDC' : paymentMethod === 'solana' ? 'Solana USDC' : 'Card (••4242)',
        hash: paymentMethod === 'base_usdc' ? '0x' + Math.random().toString(16).substring(2, 6) + '...' + Math.random().toString(16).substring(2, 6) : 'ch_' + Math.random().toString(16).substring(2, 8),
      };
      setLedger((prev) => [newTx, ...prev]);

      setSuccessToast(`+${currentCalc.total.toLocaleString()} Credits added to your account! ($${activeAmount}.00)`);
      setTimeout(() => setSuccessToast(null), 5000);
    }, 1000);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto overflow-x-hidden bg-[var(--bg-app)] text-[var(--text-primary)] scroll-smooth transition-colors duration-200">
      {/* Toast Notification */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#485442] dark:bg-[#55604e] text-white rounded-2xl shadow-xl border border-white/10 text-sm font-semibold"
          >
            <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10 pb-32">
        {/* Clean Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[var(--border-color)] pb-6">
          <div className="space-y-1.5">
            <button
              onClick={() => navigate('/c/new')}
              className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1.5 cursor-pointer mb-1"
            >
              <span>← Back to Terminal</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Compute Credits
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl">
              Pay-as-you-go reasoning and on-chain intelligence. No recurring subscriptions. $1 = 100 credits. Credits never expire.
            </p>
          </div>

          {/* Connected Wallet Pill */}
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>{truncateAddress(userProfile.walletAddress)}</span>
            <button
              onClick={handleCopyWallet}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors ml-1 cursor-pointer"
              title="Copy address"
            >
              {copiedWallet ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Bespoke Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ═══════════════════════════════════════════════════════════
           *  LEFT COLUMN (7 cols): The Recharge Console
           * ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Live Balance Card */}
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                <span>Available Compute Balance</span>
                <span className="text-[11px] font-mono text-green-600 dark:text-green-400 font-bold normal-case">
                  Active
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)] font-mono">
                    {userProfile.apiCallsRemaining.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-[var(--text-muted)]">Credits</span>
                </div>
                <div className="text-sm font-mono text-[var(--text-secondary)]">
                  ≈ ${(userProfile.apiCallsRemaining / 100).toFixed(2)} USD
                </div>
              </div>

              {/* Progress metric */}
              <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>Estimated power: ~{Math.floor(userProfile.apiCallsRemaining / 3).toLocaleString()} deep reasoning analyses</span>
                <span className="text-[var(--text-secondary)] font-medium">Never expires</span>
              </div>
            </div>

            {/* 2. Top-Up Module */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-6">
              <div className="space-y-1">
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  Add Credits
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Select an amount to instantly reload your connected account balance.
                </p>
              </div>

              {/* Amount Selector Segmented Pills */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Select Amount (USD)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_OPTIONS.map((opt) => {
                    const isSelected = !isCustom && selectedPreset === opt.amount;
                    return (
                      <button
                        key={opt.amount}
                        type="button"
                        onClick={() => {
                          setSelectedPreset(opt.amount);
                          setIsCustom(false);
                        }}
                        className={`py-3 px-2 rounded-xl text-center transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#485442] dark:bg-[#55604e] text-white border-transparent shadow-xs font-bold'
                            : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#485442]/30 font-medium'
                        }`}
                      >
                        <div className="text-sm font-bold">${opt.amount}</div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                          {opt.credits.toLocaleString()} cr
                        </div>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setIsCustom(true)}
                    className={`py-3 px-2 rounded-xl text-center transition-all cursor-pointer border ${
                      isCustom
                        ? 'bg-[#485442] dark:bg-[#55604e] text-white border-transparent shadow-xs font-bold'
                        : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#485442]/30 font-medium'
                    }`}
                  >
                    <div className="text-sm font-bold">Custom</div>
                    <div className={`text-[10px] mt-0.5 ${isCustom ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                      Any amount
                    </div>
                  </button>
                </div>

                {/* Custom Amount Input Row (if custom is active) */}
                {isCustom && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-between gap-4"
                  >
                    <span className="text-xs text-[var(--text-secondary)] font-medium">Custom USD Amount:</span>
                    <div className="flex items-center gap-1 bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-1.5 rounded-lg">
                      <span className="text-xs font-bold text-[var(--text-muted)]">$</span>
                      <input
                        type="number"
                        min={5}
                        max={2000}
                        step={5}
                        value={customAmount}
                        onChange={(e) => setCustomAmount(Math.max(5, Number(e.target.value) || 5))}
                        className="w-20 text-sm font-bold text-[var(--text-primary)] bg-transparent focus:outline-hidden font-mono text-right"
                      />
                      <span className="text-xs text-[var(--text-muted)] font-medium">USD</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Dynamic Readout Banner */}
              <div className="p-4 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[var(--text-muted)] font-medium block">You are purchasing:</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-extrabold text-[#485442] dark:text-[#8ba082] font-mono">
                      +{currentCalc.total.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold text-[var(--text-muted)]">Credits</span>
                    {currentCalc.bonus > 0 && (
                      <span className="text-[11px] font-bold text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md">
                        Includes +{currentCalc.bonus.toLocaleString()} bonus
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[var(--text-muted)] font-medium block">Total Price:</span>
                  <span className="text-xl font-bold text-[var(--text-primary)] font-mono">
                    ${activeAmount}.00
                  </span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Pay via
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('base_usdc')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      paymentMethod === 'base_usdc'
                        ? 'border-[#485442] dark:border-[#55604e] bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8ba082] font-bold'
                        : 'border-[var(--border-color)] bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Wallet className="w-4 h-4 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight">Base USDC</div>
                      <div className="text-[10px] text-[var(--text-muted)] leading-tight font-normal">Zero gas</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      paymentMethod === 'card'
                        ? 'border-[#485442] dark:border-[#55604e] bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8ba082] font-bold'
                        : 'border-[var(--border-color)] bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight">Card</div>
                      <div className="text-[10px] text-[var(--text-muted)] leading-tight font-normal">Stripe</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('solana')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      paymentMethod === 'solana'
                        ? 'border-[#485442] dark:border-[#55604e] bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8ba082] font-bold'
                        : 'border-[var(--border-color)] bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Zap className="w-4 h-4 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight">Solana</div>
                      <div className="text-[10px] text-[var(--text-muted)] leading-tight font-normal">USDC</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleExecuteTopUp}
                disabled={isProcessing}
                className="w-full py-3.5 px-5 rounded-xl text-sm font-bold bg-[#485442] hover:bg-[#3b4536] dark:bg-[#55604e] dark:hover:bg-[#465040] text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Confirming on-chain...</span>
                  </>
                ) : (
                  <>
                    <Coins className="w-4 h-4" />
                    <span>Top Up ${activeAmount}.00 ({currentCalc.total.toLocaleString()} Credits)</span>
                  </>
                )}
              </button>

              {/* Auto-Reload Compact Switch */}
              <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="auto-reload"
                    checked={autoReload}
                    onChange={(e) => setAutoReload(e.target.checked)}
                    className="rounded-md border-[var(--border-color)] text-[#485442] focus:ring-0 cursor-pointer w-3.5 h-3.5"
                  />
                  <label htmlFor="auto-reload" className="cursor-pointer">
                    Auto-reload $20 when balance drops below:
                  </label>
                </div>

                <select
                  value={autoReloadThreshold}
                  onChange={(e) => setAutoReloadThreshold(Number(e.target.value))}
                  disabled={!autoReload}
                  className="bg-[var(--bg-app)] border border-[var(--border-color)] rounded-lg px-2 py-1 text-xs font-mono font-medium focus:outline-hidden disabled:opacity-40 cursor-pointer"
                >
                  <option value={200}>200 cr</option>
                  <option value={500}>500 cr</option>
                  <option value={1000}>1,000 cr</option>
                </select>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
           *  RIGHT COLUMN (5 cols): The Metering Ledger & Cost Matrix
           * ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Transparent Metering Table */}
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Compute Metering Rates
                </h3>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  Deterministic
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {METERING_RATES.map((rate, i) => (
                  <div key={i} className="flex items-baseline justify-between text-xs py-1 border-b border-[var(--border-color)]/50 last:border-0">
                    <div className="min-w-0 pr-2">
                      <div className="font-semibold text-[var(--text-primary)] truncate">{rate.action}</div>
                      <div className="text-[10.5px] text-[var(--text-muted)] font-mono">{rate.model}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-mono font-bold text-[#485442] dark:text-[#8ba082] block">{rate.cost}</span>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">{rate.usd}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Three Guarantees (Clean, quiet list) */}
            <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#485442] dark:text-[#8ba082] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--text-primary)] block">Never Expire</strong>
                  <span className="text-[var(--text-secondary)] text-[11.5px]">Credits stay in your wallet indefinitely until spent.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#485442] dark:text-[#8ba082] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--text-primary)] block">Zero Subscriptions</strong>
                  <span className="text-[var(--text-secondary)] text-[11.5px]">No recurring charges or hidden monthly minimums.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ArrowUpRight className="w-4 h-4 text-[#485442] dark:text-[#8ba082] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--text-primary)] block">Instant Liquidity on Base</strong>
                  <span className="text-[var(--text-secondary)] text-[11.5px]">Direct 1-click Web3 deposit with zero network gas fees.</span>
                </div>
              </div>
            </div>

            {/* 3. Recent Transactions Ledger */}
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                <span>Recent Recharges</span>
                <span className="text-[10px] font-mono lowercase text-[var(--text-muted)]">Last 3</span>
              </div>

              <div className="divide-y divide-[var(--border-color)]/50">
                {ledger.slice(0, 3).map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs first:pt-0 last:pb-0">
                    <div>
                      <div className="font-semibold text-[var(--text-primary)]">+{item.credits.toLocaleString()} Credits</div>
                      <div className="text-[10.5px] text-[var(--text-muted)] font-mono">{item.date} • {item.method}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="font-bold text-[var(--text-primary)]">${item.amount}.00</div>
                      <span className="text-[10px] text-green-600 dark:text-green-400">Confirmed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
