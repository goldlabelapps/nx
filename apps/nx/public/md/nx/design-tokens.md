---
order: 9522
title: Design Tokens & Styling Architecture
description: NX repository documentation
icon: docs
tags: design-tokens, css, styling
image: nx
---

# Design Tokens & Styling Architecture

## 1. Design Direction: Swiss Architectural & Technical Minimalist

GpxRoute° embraces a **Swiss Modernist / Technical Minimalist** design philosophy:
- **Clean, Light & High Contrast**: Crisp off-white/porcelain surfaces (`#F7F8FA`, `#FFFFFF`) with stark pitch black typography and hairline borders.
- **Strict 0px Sharp Geometry**: Zero rounded corners (`border-radius: 0px`) across all buttons, cards, badges, modals, inputs, and controls.
- **Technical Typography**: Sans-serif geometric headlines combined with tabular monospaced metadata and telemetry units.
- **Electric Accent Contrast**: International Electric Cobalt (`#0038FF`) and Signal Vermilion (`#FF3800`).

---

## 2. Core Color Palette

```
┌─────────────────────────────────────────────────────────────┐
│ High-Contrast Monochrome Base                               │
│  • Obsidian:    #0A0A0A (Primary text, borders & headers)   │
│  • Charcoal:    #262626 (Hover states & dark mode accents)  │
│  • Slate:       #718096 (Technical metadata & labels)       │
│  • Off-White:   #F7F8FA (Canvas & app stage background)     │
│  • Pure White:  #FFFFFF (Surface card panels)               │
├─────────────────────────────────────────────────────────────┤
│ Architectural Technical Accents                             │
│  • Electric Cobalt:   #0038FF (Brand primary action / Dist) │
│  • Signal Vermilion:  #FF3800 (Speed spikes & Finish pins)  │
│  • Technical Emerald: #00875A (Elevation gain & Start pins) │
│  • Amber Gold:        #D97706 (Max elevation & warnings)    │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Geometry & Spacing (Zero Border Radius)

```css
--radius-xs: 0px;
--radius-sm: 0px;
--radius-md: 0px;
--radius-lg: 0px;
--radius-xl: 0px;
--radius-full: 0px;
```

---

## 4. CSS Token Reference (`src/styles/tokens.css`)

| Variable | Light Value | Dark Value | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-app` | `#F7F8FA` | `#0A0A0A` | App background |
| `--bg-surface` | `#FFFFFF` | `#141414` | Card & modal background |
| `--text-primary` | `#0A0A0A` | `#FFFFFF` | Main typography |
| `--text-secondary` | `#4A5568` | `#A3A3A3` | Subtitles and labels |
| `--text-muted` | `#718096` | `#737373` | Monospace metadata |
| `--brand-primary` | `#0A0A0A` | `#FFFFFF` | Primary buttons & title bars |
| `--brand-accent` | `#0038FF` | `#3875FF` | Focus rings & brand accents |
| `--border-subtle` | `#E2E8F0` | `#262626` | Card & container outlines |
| `--border-strong` | `#0A0A0A` | `#FFFFFF` | High-contrast header borders |
