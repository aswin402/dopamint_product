import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  Copy,
  Check,
  Users,
  Share2,
  TrendingUp,
  Search,
  CheckCircle2,
  Crown,
  ChevronDown,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { triggerConfetti } from '../../lib/confetti';

interface ReferralRecord {
  id: number;
  wallet: string;
  fullAddress: string;
  joined: string;
  status: string;
  tier: string;
  xpEarned: number;
}

const REFERRALS_DATA: ReferralRecord[] = [
  {
    id: 1,
    wallet: '0xc390...9b21',
    fullAddress: '0xc3902f8194a821e9B02154E5F36423c9E9b21',
    joined: '2 hours ago',
    status: 'Active · Trading',
    tier: 'Level 4',
    xpEarned: 36250,
  },
  {
    id: 2,
    wallet: '0x34f1...12ab',
    fullAddress: '0x34f191C8392F865eE824A1054E5F3642312ab',
    joined: 'Yesterday',
    status: 'Active · AI Ops',
    tier: 'Level 3',
    xpEarned: 62500,
  },
  {
    id: 3,
    wallet: '0x77c2...891e',
    fullAddress: '0x77c238291054E5F36423c9E3c76A1054891e',
    joined: '1 day ago',
    status: 'Active · Trading',
    tier: 'Level 3',
    xpEarned: 20000,
  },
  {
    id: 4,
    wallet: '0x12a9...a80c',
    fullAddress: '0x12a93b8291054E5F36423c9E3c76A1054a80c',
    joined: '3 days ago',
    status: 'Active · Research',
    tier: 'Level 3',
    xpEarned: 81250,
  },
  {
    id: 5,
    wallet: '0x56d3...338a',
    fullAddress: '0x56d31054E5F36423c9E3c76A105444Fe338a',
    joined: '1 week ago',
    status: 'Active',
    tier: 'Level 2',
    xpEarned: 12500,
  },
  {
    id: 6,
    wallet: '0x88e1...4419',
    fullAddress: '0x88e191C8392F865eE824A1054E5F364234419',
    joined: '2 weeks ago',
    status: 'Active',
    tier: 'Level 2',
    xpEarned: 45000,
  },
  {
    id: 7,
    wallet: '0x29ac...01b5',
    fullAddress: '0x29ac4231865eE824A1054E5F36423c9E01b5',
    joined: '3 weeks ago',
    status: 'Active · Trading',
    tier: 'Level 2',
    xpEarned: 32000,
  },
  {
    id: 8,
    wallet: '0x6e84...77fa',
    fullAddress: '0x6e8438291054E5F36423c9E3c76A105477fa',
    joined: '1 month ago',
    status: 'Active',
    tier: 'Level 1',
    xpEarned: 18500,
  },
];

const TIERS = [
  {
    tier: 1,
    name: 'Scout',
    range: '1–5 Referrals',
    rate: '10% XP',
    completed: true,
    perks: 'Standard referral attribution',
  },
  {
    tier: 2,
    name: 'Ambassador',
    range: '6–20 Referrals',
    rate: '20% XP',
    current: true,
    perks: 'Priority processing · 20% commission',
  },
  {
    tier: 3,
    name: 'Pioneer',
    range: '21–50 Referrals',
    rate: '25% XP',
    perks: '25% commission · Early feature access',
  },
  {
    tier: 4,
    name: 'Partner',
    range: '50+ Referrals',
    rate: '30% XP',
    perks: '30% commission · Custom revshare channel',
  },
];

const FAQS = [
  {
    id: 'how-it-works',
    q: 'How does the 20% lifetime XP commission work?',
    a: 'Every time an invited user executes a swap, triggers an AI agent research task, or interacts on-chain, 20% of their earned XP is automatically minted and credited to your account. This commission is perpetual and has no expiration date.',
  },
  {
    id: 'welcome-bonus',
    q: 'What welcome reward do my invitees receive?',
    a: 'When someone connects using your referral link or inputs your code, they immediately receive an instant +5,000 XP welcome boost credited directly to their profile to kickstart their ranking on the leaderboard.',
  },
  {
    id: 'attribution',
    q: 'How are referrals tracked and attributed?',
    a: 'Referrals are permanently tied to your wallet address via on-chain event attribution upon wallet connection. You can review all real-time activity and XP contributions in the ledger below.',
  },
];

