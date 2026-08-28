# Design System & UI Specification — CryptoGPT

## 1. Aesthetic Identity & Philosophy

CryptoGPT delivers an ultra-premium, modern SaaS interface combining the conversation clarity of ChatGPT, the craft of Linear, the document elegance of Notion, and the tactile refinement of Apple Human Interface Guidelines (HIG).

### 1.1 Strict Rules & Constraints
- **Light Theme Only**: No dark mode default. Clean, bright, and legible across all ambient environments.
- **Background**: `#F7F8FA`
- **Surface & Cards**: `#FFFFFF`
- **Primary Brand**: `#5B5CEB` (Deep Royal Indigo)
- **Primary Gradient**: `linear-gradient(135deg, #5B5CEB 0%, #7677F4 100%)` (Only on key CTA buttons like `+ New Chat`)
- **Border**: `#ECECEC`
- **Text Primary**: `#111111`
- **Text Secondary**: `#666666`
- **Text Muted**: `#8E8E93`
- **Radius**: `20px` (or `rounded-2xl` / `rounded-3xl` where appropriate)
- **Avoid Glassmorphism**: High-contrast opaque surfaces with clean boundaries.
- **Avoid Random Gradients**: Solid, elegant surfaces with gradients strictly reserved for primary actions.

---

## 2. 8-Point Spacing Grid

All layout dimensions, paddings, margins, and gaps adhere to multiples of 8px:
- `8px` (`p-2`, `gap-2`): Compact icon padding, chip gap
- `16px` (`p-4`, `gap-4`): Standard element spacing, card internal padding
- `24px` (`p-6`, `gap-6`): Container padding, section separators
- `32px` (`p-8`, `gap-8`): Major layout boundaries
- `48px` (`py-12`): Hero headers & empty state spacing
- `64px` (`py-16`): Maximum section spacing

---

## 3. Typography (Inter)

- **Headings (H1/H2)**: Inter Semibold / Bold (600/700), `-0.025em` tracking, `#111111`
- **Body Regular**: Inter Regular (400), `1.6` line-height, `#111111`
- **Body Muted / Secondary**: Inter Medium (500), `#666666`
- **Microcopy / Badges**: Inter Medium/Semibold (500/600), `11px - 12px` font-size, uppercase tracking `+0.05em`
- **Financial Figures**: `font-variant-numeric: tabular-nums;` for rock-solid vertical alignment.

---

## 4. Key Point Badges & Feature Cards (Reference Screenshot Matching)

AI responses feature specialized high-fidelity key-point bullet blocks with custom icon badges:
1. **Decentralized (Orange Badge `#F97316`)**: Fork / Node network icon
2. **Secure (Green Badge `#10B981`)**: Shield with checkmark icon
3. **Transparent (Blue Badge `#3B82F6`)**: Document ledger / eye icon
4. **Limited Supply (Purple Badge `#8B5CF6`)**: Cube / 21M finite block icon

---

## 5. Microinteractions & Spring Curves

- **Durations**: Strictly `180ms`, `220ms`, and `250ms` (no sluggish or delayed animations).
- **Spring Parameters**: `stiffness: 400`, `damping: 30`, `mass: 0.8`.
- **Card Hover Elevation**: `translateY(-2px)` + soft drop shadow transition.
- **Button Micro-press**: `scale(0.97)` on active click.
- **Input Glow**: Subtle 3px indigo focus ring `#5B5CEB` with 15% opacity.
- **Respect Prefers-Reduced-Motion**: Automatically disables physics springs if user has enabled OS motion reduction.
