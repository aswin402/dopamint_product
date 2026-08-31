import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  ArrowUp,
  ArrowRight,
  Sparkles,
  Flame,
  TrendingUp,
  TreePine,
  CircleDot,
  Globe,
  Heart,
  BookOpen,
  Gift,
  Check,
  Bell,
  Crown,
  Repeat,
  ChevronRight,
  Paperclip,
  X,
  Zap,
} from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import { useCryptoStore } from '../../store/useCryptoStore';
import type { Attachment } from '../../types/crypto';

type CategoryType = 'Trending' | 'Stock' | 'Pre-IPO' | 'Crypto' | 'Macro' | 'Sentiment' | 'Learn';

interface CategoryItem {
  name: CategoryType;
  icon: React.ReactNode;
  samplePrompt: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    name: 'Trending',
    icon: <Flame className="w-3.5 h-3.5 text-[#A06C3E] dark:text-[#D4A373]" />,
    samplePrompt: 'What are the top trending tokens across Base and Layer-2 blockchains today?',
  },
  {
    name: 'Stock',
    icon: <TrendingUp className="w-3.5 h-3.5 text-[#486B52] dark:text-[#74A883]" />,
    samplePrompt: 'Compare semiconductor stocks and AI infrastructure data center demand.',
  },
  {
    name: 'Pre-IPO',
    icon: <TreePine className="w-3.5 h-3.5 text-[#3C784C] dark:text-[#67B57B]" />,
    samplePrompt: 'What is the estimated secondary market valuation for leading AI startups?',
  },
  {
    name: 'Crypto',
    icon: <CircleDot className="w-3.5 h-3.5 text-[#94782A] dark:text-[#D4B257]" />,
    samplePrompt: 'Explain institutional ETF inflows and Base on-chain DEX liquidity.',
  },
  {
    name: 'Macro',
    icon: <Globe className="w-3.5 h-3.5 text-[#3B6678] dark:text-[#5F9AB3]" />,
    samplePrompt: 'How will upcoming interest rate decisions impact tech valuations and liquidity?',
  },
  {
    name: 'Sentiment',
    icon: <Heart className="w-3.5 h-3.5 text-[#8A4A4A] dark:text-[#BF7373]" />,
    samplePrompt: 'Analyze current market sentiment, Fear & Greed index, and derivatives funding rates.',
  },
  {
    name: 'Learn',
    icon: <BookOpen className="w-3.5 h-3.5 text-[#635587] dark:text-[#9A87C7]" />,
    samplePrompt: 'Explain Automated Market Makers (AMM) and impermanent loss for beginners.',
  },
];

const PROMPT_HINTS = [
  'Ask anything about stock, crypto and more...',
  'Analyze Ethereum (ETH) breakout momentum & catalysts...',
  'Which Base ecosystem tokens have highest volume today?',
  'Compare NVIDIA vs AMD data center GPU market share...',
  'How do I earn 20% lifetime XP rewards on DopaMint?',
];

