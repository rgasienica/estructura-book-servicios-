# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Habitat & Decor Book Profesional 2026** — digital brochure/presentation (19 slides) for a luxury upholstery and interior design workshop in the Spanish Pyrenees. Target audiences: architects/designers, hospitality businesses, and residential homeowners.

## How to Run

No build step. Open directly:

```powershell
# Windows
start index.html

# Or with live reload (recommended for development)
python -m http.server 8000
# then open http://localhost:8000
```

Navigation: Arrow keys / Space (next), Arrow left / Page Up (prev), **F** (fullscreen), Home/End (jump to first/last).

## Image Tooling (Node)

```powershell
npm run optimize   # Batch-converts assets/images/*.jpg → assets/images/webp/*.webp (uses sharp)
npm run edit       # AI image editing via Fal.ai FLUX — requires FAL_KEY env var
```

## Architecture

**Fixed 1920×1080 canvas scaled to viewport** — not a traditional responsive design. The entire `.slide-stage` is scaled via `transform: scale()` in `js/book.js` to fit any screen while maintaining pixel-perfect proportions.

**File roles:**
- `index.html` — All 19 slide HTML (840 lines, self-contained)
- `js/book.js` — Navigation, transitions, fullscreen, swipe, keyboard (212 lines)
- `css/variables.css` — All design tokens (colors, fonts, spacing, motion)
- `css/layout.css` — Stage layout, controls, nav buttons
- `css/slides.css` — Per-slide styles (`.s1-*`, `.s2-*`, etc.)
- `css/print.css` — Print overrides

## Slide System

One `.slide` has `.slide--active` at a time. `goTo(target, direction)` in `book.js` drives transitions:
- Exit: `slide--exit-left` / `slide--exit-right` (translateX + fade, 0.45s)
- `isAnimating` flag prevents overlapping transitions
- `scaleStage()` recalculates scale on resize and fullscreen toggle
- `window.goTo` is exposed globally — required by the `onclick="goTo(n,'next')"` handlers on the profile cards in slide 2

**Global state:**
```js
const TOTAL = 19;
let current = 1;
let isAnimating = false;
```

## Design Tokens (variables.css)

**Rule: use `--c-*` aliases in new code.** Legacy names (`--verde-bosque`, `--blanco-roto`, etc.) are kept only to avoid breaking existing slides.

| Token (canonical) | Value | Use |
|---|---|---|
| `--c-bg` | `#F2EFEC` | Main background |
| `--c-bg-soft` | `#EDE8E2` | Alternate soft background |
| `--c-gold` | `#B28622` | Brand gold, CTAs |
| `--c-gold-dim` | `rgba(178,134,34,.13)` | Soft gold hover backgrounds |
| `--c-gold-hover` | `#9a7318` | Darkened gold on hover |
| `--c-ink` | `#3C3C3C` | Main text |
| `--c-ink-soft` | `#6B6560` | Secondary text |
| `--c-linen` | `#DFD3C8` | Borders, dividers |
| `--c-sand` | `#D2BF81` | Decorative accents only (not body text) |
| `--font-display` | Dancing Script | Titles/hero (proxy for Rocking Horse, not on Google Fonts) |
| `--font-body` | Quicksand 300–600 | All body text |

Spacing tokens: `--pad-x: 96px`, `--pad-y: 72px`, `--gap-xs/sm/md/lg/xl` (8/16/32/56/80px).
Typography scale: `--t-hero: 80px` → `--t-tiny: 12px` (7 steps).
Easing tokens: `--ease` (standard) and `--ease-out` (decelerate) — use these instead of raw cubic-bezier values.

## Slide Map

| Slides | Content |
|---|---|
| 1 | Portada (cover) |
| 2 | Índice / profile selector (3 clickable cards) |
| 3–5 | Manifiesto, Quiénes Somos, Taller & Tienda |
| 6–7 | Qué Hacemos (services), Proceso (4 steps) |
| 8–10 | Profile sections: Profesionales / Negocios / Tu Hogar |
| 11–13 | Case studies: Hecho / Canfranc / Ansó |
| 14–15 | Tejidos & Materiales, Mapa de cobertura |
| 16–17 | Testimonios, Propuesta de Valor |
| 18–19 | Contacto & CTA, Contraportada |

## Project Structure

```
BOOK_PROFESIONAL_2026/
├── index.html                        # All 19 slides (single HTML file)
├── CLAUDE.md                         # This file
├── SESION_SIGUIENTE.md               # Pending tasks log
├── package.json                      # Node deps for image tooling (sharp, fal-ai)
│
├── assets/
│   └── images/
│       ├── *.jpg / *.jpeg            # Source images
│       └── webp/                     # Optimized WebP versions (generated)
│
├── css/
│   ├── variables.css                 # Design tokens (colors, fonts, spacing)
│   ├── layout.css                    # Stage, controls, shared utilities
│   ├── slides.css                    # Per-slide styles (.s1-*, .s2-*, …)
│   └── print.css                     # Print overrides
│
├── docs/
│   └── guia-estilo-internet.md       # Brand style guide for web
│
├── js/
│   └── book.js                       # Navigation, scale, transitions, keyboard
│
├── scripts/
│   ├── optimize-images.js            # Batch JPG→WebP optimizer (node scripts/optimize-images.js)
│   └── edit-image.js                 # AI image editing via Fal.ai FLUX (needs FAL_KEY)
│
├── tools/
│   └── reset-git.ps1                 # Fixes frozen git state (index.lock, etc.)
│
└── .claude/
    ├── settings.json                 # Hooks: PostToolUse on Write|Edit fires habitat-style reminder when CSS or index.html is modified
    ├── skills-lock.json              # Installed skills manifest
    ├── skills/book-frontend/         # book-frontend skill
    └── commands/
        ├── habitat-style.md          # /habitat-style skill (brand audit + --fix)
        └── image-tools.md            # /image-tools skill
```

## Pending Work

See [SESION_SIGUIENTE.md](SESION_SIGUIENTE.md) for the current task list (may be updated each session). Key outstanding items as of v2.2:

- Replace placeholder names in testimonials (slides 11, 12, 13, 16)
- Generate real QR code for habitatdecor.es → save as `assets/images/qr-habitatdecor.svg`, replace `.qr-ph` in slide 19
- Visual review of all 19 slides in browser
- Image refinement gallery available at `D:\Documents\DECO\habitatdeco-galeria\imagenes_tv\`
