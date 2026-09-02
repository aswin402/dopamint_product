import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Code2,
  Search,
  Award,
  Flame,
  Wallet,
  Compass,
  MessageSquare,
  Folder,
  Plus,
  Settings,
  Share2,
  LogOut,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Pencil,
  Trash2,
  ExternalLink,
  Lock,
  Unlock,
  ShieldCheck,
  AlertCircle,
  AlertTriangle,
  Info,
  Zap,
  CreditCard,
  BarChart2,
  BarChart3,
  PieChart,
  Activity,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ArrowDownLeft,
  BookOpen,
  ListPlus,
  RefreshCw,
  SlidersHorizontal,
  Layers,
  Bot,
  Send,
  Mic,
  Paperclip,
  Globe,
  Clock,
  Star,
  Users,
  Gift,
  Trophy,
  Target,
  Cpu,
  Coins,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
  X,
  HelpCircle,
  Bell,
  Eye,
  Terminal,
  MoreVertical,
} from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import { Button, Badge, Card, Input } from '../ui';
import { TokenIcon } from '../common/TokenIcon';
import { ThinkingAccordion } from '../chat/ThinkingAccordion';
import { KeyPointsCard } from '../chat/KeyPointsCard';
import { CodeBlock } from '../chat/CodeBlock';
import { useCryptoStore } from '../../store/useCryptoStore';
import { triggerCelebration, triggerConfetti } from '../../lib/confetti';
import type { KeyPointItem, ThinkingStep } from '../../types/crypto';

// All 8 Modular iPhone-Grade Widgets
import { MarketOverviewWidget } from '../widgets/MarketOverviewWidget';
import { TokenUnlockWidget } from '../widgets/TokenUnlockWidget';
import { OrderBookDepthWidget } from '../widgets/OrderBookDepthWidget';
import { WhaleTrackingWidget } from '../widgets/WhaleTrackingWidget';
import { ExchangeNetflowWidget } from '../widgets/ExchangeNetflowWidget';
import { ListingFeedWidget } from '../widgets/ListingFeedWidget';
import { SentimentNewsWidget } from '../widgets/SentimentNewsWidget';
import { PortfolioSummaryWidget } from '../widgets/PortfolioSummaryWidget';

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

interface StyleGuidePageProps {
  forcedTheme?: 'light' | 'dark';
}

