import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Flame,
  TrendingUp,
  TrendingDown,
  Gift,
  Check,
  Bell,
  Crown,
  Repeat,
  ChevronRight,
  Zap,
} from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import { useCryptoStore } from '../../store/useCryptoStore';

export const DashboardPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [claimedStreak, setClaimedStreak] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();
  const sendMessage = useCryptoStore((s) => s.sendMessage);
  const isStreaming = useCryptoStore((s) => s.isStreaming);
  const userProfile = useCryptoStore((s) => s.userProfile);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const createNewChat = useCryptoStore((s) => s.createNewChat);

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const truncateAddress = (addr: string) => {
    if (!addr || addr.length < 10) return '0x4F2...8Ae1';
    return `${addr.slice(0, 5)}...${addr.slice(-4)}`;
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isStreaming) return;
    const newId = createNewChat(text);
    navigate(`/c/${newId}`);
    sendMessage(text);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPromptPills = [
    { label: 'Check my portfolio', prompt: 'Analyze my current portfolio allocation and performance' },
    { label: 'Swap tokens', prompt: 'How do I swap tokens with low slippage on Base?' },
    { label: 'Which Base tokens are worth watching?', prompt: 'Which Base ecosystem tokens have the highest momentum and active DEX volume right now?' },
  ];

  const trendingTokens = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: '$3,412.90',
      change: '+3.1%',
      isPositive: true,
      bg: 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20',
      iconColor: 'bg-blue-600',
    },
    {
      symbol: 'AERO',
      name: 'Aerodrome',
      price: '$1.14',
      change: '+6.7%',
      isPositive: true,
      bg: 'bg-purple-500/10 text-purple-500 dark:bg-purple-500/20',
      iconColor: 'bg-purple-600',
    },
    {
      symbol: 'BASE',
      name: 'Base Protocol',
      price: '$0.842',
      change: '-1.8%',
      isPositive: false,
      bg: 'bg-blue-600/10 text-blue-600 dark:bg-blue-600/20',
      iconColor: 'bg-blue-500',
    },
    {
      symbol: 'DEGEN',
      name: 'Degen',
      price: '$0.0041',
      change: '+9.2%',
      isPositive: true,
      bg: 'bg-violet-500/10 text-violet-500 dark:bg-violet-500/20',
      iconColor: 'bg-violet-600',
    },
  ];

  const recentActivities = [
    {
      id: 'act-1',
      type: 'swap',
      title: 'Swapped 0.10 ETH → 341 USDC',
      time: '2h ago',
      icon: <Repeat className="w-4 h-4 text-emerald-500" />,
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    },
    {
      id: 'act-2',
      type: 'chat',
      title: 'Asked Dopamint about Base ecosystem risk',
      time: '5h ago',
      icon: <Sparkles className="w-4 h-4 text-[var(--primary)]" />,
      iconBg: 'bg-[var(--primary-light)]',
    },
    {
      id: 'act-3',
      type: 'streak',
      title: 'Daily check-in — +15 XP, 6-day streak',
      time: '1d ago',
      icon: <Flame className="w-4 h-4 text-amber-500" />,
      iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    },
    {
      id: 'act-4',
      type: 'referral',
      title: '0x8B3f...2Ac1 joined via your invite — +100 pts',
      time: '2d ago',
      icon: <Gift className="w-4 h-4 text-pink-500" />,
      iconBg: 'bg-pink-500/10 dark:bg-pink-500/20',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto h-full px-4 md:px-8 py-6 scroll-smooth">
      <div className="w-full max-w-[1000px] mx-auto space-y-6 pb-16">
        {/* ═══════════════════════════════════════════════════════════
         *  1. TOP GREETING & STATUS BAR
         * ═══════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between py-2">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                {getGreeting()}{' '}
                <span className="font-mono font-medium text-[var(--text-secondary)]">
                  {truncateAddress(userProfile.walletAddress)}
                </span>
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                TESTNET
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-[var(--text-muted)] mt-0.5">
              6-day streak — keep it going for bonus XP today
            </p>
          </div>

          {/* Right Quick Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setModalState('isUpgradeProModalOpen', true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>PRO</span>
            </button>

            <button
              onClick={() => {
                setShowNotificationToast(true);
                setTimeout(() => setShowNotificationToast(false), 2500);
              }}
              title="Notifications"
              className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all shadow-2xs cursor-pointer relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--primary)]" />
            </button>

            <div
              onClick={() => navigate('/points')}
              className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 p-0.5 flex items-center justify-center text-white font-bold text-xs shadow-2xs cursor-pointer hover:opacity-90 transition-opacity"
              title="View Profile & XP"
            >
              <div className="w-full h-full bg-[#18181b] dark:bg-[#121214] rounded-[10px] flex items-center justify-center">
                <span className="text-[11px] font-mono text-purple-400 font-bold">0x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Toast */}
        <AnimatePresence>
          {showNotificationToast && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="p-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-flyout flex items-center justify-between text-xs text-[var(--text-primary)]"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>You have 2 unread alerts: BTC surpassed $92,000 & Daily streak reward is ready!</span>
              </div>
              <button
                onClick={() => setModalState('isAlertsModalOpen', true)}
                className="text-[var(--primary)] font-bold hover:underline cursor-pointer"
              >
                View
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════════
         *  2. MAIN HERO SEARCH & TRENDING CARD
         * ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[26px] p-6 sm:p-7 shadow-card space-y-6 relative overflow-hidden"
        >
          {/* Card Header: Icon + Badge + Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/25 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <img src={crownLogo} alt="crown" className="w-6 h-6 object-contain filter drop-shadow-xs" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[var(--primary-light)] text-[var(--primary)] text-[11px] font-bold tracking-tight mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Ask Dope</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                What do you want to know today?
              </h2>
            </div>
          </div>

          {/* Input Bar with Arrow Button */}
          <div className="relative flex items-center bg-[var(--bg-app)] border border-[var(--border-color)] hover:border-[var(--primary)] focus-within:border-[var(--primary)] rounded-2xl transition-all shadow-inner-sm p-1.5">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a token, your portfolio, or the market..."
              className="w-full bg-transparent px-3.5 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none outline-none leading-relaxed min-h-[42px] max-h-[120px]"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isStreaming}
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                inputText.trim() && !isStreaming
                  ? 'bg-[var(--primary)] text-white hover:opacity-95 shadow-button-primary'
                  : 'bg-[var(--bg-hover)] text-[var(--text-muted)] cursor-not-allowed opacity-60'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Suggestion Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {quickPromptPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(pill.prompt)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-all cursor-pointer shadow-2xs active:scale-97"
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Trending Markets Header */}
          <div className="pt-2 border-t border-[var(--border-color)]">
            <span className="text-[11px] font-bold text-[var(--text-muted)] tracking-wider uppercase">
              Trending on Base right now
            </span>

            {/* 4 Trending Tokens Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              {trendingTokens.map((token) => (
                <motion.div
                  key={token.symbol}
                  whileHover={{ y: -2 }}
                  onClick={() => handleSend(`Analyze ${token.name} (${token.symbol}) price momentum, volume, and catalysts`)}
                  className="p-3.5 bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] hover:border-[var(--primary)] rounded-2xl transition-all cursor-pointer shadow-2xs group"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-3.5 h-3.5 rounded-full ${token.iconColor}`} />
                    <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                      {token.symbol}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{token.price}</span>
                    <span
                      className={`text-xs font-bold flex items-center gap-0.5 ${
                        token.isPositive ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {token.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {token.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
         *  3. 4-METRIC STATS GRID
         * ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Card 1: XP POINTS */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => navigate('/points')}
            className="p-4 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-amber-500/40 rounded-2xl transition-all shadow-card cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  XP Points
                </span>
                <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold rounded-md border border-amber-500/20">
                  LVL 4
                </span>
              </div>
              <div className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">2,140</div>
            </div>

            <div className="mt-3.5 space-y-1.5">
              <div className="w-full h-1.5 bg-[var(--bg-app)] rounded-full overflow-hidden border border-[var(--border-color)]">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full w-[65%]" />
              </div>
              <div className="text-[11px] text-[var(--text-muted)] font-medium">360 pts to Level 5</div>
            </div>
          </motion.div>

          {/* Card 2: DAILY STREAK */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => {
              setClaimedStreak(true);
              setTimeout(() => setClaimedStreak(false), 2000);
            }}
            className="p-4 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-amber-500/40 rounded-2xl transition-all shadow-card cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Daily Streak
                </span>
              </div>
              <div className="text-2xl font-bold text-[var(--text-primary)] tracking-tight flex items-baseline justify-between">
                <span>
                  6 <span className="text-xs font-normal text-[var(--text-muted)]">days</span>
                </span>
                {claimedStreak && (
                  <span className="text-[10px] text-amber-500 font-bold px-1.5 py-0.5 bg-amber-500/10 rounded-md border border-amber-500/20 animate-pulse">
                    +15 XP Claimed!
                  </span>
                )}
              </div>
            </div>

            {/* 7-Day Pill Badges */}
            <div className="flex items-center gap-1 mt-3">
              {[1, 2, 3, 4, 5, 6].map((day) => (
                <div
                  key={day}
                  className="w-5 h-5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[10px] font-bold"
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              ))}
              <div className="w-5 h-5 rounded-md bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-muted)] flex items-center justify-center text-[10px] font-bold">
                7
              </div>
            </div>
          </motion.div>

          {/* Card 3: REFERRAL EARNINGS */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => navigate('/refer')}
            className="p-4 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-pink-500/40 rounded-2xl transition-all shadow-card cursor-pointer flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Referral Earnings
              </span>
              <div className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mt-2">
                450 <span className="text-xs font-normal text-[var(--text-muted)]">pts</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-pink-600 dark:text-pink-400 mt-3 flex items-center gap-1">
              <span>3 friends joined</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          {/* Card 4: LEADERBOARD RANK */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => navigate('/leaderboard')}
            className="p-4 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-emerald-500/40 rounded-2xl transition-all shadow-card cursor-pointer flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Leaderboard Rank
              </span>
              <div className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mt-2">#128</div>
            </div>

            <div className="text-xs font-semibold text-emerald-500 mt-3 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Up 12 this week</span>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
         *  4. REFERRAL CALLOUT BANNER
         * ═══════════════════════════════════════════════════════════ */}
        <motion.div
          whileHover={{ scale: 1.005 }}
          onClick={() => navigate('/refer')}
          className="w-full p-5 sm:p-6 bg-gradient-to-r from-[#121412] via-[#1a1c18] to-[#121412] text-white rounded-[22px] border border-amber-500/20 shadow-card flex items-center justify-between cursor-pointer group"
        >
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase">
              <Gift className="w-3 h-3 text-amber-400" />
              <span>Refer & earn</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Invite friends, earn 100 pts each
            </h3>
            <p className="text-xs sm:text-[13px] text-stone-400 font-medium">
              3 friends joined · 450 points earned so far — view your full referral page →
            </p>
          </div>

          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-button-primary transition-all flex-shrink-0 cursor-pointer">
            <span>Invite Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
         *  5. RECENT ACTIVITY LIST
         * ═══════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[22px] p-5 sm:p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[var(--text-primary)]">Recent activity</h3>
            <button
              onClick={() => navigate('/points')}
              className="text-xs font-bold text-[var(--primary)] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[var(--border-color)]">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="py-3 flex items-center justify-between first:pt-1 last:pb-1 hover:bg-[var(--bg-hover)] px-2 rounded-xl transition-colors cursor-pointer"
                onClick={() => {
                  if (act.type === 'chat') handleSend('Tell me more about Base ecosystem risk');
                  else if (act.type === 'referral') navigate('/refer');
                  else navigate('/points');
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-xl ${act.iconBg} flex items-center justify-center flex-shrink-0`}>
                    {act.icon}
                  </div>
                  <span className="text-xs sm:text-[13.5px] font-semibold text-[var(--text-primary)] truncate">
                    {act.title}
                  </span>
                </div>
                <span className="text-xs text-[var(--text-muted)] flex-shrink-0 font-medium ml-4">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
