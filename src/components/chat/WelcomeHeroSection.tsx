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
    icon: <Flame className="w-3.5 h-3.5 text-amber-500" />,
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
    icon: <TrendingUp className="w-3.5 h-3.5 text-blue-500" />,
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
    icon: <TreePine className="w-3.5 h-3.5 text-emerald-500" />,
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
    icon: <CircleDot className="w-3.5 h-3.5 text-amber-400" />,
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
    icon: <Globe className="w-3.5 h-3.5 text-indigo-400" />,
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
    icon: <Heart className="w-3.5 h-3.5 text-rose-400" />,
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
    icon: <BookOpen className="w-3.5 h-3.5 text-teal-400" />,
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
    <div className="w-full max-w-[760px] mx-auto py-8 md:py-12 px-3 sm:px-4 flex flex-col items-center select-none space-y-6">
      {/* 1. Top Centered Pill: Install Ask Dope App */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => {
          setShowInstallToast(true);
          setTimeout(() => setShowInstallToast(false), 3000);
        }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shadow-2xs group cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
        <span>Install Ask Dope App</span>
      </motion.button>

      {/* Install App Toast Notification */}
      <AnimatePresence>
        {showInstallToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="fixed top-6 z-50 px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-color)] shadow-flyout rounded-2xl text-xs font-semibold text-[var(--text-primary)] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            <span>dopamint is installed as a Progressive Web App (PWA). Add to Home Screen via browser menu!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero Title with Crown Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center gap-3 text-center"
      >
        <div className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 flex items-center justify-center">
          <img
            src={crownLogo}
            alt="dopamint crown"
            className="w-full h-full object-contain filter drop-shadow-sm"
          />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[var(--text-primary)] tracking-tight leading-none">
          Which Stock Or Crypto Today?
        </h1>
      </motion.div>

      {/* 3. Main Input Box Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="w-full bg-[var(--bg-app)] rounded-3xl border border-[var(--border-color)] p-4 sm:p-5 shadow-card space-y-3 transition-all focus-within:border-[var(--primary)] focus-within:ring-4 focus-within:ring-[var(--primary)]/10"
      >
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-2 border-b border-[var(--border-color)]">
            {attachments.map((att) => (
              <div
                key={att.id}
                className="flex items-center gap-1.5 px-3 py-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-primary)]"
              >
                <Paperclip className="w-3 h-3 text-[var(--primary)]" />
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
          className="w-full bg-transparent text-[15px] sm:text-[16px] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none resize-none overflow-y-auto leading-relaxed"
        />

        {/* Action Controls Row inside prompt card */}
        <div className="flex items-center justify-between pt-2">
          {/* Left Buttons: + , Fast dropdown , Brainstorm ideas */}
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
              className="w-8 h-8 rounded-full bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] border border-[var(--border-color)] flex items-center justify-center transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Model Selector Dropdown: Fast ▾ */}
            <div className="relative" ref={modelDropdownRef}>
              <button
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] rounded-xl text-xs font-semibold text-[var(--text-primary)] transition-colors shadow-2xs"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{selectedModel === 'dopamint-4o' ? 'Fast' : selectedModel === 'dopamint-DeepResearch' ? 'Deep' : 'Quant'}</span>
                <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
              </button>

              {isModelDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 p-1.5 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-flyout z-30 space-y-1">
                  <button
                    onClick={() => {
                      setSelectedModel('dopamint-4o');
                      setIsModelDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      selectedModel === 'dopamint-4o'
                        ? 'bg-[var(--primary-light)] text-[var(--primary)] font-bold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
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
                        ? 'bg-[var(--primary-light)] text-[var(--primary)] font-bold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-purple-500" />
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
                        ? 'bg-[var(--primary-light)] text-[var(--primary)] font-bold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CircleDot className="w-3.5 h-3.5 text-blue-500" />
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
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] rounded-xl text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shadow-2xs"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Brainstorm Ideas</span>
                <span className="sm:hidden">Ideas</span>
              </button>

              {isBrainstormOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 p-2 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-flyout z-30 space-y-1">
                  <div className="px-2.5 py-1 text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
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
                      className="w-full text-left px-2.5 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors leading-snug"
                    >
                      {idea}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Round Send Arrow Button (↑) */}
          <button
            onClick={handleSend}
            disabled={!inputText.trim() && attachments.length === 0}
            title="Send (Enter)"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              inputText.trim() || attachments.length > 0
                ? 'bg-[var(--primary)] text-white hover:opacity-90 shadow-button-primary cursor-pointer'
                : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] opacity-50 cursor-not-allowed'
            }`}
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-180 ${
                isSelected
                  ? 'bg-[var(--bg-app)] border border-[var(--border-color)] ring-1 ring-[var(--primary)]/30 text-[var(--text-primary)] font-bold shadow-2xs'
                  : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </motion.div>

      {/* 5. Suggestion Questions Card with Row Dividers & Pagination */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="w-full bg-[var(--bg-app)] rounded-3xl border border-[var(--border-color)] shadow-card overflow-hidden"
      >
        <div className="divide-y divide-[var(--border-color)]">
          {currentQuestions.map((q, index) => (
            <button
              key={index}
              onClick={() => sendMessage(q)}
              className="w-full flex items-center justify-between px-5 py-3.5 text-left text-xs sm:text-[13.5px] font-normal text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors group cursor-pointer"
            >
              <span className="truncate pr-4 leading-relaxed font-serif sm:font-sans">{q}</span>
              <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Bottom Pagination (< >) */}
        <div className="flex items-center justify-center py-2.5 border-t border-[var(--border-color)] bg-[var(--bg-app)]">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-2xs">
            <button
              onClick={handlePrevPage}
              title="Previous Page"
              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10.5px] font-medium text-[var(--text-muted)] px-1">
              {pageIndex + 1} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              title="Next Page"
              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
