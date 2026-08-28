import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  Volume2,
  VolumeX,
  RotateCw,
  CheckCheck,
  Paperclip,
  Radio,
} from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import type { Message } from '../../types/crypto';
import { useCryptoStore } from '../../store/useCryptoStore';
import { MarkdownContent } from './MarkdownContent';
import { KeyPointsCard } from './KeyPointsCard';
import { ThinkingAccordion } from './ThinkingAccordion';
import { InlineCryptoCard } from './InlineCryptoCard';
import { SuggestedPrompts } from './SuggestedPrompts';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';

interface MessageItemProps {
  message: Message;
  isLastAssistantMessage: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, isLastAssistantMessage }) => {
  const [copied, setCopied] = useState(false);
  const setMessageFeedback = useCryptoStore((s) => s.setMessageFeedback);
  const regenerateResponse = useCryptoStore((s) => s.regenerateResponse);
  const isStreaming = useCryptoStore((s) => s.isStreaming);
  const streamingMessageId = useCryptoStore((s) => s.streamingMessageId);
  const openSourceInPanel = useCryptoStore((s) => s.openSourceInPanel);

  const isCurrentStreaming = isStreaming && streamingMessageId === message.id;
  const { speak, stop, isPlaying, activeMessageId } = useTextToSpeech();
  const isCurrentlySpeaking = isPlaying && activeMessageId === message.id;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeakToggle = () => {
    if (isCurrentlySpeaking) {
      stop();
    } else {
      speak(message.content, message.id);
    }
  };

  if (message.role === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-end my-4"
      >
        <div className="max-w-[85%] md:max-w-[75%] bg-[var(--bg-chat-user)] hover:brightness-95 text-[var(--text-primary)] px-5 py-3.5 rounded-[22px] rounded-br-sm text-[14.5px] leading-relaxed shadow-xs transition-all border border-[var(--border-color)]">
          {message.content}

          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-[var(--border-color)] space-y-1.5">
              {message.attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 px-2.5 py-1.5 bg-[var(--bg-card)] rounded-xl text-xs text-[var(--text-secondary)] border border-[var(--border-color)]"
                >
                  <Paperclip className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span className="font-medium truncate">{att.name}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[11px] text-[var(--text-muted)]">
            <span>{message.createdAt}</span>
            <CheckCheck className="w-3.5 h-3.5 text-[var(--primary)]" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="flex items-start gap-3.5 md:gap-4 my-6 group"
    >
      {/* dopamint Crown Assistant Avatar */}
      <div className="w-9 h-9 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 p-1 shadow-2xs mt-1">
        <img
          src={crownLogo}
          alt="dopamint"
          className="w-full h-full object-contain filter drop-shadow-xs"
        />
      </div>

      <div className="flex-1 min-w-0">
        {message.thinkingSteps && <ThinkingAccordion steps={message.thinkingSteps} />}

        {/* Perplexity-style Minimal Verified Sources Header */}
        {!isCurrentStreaming && message.role === 'assistant' && (
          <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto no-scrollbar flex-wrap">
            <button
              onClick={() => openSourceInPanel(null)}
              title="View all verified sources"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer shadow-2xs group"
            >
              <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
              <span>Verified Sources</span>
              <span className="text-[10px] font-mono px-1 py-0.2 bg-[var(--bg-card)] rounded border border-[var(--border-color)] font-bold text-[var(--text-muted)] group-hover:text-[var(--primary)]">
                3
              </span>
            </button>

            {[
              { label: 'base.org', id: '1' },
              { label: 'coingecko.com', id: '2' },
              { label: 'sec.gov', id: '3' },
            ].map((src) => (
              <button
                key={src.id}
                onClick={() => openSourceInPanel(src.label)}
                title={`Filter sources to ${src.label}`}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[var(--bg-app)]/70 hover:bg-[var(--bg-hover)] border border-[var(--border-color)]/70 text-[10.5px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
              >
                <span className="text-[9.5px] font-bold text-[var(--primary)]">{src.id}</span>
                <span>{src.label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="relative">
          <MarkdownContent content={message.content} />
          {isCurrentStreaming && (
            <span className="inline-block w-2 h-4 bg-[var(--primary)] ml-1 align-middle animate-cursor" />
          )}
        </div>

        {message.keyPoints && <KeyPointsCard items={message.keyPoints} />}

        {message.priceSnapshot && <InlineCryptoCard snapshot={message.priceSnapshot} />}

        {!isCurrentStreaming && message.content && (
          <div className="flex items-center gap-1 mt-4 pt-1 text-[var(--text-muted)]">
            <button
              onClick={() => setMessageFeedback(message.id, 'liked')}
              title="Helpful"
              className={`p-1.5 rounded-lg transition-colors ${
                message.feedback === 'liked'
                  ? 'text-[var(--primary)] bg-[var(--primary-light)]'
                  : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${message.feedback === 'liked' ? 'fill-[var(--primary)]' : ''}`} />
            </button>

            <button
              onClick={() => setMessageFeedback(message.id, 'disliked')}
              title="Not helpful"
              className={`p-1.5 rounded-lg transition-colors ${
                message.feedback === 'disliked'
                  ? 'text-red-500 bg-red-500/10'
                  : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              <ThumbsDown className={`w-4 h-4 ${message.feedback === 'disliked' ? 'fill-red-500' : ''}`} />
            </button>

            <button
              onClick={handleCopy}
              title="Copy message"
              className="p-1.5 rounded-lg hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleSpeakToggle}
              title={isCurrentlySpeaking ? 'Stop audio' : 'Read aloud'}
              className={`p-1.5 rounded-lg transition-colors ${
                isCurrentlySpeaking
                  ? 'text-[var(--primary)] bg-[var(--primary-light)]'
                  : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              {isCurrentlySpeaking ? (
                <VolumeX className="w-4 h-4 animate-pulse" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => regenerateResponse(message.id)}
              title="Regenerate response"
              className="p-1.5 rounded-lg hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        )}

        {isLastAssistantMessage && message.suggestedFollowUps && (
          <SuggestedPrompts prompts={message.suggestedFollowUps} />
        )}
      </div>
    </motion.div>
  );
};
