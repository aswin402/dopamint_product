import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Plus,
  Zap,
  Lightbulb,
  ArrowUp,
  Flame,
  TrendingUp,
  TreePine,
  CircleDot,
  Globe,
  Heart,
  BookOpen,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Paperclip,
  X,
  Sparkles,
} from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import { useCryptoStore } from '../../store/useCryptoStore';
import type { Attachment } from '../../types/crypto';

type CategoryType = 'Trending' | 'Stock' | 'Pre-IPO' | 'Crypto' | 'Macro' | 'Sentiment' | 'Learn';

interface CategoryData {
  name: CategoryType;
  icon: React.ReactNode;
  pages: string[][];
}

const CATEGORIES: CategoryData[] = [
  {
    name: 'Trending',
    icon: <Flame className="w-3.5 h-3.5 text-[#A06C3E] dark:text-[#D4A373]" />,
    pages: [
      [
        'Which tokens have big unlocks coming up next week?',
        'Which semiconductor stocks have the most upside at current prices?',
        'Any defense or aerospace stocks worth buying given the current geopolitical situation?',
        'Any US stocks worth buying right now? Give me 5 solid picks.',
        'Any notable hedge fund moves or 13F filings worth paying attention to?',
      ],
      [
        'What are the top gainers across Layer-1 blockchains today?',
        'Analyze the impact of latest CPI inflation numbers on tech equities.',
        'Which Solana ecosystem tokens are experiencing the highest DEX volume?',
        'Compare Apple vs Microsoft AI infrastructure capital expenditure.',
        'What is driving the recent rally in gold and silver commodities?',
      ],
    ],
  },
  {
    name: 'Stock',
    icon: <TrendingUp className="w-3.5 h-3.5 text-[#486B52] dark:text-[#74A883]" />,
    pages: [
      [
        'Compare NVIDIA vs AMD data center GPU revenue and moat.',
        'What are the top 3 dividend aristocrat stocks with strong cash flow?',
        'Analyze Tesla (TSLA) robotaxi timeline and margin impact.',
        'Which cybersecurity companies have accelerating net retention rate?',
        'What is Berkshire Hathaway’s latest portfolio cash allocation?',
      ],
      [
        'Evaluate Amazon (AMZN) AWS cloud revenue growth acceleration.',
        'Which biotech companies have upcoming FDA Phase 3 trial catalysts?',
        'How does Meta’s Llama ecosystem monetisation compare to Google Cloud?',
        'What are the best small-cap value stocks trading below book value?',
        'Analyze the semiconductor equipment moat of ASML and Applied Materials.',
      ],
    ],
  },
  {
    name: 'Pre-IPO',
    icon: <TreePine className="w-3.5 h-3.5 text-[#3C784C] dark:text-[#67B57B]" />,
    pages: [
      [
        'What is the estimated secondary market valuation for OpenAI and Anthropic?',
        'Which fintech unicorns are expected to file for IPO in 2025-2026?',
        'Explain secondary share liquidation discounts in late-stage private rounds.',
        'How do SpaceX tender offers and Starlink revenue growth compare?',
        'What are the main risks of investing in pre-IPO equity through SPVs?',
      ],
      [
        'Analyze Databricks vs Snowflake valuation multiples and growth rate.',
        'How do Stripe’s payment volume metrics compare to Adyen and PayPal?',
        'What is the typical employee stock option lockup period post-IPO?',
        'Explain the mechanics of tender offers for private tech unicorns.',
        'Which AI hardware startups are raising funding at unicorn valuations?',
      ],
    ],
  },
  {
    name: 'Crypto',
    icon: <CircleDot className="w-3.5 h-3.5 text-[#94782A] dark:text-[#D4B257]" />,
    pages: [
      [
        'Explain the impact of institutional ETF inflows on Bitcoin supply dynamics.',
        'Compare Solana vs Ethereum L2s in active DEX volume and transaction fees.',
        'What are the highest conviction AI x Crypto infrastructure protocols?',
        'How does EigenLayer restaking yield and slashing mechanism work?',
        'What are the key technical resistance levels for Bitcoin at all-time highs?',
      ],
      [
        'What is the economic model behind Ethereum EIP-4844 blob storage?',
        'Analyze decentralized stablecoin yields across Aave, Maker, and Ethena.',
        'Which Real World Asset (RWA) tokenization protocols have highest TVL?',
        'Compare modular vs monolithic blockchain scalability trade-offs.',
        'How to identify smart money wallet accumulations on DEX screener.',
      ],
    ],
  },
  {
    name: 'Macro',
    icon: <Globe className="w-3.5 h-3.5 text-[#4E6791] dark:text-[#7C99CC]" />,
    pages: [
      [
        'How will Federal Reserve interest rate cuts affect high-beta crypto assets?',
        'Analyze the US dollar index (DXY) inverse correlation with risk assets.',
        'What is the current global liquidity cycle saying about commodities and gold?',
        'How does Japan’s yen carry trade unwind impact global equity markets?',
        'Explain the inverted yield curve normalization and historical recession lag.',
      ],
      [
        'What are the global M2 money supply trends and correlation with Bitcoin?',
        'How does US national debt refinancing impact Treasury bond yields?',
        'Analyze European Central Bank (ECB) rate policy vs the Federal Reserve.',
        'What are the macro tailwinds for nuclear energy and uranium commodities?',
        'Explain how quantitative tightening (QT) affects banking reserves.',
      ],
    ],
  },
  {
    name: 'Sentiment',
    icon: <Heart className="w-3.5 h-3.5 text-[#8A525B] dark:text-[#C47D88]" />,
    pages: [
      [
        'What does today’s Crypto Fear & Greed Index score indicate?',
        'Analyze retail options sentiment and put-call ratio in tech stocks.',
        'What are the top discussed tickers on Twitter/X and Reddit r/wallstreetbets?',
        'How are institutional futures positioning and CME open interest trending?',
        'Evaluate market sentiment divergence between Bitcoin spot and altcoins.',
      ],
      [
        'What is the Bitcoin funding rate indicating about perpetual market leverage?',
        'How to interpret the VIX volatility index for market bottom timing.',
        'Are institutional investors hedging downside risk using put options?',
        'What is the crypto social volume trend for Solana vs Ethereum?',
        'Analyze sentiment shifts across crypto venture capital investment rounds.',
      ],
    ],
  },
  {
    name: 'Learn',
    icon: <BookOpen className="w-3.5 h-3.5 text-[#446E6B] dark:text-[#6EA8A4]" />,
    pages: [
      [
        'What is Impermanent Loss in Automated Market Makers (AMM)?',
        'How to read orderbook depth, slippage, and liquidity clusters.',
        'Explain Proof of Stake validator slashing and staking economics.',
        'What is the difference between Layer 1, Optimistic Rollups, and ZK-Rollups?',
        'How do algorithmic market makers prevent front-running and MEV?',
      ],
      [
        'Explain the Black-Scholes options pricing model in simple terms.',
        'What is the Sharpe Ratio and how to calculate portfolio risk-adjusted return?',
        'How do zero-knowledge proofs enable private verified transactions?',
        'What is a Dollar-Cost Averaging (DCA) strategy with dynamic rebalancing?',
        'Explain smart contract reentrancy attacks and how audits prevent them.',
      ],
    ],
  },
];

