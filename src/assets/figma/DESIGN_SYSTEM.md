# 🎨 Dopamint Design System & Figma Architecture

## Executive Overview
This document specifies the exact layout structure, component hierarchy, design tokens, and Figma canvas organization established for the **Dopamint ("Ask Dope")** platform.

---

## 1. 📐 Figma Canvas Architecture & Flows

The Figma document is organized into **4 logical, linear UX flows** aligned on a common horizontal baseline (`Y = 2800`):

```
                                  [ CANVAS OVERVIEW (Y = 2520 - 4564) ]
  FLOW 01: AUTH & ONBOARDING      FLOW 02: CORE AI ASSISTANT       FLOW 03: REWARDS HUB             FLOW 04: DESIGN SYSTEM
  ┌──────────────┬──────────────┐ ┌──────────────┬───────────────┐ ┌──────────────┬───────────────┐ ┌──────────────┬───────────────┐
  │ login_page   │ wallet_id    │ │ dashboard    │ new_chat_page │ │ leaderboard  │ refer_and_earn│ │ style-guide  │ style-guide   │
  │ (6:3)        │ (7:89)       │ │ (8:148)      │ (19:2)        │ │ (9:674)      │ (9:1262)      │ │ light (47:3) │ dark (47:2447)│
  │ X: 2000      │ X: 4160      │ │ X: 6560      │ X: 8720       │ │ X: 11120     │ X: 13280      │ │ X: 17840     │ X: 20000      │
  └──────────────┴──────────────┘ └──────────────┴───────────────┘ └──────────────┴───────────────┘ └──────────────┴───────────────┘
```

### Flow Definitions:
1. **Flow 01: Authentication & Onboarding** (X: 2000 – 6080)
   - `login_page` (`6:3`): Modal authentication, email sign-in, social connect, wallet connector.
   - `wallet_id` (`7:89`): Web3 identification, signature verification, network picker.
2. **Flow 02: Core AI Assistant Experience** (X: 6560 – 10640)
   - `dashboard_homepage` (`8:148`): "Ask Dope" hero search, quick category pills (Trending, Stock, Pre-IPO, Crypto, Sentiment, Learn), streak widget, and dual sidebar navigation.
   - `new_chat_page` (`19:2`): Active conversational stream, multimodal actions (mic, attach, copy, thumbs feedback).
3. **Flow 03: Gamification & Rewards Hub** (X: 11120 – 17360)
   - `leaderboard` (`9:674`): Global rank, weekly tier progressions, XP leaderboard.
   - `refer_and_earn` (`9:1262`): On-chain referral link generator, invited user stats, reward tiers.
   - `points_and_xp_hub` (`9:1907`): Quest tracking, Level 1 to 10 progression, streak bonus claim.
4. **Design System & Tokens** (X: 17840 – 21920)
   - `style-guide-light` (`47:3`): Comprehensive light tokens, component matrices, buttons, typography scale.
   - `style-guide-dark` (`47:2447`): Dark theme contrast matrix, inverted tokens, nocturnal UI states.

---

## 2. 🎨 Variables & Design Tokens

### Color Palette (Light Theme)
| Token Name | Hex Value | Semantic Usage |
|---|---|---|
| `bg-canvas` | `#FCFBF7` | Main window background |
| `bg-sidebar` | `#F7F6EC` | Left sidebar & recent chats pane |
| `bg-card` | `#FFFFFF` | Center cards & input containers |
| `bg-subtle` | `#ECEBDE` | Filter pills, unread count badges |
| `bg-active` | `#E6EEE1` | Selected navigation items & active chat row |
| `border-subtle` | `#E8E7DE` | Separators, stroke borders, container outlines |
| `primary-brand` | `#44503E` | Main action buttons ("New Chat", active filters) |
| `primary-hover` | `#3B4635` | Button hover & active press |
| `accent-emerald`| `#00BC7D` | Online indicators, active streak, positive yields |
| `accent-warning`| `#FE9A00` | PRO subscription badge, Testnet alert |
| `web3-purple`   | `#AD46FF` – `#4F39F6` | Wallet badge border & gradient highlight |
| `text-primary`  | `#171614` | Headings, titles, active labels |
| `text-secondary`| `#56554F` | Body text, chat query snippet |
| `text-muted`    | `#7B7A74` | Timestamps, search placeholders, shortcut keys |

### Color Palette (Dark Theme)
| Token Name | Hex Value | Semantic Usage |
|---|---|---|
| `bg-canvas-dark` | `#111210` | Dark mode main background |
| `bg-sidebar-dark`| `#171916` | Dark mode sidebars |
| `bg-card-dark`   | `#1D201C` | Dark mode elevated cards |
| `border-dark`    | `#2C312A` | Dark mode container borders |
| `text-primary`   | `#F4F3EE` | Dark mode high-contrast text |
| `text-muted`     | `#71746B` | Dark mode timestamps & secondary labels |

---

## 3. ✍️ Typography Scale

