import type { StateCreator } from 'zustand';
import type { WidgetConfig, WidgetType } from '../../types/crypto';
import { DEFAULT_ACTIVE_WIDGETS, WIDGET_CATALOG } from '../../data/widgetsData';

export interface WidgetSlice {
  widgets: WidgetConfig[];
  isAddWidgetModalOpen: boolean;
  setIsAddWidgetModalOpen: (open: boolean) => void;
  addWidget: (type: WidgetType, customTitle?: string) => void;
  removeWidget: (id: string) => void;
  toggleWidgetExpand: (id: string) => void;
  moveWidgetUp: (id: string) => void;
  moveWidgetDown: (id: string) => void;
  resetWidgetsToDefault: () => void;
}

const VALID_WIDGET_TYPES: WidgetType[] = [
  'market-overview',
  'token-unlock',
  'listing-feed',
  'whale-tracking',
  'exchange-netflow',
  'order-book',
  'sentiment-news',
  'portfolio-summary',
];

const getInitialWidgets = (): WidgetConfig[] => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('dopamint-widgets');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const valid = parsed.filter(
            (w: unknown): w is WidgetConfig =>
              Boolean(w) &&
              typeof w === 'object' &&
              'type' in (w as Record<string, unknown>) &&
              VALID_WIDGET_TYPES.includes((w as Record<string, unknown>).type as WidgetType)
          );
          if (valid.length > 0) return valid;
        }
      }
    } catch {
      // ignore
    }
  }
  return DEFAULT_ACTIVE_WIDGETS;
};

export const createWidgetSlice: StateCreator<WidgetSlice, [], [], WidgetSlice> = (set, get) => ({
  widgets: getInitialWidgets(),
  isAddWidgetModalOpen: false,
  setIsAddWidgetModalOpen: (isAddWidgetModalOpen) => set({ isAddWidgetModalOpen }),

  addWidget: (type, customTitle) => {
    const catalogItem = WIDGET_CATALOG.find((c) => c.type === type);
    const title = customTitle || catalogItem?.defaultTitle || 'Widget';
    const newWidget: WidgetConfig = {
      id: `w-${type}-${Date.now()}`,
      type,
      title,
      isExpanded: true,
      order: get().widgets.length,
    };
    const updated = [...get().widgets, newWidget];
    if (typeof window !== 'undefined') {
      localStorage.setItem('dopamint-widgets', JSON.stringify(updated));
    }
    set({ widgets: updated });
  },

  removeWidget: (id) => {
    const updated = get().widgets.filter((w) => w.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dopamint-widgets', JSON.stringify(updated));
    }
    set({ widgets: updated });
  },

  toggleWidgetExpand: (id) => {
    const updated = get().widgets.map((w) =>
      w.id === id ? { ...w, isExpanded: !w.isExpanded } : w
    );
    if (typeof window !== 'undefined') {
      localStorage.setItem('dopamint-widgets', JSON.stringify(updated));
    }
    set({ widgets: updated });
  },

  moveWidgetUp: (id) => {
    const list = [...get().widgets];
    const index = list.findIndex((w) => w.id === id);
    if (index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
      if (typeof window !== 'undefined') {
        localStorage.setItem('dopamint-widgets', JSON.stringify(list));
      }
      set({ widgets: list });
    }
  },

  moveWidgetDown: (id) => {
    const list = [...get().widgets];
    const index = list.findIndex((w) => w.id === id);
    if (index >= 0 && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
      if (typeof window !== 'undefined') {
        localStorage.setItem('dopamint-widgets', JSON.stringify(list));
      }
      set({ widgets: list });
    }
  },

  resetWidgetsToDefault: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dopamint-widgets', JSON.stringify(DEFAULT_ACTIVE_WIDGETS));
    }
    set({ widgets: DEFAULT_ACTIVE_WIDGETS });
  },
});
