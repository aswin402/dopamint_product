import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Check,
  Copy,
  Lock,
  ArrowRight,
  Wallet,
  Loader2,
  RefreshCw,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  X,
  Smartphone,
  Tablet,
  Monitor,
  Key,
  WifiOff,
  ServerCrash,
  Clock,
  ExternalLink,
  Code2,
} from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import { useCryptoStore } from '../../store/useCryptoStore';
import { Button, Badge } from '../ui';

interface LoginBehaviorPageProps {
  forcedTheme?: 'light' | 'dark';
}

// Google SVG Icon
const GoogleIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

// Apple SVG Icon
const AppleIcon = () => (
  <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 170 170">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.85-12-14.43-6.04-9.33-10.74-19.82-14.1-31.47-3.37-11.64-5.06-22.75-5.06-33.32 0-14.88 3.73-27.16 11.2-36.83 7.47-9.67 16.92-14.62 28.36-14.85 4.8 0 10.36 1.34 16.69 4.02 6.33 2.68 10.34 4.09 12.04 4.23 2.12-.27 6.47-1.78 13.06-4.54 6.58-2.75 12.29-3.95 17.12-3.6 12.63.85 22.82 5.62 30.56 14.32-11.05 6.7-16.44 15.98-16.18 27.84.27 9.4 3.86 17.27 10.78 23.6 6.92 6.34 15.19 9.87 24.82 10.6-2.22 6.74-4.94 13.52-8.17 20.35zm-33.8-106.9c-.1-1.33-.24-2.8-.42-4.4-.3-2.67-.18-5.32.36-7.94.54-2.62 1.54-5.04 3-7.26 1.46-2.22 3.37-4.14 5.73-5.75 4.14-2.88 9.07-4.52 14.78-4.92.1 1.47.24 3.01.42 4.61.3 2.68.17 5.34-.4 7.98-.57 2.64-1.57 5.06-3.01 7.26-1.44 2.2-3.36 4.11-5.76 5.73-4.17 2.87-9.07 4.43-14.7 4.69z" />
  </svg>
);

