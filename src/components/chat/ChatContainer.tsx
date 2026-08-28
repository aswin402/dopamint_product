import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, MessageSquare, Zap, Shield, TrendingUp } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { ChatHeader } from './ChatHeader';
import { MessageItem } from './MessageItem';
import { ChatInputArea } from './ChatInputArea';

export const ChatContainer: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const activeId = useCryptoStore((s) => s.activeConversationId);
  const allMessages = useCryptoStore((s) => s.messages);
  const currentMessages = allMessages[activeId] || [];
  const isStreaming = useCryptoStore((s) => s.isStreaming);
  const sendMessage = useCryptoStore((s) => s.sendMessage);

  const scrollToBottom = useCallback((smooth: boolean = true) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
      setShowScrollBottom(false);
      setUnreadCount(0);
    }
  }, []);

  useEffect(() => {
    if (!showScrollBottom && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentMessages.length, isStreaming, showScrollBottom]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      if (distanceFromBottom > 150) {
        setShowScrollBottom(true);
      } else {
        setShowScrollBottom(false);
        setUnreadCount(0);
      }
    }
  };

  const starterPrompts = [
    {
      title: 'Explain Bitcoin halving',
      subtitle: 'Analyze 4-year cycle impact',
      icon: <Zap className="w-4 h-4 text-[#F97316]" />,
      prompt: 'Explain the Bitcoin Halving cycle, block reward reductions, and its historical market impacts.',
    },
    {
      title: 'Ethereum vs Solana L1',
      subtitle: 'Compare TPS, security & fees',
      icon: <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />,
      prompt: 'Can you compare Solana and Ethereum in terms of scalability, fees, and decentralization?',
    },
    {
      title: 'DeFi yield farming risks',
      subtitle: 'Impermanent loss & smart audits',
      icon: <Shield className="w-4 h-4 text-[#10B981]" />,
      prompt: 'What are the main risks in DeFi liquidity provision, impermanent loss, and smart contract audits?',
    },
    {
      title: 'Crypto tax implications',
      subtitle: 'VDA capital gains & 1% TDS',
      icon: <MessageSquare className="w-4 h-4 text-[#3B82F6]" />,
      prompt: 'How is cryptocurrency taxed in India under the latest Finance Act?',
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FFFFFF] relative overflow-hidden">
      {/* Top Fixed Chat Header */}
      <ChatHeader />

      {/* Main Scrollable Message Stream */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 md:px-8 py-6 scroll-smooth"
      >
        <div className="max-w-[820px] mx-auto w-full">
          {currentMessages.length === 0 ? (
            /* Empty State / Welcome Screen */
            <div className="py-12 md:py-20 text-center max-w-xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#5B5CEB] via-[#7B7CF6] to-[#9E9EFA] flex items-center justify-center mx-auto shadow-button-primary">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#111111] tracking-tight">
                  How can CryptoGPT help you today?
                </h3>
                <p className="text-sm text-[#666666] mt-2">
                  Ask about on-chain metrics, macro price forecasts, DeFi protocols, smart contract audits, or tax rules.
                </p>
              </div>

              {/* Starter Prompt Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-4">
                {starterPrompts.map((starter, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => sendMessage(starter.prompt)}
                    className="p-4 bg-[#F7F8FA] hover:bg-[#EEF0FD] border border-[#ECECEC] hover:border-[#5B5CEB]/30 rounded-2xl transition-all duration-200 text-left shadow-2xs group"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="p-1.5 bg-white rounded-lg border border-[#ECECEC] shadow-2xs">
                        {starter.icon}
                      </div>
                      <span className="font-semibold text-sm text-[#111111] group-hover:text-[#5B5CEB] transition-colors">
                        {starter.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#8E8E93] leading-relaxed pl-8">
                      {starter.subtitle}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            /* Message List */
            currentMessages.map((msg, index) => {
              const isLastAssistant =
                msg.role === 'assistant' && index === currentMessages.length - 1;
              return (
                <MessageItem
                  key={msg.id}
                  message={msg}
                  isLastAssistantMessage={isLastAssistant}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Floating Scroll to Bottom Button */}
      <AnimatePresence>
        {showScrollBottom && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            onClick={() => scrollToBottom(true)}
            className="absolute bottom-28 right-8 z-30 flex items-center gap-1.5 px-3 py-2 bg-white text-[#111111] border border-[#ECECEC] rounded-full shadow-card hover:bg-[#F7F8FA] transition-all text-xs font-semibold"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#5B5CEB]" />
            <span>Scroll to bottom</span>
            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#5B5CEB] text-white text-[10px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Chat Input Console */}
      <ChatInputArea />
    </div>
  );
};
