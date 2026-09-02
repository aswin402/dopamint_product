import React, { useState } from 'react';
import { Folder, Sparkles } from 'lucide-react';
import { Modal, Button } from '../ui';
import { useCryptoStore } from '../../store/useCryptoStore';
import { FolderIconRenderer } from '../common/FolderIconRenderer';

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

const ICON_PRESETS = [
  { id: 'folder', label: 'Folder' },
  { id: 'message-square', label: 'Chat' },
  { id: 'coins', label: 'Crypto' },
  { id: 'code', label: 'Develop' },
  { id: 'palette', label: 'Design' },
  { id: 'trending-up', label: 'Trading' },
  { id: 'microscope', label: 'Research' },
  { id: 'zap', label: 'Speed' },
  { id: 'bot', label: 'Agent' },
  { id: 'book-open', label: 'Learn' },
  { id: 'target', label: 'Target' },
  { id: 'rocket', label: 'Launch' },
];

export const FolderModal: React.FC = () => {
  const isOpen = useCryptoStore((s) => s.isFolderModalOpen);
  const editingFolderId = useCryptoStore((s) => s.editingFolderId);
  const folders = useCryptoStore((s) => s.folders);
  const createFolder = useCryptoStore((s) => s.createFolder);
  const renameFolder = useCryptoStore((s) => s.renameFolder);
  const closeFolderModal = useCryptoStore((s) => s.closeFolderModal);

  const editingFolder = folders.find((f) => f.id === editingFolderId);

  const [name, setName] = useState(editingFolder?.name || '');
  const [selectedIcon, setSelectedIcon] = useState(editingFolder?.icon || 'folder');
  const [selectedColor, setSelectedColor] = useState(editingFolder?.color || '#6366F1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingFolderId) {
      renameFolder(editingFolderId, name.trim(), selectedIcon, selectedColor);
    } else {
      createFolder(name.trim(), selectedIcon, selectedColor);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeFolderModal}
      title={editingFolderId ? 'Edit Folder' : 'Create New Folder'}
      icon={<FolderIconRenderer iconName={selectedIcon} className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Folder Name */}
        <div>
          <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
            Folder Name
          </label>
          <div className="flex items-center gap-2 bg-[var(--bg-app)] border border-[var(--border-color)] focus-within:border-[#485442] dark:focus-within:border-[#55604e] rounded-xl px-3 py-2 transition-colors">
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

        {/* Choose SVG Icon */}
        <div>
          <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
            Icon
          </label>
          <div className="grid grid-cols-6 gap-1.5">
            {ICON_PRESETS.map((iconItem) => (
              <button
                key={iconItem.id}
                type="button"
                onClick={() => setSelectedIcon(iconItem.id)}
                title={iconItem.label}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  selectedIcon === iconItem.id
                    ? 'bg-[#485442]/10 border border-[#485442] text-[#485442] dark:text-[#8A9E7F] scale-105 shadow-2xs'
                    : 'bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <FolderIconRenderer iconName={iconItem.id} className="w-4 h-4" />
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
                  selectedColor === color.hex
                    ? 'ring-2 ring-offset-2 ring-[#485442] scale-110'
                    : 'hover:scale-105'
                }`}
                title={color.label}
              />
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[var(--border-color)]">
          <Button type="button" variant="ghost" size="sm" onClick={closeFolderModal}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!name.trim()}
            icon={<Sparkles className="w-3.5 h-3.5" />}
          >
            {editingFolderId ? 'Save Changes' : 'Create Folder'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
