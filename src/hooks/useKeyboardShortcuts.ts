import { useEffect } from 'react';
import { useCryptoStore } from '../store/useCryptoStore';

export function useKeyboardShortcuts() {
  const setModalState = useCryptoStore((s) => s.setModalState);
  const isCommandPaletteOpen = useCryptoStore((s) => s.isCommandPaletteOpen);
  const createNewChat = useCryptoStore((s) => s.createNewChat);
  const toggleSidebar = useCryptoStore((s) => s.toggleSidebar);
  const toggleInsights = useCryptoStore((s) => s.toggleInsights);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Command + K or Ctrl + K -> Command Palette
      if (isCmdOrCtrl && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setModalState('isCommandPaletteOpen', !isCommandPaletteOpen);
        return;
      }

      // Command + N or Ctrl + N -> New Chat
      if (isCmdOrCtrl && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        createNewChat();
        return;
      }

      // Command + B -> Toggle Left Sidebar
      if (isCmdOrCtrl && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      // Command + I -> Toggle Right Insights Panel
      if (isCmdOrCtrl && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        toggleInsights();
        return;
      }

      // Esc -> Close all open dialogs & palettes
      if (e.key === 'Escape') {
        setModalState('isCommandPaletteOpen', false);
        setModalState('isPortfolioModalOpen', false);
        setModalState('isWatchlistModalOpen', false);
        setModalState('isAlertsModalOpen', false);
        setModalState('isShareModalOpen', false);
        setModalState('isSettingsModalOpen', false);
        setModalState('isUpgradeProModalOpen', false);
        setModalState('isRenameModalOpen', false);
        setModalState('isDeleteModalOpen', false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isCommandPaletteOpen,
    setModalState,
    createNewChat,
    toggleSidebar,
    toggleInsights,
  ]);
}
