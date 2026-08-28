# Product Requirements Document (PRD) — CryptoGPT

**Product Name:** CryptoGPT  
**Category:** AI Cryptocurrency Assistant & Market Intelligence SaaS  
**Target Design Benchmark:** ChatGPT + Linear + Notion + Apple Human Interface Guidelines (HIG)  
**Theme:** Premium Light Theme Only (`#F7F8FA` Canvas, `#FFFFFF` Cards, `#5B5CEB` Primary, `#ECECEC` Borders)

---

## 1. Executive Summary & Vision
CryptoGPT is an enterprise-grade AI chat application tailored specifically for the cryptocurrency, DeFi, and Web3 ecosystem. It merges the conversational intelligence of top AI assistants (ChatGPT, Claude, Perplexity) with the real-time financial telemetry of Bloomberg Terminal and TradingView, packaged in an Apple-inspired minimalist aesthetic.

---

## 2. Core Pillars & Design Principles

### 2.1 Aesthetic & Visual Philosophy
- **Light Theme Only**: Crisp, distraction-free environment with high readability.
- **Color Discipline**: No gaudy neon glows or dark mode neon greens. Base canvas `#F7F8FA`, card surface `#FFFFFF`, primary action `#5B5CEB`, border `#ECECEC`, typography `#111111` / `#666666`.
- **Gradients Only on Key CTA**: Subtle luxury gradient applied exclusively to primary buttons (e.g. `+ New Chat`, `Deep Research` badge).
- **8-Point Spacing System**: Strict 8px grid (8px, 16px, 24px, 32px, 48px, 64px) for pixel-perfect balance.
- **Card & Boundary Geometry**: 20px radius (`rounded-2xl` / `rounded-3xl`) with soft ambient shadows (`0 4px 20px rgba(0,0,0,0.04)`).
- **Typography**: Inter / Inter Variable font with optimal line-heights and tabular numerals for financial prices.

---

## 3. Layout Architecture

### 3.1 Three-Column Desktop Grid
1. **Left Sidebar (280px)**:
   - Header with CryptoGPT logo, title, and status pill.
   - `+ New Chat` primary action button with shortcut hint (`⌘N`).
   - Quick Search bar with shortcut (`⌘K`) triggering instant conversation filter and Command Palette.
   - Categorized Chat History accordions: `Pinned`, `Today`, `Yesterday`, `Last 7 days`, `Older`.
   - Hover reveals for pin, rename, duplicate, and delete actions.
   - Bottom utility links: Watchlist, Alerts, Portfolio, Settings, Upgrade to Pro.
   - User Profile card with avatar, name (`Vishal Raj`), email (`vishalraj@email.com`), and account popover.

2. **Center Conversation Canvas (Max-width 820px)**:
   - Header Bar: Dynamic chat title dropdown, bookmark/pin toggle, share conversation, export options (Markdown, PDF, JSON), model selector badge.
   - Message Stream:
     - User Message bubble with timestamp and read receipt checkmarks.
     - Assistant Message with CryptoGPT brand mark, step-by-step thinking disclosure ("Deep Research"), formatted response text, key points highlight cards with colored icon badges, embedded live coin price widgets, syntax-highlighted code blocks with copy action, markdown tables, and LaTeX math formulas.
     - Action toolbar: Thumbs Up / Down with feedback toast, Copy response with animated icon, Text-to-Speech audio reader with live equalizer visualizer, Regenerate, Continue generation.
     - Contextual Follow-up Chips: 4 dynamic prompts that adapt to the conversation topic.
   - Intelligent Input Console:
     - Floating pill container (24px radius, white surface, border `#ECECEC`, ambient elevation).
     - Auto-expanding textarea with natural line transitions.
     - Attachment button (`+`) with drag-and-drop file/image/CSV upload.
     - Web Search toggle (`🌐 Live Web`).
     - Deep Research toggle (`✨ Deep Research NEW`).
     - Voice Input Microphone with Web Speech recognition and audio waveform.
     - Primary Send button with spring morph to stop icon while generating.
     - Regulatory volatility disclaimer.

3. **Right Insights & Market Telemetry Panel (340px)**:
   - **Market Overview**: Total Market Cap, 24h Global Volume, BTC Dominance %, Fear & Greed Index with animated semi-circular gauge.
   - **Top Coins Watchlist**: Real-time pricing, 24h % badges, and sparkline trends for BTC, ETH, USDT, BNB, SOL, etc. Clicking any coin dynamically asks AI or plots the chart.
   - **Interactive Coin Price Chart**: Coin switcher, timeframe selector (`1H`, `24H`, `7D`, `1M`, `1Y`, `ALL`), animated SVG curve, crosshair price tooltips, 24h High/Low stats.
   - **Latest News Feed**: Curated headlines with source tags, timestamps, and modal reader.
   - **Portfolio & Watchlist Manager**: Quick asset allocation, P&L calculations, and price alerts.

---

## 4. Key Functional Capabilities (Prompt 1 - 4 Matrix)

| Domain | Features & Specifications |
| :--- | :--- |
| **Chat Intelligence** | Real-time streaming simulation, multi-turn context memory, chain-of-thought "Thinking" accordion, 30+ pre-built crypto domain scenarios, stop/regenerate generation. |
| **Rich Content** | Markdown formatting, Solidity/Python/Rust code highlighting, interactive tables, LaTeX math (impermanent loss, Sharpe ratio), inline token price cards. |
| **Voice & Multimodal** | Speech-to-text recording with live audio visualizer, text-to-speech audio reader, drag-and-drop file & image attachments. |
| **Market Data** | Live ticker simulation, animated Fear & Greed gauge, SVG interactive charts, portfolio value tracker, price alert notifications. |
| **Navigation & Search** | `⌘K` Command Palette, instant conversation filter, pinned chats, rename/delete modals, share link generator, PDF/Markdown export. |
| **Motion & Microinteractions**| Framer motion 180ms/220ms/250ms springs, card hover lifts, animated counter numbers, pulse skeletons, sound effects. |
| **Accessibility & Performance**| Full keyboard navigation, semantic HTML, ARIA compliance, Lighthouse >95 score target, 60fps GPU transforms. |
