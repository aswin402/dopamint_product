import React, { useState } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Copy,
  Check,
  ArrowRight,
  Bell,
  PieChart,
  Star,
  Settings,
  Bot,
  Layers,
  Code2,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  Folder,
  Search,
} from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import { Button, Badge, Card, Input } from '../ui';
import { TokenIcon } from '../common/TokenIcon';
import { FearGreedGauge } from '../insights/FearGreedGauge';
import { ThinkingAccordion } from '../chat/ThinkingAccordion';
import { KeyPointsCard } from '../chat/KeyPointsCard';
import { CodeBlock } from '../chat/CodeBlock';
import { SuggestedPrompts } from '../chat/SuggestedPrompts';
import { useCryptoStore } from '../../store/useCryptoStore';
import { triggerCelebration, triggerConfetti } from '../../lib/confetti';
import type { KeyPointItem, ThinkingStep } from '../../types/crypto';

// Global Modals for trigger preview
import { CommandPalette } from '../modals/CommandPalette';
import { PortfolioModal } from '../modals/PortfolioModal';
import { WatchlistModal } from '../modals/WatchlistModal';
import { AlertsModal } from '../modals/AlertsModal';
import { ShareModal } from '../modals/ShareModal';
import { SettingsModal } from '../modals/SettingsModal';
import { UpgradeProModal } from '../modals/UpgradeProModal';
import { AuthWalletModal } from '../modals/AuthWalletModal';
import { LeaderboardModal } from '../modals/LeaderboardModal';
import { ActiveAgentsModal } from '../modals/ActiveAgentsModal';
import { RenameModal } from '../modals/RenameModal';
import { DeleteModal } from '../modals/DeleteModal';
import { FolderModal } from '../modals/FolderModal';
import { AddWidgetModal } from '../widgets/AddWidgetModal';

interface ColorToken {
  name: string;
  variable: string;
  lightValue: string;
  darkValue: string;
  desc: string;
}

const COLOR_TOKENS: ColorToken[] = [
  {
    name: 'Canvas App Background',
    variable: '--bg-app',
    lightValue: 'oklch(0.988 0.0054 95.1) (#fcfbf7)',
    darkValue: '#0D0D0D (Matte Charcoal)',
    desc: 'Base application canvas surface',
  },
  {
    name: 'Card & Surface Base',
    variable: '--bg-card',
    lightValue: 'oklch(0.971 0.0132 102.0) (#f7f6ec)',
    darkValue: '#161616 (Elevated Card)',
    desc: 'Surface for message bubbles, panels & cards',
  },
  {
    name: 'Card Subtle Background',
    variable: '--bg-card-subtle',
    lightValue: 'oklch(0.952 0.015 102.0) (#f0eee1)',
    darkValue: '#1C1C1C',
    desc: 'Secondary card backgrounds & table headers',
  },
  {
    name: 'Hover Background',
    variable: '--bg-hover',
    lightValue: 'oklch(0.938 0.017 102.0) (#ecead9)',
    darkValue: '#222222',
    desc: 'Interactive element hover state',
  },
  {
    name: 'Primary Forest Olive Accent',
    variable: '--primary',
    lightValue: 'oklch(0.415 0.032 135.0) (#485442)',
    darkValue: '#55604e (Muted Olive)',
    desc: 'Primary CTA buttons, active pills & brand focus',
  },
  {
    name: 'Primary Light Tint',
    variable: '--primary-light',
    lightValue: 'oklch(0.940 0.020 135.0)',
    darkValue: '#20261d',
    desc: 'Subtle accent pill backgrounds & badge fills',
  },
  {
    name: 'Text Primary',
    variable: '--text-primary',
    lightValue: 'oklch(0.200 0.005 95.0) (#1a1a1a)',
    darkValue: '#ECECEC (High Contrast)',
    desc: 'Headings, active labels & main body text',
  },
  {
    name: 'Text Secondary / Muted',
    variable: '--text-secondary',
    lightValue: 'oklch(0.450 0.010 100.0)',
    darkValue: '#A0A0A0',
    desc: 'Captions, subtitles & secondary descriptions',
  },
  {
    name: 'Border Standard',
    variable: '--border-color',
    lightValue: 'oklch(0.925 0.012 100.0) (#eae7da)',
    darkValue: '#262626',
    desc: 'Structural container and card boundaries',
  },
  {
    name: 'Green Trend (Bullish)',
    variable: '--green-trend',
    lightValue: 'oklch(0.65 0.17 145)',
    darkValue: 'oklch(0.68 0.12 145)',
    desc: 'Positive price gains & success badges',
  },
  {
    name: 'Red Trend (Bearish)',
    variable: '--red-trend',
    lightValue: 'oklch(0.62 0.22 25)',
    darkValue: 'oklch(0.64 0.16 25)',
    desc: 'Negative price drawdowns & alert triggers',
  },
  {
    name: 'Gold Accent (Crown/XP)',
    variable: '--gold-accent',
    lightValue: 'oklch(0.75 0.15 80)',
    darkValue: 'oklch(0.75 0.10 80)',
    desc: 'XP points, crowns, star bookmarks & rewards',
  },
];

