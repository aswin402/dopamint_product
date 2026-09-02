# Codebase Refactoring & Architectural Modularization Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the dopamint/CryptoGPT codebase from a monolithic store and repetitive component structure into a modular, clean-sliced architecture with reusable UI primitives, dedicated API services, and optimized streaming state.

**Architecture:** Split the 1,049-line `useCryptoStore.ts` into 5 focused domain slices (`uiSlice`, `authSlice`, `chatSlice`, `marketSlice`, `widgetSlice`) unified in a root store with Zustand `persist`. Create a foundational `src/components/ui/` primitive design system (`Modal`, `Button`, `Card`, `Badge`, `Input`) and refactor all 13 modals onto the shared `Modal` primitive. Extract mock/API logic into `src/api/` services.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS v4, Zustand v5, Framer Motion v12, Lucide React.

## Global Constraints
- Strictly preserve all existing OKLCH color variables and design tokens (`#fcfbf7` / `#f7f6ec` / `#485442` / `#0D0D0D`).
- Preserve all existing public methods and property signatures on `useCryptoStore` to avoid breaking downstream components.
- Do not introduce breaking visual changes or remove existing features (Voice STT, Audio TTS, Deep Research, 15 Widgets, Quests).

---

### Task 1: Create Shared UI Primitives (`src/components/ui/`)

**Files:**
- Create: `src/components/ui/Modal.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/index.ts`

**Interfaces:**
- Produces: `<Modal isOpen onClose title subtitle maxWidth>`, `<Button variant size isLoading>`, `<Badge variant>`, `<Card elevation hoverLift>`, `<Input error label>`

- [x] **Step 1: Create `src/components/ui/Modal.tsx`**
  Implement accessible modal with Framer Motion `AnimatePresence`, backdrop blur, ESC key dismiss, and header.

- [x] **Step 2: Create `src/components/ui/Button.tsx`**
  Implement buttons supporting variants: `primary`, `secondary`, `outline`, `ghost`, `danger`, with spring active scaling.

- [x] **Step 3: Create `src/components/ui/Badge.tsx`, `Card.tsx`, and `Input.tsx`**
  Implement reusable badges (trend up/down, status), card surfaces, and input fields with OKLCH theme tokens.

- [x] **Step 4: Create barrel export in `src/components/ui/index.ts`**
  Export all primitives for clean imports across components.

---

### Task 2: Modularize Zustand Store into Slices (`src/store/slices/`)

**Files:**
- Create: `src/store/slices/uiSlice.ts`
- Create: `src/store/slices/authSlice.ts`
- Create: `src/store/slices/widgetSlice.ts`
- Create: `src/store/slices/marketSlice.ts`
- Create: `src/store/slices/chatSlice.ts`
- Modify: `src/store/useCryptoStore.ts`

**Interfaces:**
- Consumes: Types from `src/types/crypto.ts`, data from `src/data/`
- Produces: `useCryptoStore` hook composed from all 5 slices with identical public API.

- [x] **Step 1: Create `src/store/slices/uiSlice.ts`**
  Move theme, sidebar state, insights state, active page, active right tab, and all 13 modal open/close states into `uiSlice`.

- [x] **Step 2: Create `src/store/slices/authSlice.ts`**
  Move `isAuthenticated`, `userProfile`, `login`, `logout` into `authSlice`.

- [x] **Step 3: Create `src/store/slices/widgetSlice.ts`**
  Move `widgets`, `addWidget`, `removeWidget`, `toggleWidgetExpand`, `moveWidgetUp`, `moveWidgetDown`, `resetWidgetsToDefault`, `isAddWidgetModalOpen` into `widgetSlice`.

- [x] **Step 4: Create `src/store/slices/marketSlice.ts`**
  Move `marketOverview`, `coins`, `selectedCoinId`, `selectedTimeframe`, `watchlist`, `portfolio`, `alerts`, `news`, `leaderboard`, `topupTestnet`, `simulateMarketTick` into `marketSlice`.

- [x] **Step 5: Create `src/store/slices/chatSlice.ts`**
  Move `conversations`, `messages`, `folders`, `isStreaming`, `streamingMessageId`, `activeSpeechMessageId`, `sendMessage`, `stopGeneration`, `regenerateResponse`, and folder CRUD into `chatSlice`.

