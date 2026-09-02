# Technical Implementation Plan — dopamint / CryptoGPT

Refer to detailed execution plan in [`docs/superpowers/plans/2026-09-02-codebase-refactor-and-modularization.md`](file:///home/aswin/programming/vscode/celestialabs/dopamint_product/docs/superpowers/plans/2026-09-02-codebase-refactor-and-modularization.md) and [`onpkg_docs/implementation.md`](file:///home/aswin/programming/vscode/celestialabs/dopamint_product/onpkg_docs/implementation.md).

### Architecture Overview
1. **Layout & Shell**: Responsive 3-column layout (`AppLayout.tsx`) with dual-rail sidebar, max-820px center chat canvas, and 340px right telemetry panel.
2. **Conversation System**: Real-time token streaming generator, Deep Research thinking state, key point cards, code highlighting, LaTeX formulas, voice reader TTS, voice input STT.
3. **Market Dashboard & Widgets**: 15 customizable financial widgets (Order Book Depth, Whale Tracking, Netflows, Token Unlocks, Market Stats) with reordering and expand toggles.
4. **Sliced State Management**: Zustand root store composed from 5 modular domain slices (`uiSlice`, `authSlice`, `chatSlice`, `marketSlice`, `widgetSlice`) with `persist` middleware.
5. **Shared UI Primitives**: Reusable `<Modal />`, `<Button />`, `<Card />`, `<Badge />`, and `<Input />` components standardizing design tokens.
6. **Dedicated API Layer**: Service layer in `src/api/` decoupling UI from data fetching and simulation logic.