export const LoginBehaviorPage: React.FC<LoginBehaviorPageProps> = ({ forcedTheme }) => {
  const storeTheme = useCryptoStore((s) => s.theme);
  const toggleTheme = useCryptoStore((s) => s.toggleTheme);
  const setTheme = useCryptoStore((s) => s.setTheme);

  const currentTheme = forcedTheme || storeTheme;
  const [copiedFigmaSpec, setCopiedFigmaSpec] = useState(false);

  // Responsive device view simulation
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile' | 'small-mobile'>('desktop');

  useEffect(() => {
    if (forcedTheme) {
      document.documentElement.classList.toggle('dark', forcedTheme === 'dark');
      setTheme(forcedTheme);
    }
  }, [forcedTheme, setTheme]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFigmaSpec(true);
    setTimeout(() => setCopiedFigmaSpec(false), 2000);
  };

  const categories = [
    { id: 'base', title: '1. Base Login Screen', count: '5 States', desc: 'Card container, button states, focus rings & loading masks' },
    { id: 'email', title: '2. Email Authentication', count: '11 States', desc: 'Validation lifecycle, OTP 6-digit input & verification' },
    { id: 'google', title: '3. Google OAuth', count: '5 States', desc: 'Popup handshake, cancel handler & token exchange' },
    { id: 'apple', title: '4. Apple Sign-In', count: '5 States', desc: 'FaceID/TouchID prompt, Apple ID verification & redirects' },
    { id: 'web3', title: '5. Web3 Smart Wallet', count: '11 States', desc: 'Wallet selector, connection, network switch & SIWE signature' },
    { id: 'stepper', title: '6. Progress Stepper', count: '5 States', desc: 'Step 1 (Sign In) vs Step 2 (Wallet Ready) indicator states' },
    { id: 'wallet-creation', title: '7. Account / Wallet Provisioning', count: '4 States', desc: 'Privy embedded wallet key generation & success screen' },
    { id: 'global', title: '8. Global System States', count: '4 States', desc: 'Network offline, 500 server crash, expired session & backoff retry' },
    { id: 'responsive', title: '9. Responsive Breakpoints', count: '4 Viewports', desc: 'Desktop (1440px), Tablet (768px), Mobile (390px), Small Mobile (320px)' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className={`min-h-screen w-screen max-w-[100vw] bg-[var(--bg-app)] text-[var(--text-primary)] font-sans antialiased overflow-x-hidden selection:bg-[#485442]/30 selection:text-inherit transition-colors duration-200 ${
        forcedTheme === 'dark' ? 'dark' : ''
      }`}
    >
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-[var(--border-color)] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#111310] dark:bg-[#1C1C1C] border border-[#2B3028] dark:border-[#333] p-1.5 flex items-center justify-center shadow-2xs">
            <img src={crownLogo} alt="dopamint crown" className="w-full h-full object-contain filter drop-shadow-xs" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-[var(--text-primary)]">
                Login Screen Behavior & Figma Variants Spec
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold font-mono border ${
                  currentTheme === 'light'
                    ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                }`}
              >
                {forcedTheme ? `${forcedTheme.toUpperCase()} MODE SPEC` : `THEME: ${currentTheme.toUpperCase()}`}
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] hidden sm:block">
              Complete interaction matrix: Base, Email, Google, Apple, Web3, Stepper, Wallet Provisioning & Responsive
            </p>
          </div>
        </div>

        {/* Quick theme toggles and direct spec links */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="hidden md:flex items-center p-0.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
            <a
              href="/loginscreen-behavior-light"
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
              href="/loginscreen-behavior-dark"
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
            onClick={() =>
              copyToClipboard(
                JSON.stringify(
                  {
                    component: 'Dopamint_Auth_LoginCard',
                    version: '2.4.0',
                    properties: {
                      Theme: ['Light', 'Dark'],
                      State: ['Default', 'Hover', 'Focus', 'Disabled', 'Loading', 'Error', 'Success'],
                      AuthMethod: ['None', 'Email', 'Google', 'Apple', 'Web3'],
                      Step: ['Step 1: Sign in', 'Step 2: Wallet ready'],
                      ScreenSize: ['Desktop (1440px)', 'Tablet (768px)', 'Mobile (390px)', 'Small (320px)'],
                    },
                  },
                  null,
                  2
                )
              )
            }
            icon={copiedFigmaSpec ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copiedFigmaSpec ? 'Copied Spec' : 'Figma Component Set'}
          </Button>

          <a
            href="/login"
            className="px-3 py-1.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all flex items-center gap-1.5"
          >
            <span>Live Login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 flex gap-8">
        {/* Sticky Sidebar Navigation */}
        <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2 no-scrollbar">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-3 mb-2">
              All 9 Behavior Specs
            </p>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex flex-col gap-0.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] border border-transparent hover:border-[var(--border-color)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--text-primary)]">{cat.title}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[var(--bg-app)] border border-[var(--border-color)] font-mono">
                    {cat.count}
                  </span>
                </div>
                <span className="text-[11px] text-[var(--text-muted)] leading-tight">{cat.desc}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-2.5 shadow-2xs">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />
              <span className="text-xs font-bold text-[var(--text-primary)]">Figma Auto-Layout Spec</span>
            </div>
            <p className="text-[11.5px] text-[var(--text-muted)] leading-relaxed">
              • Frame: <code className="bg-[var(--bg-app)] px-1 rounded font-mono">w-430px</code> max-w, <code className="bg-[var(--bg-app)] px-1 rounded font-mono">p-32px</code><br />
              • Corner Radius: <code className="bg-[var(--bg-app)] px-1 rounded font-mono">28px</code> container, <code className="bg-[var(--bg-app)] px-1 rounded font-mono">16px</code> inputs<br />
              • Button Height: <code className="bg-[var(--bg-app)] px-1 rounded font-mono">44px (h-11)</code><br />
              • Spacing: <code className="bg-[var(--bg-app)] px-1 rounded font-mono">gap-10px</code> social, <code className="bg-[var(--bg-app)] px-1 rounded font-mono">gap-20px</code> sections
            </p>
          </div>
        </aside>

        {/* Content Stream */}
        <main className="flex-1 min-w-0 space-y-16">
          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 1: BASE LOGIN (CARD & CORE BUTTON STATES)
           * ═══════════════════════════════════════════════════════════ */}
          <section id="base" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  1. Base Login Screen (Container & Core States)
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Figma Component Set: <code className="font-mono text-[11px] bg-[var(--bg-app)] px-1.5 py-0.5 rounded">Component=LoginCard / State=[Default, Hover, Focus, Disabled, Loading]</code>
                </p>
              </div>
              <Badge variant="primary" size="sm">5 REQUIRED STATES</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* 1.1 DEFAULT */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-[var(--text-primary)]">1.1 Default State</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-muted)]">
                    State=Default
                  </span>
                </div>
                <div className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-card flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#111310] dark:bg-[#1C1C1C] border border-[#2B3028] dark:border-[#333] flex items-center justify-center shadow-soft">
                    <img src={crownLogo} alt="crown" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">Welcome to Dopamint</h3>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-1">Sign in to get a smart wallet instantly.</p>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="w-full h-10 px-3 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold flex items-center justify-center gap-2">
                      <GoogleIcon />
                      <span>Continue with Google</span>
                    </div>
                    <div className="w-full h-10 px-3 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold flex items-center justify-center gap-2">
                      <AppleIcon />
                      <span>Continue with Apple</span>
                    </div>
                    <div className="w-full h-10 px-3 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold flex items-center justify-center gap-2">
                      <Wallet className="w-3.5 h-3.5 text-[#485442] dark:text-[#8A9E7F]" />
                      <span>Connect Web3 Wallet</span>
                    </div>
                  </div>
                  <div className="w-full text-left text-[10px] text-[var(--text-muted)] p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Non-custodial smart wallet powered by Privy</span>
                  </div>
                </div>
              </div>

              {/* 1.2 HOVER */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-[var(--text-primary)]">1.2 Hover State</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    State=Hover
                  </span>
                </div>
                <div className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-[#485442]/40 dark:border-[#55604e]/50 shadow-card flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#111310] dark:bg-[#1C1C1C] border border-[#2B3028] dark:border-[#333] flex items-center justify-center shadow-soft transform scale-105 transition-transform">
                    <img src={crownLogo} alt="crown" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">Welcome to Dopamint</h3>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-1">Sign in to get a smart wallet instantly.</p>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="w-full h-10 px-3 rounded-2xl bg-[var(--bg-hover)] border border-[#485442]/60 text-xs font-bold flex items-center justify-center gap-2 shadow-2xs">
                      <GoogleIcon />
                      <span>Continue with Google</span>
                      <span className="text-[9px] font-mono bg-[#485442]/15 text-[#485442] dark:text-[#8A9E7F] px-1.5 py-0.2 rounded font-bold">HOVER</span>
                    </div>
                    <div className="w-full h-10 px-3 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold flex items-center justify-center gap-2">
                      <AppleIcon />
                      <span>Continue with Apple</span>
                    </div>
                    <div className="w-full h-10 px-3 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold flex items-center justify-center gap-2">
                      <Wallet className="w-3.5 h-3.5 text-[#485442] dark:text-[#8A9E7F]" />
                      <span>Connect Web3 Wallet</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                    Hover trigger: <code className="font-mono text-[9.5px]">background: var(--bg-hover)</code> with <code className="font-mono text-[9.5px]">border: #485442</code>
                  </p>
                </div>
              </div>

              {/* 1.3 FOCUS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-[var(--text-primary)]">1.3 Focus State (Keyboard / Tab)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    State=Focus
                  </span>
                </div>
                <div className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-card flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#111310] dark:bg-[#1C1C1C] border border-[#2B3028] dark:border-[#333] flex items-center justify-center shadow-soft">
                    <img src={crownLogo} alt="crown" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">Welcome to Dopamint</h3>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-1">Sign in to get a smart wallet instantly.</p>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="w-full h-10 px-3 rounded-2xl bg-[var(--bg-app)] border-2 border-[#485442] ring-4 ring-[#485442]/20 text-xs font-bold flex items-center justify-center gap-2">
                      <GoogleIcon />
                      <span>Continue with Google</span>
                    </div>
                    <div className="w-full h-10 px-3 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold flex items-center justify-center gap-2">
                      <AppleIcon />
                      <span>Continue with Apple</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                    Focus indicator: <code className="font-mono text-[9.5px]">ring-4 ring-[#485442]/20</code> meets WCAG 2.1 AA focus contrast.
                  </p>
                </div>
              </div>

              {/* 1.4 DISABLED */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-[var(--text-primary)]">1.4 Disabled State</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-500/20">
                    State=Disabled
                  </span>
                </div>
                <div className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-card flex flex-col items-center text-center space-y-4 opacity-50 cursor-not-allowed">
                  <div className="w-12 h-12 rounded-2xl bg-[#111310] dark:bg-[#1C1C1C] border border-[#2B3028] dark:border-[#333] flex items-center justify-center">
                    <img src={crownLogo} alt="crown" className="w-6 h-6 object-contain grayscale" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">Welcome to Dopamint</h3>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-1">Actions locked during network recovery.</p>
                  </div>
                  <div className="w-full space-y-2 pointer-events-none">
                    <div className="w-full h-10 px-3 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold flex items-center justify-center gap-2">
                      <GoogleIcon />
                      <span>Continue with Google</span>
                    </div>
                    <div className="w-full h-10 px-3 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-semibold flex items-center justify-center gap-2">
                      <AppleIcon />
                      <span>Continue with Apple</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium">
                    CSS property: <code className="font-mono text-[9.5px]">opacity: 0.5; pointer-events: none;</code>
                  </p>
                </div>
              </div>

              {/* 1.5 LOADING */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-[var(--text-primary)]">1.5 Loading State (Auth in Flight)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    State=Loading
                  </span>
                </div>
                <div className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-card flex flex-col items-center text-center space-y-4 relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-[#111310] dark:bg-[#1C1C1C] border border-[#2B3028] dark:border-[#333] flex items-center justify-center shadow-soft">
                    <Loader2 className="w-6 h-6 text-[#8A9E7F] animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">Authenticating...</h3>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-1">Exchanging cryptographic credentials.</p>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="w-full h-10 px-3 rounded-2xl bg-[#485442] dark:bg-[#55604e] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-button-primary">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Contacting Provider...</span>
                    </div>
                  </div>
                  <div className="w-full bg-[var(--bg-app)] p-2 rounded-xl border border-[var(--border-color)] flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Average response time: 650ms</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 2: EMAIL LOGIN (11 REQUIRED STATES)
           * ═══════════════════════════════════════════════════════════ */}
          <section id="email" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  2. Email Login Lifecycle & Magic OTP (11 States)
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Covers full validation, empty submission prevention, continue loading, OTP code entry, resend timers & error recovery.
                </p>
              </div>
              <Badge variant="primary" size="sm">11 REQUIRED STATES</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* 2.1 Empty */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)]">2.1 Empty Input</span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">Email=Empty</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    disabled
                    placeholder="you@email.com"
                    className="flex-1 h-10 px-3.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs text-[var(--text-muted)]"
                  />
                  <button className="h-10 px-4 rounded-xl bg-[#485442] dark:bg-[#55604e] text-white text-xs font-semibold opacity-40 cursor-not-allowed">
                    Continue
                  </button>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">Submit CTA disabled until characters are typed.</p>
              </div>

              {/* 2.2 Focused */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)]">2.2 Focused Input</span>
                  <span className="text-[10px] font-mono text-blue-500">Email=Focused</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-10 px-3.5 rounded-xl bg-[var(--bg-app)] border-2 border-[#485442] ring-2 ring-[#485442]/20 text-xs flex items-center text-[var(--text-primary)]">
                    <span className="animate-pulse">|</span>
                  </div>
                  <button className="h-10 px-4 rounded-xl bg-[#485442] dark:bg-[#55604e] text-white text-xs font-semibold opacity-50">
                    Continue
                  </button>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)]">Active outline with green focus glow.</p>
              </div>

              {/* 2.3 Typing */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)]">2.3 Typing State</span>
                  <span className="text-[10px] font-mono text-amber-500">Email=Typing</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-10 px-3.5 rounded-xl bg-[var(--bg-app)] border border-[#485442] text-xs flex items-center justify-between text-[var(--text-primary)] font-medium">
                    <span>alex.trader@gmai</span>
                    <X className="w-3.5 h-3.5 text-[var(--text-muted)] cursor-pointer" />
                  </div>
                  <button className="h-10 px-4 rounded-xl bg-[#485442] dark:bg-[#55604e] text-white text-xs font-semibold opacity-60">
                    Continue
                  </button>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">Clear button active while typing.</p>
              </div>

              {/* 2.4 Valid */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)]">2.4 Valid Email</span>
                  <span className="text-[10px] font-mono text-emerald-500">Email=Valid</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-10 px-3.5 rounded-xl bg-[var(--bg-app)] border border-emerald-500 text-xs flex items-center justify-between text-[var(--text-primary)] font-medium">
                    <span>alex@dopamint.ai</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <button className="h-10 px-4 rounded-xl bg-[#485442] dark:bg-[#55604e] text-white text-xs font-bold shadow-button-primary cursor-pointer hover:opacity-95">
                    Continue
                  </button>
                </div>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Valid RFC-5322 regex match. CTA unlocked.</p>
              </div>

              {/* 2.5 Invalid Email */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-rose-500/40 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)]">2.5 Invalid Email</span>
                  <span className="text-[10px] font-mono text-rose-500">Email=Invalid</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-10 px-3.5 rounded-xl bg-rose-500/5 border border-rose-500 text-xs flex items-center justify-between text-[var(--text-primary)]">
                    <span>alex@invalid..com</span>
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <button className="h-10 px-4 rounded-xl bg-[#485442] opacity-40 text-white text-xs font-semibold">
                    Continue
                  </button>
                </div>
                <p className="text-[11px] text-rose-500 font-medium">Please enter a valid email address.</p>
              </div>

              {/* 2.6 Empty Submission */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-amber-500/40 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)]">2.6 Empty Submission</span>
                  <span className="text-[10px] font-mono text-amber-500">Email=EmptySubmit</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-10 px-3.5 rounded-xl bg-amber-500/5 border border-amber-500 text-xs flex items-center text-[var(--text-muted)]">
                    <span>Email cannot be blank</span>
                  </div>
                  <button className="h-10 px-4 rounded-xl bg-amber-600 text-white text-xs font-bold">
                    Required
                  </button>
                </div>
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">Form validation stops submission on empty.</p>
              </div>

              {/* 2.7 Continue Loading */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)]">2.7 Continue Loading</span>
                  <span className="text-[10px] font-mono text-emerald-500">Email=Loading</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    disabled
                    value="alex@dopamint.ai"
                    className="flex-1 h-10 px-3.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs text-[var(--text-muted)]"
                  />
                  <button className="h-10 px-4 rounded-xl bg-[#485442] text-white text-xs font-bold flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending</span>
                  </button>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">Dispatching OTP via Privy serverless cluster.</p>
              </div>

              {/* 2.8 Email Sent / Verification State (OTP Inputs) */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)]">2.8 Email Sent / OTP</span>
                  <span className="text-[10px] font-mono text-purple-500">Email=OtpState</span>
                </div>
                <div className="flex items-center justify-between gap-1.5">
                  {['4', '8', '2', '', '', ''].map((digit, idx) => (
                    <div
                      key={idx}
                      className={`w-9 h-10 rounded-xl bg-[var(--bg-app)] border text-center font-mono font-bold text-sm flex items-center justify-center ${
                        idx === 3
                          ? 'border-[#485442] ring-2 ring-[#485442]/30'
                          : digit
                          ? 'border-[var(--border-color)] text-[var(--text-primary)]'
                          : 'border-[var(--border-color)] text-[var(--text-muted)]'
                      }`}
                    >
                      {digit || '·'}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[var(--text-secondary)]">Enter the 6-digit code sent to your inbox.</p>
              </div>

              {/* 2.9 Resend State */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)]">2.9 Resend Timer</span>
                  <span className="text-[10px] font-mono text-amber-500">Email=Resend</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs">
                  <span className="text-[var(--text-muted)]">Didn't get code?</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">Resend in 38s</span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">Rate-limited to prevent inbox spam attacks.</p>
              </div>

              {/* 2.10 Verification Success */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">2.10 Verification Success</span>
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-xs text-emerald-800 dark:text-emerald-200 font-semibold">Code accepted! Initializing smart account...</p>
                <div className="w-full bg-emerald-500/20 h-1.5 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-emerald-500 animate-pulse" />
                </div>
              </div>

              {/* 2.11 Verification Failure */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300">2.11 Verification Failure</span>
                  <XCircle className="w-4 h-4 text-rose-500" />
                </div>
                <p className="text-xs text-rose-800 dark:text-rose-200 font-medium">Invalid or expired 6-digit code. Please try again.</p>
                <Button size="xs" variant="outline" className="w-full text-rose-600 border-rose-400">
                  Request New Code
                </Button>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 3: GOOGLE AUTHENTICATION (5 STATES)
           * ═══════════════════════════════════════════════════════════ */}
          <section id="google" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  3. Google Authentication States (5 States)
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  OAuth 2.0 popup lifecycle: Default, Loading handshake, Auth error, Cancelled by user & Redirect.
                </p>
              </div>
              <Badge variant="primary" size="sm">5 REQUIRED STATES</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Default */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <span className="text-xs font-bold text-[var(--text-primary)] block">3.1 Default</span>
                <button className="w-full h-11 px-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-bold flex items-center justify-center gap-2.5">
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </button>
                <p className="text-[11px] text-[var(--text-muted)]">Standard OAuth initiation button.</p>
              </div>

              {/* Loading */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <span className="text-xs font-bold text-[var(--text-primary)] block">3.2 Loading</span>
                <button className="w-full h-11 px-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-bold flex items-center justify-center gap-2.5 opacity-80">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  <span>Waiting for Google popup...</span>
                </button>
                <p className="text-[11px] text-[var(--text-muted)]">OAuth dialog opened in external viewport.</p>
              </div>

              {/* Auth Error */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-300 block">3.3 Authentication Error</span>
                <div className="flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Google token signature validation failed (error 400).</span>
                </div>
                <Button size="xs" variant="outline" className="w-full">
                  Retry Google Sign-in
                </Button>
              </div>

              {/* Cancelled */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 block">3.4 Cancelled by User</span>
                <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span>Google window closed before granting permissions.</span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">Non-blocking toast alert.</p>
              </div>

              {/* Success / Redirect */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block">3.5 Success / Redirect</span>
                <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Linked: alex.trader@gmail.com</span>
                </div>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Redirecting to Step 2 (Wallet Ready)...</p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 4: APPLE AUTHENTICATION (5 STATES)
           * ═══════════════════════════════════════════════════════════ */}
          <section id="apple" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  4. Apple Authentication States (5 States)
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Sign in with Apple (FaceID, TouchID, Apple ID token generation & error handling).
                </p>
              </div>
              <Badge variant="primary" size="sm">5 REQUIRED STATES</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Default */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <span className="text-xs font-bold text-[var(--text-primary)] block">4.1 Default</span>
                <button className="w-full h-11 px-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-bold flex items-center justify-center gap-2.5">
                  <AppleIcon />
                  <span>Continue with Apple</span>
                </button>
                <p className="text-[11px] text-[var(--text-muted)]">Official Apple HIG compliant layout.</p>
              </div>

              {/* Loading */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <span className="text-xs font-bold text-[var(--text-primary)] block">4.2 Loading</span>
                <button className="w-full h-11 px-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-bold flex items-center justify-center gap-2.5 opacity-80">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Prompting FaceID / Apple ID...</span>
                </button>
                <p className="text-[11px] text-[var(--text-muted)]">Native biometric dialog invoked.</p>
              </div>

              {/* Auth Error */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-300 block">4.3 Authentication Error</span>
                <div className="flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Apple ID token handshake timed out.</span>
                </div>
                <Button size="xs" variant="outline" className="w-full">
                  Retry with Apple
                </Button>
              </div>

              {/* Cancelled */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 block">4.4 Cancelled</span>
                <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span>Apple biometric verification dismissed.</span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">Restores default sign-in screen without crash.</p>
              </div>

              {/* Success / Redirect */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block">4.5 Success / Redirect</span>
                <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Linked: alex@privaterelay.appleid.com</span>
                </div>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Private relay email registered.</p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 5: WEB3 WALLET (11 STATES)
           * ═══════════════════════════════════════════════════════════ */}
          <section id="web3" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  5. Web3 Smart Wallet Lifecycle (11 States)
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Full EIP-1193 lifecycle: Selection, Connecting, Connected, Wrong Network, Switch Prompt, SIWE Signature & Error states.
                </p>
              </div>
              <Badge variant="primary" size="sm">11 REQUIRED STATES</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* 5.1 Default */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <span className="text-xs font-bold text-[var(--text-primary)] block">5.1 Default Button</span>
                <button className="w-full h-11 px-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-xs font-bold flex items-center justify-center gap-2.5">
                  <Wallet className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />
                  <span>Connect Web3 Wallet</span>
                </button>
                <p className="text-[11px] text-[var(--text-muted)]">Direct connect trigger.</p>
              </div>

              {/* 5.2 Connecting */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <span className="text-xs font-bold text-[var(--text-primary)] block">5.2 Connecting</span>
                <button className="w-full h-11 px-4 rounded-2xl bg-[var(--bg-app)] border border-[#485442] text-xs font-bold flex items-center justify-center gap-2.5">
                  <Loader2 className="w-4 h-4 animate-spin text-[#8A9E7F]" />
                  <span>Establishing RPC handshake...</span>
                </button>
                <p className="text-[11px] text-[var(--text-muted)]">Window ethereum provider query active.</p>
              </div>

              {/* 5.3 Wallet Selection Modal */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-flyout space-y-2">
                <span className="text-xs font-bold text-[var(--text-primary)] block">5.3 Wallet Selection Sheet</span>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-between text-xs font-semibold">
                    <span>MetaMask</span>
                    <span className="text-[10px] text-emerald-500 font-mono">Detected</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-between text-xs font-semibold">
                    <span>Coinbase Smart Wallet</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">Passkey</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-between text-xs font-semibold">
                    <span>Rainbow / WalletConnect</span>
                    <span className="text-[10px] text-purple-500 font-mono">QR Code</span>
                  </div>
                </div>
              </div>

              {/* 5.4 Connected */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">5.4 Connected</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <div className="font-mono text-xs font-bold text-[var(--text-primary)]">
                  0x4F2a...3c76 (Base Sepolia)
                </div>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Active account unlocked.</p>
              </div>

              {/* 5.5 Connection Rejected */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-300 block">5.5 Connection Rejected</span>
                <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">User rejected connection request in wallet (Code: 4001).</p>
                <Button size="xs" variant="outline" className="w-full">
                  Try Again
                </Button>
              </div>

              {/* 5.6 Wallet Not Detected */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 block">5.6 Wallet Not Detected</span>
                <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">No injected Web3 provider (window.ethereum) found.</p>
                <a href="https://metamask.io" target="_blank" rel="noreferrer" className="text-[11px] text-amber-600 dark:text-amber-400 underline font-bold flex items-center gap-1">
                  <span>Install MetaMask extension</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* 5.7 Wrong Network */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-300">5.7 Wrong Network</span>
                  </div>
                  <span className="text-[10px] font-mono bg-amber-500/20 px-1.5 rounded text-amber-800 dark:text-amber-200">Chain ID: 1</span>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-300">You are connected to Ethereum Mainnet. Dopamint operates on Base Sepolia.</p>
                <Button size="xs" variant="primary" className="w-full">
                  Switch to Base Sepolia (84532)
                </Button>
              </div>

              {/* 5.8 Network Switching */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-2">
                <span className="text-xs font-bold text-[var(--text-primary)] block">5.8 Network Switching</span>
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#8A9E7F]" />
                  <span>wallet_switchEthereumChain in progress...</span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">Please approve prompt in your wallet extension.</p>
              </div>

              {/* 5.9 Signature Request (SIWE) */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[#485442]/40 shadow-card space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)]">5.9 SIWE Signature Request</span>
                  <Key className="w-3.5 h-3.5 text-[#485442] dark:text-[#8A9E7F]" />
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] font-mono text-[10px] text-[var(--text-muted)] leading-tight">
                  dopamint.ai wants you to sign in with your Ethereum account: 0x4F2a...3c76<br />
                  Nonce: 84920194<br />
                  Issued At: 2026-09-03
                </div>
                <div className="flex gap-2">
                  <Button size="xs" variant="ghost" className="flex-1">Reject</Button>
                  <Button size="xs" variant="primary" className="flex-1">Sign Message</Button>
                </div>
              </div>

              {/* 5.10 Signature Rejected */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-300 block">5.10 Signature Rejected</span>
                <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">Signature denied. You must verify key ownership to access Dopamint.</p>
                <Button size="xs" variant="outline" className="w-full">
                  Re-request Signature
                </Button>
              </div>

              {/* 5.11 Connection Error */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-300 block">5.11 RPC Connection Error</span>
                <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">WebSocket connection to Base RPC dropped (Timeout 504).</p>
                <Button size="xs" variant="outline" className="w-full">
                  Retry RPC Handshake
                </Button>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 6: STEPPER (5 STATES)
           * ═══════════════════════════════════════════════════════════ */}
          <section id="stepper" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  6. Progress Stepper Component (5 States)
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  2-step pill indicators transitioning between Authentication (Step 1) and Embedded Wallet Ready (Step 2).
                </p>
              </div>
              <Badge variant="primary" size="sm">5 REQUIRED STATES</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Step 1 active */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <span className="text-xs font-bold text-[var(--text-primary)] block">6.1 Step 1 Active</span>
                <div className="flex items-center justify-center gap-2">
                  <div className="px-3.5 py-1 rounded-full text-xs bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8A9E7F] font-bold border border-[#485442]/20 shadow-2xs">
                    1 · Sign in
                  </div>
                  <div className="px-3.5 py-1 rounded-full text-xs bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-muted)] font-medium">
                    2 · Wallet ready
                  </div>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">Active state during credential entry.</p>
              </div>

              {/* Step 1 completed */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <span className="text-xs font-bold text-[var(--text-primary)] block">6.2 Step 1 Completed</span>
                <div className="flex items-center justify-center gap-2">
                  <div className="px-3.5 py-1 rounded-full text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>1 · Signed in</span>
                  </div>
                  <div className="px-3.5 py-1 rounded-full text-xs bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-muted)] font-medium">
                    2 · Wallet ready
                  </div>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">Checkmark feedback before step transition.</p>
              </div>

              {/* Step 2 active */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <span className="text-xs font-bold text-[var(--text-primary)] block">6.3 Step 2 Active</span>
                <div className="flex items-center justify-center gap-2">
                  <div className="px-3.5 py-1 rounded-full text-xs bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] font-medium">
                    1 · Signed in ✓
                  </div>
                  <div className="px-3.5 py-1 rounded-full text-xs bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8A9E7F] font-bold border border-[#485442]/20 shadow-2xs">
                    2 · Wallet ready
                  </div>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">Active state when generated smart wallet is displayed.</p>
              </div>

              {/* Step 2 completed */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <span className="text-xs font-bold text-[var(--text-primary)] block">6.4 Step 2 Completed</span>
                <div className="flex items-center justify-center gap-2">
                  <div className="px-3.5 py-1 rounded-full text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
                    1 · Signed in ✓
                  </div>
                  <div className="px-3.5 py-1 rounded-full text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
                    2 · Wallet ready ✓
                  </div>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">Both steps fulfilled, proceeding to Dashboard.</p>
              </div>

              {/* Error state */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-300 block">6.5 Stepper Error State</span>
                <div className="flex items-center justify-center gap-2">
                  <div className="px-3.5 py-1 rounded-full text-xs bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold border border-rose-500/40 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    <span>1 · Auth Error</span>
                  </div>
                  <div className="px-3.5 py-1 rounded-full text-xs bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-muted)] font-medium">
                    2 · Wallet ready
                  </div>
                </div>
                <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">Stepper reflects failure with corrective action.</p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 7: ACCOUNT/WALLET CREATION (4 STATES)
           * ═══════════════════════════════════════════════════════════ */}
          <section id="wallet-creation" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  7. Account & Wallet Creation (4 States)
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Privy embedded MPC wallet provisioning lifecycle: Creating, Created Successfully, Failed & Ready screen.
                </p>
              </div>
              <Badge variant="primary" size="sm">4 REQUIRED STATES</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 7.1 Creating Wallet */}
              <div className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-card space-y-4 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#485442]/15 text-[#485442] dark:text-[#8A9E7F] flex items-center justify-center">
                  <Loader2 className="w-7 h-7 animate-spin" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">Creating your smart wallet...</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">Generating non-custodial MPC key shares on Base Sepolia.</p>
                </div>
                <div className="w-full bg-[var(--bg-app)] p-3 rounded-2xl border border-[var(--border-color)] space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[var(--text-muted)]">Entropy Generation:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">85% Completed</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                    <div className="w-[85%] h-full bg-[#485442] dark:bg-[#8A9E7F] rounded-full" />
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">State=CreatingWallet</span>
              </div>

              {/* 7.2 Wallet Created Successfully */}
              <div className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-emerald-500/40 shadow-card space-y-4 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center ring-4 ring-emerald-500/20">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">Wallet created successfully!</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">Your cryptographic address has been broadcasted.</p>
                </div>
                <div className="w-full p-3 rounded-2xl bg-[var(--bg-app)] border border-dashed border-emerald-500/40 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  0x4F2a91C8392F865eE824A1054E5F36423c9E3c76
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">State=WalletCreated</span>
              </div>

              {/* 7.3 Wallet Creation Failed */}
              <div className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-rose-500/40 shadow-card space-y-4 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center ring-4 ring-rose-500/20">
                  <X className="w-7 h-7 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">Wallet provisioning failed</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">Base Sepolia RPC endpoint timed out. Your login session is preserved.</p>
                </div>
                <Button variant="primary" size="sm" className="w-full">
                  Retry Wallet Generation
                </Button>
                <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400">State=WalletCreationFailed</span>
              </div>

              {/* 7.4 Wallet Ready / Success Screen (Step 2 Full View) */}
              <div className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-card space-y-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center ring-4 ring-emerald-500/15">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">Your wallet is ready</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Created for <span className="font-bold text-[var(--text-primary)]">alex@dopamint.ai</span>. Fund anytime to trade.
                  </p>
                </div>
                <div className="w-full p-3 bg-[var(--bg-app)] rounded-2xl border border-dashed border-[var(--border-color)] flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[var(--text-primary)]">0x4F2a...3c76</span>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-[var(--text-muted)] cursor-pointer" />
                    <span className="text-xs font-semibold text-[#485442] dark:text-[#8A9E7F] cursor-pointer">Copy</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--bg-app)] border border-[var(--border-color)]">Base Sepolia</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--bg-app)] border border-[var(--border-color)]">Testnet</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--bg-app)] border border-[var(--border-color)]">Powered by Privy</span>
                </div>
                <Button variant="primary" size="md" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
                  Go to dashboard
                </Button>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">State=WalletReadyScreen</span>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 8: GLOBAL STATES (4 STATES)
           * ═══════════════════════════════════════════════════════════ */}
          <section id="global" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  8. Global System & Network States (4 States)
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  System-level resilience handling: Network offline banner, 500 server crash, session expiration & exponential backoff retry.
                </p>
              </div>
              <Badge variant="primary" size="sm">4 REQUIRED STATES</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 8.1 Network Error */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <WifiOff className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-200">8.1 Network Error</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-600">OFFLINE</span>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Internet connection lost. Local cache enabled; sign-in requests queued until connection restores.
                </p>
                <div className="text-[11px] font-mono text-amber-800 dark:text-amber-200">
                  window.addEventListener('offline', handleOffline)
                </div>
              </div>

              {/* 8.2 Server Error */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ServerCrash className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span className="text-xs font-bold text-rose-800 dark:text-rose-200">8.2 Server Error (500)</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-rose-600">500 / 503</span>
                </div>
                <p className="text-xs text-rose-700 dark:text-rose-300">
                  Dopamint Auth Gateway is temporarily degraded. Core team alerted. Status page: status.dopamint.ai
                </p>
                <Button size="xs" variant="outline" className="w-full text-rose-600 border-rose-400">
                  Check Gateway Status
                </Button>
              </div>

              {/* 8.3 Session Expired */}
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold text-blue-800 dark:text-blue-200">8.3 Session Expired</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-600">TOKEN_EXPIRED</span>
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Your cryptographic session has expired after 7 days of inactivity. Please re-authenticate to renew JWT.
                </p>
                <Button size="xs" variant="primary" className="w-full">
                  Re-Authenticate Now
                </Button>
              </div>

              {/* 8.4 Retry State */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-[#8A9E7F] animate-spin" />
                    <span className="text-xs font-bold text-[var(--text-primary)]">8.4 Exponential Backoff Retry</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-600">RETRY 2/5</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  Rate limit encountered. Automatically attempting reconnection with jitter (attempt 2 of 5 in 8s).
                </p>
                <div className="w-full bg-[var(--bg-app)] h-2 rounded-full overflow-hidden">
                  <div className="w-[40%] h-full bg-[#485442] dark:bg-[#8A9E7F]" />
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
           *  SECTION 9: RESPONSIVE BREAKPOINTS (4 VIEWPORTS)
           * ═══════════════════════════════════════════════════════════ */}
          <section id="responsive" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  9. Responsive Viewports & Breakpoint Testing
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Interactive viewport switch to inspect mobile, tablet, desktop, and small mobile constraints.
                </p>
              </div>
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewportMode === 'desktop' ? 'bg-[var(--bg-card)] font-bold text-[var(--text-primary)] shadow-2xs' : 'text-[var(--text-muted)]'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop (1440px)</span>
                </button>
                <button
                  onClick={() => setViewportMode('tablet')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewportMode === 'tablet' ? 'bg-[var(--bg-card)] font-bold text-[var(--text-primary)] shadow-2xs' : 'text-[var(--text-muted)]'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span>Tablet (768px)</span>
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewportMode === 'mobile' ? 'bg-[var(--bg-card)] font-bold text-[var(--text-primary)] shadow-2xs' : 'text-[var(--text-muted)]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile (390px)</span>
                </button>
                <button
                  onClick={() => setViewportMode('small-mobile')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewportMode === 'small-mobile' ? 'bg-[var(--bg-card)] font-bold text-[var(--text-primary)] shadow-2xs' : 'text-[var(--text-muted)]'
                  }`}
                >
                  <Smartphone className="w-3 h-3 text-amber-500" />
                  <span>Small (320px)</span>
                </button>
              </div>
            </div>

            {/* Interactive Frame Simulator */}
            <div className="p-8 rounded-[32px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs flex flex-col items-center justify-center overflow-x-auto min-h-[500px]">
              <div
                className={`transition-all duration-300 border border-[var(--border-color)] bg-[var(--bg-app)] rounded-[28px] p-6 sm:p-8 shadow-card ${
                  viewportMode === 'desktop'
                    ? 'w-full max-w-[430px]'
                    : viewportMode === 'tablet'
                    ? 'w-[768px] max-w-full'
                    : viewportMode === 'mobile'
                    ? 'w-[390px]'
                    : 'w-[320px] p-4!'
                }`}
              >
                {/* Stepper Pill */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="px-3.5 py-1 rounded-full text-xs bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8A9E7F] font-bold border border-[#485442]/20 shadow-2xs">
                    1 · Sign in
                  </div>
                  <div className="px-3.5 py-1 rounded-full text-xs bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-muted)] font-medium">
                    2 · Wallet ready
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-5">
                  <div className="w-13 h-13 rounded-2xl bg-[#111310] dark:bg-[#1C1C1C] border border-[#2B3028] dark:border-[#333] flex items-center justify-center shadow-soft">
                    <img src={crownLogo} alt="crown" className="w-7 h-7 object-contain filter drop-shadow-xs" />
                  </div>

                  <div className="space-y-2">
                    <h2 className={`${viewportMode === 'small-mobile' ? 'text-xl' : 'text-2xl'} font-bold text-[var(--text-primary)] tracking-tight`}>
                      Welcome to Dopamint
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-[340px]">
                      Your AI co-pilot for on-chain research and trading. Sign in to get a wallet instantly — no seed phrase required.
                    </p>
                  </div>

                  <div className="w-full space-y-2.5 pt-1">
                    <button className="w-full h-11 px-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-semibold flex items-center justify-center gap-3">
                      <GoogleIcon />
                      <span>Continue with Google</span>
                    </button>
                    <button className="w-full h-11 px-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-semibold flex items-center justify-center gap-3">
                      <AppleIcon />
                      <span>Continue with Apple</span>
                    </button>
                    <button className="w-full h-11 px-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-semibold flex items-center justify-center gap-3">
                      <Wallet className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />
                      <span>Connect Web3 Wallet</span>
                    </button>
                  </div>

                  <div className="w-full flex items-center gap-3">
                    <div className="flex-1 h-[1px] bg-[var(--border-color)]" />
                    <span className="text-xs text-[var(--text-muted)] font-medium">or</span>
                    <div className="flex-1 h-[1px] bg-[var(--border-color)]" />
                  </div>

                  <div className="w-full flex items-center gap-2">
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="flex-1 h-11 px-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]"
                    />
                    <button className="h-11 px-5 bg-[#485442] dark:bg-[#55604e] text-white font-semibold text-sm rounded-2xl shadow-button-primary">
                      Continue
                    </button>
                  </div>

                  <div className="w-full p-3 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)] flex items-center gap-2.5 text-left">
                    <Lock className="w-4 h-4 text-[#7A7D75] dark:text-[#888] flex-shrink-0" />
                    <p className="text-[11.5px] text-[var(--text-secondary)] leading-snug">
                      <span className="font-semibold text-[var(--text-primary)]">Non-custodial smart wallet</span>, powered by Privy — you control your keys
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Responsive Spec Table */}
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-3">
              <span className="text-xs font-bold text-[var(--text-primary)] block">Responsive Autolayout Dimensions & Breakpoints</span>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)] font-mono">
                      <th className="pb-2">Device / Viewport</th>
                      <th className="pb-2">Card Max-Width</th>
                      <th className="pb-2">Padding</th>
                      <th className="pb-2">Tap Target</th>
                      <th className="pb-2">Font Size (Title)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)] font-mono text-[11px]">
                    <tr>
                      <td className="py-2.5 font-bold text-[var(--text-primary)]">Desktop (≥1200px)</td>
                      <td className="py-2.5">430px centered</td>
                      <td className="py-2.5">32px (p-8)</td>
                      <td className="py-2.5">44px (h-11)</td>
                      <td className="py-2.5">24px (text-2xl)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-[var(--text-primary)]">Tablet (768px–1024px)</td>
                      <td className="py-2.5">430px centered</td>
                      <td className="py-2.5">32px (p-8)</td>
                      <td className="py-2.5">44px (h-11)</td>
                      <td className="py-2.5">24px (text-2xl)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-[var(--text-primary)]">Mobile (375px–480px)</td>
                      <td className="py-2.5">100% (max-w-[430px])</td>
                      <td className="py-2.5">24px (p-6)</td>
                      <td className="py-2.5">44px (h-11)</td>
                      <td className="py-2.5">22px (text-xl sm:text-2xl)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-[var(--text-primary)]">Small Mobile (320px)</td>
                      <td className="py-2.5">100% (300px net)</td>
                      <td className="py-2.5">16px (p-4)</td>
                      <td className="py-2.5">42px (h-10.5)</td>
                      <td className="py-2.5">20px (text-lg)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
