# dopamint / CryptoGPT Task Tracker & Implementation Checklist (TODO)

Detailed task execution plan is located in [`docs/superpowers/plans/2026-09-02-codebase-refactor-and-modularization.md`](file:///home/aswin/programming/vscode/celestialabs/dopamint_product/docs/superpowers/plans/2026-09-02-codebase-refactor-and-modularization.md).

## Phase 1: UI Foundation & Architecture (Completed)
- [x] Configure Tailwind CSS v4 design tokens in `src/index.css` (Colors: `#fcfbf7`, `#f7f6ec`, `#485442`, `#0D0D0D`, radius `22px`, 8-pt spacing).
- [x] Create comprehensive TypeScript schemas in `src/types/crypto.ts`.
- [x] Seed rich initial data in `src/data/` (Conversations, Top 15 Coins, Market Stats, News, Agents, Sources).
- [x] Build 3-column desktop layout (`AppLayout.tsx`) with 280px left sidebar, max-820px center chat canvas, and 340px right insights panel.
- [x] Build responsive collapsible sidebars with mobile drawer toggle and tablet adaptations.
- [x] Implement pixel-perfect Left Sidebar (`Sidebar.tsx`):
  - [x] Dual-rail navigation (Utilities rail + History drawer)
  - [x] `+ New Chat` button with Apple HIG gradient and soft shadow
  - [x] Search input with `⌘K` badge
  - [x] Folders and collapsible history accordions (Today, Yesterday, Last 7 days, Pinned)
  - [x] Action icons on hover (Pin, Favourite, Rename, Delete, Move to Folder)
  - [x] User Profile card with avatar, wallet address, and account popover
- [x] Implement Center Chat UI (`ChatContainer.tsx`):
  - [x] Chat header with title dropdown, pin button, share button, and model selector
  - [x] User message bubble with timestamp and status
  - [x] Assistant message layout matching reference design with colored key-point bullet blocks
  - [x] Message action bar (Thumbs Up/Down, Copy, TTS Readout, Regenerate)
  - [x] Contextual suggested follow-up chips
  - [x] Chat Input Bar with attachment (+), web search toggle, Deep Research badge, microphone, and send button
- [x] Implement Right Insights Panel (`InsightsPanel.tsx`):
  - [x] Segmented Tab Switcher (`Widgets` and `Sources`)
  - [x] 15 Customizable widgets with drag/reorder/collapse and Add Widget modal
  - [x] Market Overview, Fear & Greed gauge, Top Coins table, interactive chart, and news feed
- [x] Implement Gamification & On-Chain Hubs:
  - [x] Leaderboard with Testnet ETH Faucet top-ups
  - [x] Refer & Earn program with 20% lifetime XP commission tracking
  - [x] Points & XP Quest achievement system

## Phase 2: Refactoring & Architecture Modernization (Completed)
- [x] **Task 1: Shared UI Primitives (`src/components/ui/`)**
  - [x] `Modal.tsx` (Shared accessible modal container with Framer Motion spring transitions)
  - [x] `Button.tsx` (Standardized variants: primary, secondary, outline, ghost, danger)
  - [x] `Badge.tsx` (Trend up/down, status, and tag pills)
  - [x] `Card.tsx` (Surface cards with OKLCH theme elevation)
  - [x] `Input.tsx` (Form inputs & textareas with focus rings)
  - [x] `index.ts` (Barrel exports)
- [x] **Task 2: Zustand Store Slicing (`src/store/slices/`)**
  - [x] `uiSlice.ts` (Theme, sidebar, insights, modal flags)
  - [x] `authSlice.ts` (User profile, wallet state, login/logout)
  - [x] `widgetSlice.ts` (Widget ordering, toggle expand, catalog)
  - [x] `marketSlice.ts` (Coins, market overview, watchlist, portfolio, alerts)
  - [x] `chatSlice.ts` (Conversations, messages, folders, streaming loop)
  - [x] `useCryptoStore.ts` (Root composition with 21 clean lines)
- [x] **Task 3: API & Service Layer Extraction (`src/api/`)**
  - [x] `marketService.ts` (Telemetry queries & ticker jitter)
  - [x] `chatService.ts` (Token stream generator & simulation adapter)
  - [x] `walletService.ts` (Dynamic address generator & faucet top-up)
  - [x] `index.ts` (Barrel exports)
- [x] **Task 4: Modal Modernization**
  - [x] Refactored all 13 modals in `src/components/modals/` and `src/components/widgets/` to use `<Modal />` primitive
- [x] **Task 5: Streaming Performance & Audio Cleanups**
  - [x] Implemented token stream runner in `chatService.ts`
  - [x] Added explicit unmount cleanup for Web Audio `AudioContext`, `MediaStream`, and `speechSynthesis`
