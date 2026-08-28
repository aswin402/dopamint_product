# Technical Implementation Plan — CryptoGPT

Refer to detailed docs in [`onpkg_docs/implementation.md`](file:///home/aswin/programming/vscode/celestialabs/dopamint_product/onpkg_docs/implementation.md).

### Core Components Summary
1. **Layout & Shell**: Responsive 3-column layout (`AppLayout.tsx`) with 280px sidebar, 820px max-width center chat, 340px insights panel.
2. **Conversation System**: Real-time token streaming generator, thinking state expander, key point cards, code highlighting, LaTeX formulas, voice reader TTS, voice input STT.
3. **Market Dashboard**: Live simulated ticker updates, interactive SVG chart with crosshair tooltip, Fear & Greed gauge, News feed.
4. **Modals & Overlays**: `⌘K` Command Palette, Portfolio tracker, Watchlist, Price Alerts, Share Chat, Upgrade to Pro with confetti.
