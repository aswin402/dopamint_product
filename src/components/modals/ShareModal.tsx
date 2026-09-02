import React, { useState } from 'react';
import { Share2, Copy, Check, Globe } from 'lucide-react';
import { Modal, Button } from '../ui';
import { useCryptoStore } from '../../store/useCryptoStore';

export const ShareModal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const isOpen = useCryptoStore((s) => s.isShareModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const activeId = useCryptoStore((s) => s.activeConversationId);
  const conversations = useCryptoStore((s) => s.conversations);
  const currentChat = conversations.find((c) => c.id === activeId);

  const handleClose = () => {
    setModalState('isShareModalOpen', false);
  };

  const shareUrl = `https://dopamint.ai/share/${activeId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Share Conversation"
      subtitle="Public web link for anyone to view"
      icon={<Share2 className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />}
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="p-3 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)] space-y-0.5">
          <span className="text-[11px] font-semibold text-[var(--text-muted)] block">
            Shared Topic
          </span>
          <p className="text-xs font-bold text-[var(--text-primary)] truncate">
            {currentChat?.title || 'What is Bitcoin?'}
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-muted)] block">
            Public Link
          </label>
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
            <Button
              variant="primary"
              size="sm"
              onClick={handleCopy}
              icon={
                copied ? (
                  <Check className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )
              }
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
