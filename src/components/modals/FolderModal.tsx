import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Folder, Sparkles } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

const COLOR_PRESETS = [
  { label: 'Indigo', hex: '#6366F1' },
  { label: 'Amber', hex: '#F59E0B' },
  { label: 'Emerald', hex: '#10B981' },
  { label: 'Pink', hex: '#EC4899' },
  { label: 'Purple', hex: '#8B5CF6' },
  { label: 'Blue', hex: '#3B82F6' },
  { label: 'Rose', hex: '#F43F5E' },
  { label: 'Cyan', hex: '#06B6D4' },
];

const EMOJI_PRESETS = ['📁', '💬', '🪙', '💻', '🎨', '📈', '🔬', '⚡', '🤖', '📚', '🎯', '🚀'];

const FolderModalContent: React.FC = () => {
  const editingFolderId = useCryptoStore((s) => s.editingFolderId);
  const folders = useCryptoStore((s) => s.folders);
  const createFolder = useCryptoStore((s) => s.createFolder);
  const renameFolder = useCryptoStore((s) => s.renameFolder);
  const closeFolderModal = useCryptoStore((s) => s.closeFolderModal);

  const editingFolder = folders.find((f) => f.id === editingFolderId);

  const [name, setName] = useState(editingFolder?.name || '');
  const [selectedEmoji, setSelectedEmoji] = useState(editingFolder?.icon || '📁');
  const [selectedColor, setSelectedColor] = useState(editingFolder?.color || '#6366F1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingFolderId) {
      renameFolder(editingFolderId, name.trim(), selectedEmoji, selectedColor);
    } else {
      createFolder(name.trim(), selectedEmoji, selectedColor);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeFolderModal}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
      />

      {/* Dialog Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-flyout p-6 text-[var(--text-primary)] z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center text-sm font-bold">
              {selectedEmoji}
            </div>
            <h2 className="text-base font-bold">
              {editingFolderId ? 'Edit Folder' : 'Create New Folder'}
            </h2>
          </div>
          <button
            onClick={closeFolderModal}
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Folder Name */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
              Folder Name
            </label>
            <div className="flex items-center gap-2 bg-[var(--bg-app)] border border-[var(--border-color)] focus-within:border-[var(--primary)] rounded-xl px-3 py-2 transition-colors">
              <Folder className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Trading Bots, Research, UI Designs..."
                className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Choose Icon / Emoji */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
              Icon
            </label>
            <div className="flex flex-wrap gap-1.5">
              {EMOJI_PRESETS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-8 h-8 rounded-xl text-base flex items-center justify-center transition-all cursor-pointer ${
                    selectedEmoji === emoji
                      ? 'bg-[var(--primary-light)] border border-[var(--primary)] scale-110 shadow-xs'
                      : 'bg-[var(--bg-app)] border border-[var(--border-color)] hover:bg-[var(--bg-hover)]'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Color Accent */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
              Accent Color
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => setSelectedColor(color.hex)}
                  style={{ backgroundColor: color.hex }}
                  className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                    selectedColor === color.hex ? 'ring-2 ring-offset-2 ring-[var(--primary)] scale-115' : 'hover:scale-105'
                  }`}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[var(--border-color)]">
            <button
              type="button"
              onClick={closeFolderModal}
              className="px-4 py-2 text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex items-center gap-1.5 px-4 py-2 bg-[var(--primary)] hover:opacity-95 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-button-primary transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{editingFolderId ? 'Save Changes' : 'Create Folder'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export const FolderModal: React.FC = () => {
  const isOpen = useCryptoStore((s) => s.isFolderModalOpen);
  const editingFolderId = useCryptoStore((s) => s.editingFolderId);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <FolderModalContent key={editingFolderId || 'new'} />
    </AnimatePresence>
  );
};