export const WelcomeHeroSection: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Trending');
  const [pageIndex, setPageIndex] = useState(0);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isBrainstormOpen, setIsBrainstormOpen] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showInstallToast, setShowInstallToast] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);
  const brainstormRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCryptoStore((s) => s.sendMessage);
  const isStreaming = useCryptoStore((s) => s.isStreaming);
  const selectedModel = useCryptoStore((s) => s.selectedModel);
  const setSelectedModel = useCryptoStore((s) => s.setSelectedModel);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(e.target as Node)) {
        setIsModelDropdownOpen(false);
      }
      if (brainstormRef.current && !brainstormRef.current.contains(e.target as Node)) {
        setIsBrainstormOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [inputText]);

  const activeCategoryData = CATEGORIES.find((c) => c.name === selectedCategory) || CATEGORIES[0];
  const totalPages = activeCategoryData.pages.length;
  const currentQuestions = activeCategoryData.pages[pageIndex] || activeCategoryData.pages[0];

  const handleCategoryChange = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setPageIndex(0);
  };

  const handleNextPage = () => {
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleSend = () => {
    if ((!inputText.trim() && attachments.length === 0) || isStreaming) return;
    sendMessage(inputText.trim() || 'Analyze market data', attachments);
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

  const brainstormIdeas = [
    'Analyze Bitcoin cycle top indicators and risk metrics',
    'Compare top Layer 2 rollup fee burns and active addresses',
    'Evaluate semiconductor supply chain bottleneck risks in 2025',
    'Find undervalued DeFi protocols with high fee-to-market-cap ratio',
    'Simulate a 60/40 crypto and equity risk-parity portfolio',
  ];

  return (
    <div className="w-full max-w-[760px] mx-auto pt-1 pb-16 px-3 sm:px-4 flex flex-col items-center">
      {/* Top Header Group: Pill & Ask Dope Title (Shifted Top) */}
      <div className="flex flex-col items-center space-y-2 mb-8 sm:mb-10">
        {/* 1. Top Centered Pill: Install Ask Dope App */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => {
            setShowInstallToast(true);
            setTimeout(() => setShowInstallToast(false), 3000);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[var(--bg-card)] dark:bg-[#161616] border border-[var(--border-color)] dark:border-[#262626] rounded-full text-xs font-normal text-[#555850] dark:text-[#A0A0A0] hover:text-[#1A1A1A] dark:hover:text-white transition-all shadow-2xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#7A7D75] dark:text-[#888]" />
          <span>Install Ask Dope App</span>
        </motion.button>

        {/* 2. Hero Title with Crown Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center gap-3 text-center pt-0.5"
        >
          <img
            src={crownLogo}
            alt="dopamint crown"
            className="w-10 h-10 md:w-11 md:h-11 object-contain filter drop-shadow-xs flex-shrink-0"
          />
          <h1 className="font-serif text-[32px] sm:text-[38px] md:text-[44px] font-normal text-[#1A1A1A] dark:text-[#ECECEC] tracking-tight leading-none">
            Ask Dope
          </h1>
        </motion.div>
      </div>

      {/* Install App Toast Notification */}
      <AnimatePresence>
        {showInstallToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="fixed top-6 z-50 px-4 py-2 bg-[var(--bg-card)] dark:bg-[#161616] border border-[var(--border-color)] dark:border-[#262626] shadow-flyout rounded-2xl text-xs font-semibold text-[#1A1A1A] dark:text-[#ECECEC] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />
            <span>dopamint is installed as a Progressive Web App (PWA). Add to Home Screen via browser menu!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Lower Cards & Tabs Container */}
      <div className="w-full space-y-5">
        {/* 3. Main Input Box Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="w-full bg-[var(--bg-card)] dark:bg-[#161616] rounded-[22px] border border-[var(--border-color)] dark:border-[#262626] p-4 sm:p-5 shadow-card space-y-3 transition-all focus-within:border-[#485442] dark:focus-within:border-[#55604e]"
        >
        {/* Attachments Preview */}
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

        {/* Text Input Area */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about stock, crypto and more."
          className="w-full bg-transparent text-[15px] sm:text-[16px] text-[#1A1A1A] dark:text-[#ECECEC] placeholder-[#6E7169] dark:placeholder-[#666666] outline-none resize-none overflow-y-auto leading-relaxed"
        />

        {/* Action Controls Row inside prompt card */}
        <div className="flex items-center justify-between pt-2">
          {/* Left Buttons: + , Fast ▾ , Brainstorm ideas */}
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              multiple
            />

            {/* Plus Attach Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Attach File or Image"
              className="w-7 h-7 rounded-full bg-transparent hover:bg-[var(--bg-hover)] dark:hover:bg-[#222] text-[#555] dark:text-[#AAA] border border-[#D5D2BE] dark:border-[#333] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Model Selector Dropdown: Fast ▾ */}
            <div className="relative" ref={modelDropdownRef}>
              <button
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#333] dark:text-[#DDD] hover:bg-[var(--bg-hover)] dark:hover:bg-[#222] rounded-lg transition-colors cursor-pointer font-medium"
              >
                <Zap className="w-3.5 h-3.5 text-[#333] dark:text-[#DDD]" />
                <span>{selectedModel === 'dopamint-4o' ? 'Fast' : selectedModel === 'dopamint-DeepResearch' ? 'Deep' : 'Quant'}</span>
                <ChevronDown className="w-3 h-3 text-[#777] dark:text-[#999]" />
              </button>

              {isModelDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 p-1.5 bg-[var(--bg-card)] dark:bg-[#161616] rounded-2xl border border-[var(--border-color)] dark:border-[#262626] shadow-flyout z-30 space-y-1">
                  <button
                    onClick={() => {
                      setSelectedModel('dopamint-4o');
                      setIsModelDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      selectedModel === 'dopamint-4o'
                        ? 'bg-[var(--primary-light)] dark:bg-[#20261D] text-[#485442] dark:text-[#8A9E7F] font-bold'
                        : 'text-[#555850] dark:text-[#A0A0A0] hover:bg-[var(--bg-hover)] dark:hover:bg-[#222]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Fast (dopamint-4o)</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedModel('dopamint-DeepResearch');
                      setIsModelDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      selectedModel === 'dopamint-DeepResearch'
                        ? 'bg-[var(--primary-light)] dark:bg-[#20261D] text-[#485442] dark:text-[#8A9E7F] font-bold'
                        : 'text-[#555850] dark:text-[#A0A0A0] hover:bg-[var(--bg-hover)] dark:hover:bg-[#222]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Deep Research</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedModel('QuantAlpha-3');
                      setIsModelDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      selectedModel === 'QuantAlpha-3'
                        ? 'bg-[var(--primary-light)] dark:bg-[#20261D] text-[#485442] dark:text-[#8A9E7F] font-bold'
                        : 'text-[#555850] dark:text-[#A0A0A0] hover:bg-[var(--bg-hover)] dark:hover:bg-[#222]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CircleDot className="w-3.5 h-3.5" />
                      <span>QuantAlpha-3</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Brainstorm Ideas Button */}
            <div className="relative" ref={brainstormRef}>
              <button
                onClick={() => setIsBrainstormOpen(!isBrainstormOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#555850] dark:text-[#A0A0A0] hover:bg-[var(--bg-hover)] dark:hover:bg-[#222] rounded-lg transition-colors cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-[#666] dark:text-[#AAA]" />
                <span className="hidden sm:inline">Brainstorm Ideas</span>
                <span className="sm:hidden">Ideas</span>
              </button>

              {isBrainstormOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 p-2 bg-[var(--bg-card)] dark:bg-[#161616] rounded-2xl border border-[var(--border-color)] dark:border-[#262626] shadow-flyout z-30 space-y-1">
                  <div className="px-2.5 py-1 text-[11px] font-bold text-[#7A7D75] dark:text-[#888] uppercase tracking-wider">
                    Idea Starters
                  </div>
                  {brainstormIdeas.map((idea, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputText(idea);
                        setIsBrainstormOpen(false);
                        textareaRef.current?.focus();
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-[#555850] dark:text-[#A0A0A0] hover:text-[#1A1A1A] dark:hover:text-white hover:bg-[var(--bg-hover)] dark:hover:bg-[#222] rounded-xl transition-colors leading-snug cursor-pointer"
                    >
                      {idea}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Round Dark Olive Send Arrow Button (↑) */}
          <button
            onClick={handleSend}
            title="Send (Enter)"
            className="w-8 h-8 rounded-full bg-[#485442] dark:bg-[#55604e] hover:opacity-90 text-white flex items-center justify-center shadow-button-primary cursor-pointer transition-opacity"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </motion.div>

      {/* 4. Category Pills Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="w-full flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar"
      >
        {CATEGORIES.map((cat) => {
          const isSelected = cat.name === selectedCategory;
          return (
            <button
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all duration-180 cursor-pointer ${
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

      {/* 5. Suggestion Questions Card with Row Dividers & Clean Pagination */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="w-full bg-[var(--bg-card)] dark:bg-[#161616] rounded-[22px] border border-[var(--border-color)] dark:border-[#262626] shadow-card overflow-hidden"
      >
        <div className="divide-y divide-[var(--border-color)] dark:divide-[#232323]">
          {currentQuestions.map((q, index) => (
            <button
              key={index}
              onClick={() => sendMessage(q)}
              className="w-full flex items-center justify-between px-6 py-3.5 text-left text-[14.5px] text-[#222222] dark:text-[#ECECEC] hover:bg-[var(--bg-hover)] dark:hover:bg-[#1E1E1E] transition-colors group cursor-pointer"
            >
              <span className="truncate pr-4 leading-relaxed font-normal">{q}</span>
              <ArrowUpRight className="w-4 h-4 text-[#7A7D75] group-hover:text-[#111] dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Bottom Pagination (< >) Matching Image 1 */}
        <div className="flex items-center justify-center py-3 border-t border-[var(--border-color)] dark:border-[#232323] bg-[var(--bg-card)] dark:bg-[#161616]">
          <div className="inline-flex items-center bg-[#FAF9F2] dark:bg-[#1A1A1A] border border-[#DDD9C7] dark:border-[#2C2C2C] rounded-lg overflow-hidden shadow-2xs">
            <button
              onClick={handlePrevPage}
              title="Previous Page"
              className="px-2 py-1 text-[#666] dark:text-[#AAA] hover:bg-[var(--bg-hover)] dark:hover:bg-[#222] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div className="w-[1px] h-3.5 bg-[#DDD9C7] dark:bg-[#2C2C2C]" />
            <button
              onClick={handleNextPage}
              title="Next Page"
              className="px-2 py-1 text-[#666] dark:text-[#AAA] hover:bg-[var(--bg-hover)] dark:hover:bg-[#222] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};
