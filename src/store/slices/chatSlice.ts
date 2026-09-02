import type { StateCreator } from 'zustand';
import type {
  Attachment,
  Conversation,
  Folder,
  Message,
} from '../../types/crypto';
import {
  INITIAL_CONVERSATIONS,
  INITIAL_FOLDERS,
  INITIAL_MESSAGES,
} from '../../data/conversations';
import { chatService } from '../../api/chatService';
import { formatTimestamp } from '../../lib/formatters';

export interface ChatSlice {
  // Search & Toggles
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isWebSearchEnabled: boolean;
  isDeepResearchEnabled: boolean;
  toggleWebSearch: () => void;
  toggleDeepResearch: () => void;
  selectedModel: 'dopamint-4o' | 'dopamint-DeepResearch' | 'QuantAlpha-3';
  setSelectedModel: (model: 'dopamint-4o' | 'dopamint-DeepResearch' | 'QuantAlpha-3') => void;

  // Conversations
  conversations: Conversation[];
  activeConversationId: string;
  setActiveConversation: (id: string) => void;
  createNewChat: (initialPrompt?: string, folderId?: string) => string;
  renameConversation: (id: string, newTitle: string) => void;
  deleteConversation: (id: string) => void;
  togglePinConversation: (id: string) => void;
  toggleFavouriteConversation: (id: string) => void;
  duplicateConversation: (id: string) => void;

  // Folders
  folders: Folder[];
  activeSidebarTab: 'recent' | 'folders';
  setActiveSidebarTab: (tab: 'recent' | 'folders') => void;
  createFolder: (name: string, icon?: string, color?: string) => string;
  renameFolder: (id: string, name: string, icon?: string, color?: string) => void;
  deleteFolder: (id: string, deleteChats?: boolean) => void;
  moveConversationToFolder: (chatId: string, folderId: string | null) => void;

  // Messages & Streaming
  messages: Record<string, Message[]>;
  isStreaming: boolean;
  streamingMessageId: string | null;
  activeSpeechMessageId: string | null;
  setActiveSpeechMessageId: (id: string | null) => void;
  sendMessage: (content: string, attachments?: Attachment[]) => Promise<void>;
  stopGeneration: () => void;
  regenerateResponse: (messageId: string) => Promise<void>;
  setMessageFeedback: (messageId: string, feedback: 'liked' | 'disliked' | null) => void;
}

let streamAbortController: AbortController | null = null;

