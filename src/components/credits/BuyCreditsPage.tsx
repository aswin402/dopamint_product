import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Zap,
  Shield,
  Bot,
  Coins,
  ArrowRight,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronDown,
  Layers,
  Cpu,
  TrendingUp,
  CreditCard,
  Wallet,
  Activity,
  Sliders,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { triggerCelebration } from '../../lib/confetti';
import { truncateAddress } from '../../lib/formatters';

type BillingCycle = 'monthly' | 'annual';
type ActiveTab = 'plans' | 'credits';

interface Plan {
  id: 'free' | 'pro' | 'institutional';
  name: string;
  badge?: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  popular?: boolean;
  features: string[];
  ctaText: string;
  ctaVariant: 'secondary' | 'primary' | 'outline';
  limits: {
    queries: string;
    agents: string;
    models: string;
    speed: string;
  };
}

interface CreditPack {
  id: string;
  name: string;
  credits: number;
  bonusCredits: number;
  priceUsd: number;
  costPerCredit: string;
  popular?: boolean;
  bestValue?: boolean;
  description: string;
}

export const BuyCreditsPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [activeTab, setActiveTab] = useState<ActiveTab>('plans');

  // Interactive Calculator State
  const [queriesPerDay, setQueriesPerDay] = useState(60);
  const [activeAgents, setActiveAgents] = useState(3);
  const [contractAudits, setContractAudits] = useState(4);

  // Checkout Modal State
  const [checkoutItem, setCheckoutItem] = useState<{
    type: 'plan' | 'credit';
    id: string;
    name: string;
    price: number;
    credits?: number;
    billing?: string;
  } | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<'base_usdc' | 'card' | 'solana'>('base_usdc');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Expanded FAQ items
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Global store
  const userProfile = useCryptoStore((s) => s.userProfile);
  const addCredits = useCryptoStore((s) => s.addCredits);
  const upgradeTier = useCryptoStore((s) => s.upgradeTier);

  // Plans data
  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Explorer',
      badge: 'Free Forever',
      description: 'Essential crypto intelligence for everyday traders and casual research.',
      priceMonthly: 0,
      priceAnnual: 0,
      ctaText: userProfile.tier === 'Free' ? 'Current Plan' : 'Downgrade to Free',
      ctaVariant: 'secondary',
      limits: {
        queries: '5,000 / mo',
        agents: '1 agent',
        models: 'QuantAlpha-1 Standard',
        speed: 'Standard queue (~2.5s)',
      },
      features: [
        '5,000 standard AI queries per month',
        '1 autonomous agent (sentiment or price alert)',
        'Track up to 3 Web3 wallets',
        'Standard token unlock & listing alerts',
        'Live market order book & sentiment snapshot',
        'Community Discord support',
      ],
    },
    {
      id: 'pro',
      name: 'Pro Trader',
      badge: 'Most Popular',
      popular: true,
      description: 'Deep quantitative reasoning, autonomous subagents, and sub-second mempool tracking.',
      priceMonthly: 29,
      priceAnnual: 24,
      ctaText: userProfile.tier === 'Pro' ? 'Current Plan' : 'Upgrade to Pro',
      ctaVariant: 'primary',
      limits: {
        queries: 'Unlimited fast + 15,000 deep reasoning',
        agents: '10 concurrent agents',
        models: 'QuantAlpha-3, DeepSeek-R1, Claude 3.5',
        speed: 'Priority RPC (<600ms)',
      },
      features: [
        'Unlimited fast queries + 15,000 deep reasoning tokens',
        'Full access to QuantAlpha-3, DeepSeek-R1 & Claude Sonnet',
        '10 autonomous background agents with Webhook alerts',
        'Real-time mempool frontrun & whale tracking signals',
        'Solidity & Vyper bytecode security decompiler',
        'Unlimited tracked wallets & exportable PnL journals',
        'Zero gas fees on Base Sepolia transactions',
        'Priority 24/7 alpha research desk',
      ],
    },
    {
      id: 'institutional',
      name: 'Institutional',
      badge: 'Funds & DAOs',
      description: 'Dedicated compute cluster, private RPCs, and multi-chain algorithmic execution.',
      priceMonthly: 199,
      priceAnnual: 160,
      ctaText: userProfile.tier === 'Enterprise' ? 'Current Plan' : 'Get Institutional',
      ctaVariant: 'outline',
      limits: {
        queries: 'Unmetered priority reasoning',
        agents: '50 concurrent agents',
        models: 'Custom fine-tuned quant models',
        speed: 'Dedicated private cluster (<200ms)',
      },
      features: [
        'Unmetered priority reasoning & Monte Carlo simulations',
        'Dedicated GPU nodes with zero data retention guarantee',
        '50 high-frequency autonomous execution agents',
        'Direct WebSocket API with custom RPC node endpoint',
        'Multi-seat workspace (up to 5 team members)',
        'Custom algorithmic strategy backtesting engine',
        '99.9% uptime SLA with custom enterprise agreement',
        'Dedicated quant engineer & Telegram war-room',
      ],
    },
  ];

  // Pay-As-You-Go Credit Packs
  const creditPacks: CreditPack[] = [
    {
      id: 'pack-5k',
      name: 'Starter Pack',
      credits: 5000,
      bonusCredits: 0,
      priceUsd: 10,
      costPerCredit: '$0.0020 / credit',
      description: 'Perfect for testing autonomous agents and running deep smart contract audits.',
    },
    {
      id: 'pack-25k',
      name: 'Trader Pack',
      credits: 25000,
      bonusCredits: 2500,
      priceUsd: 45,
      costPerCredit: '$0.0016 / credit',
      popular: true,
      bestValue: true,
      description: 'Our most popular pack. Ideal for active daily quant analysis and whale tracking.',
    },
    {
      id: 'pack-100k',
      name: 'Whale Pack',
      credits: 100000,
      bonusCredits: 20000,
      priceUsd: 150,
      costPerCredit: '$0.00125 / credit',
      description: 'High-volume algorithmic traders running multi-chain agents 24 hours a day.',
    },
  ];

  // Calculate estimated monthly compute from sliders
  const estimatedMonthlyCredits = queriesPerDay * 30 + activeAgents * 24 * 30 * 0.5 + contractAudits * 10;
  const estimatedPayAsYouGoCost = Math.round(estimatedMonthlyCredits * 0.0018);

  const handleCheckoutOpen = (item: {
    type: 'plan' | 'credit';
    id: string;
    name: string;
    price: number;
    credits?: number;
    billing?: string;
  }) => {
    setCheckoutItem(item);
  };

  const handleExecutePayment = () => {
    if (!checkoutItem) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      triggerCelebration();

      if (checkoutItem.type === 'credit' && checkoutItem.credits) {
        addCredits(checkoutItem.credits);
        setSuccessToast(`Successfully added ${checkoutItem.credits.toLocaleString()} AI Credits to your wallet!`);
      } else if (checkoutItem.type === 'plan') {
        const tier = checkoutItem.id === 'institutional' ? 'Enterprise' : 'Pro';
        upgradeTier(tier);
        setSuccessToast(`Congratulations! You are now upgraded to the ${checkoutItem.name} plan.`);
      }

      setCheckoutItem(null);
      setTimeout(() => setSuccessToast(null), 5000);
    }, 1200);
  };

  const faqs = [
    {
      q: 'Do on-demand compute credits ever expire?',
      a: 'No. All pay-as-you-go credits remain in your Web3 account indefinitely until consumed. They roll over month-to-month with zero expiration date.',
    },
    {
      q: 'Can I pay directly in crypto from my connected Web3 wallet?',
      a: 'Yes. We natively support 1-click payments with USDC, USDT, and ETH on Base Sepolia, Ethereum Mainnet, and Solana. You can also pay with standard credit/debit cards via Stripe.',
    },
    {
      q: 'How do autonomous agents consume credits?',
      a: 'A background agent running continuous market surveillance costs approximately 0.5 credits per active hour. Deep smart contract decompilations consume 10 credits, while regular chat queries consume 1 credit.',
    },
    {
      q: 'Can I cancel or change my plan at any time?',
      a: 'Yes. You can switch between Monthly and Annual, upgrade, or cancel your subscription anytime with 1-click. Unused subscription periods are prorated automatically.',
    },
    {
      q: 'What is the difference between QuantAlpha-1 and QuantAlpha-3?',
      a: 'QuantAlpha-1 is optimized for speed and high-level summaries. QuantAlpha-3 is our flagship institutional model capable of multi-step chain-of-thought mathematical reasoning, DEX arbitrage validation, and EVM bytecode security checks.',
    },
    {
      q: 'Are gas fees covered when paying with Web3?',
      a: 'Yes! On Base Sepolia, all payment and smart contract verification gas fees are 100% sponsored by DopaMint. You pay exactly the listed dollar amount.',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden h-full px-4 sm:px-6 md:px-10 py-8 scroll-smooth">
      <div className="w-full max-w-[1080px] mx-auto space-y-12 pb-24">
        {/* ═══════════════════════════════════════════════════════════
         *  TOAST NOTIFICATION
         * ═══════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {successToast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-[#485442] text-white px-5 py-3 rounded-2xl shadow-xl border border-[#8A9E7F]/30 flex items-center gap-3 text-sm font-medium"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span>{successToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════════
         *  1. HERO HEADER — Clean, minimal, non-AI aesthetic
         * ═══════════════════════════════════════════════════════════ */}
        <div className="text-center space-y-4 pt-2 sm:pt-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-light)] border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Compute & Subscriptions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15]">
            Transparent pricing for serious crypto intelligence.
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Upgrade your plan for unlimited deep reasoning and autonomous agents, or top up on-demand compute credits anytime.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  2. LIVE USER ACCOUNT STRIP — Real-time wallet & compute status
         * ═══════════════════════════════════════════════════════════ */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#3b4635] to-[#485442] flex items-center justify-center text-white shadow-xs flex-shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                  {truncateAddress(userProfile.walletAddress)}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#485442]/10 text-[#485442] dark:text-[#8A9E7F] border border-[#485442]/20 uppercase">
                  {userProfile.tier} TIER
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Base Sepolia Testnet · Gas Sponsored</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-[var(--border-color)]">
            <div className="text-left sm:text-right">
              <span className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider block">
                Remaining Queries
              </span>
              <span className="text-lg font-mono font-bold text-[var(--text-primary)]">
                {userProfile.apiCallsRemaining.toLocaleString()}{' '}
                <span className="text-xs font-normal text-[var(--text-muted)]">/ 5,000</span>
              </span>
            </div>

            <button
              onClick={() => setActiveTab('credits')}
              className="px-3.5 py-2 rounded-xl bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] transition-all cursor-pointer shadow-2xs"
            >
              Top Up
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  3. TAB SWITCHER (Plans vs On-Demand Credits)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center p-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xs">
            <button
              onClick={() => setActiveTab('plans')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'plans'
                  ? 'bg-[var(--primary)] text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Subscription Plans</span>
            </button>

            <button
              onClick={() => setActiveTab('credits')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'credits'
                  ? 'bg-[var(--primary)] text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Pay-As-You-Go Credits</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold rounded-md uppercase">
                Never Expire
              </span>
            </button>
          </div>

          {/* Billing Switcher (Monthly vs Annual) — Only shown on Plans tab */}
          {activeTab === 'plans' && (
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)]">
              <span className={billingCycle === 'monthly' ? 'text-[var(--text-primary)] font-bold' : ''}>
                Monthly
              </span>

              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-12 h-6.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] p-0.5 transition-colors relative cursor-pointer"
                title="Toggle Billing Cycle"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-[var(--primary)] shadow-xs transition-transform duration-200 ${
                    billingCycle === 'annual' ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>

              <span className="flex items-center gap-1.5">
                <span className={billingCycle === 'annual' ? 'text-[var(--text-primary)] font-bold' : ''}>
                  Yearly
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                  Save 20%
                </span>
              </span>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  4. SECTION A: SUBSCRIPTION PLANS (3 Cards)
         * ═══════════════════════════════════════════════════════════ */}
        {activeTab === 'plans' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => {
              const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
              const isCurrent = (plan.id === 'free' && userProfile.tier === 'Free') ||
                                (plan.id === 'pro' && userProfile.tier === 'Pro') ||
                                (plan.id === 'institutional' && userProfile.tier === 'Enterprise');

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-[26px] bg-[var(--bg-card)] border transition-all duration-200 ${
                    plan.popular
                      ? 'border-[#485442] dark:border-[#55604e] shadow-xl ring-2 ring-[#485442]/20'
                      : 'border-[var(--border-color)] shadow-card hover:border-[var(--text-muted)]/30'
                  }`}
                >
                  {/* Top Popular Ribbon */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#485442] text-white text-[11px] font-bold tracking-wide shadow-xs uppercase">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">{plan.name}</h3>
                      {!plan.popular && plan.badge && (
                        <span className="text-[11px] font-semibold text-[var(--text-muted)] bg-[var(--bg-app)] px-2 py-0.5 rounded-md border border-[var(--border-color)]">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[var(--text-muted)] mt-2 min-h-[34px] leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Price Block */}
                    <div className="mt-5 pb-5 border-b border-[var(--border-color)]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-[var(--text-primary)] tracking-tight font-mono">
                          ${price}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] font-medium">/ month</span>
                      </div>
                      {billingCycle === 'annual' && price > 0 && (
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                          Billed annually (${price * 12}/year)
                        </p>
                      )}
                      {price === 0 && (
                        <p className="text-[11px] text-[var(--text-muted)] font-medium mt-1">
                          No credit card required
                        </p>
                      )}
                    </div>

                    {/* Quick Specs Highlight Box */}
                    <div className="my-5 p-3.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[11.5px]">
                        <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-[var(--primary)]" />
                          Compute
                        </span>
                        <span className="font-semibold text-[var(--text-primary)] font-mono text-[11px]">
                          {plan.limits.queries}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11.5px]">
                        <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5 text-[var(--primary)]" />
                          Agents
                        </span>
                        <span className="font-semibold text-[var(--text-primary)] font-mono text-[11px]">
                          {plan.limits.agents}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11.5px]">
                        <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-[var(--primary)]" />
                          Latency
                        </span>
                        <span className="font-semibold text-[var(--text-primary)] font-mono text-[11px]">
                          {plan.limits.speed}
                        </span>
                      </div>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-2.5">
                      <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                        Included Features
                      </span>
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                          <div className="w-4 h-4 rounded-full bg-[#485442]/10 text-[#485442] dark:text-[#8A9E7F] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-4 border-t border-[var(--border-color)]">
                    <button
                      disabled={isCurrent}
                      onClick={() =>
                        handleCheckoutOpen({
                          type: 'plan',
                          id: plan.id,
                          name: plan.name,
                          price: price,
                          billing: billingCycle,
                        })
                      }
                      className={`w-full py-3 rounded-xl font-bold text-xs tracking-wide transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 ${
                        isCurrent
                          ? 'bg-[var(--bg-app)] text-[var(--text-muted)] border border-[var(--border-color)] cursor-not-allowed opacity-60'
                          : plan.popular
                          ? 'bg-[#485442] hover:bg-[#3b4635] text-white shadow-button-primary'
                          : 'bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] border border-[var(--border-color)]'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      {!isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
         *  4. SECTION B: ON-DEMAND COMPUTE PACKS (Pay As You Go)
         * ═══════════════════════════════════════════════════════════ */}
        {activeTab === 'credits' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {creditPacks.map((pack) => (
                <div
                  key={pack.id}
                  className={`relative p-6 sm:p-7 rounded-[26px] bg-[var(--bg-card)] border flex flex-col justify-between transition-all ${
                    pack.popular
                      ? 'border-[#485442] dark:border-[#55604e] shadow-xl ring-2 ring-[#485442]/20'
                      : 'border-[var(--border-color)] shadow-card hover:border-[var(--text-muted)]/30'
                  }`}
                >
                  {pack.bestValue && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#485442] text-white text-[10px] font-bold tracking-wide shadow-xs uppercase">
                      Best Value (+10% Bonus)
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">{pack.name}</h3>
                      <Coins className="w-4 h-4 text-[var(--primary)]" />
                    </div>

                    <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed min-h-[32px]">
                      {pack.description}
                    </p>

                    {/* Credits Amount Highlight */}
                    <div className="my-5 p-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-center">
                      <div className="text-3xl font-extrabold text-[var(--text-primary)] font-mono tracking-tight">
                        {(pack.credits + pack.bonusCredits).toLocaleString()}
                      </div>
                      <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                        Total Compute Credits
                      </span>

                      {pack.bonusCredits > 0 && (
                        <div className="mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          Includes {pack.bonusCredits.toLocaleString()} bonus credits!
                        </div>
                      )}
                    </div>

                    {/* Pricing */}
                    <div className="space-y-1 text-center pb-4 border-b border-[var(--border-color)]">
                      <div className="text-3xl font-extrabold text-[var(--text-primary)] font-mono">
                        ${pack.priceUsd}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] font-mono">
                        {pack.costPerCredit}
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="mt-4 space-y-2 text-xs text-[var(--text-secondary)]">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#485442]" />
                        <span>Credits never expire</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#485442]" />
                        <span>Usable on all AI models & subagents</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#485442]" />
                        <span>Instant delivery to connected wallet</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleCheckoutOpen({
                        type: 'credit',
                        id: pack.id,
                        name: pack.name,
                        price: pack.priceUsd,
                        credits: pack.credits + pack.bonusCredits,
                      })
                    }
                    className={`mt-6 w-full py-3 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      pack.popular
                        ? 'bg-[#485442] hover:bg-[#3b4635] text-white shadow-button-primary'
                        : 'bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] border border-[var(--border-color)]'
                    }`}
                  >
                    <span>Buy {pack.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Credit Usage Rates Box */}
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-card space-y-3">
              <h4 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[var(--primary)]" />
                <span>How compute credits are spent:</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)]">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Standard AI Query</span>
                  <span className="font-mono font-bold text-sm text-[var(--text-primary)]">1 credit</span>
                </div>
                <div className="p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)]">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Deep Reasoning (R1)</span>
                  <span className="font-mono font-bold text-sm text-[var(--text-primary)]">3 credits</span>
                </div>
                <div className="p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)]">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Agent / Active Hour</span>
                  <span className="font-mono font-bold text-sm text-[var(--text-primary)]">0.5 credits</span>
                </div>
                <div className="p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)]">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Contract Audit Scan</span>
                  <span className="font-mono font-bold text-sm text-[var(--text-primary)]">10 credits</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
         *  5. INTERACTIVE COMPUTE USAGE ESTIMATOR
         * ═══════════════════════════════════════════════════════════ */}
        <div className="p-6 sm:p-8 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Cost Estimator</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mt-1">
                Estimate your monthly compute consumption
              </h3>
            </div>
            <div className="text-left md:text-right">
              <span className="text-xs text-[var(--text-muted)]">Estimated Monthly Volume</span>
              <div className="text-2xl font-mono font-extrabold text-[var(--text-primary)]">
                {Math.round(estimatedMonthlyCredits).toLocaleString()}{' '}
                <span className="text-xs font-normal text-[var(--text-muted)]">credits/mo</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Slider 1: Queries */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[var(--text-secondary)]">Daily Market Queries</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">{queriesPerDay}/day</span>
              </div>
              <input
                type="range"
                min={5}
                max={200}
                step={5}
                value={queriesPerDay}
                onChange={(e) => setQueriesPerDay(Number(e.target.value))}
                className="w-full accent-[#485442] cursor-pointer"
              />
              <span className="text-[11px] text-[var(--text-muted)] block">
                {(queriesPerDay * 30).toLocaleString()} queries per month
              </span>
            </div>

            {/* Slider 2: Agents */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[var(--text-secondary)]">Running Autonomous Agents</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">{activeAgents} agents</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={activeAgents}
                onChange={(e) => setActiveAgents(Number(e.target.value))}
                className="w-full accent-[#485442] cursor-pointer"
              />
              <span className="text-[11px] text-[var(--text-muted)] block">
                Whale watchers & arbitrage scanners running 24/7
              </span>
            </div>

            {/* Slider 3: Audits */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[var(--text-secondary)]">Smart Contract Audits</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">{contractAudits}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={contractAudits}
                onChange={(e) => setContractAudits(Number(e.target.value))}
                className="w-full accent-[#485442] cursor-pointer"
              />
              <span className="text-[11px] text-[var(--text-muted)] block">
                Bytecode decompilation & vulnerability reports
              </span>
            </div>
          </div>

          {/* Recommendation Banner */}
          <div className="p-4 rounded-2xl bg-[var(--primary-light)] border border-[var(--primary)]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
              <span>
                Based on your usage: <strong>Pro Plan ($29/mo)</strong> provides the best value compared to Pay-As-You-Go (~${estimatedPayAsYouGoCost}/mo).
              </span>
            </div>
            <button
              onClick={() => setActiveTab('plans')}
              className="px-3.5 py-1.5 rounded-lg bg-[var(--primary)] text-white font-bold hover:opacity-95 transition-opacity flex-shrink-0 cursor-pointer text-center"
            >
              View Pro Plan
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  6. COMPREHENSIVE FEATURE MATRIX COMPARISON
         * ═══════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              Detailed Feature Comparison
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Full breakdown of capabilities across all tiers.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-card">
            <table className="w-full text-left text-xs border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-[var(--bg-app)]">
                  <th className="p-4 font-bold text-[var(--text-primary)] w-1/3">Feature</th>
                  <th className="p-4 font-bold text-[var(--text-primary)] text-center w-1/5">Explorer (Free)</th>
                  <th className="p-4 font-bold text-[#485442] dark:text-[#8A9E7F] text-center w-1/5 bg-[#485442]/5">
                    Pro Trader ($29)
                  </th>
                  <th className="p-4 font-bold text-[var(--text-primary)] text-center w-1/5">Institutional ($199)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {/* Section: Models */}
                <tr className="bg-[var(--bg-app)]/50">
                  <td colSpan={4} className="p-2.5 px-4 font-bold text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                    AI Models & Reasoning Engines
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 px-4 font-medium text-[var(--text-primary)]">QuantAlpha-1 Speed Engine</td>
                  <td className="p-3.5 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-3.5 text-center text-emerald-600 bg-[#485442]/5"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-3.5 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-3.5 px-4 font-medium text-[var(--text-primary)]">QuantAlpha-3 & DeepSeek-R1 Deep Reasoning</td>
                  <td className="p-3.5 text-center text-[var(--text-muted)]">—</td>
                  <td className="p-3.5 text-center text-emerald-600 bg-[#485442]/5"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-3.5 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-3.5 px-4 font-medium text-[var(--text-primary)]">Claude 3.5 Sonnet Integration</td>
                  <td className="p-3.5 text-center text-[var(--text-muted)]">—</td>
                  <td className="p-3.5 text-center text-emerald-600 bg-[#485442]/5"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-3.5 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>

                {/* Section: On-Chain Intelligence */}
                <tr className="bg-[var(--bg-app)]/50">
                  <td colSpan={4} className="p-2.5 px-4 font-bold text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                    On-Chain & Whale Intelligence
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 px-4 font-medium text-[var(--text-primary)]">Tracked Wallets Limit</td>
                  <td className="p-3.5 text-center font-mono">3 wallets</td>
                  <td className="p-3.5 text-center font-mono font-bold text-[#485442] dark:text-[#8A9E7F] bg-[#485442]/5">Unlimited</td>
                  <td className="p-3.5 text-center font-mono font-bold">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-3.5 px-4 font-medium text-[var(--text-primary)]">Real-Time Mempool Frontrun Alerts</td>
                  <td className="p-3.5 text-center text-[var(--text-muted)]">—</td>
                  <td className="p-3.5 text-center text-emerald-600 bg-[#485442]/5"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-3.5 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-3.5 px-4 font-medium text-[var(--text-primary)]">Smart Contract Decompilation & Audit</td>
                  <td className="p-3.5 text-center font-mono">1/month</td>
                  <td className="p-3.5 text-center font-mono font-bold text-[#485442] dark:text-[#8A9E7F] bg-[#485442]/5">50/month</td>
                  <td className="p-3.5 text-center font-mono font-bold">Unlimited</td>
                </tr>

                {/* Section: Autonomous Agents */}
                <tr className="bg-[var(--bg-app)]/50">
                  <td colSpan={4} className="p-2.5 px-4 font-bold text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                    Autonomous Trading Subagents
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 px-4 font-medium text-[var(--text-primary)]">Concurrent Running Subagents</td>
                  <td className="p-3.5 text-center font-mono">1 agent</td>
                  <td className="p-3.5 text-center font-mono font-bold text-[#485442] dark:text-[#8A9E7F] bg-[#485442]/5">10 agents</td>
                  <td className="p-3.5 text-center font-mono font-bold">50 agents</td>
                </tr>
                <tr>
                  <td className="p-3.5 px-4 font-medium text-[var(--text-primary)]">Custom Webhook & Telegram Dispatch</td>
                  <td className="p-3.5 text-center text-[var(--text-muted)]">—</td>
                  <td className="p-3.5 text-center text-emerald-600 bg-[#485442]/5"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-3.5 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>

                {/* Section: Infrastructure & Security */}
                <tr className="bg-[var(--bg-app)]/50">
                  <td colSpan={4} className="p-2.5 px-4 font-bold text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                    Infrastructure & Support
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 px-4 font-medium text-[var(--text-primary)]">Execution Speed / RPC Queue</td>
                  <td className="p-3.5 text-center font-mono">Standard (~2.5s)</td>
                  <td className="p-3.5 text-center font-mono font-bold text-[#485442] dark:text-[#8A9E7F] bg-[#485442]/5">Priority (&lt;600ms)</td>
                  <td className="p-3.5 text-center font-mono font-bold">Dedicated (&lt;200ms)</td>
                </tr>
                <tr>
                  <td className="p-3.5 px-4 font-medium text-[var(--text-primary)]">Dedicated Quant War-Room Support</td>
                  <td className="p-3.5 text-center text-[var(--text-muted)]">—</td>
                  <td className="p-3.5 text-center font-medium bg-[#485442]/5">Priority Ticket</td>
                  <td className="p-3.5 text-center font-bold text-emerald-600">24/7 Slack & TG</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  7. FAQ ACCORDION — Real questions, clear answers
         * ═══════════════════════════════════════════════════════════ */}
        <div className="space-y-4 max-w-3xl mx-auto pt-4">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-[var(--primary)]" />
              <span>Frequently Asked Questions</span>
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Everything you need to know about plans, compute credits, and payment rails.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-[var(--text-primary)]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)]/50 pt-3"
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

        {/* ═══════════════════════════════════════════════════════════
         *  8. TRUST & SPONSOR FOOTER
         * ═══════════════════════════════════════════════════════════ */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-center space-y-2 text-xs text-[var(--text-muted)]">
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              Smart Contract Audited
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              Instant Settlement
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Zero Gas on Base
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] pt-1">
            DopaMint Intelligence Infrastructure · Powered by Base Sepolia & Privy Embedded MPC Wallet.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
       *  9. INTERACTIVE CHECKOUT MODAL
       * ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {checkoutItem && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isProcessing && setCheckoutItem(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] shadow-2xl p-6 sm:p-7 z-10 space-y-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">Checkout Summary</h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {checkoutItem.type === 'plan' ? 'Subscription Upgrade' : 'Compute Credits Top Up'}
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-[#485442]/10 text-[#485442] dark:text-[#8A9E7F] text-xs font-bold uppercase">
                  {checkoutItem.name}
                </div>
              </div>

              {/* Order Breakdown */}
              <div className="p-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-2.5 text-xs">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Item:</span>
                  <span className="font-semibold text-[var(--text-primary)]">{checkoutItem.name}</span>
                </div>
                {checkoutItem.credits && (
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Credits Delivered:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      +{checkoutItem.credits.toLocaleString()} Credits
                    </span>
                  </div>
                )}
                {checkoutItem.billing && (
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Billing Interval:</span>
                    <span className="capitalize font-semibold text-[var(--text-primary)]">
                      {checkoutItem.billing}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Network Fee:</span>
                  <span className="text-emerald-600 font-bold uppercase text-[11px]">Free (Sponsored)</span>
                </div>
                <div className="pt-2 border-t border-[var(--border-color)] flex justify-between text-sm font-bold text-[var(--text-primary)]">
                  <span>Total Due:</span>
                  <span className="font-mono text-base font-extrabold text-[var(--primary)]">
                    ${checkoutItem.price}.00 USD
                  </span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Select Payment Rail
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setPaymentMethod('base_usdc')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'base_usdc'
                        ? 'bg-[#485442]/10 border-[#485442] ring-1 ring-[#485442]'
                        : 'bg-[var(--bg-app)] border-[var(--border-color)] hover:border-[var(--primary)]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs">
                        ⚡
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--text-primary)]">
                          Base USDC (Connected Wallet)
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)] font-mono">
                          {truncateAddress(userProfile.walletAddress)} · 1-Click
                        </div>
                      </div>
                    </div>
                    {paymentMethod === 'base_usdc' && <Check className="w-4 h-4 text-[#485442]" />}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#485442]/10 border-[#485442] ring-1 ring-[#485442]'
                        : 'bg-[var(--bg-app)] border-[var(--border-color)] hover:border-[var(--primary)]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--text-primary)]">
                          Credit / Debit Card (Stripe)
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)]">
                          Apple Pay, Google Pay, Visa, Mastercard
                        </div>
                      </div>
                    </div>
                    {paymentMethod === 'card' && <Check className="w-4 h-4 text-[#485442]" />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  disabled={isProcessing}
                  onClick={() => setCheckoutItem(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[var(--border-color)] text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  disabled={isProcessing}
                  onClick={handleExecutePayment}
                  className="flex-1 py-2.5 rounded-xl bg-[#485442] hover:bg-[#3b4635] text-white text-xs font-bold shadow-button-primary transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Confirming...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay ${checkoutItem.price}.00</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
