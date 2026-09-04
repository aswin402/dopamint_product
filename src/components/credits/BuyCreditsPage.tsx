import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Coins,
  Zap,
  Shield,
  Sparkles,
  ChevronDown,
  Cpu,
  CreditCard,
  Wallet,
  Activity,
  Sliders,
  RefreshCw,
  Lock,
  History,
  CheckCircle2,
  Check,
  Flame,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { triggerCelebration } from '../../lib/confetti';
import { truncateAddress } from '../../lib/formatters';

interface TopUpPackage {
  id: string;
  name: string;
  amountUsd: number;
  credits: number;
  bonusCredits?: number;
  popular?: boolean;
  bestValue?: boolean;
  badge?: string;
  description: string;
  estimatedQueries: string;
}

const TOPUP_PACKAGES: TopUpPackage[] = [
  {
    id: 'pack-10',
    name: 'Starter Top-Up',
    amountUsd: 10,
    credits: 1000,
    description: 'Ideal for everyday queries, spot price checks, and quick sentiment lookups.',
    estimatedQueries: '~1,000 standard queries or 330 deep analyses',
  },
  {
    id: 'pack-20',
    name: 'Trader Top-Up',
    amountUsd: 20,
    credits: 2000,
    popular: true,
    badge: 'Most Popular',
    description: 'The standard reload for active traders. High-speed reasoning & mempool scans.',
    estimatedQueries: '~2,000 standard queries or 660 deep reasoning runs',
  },
  {
    id: 'pack-50',
    name: 'Power Top-Up',
    amountUsd: 50,
    credits: 5000,
    bonusCredits: 250,
    badge: '+5% Bonus',
    description: 'Enhanced volume for continuous token tracking and automated alerts.',
    estimatedQueries: '~5,250 total credits (~1,750 deep reasoning analyses)',
  },
  {
    id: 'pack-100',
    name: 'Pro Top-Up',
    amountUsd: 100,
    credits: 10000,
    bonusCredits: 1000,
    bestValue: true,
    badge: '+10% Bonus',
    description: 'High-speed compute for smart contract security audits & DEX subagents.',
    estimatedQueries: '~11,000 total credits (~1,100 security audits)',
  },
  {
    id: 'pack-250',
    name: 'Whale Top-Up',
    amountUsd: 250,
    credits: 25000,
    bonusCredits: 3500,
    badge: '+14% Bonus',
    description: 'Maximum throughput with priority GPU queuing for algorithmic traders.',
    estimatedQueries: '~28,500 total credits with dedicated RPC priority',
  },
];

const CREDIT_COST_GUIDE = [
  {
    action: 'Fast Market & Price Query',
    model: 'GPT-4o Mini / Claude 3.5 Haiku',
    cost: 1,
    costFormatted: '1 Credit',
    usdEquiv: '$0.01',
    description: 'Instant token prices, technical indicators, 24h volume, and sentiment summary.',
  },
  {
    action: 'Live On-Chain DEX Screener',
    model: 'Base & Solana RPC Feeds',
    cost: 1,
    costFormatted: '1 Credit',
    usdEquiv: '$0.01',
    description: 'Real-time pair discovery, liquidity pool depth, and volume surge detection.',
  },
  {
    action: 'Deep Reasoning & Alpha Search',
    model: 'Claude 3.7 Sonnet / o3-mini',
    cost: 3,
    costFormatted: '3 Credits',
    usdEquiv: '$0.03',
    description: 'Multi-step web search, whitepaper breakdown, and macro tokenomics thesis.',
  },
  {
    action: 'Mempool & Arbitrage Agent Run',
    model: 'Autonomous Subagent Swarm',
    cost: 5,
    costFormatted: '5 Credits',
    usdEquiv: '$0.05',
    description: 'Continuous pending transaction monitoring and cross-DEX spread detection.',
  },
  {
    action: 'Smart Contract Security Audit',
    model: 'Static & Bytecode Decompilation',
    cost: 10,
    costFormatted: '10 Credits',
    usdEquiv: '$0.10',
    description: 'Honeypot detection, mint authority checks, and vulnerability reports.',
  },
  {
    action: 'Autonomous Portfolio Rebalancing',
    model: 'Multi-Agent Execution Engine',
    cost: 15,
    costFormatted: '15 Credits',
    usdEquiv: '$0.15',
    description: 'Automated target weight calculation and multi-DEX routing simulation.',
  },
];

