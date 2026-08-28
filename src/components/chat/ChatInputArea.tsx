import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Globe,
  Sparkles,
  Mic,
  MicOff,
  Send,
  Square,
  Paperclip,
  X,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { VoiceVisualizer } from './VoiceVisualizer';
import type { Attachment } from '../../types/crypto';

export const ChatInputArea: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = useCryptoStore((s) => s.sendMessage);
  const isStreaming = useCryptoStore((s) => s.isStreaming);
  const stopGeneration = useCryptoStore((s) => s.stopGeneration);
  const isWebSearchEnabled = useCryptoStore((s) => s.isWebSearchEnabled);
  const toggleWebSearch = useCryptoStore((s) => s.toggleWebSearch);
  const isDeepResearchEnabled = useCryptoStore((s) => s.isDeepResearchEnabled);
  const toggleDeepResearch = useCryptoStore((s) => s.toggleDeepResearch);

  const { isListening, audioLevel, toggleListening } = useSpeechRecognition({
    onTranscript: (transcript) => {
      setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
    },
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [inputText]);

  const handleSend = () => {
    if ((!inputText.trim() && attachments.length === 0) || isStreaming) return;
    sendMessage(inputText.trim() || 'Analyze attached document', attachments);
    setInputText('');
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const newAttachments: Attachment[] = Array.from(files).map((file) => ({
      id: `att-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  return (
    <div className="w-full max-w-[820px] mx-auto px-4 pb-4 pt-2 select-none">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFileUpload(e.dataTransfer.files);
        }}
        className={`relative bg-white rounded-[24px] border transition-all duration-200 shadow-card ${
          isDragOver
            ? 'border-[#5B5CEB] ring-4 ring-[#5B5CEB]/10 bg-[#EEF0FD]/30'
            : 'border-[#ECECEC] focus-within:border-[#5B5CEB] focus-within:ring-4 focus-within:ring-[#5B5CEB]/10'
        }`}
      >
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 px-4 pt-3">
            {attachments.map((att) => (
              <div
                key={att.id}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#F7F8FA] border border-[#ECECEC] rounded-xl text-xs text-[#111111]"
              >
                <Paperclip className="w-3 h-3 text-[#5B5CEB]" />
                <span className="font-medium truncate max-w-[140px]">{att.name}</span>
                <button
                  onClick={() => setAttachments((prev) => prev.filter((a) => a.id !== att.id))}
                  className="p-0.5 hover:text-red-500 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="px-4 pt-3.5 pb-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about crypto..."
            className="w-full bg-transparent text-[15px] text-[#111111] placeholder-[#8E8E93] outline-none resize-none overflow-y-auto leading-relaxed max-h-[180px]"
          />
        </div>

        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              multiple
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Attach document or image"
              className="w-9 h-9 rounded-full bg-[#F7F8FA] hover:bg-[#EEF0FD] hover:text-[#5B5CEB] text-[#666666] border border-[#ECECEC] flex items-center justify-center transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
            </button>

            <button
              onClick={toggleWebSearch}
              title={isWebSearchEnabled ? 'Web search enabled' : 'Web search disabled'}
              className={`h-9 px-3 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all ${
                isWebSearchEnabled
                  ? 'bg-[#EEF0FD] border-[#5B5CEB]/30 text-[#5B5CEB] font-semibold'
                  : 'bg-[#F7F8FA] border-[#ECECEC] text-[#666666] hover:bg-[#F0F2F6]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Web</span>
            </button>

            <button
              onClick={toggleDeepResearch}
              title="Toggle Deep Multi-Step Research Mode"
              className={`h-9 px-3 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isDeepResearchEnabled
                  ? 'bg-[#5B5CEB] border-[#5B5CEB] text-white shadow-button-primary'
                  : 'bg-[#F7F8FA] border-[#ECECEC] text-[#333333] hover:bg-[#EEF0FD] hover:text-[#5B5CEB]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-inherit" />
              <span>Deep Research</span>
              <span
                className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                  isDeepResearchEnabled
                    ? 'bg-white/20 text-white'
                    : 'bg-[#5B5CEB] text-white'
                }`}
              >
                NEW
              </span>
            </button>

            <VoiceVisualizer audioLevel={audioLevel} isListening={isListening} />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleListening}
              title={isListening ? 'Stop voice recording' : 'Voice search'}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                isListening
                  ? 'bg-red-50 text-red-500 border border-red-200'
                  : 'text-[#666666] hover:text-[#111111] hover:bg-[#F0F2F6]'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {isStreaming ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopGeneration}
                title="Stop generating"
                className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center shadow-soft"
              >
                <Square className="w-3.5 h-3.5 fill-white" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!inputText.trim() && attachments.length === 0}
                title="Send message (Enter)"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-180 ${
                  inputText.trim() || attachments.length > 0
                    ? 'bg-[#5B5CEB] text-white shadow-button-primary hover:bg-[#4F50D9]'
                    : 'bg-[#5B5CEB]/50 text-white/70 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4 translate-x-0.2 -translate-y-0.2" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-[#8E8E93] mt-2.5 leading-relaxed tracking-tight select-none">
        Crypto markets are volatile. AI answers can be wrong. Always do your own research before investing.
      </p>
    </div>
  );
};
