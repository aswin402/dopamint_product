import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Share2, Copy, Check, Link, Globe } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const ShareModal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const isOpen = useCryptoStore((s) => s.isShareModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const activeId = useCryptoStore((s) => s.activeConversationId);
  const conversations = useCryptoStore((s) => s.conversations);
  const currentChat = conversations.find((c) => c.id === activeId);

  if (!isOpen) return null;

  const shareUrl = `https://cryptogpt.app/share/${activeId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => setModalState('isShareModalOpen', false)}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-3xl border border-[#ECECEC] shadow-flyout p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#EEF0FD] text-[#5B5CEB] rounded-2xl">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#111111] tracking-tight">
                Share Conversation
              </h3>
              <p className="text-xs text-[#8E8E93]">Generate a public read-only link</p>
            </div>
          </div>
          <button
            onClick={() => setModalState('isShareModalOpen', false)}
            className="p-1.5 rounded-xl text-[#8E8E93] hover:text-[#111111] hover:bg-[#F0F2F6]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-[#F7F8FA] border border-[#ECECEC] rounded-2xl">
          <p className="text-xs font-semibold text-[#111111] truncate">
            {currentChat?.title || 'What is Bitcoin?'}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-[#8E8E93] mt-1">
            <Globe className="w-3.5 h-3.5 text-green-500" />
            <span>Public link • Anyone with this link can view this thread</span>
          </div>
        </div>

        {/* Link box */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[#F7F8FA] border border-[#ECECEC] rounded-xl text-xs text-[#333333] font-mono truncate">
            <Link className="w-3.5 h-3.5 text-[#8E8E93] flex-shrink-0" />
            <span className="truncate">{shareUrl}</span>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-[#5B5CEB] text-white text-xs font-semibold rounded-xl hover:bg-[#4F50D9] transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
