import React from 'react';
import { motion } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const DeleteModal: React.FC = () => {
  const isOpen = useCryptoStore((s) => s.isDeleteModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const targetChatId = useCryptoStore((s) => s.modalTargetChatId);
  const conversations = useCryptoStore((s) => s.conversations);
  const deleteConversation = useCryptoStore((s) => s.deleteConversation);

  const currentChat = conversations.find((c) => c.id === targetChatId);

  if (!isOpen || !currentChat) return null;

  const handleDelete = () => {
    deleteConversation(currentChat.id);
    setModalState('isDeleteModalOpen', false);
  };

  return (
    <div
      onClick={() => setModalState('isDeleteModalOpen', false)}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white rounded-3xl border border-[#ECECEC] shadow-flyout p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-50 text-red-500 rounded-xl">
              <Trash2 className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-[#111111]">Delete Chat?</h4>
          </div>
          <button
            onClick={() => setModalState('isDeleteModalOpen', false)}
            className="p-1 rounded-lg text-[#8E8E93] hover:text-[#111111]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#666666] leading-relaxed">
          Are you sure you want to delete <strong className="text-[#111111]">"{currentChat.title}"</strong>? This will remove all messages from your local history.
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={() => setModalState('isDeleteModalOpen', false)}
            className="px-3.5 py-2 text-xs font-semibold text-[#666666] hover:bg-[#F0F2F6] rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Delete Permanently
          </button>
        </div>
      </motion.div>
    </div>
  );
};
