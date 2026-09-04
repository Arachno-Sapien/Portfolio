---
name: Syed Junaid Khalander — Portfolio
description: A dark-first engineering console for a recruiter-facing student portfolio, with warm amber signal accents and a full light-mode parity theme.
colors:
  night-navy: "#0b0f19"
  console-panel: "#111827"
  console-glass: "rgba(15, 19, 31, 0.7)"
  console-hairline-fill: "rgba(255, 255, 255, 0.03)"
  console-white: "#f8fafc"
  slate-mist: "#c5cedd"
  amber-signal: "#f5b971"
  amber-signal-bright: "#ffd28d"
  hairline-border: "rgba(255, 255, 255, 0.14)"
  ambient-shadow: "rgba(0, 0, 0, 0.25)"
  ink-navy: "#0f172a"
  alert-red: "#ef4444"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "normal"
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  pill: "999px"
  card: "2rem"
  menu: "1rem"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.console-white}"
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.card}"
    padding: "1rem 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.console-white}"
    textColor: "{colors.ink-navy}"
  button-secondary:
    backgroundColor: "{colors.alert-red}"
    textColor: "#ffffff"
    rounded: "{rounded.card}"
    padding: "1rem 1.25rem"
  chip:
    backgroundColor: "{colors.console-hairline-fill}"
    textColor: "{colors.console-white}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.75rem"
  card:
    backgroundColor: "{colors.console-glass}"
    textColor: "{colors.console-white}"
    rounded: "{rounded.card}"
    padding: "1.5rem"
  theme-toggle:
    backgroundColor: "{colors.console-glass}"
    textColor: "{colors.console-white}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1rem"
---

# Design System: Syed Junaid Khalander — Portfolio

## Overview

**Creative North Star: "The Night Console"**

The portfolio reads as an engineering instrument panel at night: a near-black navy field, lit by a single warm amber signal, housed in soft translucent glass panels. It is warm and approachable rather than clinical — the amber glow and rounded, pill-shaped controls keep the "console" from feeling sterile or corporate, while the restraint of the accent color keeps it precise rather than decorative. The system exists in full light-mode parity (near-white "paper" field, rust/burnt-orange signal), toggled by the visitor and persisted locally, so every token below has a confirmed pair in both themes.

Avoid: loud multi-color gradients, neon/cyberpunk glow effects, cold corporate-flat SaaS blue, and sterile enterprise styling. The voice is "warm approachable engineer," not "startup landing page."

**Key Characteristics:**
- Dark-first radial-gradient field (near-black navy) with a full light-theme pair, switched via `[data-theme]` and persisted in `localStorage`.
- One warm accent color (amber in dark, rust/burnt-orange in light), used sparingly — hover states, links, and small labels only, never as a fill.
- Translucent "glass" panel surfaces (rgba backgrounds, `backdrop-filter: blur(20px) saturate(160%)`) layered over the gradient field instead of opaque cards — true frosted glass, not just a tinted overlay.
- Heavily rounded, near-pill geometry everywhere — buttons, chips, nav toggle, cards.
- Soft, diffuse ambient shadows; no hard/crisp drop shadows.
- Tactile hover language: small upward lift (`translateY(-1px)`) plus a brightness bump, never a scale-pop.

## Colors

Two full theme palettes exist as a matched pair, switched by `html[data-theme]`. Dark is the canonical default (`:root` sets `color-scheme: dark` with no attribute needed); light is a confirmed, equally-finished alternate, not an afterthought.

### Primary — Dark theme (default)
- **Amber Signal** (`#f5b971`): the one accent. Used only on link hover, the scroll-progress bar, card-meta labels, certificate sub-titles, and focus outlines.
- **Amber Signal Bright** (`#ffd28d`): hover/active state of the accent, and the far end of the scroll-progress gradient.

### Primary — Light theme
- **Rust Signal** (`#9a3412`): the light-theme accent, same roles as Amber Signal.
- **Rust Signal Bright** (`#c2410c`): hover/active state of the light accent.

### Secondary
- **Alert Red** (`#ef4444`, dark theme) / **Ember Orange** (`#d97706`, light theme): the secondary CTA fill (`btn-color-2`, used by "View Resume"). Distinct from the primary accent — this is the only place a second hue appears.

### Neutral — Dark theme
- **Deep Space Navy** (`#0b0f19`): page background base, radiating from `#18223c` near the top to `#05070d` at the edges.
- **Console Panel** (`#111827`): opaque strong-surface fallback (e.g. the scroll-to-top button).
- **Console Glass** (`rgba(15, 19, 31, 0.7)`, `backdrop-filter: blur(20px) saturate(160%)`): the translucent card/nav surface — this is the workhorse "surface" token, and the one actually blurred, not just tinted.
- **Console Hairline Fill** (`rgba(255, 255, 255, 0.03)`): the barely-there fill inside chips/pills.
- **Console White** (`#f8fafc`): primary text, and the primary-button fill.
- **Slate Mist** (`#c5cedd`): muted/secondary text (all `<p>` elements by default).
- **Hairline Border** (`rgba(255, 255, 255, 0.14)`): every 1px border in the system.
- **Ambient Shadow** (`rgba(0, 0, 0, 0.25)`): the diffuse shadow color used at every elevation.

