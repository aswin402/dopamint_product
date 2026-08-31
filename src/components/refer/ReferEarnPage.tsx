import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gift,
  Copy,
  Check,
  Users,
  Zap,
  Wallet,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { TokenIcon } from '../common/TokenIcon';
import { triggerConfetti } from '../../lib/confetti';

interface ReferralRecord {
  id: number;
  wallet: string;
  joined: string;
  status: string;
  tier: string;
  xpEarned: string;
}

const REFERRALS_DATA: ReferralRecord[] = [
  {
    id: 1,
    wallet: '0xc3902...9b21',
    joined: '2 hours ago',
    status: 'Active · Trading',
    tier: 'Level 4',
    xpEarned: '+36,250 XP',
  },
  {
    id: 2,
    wallet: '0x34f1...12ab',
    joined: 'Yesterday',
    status: 'Active · AI Ops',
    tier: 'Level 3',
    xpEarned: '+62,500 XP',
  },
  {
    id: 3,
    wallet: '0x77c2...891e',
    joined: '1 day ago',
    status: 'Active',
    tier: 'Level 3',
    xpEarned: '+20,000 XP',
  },
  {
    id: 4,
    wallet: '0x12a9...a80c',
    joined: '3 days ago',
    status: 'Active · Deep Research',
    tier: 'Level 3',
    xpEarned: '+81,250 XP',
  },
  {
    id: 5,
    wallet: '0x56d3...338a',
    joined: '1 week ago',
    status: 'Active',
    tier: 'Level 2',
    xpEarned: '+12,500 XP',
  },
  {
    id: 6,
    wallet: '0x88e1...4419',
    joined: '2 weeks ago',
    status: 'Active',
    tier: 'Level 2',
    xpEarned: '+45,000 XP',
  },
];

