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

## Architecture

**Fixed 1920×1080 canvas scaled to viewport** — not a traditional responsive design. The entire `.slide-stage` is scaled via `transform: scale()` in `js/book.js` to fit any screen while maintaining pixel-perfect proportions.

**File roles:**
- `index.html` — All 19 slide HTML (924 lines, self-contained)
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

**Global state:**
```js
const TOTAL = 19;
let current = 1;
let isAnimating = false;
```

## Design Tokens (variables.css)

| Token | Value | Use |
|---|---|---|
| `--verde-bosque` | `#2D3A2E` | Accents, dark elements |
| `--blanco-roto` | `#F2EFEC` | Main background |
| `--dorado-apagado` | `#B28622` | Brand gold, CTAs |
| `--marron-cuero` | `#6B6560` | Secondary text |
| `--font-display` | Dancing Script | Titles/hero |
| `--font-body` | Quicksand 300–600 | All body text |

All spacing (`--pad-x: 96px`, `--pad-y: 72px`) and typography (`--t-hero: 80px` → `--t-tiny: 12px`) are tokenized — edit tokens, not individual declarations.

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
├── guia-estilo-internet.md           # Brand style guide for web
│
├── css/
│   ├── variables.css                 # Design tokens (colors, fonts, spacing)
│   ├── layout.css                    # Stage, controls, shared utilities
│   ├── slides.css                    # Per-slide styles (.s1-*, .s2-*, …)
│   └── print.css                     # Print overrides
│
├── js/
│   └── book.js                       # Navigation, scale, transitions, keyboard
│
├── images/
│   ├── logo.jpeg
│   ├── hero_valle_pirineo.jpg
│   ├── hero-curtain.jpg
│   ├── cortina_dormitorio_onda_perfecta.jpg
│   ├── cortina_salon_biescas.jpg
│   ├── cortinas_lino.jpg
│   ├── dormitorio_casa_rural_v2.jpg
│   ├── exposicion_tienda.jpg
│   ├── furgoneta_casa_rural.jpg
│   ├── mostrarios.jpg
│   ├── Mostrario_tapiceria.jpg
│   ├── showroom_cortinas.jpg
│   ├── tapizado_sofa.jpg
│   ├── collage_cada_detalle.jpg
│   ├── pirineos.jpg
│   ├── canfranc_negocios1.jpg
│   └── canfranc_negocios2.jpg
│
└── .claude/
    ├── settings.json                 # Hooks: PostToolUse triggers habitat-style reminder
    └── commands/
        └── habitat-style.md          # /habitat-style skill (brand audit + --fix)
```

## Pending Work (SESION_SIGUIENTE.md)

- Replace placeholder names in testimonials (slides 11, 12, 13, 16)
- Generate real QR code for habitatdecor.es → insert in slide 18
- Visual review of all 19 slides in browser
- Image refinement gallery: `D:\Documents\DECO\habitatdeco-galeria\`