export const StyleGuidePage: React.FC<StyleGuidePageProps> = ({ forcedTheme }) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [inputVal, setInputVal] = useState('Search Bitcoin, Ethereum, Solana...');
  const [activeSection, setActiveSection] = useState('colors');
  const [switchDemo, setSwitchDemo] = useState(true);
  const [activeTabDemo, setActiveTabDemo] = useState('Widgets');
  const [activeCategoryDemo, setActiveCategoryDemo] = useState('Trading');
  const [dialogTabDemo, setDialogTabDemo] = useState<'chats' | 'tokens'>('tokens');

  const storeTheme = useCryptoStore((s) => s.theme);
  const toggleTheme = useCryptoStore((s) => s.toggleTheme);
  const setTheme = useCryptoStore((s) => s.setTheme);
  const setModalState = useCryptoStore((s) => s.setModalState);

  const currentTheme = forcedTheme || storeTheme;

  useEffect(() => {
    if (forcedTheme) {
      document.documentElement.classList.toggle('dark', forcedTheme === 'dark');
      setTheme(forcedTheme);
    }
  }, [forcedTheme, setTheme]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const navSections = [
    { id: 'colors', label: '1. Color Tokens (OKLCH)' },
    { id: 'typography', label: '2. Typography & Numerals' },
    { id: 'icons', label: '3. Iconography & Logos' },
    { id: 'buttons', label: '4. Buttons & Controls' },
    { id: 'badges', label: '5. Badges & Status Pills' },
    { id: 'form-controls', label: '6. Switches, Toggles & Tabs' },
    { id: 'cards', label: '7. Cards & Surface Elevation' },
    { id: 'dashboard', label: '8. Dashboard & Prompt Hero' },
    { id: 'chat', label: '9. AI Chat & Reasoning' },
    { id: 'widgets', label: '10. 8 iPhone-Grade Widgets' },
    { id: 'points', label: '11. Points, XP & Streaks' },
    { id: 'refer', label: '12. Refer & Leaderboard' },
    { id: 'sidebar-nav', label: '13. Sidebar & Nav Elements' },
    { id: 'feedback', label: '14. Toasts & Alerts Banners' },
    { id: 'dialogs-showcase', label: '15. Dialogs (Settings, Favourites)' },
    { id: 'menus-showcase', label: '16. Context Menus & Popovers' },
    { id: 'modals', label: '17. Global Modals Catalog (13)' },
    { id: 'figma', label: '18. Figma Tokens JSON Export' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const iconCatalog = [
    { name: 'Sparkles', icon: <Sparkles className="w-5 h-5" />, category: 'AI & Actions' },
    { name: 'Bot', icon: <Bot className="w-5 h-5" />, category: 'AI & Actions' },
    { name: 'Terminal', icon: <Terminal className="w-5 h-5" />, category: 'AI & Actions' },
    { name: 'Compass', icon: <Compass className="w-5 h-5" />, category: 'Navigation' },
    { name: 'MessageSquare', icon: <MessageSquare className="w-5 h-5" />, category: 'Navigation' },
    { name: 'Search', icon: <Search className="w-5 h-5" />, category: 'Navigation' },
    { name: 'Folder', icon: <Folder className="w-5 h-5" />, category: 'Navigation' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, category: 'Navigation' },
    { name: 'Layers', icon: <Layers className="w-5 h-5" />, category: 'Navigation' },
    { name: 'Award', icon: <Award className="w-5 h-5" />, category: 'Gamification' },
    { name: 'Flame', icon: <Flame className="w-5 h-5" />, category: 'Gamification' },
    { name: 'Trophy', icon: <Trophy className="w-5 h-5" />, category: 'Gamification' },
    { name: 'Target', icon: <Target className="w-5 h-5" />, category: 'Gamification' },
    { name: 'Wallet', icon: <Wallet className="w-5 h-5" />, category: 'Financial' },
    { name: 'CreditCard', icon: <CreditCard className="w-5 h-5" />, category: 'Financial' },
    { name: 'Coins', icon: <Coins className="w-5 h-5" />, category: 'Financial' },
    { name: 'BarChart2', icon: <BarChart2 className="w-5 h-5" />, category: 'Financial' },
    { name: 'BarChart3', icon: <BarChart3 className="w-5 h-5" />, category: 'Financial' },
    { name: 'PieChart', icon: <PieChart className="w-5 h-5" />, category: 'Financial' },
    { name: 'TrendingUp', icon: <TrendingUp className="w-5 h-5" />, category: 'Financial' },
    { name: 'TrendingDown', icon: <TrendingDown className="w-5 h-5" />, category: 'Financial' },
    { name: 'Activity', icon: <Activity className="w-5 h-5" />, category: 'Financial' },
    { name: 'Lock', icon: <Lock className="w-5 h-5" />, category: 'Security' },
    { name: 'Unlock', icon: <Unlock className="w-5 h-5" />, category: 'Security' },
    { name: 'ShieldCheck', icon: <ShieldCheck className="w-5 h-5" />, category: 'Security' },
    { name: 'Zap', icon: <Zap className="w-5 h-5" />, category: 'Utility' },
    { name: 'Cpu', icon: <Cpu className="w-5 h-5" />, category: 'Utility' },
    { name: 'Globe', icon: <Globe className="w-5 h-5" />, category: 'Utility' },
    { name: 'Clock', icon: <Clock className="w-5 h-5" />, category: 'Utility' },
    { name: 'Send', icon: <Send className="w-5 h-5" />, category: 'Utility' },
    { name: 'Mic', icon: <Mic className="w-5 h-5" />, category: 'Utility' },
    { name: 'Paperclip', icon: <Paperclip className="w-5 h-5" />, category: 'Utility' },
    { name: 'Copy', icon: <Copy className="w-5 h-5" />, category: 'Utility' },
    { name: 'Share2', icon: <Share2 className="w-5 h-5" />, category: 'Utility' },
    { name: 'Check', icon: <Check className="w-5 h-5" />, category: 'Utility' },
    { name: 'CheckCircle', icon: <CheckCircle className="w-5 h-5" />, category: 'Utility' },
    { name: 'X', icon: <X className="w-5 h-5" />, category: 'Utility' },
    { name: 'Pencil', icon: <Pencil className="w-5 h-5" />, category: 'Utility' },
    { name: 'Trash2', icon: <Trash2 className="w-5 h-5" />, category: 'Utility' },
    { name: 'Plus', icon: <Plus className="w-5 h-5" />, category: 'Utility' },
    { name: 'ListPlus', icon: <ListPlus className="w-5 h-5" />, category: 'Utility' },
    { name: 'BookOpen', icon: <BookOpen className="w-5 h-5" />, category: 'Utility' },
    { name: 'RefreshCw', icon: <RefreshCw className="w-5 h-5" />, category: 'Utility' },
    { name: 'SlidersHorizontal', icon: <SlidersHorizontal className="w-5 h-5" />, category: 'Utility' },
    { name: 'Bell', icon: <Bell className="w-5 h-5" />, category: 'Utility' },
    { name: 'Star', icon: <Star className="w-5 h-5" />, category: 'Utility' },
    { name: 'Eye', icon: <Eye className="w-5 h-5" />, category: 'Utility' },
    { name: 'Users', icon: <Users className="w-5 h-5" />, category: 'Utility' },
    { name: 'Gift', icon: <Gift className="w-5 h-5" />, category: 'Utility' },
    { name: 'ThumbsUp', icon: <ThumbsUp className="w-5 h-5" />, category: 'Feedback' },
    { name: 'ThumbsDown', icon: <ThumbsDown className="w-5 h-5" />, category: 'Feedback' },
    { name: 'AlertTriangle', icon: <AlertTriangle className="w-5 h-5" />, category: 'Feedback' },
    { name: 'AlertCircle', icon: <AlertCircle className="w-5 h-5" />, category: 'Feedback' },
    { name: 'Info', icon: <Info className="w-5 h-5" />, category: 'Feedback' },
    { name: 'HelpCircle', icon: <HelpCircle className="w-5 h-5" />, category: 'Feedback' },
    { name: 'ArrowRight', icon: <ArrowRight className="w-5 h-5" />, category: 'Arrows' },
    { name: 'ArrowLeft', icon: <ArrowLeft className="w-5 h-5" />, category: 'Arrows' },
    { name: 'ArrowUpRight', icon: <ArrowUpRight className="w-5 h-5" />, category: 'Arrows' },
    { name: 'ArrowDownRight', icon: <ArrowDownRight className="w-5 h-5" />, category: 'Arrows' },
    { name: 'ArrowDownLeft', icon: <ArrowDownLeft className="w-5 h-5" />, category: 'Arrows' },
    { name: 'ChevronDown', icon: <ChevronDown className="w-5 h-5" />, category: 'Arrows' },
    { name: 'ChevronUp', icon: <ChevronUp className="w-5 h-5" />, category: 'Arrows' },
    { name: 'ChevronRight', icon: <ChevronRight className="w-5 h-5" />, category: 'Arrows' },
    { name: 'ExternalLink', icon: <ExternalLink className="w-5 h-5" />, category: 'Arrows' },
    { name: 'MoreVertical', icon: <MoreVertical className="w-5 h-5" />, category: 'Utility' },
    { name: 'LogOut', icon: <LogOut className="w-5 h-5" />, category: 'Account' },
  ];

  return (
    <div className={`min-h-screen w-screen max-w-[100vw] bg-[var(--bg-app)] text-[var(--text-primary)] font-sans antialiased overflow-x-hidden selection:bg-[#485442]/30 selection:text-inherit transition-colors duration-200 ${forcedTheme === 'dark' ? 'dark' : ''}`}>
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-[var(--border-color)] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] p-1.5 flex items-center justify-center shadow-2xs">
            <img src={crownLogo} alt="dopamint crown" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-[var(--text-primary)]">
                dopamint Design System
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold font-mono border ${
                currentTheme === 'light'
                  ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
                  : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
              }`}>
                {forcedTheme ? `${forcedTheme.toUpperCase()} MODE SPEC` : `THEME: ${currentTheme.toUpperCase()}`}
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] hidden sm:block">
              Complete Living Component Library & Figma Specification
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick links to light & dark dedicated versions */}
          <div className="hidden md:flex items-center p-0.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
            <a
              href="/style-guide-light"
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                currentTheme === 'light' && forcedTheme === 'light'
                  ? 'bg-[var(--bg-card)] text-[#485442] shadow-2xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Sun className="w-3 h-3 text-amber-500" />
              <span>Light Spec</span>
            </a>
            <a
              href="/style-guide-dark"
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                currentTheme === 'dark' && forcedTheme === 'dark'
                  ? 'bg-[var(--bg-card)] text-[#8A9E7F] shadow-2xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Moon className="w-3 h-3 text-indigo-400" />
              <span>Dark Spec</span>
            </a>
          </div>

          {!forcedTheme && (
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all cursor-pointer shadow-2xs"
            >
              {currentTheme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              )}
            </button>
          )}

          <Button
            size="sm"
            variant="primary"
            onClick={() => triggerCelebration()}
            icon={<Sparkles className="w-3.5 h-3.5" />}
          >
            Confetti
          </Button>

          <a
            href="/"
            className="px-3 py-1.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all flex items-center gap-1.5"
          >
            <span>Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Layout: Sticky Navigation + Content Stream */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 flex gap-8">
        {/* Left Sticky Navigation Menu */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2 no-scrollbar">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-3 mb-2">
              Style Guide Index
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

          <div className="mt-8 p-3.5 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] space-y-2 shadow-2xs">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />
              <span className="text-xs font-bold text-[var(--text-primary)]">Figma & Dev Export</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              Every component, dialog, menu, token, and widget is documented with live interactive previews and JSON specifications.
            </p>
          </div>
        </aside>

        {/* Right Content Stream */}
        <main className="flex-1 min-w-0 space-y-16">
          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 1: COLOR SYSTEM & OKLCH DESIGN TOKENS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="colors" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  1. OKLCH Design Tokens & Color Architecture
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Engineered in OKLCH perceptual space for consistent chroma and contrast across Light Cream & Dark Obsidian palettes.
                </p>
              </div>
              <Badge variant="primary" size="sm">
                Active Theme: {currentTheme.toUpperCase()}
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
                Inter Variable font with strict tracking, optimal line-heights, and tabular numbers for high-frequency financial updates.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                      Dopamint processes tokenomics, protocol documentation, and mempool transactions with sub-second retrieval accuracy.
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="text-[11px] text-[var(--text-muted)] block font-mono">Microcopy & Caption · 11px / Medium</span>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      * Testnet simulated environment. Non-custodial keys secured by Privy.
                    </p>
                  </div>
                </div>
              </Card>

              <Card elevation="card" padding="md" className="space-y-4">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Financial Alignment (tabular-nums)
                </span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Financial figures are styled with <code className="bg-[var(--bg-app)] px-1.5 py-0.5 rounded font-mono text-[11px]">tabular-nums</code> to ensure that columns of digits remain strictly aligned during live orderbook changes.
                </p>

                <div className="space-y-2 bg-[var(--bg-app)] p-3.5 rounded-2xl border border-[var(--border-color)]">
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-[var(--border-color)] font-semibold text-[var(--text-muted)]">
                    <span>Token Asset</span>
                    <span>Tabular Price Feed</span>
                    <span>24h Change</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[var(--text-primary)]">Bitcoin (BTC)</span>
                    <span className="tabular-nums text-[var(--text-primary)]">$71,240.00</span>
                    <span className="text-[var(--green-trend)] tabular-nums">+2.10%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[var(--text-primary)]">Ethereum (ETH)</span>
                    <span className="tabular-nums text-[var(--text-primary)]">$3,420.50</span>
                    <span className="text-[var(--green-trend)] tabular-nums">+3.40%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[var(--text-primary)]">Solana (SOL)</span>
                    <span className="tabular-nums text-[var(--text-primary)]">$142.80</span>
                    <span className="text-[var(--green-trend)] tabular-nums">+5.80%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[var(--text-primary)]">Aerodrome (AERO)</span>
                    <span className="tabular-nums text-[var(--text-primary)]">$1.30</span>
                    <span className="text-[var(--green-trend)] tabular-nums">+8.10%</span>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 3: ICONOGRAPHY & VECTOR ASSETS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="icons" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                3. Iconography & Vector Asset Library
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Curated Lucide icons, crypto token vectors, and official brand assets with standard 24px/20px/16px bounding boxes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-6">
              {/* Brand Asset */}
              <div>
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-3">
                  Brand Crown Asset
                </span>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] p-2.5 flex items-center justify-center shadow-2xs">
                    <img src={crownLogo} alt="dopamint crown" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)]">Dopamint Crown Emblem</h4>
                    <p className="text-xs text-[var(--text-muted)]">High-res PNG & vector mask</p>
                  </div>
                </div>
              </div>

              {/* Token Vectors */}
              <div className="pt-4 border-t border-[var(--border-color)]">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-3">
                  Cryptocurrency Token Icons (Multi-size)
                </span>
                <div className="flex items-center gap-4 flex-wrap">
                  {['BTC', 'ETH', 'SOL', 'AERO', 'DEGEN', 'USDC', 'AVAX', 'MATIC', 'BNB', 'LINK', 'UNI', 'ARB', 'OP', 'TIA', 'STRK', 'PYTH', 'JUP'].map((sym) => (
                    <div key={sym} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs min-w-[70px]">
                      <TokenIcon symbol={sym} size={28} />
                      <span className="text-[11px] font-mono font-bold text-[var(--text-primary)]">{sym}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Lucide Icons Grid */}
              <div className="pt-4 border-t border-[var(--border-color)]">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-3">
                  UI Action & Telemetry Icons (60+ Icons)
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {iconCatalog.map((ic) => (
                    <div
                      key={ic.name}
                      onClick={() => copyToClipboard(`<${ic.name} className="w-4 h-4" />`, ic.name)}
                      className="p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] hover:border-[#485442]/40 transition-all flex flex-col items-center gap-2 text-center cursor-pointer group shadow-2xs"
                      title="Click to copy JSX code"
                    >
                      <div className="text-[var(--text-secondary)] group-hover:text-[#485442] dark:group-hover:text-[#8A9E7F] transition-colors">
                        {ic.icon}
                      </div>
                      <span className="text-[10.5px] font-mono text-[var(--text-muted)] truncate w-full">
                        {ic.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 4: BUTTONS & INTERACTIVE CONTROLS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="buttons" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                4. Buttons & Interactive Controls
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Multi-variant interactive buttons with haptic spring feedback, elevation shadows, and loading states.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Olive CTA</Button>
                <Button variant="secondary">Secondary Card</Button>
                <Button variant="outline">Outline Border</Button>
                <Button variant="ghost">Ghost Action</Button>
                <Button variant="danger">Destructive Action</Button>
                <Button variant="primary" isLoading>Loading State</Button>
                <Button variant="primary" disabled>Disabled State</Button>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[var(--border-color)]">
                <Button size="xs" variant="primary">Extra Small (xs)</Button>
                <Button size="sm" variant="primary">Small (sm)</Button>
                <Button size="md" variant="primary">Medium (md)</Button>
                <Button size="lg" variant="primary">Large CTA (lg)</Button>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 5: BADGES & STATUS PILLS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="badges" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                5. Status Badges, Categories & Sentiment Indicators
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Semantic status tags, category pills, and trend indicators.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <Badge variant="primary">Primary Brand</Badge>
                <Badge variant="trend-up">Bullish +2.1%</Badge>
                <Badge variant="trend-down">Bearish -3.4%</Badge>
                <Badge variant="gold">Unlock in 3d</Badge>
                <Badge variant="outline">Base Sepolia</Badge>
                <Badge variant="neutral">Neutral 62</Badge>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 6: SWITCHES, TOGGLES & SEGMENTED TABS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="form-controls" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                6. Switches, Toggles, Sliders & Segmented Tabs
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Interactive iOS-style segmented controls, toggles, and form range selectors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-6">
              {/* Segmented Tab Switcher Demo */}
              <div>
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                  Segmented Pill Tabs (Right Sidebar Switcher)
                </span>
                <div className="inline-flex p-1 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs">
                  {['Widgets', 'Sources'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTabDemo(tab)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTabDemo === tab
                          ? 'bg-[#485442] dark:bg-[#55604e] text-white shadow-2xs'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* iOS Style Toggle Switch */}
              <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between max-w-md">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">Real-Time On-Chain Streaming</h4>
                  <p className="text-[11px] text-[var(--text-muted)]">Sub-second websocket updates for orderbook depth</p>
                </div>
                <button
                  onClick={() => setSwitchDemo(!switchDemo)}
                  className={`w-12 h-6.5 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                    switchDemo ? 'bg-[#485442] dark:bg-[#55604e]' : 'bg-black/20 dark:bg-white/20'
                  }`}
                >
                  <div
                    className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transform transition-transform ${
                      switchDemo ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="pt-4 border-t border-[var(--border-color)]">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                  Category Filter Pills
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {['All', 'Trading', 'DeFi', 'Layer 2', 'Security', 'Whales'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategoryDemo(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        activeCategoryDemo === cat
                          ? 'bg-[#485442] text-white shadow-2xs'
                          : 'bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 7: CARDS & GEOMETRY
           * ═══════════════════════════════════════════════════════════ */}
          <section id="cards" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                7. Cards & Surface Elevation Architecture
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Layered surfaces with 4 distinct radii (`16px`, `20px`, `24px`, `28px`) and soft shadows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-1">
                <span className="text-[10px] font-mono text-[var(--text-muted)]">radius: 16px · shadow-2xs</span>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">Standard Card</h4>
              </div>
              <div className="p-4 rounded-[20px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-card space-y-1">
                <span className="text-[10px] font-mono text-[var(--text-muted)]">radius: 20px · shadow-card</span>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">Medium Elevation</h4>
              </div>
              <div className="p-4 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-soft space-y-1">
                <span className="text-[10px] font-mono text-[var(--text-muted)]">radius: 24px · shadow-soft</span>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">iPhone Widget Shell</h4>
              </div>
              <div className="p-4 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-flyout space-y-1">
                <span className="text-[10px] font-mono text-[var(--text-muted)]">radius: 28px · shadow-flyout</span>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">Modal Dialog Container</h4>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 8: DASHBOARD & PROMPT HERO
           * ═══════════════════════════════════════════════════════════ */}
          <section id="dashboard" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                8. Dashboard Components & Hero Search Prompt Box
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Centered prompt input box (`max-w-[680px]`) with dark green border `#364432` and referral promotional card.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-6">
              {/* Dashboard Hero Prompt Box Preview */}
              <div className="max-w-[680px] mx-auto p-4 rounded-2xl bg-[var(--bg-app)] border-2 border-[#364432] dark:border-[#52634C] shadow-soft space-y-3">
                <div className="flex items-center gap-2 text-sm text-[var(--text-primary)] font-medium">
                  <Sparkles className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />
                  <span>Ask AI anything about crypto, order books, whale moves...</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]/60">
                  <span>dopamint-4o Reasoning Engine</span>
                  <span className="px-2 py-0.5 bg-[#485442] text-white rounded-lg font-semibold">Search (↵)</span>
                </div>
              </div>

              {/* Referral Promo Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#485442]/15 to-[#364432]/10 border border-[#485442]/30 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#485442] text-white flex items-center justify-center font-bold">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)]">Invite Friends & Earn 30% Commission</h4>
                    <p className="text-xs text-[var(--text-muted)]">Earn instant XP rewards and weekly USDC payouts</p>
                  </div>
                </div>
                <Button size="sm" variant="primary" onClick={() => triggerConfetti()}>
                  Refer Friends
                </Button>
              </div>

              {/* Standard inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Search Coins"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                />
                <Input
                  label="Wallet Address"
                  value="0x4F2a91C8392F865eE824A1054E5F36423c9E3c76"
                  readOnly
                  leftIcon={<Wallet className="w-4 h-4" />}
                />
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 9: CHAT & AI REASONING COMPONENTS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="chat" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                9. AI Reasoning, Thinking Accordions & Code Blocks
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Deep research thought processes, synthesized key points, and syntax-highlighted code blocks.
              </p>
            </div>

            <div className="space-y-4">
              <ThinkingAccordion steps={SAMPLE_THINKING_STEPS} />
              <KeyPointsCard items={SAMPLE_KEY_POINTS} />
              <CodeBlock
                language="typescript"
                code={`// Dopamint Liquidity Retrieval Hook
export const useOrderBookDepth = (tokenPair: string) => {
  const { data } = useSWR(\`/api/v1/depth?pair=\${tokenPair}\`, fetcher, {
    refreshInterval: 1000, // 1s sub-second stream
  });
  return { midPrice: data?.midPrice ?? 71240, bids: data?.bids ?? [] };
};`}
              />
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 10: 8 IPHONE-GRADE MODULAR WIDGETS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="widgets" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  10. 8 iPhone-Grade Modular Widgets (Live Showcase)
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Complete suite of crypto trading widgets with Apple Squircle geometry, SVG sparklines, and live mockups.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#485442]/10 text-[#485442] dark:text-[#8A9E7F] border border-[#485442]/20">
                8 OF 8 WIDGETS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Market Overview */}
              <div className="p-4 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]/60">
                  <span className="text-xs font-extrabold text-[#485442] dark:text-[#8A9E7F]">1 · Market Overview</span>
                </div>
                <MarketOverviewWidget />
              </div>

              {/* 2. Token Unlock */}
              <div className="p-4 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]/60">
                  <span className="text-xs font-extrabold text-[#485442] dark:text-[#8A9E7F]">2 · Token Unlock Calendar</span>
                </div>
                <TokenUnlockWidget />
              </div>

              {/* 3. Order Book Depth */}
              <div className="p-4 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]/60">
                  <span className="text-xs font-extrabold text-[#485442] dark:text-[#8A9E7F]">3 · Order Book Depth</span>
                </div>
                <OrderBookDepthWidget />
              </div>

              {/* 4. Whale Tracking */}
              <div className="p-4 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]/60">
                  <span className="text-xs font-extrabold text-[#485442] dark:text-[#8A9E7F]">4 · Whale / Smart Money</span>
                </div>
                <WhaleTrackingWidget />
              </div>

              {/* 5. Exchange Netflow */}
              <div className="p-4 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]/60">
                  <span className="text-xs font-extrabold text-[#485442] dark:text-[#8A9E7F]">5 · Exchange Netflow</span>
                </div>
                <ExchangeNetflowWidget />
              </div>

              {/* 6. Listing Feed */}
              <div className="p-4 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]/60">
                  <span className="text-xs font-extrabold text-[#485442] dark:text-[#8A9E7F]">6 · Listing / Delisting Feed</span>
                </div>
                <ListingFeedWidget />
              </div>

              {/* 7. Sentiment & News */}
              <div className="p-4 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]/60">
                  <span className="text-xs font-extrabold text-[#485442] dark:text-[#8A9E7F]">7 · Sentiment & News</span>
                </div>
                <SentimentNewsWidget />
              </div>

              {/* 8. Portfolio */}
              <div className="p-4 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]/60">
                  <span className="text-xs font-extrabold text-[#485442] dark:text-[#8A9E7F]">8 · Portfolio & Exposure</span>
                </div>
                <PortfolioSummaryWidget />
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 11: POINTS, XP & STREAKS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="points" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                11. Points, Level Progression & Daily Streaks
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Gamified on-chain engagement with level progress rings, streak roadmaps, and claimable quest bonuses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Level 7 Pioneer Preview Card */}
              <div className="p-5 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#485442]/15 text-[#485442] dark:text-[#8A9E7F] flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[var(--text-primary)]">Level 7 Pioneer</h4>
                      <p className="text-xs text-[var(--text-muted)]">245,000 / 300,000 XP</p>
                    </div>
                  </div>
                  <Badge variant="primary">Top 1%</Badge>
                </div>
                <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                  <div className="h-full bg-[#485442] dark:bg-[#8A9E7F] rounded-full w-[82%]" />
                </div>
              </div>

              {/* 5-Day Streak Card */}
              <div className="p-5 rounded-[24px] bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-orange-500/20 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-500 flex items-center justify-center">
                    <Flame className="w-6 h-6 fill-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[var(--text-primary)]">5-Day Active Streak</h4>
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold">+1,500 Daily XP Multiplier</p>
                  </div>
                </div>
                <Button size="sm" variant="primary" onClick={() => triggerConfetti()}>
                  Claimed ✓
                </Button>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 12: REFERRAL & LEADERBOARD
           * ═══════════════════════════════════════════════════════════ */}
          <section id="refer" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                12. Referral & Leaderboard Podium Components
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Viral growth loops with tier progression, referral links, and rank podiums.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Your Referral Code
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-app)] border border-dashed border-[var(--border-color)]">
                  <span className="font-mono text-sm font-bold text-[var(--text-primary)]">DOPAMINT-ALPHA-2026</span>
                  <Button size="xs" variant="primary" onClick={() => copyToClipboard('DOPAMINT-ALPHA-2026', 'ref')}>
                    Copy
                  </Button>
                </div>
              </div>

              <div className="p-5 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Leaderboard Podium Rank #1
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-amber-500">🥇 #1</span>
                    <span className="font-mono text-xs font-bold text-[var(--text-primary)]">0x9d7…3c2</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">420,000 XP</span>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 13: SIDEBAR & NAVIGATION ELEMENTS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="sidebar-nav" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                13. Left Sidebar & Navigation Micro-Elements
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Active & inactive navigation item states, agent models, and chat history items.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Active Nav Item */}
                <div className="p-3 rounded-xl bg-[#485442] dark:bg-[#55604e] text-white flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Compass className="w-4 h-4" />
                    <span>Explore Feed</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/20 font-mono">Active</span>
                </div>

                {/* Inactive Nav Item */}
                <div className="p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <Trophy className="w-4 h-4" />
                    <span>Leaderboard</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[var(--bg-card)] font-mono text-[var(--text-muted)]">#42</span>
                </div>

                {/* Agent Model Pill */}
                <div className="p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-primary)] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Bot className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />
                    <span>dopamint-4o</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">Fast</span>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 14: TOASTS & FEEDBACK BANNERS
           * ═══════════════════════════════════════════════════════════ */}
          <section id="feedback" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                14. Toast Notifications & Telemetry Banners
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Feedback banners for confirmations, warnings, and transaction states.
              </p>
            </div>

            <div className="space-y-3">
              {/* Success Toast */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-[var(--text-primary)]">Wallet address copied to clipboard</span>
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">SUCCESS</span>
              </div>

              {/* Warning Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span className="text-xs font-medium text-[var(--text-primary)]">Bids left, asks right — spot liquidity thins past $71.6k</span>
                </div>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-bold">WARNING</span>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 15: DIALOG BOXES SHOWCASE (SETTINGS, FAVOURITES)
           * ═══════════════════════════════════════════════════════════ */}
          <section id="dialogs-showcase" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                15. Dialog Box & Modal Component Architecture
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Visual mockups of our core Preferences, Favourites, Share, and Folder dialog boxes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 1. Preferences & Settings Dialog Box Preview */}
              <div className="p-5 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-flyout space-y-4">
                {/* Dialog Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#485442]/10 dark:bg-[#8A9E7F]/20 text-[#485442] dark:text-[#8A9E7F] flex items-center justify-center font-bold">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[var(--text-primary)]">Preferences Dialog</h4>
                      <p className="text-[11px] text-[var(--text-muted)]">Configure appearance, models & API keys</p>
                    </div>
                  </div>
                  <span className="p-1 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)] cursor-pointer">
                    <X className="w-4 h-4" />
                  </span>
                </div>

                {/* Dialog Body */}
                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="font-bold text-[11.5px] text-[var(--text-primary)] block mb-1.5">
                      Appearance Theme (OKLCH)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-[#485442]/10 border border-[#485442] text-[#485442] dark:text-[#8A9E7F] font-bold flex items-center justify-center gap-2">
                        <Sun className="w-3.5 h-3.5" />
                        <span>Light Cream</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] font-semibold flex items-center justify-center gap-2">
                        <Moon className="w-3.5 h-3.5" />
                        <span>Dark Obsidian</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[11.5px] text-[var(--text-primary)] block mb-1.5">
                      Reasoning Engine
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 font-semibold">
                      <div className="p-2 rounded-xl bg-[#485442] text-white text-center font-bold">dopamint-4o</div>
                      <div className="p-2 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] text-center">DeepSeek-R1</div>
                      <div className="p-2 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] text-center">Claude-3.5</div>
                    </div>
                  </div>
                </div>

                {/* Dialog Footer */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--border-color)]">
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button variant="primary" size="sm">Save Preferences</Button>
                </div>
              </div>

              {/* 2. Favourites & Watchlist Dialog Box Preview */}
              <div className="p-5 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-flyout space-y-4">
                {/* Dialog Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                      <Star className="w-4 h-4 fill-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[var(--text-primary)]">Favourites & Watchlist</h4>
                      <p className="text-[11px] text-[var(--text-muted)]">3 saved chats · 4 tracked coins</p>
                    </div>
                  </div>
                  <span className="p-1 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)] cursor-pointer">
                    <X className="w-4 h-4" />
                  </span>
                </div>

                {/* Dialog Tab Switcher */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold">
                  <button
                    onClick={() => setDialogTabDemo('tokens')}
                    className={`flex-1 py-1 rounded-lg transition-all ${
                      dialogTabDemo === 'tokens' ? 'bg-[var(--bg-card)] font-bold text-[var(--text-primary)] shadow-2xs' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    Tracked Coins (4)
                  </button>
                  <button
                    onClick={() => setDialogTabDemo('chats')}
                    className={`flex-1 py-1 rounded-lg transition-all ${
                      dialogTabDemo === 'chats' ? 'bg-[var(--bg-card)] font-bold text-[var(--text-primary)] shadow-2xs' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    Starred Chats (3)
                  </button>
                </div>

                {/* Dialog Body Items */}
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TokenIcon symbol="BTC" size={20} />
                      <div>
                        <div className="text-xs font-bold text-[var(--text-primary)]">Bitcoin</div>
                        <div className="text-[10px] text-[var(--text-muted)]">BTC</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-[var(--text-primary)]">$71,240.00</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">+2.1%</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TokenIcon symbol="ETH" size={20} />
                      <div>
                        <div className="text-xs font-bold text-[var(--text-primary)]">Ethereum</div>
                        <div className="text-[10px] text-[var(--text-muted)]">ETH</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-[var(--text-primary)]">$3,420.50</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">+3.4%</div>
                    </div>
                  </div>
                </div>

                {/* Dialog Footer */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--border-color)]">
                  <Button variant="primary" size="sm">Done</Button>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 16: CONTEXT MENUS & POPOVERS SHOWCASE
           * ═══════════════════════════════════════════════════════════ */}
          <section id="menus-showcase" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                16. Menus, Popovers & Context Action Bars
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Floating context menus for chat actions, user profile menus, and message toolbars.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. Chat Item Context Menu */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Chat Context Menu
                </span>
                <div className="w-56 p-2 rounded-[20px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-flyout space-y-1">
                  <button className="w-full px-2.5 py-1.5 rounded-xl text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)] flex items-center gap-2 cursor-pointer transition-colors">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <span>Pin to Top</span>
                  </button>
                  <button className="w-full px-2.5 py-1.5 rounded-xl text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)] flex items-center gap-2 cursor-pointer transition-colors">
                    <Pencil className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span>Rename Chat</span>
                  </button>
                  <button className="w-full px-2.5 py-1.5 rounded-xl text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)] flex items-center gap-2 cursor-pointer transition-colors">
                    <Folder className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span>Move to Folder</span>
                  </button>
                  <div className="my-1 border-t border-[var(--border-color)]" />
                  <button className="w-full px-2.5 py-1.5 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Chat</span>
                  </button>
                </div>
              </div>

              {/* 2. User Account Menu Popover */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  User Account Popover Menu
                </span>
                <div className="w-64 p-3 rounded-[22px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-flyout space-y-2">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-[var(--border-color)]">
                    <div className="w-8 h-8 rounded-full bg-[#485442] text-white flex items-center justify-center font-bold text-xs">
                      0x
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-mono font-bold text-[var(--text-primary)] truncate">0x4F2a…3c76</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Pro Active</div>
                    </div>
                  </div>

                  <div className="space-y-0.5 text-xs">
                    <button className="w-full px-2 py-1.5 rounded-lg text-left text-[var(--text-primary)] hover:bg-[var(--bg-hover)] flex items-center gap-2">
                      <Settings className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>Preferences</span>
                    </button>
                    <button className="w-full px-2 py-1.5 rounded-lg text-left text-[var(--text-primary)] hover:bg-[var(--bg-hover)] flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>Shortcuts (⌘K)</span>
                    </button>
                    <button className="w-full px-2 py-1.5 rounded-lg text-left text-rose-500 hover:bg-rose-500/10 flex items-center gap-2">
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Disconnect Wallet</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. AI Message Action Toolbar */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  AI Response Action Toolbar
                </span>
                <div className="inline-flex items-center gap-0.5 p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs">
                  <button className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer" title="Copy">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer" title="Share">
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer" title="Regenerate">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-emerald-500 hover:bg-emerald-500/10 cursor-pointer" title="Thumbs Up">
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer" title="Thumbs Down">
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 17: MODALS & DIALOGS CATALOG
           * ═══════════════════════════════════════════════════════════ */}
          <section id="modals" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                17. Global Modal Triggers (13 Active Flyout Modals)
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Click any modal button below to test its flyout animation, layout, and dismiss behavior.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <Button variant="outline" size="sm" onClick={() => setModalState('isCommandPaletteOpen', true)}>
                  ⌘K Palette
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalState('isPortfolioModalOpen', true)}>
                  Portfolio
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalState('isWatchlistModalOpen', true)}>
                  Watchlist
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalState('isAlertsModalOpen', true)}>
                  Price Alerts
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalState('isShareModalOpen', true)}>
                  Share Chat
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalState('isSettingsModalOpen', true)}>
                  Settings
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalState('isUpgradeProModalOpen', true)}>
                  Upgrade Pro
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalState('isAuthModalOpen', true)}>
                  Auth / Wallet
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalState('isLeaderboardModalOpen', true)}>
                  Leaderboard
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalState('isActiveAgentsModalOpen', true)}>
                  Active Agents
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalState('isFolderModalOpen', true)}>
                  Create Folder
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalState('isAddWidgetModalOpen', true)}>
                  Widget Gallery
                </Button>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 18: FIGMA TOKENS JSON EXPORT
           * ═══════════════════════════════════════════════════════════ */}
          <section id="figma" className="space-y-4 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  18. Figma Variables & Design Token JSON Spec
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Directly exportable JSON payload ready for Figma Tokens Studio / Variables plugin.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    JSON.stringify(
                      {
                        name: 'dopamint-design-tokens',
                        version: '2.4.0',
                        light: {
                          bgApp: '#fcfbf7',
                          bgCard: '#f7f6ec',
                          primary: '#485442',
                          borderColor: '#eae7da',
                          textPrimary: '#1a1a1a',
                        },
                        dark: {
                          bgApp: '#0D0D0D',
                          bgCard: '#161616',
                          primary: '#55604e',
                          borderColor: '#262626',
                          textPrimary: '#ECECEC',
                        },
                        radii: { sm: '12px', md: '16px', lg: '20px', widget: '24px', modal: '28px' },
                      },
                      null,
                      2
                    ),
                    'json'
                  )
                }
              >
                Copy Figma JSON
              </Button>
            </div>

            <CodeBlock
              language="json"
              code={JSON.stringify(
                {
                  $schema: 'https://trpc.io/tokens-spec/v1',
                  name: 'dopamint-tokens',
                  version: '2.4.0',
                  color: {
                    light: {
                      bgApp: { value: 'oklch(0.988 0.0054 95.1)', hex: '#fcfbf7' },
                      bgCard: { value: 'oklch(0.971 0.0132 102.0)', hex: '#f7f6ec' },
                      bgCardSubtle: { value: 'oklch(0.952 0.015 102.0)', hex: '#f0eee1' },
                      primary: { value: 'oklch(0.415 0.032 135.0)', hex: '#485442' },
                      borderColor: { value: 'oklch(0.925 0.012 100.0)', hex: '#eae7da' },
                      textPrimary: { value: 'oklch(0.200 0.005 95.0)', hex: '#1a1a1a' },
                    },
                    dark: {
                      bgApp: { value: '#0D0D0D' },
                      bgCard: { value: '#161616' },
                      primary: { value: '#55604e' },
                      borderColor: { value: '#262626' },
                      textPrimary: { value: '#ECECEC' },
                    },
                  },
                  borderRadius: {
                    card: '16px',
                    medium: '20px',
                    widget: '24px',
                    modal: '28px',
                  },
                },
                null,
                2
              )}
            />
          </section>
        </main>
      </div>

      {/* Global Modals for interactive trigger preview */}
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
