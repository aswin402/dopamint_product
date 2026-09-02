# Technical Implementation Plan — dopamint / CryptoGPT

Detailed task execution plan is documented in [`docs/superpowers/plans/2026-09-02-codebase-refactor-and-modularization.md`](file:///home/aswin/programming/vscode/celestialabs/dopamint_product/docs/superpowers/plans/2026-09-02-codebase-refactor-and-modularization.md).

## 1. Stack & Architecture Overview
- **Runtime & Tooling:** Bun v1.3+, Vite v8, TypeScript 6.0
- **Framework:** React 19 (Hooks, Suspense, Concurrent Rendering)
- **Styling:** Tailwind CSS v4, Custom OKLCH CSS Variables, `@fontsource-variable/inter`
- **Animation & Motion:** Framer Motion (v12) with physics-based spring transitions (180ms, 220ms, 250ms), GSAP for precision path drawing
- **State Management:** Sliced Zustand Store (`uiSlice`, `authSlice`, `chatSlice`, `marketSlice`, `widgetSlice`) with `persist` middleware
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti

---

## 2. Directory Structure

```
src/
├── api/                           # Service layer & API adapters
│   ├── chatService.ts             # LLM stream parser & simulation adapter
│   ├── marketService.ts           # Token prices & ticker updates
│   ├── walletService.ts           # Faucet & auth endpoints
│   └── index.ts
├── assets/                        # Logos, badges, crypto token SVG icons
├── components/
│   ├── auth/                      # Login & dynamic wallet onboarding
│   ├── chat/                      # Chat message stream, bubbles, input console
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
│   ├── common/                    # Folder icons, token icons
│   ├── dashboard/                 # Main discovery canvas
│   ├── insights/                  # Telemetry panel & Sources citations
│   ├── layout/                    # Responsive 3-column app shell
│   ├── leaderboard/               # Ranked wallets & Faucet top-ups
│   ├── modals/                    # Specific modal contents
│   ├── points/                    # Quests & XP system
│   ├── refer/                     # Referral commission engine
│   ├── sidebar/                   # Dual-rail navigation & folders
│   ├── ui/                        # Reusable UI primitives
│   │   ├── Modal.tsx              # Shared accessible modal container
│   │   ├── Button.tsx             # Standardized button variants
│   │   ├── Badge.tsx              # Trend & status badges
│   │   ├── Card.tsx               # Surface card container
│   │   ├── Input.tsx              # Styled form input & focus ring
│   │   └── index.ts
│   └── widgets/                   # 15 customizable financial widgets
├── data/                          # Seed datasets
├── hooks/                         # Speech recognition, TTS, keyboard shortcuts
├── lib/                           # Formatters, utils, confetti
├── providers/                     # React Query provider
├── store/                         # Modular Zustand store architecture
│   ├── slices/
│   │   ├── uiSlice.ts             # Theme, sidebar, insights, modal states
│   │   ├── authSlice.ts           # User profile, wallet state, login/logout
│   │   ├── chatSlice.ts           # Conversations, messages, folders, streaming
│   │   ├── marketSlice.ts         # Coins, market overview, watchlist, alerts
│   │   └── widgetSlice.ts         # Widget ordering, add/remove, expand
│   └── useCryptoStore.ts          # Root combined store
└── types/
    └── crypto.ts                  # TypeScript interfaces and schemas
```

---

## 3. Implementation Roadmap
1. **Shared UI Primitives**: Build `<Modal />`, `<Button />`, `<Card />`, `<Badge />`, and `<Input />` in `src/components/ui/`.
2. **Store Slicing**: Decompose `useCryptoStore.ts` into 5 domain slices with Zustand `persist`.
3. **API Layer Extraction**: Create `chatService.ts`, `marketService.ts`, and `walletService.ts` in `src/api/`.
4. **Modal Migration**: Refactor all 13 modals in `src/components/modals/` to use `<Modal />`.
5. **Streaming Optimization**: Add 50ms batching for token state dispatches.