| Style Level | Font Family | Size / Line Height | Weight | Letter Spacing | Example Use |
|---|---|---|---|---|---|
| **Display** | Inter | 43.5px / 57.5px | Regular (400) | -1.15px | Hero `"Ask Dope"` title |
| **Heading 1** | Roboto | 24px / 32px | Bold (700) | -0.60px | `"Good morning 0x71C..."` |
| **Heading 2** | Roboto | 20px / 28px | Bold (700) | -0.50px | Card & section headers |
| **Body Large** | Roboto | 14px / 20px | Medium (500) | 0px | Button labels, tabs |
| **Body Regular**| Roboto | 13.5px / 19.3px | Regular (400) | -0.34px | Chat history preview items |
| **Caption** | Roboto | 12px / 16px | Medium (500) | 0px | Category filter pills (`Trending`, `Stock`) |
| **Micro** | Roboto | 10.5px / 14px | Bold (700) | -0.26px | Section tag labels (`Today`, `Pinned`) |
| **Badge** | Roboto | 10px / 13.3px | Bold (700) | 0px | Counter circles (`6`, `12`) |
| **Mono Address**| Inter | 11px / 14.7px | Bold (700) | 0px | Web3 Wallet (`0x`, `Testnet`) |

---

## 4. 📐 Spacing & Radius System

- **8-Point Rhythm Grid**: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `48px`, `64px`.
- **Corner Radii Tokens**:
  - `radius-sm`: `4px` (Small tooltips, keyboard badges `⌘K`)
  - `radius-md`: `8px` (Search inputs, icon buttons)
  - `radius-lg`: `12px` (Cards, chat history rows, regular buttons)
  - `radius-xl`: `16px` (Avatars, dialog panels)
  - `radius-pill`: `9999px` (Filter buttons, streak badges, status indicators)

---

## 5. 🏷️ Semantic Container & Layer Dictionary

| Figma Node ID | Raw Layer Name | Semantic Component Name | Dimensions | Purpose & Role |
|---|---|---|---|---|
| `8:151` | `Container` | `Sidebar_Master_Wrapper` | 320x1200 | Houses the dual navigation sidebar system |
| `8:152` | `Aside` | `Sidebar_Primary_Icon_Rail` | 60x1200 | Fixed left icon rail for main app routes |
| `8:225` | `Aside` | `Sidebar_Chat_History_Drawer` | 260x1200 | Collapsible panel for recent conversations & search |
| `8:414` | `Main` | `Main_Content_Viewport` | 1600x1200 | Main responsive application canvas |
| `8:416` | `Container` | `Center_Chat_Column` | 1000x1151 | Centered column with 8-pt vertical rhythm |
| `8:417` | `Container` | `Top_Header_Bar` | 1000x70 | User greeting, 0x wallet address & PRO badge |
| `8:444` | `Container` | `Hero_Ask_Dope_Section` | 1000x340 | Hero unit with Dopamint Crown, title & filter pills |
| `8:450` | `Container` | `Filter_Category_Pills_Row` | 680x46 | Horizontal pill filter row (Trending, Stock, Crypto) |
| `8:244` | `Input` | `Search_Chats_Input_Bar` | 227x34 | Search input with ⌘K badge indicator |
| `8:236` | `Button` | `New_Chat_Primary_Button` | 227x40 | Primary forest CTA button to initiate new chat |
| `6:14` | `dopamint crown` | `Brand_Logo_Crown_28` | 28x28 | Vector/Raster brand crown on Auth modal |
| `19:2` | `new_chat_page` | `Conversational_Stream_View`| 1920x1200 | Real-time chat dialogue screen |
| `9:674` | `leaderboard` | `Gamification_Leaderboard_View`| 1920x1351 | Community ranks, XP leaderboards & prize pool |
| `9:1262`| `refer_and_earn`| `Referral_Program_View` | 1920x1514 | Referral link generator, tiers & commission tracking |
| `9:1907`| `points_and_xp_hub`| `Rewards_XP_Quest_Hub` | 1920x1764 | Level 1-10 badges, streak bonuses & quest log |

---

## 6. ⚡ Interactive Prototyping & User Journey Routing Matrix

| Trigger Element | Figma Source Node | User Event | Destination Screen | React Web Route | Animation Transition |
|---|---|---|---|---|---|
| **Login CTA Button** | `6:23` | `On Click` | `wallet_id` (`7:89`) | `/auth/wallet` | Instant Modal Overlay |
| **Verify & Connect** | `7:135` | `On Click` | `dashboard_homepage` (`8:148`) | `/dashboard` | Dissolve / Fade |
| **New Chat Primary** | `8:236` | `On Click` / `⌘K` | `new_chat_page` (`19:2`) | `/chat/new` | Instant |
| **Recent Chat Row** | `8:282` | `On Click` | `new_chat_page` (`19:2`) | `/chat/:id` | Slide Left (200ms) |
| **Leaderboard Nav** | `8:174` | `On Click` | `leaderboard` (`9:674`) | `/leaderboard` | Instant |
| **Referrals Nav** | `8:185` | `On Click` | `refer_and_earn` (`9:1262`) | `/referral` | Instant |
| **Points / XP Nav** | `8:190` | `On Click` | `points_and_xp_hub` (`9:1907`) | `/rewards` | Instant |
| **Streak Flame Card** | `8:515` | `On Click` | `points_and_xp_hub` (`9:1907`) | `/rewards#streak` | Smart Animate (300ms) |
| **Invite Friends Card**| `8:558` | `On Click` | `refer_and_earn` (`9:1262`) | `/referral#invite` | Smart Animate (300ms) |
