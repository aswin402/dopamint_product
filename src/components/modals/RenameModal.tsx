import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Modal, Button } from '../ui';
import { useCryptoStore } from '../../store/useCryptoStore';

export const RenameModal: React.FC = () => {
  const isOpen = useCryptoStore((s) => s.isRenameModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const targetChatId = useCryptoStore((s) => s.modalTargetChatId);
  const conversations = useCryptoStore((s) => s.conversations);
  const renameConversation = useCryptoStore((s) => s.renameConversation);

  const currentChat = conversations.find((c) => c.id === targetChatId);
  const [prevId, setPrevId] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  if (currentChat && currentChat.id !== prevId) {
    setPrevId(currentChat.id);
    setTitle(currentChat.title);
  }

  if (!currentChat) return null;

  const handleClose = () => {
    setModalState('isRenameModalOpen', false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      renameConversation(currentChat.id, title.trim());
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Rename Conversation"
      icon={<Pencil className="w-5 h-5 text-[#485442] dark:text-[#8A9E7F]" />}
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
            Conversation Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. BTC ETF Inflows Analysis"
            autoFocus
            className="w-full h-10 px-3.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#485442] dark:focus:border-[#8A9E7F] transition-colors"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-color)]">
          <Button variant="ghost" size="sm" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!title.trim()}>
            Save Title
          </Button>
        </div>
      </form>
    </Modal>
  );
};
