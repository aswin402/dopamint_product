import React, { useState } from 'react';
import {
  Users,
  Copy,
  Check,
  Zap,
  Coins,
  Gift,
  Award,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

export const ReferEarnPage: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [claimedCommission, setClaimedCommission] = useState(false);

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

  const handleClaimCommission = () => {
    setClaimedCommission(true);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      `Exploring the next-gen AI crypto intelligence platform with @dopamint_ai 🚀\n\nJoin using my invite code ${referralCode} to get 2.5x XP points & testnet rewards:\n${referralLink}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareOnTelegram = () => {
    const text = encodeURIComponent(
      `Join DopaMint Crypto AI platform with my invite link and get 2.5x XP:\n${referralLink}`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${text}`, '_blank');
  };

  const mockReferrals = [
    {
      wallet: '0x38b2...9821',
      joined: '2 hours ago',
      status: 'Active · Trading',
      testnetVolume: '14.50 ETH',
      xpEarned: '+36,250 XP',
      tier: 'Level 4',
    },
    {
      wallet: '0x94f1...12ab',
      joined: 'Yesterday',
      status: 'Active · AI Pro',
      testnetVolume: '25.00 ETH',
      xpEarned: '+62,500 XP',
      tier: 'Level 6',
    },
    {
      wallet: '0x77c2...551e',
      joined: '3 days ago',
      status: 'Active',
      testnetVolume: '8.00 ETH',
      xpEarned: '+20,000 XP',
      tier: 'Level 3',
    },
    {
      wallet: '0x12a9...890c',
      joined: '5 days ago',
      status: 'Active · Deep Research',
      testnetVolume: '32.50 ETH',
      xpEarned: '+81,250 XP',
      tier: 'Level 8',
    },
    {
      wallet: '0x66d3...338a',
      joined: '1 week ago',
      status: 'Active',
      testnetVolume: '5.00 ETH',
      xpEarned: '+12,500 XP',
      tier: 'Level 2',
    },
    {
      wallet: '0x88e1...4419',
      joined: '2 weeks ago',
      status: 'Active',
      testnetVolume: '18.00 ETH',
      xpEarned: '+45,000 XP',
      tier: 'Level 5',
    },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] text-[var(--text-primary)] transition-colors duration-200">
      {/* ─────────────────────────────────────────────────────────────
       *  TOP HEADER
       * ───────────────────────────────────────────────────────────── */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-card)] px-6 py-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 text-pink-500 flex items-center justify-center border border-pink-500/20 shadow-xs flex-shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  Refer & Earn
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 uppercase tracking-wide">
                  Tier 2 Ambassador (20%)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                Invite friends, analysts, and traders to DopaMint. Earn 20% lifetime XP commission + 10% testnet top-up bonuses.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs sm:text-sm font-semibold shadow-button-primary hover:opacity-95 transition-all cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Referral Link'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6">
        {/* ─────────────────────────────────────────────────────────────
         *  REFERRAL LINK & CODE HERO BOX
         * ───────────────────────────────────────────────────────────── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-card)] to-[var(--primary-light)]/20 border border-[var(--border-color)] shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                Your Exclusive Invite
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-1">
                Share your link & start earning lifetime rewards
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                Every friend who signs up gets a +5,000 XP welcome bonus, and you earn 20% of all their activity XP forever.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={shareOnTwitter}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <span>Share on X</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={shareOnTelegram}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
            {/* Referral Link Input */}
            <div className="md:col-span-8 flex items-center bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl p-1.5 focus-within:border-[var(--primary)] transition-all">
              <span className="px-3 text-xs font-semibold text-[var(--text-muted)] select-none">
                Link:
              </span>
              <input
                type="text"
                readOnly
                value={referralLink}
                className="flex-1 bg-transparent text-xs sm:text-sm font-mono font-medium text-[var(--text-primary)] outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-4 py-2 bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Referral Code Box */}
            <div className="md:col-span-4 flex items-center justify-between bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl p-1.5">
              <div className="px-3 min-w-0">
                <span className="text-[10.5px] uppercase font-bold text-[var(--text-muted)] block">
                  Code:
                </span>
                <span className="font-mono text-sm font-extrabold text-[var(--primary)] truncate">
                  {referralCode}
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
         *  KEY METRICS STATS GRID
         * ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className="text-xs font-medium">Total Friends Invited</span>
              <Users className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)]">
              18
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+4 this week</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className="text-xs font-medium">Referral XP Earned</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-500">
              450,000 XP
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              20% Lifetime cut
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className="text-xs font-medium">Testnet Volume Referred</span>
              <Coins className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)]">
              103.0 ETH
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Base Sepolia Testnet
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className="text-xs font-medium">Pending ETH Bonus</span>
              <Award className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--primary)]">
              {claimedCommission ? '0.00 ETH' : '0.45 ETH'}
            </div>
            <div className="pt-1">
              <button
                onClick={handleClaimCommission}
                disabled={claimedCommission}
                className={`text-[11px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer ${
                  claimedCommission
                    ? 'bg-neutral-500/10 text-[var(--text-muted)] cursor-not-allowed'
                    : 'bg-[var(--primary)] text-white hover:opacity-95'
                }`}
              >
                {claimedCommission ? 'Claimed ✅' : 'Claim to Wallet'}
              </button>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
         *  TIER PROGRESSION MILESTONES
         * ───────────────────────────────────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Referral Tier Progression
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Invite more users to unlock higher commission rates and exclusive perks.
              </p>
            </div>
            <span className="text-xs font-bold text-[var(--primary)] bg-[var(--primary-light)] px-2.5 py-1 rounded-lg">
              Next Tier: Whale Pioneer at 21 Invites (3 to go)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {/* Tier 1 */}
            <div className="p-4 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-2 opacity-80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-primary)]">Tier 1 · Scout</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xl font-extrabold text-[var(--text-primary)]">10% XP</p>
              <span className="text-[11px] text-[var(--text-muted)] block">1 – 5 Referrals</span>
            </div>

            {/* Tier 2 (Current) */}
            <div className="p-4 rounded-xl bg-[var(--primary-light)]/40 border-2 border-[var(--primary)] space-y-2 shadow-xs relative">
              <span className="absolute -top-2.5 right-3 px-2 py-0.2 bg-[var(--primary)] text-white text-[9.5px] font-bold rounded-full uppercase">
                Current Tier
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--primary)]">Tier 2 · Ambassador</span>
                <Award className="w-4 h-4 text-[var(--primary)]" />
              </div>
              <p className="text-xl font-extrabold text-[var(--primary)]">20% XP + Perks</p>
              <span className="text-[11px] text-[var(--text-muted)] block">6 – 20 Referrals (18 Active)</span>
            </div>

            {/* Tier 3 */}
            <div className="p-4 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-primary)]">Tier 3 · Whale Pioneer</span>
                <span className="text-[10px] font-bold text-amber-500 uppercase">3 Left</span>
              </div>
              <p className="text-xl font-extrabold text-[var(--text-primary)]">30% XP + Pro Free</p>
              <span className="text-[11px] text-[var(--text-muted)] block">21 – 50 Referrals</span>
            </div>

            {/* Tier 4 */}
            <div className="p-4 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-primary)]">Tier 4 · Whale Partner</span>
                <span className="text-[10px] font-bold text-purple-500 uppercase">VIP</span>
              </div>
              <p className="text-xl font-extrabold text-[var(--text-primary)]">Custom RevShare</p>
              <span className="text-[11px] text-[var(--text-muted)] block">50+ Referrals</span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
         *  REFERRED FRIENDS TABLE
         * ───────────────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-2xs">
          <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Invited Friends & Traders History
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Real-time activity and XP commission tracking
              </p>
            </div>
            <span className="text-xs font-semibold text-[var(--text-secondary)]">
              Showing 6 of 18 Referrals
            </span>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 px-5 py-3 border-b border-[var(--border-color)] bg-[var(--bg-app)] text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            <span className="col-span-4 sm:col-span-3">Referred Wallet</span>
            <span className="col-span-3 sm:col-span-3">Joined Time</span>
            <span className="hidden sm:block sm:col-span-3">Status / Tier</span>
            <span className="col-span-5 sm:col-span-3 text-right">XP Earned (20%)</span>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[var(--border-color)]">
            {mockReferrals.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 items-center px-5 py-3.5 hover:bg-[var(--bg-hover)] transition-colors"
              >
                {/* Wallet */}
                <div className="col-span-4 sm:col-span-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center text-xs font-mono text-[var(--text-primary)] font-bold">
                    {idx + 1}
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                    {item.wallet}
                  </span>
                </div>

                {/* Joined */}
                <div className="col-span-3 sm:col-span-3 text-xs text-[var(--text-muted)]">
                  {item.joined}
                </div>

                {/* Status */}
                <div className="hidden sm:flex sm:col-span-3 items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {item.status}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{item.tier}</span>
                </div>

                {/* XP Earned */}
                <div className="col-span-5 sm:col-span-3 text-right">
                  <div className="inline-flex items-center justify-end gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-app)] border border-[var(--border-color)]">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-mono text-xs sm:text-sm font-extrabold text-[var(--text-primary)]">
                      {item.xpEarned}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
