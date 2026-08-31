import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
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
  Paperclip,
  X,
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
        'Which real-world asset (RWA) token protocols have the fastest TVL growth?',
        'Analyze liquidity pool APR sustainability across Uniswap and Aerodrome.',
        'What are the leading AI agent crypto protocols on Base and Solana?',
      ],
      [
        'How does Ethereum’s Dencun EIP-4844 affect blob fee economics on Arbitrum & Base?',
        'Compare Bittensor (TAO) subnets to Render Network GPU rendering compute.',
        'What is the historical correlation between Fed rate cuts and Bitcoin bull cycles?',
        'Explain restaking yields on EigenLayer and associated slashing risks.',
        'Which zero-knowledge rollup tokens are experiencing accelerating developer adoption?',
      ],
    ],
  },
  {
    name: 'Macro',
    icon: <Globe className="w-3.5 h-3.5 text-[#3B6678] dark:text-[#5F9AB3]" />,
    pages: [
      [
        'How will upcoming Federal Reserve FOMC rate decisions impact global equities?',
        'Explain the correlation between US 10-Year Treasury Yield and tech valuations.',
        'What is the current global M2 money supply trend and liquidity index?',
        'Analyze US national debt trajectory and long-term inflation implications.',
        'How does oil price volatility impact headline vs core CPI inflation?',
      ],
      [
        'Compare Bank of Japan yield curve control unwinding to European Central Bank policy.',
        'What are the economic ramifications of expanding BRICS trade settlement mechanisms?',
        'Explain how the US Dollar Index (DXY) strength inversely affects emerging markets.',
        'What are the leading indicators for recession risk according to the Treasury yield curve?',
        'How does commercial real estate debt maturity in 2025-2026 threaten regional banks?',
      ],
    ],
  },
  {
    name: 'Sentiment',
    icon: <Heart className="w-3.5 h-3.5 text-[#8A4A4A] dark:text-[#BF7373]" />,
    pages: [
      [
        'What is the current Crypto Fear & Greed Index score and historical context?',
        'Analyze social volume and sentiment momentum for leading Layer-1 tokens.',
        'How does retail investor positioning on Reddit compare to institutional 13F flows?',
        'What are derivatives funding rates signaling about leveraged long/short positions?',
        'Evaluate the Put/Call ratio on S&P 500 options for institutional hedging activity.',
      ],
      [
        'How do Bitcoin exchange net inflows and outflows correlate with market tops/bottoms?',
        'Analyze Google Trends search volume index for Bitcoin and AI terms.',
        'What is the current whale accumulation vs retail distribution ratio on chain?',
        'Explain how extreme funding rate spikes precede cascading liquidation wicks.',
        'Evaluate social sentiment dispersion on Twitter (X) around decentralized AI projects.',
      ],
    ],
  },
  {
    name: 'Learn',
    icon: <BookOpen className="w-3.5 h-3.5 text-[#635587] dark:text-[#9A87C7]" />,
    pages: [
      [
        'Explain Automated Market Makers (AMM) and impermanent loss for beginners.',
        'What is the difference between Proof of Work (PoW) and Proof of Stake (PoS)?',
        'How do Zero-Knowledge Proofs (ZK-SNARKs) enhance blockchain privacy and scaling?',
        'What is MEV (Maximal Extractable Value) and how does it affect DEX traders?',
        'How do Liquidity Staking Derivatives (LSDs) like stETH generate yield?',
      ],
      [
        'Explain the mechanics of decentralized stablecoins and algorithmic collateralization.',
        'What is account abstraction (ERC-4337) and how will it change crypto UX?',
        'How do oracle networks like Chainlink securely bring off-chain prices on chain?',
        'What are flash loans in DeFi and what are common arbitrage use cases?',
        'Explain smart contract reentrancy attacks and how audits prevent them.',
      ],
    ],
  },
];

export const WelcomeHeroSection: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Trending');
  const [pageIndex, setPageIndex] = useState(0);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = useCryptoStore((s) => s.sendMessage);
  const isStreaming = useCryptoStore((s) => s.isStreaming);

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

  return (
    <div className="w-full max-w-[760px] mx-auto pt-10 sm:pt-14 md:pt-18 pb-20 px-3 sm:px-4 flex flex-col items-center">
      {/* Top Header Group: Crown Image on Top Center + Ask Dope Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center text-center mb-8 sm:mb-10 gap-3"
      >
        <img
          src={crownLogo}
          alt="dopamint crown"
          className="w-13 h-13 sm:w-15 sm:h-15 md:w-16 md:h-16 object-contain filter drop-shadow-sm flex-shrink-0"
        />
        <h1 className="font-serif text-[34px] sm:text-[42px] md:text-[48px] font-normal text-[#1A1A1A] dark:text-[#ECECEC] tracking-tight leading-tight">
          Ask Dope
        </h1>
      </motion.div>

      {/* Main Lower Cards & Tabs Container */}
      <div className="w-full space-y-5">
        {/* 1. Main Input Box Card */}
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
            {/* Left Buttons: Plus Attach Button */}
            <div className="flex items-center gap-2">
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

        {/* 2. Category Pills Navigation Bar */}
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

        {/* 3. Suggestion Questions Card with Row Dividers & Clean Pagination */}
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

          {/* Bottom Pagination (< >) */}
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
