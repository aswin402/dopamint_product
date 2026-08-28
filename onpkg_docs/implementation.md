# Technical Implementation Plan — CryptoGPT

## 1. Stack & Architecture Overview
- **Runtime & Tooling:** Bun v1.3+, Vite v8, TypeScript 6.0
- **Framework:** React 19 (Hooks, Suspense, Concurrent Rendering)
- **Styling:** Tailwind CSS v4, Custom CSS Variables, `@fontsource-variable/inter`
- **Animation & Motion:** Framer Motion (v12) with physics-based spring transitions (180ms, 220ms, 250ms), GSAP for precision path drawing and counter interpolations
- **State Management:** Zustand with local storage persistence and optimistic updates
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti

---

## 2. Directory Structure

```
src/
├── api/                   # Market telemetry & mock data endpoints
├── assets/                # Logos, badges, crypto token SVG icons
├── components/
│   ├── chat/              # Chat message stream, bubbles, input console, markdown renderer
│   │   ├── ChatContainer.tsx
│   │   ├── ChatHeader.tsx
│   │   ├── ChatInputArea.tsx
│   │   ├── MessageItem.tsx
│   │   ├── MarkdownContent.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── ThinkingAccordion.tsx
│   │   ├── InlineCryptoCard.tsx
│   │   ├── SuggestedPrompts.tsx
│   │   └── VoiceVisualizer.tsx
│   ├── insights/          # Market overview, live charts, top coins, news feed
│   │   ├── InsightsPanel.tsx
│   │   ├── MarketOverviewCard.tsx
│   │   ├── FearGreedGauge.tsx
│   │   ├── TopCoinsTable.tsx
│   │   ├── InteractiveChart.tsx
│   │   └── NewsFeedCard.tsx
│   ├── layout/            # 3-column desktop layout & responsive drawers
│   │   └── AppLayout.tsx
│   ├── modals/            # Command palette, portfolio, watchlist, settings, share, modals
│   │   ├── CommandPalette.tsx
│   │   ├── PortfolioModal.tsx
│   │   ├── WatchlistModal.tsx
│   │   ├── AlertsModal.tsx
│   │   ├── ShareModal.tsx
│   │   ├── SettingsModal.tsx
│   │   ├── UpgradeProModal.tsx
│   │   ├── RenameModal.tsx
│   │   └── DeleteModal.tsx
│   ├── sidebar/           # Left navigation, conversation history, user profile
│   │   ├── Sidebar.tsx
│   │   ├── HistoryGroup.tsx
│   │   ├── ConversationItem.tsx
│   │   └── UserProfileCard.tsx
│   └── ui/                # Accessible primitives (buttons, tooltips, dialogs, badges)
├── data/                  # Preloaded seed conversations, crypto token database, market metrics
│   ├── conversations.ts
│   ├── cryptoData.ts
│   └── newsData.ts
├── hooks/                 # Custom hooks for speech recognition, TTS, keyboard shortcuts, media queries
│   ├── useSpeechRecognition.ts
│   ├── useTextToSpeech.ts
│   ├── useKeyboardShortcuts.ts
│   └── useMediaQuery.ts
├── lib/                   # Utility helpers, number formatters, chart math, clipboard
│   └── utils.ts
├── store/                 # Zustand global application state
│   └── useCryptoStore.ts
├── types/                 # TypeScript interfaces and schemas
│   └── crypto.ts
├── App.tsx
├── index.css
└── main.tsx
```

---

## 3. Real-Time Streaming & AI Response Simulator
- Implements a token-by-token async generator with dynamic pauses (15ms - 35ms per chunk).
- Supports Deep Research chain-of-thought steps before final markdown output.
- Emits rich key point badges with custom SVG bullet icons matching the provided reference screenshot.
- Dynamically attaches inline live token metrics cards when specific coins are mentioned.

---

## 4. Voice Input & Audio Speech (TTS)
- **Speech Recognition (STT):** Integrates browser Web Speech API `webkitSpeechRecognition` with fallback simulation + real-time microphone Web Audio API frequency analysis driving an animated canvas audio waveform.
- **Text-to-Speech (TTS):** Uses `window.speechSynthesis` with speech rate/pitch options, animated sound equalizer indicator, and pause/resume/stop controls.

---

## 5. Keyboard Navigation & Command Palette (`⌘K`)
- Global shortcut listener for `⌘K` (Mac) and `Ctrl+K` (Windows/Linux) to open the Command Palette.
- `⌘N` for New Chat.
- `/` to focus the main chat input.
- `Esc` to dismiss all active overlays and modals.
- Full arrow-key selection in the Command Palette and history lists.
