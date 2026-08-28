# CryptoGPT Task Tracker & Implementation Checklist (TODO)

## Phase 1: UI Foundation & Architecture (Prompt 1)
- [x] Configure Tailwind CSS v4 design tokens in `src/index.css` (Colors: `#F7F8FA`, `#FFFFFF`, `#5B5CEB`, `#ECECEC`, `#111111`, `#666666`, radius `20px`, 8-pt spacing).
- [x] Create comprehensive TypeScript schemas in `src/types/crypto.ts`.
- [x] Seed rich initial data in `src/data/` (Conversations matching reference screenshot, Top 15 Coins, Market Stats, News).
- [x] Build 3-column desktop layout (`AppLayout.tsx`) with 280px left sidebar, max-820px center chat canvas, and 340px right insights panel.
- [x] Build responsive collapsible sidebars with mobile drawer toggle and tablet adaptations.
- [x] Implement pixel-perfect Left Sidebar (`Sidebar.tsx`):
  - [x] Header brand mark ("CryptoGPT - Your Crypto Assistant")
  - [x] `+ New Chat` button with Apple HIG gradient and soft shadow
  - [x] Search input with `⌘K` badge
  - [x] Collapsible history accordions (Today, Yesterday, Last 7 days, Pinned)
  - [x] Action icons on hover (Pin, Rename, Delete)
  - [x] Bottom links (Watchlist, Alerts, Portfolio, Settings, Upgrade to Pro)
  - [x] User Profile card (Vishal Raj, vishalraj@email.com) with avatar and account popover
- [x] Implement Center Chat UI (`ChatContainer.tsx`):
  - [x] Chat header with title dropdown, pin button, share button, and more options menu
  - [x] User message bubble with timestamp and double checkmark
  - [x] Assistant message layout matching reference screenshot with orange/green/blue/purple styled bullet points
  - [x] Message action bar (Thumbs Up/Down, Copy, TTS Readout, Regenerate)
  - [x] Contextual suggested follow-up chips
  - [x] Chat Input Bar with attachment (+), web search toggle, Deep Research badge, microphone, and send button
  - [x] Volatility disclaimer footnote
- [x] Implement Right Insights Panel (`InsightsPanel.tsx`):
  - [x] Market Overview card (Market Cap, 24h Vol, BTC Dominance, Fear & Greed Index with SVG gauge)
  - [x] Top Coins interactive table (#, Coin, Price, 24h %)
  - [x] Interactive Coin Price Chart with timeframe picker (1H, 24H, 7D, 1M, 1Y, ALL) and animated SVG curve
  - [x] Latest News card with thumbnail, headline, source, and time

## Phase 2: Animations & Microinteractions (Prompt 2)
- [x] Setup Framer Motion springs (180ms, 220ms, 250ms) for snappy, fluid 60fps animations.
- [x] Button micro-lifts and card hover elevation (`shadow-card`).
- [x] Sidebar active indicator animations and hover reveals.
- [x] Input bar expand animation, placeholder transitions, and send button morphing.
- [x] Streaming text animation with blinking typewriter cursor.
- [x] Step-by-step thinking state accordion ("Deep Research" progress).
- [x] Animated number counters (`countUp`) on price changes and market stats.
- [x] Interactive SVG chart line drawing with gradient fill and hover crosshairs.
- [x] Skeleton loading placeholders for network simulations.
- [x] Scroll to bottom button with smooth momentum scroll and unread indicator.

## Phase 3: Chat Experience & Capabilities (Prompt 3)
- [x] Realistic streaming AI simulation engine with crypto domain intelligence (30+ topics).
- [x] Multi-turn conversational state tracking in Zustand with localStorage persistence.
- [x] Stop generating and Continue generating controls.
- [x] Text-to-Speech (TTS) voice readout with Web Speech API and live animated sound equalizer.
- [x] Voice recording STT input with microphone analysis and animated canvas audio waveform.
- [x] Drag & drop file attachment system with image previews and badge attachments.
- [x] Rich Markdown rendering with syntax highlighting, copy code buttons, tables, and LaTeX math.
- [x] Global Command Palette (`⌘K`) with fuzzy search across chats, crypto tokens, settings, and quick actions.
- [x] Chat management modals: Rename Chat, Delete Chat, Share Conversation, Export (Markdown, PDF, JSON).
- [x] Live Watchlist, Portfolio P&L tracker, and Target Price Alert manager.

## Phase 4: Final Polish & Accessibility (Prompt 4)
- [x] Strict 8-point spacing audit across all components.
- [x] Semantic HTML5 tags (`<main>`, `<aside>`, `<header>`, `<nav>`, `<article>`, `<section>`).
- [x] Keyboard navigation (`Enter` to send, `Shift+Enter` newline, `⌘K` command palette, `⌘N` new chat, `Esc` close modal).
- [x] ARIA labels, focus visible outlines, and screen reader announcements.
- [x] Confetti celebrations on portfolio sync / pro upgrades / message copy.
- [x] Production build verification with Vite.