### Neutral — Light theme
- **Cool Paper** (`#f5f7fb`): page background base, radiating from pure white through `#eef2ff` to `#e5e7eb`.
- **Paper White** (`#ffffff`): opaque strong-surface fallback.
- **Frosted Paper** (`rgba(255, 255, 255, 0.7)`, `backdrop-filter: blur(20px) saturate(160%)`): translucent card/nav surface.
- **Ink Navy** (`#0f172a`): primary text, and the primary-button fill's text/background swap partner.
- **Slate Steel** (`#475569`): muted/secondary text.
- **Hairline Border (light)** (`rgba(15, 23, 42, 0.14)`) / **Ambient Shadow (light)** (`rgba(15, 23, 42, 0.12)`): border and shadow, same roles, warmed toward ink instead of pure black.

### Named Rules
**The Rare Amber Rule.** The accent color (Amber Signal / Rust Signal) never fills a surface. It appears only on: link hover/underline, the scroll-progress bar, `card-meta` labels, certificate sub-titles, focus-visible outlines, and hover states of the scroll-to-top button and theme toggle. If a new component wants to "add some color," reach for the accent's *rarity*, not its area.

**The Matched-Pair Rule.** No color token exists in only one theme. Every dark-theme token has a confirmed light-theme counterpart with the same role; a new token proposed for one theme must be designed for both before it ships.

## Typography

**Body Font:** Poppins (weights 300/400/500/600 loaded), falling back to system sans-serif.

**Character:** A single, humanist geometric sans carries the entire system — no serif or mono pairing. Hierarchy comes from size and letter-spacing, not a font swap, which keeps the console feel unified rather than editorial.

### Hierarchy
- **Display** (600, 3rem → 2rem at ≤600px, tight `-0.03em` tracking): page `h1.title`, one per section, always centered. No weight 700 is loaded, so headings render at the closest matched weight (600), not a true bold.
- **Headline** (600, 1.75rem → 1.25rem at ≤600px): `section__text__p2` (hero subtitle) and `certificates-sub-title`.
- **Body** (400, 1rem, muted-text color, 1.6 line-height): paragraph copy throughout; `hero-summary` caps at `42rem` measure.
- **Label** (400, 0.92rem → 0.8rem at ≤600px): pill-list tags (skills, project tech tags).
- **Nav label** (400, 1.1rem → 1rem at ≤600px): nav links and menu links.

### Named Rules
**The One-Family Rule.** Every weight and size on the page comes from Poppins. Do not introduce a second family for "emphasis" — use size, weight, color (sparingly, per the Rare Amber Rule), or letter-spacing instead.

## Layout

Centered, generously spaced desktop layout that collapses to a single stacked column on mobile.

- **Nav rail:** `min(1200px, calc(100% - 2rem))` centered, `17vh` tall — deliberately tall and airy, not a compact bar.
- **Section rhythm:** desktop sections carry `0 10rem` horizontal margin (full-bleed dark field behind them), stepping down at breakpoints: `5%` at ≤1200px. Vertical rhythm is `4vh` top padding per section, not a fixed spacing scale.
- **Grids:** education/skills use `repeat(auto-fit, minmax(16rem, 1fr))`; projects use `minmax(18rem, 1fr)`; all with `1.25rem` gap. Content-driven column count, never a fixed number of columns.
- **Composition gaps:** `2rem` between sibling cards (`about-containers`), `4rem` between major flex halves (`section-container`), `5rem` between the hero portrait and text.
- **Responsive collapse:** below 1200px, desktop nav swaps for the hamburger nav, multi-column sections stack vertically, and the hero portrait shrinks from `400px` to `275px` (then to `46vw` at ≤600px).
- **Section reveal:** sections fade up (`translateY(1.5rem)` → none, 600ms `cubic-bezier(0.16, 1, 0.3, 1)`) on scroll into view via IntersectionObserver, skipped entirely under `prefers-reduced-motion: reduce`.

## Elevation & Depth

Depth comes from two things working together, not from a shadow scale: **translucent glass surfaces** layered over the radial-gradient field, plus **soft, diffuse ambient shadows**. There is no hard/crisp shadow anywhere in the system — every `box-shadow` uses a large blur radius against the low-alpha `Ambient Shadow` token, so surfaces feel like they're glowing up off the dark field rather than being cut out and dropped on top of it.

### Shadow Vocabulary
- **Card lift** (`box-shadow: 0 16px 36px var(--shadow-color)`): `details-container`, `color-container`, `contact-info-upper-container`.
- **Pill lift** (`box-shadow: 0 12px 30px var(--shadow-color)`): theme toggle, scroll-to-top button.
- **Button lift** (`box-shadow: 0 10px 24px var(--shadow-color)`): all `.btn` elements.
- **Menu lift** (`box-shadow: 0 20px 40px var(--shadow-color)`): the hamburger dropdown menu.

