import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Share2, Copy, Check, Globe } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const ShareModal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const isOpen = useCryptoStore((s) => s.isShareModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const activeId = useCryptoStore((s) => s.activeConversationId);
  const conversations = useCryptoStore((s) => s.conversations);
  const currentChat = conversations.find((c) => c.id === activeId);

  if (!isOpen) return null;

  const shareUrl = `https://dopamint.ai/share/${activeId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => setModalState('isShareModalOpen', false)}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] shadow-flyout p-6 space-y-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[var(--primary-light)] text-[var(--primary)] rounded-2xl">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[var(--text-primary)]">Share Conversation</h3>
              <p className="text-xs text-[var(--text-muted)]">Public web link for anyone to view</p>
            </div>
          </div>
          <button
            onClick={() => setModalState('isShareModalOpen', false)}
            className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)] space-y-1">
          <span className="text-[11px] font-semibold text-[var(--text-muted)] block">Shared Topic</span>
          <p className="text-xs font-bold text-[var(--text-primary)] truncate">
            {currentChat?.title || 'What is Bitcoin?'}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-[var(--text-muted)] block">Public Link</label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Globe className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-[var(--text-primary)] outline-none"
              />
            </div>
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 bg-[var(--primary)] hover:opacity-90 text-white font-semibold text-xs rounded-xl transition-all shadow-button-primary flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