export const createChatSlice: StateCreator<ChatSlice, [], [], ChatSlice> = (set, get) => ({
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  isWebSearchEnabled: false,
  isDeepResearchEnabled: false,
  toggleWebSearch: () => set((state) => ({ isWebSearchEnabled: !state.isWebSearchEnabled })),
  toggleDeepResearch: () =>
    set((state) => ({ isDeepResearchEnabled: !state.isDeepResearchEnabled })),
  selectedModel: 'dopamint-4o',
  setSelectedModel: (selectedModel) => set({ selectedModel }),

  conversations: INITIAL_CONVERSATIONS,
  activeConversationId: 'chat-1',
  setActiveConversation: (activeConversationId) => set({ activeConversationId }),

  createNewChat: (initialPrompt, folderId) => {
    const newId = `chat-${Date.now()}`;
    const newTitle = initialPrompt
      ? initialPrompt.length > 32
        ? `${initialPrompt.slice(0, 30)}...`
        : initialPrompt
      : 'New Conversation';

    const newChat: Conversation = {
      id: newId,
      title: newTitle,
      isPinned: false,
      folderId: folderId || undefined,
      group: 'today',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      iconName: 'bitcoin',
      iconBgColor: '#EEF0FD',
      model: get().selectedModel,
    };

    set((state) => ({
      conversations: [newChat, ...state.conversations],
      activeConversationId: newId,
      messages: {
        ...state.messages,
        [newId]: [],
      },
    }));

    if (initialPrompt) {
      get().sendMessage(initialPrompt);
    }

    return newId;
  },

  renameConversation: (id, newTitle) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id
          ? { ...c, title: newTitle.trim() || c.title, updatedAt: new Date().toISOString() }
          : c
      ),
    }));
  },

  deleteConversation: (id) => {
    const { conversations, activeConversationId } = get();
    const remaining = conversations.filter((c) => c.id !== id);
    const newActiveId =
      activeConversationId === id
        ? remaining.length > 0
          ? remaining[0].id
          : get().createNewChat()
        : activeConversationId;

    set((state) => {
      const newMessages = { ...state.messages };
      delete newMessages[id];
      return {
        conversations: remaining,
        activeConversationId: newActiveId,
        messages: newMessages,
      };
    });
  },

  togglePinConversation: (id) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, isPinned: !c.isPinned } : c
      ),
    }));
  },

  toggleFavouriteConversation: (id) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, isFavourite: !c.isFavourite } : c
      ),
    }));
  },

  duplicateConversation: (id) => {
    const { conversations, messages } = get();
    const target = conversations.find((c) => c.id === id);
    if (!target) return;

    const newId = `chat-${Date.now()}`;
    const duplicatedChat: Conversation = {
      ...target,
      id: newId,
      title: `${target.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const duplicatedMessages = messages[id] ? [...messages[id]] : [];

    set((state) => ({
      conversations: [duplicatedChat, ...state.conversations],
      activeConversationId: newId,
      messages: {
        ...state.messages,
        [newId]: duplicatedMessages,
      },
    }));
  },

  // Folders
  folders: INITIAL_FOLDERS,
  activeSidebarTab: 'recent',
  setActiveSidebarTab: (activeSidebarTab) => set({ activeSidebarTab }),

  createFolder: (name, icon = 'folder', color = '#6366F1') => {
    const newFolderId = `folder-${Date.now()}`;
    const newFolder: Folder = {
      id: newFolderId,
      name: name.trim() || 'New Folder',
      icon: icon || 'folder',
      color: color || '#6366F1',
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      folders: [...state.folders, newFolder],
    }));
    return newFolderId;
  },

  renameFolder: (id, name, icon, color) => {
    set((state) => ({
      folders: state.folders.map((f) =>
        f.id === id
          ? {
              ...f,
              name: name.trim() || f.name,
              icon: icon !== undefined ? icon : f.icon,
              color: color !== undefined ? color : f.color,
            }
          : f
      ),
    }));
  },

  deleteFolder: (id, deleteChats = false) => {
    set((state) => {
      const updatedMessages = { ...state.messages };
      let updatedConversations: Conversation[];

      if (deleteChats) {
        const chatsToDelete = state.conversations.filter((c) => c.folderId === id);
        chatsToDelete.forEach((c) => delete updatedMessages[c.id]);
        updatedConversations = state.conversations.filter((c) => c.folderId !== id);
      } else {
        updatedConversations = state.conversations.map((c) =>
          c.folderId === id ? { ...c, folderId: undefined } : c
        );
      }

      return {
        folders: state.folders.filter((f) => f.id !== id),
        conversations: updatedConversations,
        messages: updatedMessages,
      };
    });
  },

  moveConversationToFolder: (chatId, folderId) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === chatId ? { ...c, folderId: folderId || undefined } : c
      ),
    }));
  },

  // Messages & Streaming
  messages: INITIAL_MESSAGES,
  isStreaming: false,
  streamingMessageId: null,
  activeSpeechMessageId: null,
  setActiveSpeechMessageId: (activeSpeechMessageId) => set({ activeSpeechMessageId }),

  sendMessage: async (content: string, attachments?: Attachment[]) => {
    const {
      activeConversationId,
      isWebSearchEnabled,
      isDeepResearchEnabled,
      conversations,
      messages,
    } = get();

    if (!content.trim() && (!attachments || attachments.length === 0)) return;

    const userMessageId = `user-msg-${Date.now()}`;
    const userMessage: Message = {
      id: userMessageId,
      conversationId: activeConversationId,
      role: 'user',
      content: content.trim(),
      createdAt: formatTimestamp(new Date()),
      status: 'sent',
      attachments: attachments || [],
    };

    // Auto-update conversation title if first message
    const currentConv = conversations.find((c) => c.id === activeConversationId);
    const existingMessages = messages[activeConversationId] || [];
    let updatedConversations = conversations;
    if (existingMessages.length === 0 && currentConv) {
      const generatedTitle =
        content.length > 32 ? `${content.slice(0, 30)}...` : content;
      updatedConversations = conversations.map((c) =>
        c.id === activeConversationId
          ? { ...c, title: generatedTitle, updatedAt: new Date().toISOString() }
          : c
      );
    }

    // Append user message immediately
    set((state) => ({
      conversations: updatedConversations,
      messages: {
        ...state.messages,
        [activeConversationId]: [...(state.messages[activeConversationId] || []), userMessage],
      },
    }));

    // Generate AI response template
    const aiResponseTemplate = chatService.generateResponse(content, {
      isDeepResearch: isDeepResearchEnabled,
      isWebSearch: isWebSearchEnabled,
    });

    const assistantMessageId = `ai-msg-${Date.now()}`;
    const assistantMessage: Message = {
      id: assistantMessageId,
      conversationId: activeConversationId,
      role: 'assistant',
      content: '',
      createdAt: formatTimestamp(new Date()),
      status: 'streaming',
      thinkingSteps: isDeepResearchEnabled ? aiResponseTemplate.thinkingSteps : undefined,
      keyPoints: aiResponseTemplate.keyPoints,
      priceSnapshot: aiResponseTemplate.priceSnapshot,
      codeBlocks: aiResponseTemplate.codeBlocks,
      suggestedFollowUps: aiResponseTemplate.suggestedFollowUps,
      webSources: isWebSearchEnabled ? aiResponseTemplate.webSources : undefined,
      isDeepResearch: isDeepResearchEnabled,
    };

    set((state) => ({
      isStreaming: true,
      streamingMessageId: assistantMessageId,
      messages: {
        ...state.messages,
        [activeConversationId]: [
          ...(state.messages[activeConversationId] || []),
          assistantMessage,
        ],
      },
    }));

    if (streamAbortController) {
      streamAbortController.abort();
    }
    streamAbortController = new AbortController();
    const signal = streamAbortController.signal;

    try {
      await chatService.streamResponse(aiResponseTemplate.content, {
        signal,
        onChunk: (streamedContent) => {
          set((state) => ({
            messages: {
              ...state.messages,
              [activeConversationId]: (state.messages[activeConversationId] || []).map((msg) =>
                msg.id === assistantMessageId ? { ...msg, content: streamedContent } : msg
              ),
            },
          }));
        },
      });
    } catch {
      // Aborted or cancelled
    } finally {
      if (!signal.aborted) {
        set((state) => ({
          isStreaming: false,
          streamingMessageId: null,
          messages: {
            ...state.messages,
            [activeConversationId]: (state.messages[activeConversationId] || []).map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, status: 'completed' as const, content: aiResponseTemplate.content }
                : msg
            ),
          },
        }));
      }
    }
  },

  stopGeneration: () => {
    if (streamAbortController) {
      streamAbortController.abort();
      streamAbortController = null;
    }
    const { activeConversationId, streamingMessageId } = get();
    if (streamingMessageId) {
      set((state) => ({
        isStreaming: false,
        streamingMessageId: null,
        messages: {
          ...state.messages,
          [activeConversationId]: (state.messages[activeConversationId] || []).map((msg) =>
            msg.id === streamingMessageId ? { ...msg, status: 'completed' as const } : msg
          ),
        },
      }));
    }
  },

  regenerateResponse: async (messageId: string) => {
    const { activeConversationId, messages } = get();
    const conversationMessages = messages[activeConversationId] || [];
    const targetIndex = conversationMessages.findIndex((m) => m.id === messageId);
    if (targetIndex === -1) return;

    let userPrompt = 'Explain Bitcoin dynamics and institutional adoption.';
    for (let i = targetIndex - 1; i >= 0; i--) {
      if (conversationMessages[i].role === 'user') {
        userPrompt = conversationMessages[i].content;
        break;
      }
    }

    const trimmed = conversationMessages.slice(0, targetIndex);
    set((state) => ({
      messages: {
        ...state.messages,
        [activeConversationId]: trimmed,
      },
    }));

    await get().sendMessage(userPrompt);
  },

  setMessageFeedback: (messageId, feedback) => {
    const { activeConversationId } = get();
    set((state) => ({
      messages: {
        ...state.messages,
        [activeConversationId]: (state.messages[activeConversationId] || []).map((msg) =>
          msg.id === messageId ? { ...msg, feedback } : msg
        ),
      },
    }));
  },
});