export const DashboardPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Trending');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [claimedStreak, setClaimedStreak] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % PROMPT_HINTS.length);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if ((!text && attachments.length === 0) || isStreaming) return;
    const prompt = text || 'Analyze market data';
    const newId = createNewChat(prompt);
    navigate(`/c/${newId}`);
    sendMessage(prompt, attachments);
    setInputText('');
    setAttachments([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const newAttachments: Attachment[] = Array.from(files).map((file) => ({
      id: `att-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleCategoryClick = (cat: CategoryItem) => {
    setSelectedCategory(cat.name);
    handleSend(cat.samplePrompt);
  };

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
    <div className="flex-1 overflow-y-auto overflow-x-hidden h-full px-4 md:px-8 py-6 scroll-smooth">
      <div className="w-full max-w-[1000px] mx-auto space-y-7 pb-16">
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
         *  2. HERO SECTION — IMAGE 2 STYLE
         *  Crown Center + Ask Dope Title + Prompt Box + Category Pills
         * ═══════════════════════════════════════════════════════════ */}
        <div className="w-full flex flex-col items-center pt-2 pb-1">
          {/* Centered Crown & Ask Dope Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center text-center mb-6 gap-2.5"
          >
            <img
              src={crownLogo}
              alt="dopamint crown"
              className="w-13 h-13 sm:w-15 sm:h-15 object-contain filter drop-shadow-sm flex-shrink-0"
            />
            <h1 className="font-serif text-[34px] sm:text-[42px] md:text-[46px] font-normal text-[#1A1A1A] dark:text-[#ECECEC] tracking-tight leading-tight">
              Ask Dope
            </h1>
          </motion.div>

          {/* Main Prompt Input Box Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="w-full max-w-[680px] bg-[var(--bg-card)] dark:bg-[#161616] rounded-[22px] border-2 border-[#364432] dark:border-[#52634C] hover:border-[#283325] dark:hover:border-[#6C8264] p-4 sm:p-5 shadow-md hover:shadow-lg focus-within:shadow-xl space-y-3 transition-all duration-200 focus-within:border-[#222B20] dark:focus-within:border-[#86A37C] relative"
          >
            {/* Attachments Preview Chips */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 pb-2 border-b border-[var(--border-color)] dark:border-[#262626]">
                {attachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[var(--bg-app)] dark:bg-[#1C1C1C] border border-[var(--border-color)] dark:border-[#262626] rounded-xl text-xs text-[#1A1A1A] dark:text-[#ECECEC]"
                  >
                    <Paperclip className="w-3 h-3 text-[#485442] dark:text-[#8A9E7F]" />
                    <span className="font-medium truncate max-w-[140px]">{att.name}</span>
                    <button
                      onClick={() => setAttachments((prev) => prev.filter((a) => a.id !== att.id))}
                      className="p-0.5 hover:text-red-500 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Text Area with Smooth Fade In-Out Animated Placeholder */}
            <div className="relative min-h-[38px] flex items-start">
              <AnimatePresence mode="wait">
                {!inputText && (
                  <motion.div
                    key={hintIndex}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    className="absolute inset-x-0 top-0 text-[15px] sm:text-[16px] text-[#6E7169] dark:text-[#777777] pointer-events-none select-none truncate leading-relaxed"
                  >
                    {PROMPT_HINTS[hintIndex]}
                  </motion.div>
                )}
              </AnimatePresence>

              <textarea
                ref={textareaRef}
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-[15px] sm:text-[16px] text-[#1A1A1A] dark:text-[#ECECEC] outline-none resize-none overflow-y-auto leading-relaxed min-h-[38px] max-h-[120px] relative z-10"
              />
            </div>

            {/* Action Controls Row */}
            <div className="flex items-center justify-between pt-1">
              {/* Left Button: Plus Attachment */}
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  multiple
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach File or Image"
                  className="w-7 h-7 rounded-full bg-transparent hover:bg-[var(--bg-hover)] dark:hover:bg-[#222] text-[#555] dark:text-[#AAA] border border-[#BCBAA6] dark:border-[#40453D] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Right Button: Olive Green Send Arrow Button (↑) */}
              <button
                onClick={() => handleSend()}
                title="Send (Enter)"
                className="w-8 h-8 rounded-full bg-[#485442] dark:bg-[#55604e] hover:opacity-90 text-white flex items-center justify-center shadow-button-primary cursor-pointer transition-all hover:scale-105"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </motion.div>

          {/* Category Navigation Pills (Trending, Stock, Pre-IPO, Crypto, Macro, Sentiment, Learn) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="w-full max-w-[680px] flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = cat.name === selectedCategory;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all duration-180 cursor-pointer flex-shrink-0 ${
                    isSelected
                      ? 'bg-[var(--bg-card)] dark:bg-[#161616] border border-[#485442] dark:border-[#8A9E7F] text-[#1A1A1A] dark:text-[#ECECEC] font-medium shadow-2xs'
                      : 'bg-[var(--bg-card)] dark:bg-[#161616] border border-[var(--border-color)] dark:border-[#262626] text-[#4F534C] dark:text-[#A0A0A0] hover:text-[#1A1A1A] dark:hover:text-white hover:border-[#485442]'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

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
         *  5. REFERRAL CALLOUT BANNER
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
         *  6. RECENT ACTIVITY LIST
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
