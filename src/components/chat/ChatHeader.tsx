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
    let md = `# ${currentChat?.title || 'CryptoGPT Conversation'}\n\n`;
    messages.forEach((m) => {
      md += `### ${m.role === 'user' ? 'User' : 'CryptoGPT'} (${m.createdAt})\n${m.content}\n\n`;
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
    <header className="h-16 px-4 md:px-8 border-b border-[#ECECEC] bg-white flex items-center justify-between flex-shrink-0 select-none z-20">
      {/* Left side: Mobile Sidebar Toggle + Chat Title Switcher */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggleSidebar}
          title="Toggle Sidebar (⌘B)"
          className="p-2 rounded-xl text-[#666666] hover:text-[#111111] hover:bg-[#F0F2F6] transition-colors"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        {/* Chat Title dropdown / model badge */}
        <div className="relative" ref={modelRef}>
          <button
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-[#F0F2F6] transition-colors group text-left"
          >
            <h2 className="font-bold text-[17px] text-[#111111] truncate max-w-[220px] md:max-w-[420px] tracking-tight">
              {currentChat?.title || 'What is Bitcoin?'}
            </h2>
            <ChevronDown className="w-4 h-4 text-[#8E8E93] group-hover:text-[#111111] transition-transform duration-200" />
          </button>

          {/* Model Switcher Menu */}
          {isModelDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-white rounded-2xl border border-[#ECECEC] shadow-flyout z-50 space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider">
                Select Intelligence Engine
              </div>
              <button
                onClick={() => {
                  setSelectedModel('CryptoGPT-4o');
                  setIsModelDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  selectedModel === 'CryptoGPT-4o'
                    ? 'bg-[#EEF0FD] text-[#5B5CEB] font-bold'
                    : 'text-[#333333] hover:bg-[#F7F8FA]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>CryptoGPT-4o</span>
                </div>
                <span className="text-[10px] text-green-600 font-bold">Fast</span>
              </button>

              <button
                onClick={() => {
                  setSelectedModel('DeepResearch-Crypto');
                  setIsModelDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  selectedModel === 'DeepResearch-Crypto'
                    ? 'bg-[#EEF0FD] text-[#5B5CEB] font-bold'
                    : 'text-[#333333] hover:bg-[#F7F8FA]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>DeepResearch-Crypto</span>
                </div>
                <span className="text-[10px] text-purple-600 font-bold">Deep</span>
              </button>

              <button
                onClick={() => {
                  setSelectedModel('QuantAlpha-3');
                  setIsModelDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  selectedModel === 'QuantAlpha-3'
                    ? 'bg-[#EEF0FD] text-[#5B5CEB] font-bold'
                    : 'text-[#333333] hover:bg-[#F7F8FA]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>QuantAlpha-3</span>
                </div>
                <span className="text-[10px] text-blue-600 font-bold">Math</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Star/Bookmark, Share, More Options, Toggle Insights */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => currentChat && togglePin(currentChat.id)}
          title={currentChat?.isPinned ? 'Remove Star' : 'Star this conversation'}
          className={`p-2 rounded-xl transition-colors ${
            currentChat?.isPinned
              ? 'text-[#5B5CEB] bg-[#EEF0FD]'
              : 'text-[#666666] hover:text-[#111111] hover:bg-[#F0F2F6]'
          }`}
        >
          <Star className={`w-4 h-4 ${currentChat?.isPinned ? 'fill-[#5B5CEB]' : ''}`} />
        </button>

        <button
          onClick={() => setModalState('isShareModalOpen', true)}
          title="Share conversation"
          className="p-2 rounded-xl text-[#666666] hover:text-[#111111] hover:bg-[#F0F2F6] transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* More options menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="More Options"
            className="p-2 rounded-xl text-[#666666] hover:text-[#111111] hover:bg-[#F0F2F6] transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 p-2 bg-white rounded-2xl border border-[#ECECEC] shadow-flyout z-50 space-y-1">
              <button
                onClick={() => {
                  if (currentChat) openRenameModal(currentChat.id);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#333333] hover:text-[#111111] hover:bg-[#F7F8FA] rounded-xl transition-colors"
              >
                <Pencil className="w-4 h-4 text-[#8E8E93]" />
                Rename Chat
              </button>

              <button
                onClick={handleExportMarkdown}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#333333] hover:text-[#111111] hover:bg-[#F7F8FA] rounded-xl transition-colors"
              >
                <Download className="w-4 h-4 text-[#8E8E93]" />
                Export Markdown (.md)
              </button>

              <button
                onClick={() => {
                  setModalState('isShareModalOpen', true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#333333] hover:text-[#111111] hover:bg-[#F7F8FA] rounded-xl transition-colors"
              >
                <Share2 className="w-4 h-4 text-[#8E8E93]" />
                Generate Public Link
              </button>

              <div className="border-t border-[#F0F2F6] my-1" />

              <button
                onClick={() => {
                  if (currentChat) openDeleteModal(currentChat.id);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
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
          className="p-2 rounded-xl text-[#666666] hover:text-[#111111] hover:bg-[#F0F2F6] transition-colors"
        >
          <PanelRight className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
