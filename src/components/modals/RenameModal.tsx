import React, { useState, useEffect } from 'react';
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
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (currentChat) {
      setTitle(currentChat.title);
    }
  }, [currentChat]);

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
      icon={<Pencil className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />}
      maxWidth="max-w-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
          className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[#485442] dark:focus:border-[#55604e] focus:ring-2 focus:ring-[#485442]/15"
          placeholder="Enter conversation title..."
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" size="sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