- [x] **Step 6: Refactor `src/store/useCryptoStore.ts`**
  Compose all 5 slices into `create<CryptoStoreState>()(...)` and configure Zustand `persist` middleware for persistent keys (`theme`, `isAuthenticated`, `widgets`, `watchlist`, `portfolio`).

---

### Task 3: Extract Dedicated Service Layer into `src/api/`

**Files:**
- Create: `src/api/marketService.ts`
- Create: `src/api/chatService.ts`
- Create: `src/api/walletService.ts`
- Create: `src/api/index.ts`
- Modify: `src/store/slices/chatSlice.ts`
- Modify: `src/store/slices/marketSlice.ts`

**Interfaces:**
- Produces: `fetchMarketOverview()`, `fetchCoins()`, `streamChatCompletion(prompt, options, onChunk)`, `generateDynamicWallet()`

- [x] **Step 1: Create `src/api/marketService.ts`**
  Encapsulate market data querying, ticker jitter simulations, and sparkline calculations.

- [x] **Step 2: Create `src/api/chatService.ts`**
  Encapsulate streaming token chunking, throttled dispatch buffers, and Deep Research progress steps.

- [x] **Step 3: Create `src/api/walletService.ts`**
  Encapsulate simulated wallet address generation and testnet faucet top-ups.

- [x] **Step 4: Wire services into `src/store/slices/`**
  Replace inline simulation logic in store slices with calls to the dedicated `src/api/` services.

---

### Task 4: Refactor Modals to Use Unified `<Modal />` Primitive

**Files:**
- Modify: `src/components/modals/RenameModal.tsx`
- Modify: `src/components/modals/DeleteModal.tsx`
- Modify: `src/components/modals/FolderModal.tsx`
- Modify: `src/components/modals/AlertsModal.tsx`
- Modify: `src/components/modals/PortfolioModal.tsx`
- Modify: `src/components/modals/WatchlistModal.tsx`
- Modify: `src/components/modals/ShareModal.tsx`
- Modify: `src/components/modals/SettingsModal.tsx`
- Modify: `src/components/modals/UpgradeProModal.tsx`
- Modify: `src/components/modals/AuthWalletModal.tsx`
- Modify: `src/components/modals/LeaderboardModal.tsx`
- Modify: `src/components/modals/ActiveAgentsModal.tsx`
- Modify: `src/components/widgets/AddWidgetModal.tsx`

**Interfaces:**
- Consumes: `<Modal />` from `src/components/ui`

- [x] **Step 1: Refactor utility modals (`RenameModal`, `DeleteModal`, `FolderModal`)**
  Replace repeated backdrop and header markup with `<Modal>`.

- [x] **Step 2: Refactor financial modals (`PortfolioModal`, `WatchlistModal`, `AlertsModal`)**
  Standardize on `<Modal>` with consistent padding, scrollbars, and buttons.

- [x] **Step 3: Refactor feature modals (`SettingsModal`, `ShareModal`, `UpgradeProModal`, `AuthWalletModal`, `LeaderboardModal`, `ActiveAgentsModal`, `AddWidgetModal`)**
  Complete modal migration onto shared `<Modal>`.

---

### Task 5: Stream Batching & Hook Cleanup

**Files:**
- Modify: `src/store/slices/chatSlice.ts`
- Modify: `src/hooks/useSpeechRecognition.ts`
- Modify: `src/hooks/useTextToSpeech.ts`

- [x] **Step 1: Optimize streaming state updates in `chatSlice.ts`**
  Implement 50ms batching or requestAnimationFrame throttling for stream tokens to eliminate React 19 render thrashing.

- [x] **Step 2: Audit audio & speech cleanup in hooks**
  Ensure Web Audio `AudioContext.close()` and `speechSynthesis.cancel()` are cleanly called on unmount.

---

### Task 6: Synchronize Project Documentation & Checklists

**Files:**
- Modify: `IMPLEMENTATION.md`
- Modify: `TODO.md`
- Modify: `onpkg_docs/implementation.md`
- Modify: `onpkg_docs/todo.md`

- [x] **Step 1: Update `IMPLEMENTATION.md` and `onpkg_docs/implementation.md`**
  Reflect the sliced store architecture, `src/components/ui/` primitives, and `src/api/` service layer.

- [x] **Step 2: Update `TODO.md` and `onpkg_docs/todo.md`**
  Include the completed refactoring milestones and architecture improvements.
