import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Pin,
  Pencil,
  Trash2,
  Copy,
  TrendingUp,
  Wallet,
  Layers,
  FileText,
  CircleDot,
  Check,
  Folder,
  X,
  MoreHorizontal,
  ChevronRight,
} from 'lucide-react';
import type { Conversation } from '../../types/crypto';
import { useCryptoStore } from '../../store/useCryptoStore';
import { FolderIconRenderer } from '../common/FolderIconRenderer';
import { TokenIcon } from '../common/TokenIcon';

interface ConversationItemProps {
  conversation: Conversation;
  isActive?: boolean;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFolderPicker, setShowFolderPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const setActiveConversation = useCryptoStore((s) => s.setActiveConversation);
  const togglePin = useCryptoStore((s) => s.togglePinConversation);
  const duplicateChat = useCryptoStore((s) => s.duplicateConversation);
  const openRenameModal = useCryptoStore((s) => s.openRenameModal);
  const openDeleteModal = useCryptoStore((s) => s.openDeleteModal);
  const folders = useCryptoStore((s) => s.folders);
  const moveConversationToFolder = useCryptoStore((s) => s.moveConversationToFolder);

  const renderTimestamp = () => {
    try {
      const d = new Date(conversation.updatedAt);
      if (conversation.group === 'today' || conversation.group === 'yesterday') {
        return d.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
      }
      return d.toLocaleDateString('en-US', { weekday: 'short' });
    } catch {
      return '';
    }
  };

  const renderIcon = () => {
    switch (conversation.iconName) {
      case 'bitcoin':
        return <TokenIcon symbol="BTC" size={20} />;
      case 'ethereum':
        return <TokenIcon symbol="ETH" size={20} />;
      case 'defi':
        return <TokenIcon symbol="AERO" size={20} />;
      case 'staking':
        return (
          <div className="w-5 h-5 rounded-full bg-[#ECFDF5] dark:bg-[#133327] flex items-center justify-center flex-shrink-0 text-[#10B981]">
            <CircleDot className="w-3.5 h-3.5" />
          </div>
        );
      case 'solana':
        return <TokenIcon symbol="SOL" size={20} />;
      case 'tax':
        return (
          <div className="w-5 h-5 rounded-full bg-[var(--bg-app)] flex items-center justify-center flex-shrink-0 text-[var(--text-secondary)] border border-[var(--border-color)]">
            <FileText className="w-3 h-3" />
          </div>
        );
      case 'wallet':
        return (
          <div className="w-5 h-5 rounded-full bg-[#F5F3FF] dark:bg-[#2c1c3f] flex items-center justify-center flex-shrink-0 text-[#7C3AED]">
            <Wallet className="w-3 h-3" />
          </div>
        );
      case 'trending':
        return (
          <div className="w-5 h-5 rounded-full bg-[#ECFDF5] dark:bg-[#133327] flex items-center justify-center flex-shrink-0 text-[#10B981]">
            <TrendingUp className="w-3 h-3" />
          </div>
        );
      case 'layers':
        return (
          <div className="w-5 h-5 rounded-full bg-[var(--primary-light)] flex items-center justify-center flex-shrink-0 text-[var(--primary)]">
            <Layers className="w-3 h-3" />
          </div>
        );
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-[var(--primary-light)] flex items-center justify-center flex-shrink-0 text-[var(--primary)]">
            <CircleDot className="w-3 h-3" />
          </div>
        );
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateChat(conversation.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleOpenMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showMenu && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const sidebarEl = buttonRef.current.closest('aside');
      const sidebarRight = sidebarEl ? sidebarEl.getBoundingClientRect().right : rect.right + 10;

      const menuWidth = 208; // w-52
      let left = sidebarRight + 8;
      // If narrow screen, align left of button inside viewport
      if (left + menuWidth > window.innerWidth - 12) {
        left = Math.max(12, rect.right - menuWidth);
      }

      let top = rect.top - 4;
      const estimatedHeight = 240;
      if (top + estimatedHeight > window.innerHeight - 16) {
        top = Math.max(16, window.innerHeight - estimatedHeight - 16);
      }

      setMenuPosition({ top, left });
      setShowFolderPicker(false);
      setShowMenu(true);
    } else {
      setShowMenu(false);
      setShowFolderPicker(false);
    }
  };

  useEffect(() => {
    if (!showMenu) return;

    const handleClose = () => {
      setShowMenu(false);
      setShowFolderPicker(false);
    };

    window.addEventListener('scroll', handleClose, true);
    window.addEventListener('resize', handleClose);
    return () => {
      window.removeEventListener('scroll', handleClose, true);
      window.removeEventListener('resize', handleClose);
    };
  }, [showMenu]);