export const ReferEarnPage: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [claimedBonus, setClaimedBonus] = useState(false);

  const referralCode = 'DOPAMINT-71C8';
  const referralLink = `https://dopamint.ai/ref/${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleClaim = () => {
    if (!claimedBonus) {
      setClaimedBonus(true);
      triggerConfetti();
    }
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

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] text-[var(--text-primary)] px-4 sm:px-8 md:px-12 py-6 scroll-smooth transition-colors duration-200">
      <div className="max-w-[920px] mx-auto space-y-6 pb-20">
        {/* ═══════════════════════════════════════════════════════════
         *  1. TOP BAR HEADER
         * ═══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Refer & Earn
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Invite friends. Grow the network. Earn lifetime rewards.
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--text-primary)] hover:opacity-90 text-[var(--bg-app)] text-xs font-bold rounded-xl transition-all shadow-button-primary cursor-pointer self-start sm:self-auto"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Referral Link</span>
              </>
            )}
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  2. HERO SECTION CARD (LIFETIME REWARDS + VECTOR ILLUSTRATION)
         * ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[24px] p-6 sm:p-8 shadow-card relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Content Column */}
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
                  Earn{' '}
                  <span className="text-[var(--primary)] bg-clip-text">
                    lifetime rewards
                  </span>{' '}
                  by inviting friends
                </h2>
                <p className="text-xs sm:text-[13.5px] text-[var(--text-muted)] leading-relaxed">
                  Every friend who signs up gets a <strong className="text-[var(--text-primary)] font-semibold">+5,000 XP</strong> welcome bonus. You earn <strong className="text-[var(--text-primary)] font-semibold">20%</strong> of all their activity XP forever.
                </p>
              </div>

              {/* Dual Copy Boxes (Link + Code) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Referral Link Box */}
                <div className="p-3 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl space-y-1">
                  <span className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                    Your Referral Link
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-medium text-[var(--text-primary)] truncate">
                      {referralLink}
                    </span>
                    <button
                      onClick={handleCopyLink}
                      title="Copy Link"
                      className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] hover:underline flex-shrink-0 cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Referral Code Box */}
                <div className="p-3 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl space-y-1">
                  <span className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                    Your Code
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[var(--text-primary)] tracking-wide">
                      {referralCode}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      title="Copy Code"
                      className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] hover:underline flex-shrink-0 cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Vector Illustration (Connected Network Nodes) */}
            <div className="md:col-span-5 flex items-center justify-center py-2">
              <div className="relative w-full max-w-[280px] h-[160px] flex items-center justify-center">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-emerald-500/10 to-transparent rounded-full filter blur-xl" />

                {/* Left Node (Purple User) */}
                <div className="absolute left-2 sm:left-6 flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-b from-purple-400 to-indigo-600 p-0.5 shadow-lg flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-purple-100 dark:bg-purple-950/80 flex items-center justify-center text-purple-600 dark:text-purple-300">
                      <Users className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                  </div>
                  <div className="w-14 h-2 rounded-full bg-purple-500/20 filter blur-xs mt-1" />
                </div>

                {/* Connecting Chain Link Vector */}
                <div className="relative z-10 flex items-center gap-1 px-2">
                  <div className="w-6 h-3 rounded-full border-2 border-dashed border-[var(--primary)]/60" />
                  <div className="w-7 h-7 rounded-full bg-[var(--bg-card)] border-2 border-[var(--primary)] flex items-center justify-center shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
                  </div>
                  <div className="w-6 h-3 rounded-full border-2 border-dashed border-emerald-500/60" />
                </div>

                {/* Right Node (Green User) */}
                <div className="absolute right-2 sm:right-6 flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-b from-emerald-400 to-teal-600 p-0.5 shadow-lg flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                      <Users className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                  </div>
                  <div className="w-14 h-2 rounded-full bg-emerald-500/20 filter blur-xs mt-1" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
         *  3. 4-COLUMN STATS BAR
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 shadow-card">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-color)]">
            {/* Stat 1: Friends Invited */}
            <div className="flex flex-col justify-between pt-3 sm:pt-0 sm:px-3 first:pt-0 first:px-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  Friends Invited
                </span>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[var(--text-primary)] tabular-nums">
                  18
                </p>
                <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-0.5 mt-0.5">
                  <TrendingUp className="w-3 h-3" />
                  4 this week
                </span>
              </div>
            </div>

            {/* Stat 2: Referral XP Earned */}
            <div className="flex flex-col justify-between pt-3 sm:pt-0 sm:px-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Zap className="w-4 h-4 fill-amber-500" />
                </div>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  Referral XP Earned
                </span>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-amber-500 tabular-nums">
                  450,000 XP
                </p>
                <span className="text-[11px] text-[var(--text-muted)] font-medium mt-0.5 block">
                  20% lifetime commission
                </span>
              </div>
            </div>

            {/* Stat 3: Testnet Volume Referred */}
            <div className="flex flex-col justify-between pt-3 sm:pt-0 sm:px-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center">
                  <TokenIcon symbol="ETH" size={20} />
                </div>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  Testnet Volume Referred
                </span>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[var(--text-primary)] tabular-nums">
                  103.0 ETH
                </p>
                <span className="text-[11px] text-[var(--text-muted)] font-medium mt-0.5 block">
                  Sepolia Testnet
                </span>
              </div>
            </div>

            {/* Stat 4: Pending Bonus */}
            <div className="flex flex-col justify-between pt-3 sm:pt-0 sm:pl-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  Pending Bonus
                </span>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[var(--text-primary)] tabular-nums">
                  {claimedBonus ? '0.00 ETH' : '0.45 ETH'}
                </p>
                <button
                  onClick={handleClaim}
                  disabled={claimedBonus}
                  className="mt-2 w-full py-1.5 px-3 bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] disabled:opacity-60 text-xs font-bold text-[var(--text-primary)] rounded-xl transition-all shadow-2xs cursor-pointer text-center"
                >
                  {claimedBonus ? 'Claimed to Wallet' : 'Claim to Wallet'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  4. REFERRAL TIER PROGRESSION CARD
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                Referral Tier Progression
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Invite more to unlock higher commission rates and exclusive perks.
              </p>
            </div>

            <span className="text-xs font-bold px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full self-start sm:self-auto">
              Next: Whale Pioneer at 21 invites (3 to go)
            </span>
          </div>

          {/* 4 Tier Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Tier 1 (Completed) */}
            <div className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Tier 1
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[var(--text-primary)]">Scout</h3>
                <p className="text-base font-extrabold text-[var(--text-primary)] mt-1">
                  10% XP
                </p>
                <span className="text-[11px] text-[var(--text-muted)] font-medium">
                  1 – 5 Referrals
                </span>
              </div>
            </div>

            {/* Tier 2 (CURRENT TIER HIGHLIGHTED) */}
            <div className="p-4 bg-[var(--bg-app)] border-2 border-purple-500 dark:border-purple-400 rounded-2xl space-y-2 relative shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-300 uppercase tracking-wider">
                  Tier 2
                </span>
                <span className="text-[9.5px] font-extrabold px-1.5 py-0.2 bg-purple-600 text-white rounded-md uppercase tracking-wider">
                  Current Tier
                </span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-[var(--text-primary)]">Ambassador</h3>
                <p className="text-base font-extrabold text-purple-600 dark:text-purple-400 mt-1">
                  20% XP + Perks
                </p>
                <span className="text-[11px] text-[var(--text-muted)] font-medium">
                  6 – 20 Referrals
                </span>
              </div>
            </div>

            {/* Tier 3 (Next Target) */}
            <div className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Tier 3
                </span>
                <span className="text-[10px] font-extrabold text-amber-500">
                  3 LEFT
                </span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-[var(--text-primary)]">Whale Pioneer</h3>
                <p className="text-base font-extrabold text-[var(--text-primary)] mt-1">
                  30% XP + Pro Free
                </p>
                <span className="text-[11px] text-[var(--text-muted)] font-medium">
                  21 – 50 Referrals
                </span>
              </div>
            </div>

            {/* Tier 4 (VIP) */}
            <div className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Tier 4
                </span>
                <span className="text-[10px] font-extrabold text-purple-500">
                  VIP
                </span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-[var(--text-primary)]">Whale Partner</h3>
                <p className="text-base font-extrabold text-[var(--text-primary)] mt-1">
                  Custom RevShare
                </p>
                <span className="text-[11px] text-[var(--text-muted)] font-medium">
                  50+ Referrals
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  5. REFERRED FRIENDS & TRADERS TABLE
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-card overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-[var(--border-color)]">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                Referred Friends & Traders
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Real-time activity and XP commission tracking
              </p>
            </div>

            <span className="text-xs font-semibold px-3 py-1 bg-[var(--bg-app)] text-[var(--text-secondary)] rounded-full border border-[var(--border-color)]">
              Showing {REFERRALS_DATA.length} of 18 referrals
            </span>
          </div>

          {/* Table Header Row */}
          <div className="grid grid-cols-12 px-6 py-2.5 bg-[var(--bg-app)] text-[10.5px] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-color)]">
            <div className="col-span-4 sm:col-span-4">Referral Wallet</div>
            <div className="col-span-3 sm:col-span-3">Joined</div>
            <div className="col-span-3 sm:col-span-3">Status / Tier</div>
            <div className="col-span-2 sm:col-span-2 text-right">XP Earned (20%)</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[var(--border-color)]">
            {REFERRALS_DATA.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-12 items-center px-6 py-3.5 hover:bg-[var(--bg-hover)] transition-colors text-xs"
              >
                {/* Referral Wallet Column */}
                <div className="col-span-4 sm:col-span-4 flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-bold text-[var(--text-muted)] w-4 flex-shrink-0">
                    {row.id}
                  </span>
                  <span className="font-mono font-bold text-xs sm:text-[13px] text-[var(--text-primary)] truncate">
                    {row.wallet}
                  </span>
                </div>

                {/* Joined Column */}
                <div className="col-span-3 sm:col-span-3 text-[var(--text-muted)] truncate">
                  {row.joined}
                </div>

                {/* Status / Tier Column */}
                <div className="col-span-3 sm:col-span-3 flex items-center gap-2 truncate">
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold rounded-md border border-emerald-500/20 text-[10.5px] truncate">
                    {row.status}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] hidden sm:inline">
                    {row.tier}
                  </span>
                </div>

                {/* XP Earned Column */}
                <div className="col-span-2 sm:col-span-2 text-right font-bold text-xs sm:text-[13px] text-amber-500 font-mono tabular-nums flex items-center justify-end gap-1">
                  <Zap className="w-3 h-3 fill-amber-500 flex-shrink-0" />
                  <span>{row.xpEarned}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  6. MORE FRIENDS. MORE REWARDS. BOTTOM BANNER
         * ═══════════════════════════════════════════════════════════ */}
        <div className="p-5 sm:p-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                More friends. More rewards.
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                The more active your referrals, the more you earn.
              </p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-all shadow-button-primary cursor-pointer self-start sm:self-auto flex-shrink-0"
          >
            <span>Invite Friends</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  7. SECURE & TRANSPARENT FOOTER
         * ═══════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-center gap-2 pt-2 text-center text-xs text-[var(--text-muted)]">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold text-[var(--text-secondary)]">
            Secure & Transparent
          </span>
          <span>·</span>
          <span>All referrals and rewards are tracked on-chain.</span>
        </div>
      </div>
    </div>
  );
};