const SAMPLE_THINKING_STEPS: ThinkingStep[] = [
  {
    id: 's-1',
    title: 'Scanning On-Chain Liquidity & Orderbooks',
    detail: 'Aggregated TVL across Base, Arbitrum, and Ethereum L1 RPC endpoints.',
    status: 'completed',
    durationMs: 420,
  },
  {
    id: 's-2',
    title: 'Evaluating ETF Net Flows & Funding Rates',
    detail: 'Extracted Net Institutional Inflows from BlackRock IBIT & Fidelity FBTC.',
    status: 'completed',
    durationMs: 650,
  },
  {
    id: 's-3',
    title: 'Synthesizing Alpha & Risk-Reward Modeling',
    detail: 'Calculated Sharpe-ratio volatility against macroeconomic rate decisions.',
    status: 'completed',
    durationMs: 380,
  },
];

const SAMPLE_KEY_POINTS: KeyPointItem[] = [
  {
    id: 'kp-1',
    iconType: 'orange',
    title: 'Decentralized Monetary Hard Cap',
    description: 'Mathematically fixed 21 Million supply cap verified by consensus rules.',
  },
  {
    id: 'kp-2',
    iconType: 'green',
    title: 'Proof-of-Work Hashrate Security',
    description: 'Secured by >650 Exahashes per second of computational energy.',
  },
  {
    id: 'kp-3',
    iconType: 'blue',
    title: 'Transparent Ledger Verification',
    description: 'Every satoshi transaction is publicly auditable on the global timechain.',
  },
  {
    id: 'kp-4',
    iconType: 'purple',
    title: 'Self-Sovereign Settlement',
    description: 'Zero counterparty risk with non-custodial cryptographic key ownership.',
  },
];