### Named Rules
**The Glass-Console Rule.** Depth comes from translucency *and blur* over the gradient field, not from stacking opaque cards. A new surface should default to `Console Glass` / `Frosted Paper` (rgba background + `backdrop-filter: blur(20px) saturate(160%)`, with the `-webkit-` prefix for Safari) rather than a fully opaque fill — applied to panel-scale surfaces (cards, the contact container, the mobile menu dropdown) where there's something worth frosting behind them. Small persistent controls that need to stay legible over busy content at all times (scroll-to-top, the nav's theme toggle) stay on the fully opaque `Console Panel` / `Paper White` instead — real glass, not blur applied everywhere as a blanket filter.

**The No-Hard-Shadow Rule.** Every shadow is large-blur and low-opacity. A tight, dark, high-contrast shadow is off-system on sight.

## Shapes

Heavily rounded, near-pill geometry is the system's clearest signature.

- **Cards, images, containers:** `2rem` radius (`about-pic`, `details-container`, `color-container`, `contact-info-upper-container`, `project-img`).
- **Pills:** `999px` (full pill) on the theme toggle, all `pill-list` chips/tags, and the scroll-to-top circle.
- **Buttons:** `2rem` radius on a ~3rem-tall button reads as near-pill without being a literal full pill — distinct from the chip/toggle pill radius.
- **Menu popover:** `1rem` radius, a smaller rounding step reserved for the hamburger dropdown only.
- **Borders:** every bordered element uses the same 1px `Hairline Border` token — never a heavier or colored border at rest (color only appears on hover, via the Rare Amber Rule).

## Components

### Buttons
- **Shape:** `2rem` radius, `1px` hairline border, `1rem 1.25rem` padding, `8rem` fixed width on the two hero CTAs (project-link buttons are auto-width).
- **Primary** (`btn-color-1` — "Contact Me", and every "View code" project link): fills with `Console White` / `Ink Navy` text (dark theme) — an inverted, high-contrast fill, the boldest surface in the system.
- **Secondary** (`btn-color-2` — "View Resume"): fills with `Alert Red` / `Ember Orange` — the only place the secondary hue appears.
- **Hover:** `translateY(-1px)` lift plus `filter: brightness(1.05)`. No color shift, no scale change.

### Chips (pill-list — skills, project tags)
- **Style:** `Console Hairline Fill` background, `Hairline Border`, `Console White` text, `999px` radius, `0.45rem 0.75rem` padding.
- **State:** static — no selected/active variant exists; these are informational tags, not filters.

### Cards / Containers
- **Corner Style:** `2rem` radius, no exceptions.
- **Background:** `Console Glass` / `Frosted Paper`, with `backdrop-filter: blur(20px) saturate(160%)` — genuinely frosted, not just tinted.
- **Shadow Strategy:** Card-lift shadow (see Elevation).
- **Border:** `1px` `Hairline Border`.
- **Internal Padding:** `1.5rem`, center-aligned text (except `resume-list`, which is left-aligned for readability of long lists).

### Navigation
- **Desktop:** flex row, logo (circular 100×100 image, no wordmark) at left, links + theme toggle at right. Link hover reveals an underline with a large `1rem` offset and the accent color, rather than a static underline.
- **Mobile (≤1200px):** collapses to a hamburger icon that morphs into an X (two bars rotate, middle bar fades). The dropdown is a `Menu Bg` translucent glass panel (near-opaque, `1rem` radius, menu-lift shadow) anchored top-right.
- **Theme toggle:** pill-shaped, glass-surfaced, present in both desktop and mobile nav; label swaps between "☾ Dark" / "☀ Light".

### Scroll Chrome (signature components)
- **Scroll progress bar:** a `3px` fixed top bar, filled with an amber gradient (`Amber Signal` → `Amber Signal Bright`), driven by native CSS `animation-timeline: scroll()` where supported — no scroll-listener JS.
- **Scroll-to-top:** a `2.75rem` pill circle, fixed bottom-right, hidden until the visitor scrolls ~300px past the top sentinel, then fades/lifts into view.

## Do's and Don'ts

### Do:
- **Do** keep the accent color rare — hover states, small labels, the progress bar. Never a background fill (**The Rare Amber Rule**).
- **Do** build every new surface as translucent glass over the gradient field before reaching for an opaque card (**The Glass-Console Rule**).
- **Do** use large-blur, low-opacity shadows only (**The No-Hard-Shadow Rule**).
- **Do** round generously — `2rem` for panels/cards, `999px` for pills/chips/toggles.
- **Do** design every new color token as a matched dark/light pair before shipping either half (**The Matched-Pair Rule**).
- **Do** keep hover feedback to a small lift (`translateY(-1px)`) plus a brightness bump — the system's interaction language is tactile and confident, not showy.

### Don't:
- **Don't** introduce a second typeface. Vary size, weight, or the (rare) accent color instead (**The One-Family Rule**).
- **Don't** add hard-edged, sharp-cornered elements — nothing in this system is unrounded.
- **Don't** add crisp, high-contrast, or colored shadows.
- **Don't** use the secondary hue (Alert Red / Ember Orange) anywhere but the "View Resume" CTA — it is not a general-purpose second accent.
