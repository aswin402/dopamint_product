import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Pencil } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const RenameModal: React.FC = () => {
  const isOpen = useCryptoStore((s) => s.isRenameModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const targetChatId = useCryptoStore((s) => s.modalTargetChatId);
  const conversations = useCryptoStore((s) => s.conversations);
  const renameConversation = useCryptoStore((s) => s.renameConversation);

  const currentChat = conversations.find((c) => c.id === targetChatId);
  const [title, setTitle] = useState(currentChat?.title || '');

  if (!isOpen || !currentChat) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      renameConversation(currentChat.id, title.trim());
      setModalState('isRenameModalOpen', false);
    }
  };

  return (
    <div
      onClick={() => setModalState('isRenameModalOpen', false)}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] shadow-flyout p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[var(--primary-light)] text-[var(--primary)] rounded-xl">
              <Pencil className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-[var(--text-primary)]">Rename Conversation</h4>
          </div>
          <button
            onClick={() => setModalState('isRenameModalOpen', false)}
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            defaultValue={currentChat.title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
            className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)]"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalState('isRenameModalOpen', false)}
              className="px-3.5 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--primary)] text-white text-xs font-semibold rounded-xl hover:opacity-90 shadow-button-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
