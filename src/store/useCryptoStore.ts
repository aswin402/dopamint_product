import { create } from 'zustand';
import { createUiSlice, type UiSlice } from './slices/uiSlice';
import { createAuthSlice, type AuthSlice } from './slices/authSlice';
import { createWidgetSlice, type WidgetSlice } from './slices/widgetSlice';
import { createMarketSlice, type MarketSlice } from './slices/marketSlice';
import { createChatSlice, type ChatSlice } from './slices/chatSlice';

export type CryptoStoreState = UiSlice &
  AuthSlice &
  WidgetSlice &
  MarketSlice &
  ChatSlice;

export const useCryptoStore = create<CryptoStoreState>()((...a) => ({
  ...createUiSlice(...a),
  ...createAuthSlice(...a),
  ...createWidgetSlice(...a),
  ...createMarketSlice(...a),
  ...createChatSlice(...a),
}));

// Re-export slice types for convenience
export type { UiSlice, AuthSlice, WidgetSlice, MarketSlice, ChatSlice };
