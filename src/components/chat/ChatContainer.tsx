import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { ChatHeader } from './ChatHeader';
import { MessageItem } from './MessageItem';
import { ChatInputArea } from './ChatInputArea';
import { WelcomeHeroSection } from './WelcomeHeroSection';

export const ChatContainer: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const activeId = useCryptoStore((s) => s.activeConversationId);
  const allMessages = useCryptoStore((s) => s.messages);
  const currentMessages = allMessages[activeId] || [];
  const isStreaming = useCryptoStore((s) => s.isStreaming);

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

  const isWelcomeScreen = currentMessages.length === 0;

  useEffect(() => {
    if (isWelcomeScreen) {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
      return;
    }

    if (!showScrollBottom && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentMessages.length, isStreaming, showScrollBottom, isWelcomeScreen]);

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

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-app)] relative overflow-hidden transition-colors duration-200">
      {/* Top Fixed Chat Header */}
      <ChatHeader />

      {/* Main Scrollable Message Stream or Welcome Hero Section */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={`flex-1 overflow-y-auto px-4 md:px-8 ${
          isWelcomeScreen ? 'pt-2 pb-8' : 'py-6'
        } scroll-smooth`}
      >
        <div className={`mx-auto w-full ${isWelcomeScreen ? 'max-w-[1000px]' : 'max-w-[820px]'}`}>
          {isWelcomeScreen ? (
            /* Reference Design Welcome Hero Section with Embedded Prompt Box, Tabs & Paginated Questions */
            <WelcomeHeroSection />
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
            className="absolute bottom-28 right-8 z-30 flex items-center gap-1.5 px-3 py-2 bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-full shadow-card hover:bg-[var(--bg-hover)] transition-all text-xs font-semibold cursor-pointer"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>Scroll to bottom</span>
            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[var(--primary)] text-white text-[10px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Chat Input Console (only when inside an active message thread) */}
      {!isWelcomeScreen && <ChatInputArea />}
    </div>
  );
};
