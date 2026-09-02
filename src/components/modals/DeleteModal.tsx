import React from 'react';
import { Trash2 } from 'lucide-react';
import { Modal, Button } from '../ui';
import { useCryptoStore } from '../../store/useCryptoStore';

export const DeleteModal: React.FC = () => {
  const isOpen = useCryptoStore((s) => s.isDeleteModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const targetChatId = useCryptoStore((s) => s.modalTargetChatId);
  const conversations = useCryptoStore((s) => s.conversations);
  const deleteConversation = useCryptoStore((s) => s.deleteConversation);

  const currentChat = conversations.find((c) => c.id === targetChatId);

  if (!currentChat) return null;

  const handleClose = () => {
    setModalState('isDeleteModalOpen', false);
  };

  const handleDelete = () => {
    deleteConversation(currentChat.id);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete Chat?"
      icon={<Trash2 className="w-4 h-4 text-red-500" />}
      maxWidth="max-w-sm"
    >
      <div className="space-y-4">
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Are you sure you want to delete{' '}
          <strong className="text-[var(--text-primary)] font-semibold">
            "{currentChat.title}"
          </strong>
          ? This will remove all messages from your local history.
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" size="sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white border-transparent"
          >
            Delete Permanently
          </Button>
        </div>
      </div>
    </Modal>
  );
};
