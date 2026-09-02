# dopamint / CryptoGPT Task Tracker & Checklist (TODO)

Full checklist and architectural details are available at [`onpkg_docs/todo.md`](file:///home/aswin/programming/vscode/celestialabs/dopamint_product/onpkg_docs/todo.md) and [`docs/superpowers/plans/2026-09-02-codebase-refactor-and-modularization.md`](file:///home/aswin/programming/vscode/celestialabs/dopamint_product/docs/superpowers/plans/2026-09-02-codebase-refactor-and-modularization.md).

### Core Features (Completed)
- [x] Strict 8-point spacing system & OKLCH light/dark theme layout.
- [x] Left Dual-Rail Sidebar with New Chat, Search, History (Today, Yesterday, Last 7 days), Folders, Pinned, Profile.
- [x] Center Chat with Streaming, Deep Research thinking state, Key Points cards, Follow-up prompts, Audio TTS, Voice STT.
- [x] Right Insights Panel with Market Overview, Fear & Greed gauge, Top Coins, Interactive Price Chart, News, and Sources citations.
- [x] 15 Modular customizable crypto telemetry widgets (Order Book, Whale Tracking, Netflow, Token Unlock).
- [x] Command Palette (`⌘K`), Portfolio tracker, Watchlist, Alerts, Share & Export.
- [x] Leaderboard Faucet (Testnet ETH top-ups), Referral commissions (20% lifetime XP), and XP Quest rewards.
- [x] Framer Motion spring microinteractions, 60fps GPU acceleration.
- [x] **Hidden Developer & Designer Style Guide (`/style-guide`)**: Full interactive design system showcase covering OKLCH color swatches with 1-click token copy, typography & `tabular-nums` comparison, button & control playground, key-point bullet blocks, card surface elevations, form controls, streaming chat anatomy, telemetry gauges, modal launchpad, and spring motion physics.

### Architecture Refactoring & Modernization (Completed)
- [x] **Phase 1: Shared UI Primitives (`src/components/ui/`)**
  - [x] `Modal.tsx` (Shared accessible modal container with Framer Motion spring transitions)
  - [x] `Button.tsx` (Standardized variants: primary, secondary, outline, ghost, danger)
  - [x] `Badge.tsx` (Trend up/down, status, and tag pills)
  - [x] `Card.tsx` (Surface cards with OKLCH theme elevation)
  - [x] `Input.tsx` (Form inputs & textareas with focus rings)
  - [x] `index.ts` (Barrel exports)
- [x] **Phase 2: Zustand Store Slicing (`src/store/slices/`)**
  - [x] `uiSlice.ts` (Theme, sidebar, insights, modal flags)
  - [x] `authSlice.ts` (User profile, wallet state, login/logout)
  - [x] `widgetSlice.ts` (Widget ordering, toggle expand, catalog)
  - [x] `marketSlice.ts` (Coins, market overview, watchlist, portfolio, alerts)
  - [x] `chatSlice.ts` (Conversations, messages, folders, streaming loop)
  - [x] `useCryptoStore.ts` (Root composition with 21 clean lines)
- [x] **Phase 3: API & Service Layer Extraction (`src/api/`)**
  - [x] `marketService.ts` (Telemetry queries & ticker jitter)
  - [x] `chatService.ts` (Token stream generator & simulation adapter)
  - [x] `walletService.ts` (Dynamic address generator & faucet top-up)
  - [x] `index.ts` (Barrel exports)
- [x] **Phase 4: Modal Modernization**
  - [x] Refactored all 13 modals in `src/components/modals/` and `src/components/widgets/` to use `<Modal />` primitive
- [x] **Phase 5: Streaming Performance & Audio Cleanups**
  - [x] Implemented token stream runner in `chatService.ts`
  - [x] Added explicit unmount cleanup for Web Audio `AudioContext`, `MediaStream`, and `speechSynthesis`
