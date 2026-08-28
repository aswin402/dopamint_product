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
} from 'lucide-react';
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
        <div className="max-w-[85%] md:max-w-[75%] bg-[#F0F2F6] hover:bg-[#EBEEF5] text-[#111111] px-5 py-3.5 rounded-[22px] rounded-br-sm text-[14.5px] leading-relaxed shadow-xs transition-colors">
          {message.content}

          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-[#E0E2E8] space-y-1.5">
              {message.attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 px-2.5 py-1.5 bg-white/70 rounded-xl text-xs text-[#333333]"
                >
                  <Paperclip className="w-3.5 h-3.5 text-[#5B5CEB]" />
                  <span className="font-medium truncate">{att.name}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[11px] text-[#8E8E93] select-none">
            <span>{message.createdAt}</span>
            <CheckCheck className="w-3.5 h-3.5 text-[#5B5CEB]" />
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
      className="flex items-start gap-4 my-6 group"
    >
      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5B5CEB] via-[#7B7CF6] to-[#9E9EFA] flex items-center justify-center flex-shrink-0 shadow-button-primary mt-1">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5 text-white"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21 16-9 5-9-5V8l9-5 9 5v8z" />
          <path d="M12 21V12" />
          <path d="M3.27 6.96 12 12.01l8.73-5.05" />
          <path d="M12 12 2.29 6.5" />
          <path d="m12 12 9.71-5.5" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        {message.thinkingSteps && <ThinkingAccordion steps={message.thinkingSteps} />}

        <div className="relative">
          <MarkdownContent content={message.content} />
          {isCurrentStreaming && (
            <span className="inline-block w-2 h-4 bg-[#5B5CEB] ml-1 align-middle animate-cursor" />
          )}
        </div>

        {message.keyPoints && <KeyPointsCard items={message.keyPoints} />}

        {message.priceSnapshot && <InlineCryptoCard snapshot={message.priceSnapshot} />}

        {!isCurrentStreaming && message.content && (
          <div className="flex items-center gap-1 mt-4 pt-1 text-[#8E8E93]">
            <button
              onClick={() => setMessageFeedback(message.id, 'liked')}
              title="Helpful"
              className={`p-1.5 rounded-lg transition-colors ${
                message.feedback === 'liked'
                  ? 'text-[#5B5CEB] bg-[#EEF0FD]'
                  : 'hover:text-[#111111] hover:bg-[#F0F2F6]'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${message.feedback === 'liked' ? 'fill-[#5B5CEB]' : ''}`} />
            </button>

            <button
              onClick={() => setMessageFeedback(message.id, 'disliked')}
              title="Not helpful"
              className={`p-1.5 rounded-lg transition-colors ${
                message.feedback === 'disliked'
                  ? 'text-red-500 bg-red-50'
                  : 'hover:text-[#111111] hover:bg-[#F0F2F6]'
              }`}
            >
              <ThumbsDown className={`w-4 h-4 ${message.feedback === 'disliked' ? 'fill-red-500' : ''}`} />
            </button>

            <button
              onClick={handleCopy}
              title="Copy message"
              className="p-1.5 rounded-lg hover:text-[#111111] hover:bg-[#F0F2F6] transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleSpeakToggle}
              title={isCurrentlySpeaking ? 'Stop audio' : 'Read aloud'}
              className={`p-1.5 rounded-lg transition-colors ${
                isCurrentlySpeaking
                  ? 'text-[#5B5CEB] bg-[#EEF0FD]'
                  : 'hover:text-[#111111] hover:bg-[#F0F2F6]'
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
              className="p-1.5 rounded-lg hover:text-[#111111] hover:bg-[#F0F2F6] transition-colors"
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
