import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  Users,
  Share2,
  TrendingUp,
  Search,
  CheckCircle2,
  Crown,
  ChevronDown,
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
    range: '1–5 invites',
    rate: '10%',
    status: 'completed',
    perks: 'Base attribution',
  },
  {
    tier: 2,
    name: 'Ambassador',
    range: '6–20 invites',
    rate: '20%',
    status: 'active',
    perks: '20% lifetime share · Priority agent queues',
  },
  {
    tier: 3,
    name: 'Pioneer',
    range: '21–50 invites',
    rate: '25%',
    status: 'upcoming',
    perks: '25% share · Early alpha tool access',
  },
  {
    tier: 4,
    name: 'Partner',
    range: '50+ invites',
    rate: '30%',
    status: 'upcoming',
    perks: '30% revshare · Direct team channel',
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

  const currentReferrals = 18;
  const nextMilestone = 20;
  const progressPercent = Math.min(100, Math.round((currentReferrals / nextMilestone) * 100));

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] text-[var(--text-primary)] px-4 sm:px-8 md:px-12 py-8 scroll-smooth transition-colors duration-200">
      <div className="max-w-[880px] mx-auto space-y-10 pb-24">
        {/* ═══════════════════════════════════════════════════════════
         *  1. OPEN EDITORIAL HERO — FLUID, UNBOXED, CONFIDENT
         * ═══════════════════════════════════════════════════════════ */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--primary-light)] px-2.5 py-0.5 rounded-full border border-[var(--primary)]/20">
                  Partner Program
                </span>
                <span className="text-xs text-[var(--text-muted)]">·</span>
                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Perpetual On-Chain Attribution
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15]">
                Refer friends. <br className="hidden sm:block" />
                Earn 20% on every trade, forever.
              </h1>

              <p className="text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed pt-1">
                Give invited peers an instant <span className="font-semibold text-[var(--text-primary)]">+5,000 XP</span> welcome bonus. You earn <span className="font-semibold text-[var(--text-primary)]">20% lifetime XP</span> on every swap, analysis, and trade they execute.
              </p>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] hover:opacity-90 text-white dark:text-[#ECECEC] text-xs font-semibold rounded-xl transition-all shadow-2xs cursor-pointer self-start sm:self-auto flex-shrink-0"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Invite</span>
            </button>
          </div>

          {/* Unified Fluid Action Strip (No nested boxes) */}
          <div className="p-2 sm:p-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2 shadow-2xs">
            {/* Link Area */}
            <div className="flex-1 flex items-center justify-between gap-3 px-3 py-1.5 min-w-0">
              <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider flex-shrink-0">
                Link
              </span>
              <span className="font-mono text-xs sm:text-[13px] text-[var(--text-primary)] truncate font-medium select-all">
                {referralLink}
              </span>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-app)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] text-xs font-semibold text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--primary)]/30 rounded-lg transition-all cursor-pointer flex-shrink-0"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[var(--primary)] stroke-[2.5]" />
                    <span className="text-[var(--primary)] font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

            <div className="hidden md:block w-px h-6 bg-[var(--border-color)]" />

            {/* Code Area */}
            <div className="flex items-center justify-between gap-3 px-3 py-1.5 flex-shrink-0 bg-[var(--bg-app)] md:bg-transparent rounded-xl md:rounded-none border border-[var(--border-color)] md:border-none">
              <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Code
              </span>
              <span className="font-mono text-xs sm:text-[13px] font-bold text-[var(--text-primary)] tracking-wide">
                {referralCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="text-xs font-bold text-[var(--primary)] hover:underline cursor-pointer px-1 py-1"
              >
                {copiedCode ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Open 3-Step Attribution Flow (Delicate, Open, Linear) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[var(--primary)]">
                  01
                </span>
                <span className="h-px flex-1 bg-[var(--border-color)]" />
              </div>
              <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider pt-1">
                Share Invite
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Send your unique URL or invite code to friends and trading channels.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[var(--primary)]">
                  02
                </span>
                <span className="h-px flex-1 bg-[var(--border-color)]" />
              </div>
              <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider pt-1">
                Friends Get +5,000 XP
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                New peers receive an instant welcome boost upon their first wallet connection.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[var(--primary)]">
                  03
                </span>
                <span className="h-px flex-1 bg-[var(--border-color)]" />
              </div>
              <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider pt-1">
                Earn 20% Lifetime XP
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Receive 20% of every XP point generated by your network in perpetuity.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  2. UNIFIED METRICS STRIP (NO SEPARATE BOXES)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-card">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-[var(--border-color)]">
            {/* Metric 1 */}
            <div className="md:px-6 first:pl-0">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>Total Invited</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] tabular-nums">
                18
              </div>
              <div className="text-xs font-medium text-[var(--primary)] mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+4 this week</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="md:px-6">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                <Crown className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>Referral XP</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] tabular-nums">
                450,000
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">
                20% perpetual share
              </div>
            </div>

            {/* Metric 3 */}
            <div className="md:px-6">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                <Zap className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>Active Network</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)] tabular-nums">
                14 <span className="text-base font-normal text-[var(--text-muted)]">/ 18</span>
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">
                78% activity rate
              </div>
            </div>

            {/* Metric 4 */}
            <div className="md:px-6 last:pr-0">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>Active Tier</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--primary)]">
                20%
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">
                Ambassador · Tier 2
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  3. TIER MILESTONE TRACK (FLUID TIMELINE, NO NESTED BOXES)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                Commission Multiplier Track
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Reach network referral milestones to permanently boost your commission rate.
              </p>
            </div>

            <span className="text-xs font-semibold text-[var(--primary)]">
              2 invites to unlock Tier 3 (25%)
            </span>
          </div>

          {/* Connected Milestone Bar */}
          <div className="space-y-2">
            <div className="w-full h-1.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <span>18 referrals recorded</span>
              <span>Target: 20 referrals (90% to Tier 3)</span>
            </div>
          </div>

          {/* Stepper Milestones (Delicate open layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {TIERS.map((t) => (
              <div
                key={t.tier}
                className={`p-3.5 rounded-xl transition-all space-y-1.5 ${
                  t.status === 'active'
                    ? 'bg-[var(--primary-light)] border border-[var(--primary)]/40 shadow-2xs'
                    : 'bg-[var(--bg-app)] border border-[var(--border-color)]/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10.5px] font-bold uppercase tracking-wider ${
                      t.status === 'active'
                        ? 'text-[var(--primary)]'
                        : 'text-[var(--text-muted)]'
                    }`}
                  >
                    Tier {t.tier}
                  </span>
                  {t.status === 'completed' && (
                    <Check className="w-3.5 h-3.5 text-[var(--primary)] stroke-[2.5]" />
                  )}
                  {t.status === 'active' && (
                    <span className="text-[9.5px] font-bold px-1.5 py-0.2 bg-[var(--primary)] text-white dark:text-[#ECECEC] rounded uppercase tracking-wider">
                      Current
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between gap-1">
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">
                    {t.name}
                  </h3>
                  <span className="font-mono text-sm font-extrabold text-[var(--primary)]">
                    {t.rate}
                  </span>
                </div>

                <div className="text-[11px] text-[var(--text-muted)]">
                  {t.range}
                </div>

                <p className="text-[11px] text-[var(--text-secondary)] pt-1 border-t border-[var(--border-color)]/50 leading-tight">
                  {t.perks}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  4. REFERRAL NETWORK LEDGER (OPEN, AIRY TABLE)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                Referral Activity Ledger
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Real-time wallet connections, activity status, and XP commission logs
              </p>
            </div>

            {/* Filter Search */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] focus-within:border-[var(--primary)] rounded-xl text-xs w-full sm:w-64 transition-colors">
              <Search className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wallet or activity..."
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

          {/* Clean Open Table with subtle border rules */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-card">
            <div className="grid grid-cols-12 px-5 py-2.5 bg-[var(--bg-app)] text-[10.5px] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-color)]">
              <div className="col-span-5 sm:col-span-4">Referral Wallet</div>
              <div className="col-span-3 sm:col-span-3">Joined</div>
              <div className="col-span-4 sm:col-span-3">Activity Status</div>
              <div className="hidden sm:block sm:col-span-2 text-right">XP Earned (20%)</div>
            </div>

            <div className="divide-y divide-[var(--border-color)]">
              {filteredReferrals.length > 0 ? (
                filteredReferrals.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-12 items-center px-5 py-3 hover:bg-[var(--bg-hover)] transition-colors text-xs"
                  >
                    {/* Wallet */}
                    <div className="col-span-5 sm:col-span-4 flex items-center gap-2.5 min-w-0">
                      <span className="font-mono text-[11px] font-medium text-[var(--text-muted)] w-4 flex-shrink-0">
                        {row.id}
                      </span>
                      <span className="font-mono font-semibold text-xs sm:text-[13px] text-[var(--text-primary)] truncate">
                        {row.wallet}
                      </span>
                      <button
                        onClick={(e) => handleCopyWallet(row.fullAddress, e)}
                        title="Copy address"
                        className="text-[var(--text-muted)] hover:text-[var(--primary)] p-0.5 rounded cursor-pointer transition-colors"
                      >
                        {copiedWallet === row.fullAddress ? (
                          <Check className="w-3 h-3 text-[var(--primary)]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>

                    {/* Joined */}
                    <div className="col-span-3 sm:col-span-3 text-[var(--text-muted)] text-xs truncate">
                      {row.joined}
                    </div>

                    {/* Status */}
                    <div className="col-span-4 sm:col-span-3 flex items-center gap-2 truncate">
                      <span className="px-2 py-0.5 bg-[var(--primary-light)] text-[var(--primary)] font-semibold rounded-md border border-[var(--primary)]/20 text-[10.5px] truncate">
                        {row.status}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] hidden md:inline">
                        {row.tier}
                      </span>
                    </div>

                    {/* XP Earned */}
                    <div className="hidden sm:block sm:col-span-2 text-right font-bold text-xs sm:text-[13px] text-[var(--text-primary)] font-mono tabular-nums">
                      +{row.xpEarned.toLocaleString()} XP
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-[var(--text-muted)]">
                  No recorded referrals match your search.
                </div>
              )}
            </div>

            <div className="px-5 py-3 bg-[var(--bg-app)] border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Showing {filteredReferrals.length} of {REFERRALS_DATA.length} recorded referrals</span>
              <span className="font-medium text-[var(--text-secondary)]">All events verified on-chain</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  5. PROGRAM FAQ — OPEN ACCORDION (NO ENCLOSING BOX)
         * ═══════════════════════════════════════════════════════════ */}
        <div className="space-y-3 pt-2">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
              Program Rules & FAQ
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Transparent terms and attribution guidelines.
            </p>
          </div>

          <div className="divide-y divide-[var(--border-color)] border-y border-[var(--border-color)]">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="py-3.5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
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
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-2">
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