  return (
    <>
      <motion.div
        layout
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (!showMenu) setShowFolderPicker(false);
        }}
        onClick={() => {
          setActiveConversation(conversation.id);
          navigate(`/c/${conversation.id}`);
        }}
        className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-180 cursor-pointer ${
          isActive
            ? 'bg-[var(--primary-light)] text-[var(--text-primary)] font-semibold shadow-xs'
            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
          {renderIcon()}
          <span className="truncate text-[13.5px] tracking-tight">{conversation.title}</span>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {!isHovered && !showMenu ? (
            <div className="flex items-center gap-1">
              {conversation.isPinned && (
                <Pin className="w-3 h-3 text-[var(--primary)] fill-[var(--primary)]" />
              )}
              <span className="text-[11.5px] text-[var(--text-muted)] font-normal">
                {renderTimestamp()}
              </span>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-0.5"
            >
              {/* 1. Pin button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(conversation.id);
                }}
                title={conversation.isPinned ? 'Unpin conversation' : 'Pin conversation'}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  conversation.isPinned
                    ? 'text-[var(--primary)] hover:bg-[var(--primary-light)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <Pin className={`w-3.5 h-3.5 ${conversation.isPinned ? 'fill-[var(--primary)]' : ''}`} />
              </button>

              {/* 2. Three Dots button */}
              <button
                ref={buttonRef}
                onClick={handleOpenMenu}
                title="More options"
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  showMenu
                    ? 'text-[var(--text-primary)] bg-[var(--bg-hover)] ring-1 ring-[var(--border-color)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Action Dropdown Menu rendered in Portal to document.body (Outside the sidebar) */}
      {showMenu &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
                setShowFolderPicker(false);
              }}
            />
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                top: `${menuPosition.top}px`,
                left: `${menuPosition.left}px`,
              }}
              className="fixed z-[9999] w-52 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-xl p-1.5 text-xs space-y-0.5 animate-in fade-in zoom-in-95 duration-100"
            >
              {/* Rename */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  openRenameModal(conversation.id);
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span>Rename</span>
              </button>

              {/* Move to Folder */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFolderPicker((prev) => !prev);
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Folder className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  <span>Move to folder</span>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-150 ${
                    showFolderPicker ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {/* Folder sub-list */}
              {showFolderPicker && (
                <div className="pl-3 pr-1 py-1 space-y-0.5 border-l-2 border-[var(--border-color)] my-1 ml-2 max-h-40 overflow-y-auto">
                  {folders.length === 0 ? (
                    <span className="block px-2 py-1 text-[10px] text-[var(--text-muted)] italic">
                      No folders created
                    </span>
                  ) : (
                    folders.map((f) => (
                      <button
                        key={f.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveConversationToFolder(conversation.id, f.id);
                          setShowMenu(false);
                          setShowFolderPicker(false);
                        }}
                        className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-[11px] text-left transition-colors cursor-pointer ${
                          conversation.folderId === f.id
                            ? 'bg-[var(--primary-light)] text-[var(--primary)] font-bold'
                            : 'hover:bg-[var(--bg-hover)] text-[var(--text-primary)]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <FolderIconRenderer
                            iconName={f.icon}
                            className="w-3 h-3 text-[var(--primary)] flex-shrink-0"
                          />
                          <span className="truncate">{f.name}</span>
                        </div>
                        {conversation.folderId === f.id && (
                          <Check className="w-3 h-3 flex-shrink-0 text-[var(--primary)]" />
                        )}
                      </button>
                    ))
                  )}
                  {conversation.folderId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveConversationToFolder(conversation.id, null);
                        setShowMenu(false);
                        setShowFolderPicker(false);
                      }}
                      className="w-full flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] text-left text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer border-t border-[var(--border-color)] mt-1 pt-1"
                    >
                      <X className="w-2.5 h-2.5" />
                      <span>Remove from folder</span>
                    </button>
                  )}
                </div>
              )}

              {/* Duplicate */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDuplicate(e);
                  setTimeout(() => setShowMenu(false), 500);
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                )}
                <span>{copied ? 'Duplicated!' : 'Duplicate'}</span>
              </button>

              <div className="my-1 border-t border-[var(--border-color)]" />

              {/* Delete */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  openDeleteModal(conversation.id);
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-left text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </>,
          document.body
        )}
    </>
  );
};