interface TopUpHistoryItem {
  id: string;
  date: string;
  amountUsd: number;
  credits: number;
  method: string;
  txHash: string;
  status: 'Confirmed' | 'Completed';
}

const INITIAL_TOPUP_HISTORY: TopUpHistoryItem[] = [
  {
    id: 'tx-9942',
    date: 'Sep 3, 2026 • 18:24',
    amountUsd: 20,
    credits: 2000,
    method: 'Base USDC',
    txHash: '0x8f3c...91b2',
    status: 'Confirmed',
  },
  {
    id: 'tx-9810',
    date: 'Aug 29, 2026 • 11:15',
    amountUsd: 50,
    credits: 5250,
    method: 'Card (••4242)',
    txHash: 'ch_3Pf8k...89a',
    status: 'Completed',
  },
  {
    id: 'tx-9654',
    date: 'Aug 20, 2026 • 14:02',
    amountUsd: 20,
    credits: 2000,
    method: 'Base USDC',
    txHash: '0x3a19...d041',
    status: 'Confirmed',
  },
];

export const BuyCreditsPage: React.FC = () => {
  const navigate = useNavigate();

  // Global store
  const userProfile = useCryptoStore((s) => s.userProfile);
  const addCredits = useCryptoStore((s) => s.addCredits);

  // Custom Amount Slider / Input State
  const [customAmount, setCustomAmount] = useState<number>(20);
  const [autoReloadEnabled, setAutoReloadEnabled] = useState<boolean>(false);
  const [autoReloadThreshold, setAutoReloadThreshold] = useState<number>(500);

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{
    amountUsd: number;
    credits: number;
    title: string;
  }>({
    amountUsd: 20,
    credits: 2000,
    title: 'Trader Top-Up',
  });

  const [paymentMethod, setPaymentMethod] = useState<'base_usdc' | 'card' | 'solana'>('base_usdc');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Top-Up History state
  const [history, setHistory] = useState<TopUpHistoryItem[]>(INITIAL_TOPUP_HISTORY);

  // FAQ Accordion
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Calculate credits for custom amount ($1 = 100 credits + volume bonuses)
  const calculateCustomCredits = (usd: number): { base: number; bonus: number; total: number } => {
    const base = Math.round(usd * 100);
    let bonus = 0;
    if (usd >= 250) {
      bonus = Math.round(base * 0.14);
    } else if (usd >= 100) {
      bonus = Math.round(base * 0.1);
    } else if (usd >= 50) {
      bonus = Math.round(base * 0.05);
    }
    return { base, bonus, total: base + bonus };
  };

  const customCredits = calculateCustomCredits(customAmount);

  // Trigger checkout for a preset package
  const handleSelectPackage = (pkg: TopUpPackage) => {
    const totalCredits = pkg.credits + (pkg.bonusCredits || 0);
    setCheckoutData({
      amountUsd: pkg.amountUsd,
      credits: totalCredits,
      title: pkg.name,
    });
    setIsCheckoutOpen(true);
  };

  // Trigger checkout for custom amount
  const handleCustomCheckout = () => {
    setCheckoutData({
      amountUsd: customAmount,
      credits: customCredits.total,
      title: `Custom Top-Up ($${customAmount})`,
    });
    setIsCheckoutOpen(true);
  };

  // Execute payment
  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckoutOpen(false);

      // Add credits to store
      addCredits(checkoutData.credits);
      triggerCelebration();

      // Add to history
      const newHistoryItem: TopUpHistoryItem = {
        id: `tx-${Math.floor(1000 + Math.random() * 9000)}`,
        date: 'Just now',
        amountUsd: checkoutData.amountUsd,
        credits: checkoutData.credits,
        method: paymentMethod === 'base_usdc' ? 'Base USDC' : paymentMethod === 'solana' ? 'Solana USDC' : 'Card (••4242)',
        txHash: paymentMethod === 'base_usdc' ? '0x' + Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 6) : 'ch_' + Math.random().toString(16).substring(2, 8),
        status: paymentMethod === 'base_usdc' ? 'Confirmed' : 'Completed',
      };
      setHistory((prev) => [newHistoryItem, ...prev]);

      // Show toast
      setSuccessToast(`🎉 Successfully topped up ${checkoutData.credits.toLocaleString()} credits! ($${checkoutData.amountUsd}.00)`);
      setTimeout(() => setSuccessToast(null), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Toast Notification */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#485442] dark:bg-[#55604e] text-white rounded-2xl shadow-xl border border-white/10 text-sm font-semibold"
          >
            <CheckCircle2 className="w-5 h-5 text-green-300" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
        {/* Top Breadcrumb & Live Balance Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
          <div>
            <button
              onClick={() => navigate('/c/new')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-2 cursor-pointer"
            >
              <span>← Back to Terminal</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-3">
              <span>Top Up Credits</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#485442]/10 text-[#485442] dark:bg-[#55604e]/20 dark:text-[#8ba082] border border-[#485442]/20">
                Pay As You Go
              </span>
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Top up compute whenever you need. No monthly commitments, no recurring bills. Credits never expire.
            </p>
          </div>

          {/* Current Balance Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8ba082] flex items-center justify-center flex-shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Available Balance
                </span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[var(--text-primary)]">
                  {userProfile.apiCallsRemaining.toLocaleString()}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-medium">Credits</span>
                <span className="text-xs text-[var(--text-secondary)] font-mono">
                  (≈ ${(userProfile.apiCallsRemaining / 100).toFixed(2)})
                </span>
              </div>
              <div className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">
                Wallet: {truncateAddress(userProfile.walletAddress)}
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Quick Top-Up Cards (The Primary 20$ 2000 credits system) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#485442] dark:text-[#8ba082] uppercase tracking-wider">
                <Flame className="w-4 h-4 text-[#485442] dark:text-[#8ba082]" />
                Select a Credit Top-Up Package
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] mt-1">
                Instant Compute Reload
              </h2>
            </div>
            <div className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 font-medium">
              <Shield className="w-3.5 h-3.5 text-[#485442] dark:text-[#8ba082]" />
              <span>Standard Rate: $1.00 = 100 Credits (e.g. $20 = 2,000 Credits)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TOPUP_PACKAGES.map((pkg) => {
              const totalCredits = pkg.credits + (pkg.bonusCredits || 0);
              return (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-[var(--bg-card)] border-[#485442] dark:border-[#55604e] shadow-md ring-2 ring-[#485442]/20 dark:ring-[#55604e]/30'
                      : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[#485442]/40 hover:shadow-2xs'
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#485442] dark:bg-[#55604e] text-white shadow-xs">
                      {pkg.badge}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">{pkg.name}</h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2 min-h-[32px]">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Price & Credits Callout */}
                    <div className="pt-2 border-t border-[var(--border-color)]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-[var(--text-primary)]">
                          ${pkg.amountUsd}
                        </span>
                        <span className="text-xs text-[var(--text-muted)]">one-time</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-base font-bold text-[#485442] dark:text-[#8ba082]">
                          {totalCredits.toLocaleString()}
                        </span>
                        <span className="text-xs font-semibold text-[var(--text-muted)]">Credits</span>
                      </div>
                      {pkg.bonusCredits && (
                        <div className="text-[10.5px] font-bold text-green-600 dark:text-green-400 mt-0.5">
                          Includes {pkg.bonusCredits.toLocaleString()} free bonus credits
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-[var(--text-muted)] bg-[var(--bg-app)] p-2.5 rounded-xl border border-[var(--border-color)]">
                      {pkg.estimatedQueries}
                    </div>
                  </div>

                  {/* Top Up CTA */}
                  <div className="mt-5 pt-3">
                    <button
                      onClick={() => handleSelectPackage(pkg)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        pkg.popular
                          ? 'bg-[#485442] hover:bg-[#3d4738] text-white shadow-xs'
                          : 'bg-[var(--bg-app)] hover:bg-[#485442] hover:text-white text-[var(--text-primary)] border border-[var(--border-color)]'
                      }`}
                    >
                      <Coins className="w-3.5 h-3.5" />
                      <span>Top Up ${pkg.amountUsd}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Custom Top-Up Amount (Calculator / Custom Recharge) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#485442] dark:text-[#8ba082] uppercase tracking-wider">
                <Sliders className="w-4 h-4" />
                Custom Amount
              </div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mt-1">
                Need a Specific Amount?
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Top up any custom dollar amount starting from $5. Volume bonuses apply automatically at $50+.
              </p>
            </div>

            {/* Quick preset buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {[15, 20, 35, 50, 75, 150].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setCustomAmount(amt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    customAmount === amt
                      ? 'bg-[#485442] dark:bg-[#55604e] text-white border-transparent'
                      : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slider & Input */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[var(--text-secondary)]">
                    Amount to Top Up (USD)
                  </label>
                  <div className="flex items-center gap-1.5 bg-[var(--bg-app)] border border-[var(--border-color)] px-3 py-1 rounded-xl">
                    <span className="text-sm font-bold text-[var(--text-muted)]">$</span>
                    <input
                      type="number"
                      min={5}
                      max={1000}
                      step={5}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(Math.max(5, Number(e.target.value) || 5))}
                      className="w-20 text-base font-extrabold text-[var(--text-primary)] bg-transparent focus:outline-hidden font-mono"
                    />
                    <span className="text-xs text-[var(--text-muted)] font-bold">USD</span>
                  </div>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min={5}
                  max={300}
                  step={5}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Number(e.target.value))}
                  className="w-full h-2 bg-[var(--bg-hover)] rounded-lg appearance-none cursor-pointer accent-[#485442] dark:accent-[#7f8f77]"
                />
                <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
                  <span>$5 (500 cr)</span>
                  <span>$100 (11,000 cr)</span>
                  <span>$200 (22,000 cr)</span>
                  <span>$300 (34,200 cr)</span>
                </div>
              </div>

              {/* Bonus notification banner */}
              {customCredits.bonus > 0 ? (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-2.5 text-xs text-green-700 dark:text-green-300">
                  <Sparkles className="w-4 h-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span>
                    <strong>Volume Bonus Unlocked:</strong> You receive an additional{' '}
                    <strong>+{customCredits.bonus.toLocaleString()} bonus credits</strong> for free!
                  </span>
                </div>
              ) : (
                <div className="p-3 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span>Top up $50 or more to unlock free bonus credits (+5% to +14%).</span>
                  <button
                    onClick={() => setCustomAmount(50)}
                    className="text-[#485442] dark:text-[#8ba082] font-bold hover:underline cursor-pointer"
                  >
                    Select $50
                  </button>
                </div>
              )}
            </div>

            {/* Custom Output Card */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                  Top-Up Summary
                </span>
                <div className="flex items-baseline justify-between border-b border-[var(--border-color)] pb-3">
                  <span className="text-xs text-[var(--text-secondary)]">Amount Charged</span>
                  <span className="text-lg font-bold text-[var(--text-primary)]">
                    ${customAmount}.00 USD
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-xs text-[var(--text-secondary)]">Total Credits Added</span>
                  <span className="text-xl font-extrabold text-[#485442] dark:text-[#8ba082]">
                    +{customCredits.total.toLocaleString()} Credits
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-xs text-[var(--text-muted)]">
                  <span>Balance After Top-Up</span>
                  <span className="font-mono font-semibold">
                    {(userProfile.apiCallsRemaining + customCredits.total).toLocaleString()} Credits
                  </span>
                </div>
              </div>

              <button
                onClick={handleCustomCheckout}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#485442] hover:bg-[#3d4738] text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Coins className="w-4 h-4" />
                <span>Top Up ${customAmount}.00 ({customCredits.total.toLocaleString()} Credits)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Cost Transparency Guide (How Credits Are Spent) */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#485442] dark:text-[#8ba082] uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              Transparent Pricing
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mt-1">
              How Credits Are Deducted
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Every compute task has a deterministic cost. You only pay for what you actually use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {CREDIT_COST_GUIDE.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-2 hover:border-[#485442]/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    {item.action}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8ba082] text-xs font-extrabold">
                    {item.costFormatted}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                  <Cpu className="w-3 h-3" />
                  <span>{item.model}</span>
                  <span>•</span>
                  <span>{item.usdEquiv}</span>
                </div>
                <p className="text-[11.5px] text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Auto-Reload / Settings Box */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--primary)] flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Optional Auto-Reload
                </h3>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.2 bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-muted)] rounded-md">
                  Safety Guard
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-xl">
                Never get cut off mid-trade. When your balance drops below {autoReloadThreshold} credits,
                automatically top up $20 (2,000 credits) using your pre-authorized connected wallet or saved card.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <select
              value={autoReloadThreshold}
              onChange={(e) => setAutoReloadThreshold(Number(e.target.value))}
              className="px-2.5 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-app)] text-[var(--text-secondary)] border border-[var(--border-color)] focus:outline-hidden cursor-pointer"
            >
              <option value={200}>Threshold: 200 cr</option>
              <option value={500}>Threshold: 500 cr</option>
              <option value={1000}>Threshold: 1,000 cr</option>
            </select>

            <button
              onClick={() => setAutoReloadEnabled(!autoReloadEnabled)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                autoReloadEnabled
                  ? 'bg-green-600 text-white shadow-xs'
                  : 'bg-[var(--bg-app)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              {autoReloadEnabled ? 'Auto-Reload: On' : 'Enable'}
            </button>
          </div>
        </div>

        {/* Section 5: Recent Top-Up History Ledger */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#485442] dark:text-[#8ba082] uppercase tracking-wider">
                <History className="w-4 h-4" />
                Ledger
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] mt-1">
                Recent Top-Up History
              </h2>
            </div>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              Wallet: {truncateAddress(userProfile.walletAddress)}
            </span>
          </div>

          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-color)] bg-[var(--bg-app)]/50 text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Transaction ID</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Credits Added</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {history.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-[var(--text-secondary)]">
                        {tx.id}
                      </td>
                      <td className="py-3.5 px-4 text-[var(--text-muted)]">{tx.date}</td>
                      <td className="py-3.5 px-4 font-bold text-[var(--text-primary)]">
                        ${tx.amountUsd}.00
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-[#485442] dark:text-[#8ba082]">
                        +{tx.credits.toLocaleString()} Credits
                      </td>
                      <td className="py-3.5 px-4 text-[var(--text-secondary)] font-medium">
                        {tx.method}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                          <Check className="w-3 h-3" />
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 6: Top-Up FAQ */}
        <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Everything you need to know about Dopamint credits and compute billing.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-2">
            {[
              {
                q: 'Do credits ever expire?',
                a: 'Never. Credits you purchase remain in your account indefinitely until used. There is no expiration date or inactivity fee.',
              },
              {
                q: 'Are there any recurring monthly or weekly subscription fees?',
                a: 'No. Dopamint uses a pure pay-as-you-go credit system. You only pay when you choose to top up your balance. No recurring charges ever occur unless you explicitly enable optional auto-reload.',
              },
              {
                q: 'How does the $20 for 2,000 credits rate work?',
                a: 'The baseline rate is 100 credits per $1.00 USD. For example, topping up $20 grants 2,000 compute credits. Larger packages ($50, $100, $250) include free bonus credits up to +14%.',
              },
              {
                q: 'What cryptocurrencies are accepted for top-ups?',
                a: 'You can top up instantly using Base USDC (recommended for near-zero gas fees) or Solana USDC directly from your connected wallet. We also accept standard Visa, Mastercard, and American Express via Stripe.',
              },
              {
                q: 'What happens if my credits reach zero?',
                a: 'If your balance reaches zero, advanced deep reasoning and autonomous subagents will pause until you top up. You can always reload your balance instantly in under 5 seconds.',
              },
            ].map((faq, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-[var(--text-primary)] cursor-pointer hover:bg-[var(--bg-hover)] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#485442] dark:text-[#8ba082]' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="px-4 pb-4 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)]/40 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-[var(--border-color)] bg-[var(--bg-app)]/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8ba082] flex items-center justify-center">
                      <Coins className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]">
                        Confirm Credit Top-Up
                      </h3>
                      <p className="text-xs text-[var(--text-muted)]">
                        {checkoutData.title}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                {/* Order Summary Box */}
                <div className="p-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-2">
                  <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                    <span>Credit Pack</span>
                    <span className="font-bold text-[var(--text-primary)]">
                      +{checkoutData.credits.toLocaleString()} Credits
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                    <span>Wallet Recipient</span>
                    <span className="font-mono">{truncateAddress(userProfile.walletAddress)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                    <span>Credit Expiry</span>
                    <span className="text-green-600 dark:text-green-400 font-bold">Never expires</span>
                  </div>
                  <div className="border-t border-[var(--border-color)] pt-2.5 flex justify-between items-baseline">
                    <span className="text-xs font-bold text-[var(--text-primary)]">Total Due</span>
                    <span className="text-2xl font-extrabold text-[#485442] dark:text-[#8ba082]">
                      ${checkoutData.amountUsd}.00
                    </span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('base_usdc')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === 'base_usdc'
                          ? 'border-[#485442] dark:border-[#55604e] bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8ba082] font-bold'
                          : 'border-[var(--border-color)] bg-[var(--bg-app)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <Wallet className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[11px] block font-bold">Base USDC</span>
                      <span className="text-[9px] text-[var(--text-muted)]">Zero Gas</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#485442] dark:border-[#55604e] bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8ba082] font-bold'
                          : 'border-[var(--border-color)] bg-[var(--bg-app)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[11px] block font-bold">Card</span>
                      <span className="text-[9px] text-[var(--text-muted)]">Stripe</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('solana')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === 'solana'
                          ? 'border-[#485442] dark:border-[#55604e] bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8ba082] font-bold'
                          : 'border-[var(--border-color)] bg-[var(--bg-app)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <Zap className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[11px] block font-bold">Solana</span>
                      <span className="text-[9px] text-[var(--text-muted)]">USDC</span>
                    </button>
                  </div>
                </div>

                {/* Guarantee Note */}
                <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] justify-center">
                  <Lock className="w-3.5 h-3.5 text-green-600" />
                  <span>Encrypted Web3 payment • Instant credit replenishment</span>
                </div>

                {/* Confirm Action Button */}
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-[#485442] hover:bg-[#3d4738] text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Coins className="w-4 h-4" />
                      <span>Pay ${checkoutData.amountUsd}.00 & Receive {checkoutData.credits.toLocaleString()} Credits</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