export const StyleGuidePage: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [buttonVariant, setButtonVariant] = useState<'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'>('primary');
  const [buttonSize, setButtonSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('md');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [inputVal, setInputVal] = useState('Search Bitcoin, Ethereum, Solana...');
  const [activeSection, setActiveSection] = useState('colors');

  const theme = useCryptoStore((s) => s.theme);
  const toggleTheme = useCryptoStore((s) => s.toggleTheme);
  const setModalState = useCryptoStore((s) => s.setModalState);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const navSections = [
    { id: 'colors', label: 'Color Tokens' },
    { id: 'typography', label: 'Typography & Tabular' },
    { id: 'buttons', label: 'Buttons & Controls' },
    { id: 'badges', label: 'Badges & Key Points' },
    { id: 'cards', label: 'Cards & Geometry' },
    { id: 'inputs', label: 'Form Inputs' },
    { id: 'chat', label: 'Chat Components' },
    { id: 'telemetry', label: 'Financial Telemetry' },
    { id: 'modals', label: 'Modals & Dialogs' },
    { id: 'motion', label: 'Physics Springs' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen w-screen max-w-[100vw] bg-[var(--bg-app)] text-[var(--text-primary)] font-sans antialiased overflow-x-hidden selection:bg-[#485442]/30 selection:text-inherit transition-colors duration-200">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-[var(--border-color)] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] p-1.5 flex items-center justify-center shadow-2xs">
            <img src={crownLogo} alt="dopamint crown" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-[var(--text-primary)]">
                dopamint Design System
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8A9E7F] border border-[#485442]/20 font-mono">
                OKLCH SPEC v2.4
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] hidden sm:block">
              Living component library & interactive token specification
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all cursor-pointer shadow-2xs"
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span className="hidden md:inline">Dark Obsidian</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Light Cream</span>
              </>
            )}
          </button>

          <Button
            size="sm"
            variant="primary"
            onClick={() => triggerCelebration()}
            icon={<Sparkles className="w-3.5 h-3.5" />}
          >
            Celebration
          </Button>

          <a
            href="/"
            className="px-3 py-1.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all flex items-center gap-1.5"
          >
            <span>Return to App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Layout: Sticky Category Sidebar + Content Canvas */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 flex gap-8">
        {/* Left Sticky Navigation Menu */}
        <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-3 mb-2">
              Sections
            </p>
            {navSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                  activeSection === sec.id
                    ? 'bg-[#485442] dark:bg-[#55604e] text-white shadow-2xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <span>{sec.label}</span>
                {activeSection === sec.id && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>

          <div className="mt-8 p-3 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] space-y-2">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />
              <span className="text-xs font-bold text-[var(--text-primary)]">Route Notice</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              This hidden route (<code className="font-mono text-[10px] bg-[var(--bg-app)] px-1 py-0.5 rounded">/style-guide</code>) allows developers & designers to inspect all tokens and UI states without cluttering public app navigation.
            </p>
          </div>
        </aside>

        {/* Right Content Stream */}
        <main className="flex-1 min-w-0 space-y-14">
          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 1: COLOR SYSTEM & OKLCH DESIGN TOKENS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="colors" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  1. OKLCH Theme Architecture & Color Tokens
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Engineered in OKLCH perceptual space for consistent chroma and lightness across Light & Dark palettes.
                </p>
              </div>
              <Badge variant="primary" size="sm">
                Active Theme: {theme.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {COLOR_TOKENS.map((tok) => (
                <div
                  key={tok.variable}
                  className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3 transition-all hover:border-[#485442]/50 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        style={{ backgroundColor: `var(${tok.variable})` }}
                        className="w-7 h-7 rounded-xl border border-[var(--border-color)] shadow-inner flex-shrink-0"
                      />
                      <span className="font-bold text-xs text-[var(--text-primary)] truncate">
                        {tok.name}
                      </span>
                    </div>

                    <button
                      onClick={() => copyToClipboard(`var(${tok.variable})`, tok.variable)}
                      className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors cursor-pointer"
                      title="Copy CSS variable"
                    >
                      {copiedToken === tok.variable ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-1 bg-[var(--bg-app)] p-2.5 rounded-xl font-mono text-[11px]">
                    <div className="flex justify-between text-[var(--text-muted)]">
                      <span>Token:</span>
                      <span className="text-[#485442] dark:text-[#8A9E7F] font-semibold">{tok.variable}</span>
                    </div>
                    <div className="flex justify-between text-[var(--text-muted)]">
                      <span>Light:</span>
                      <span className="text-[var(--text-secondary)] truncate max-w-[170px]">{tok.lightValue}</span>
                    </div>
                    <div className="flex justify-between text-[var(--text-muted)]">
                      <span>Dark:</span>
                      <span className="text-[var(--text-secondary)] truncate max-w-[170px]">{tok.darkValue}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[var(--text-muted)] leading-tight">{tok.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 2: TYPOGRAPHY & TABULAR NUMERALS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="typography" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                2. Typography Hierarchy & Tabular Numeric Alignment
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Powered by Inter Variable font with strict tracking, optimal line-heights, and tabular figures for financial prices.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Type Scale Card */}
              <Card elevation="card" padding="md" className="space-y-3">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Typographic Scale
                </span>
                <div className="space-y-3 divide-y divide-[var(--border-color)]">
                  <div className="pt-2">
                    <span className="text-[11px] text-[var(--text-muted)] block font-mono">Display H1 · 32px / Bold</span>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                      Decentralized Crypto Intelligence
                    </h1>
                  </div>
                  <div className="pt-2">
                    <span className="text-[11px] text-[var(--text-muted)] block font-mono">Heading H2 · 22px / Semibold</span>
                    <h2 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                      Real-Time On-Chain Market Telemetry
                    </h2>
                  </div>
                  <div className="pt-2">
                    <span className="text-[11px] text-[var(--text-muted)] block font-mono">Heading H3 · 16px / Semibold</span>
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">
                      Order Book Liquidity & Arbitrage Analytics
                    </h3>
                  </div>
                  <div className="pt-2">
                    <span className="text-[11px] text-[var(--text-muted)] block font-mono">Body Regular · 13.5px / Regular (1.6 Line Height)</span>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      CryptoGPT processes tokenomics, protocol documentation, and mempool transactions with sub-second retrieval accuracy.
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="text-[11px] text-[var(--text-muted)] block font-mono">Microcopy & Caption · 11px / Medium</span>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      * Past performance does not guarantee future results. Crypto assets involve volatility.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Tabular Numerals Comparison Card */}
              <Card elevation="card" padding="md" className="space-y-4">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Financial Alignment (tabular-nums)
                </span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Financial figures are styled with <code className="bg-[var(--bg-app)] px-1.5 py-0.5 rounded font-mono text-[11px]">font-variant-numeric: tabular-nums</code> to ensure that columns of digits remain strictly aligned during live updates.
                </p>

                <div className="space-y-2 bg-[var(--bg-app)] p-3.5 rounded-2xl border border-[var(--border-color)]">
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-[var(--border-color)] font-semibold text-[var(--text-muted)]">
                    <span>Token Asset</span>
                    <span>Tabular Price Feed</span>
                    <span>24h Change</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[var(--text-primary)]">Bitcoin (BTC)</span>
                    <span className="tabular-nums text-[var(--text-primary)]">$87,942.50</span>
                    <span className="text-[var(--green-trend)] tabular-nums">+4.82%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[var(--text-primary)]">Ethereum (ETH)</span>
                    <span className="tabular-nums text-[var(--text-primary)]">$3,240.15</span>
                    <span className="text-[var(--green-trend)] tabular-nums">+2.15%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[var(--text-primary)]">Solana (SOL)</span>
                    <span className="tabular-nums text-[var(--text-primary)]">$194.50</span>
                    <span className="text-[var(--red-trend)] tabular-nums">-1.30%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[var(--text-primary)]">Cardano (ADA)</span>
                    <span className="tabular-nums text-[var(--text-primary)]">$0.8421</span>
                    <span className="text-[var(--green-trend)] tabular-nums">+0.45%</span>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 3: BUTTONS & INTERACTIVE CONTROLS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="buttons" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                3. Buttons & Interactive Controls Primitive
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Standardized variants, sizes, loading states, and spring micro-press physics.
              </p>
            </div>

            {/* Interactive Button Playground */}
            <Card elevation="card" padding="lg" className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
                {/* Variant Selector */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-[var(--text-muted)] mr-1">Variant:</span>
                  {(['primary', 'secondary', 'outline', 'ghost', 'danger'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setButtonVariant(v)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                        buttonVariant === v
                          ? 'bg-[#485442] dark:bg-[#55604e] text-white'
                          : 'bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                {/* Size Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[var(--text-muted)] mr-1">Size:</span>
                  {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setButtonSize(s)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase transition-all cursor-pointer ${
                        buttonSize === s
                          ? 'bg-[#485442] dark:bg-[#55604e] text-white'
                          : 'bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Loading State Toggle */}
                <button
                  onClick={() => setButtonLoading(!buttonLoading)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    buttonLoading
                      ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                      : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-secondary)]'
                  }`}
                >
                  {buttonLoading ? 'Loading: ON' : 'Loading: OFF'}
                </button>
              </div>

              {/* Live Preview Area */}
              <div className="p-8 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant={buttonVariant}
                  size={buttonSize}
                  isLoading={buttonLoading}
                  onClick={() => triggerConfetti()}
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  Interactive Button
                </Button>

                <Button
                  variant={buttonVariant}
                  size={buttonSize}
                  isLoading={buttonLoading}
                  disabled
                >
                  Disabled State
                </Button>
              </div>

              {/* Code Snippet */}
              <div className="p-3 bg-[var(--bg-card-subtle)] rounded-xl font-mono text-xs text-[var(--text-secondary)] flex items-center justify-between">
                <code>
                  {`<Button variant="${buttonVariant}" size="${buttonSize}"${buttonLoading ? ' isLoading' : ''}>Click Me</Button>`}
                </code>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `<Button variant="${buttonVariant}" size="${buttonSize}">Click Me</Button>`,
                      'button-jsx'
                    )
                  }
                  className="p-1 hover:text-[var(--text-primary)] cursor-pointer"
                >
                  {copiedToken === 'button-jsx' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </Card>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 4: BADGES & KEY POINT BULLET CARDS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="badges" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                4. Badges, Tags & Key Point Blocks
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Custom colored badge bullets that structure AI synthesis answers in conversation.
              </p>
            </div>

            <div className="space-y-4">
              {/* Badge Variants Row */}
              <Card elevation="card" padding="md" className="space-y-3">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Status & Trend Badges
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="trend-up" size="sm" icon={<TrendingUp className="w-3 h-3" />}>
                    +8.42% 24h
                  </Badge>
                  <Badge variant="trend-down" size="sm">
                    -3.15% 24h
                  </Badge>
                  <Badge variant="neutral" size="sm">
                    0.00% Static
                  </Badge>
                  <Badge variant="primary" size="sm">
                    Active Agent
                  </Badge>
                  <Badge variant="gold" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                    Pro Trader
                  </Badge>
                  <Badge variant="outline" size="sm">
                    Base Sepolia Testnet
                  </Badge>
                </div>
              </Card>

              {/* Key Point Cards Preview */}
              <Card elevation="card" padding="md" className="space-y-3">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  AI Key Point Blocks (PRD / Design Match)
                </span>
                <KeyPointsCard items={SAMPLE_KEY_POINTS} />
              </Card>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 5: CARDS, SURFACES & ELEVATIONS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="cards" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                5. Cards, Surfaces & Elevation Depths
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Soft optical shadows and rounded geometry (22px) supporting responsive grid hierarchy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Card elevation="none" padding="md" className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-primary)]">Elevation: None</span>
                <p className="text-xs text-[var(--text-muted)]">Flat bordered surface for secondary containers.</p>
              </Card>

              <Card elevation="soft" padding="md" className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-primary)]">Elevation: Soft</span>
                <p className="text-xs text-[var(--text-muted)]">Subtle ambient depth for sidebar items and pills.</p>
              </Card>

              <Card elevation="card" hoverLift padding="md" className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-primary)]">Elevation: Card (Lift)</span>
                <p className="text-xs text-[var(--text-muted)]">Standard card surface with hover elevation transition.</p>
              </Card>

              <Card elevation="flyout" padding="md" className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-primary)]">Elevation: Flyout</span>
                <p className="text-xs text-[var(--text-muted)]">High elevation shadow for floating modals & popovers.</p>
              </Card>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 6: FORM CONTROLS & INPUTS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="inputs" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                6. Form Controls & Input Fields
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Accessible inputs with focus rings, leading icons, error validations, and action slots.
              </p>
            </div>

            <Card elevation="card" padding="lg" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Search Query"
                  leftIcon={<Search className="w-4 h-4" />}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  hint="Type any token or protocol name"
                />

                <Input
                  label="Price Alert Target ($)"
                  leftIcon={<Bell className="w-4 h-4" />}
                  defaultValue="92000"
                  hint="Trigger browser alert when BTC crosses threshold"
                />

                <Input
                  label="Error State Example"
                  defaultValue="invalid_wallet_address"
                  error="Please enter a valid 42-character 0x EVM hex address."
                />

                <Input
                  label="Read-Only Share Key"
                  defaultValue="https://dopamint.ai/c/chat-btc-alpha"
                  readOnly
                  rightIcon={<Copy className="w-4 h-4 cursor-pointer" />}
                />
              </div>
            </Card>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 7: CHAT COMPONENTS & STREAMING ANATOMY
           * ═══════════════════════════════════════════════════════════ */}
          <section id="chat" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                7. Chat Message Stream Anatomy & Deep Research
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Thinking state accordions, code blocks, copy controls, and contextual follow-up chips.
              </p>
            </div>

            <div className="space-y-4 max-w-[820px]">
              {/* User Message Bubble */}
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-[var(--bg-chat-user)] border border-[var(--border-color)] p-4 rounded-[20px] shadow-2xs space-y-1">
                  <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed">
                    Explain Bitcoin's monetary hard cap and current on-chain liquidity depth across major L2 rollups.
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-[var(--text-muted)]">
                    <span>1:45 PM</span>
                    <Check className="w-3 h-3 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Assistant Message Bubble */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[24px] p-5 sm:p-6 shadow-card space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] p-1 flex items-center justify-center">
                    <img src={crownLogo} alt="crown" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[var(--text-primary)] block">dopamint-4o</span>
                    <span className="text-[10.5px] text-[var(--text-muted)]">AI Cryptocurrency Intelligence</span>
                  </div>
                </div>

                {/* Deep Research Thinking Accordion */}
                <ThinkingAccordion steps={SAMPLE_THINKING_STEPS} />

                {/* Response Text */}
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                  Bitcoin operates under an absolute hard cap of <strong>21,000,000 BTC</strong>, programmatic scarcity enforced through cryptographic Proof-of-Work consensus. On-chain liquidity across Base and Arbitrum has expanded by +34% following institutional ETF settlement flows.
                </p>

                {/* Key Points */}
                <KeyPointsCard items={SAMPLE_KEY_POINTS} />

                {/* Code Block */}
                <CodeBlock
                  language="solidity"
                  code={`// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract SatoshiVault {\n    uint256 public constant MAX_SUPPLY = 21_000_000 * 1e18;\n    mapping(address => uint256) public balances;\n}`}
                />

                {/* Suggested Prompts */}
                <div className="pt-2">
                  <SuggestedPrompts
                    prompts={[
                      'Explain the Halving supply shock mechanics',
                      'How do Lightning Network state channels route BTC?',
                      'Compare Bitcoin vs Gold market capitalization',
                    ]}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 8: TELEMETRY & FINANCIAL WIDGETS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="telemetry" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                8. Telemetry, Gauges & Crypto Tokens
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Fear & Greed SVG semi-circular gauge, interactive charts, and crypto token vector icons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fear & Greed Gauge Card */}
              <Card elevation="card" padding="md" className="space-y-3 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block self-start">
                  Market Sentiment (Fear & Greed Index)
                </span>
                <FearGreedGauge
                  value={78}
                  classification="Extreme Greed"
                />
              </Card>

              {/* Token Icons Array */}
              <Card elevation="card" padding="md" className="space-y-3">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Token Icon Vector Assets
                </span>
                <div className="grid grid-cols-5 gap-3 pt-2">
                  {['BTC', 'ETH', 'SOL', 'USDT', 'BNB', 'BASE', 'DOGE', 'AVAX', 'XRP', 'ADA'].map(
                    (sym) => (
                      <div
                        key={sym}
                        className="flex flex-col items-center gap-1.5 p-2 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)]"
                      >
                        <TokenIcon symbol={sym} size={32} />
                        <span className="text-[11px] font-bold font-mono text-[var(--text-primary)]">
                          {sym}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </Card>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 9: MODAL DIALOGS LAUNCHPAD
           * ═══════════════════════════════════════════════════════════ */}
          <section id="modals" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                9. Modal Dialogs Launchpad & Triggers
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Test and trigger any of the 13 built-in application dialogs in isolation.
              </p>
            </div>

            <Card elevation="card" padding="lg" className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModalState('isCommandPaletteOpen', true)}
                  icon={<Search className="w-3.5 h-3.5" />}
                >
                  Command (⌘K)
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModalState('isPortfolioModalOpen', true)}
                  icon={<PieChart className="w-3.5 h-3.5" />}
                >
                  Portfolio Tracker
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModalState('isWatchlistModalOpen', true)}
                  icon={<Star className="w-3.5 h-3.5" />}
                >
                  Favourites / Watchlist
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModalState('isAlertsModalOpen', true)}
                  icon={<Bell className="w-3.5 h-3.5" />}
                >
                  Price Alerts
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModalState('isSettingsModalOpen', true)}
                  icon={<Settings className="w-3.5 h-3.5" />}
                >
                  Preferences
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModalState('isUpgradeProModalOpen', true)}
                  icon={<Sparkles className="w-3.5 h-3.5" />}
                >
                  Buy Pro Credits
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModalState('isAuthModalOpen', true)}
                  icon={<ShieldCheck className="w-3.5 h-3.5" />}
                >
                  Wallet Ready
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModalState('isLeaderboardModalOpen', true)}
                  icon={<TrendingUp className="w-3.5 h-3.5" />}
                >
                  Testnet Leaderboard
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModalState('isActiveAgentsModalOpen', true)}
                  icon={<Bot className="w-3.5 h-3.5" />}
                >
                  Active AI Agents
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModalState('isAddWidgetModalOpen', true)}
                  icon={<Layers className="w-3.5 h-3.5" />}
                >
                  Add Widget Catalog
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModalState('isFolderModalOpen', true)}
                  icon={<Folder className="w-3.5 h-3.5" />}
                >
                  Folder Creator
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModalState('isShareModalOpen', true)}
                  icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                >
                  Share Chat
                </Button>
              </div>
            </Card>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 10: SPRING PHYSICS & CELEBRATION
           * ═══════════════════════════════════════════════════════════ */}
          <section id="motion" className="space-y-4 scroll-mt-24 pb-16">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                10. Motion Curves & Spring Physics
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Snappy 180ms, 220ms, and 250ms spring transitions configured for 60fps GPU acceleration.
              </p>
            </div>

            <Card elevation="card" padding="lg" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)] space-y-1">
                  <span className="font-bold text-[var(--text-primary)]">Button Micro-press</span>
                  <p className="text-[11px] text-[var(--text-muted)]">Scale down to 0.98 on tap with instant spring recoil.</p>
                </div>

                <div className="p-4 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)] space-y-1">
                  <span className="font-bold text-[var(--text-primary)]">Card Elevation Lift</span>
                  <p className="text-[11px] text-[var(--text-muted)]">translateY(-2px) combined with soft drop shadow shift.</p>
                </div>

                <div className="p-4 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)] space-y-1">
                  <span className="font-bold text-[var(--text-primary)]">Modal Springs</span>
                  <p className="text-[11px] text-[var(--text-muted)]">stiffness: 420, damping: 32, mass: 0.8 for snappy pop-in.</p>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  size="md"
                  variant="primary"
                  onClick={() => triggerCelebration()}
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  Fire Canvas Confetti Stream
                </Button>
              </div>
            </Card>
          </section>
        </main>
      </div>

      {/* Render All Global Modals for Launchpad Previews */}
      <CommandPalette />
      <PortfolioModal />
      <WatchlistModal />
      <AlertsModal />
      <ShareModal />
      <SettingsModal />
      <UpgradeProModal />
      <AuthWalletModal />
      <LeaderboardModal />
      <ActiveAgentsModal />
      <RenameModal />
      <DeleteModal />
      <FolderModal />
      <AddWidgetModal />
    </div>
  );
};
