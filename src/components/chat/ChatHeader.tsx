import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Star,
  Share2,
  MoreHorizontal,
  PanelLeft,
  PanelRight,
  Pencil,
  Trash2,
  Download,
  Cpu,
  Sun,
  Moon,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const ChatHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  const activeId = useCryptoStore((s) => s.activeConversationId);
  const conversations = useCryptoStore((s) => s.conversations);
  const currentChat = conversations.find((c) => c.id === activeId);

  const togglePin = useCryptoStore((s) => s.togglePinConversation);
  const toggleSidebar = useCryptoStore((s) => s.toggleSidebar);
  const toggleInsights = useCryptoStore((s) => s.toggleInsights);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const openRenameModal = useCryptoStore((s) => s.openRenameModal);
  const openDeleteModal = useCryptoStore((s) => s.openDeleteModal);
  const selectedModel = useCryptoStore((s) => s.selectedModel);
  const setSelectedModel = useCryptoStore((s) => s.setSelectedModel);
  const theme = useCryptoStore((s) => s.theme);
  const toggleTheme = useCryptoStore((s) => s.toggleTheme);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setIsModelDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportMarkdown = () => {
    const messages = useCryptoStore.getState().messages[activeId] || [];
    let md = `# ${currentChat?.title || 'dopamint Conversation'}\n\n`;
    messages.forEach((m) => {
      md += `### ${m.role === 'user' ? 'User' : 'dopamint'} (${m.createdAt})\n${m.content}\n\n`;
    });
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentChat?.title.replace(/\s+/g, '_') || 'chat'}.md`;
    a.click();
    setIsMenuOpen(false);
  };

  return (
    <header className="h-16 px-4 md:px-8 border-b border-[var(--border-color)] bg-[var(--bg-card)] flex items-center justify-between flex-shrink-0 select-none z-20 transition-colors duration-200">
      {/* Left side: Mobile Sidebar Toggle + Chat Title Switcher */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggleSidebar}
          title="Toggle Sidebar (⌘B)"
          className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        {/* Chat Title dropdown / model badge */}
        <div className="relative" ref={modelRef}>
          <button
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] transition-colors group text-left"
          >
            <h2 className="font-bold text-[17px] text-[var(--text-primary)] truncate max-w-[200px] md:max-w-[380px] tracking-tight">
              {currentChat?.title || 'What is Bitcoin?'}
            </h2>
            <ChevronDown className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-transform duration-200" />
          </button>

          {/* Model Switcher Menu */}
          {isModelDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-flyout z-50 space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Select Intelligence Engine
              </div>
              <button
                onClick={() => {
                  setSelectedModel('dopamint-4o');
                  setIsModelDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  selectedModel === 'dopamint-4o'
                    ? 'bg-[var(--primary-light)] text-[var(--primary)] font-bold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>dopamint-4o</span>
                </div>
                <span className="text-[10px] text-green-600 font-bold">Fast</span>
              </button>

              <button
                onClick={() => {
                  setSelectedModel('dopamint-DeepResearch');
                  setIsModelDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  selectedModel === 'dopamint-DeepResearch'
                    ? 'bg-[var(--primary-light)] text-[var(--primary)] font-bold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>dopamint-DeepResearch</span>
                </div>
                <span className="text-[10px] text-purple-500 font-bold">Deep</span>
              </button>

              <button
                onClick={() => {
                  setSelectedModel('QuantAlpha-3');
                  setIsModelDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  selectedModel === 'QuantAlpha-3'
                    ? 'bg-[var(--primary-light)] text-[var(--primary)] font-bold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>QuantAlpha-3</span>
                </div>
                <span className="text-[10px] text-blue-500 font-bold">Math</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Theme Switcher, Star/Bookmark, Share, More Options, Toggle Insights */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        <button
          onClick={() => currentChat && togglePin(currentChat.id)}
          title={currentChat?.isPinned ? 'Remove Star' : 'Star this conversation'}
          className={`p-2 rounded-xl transition-colors ${
            currentChat?.isPinned
              ? 'text-[var(--primary)] bg-[var(--primary-light)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
          }`}
        >
          <Star className={`w-4 h-4 ${currentChat?.isPinned ? 'fill-[var(--primary)]' : ''}`} />
        </button>

        <button
          onClick={() => setModalState('isShareModalOpen', true)}
          title="Share conversation"
          className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* More options menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="More Options"
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 p-2 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-flyout z-50 space-y-1">
              <button
                onClick={() => {
                  if (currentChat) openRenameModal(currentChat.id);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors"
              >
                <Pencil className="w-4 h-4 text-[var(--text-muted)]" />
                Rename Chat
              </button>

              <button
                onClick={handleExportMarkdown}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors"
              >
                <Download className="w-4 h-4 text-[var(--text-muted)]" />
                Export Markdown (.md)
              </button>

              <button
                onClick={() => {
                  setModalState('isShareModalOpen', true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors"
              >
                <Share2 className="w-4 h-4 text-[var(--text-muted)]" />
                Generate Public Link
              </button>

              <div className="border-t border-[var(--border-color)] my-1" />

              <button
                onClick={() => {
                  if (currentChat) openDeleteModal(currentChat.id);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
                Delete Conversation
              </button>
            </div>
          )}
        </div>

        {/* Toggle Right Insights Panel */}
        <button
          onClick={toggleInsights}
          title="Toggle Insights Panel (⌘I)"
          className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          <PanelRight className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
