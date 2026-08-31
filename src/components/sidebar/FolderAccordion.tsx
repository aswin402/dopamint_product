import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Plus,
  MoreHorizontal,
  Edit2,
  Trash2,
  FolderOpen,
} from 'lucide-react';
import type { Folder, Conversation } from '../../types/crypto';
import { ConversationItem } from './ConversationItem';
import { FolderIconRenderer } from '../common/FolderIconRenderer';
import { useCryptoStore } from '../../store/useCryptoStore';
import { useNavigate } from 'react-router-dom';

interface FolderAccordionProps {
  folder: Folder;
  conversations: Conversation[];
}

export const FolderAccordion: React.FC<FolderAccordionProps> = ({
  folder,
  conversations,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const createNewChat = useCryptoStore((s) => s.createNewChat);
  const openEditFolderModal = useCryptoStore((s) => s.openEditFolderModal);
  const deleteFolder = useCryptoStore((s) => s.deleteFolder);

  const handleCreateChatInFolder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newId = createNewChat(undefined, folder.id);
    navigate(`/c/${newId}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    openEditFolderModal(folder.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    if (window.confirm(`Delete folder "${folder.name}"? Conversations will be kept.`)) {
      deleteFolder(folder.id, false);
    }
  };

  return (
    <div className="mb-2 last:mb-0">
      {/* Folder Header Row */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer select-none"
      >
        <div className="flex items-center gap-2 min-w-0">
          <ChevronRight
            className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${
              isOpen ? 'rotate-90 text-[var(--text-primary)]' : ''
            }`}
          />
          <FolderIconRenderer iconName={folder.icon} className="w-3.5 h-3.5 text-[var(--primary)]" />
          <span className="text-xs font-bold truncate text-[var(--text-primary)]">
            {folder.name}
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[var(--bg-app)] text-[var(--text-muted)] rounded-md border border-[var(--border-color)]">
            {conversations.length}
          </span>
        </div>

        {/* Hover Actions (+ Chat, ... Menu) */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCreateChatInFolder}
            title={`New Chat in ${folder.name}`}
            className="p-1 rounded-lg hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              title="Folder Options"
              className="p-1 rounded-lg hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>

            {/* Folder Dropdown Menu */}
            <AnimatePresence>
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    className="absolute right-0 top-6 z-50 w-36 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-flyout p-1 text-xs space-y-0.5"
                  >
                    <button
                      onClick={handleEdit}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left hover:bg-[var(--bg-hover)] text-[var(--text-primary)] transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3 text-[var(--primary)]" />
                      <span>Edit Folder</span>
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left hover:bg-red-500/10 text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Accordion Content (List of Conversations) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden pl-3.5 border-l border-[var(--border-color)] ml-3 mt-1 space-y-0.5"
          >
            {conversations.length === 0 ? (
              <div className="py-2 px-2 text-[11px] text-[var(--text-muted)] italic flex items-center gap-1.5">
                <FolderOpen className="w-3 h-3" />
                <span>No chats in this folder yet</span>
              </div>
            ) : (
              conversations.map((conv) => (
                <ConversationItem key={conv.id} conversation={conv} />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