export const ReferEarnPage: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>('how-it-works');

  const userProfile = useCryptoStore((s) => s.userProfile);

  // Dynamic referral code based on connected wallet
  const referralCode = useMemo(() => {
    if (userProfile.walletAddress && userProfile.walletAddress.length >= 8) {
      return `DOPAMINT-${userProfile.walletAddress.slice(2, 6).toUpperCase()}`;
    }
    return 'DOPAMINT-71C8';
  }, [userProfile.walletAddress]);

  const referralLink = `https://dopamint.ai/ref/${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    triggerConfetti();
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    triggerConfetti();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyWallet = (address: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopiedWallet(address);
    setTimeout(() => setCopiedWallet(null), 1800);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Join DopaMint with my invite code',
          text: `Use my invite code ${referralCode} to get a +5,000 XP welcome bonus on DopaMint!`,
          url: referralLink,
        })
        .catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const filteredReferrals = useMemo(() => {
    if (!searchQuery.trim()) return REFERRALS_DATA;
    const q = searchQuery.toLowerCase();
    return REFERRALS_DATA.filter(
      (item) =>
        item.wallet.toLowerCase().includes(q) ||
        item.fullAddress.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalReferrals = 18;
  const currentReferralCount = 18;
  const nextTierTarget = 20;
  const progressToNextTier = Math.min(100, Math.round((currentReferralCount / nextTierTarget) * 100));

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] text-[var(--text-primary)] px-4 sm:px-8 md:px-12 py-6 scroll-smooth transition-colors duration-200">
      <div className="max-w-[920px] mx-auto space-y-7 pb-20">
        {/* ═══════════════════════════════════════════════════════════
         *  1. TOP BAR HEADER — REFINED & FOCUSED
         * ═══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Refer & Earn
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                Invite friends and researchers to earn a perpetual 20% XP commission.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>Share Invite</span>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  2. HERO SECTION — THE REFERRAL ENGINE (REFINED ARCHITECTURE)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[22px] p-6 sm:p-8 shadow-card space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20 uppercase tracking-wider">
              <Crown className="w-3 h-3 stroke-[2.2]" />
              Lifetime Commission Program
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] leading-snug">
              Your network. Your edge.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              Give invited peers an instant <span className="font-semibold text-[var(--text-primary)]">+5,000 XP</span> welcome bonus. You receive <span className="font-semibold text-[var(--text-primary)]">20% lifetime XP</span> on every swap, agent research, and on-chain action they perform.
            </p>
          </div>

          {/* Unified Invite Link & Code Module */}
          <div className="p-4 sm:p-5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
              {/* Left: Referral Link Input Bar */}
              <div className="md:col-span-8 space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                  Your Referral Link
                </label>
                <div className="flex items-center justify-between gap-2 px-3.5 py-2 bg-[var(--bg-card)] border border-[var(--border-color)] focus-within:border-[var(--primary)] rounded-xl transition-colors">
                  <span className="font-mono text-xs sm:text-[13px] text-[var(--text-primary)] font-medium truncate select-all">
                    {referralLink}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[var(--primary)] hover:opacity-90 text-white dark:text-[#ECECEC] text-xs font-semibold rounded-lg transition-all flex-shrink-0 cursor-pointer shadow-2xs"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right: Referral Code Chip */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                  Referral Code
                </label>
                <div className="flex items-center justify-between gap-2 px-3.5 py-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl">
                  <span className="font-mono text-xs sm:text-[13px] font-bold text-[var(--text-primary)] tracking-wide">
                    {referralCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] hover:underline cursor-pointer flex-shrink-0"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-[11px] text-[var(--text-muted)] border-t border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>On-chain attribution · Instant attribution on wallet connect</span>
              </div>
              <span className="font-medium text-[var(--text-secondary)]">
                {totalReferrals} active referrals linked
              </span>
            </div>
          </div>

          {/* How It Works — 3 Clean Sequential Steps (Linear/Stripe Style) */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              How Attribution Works
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Step 1 */}
              <div className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[var(--primary)]">
                    01
                  </span>
                  <Share2 className="w-4 h-4 text-[var(--primary)]" />
                </div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">
                  Share Your Link
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Send your unique URL or invite code to fellow traders and community members.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[var(--primary)]">
                    02
                  </span>
                  <Zap className="w-4 h-4 text-[var(--primary)]" />
                </div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">
                  Friends Receive +5,000 XP
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  New users receive an instant welcome boost upon their first wallet connection.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[var(--primary)]">
                    03
                  </span>
                  <Crown className="w-4 h-4 text-[var(--primary)]" />
                </div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">
                  Earn 20% Lifetime XP
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Automatically receive 20% of all activity XP generated by your network forever.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  3. 4-COLUMN STATS BAR — CORE THEME PALETTE ONLY
         * ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stat 1: Friends Invited */}
          <div className="p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Friends Invited
              </span>
              <div className="w-7 h-7 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)] font-mono tabular-nums">
                18
              </div>
              <div className="text-xs font-semibold text-[var(--primary)] flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+4 this week</span>
              </div>
            </div>
          </div>

          {/* Stat 2: Referral XP Earned */}
          <div className="p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Referral XP Earned
              </span>
              <div className="w-7 h-7 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
                <Crown className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)] font-mono tabular-nums">
                450,000
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                20% perpetual share
              </p>
            </div>
          </div>

          {/* Stat 3: Active Network Traders */}
          <div className="p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Active Traders
              </span>
              <div className="w-7 h-7 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)] font-mono tabular-nums">
                14 <span className="text-sm font-normal text-[var(--text-muted)]">/ 18</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                78% network activity
              </p>
            </div>
          </div>

          {/* Stat 4: Current Commission Tier */}
          <div className="p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Commission Tier
              </span>
              <div className="w-7 h-7 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[var(--primary)] font-mono">
                20% XP
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Ambassador · Tier 2
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  4. TIER PROGRESSION ROADMAP (REFINED EXECUTIVE DESIGN)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-card space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                Referral Tier Progression
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Reach community referral milestones to unlock higher commission multipliers.
              </p>
            </div>

            <div className="text-xs font-semibold px-3 py-1 bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/25 rounded-full self-start sm:self-auto">
              2 more referrals to unlock Tier 3 (25%)
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
              <span>Current Progress: 18 Referrals</span>
              <span>Target: 20 Referrals (Tier 3)</span>
            </div>
            <div className="w-full h-2 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                style={{ width: `${progressToNextTier}%` }}
              />
            </div>
          </div>

          {/* 4 Tier Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TIERS.map((t) => (
              <div
                key={t.tier}
                className={`p-4 rounded-xl transition-all space-y-2.5 ${
                  t.current
                    ? 'bg-[var(--primary-light)] border-2 border-[var(--primary)] shadow-2xs'
                    : 'bg-[var(--bg-app)] border border-[var(--border-color)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider ${
                      t.current ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    Tier {t.tier}
                  </span>
                  {t.completed && <Check className="w-3.5 h-3.5 text-[var(--primary)] stroke-[2.5]" />}
                  {t.current && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[var(--primary)] text-white dark:text-[#ECECEC] rounded uppercase tracking-wider">
                      Current
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">
                    {t.name}
                  </h3>
                  <p className="text-base font-extrabold text-[var(--text-primary)] mt-0.5 font-mono">
                    {t.rate}
                  </p>
                  <span className="text-[11px] text-[var(--text-muted)] font-medium block mt-0.5">
                    {t.range}
                  </span>
                </div>

                <div className="pt-2 border-t border-[var(--border-color)]/60 text-[11px] text-[var(--text-muted)] leading-tight">
                  {t.perks}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  5. REFERRAL NETWORK LEDGER (DATA-DENSE TABLE)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-card overflow-hidden">
          {/* Table Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4.5 border-b border-[var(--border-color)]">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                Referral Network Ledger
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Real-time activity log and 20% commission breakdown
              </p>
            </div>

            {/* Filter Search */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-app)] border border-[var(--border-color)] focus-within:border-[var(--primary)] rounded-xl text-xs w-full sm:w-64 transition-colors">
              <Search className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wallet or status..."
                className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[10px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Table Column Headers */}
          <div className="grid grid-cols-12 px-6 py-2.5 bg-[var(--bg-app)] text-[10.5px] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-color)]">
            <div className="col-span-5 sm:col-span-4">Referral Wallet</div>
            <div className="col-span-3 sm:col-span-3">Joined</div>
            <div className="col-span-4 sm:col-span-3">Activity Status</div>
            <div className="hidden sm:block sm:col-span-2 text-right">XP Earned (20%)</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[var(--border-color)]">
            {filteredReferrals.length > 0 ? (
              filteredReferrals.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-12 items-center px-6 py-3.5 hover:bg-[var(--bg-hover)] transition-colors text-xs"
                >
                  {/* Referral Wallet Column */}
                  <div className="col-span-5 sm:col-span-4 flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-[11px] font-bold text-[var(--text-muted)] w-4 flex-shrink-0">
                      {row.id}
                    </span>
                    <span className="font-mono font-bold text-xs sm:text-[13px] text-[var(--text-primary)] truncate">
                      {row.wallet}
                    </span>
                    <button
                      onClick={(e) => handleCopyWallet(row.fullAddress, e)}
                      title="Copy full wallet address"
                      className="text-[var(--text-muted)] hover:text-[var(--primary)] p-0.5 rounded cursor-pointer transition-colors"
                    >
                      {copiedWallet === row.fullAddress ? (
                        <Check className="w-3 h-3 text-[var(--primary)]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  {/* Joined Date Column */}
                  <div className="col-span-3 sm:col-span-3 text-[var(--text-muted)] text-xs truncate">
                    {row.joined}
                  </div>

                  {/* Activity Status Column */}
                  <div className="col-span-4 sm:col-span-3 flex items-center gap-2 truncate">
                    <span className="px-2 py-0.5 bg-[var(--primary-light)] text-[var(--primary)] font-semibold rounded-md border border-[var(--primary)]/20 text-[10.5px] truncate">
                      {row.status}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)] hidden md:inline">
                      {row.tier}
                    </span>
                  </div>

                  {/* XP Earned Column */}
                  <div className="hidden sm:block sm:col-span-2 text-right font-bold text-xs sm:text-[13px] text-[var(--text-primary)] font-mono tabular-nums">
                    +{row.xpEarned.toLocaleString()} XP
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[var(--text-muted)] space-y-1">
                <p className="font-semibold text-[var(--text-secondary)]">No referrals match your search.</p>
                <p>Try searching for a different wallet prefix or activity keyword.</p>
              </div>
            )}
          </div>

          <div className="px-6 py-3 bg-[var(--bg-app)] border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Showing {filteredReferrals.length} of {REFERRALS_DATA.length} recorded referrals</span>
            <span className="font-medium text-[var(--text-secondary)]">All on-chain events synced</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  6. FAQ ACCORDION — TRANSPARENT & PRECISE
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-card space-y-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
              Program Rules & FAQ
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Clear terms, zero ambiguities. Everything you need to know about rewards.
            </p>
          </div>

          <div className="divide-y divide-[var(--border-color)]">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="py-3 first:pt-0 last:pb-0">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group py-1"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-[var(--primary)]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-2 pb-1">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
