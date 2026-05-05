# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sub-proyecto v2

Versión independiente del Book Profesional 2026. Estructura plana (sin subdirectorios `css/` ni `js/`) — todos los archivos están en la raíz de `v2/`. No afecta la producción en `../`.

## Cómo correr

```powershell
cd d:\Documents\DECO\BOOK_PROFESIONAL_2026\v2
python -m http.server 8001   # puerto diferente al principal (8000)
# abrir http://localhost:8001
```

Navegación: flechas / Espacio (siguiente), flecha izquierda / Re Pág (anterior), **F** (pantalla completa), Inicio/Fin (primera/última slide).

## Arquitectura

**Canvas fijo 1920×1080 escalado al viewport** — igual que v1. `scaleStage()` en `book.js` aplica `transform: scale()` para mantener proporciones pixel-perfect en cualquier pantalla.

**Roles de archivo:**
- `index.html` — Las 19 slides en un único HTML (~823 líneas)
- `book.js` — Navegación, transiciones, fullscreen, swipe, teclado (~165 líneas)
- `variables.css` — Tokens de diseño (colores, fuentes, espaciado, easing)
- `layout.css` — Stage, controles, botones nav
- `slides.css` — Estilos por slide (`.s1-*`, `.s2-*`, etc.)
- `print.css` — Overrides para exportar a A4 landscape

## Sistema de slides

Una `.slide` tiene `.slide--active` a la vez. `goTo(target, direction)` en `book.js` gestiona transiciones:
- Salida: `slide--exit-left` / `slide--exit-right` (translateX + fade, 0.45s)
- Flag `isAnimating` previene solapamiento de transiciones
- `window.goTo` expuesto globalmente — requerido por los `onclick="goTo(n,'next')"` en las cards del índice (slide 2)

**Estado global:**
```js
const TOTAL = 19;
let current = 1;
let isAnimating = false;
```

## Tokens de diseño (variables.css)

Usar siempre `--c-*` en código nuevo.

| Token | Valor | Uso |
|---|---|---|
| `--c-bg` | `#F2EFEC` | Fondo principal |
| `--c-gold` | `#B28622` | Gold de marca, CTAs |
| `--c-ink` | `#3C3C3C` | Texto principal |
| `--c-linen` | `#DFD3C8` | Bordes, divisores |
| `--font-display` | Dancing Script | Títulos hero |
| `--font-body` | Quicksand 300–600 | Todo el cuerpo |

Espaciado: `--pad-x: 96px`, `--pad-y: 72px`, `--gap-xs/sm/md/lg/xl` (8/16/32/56/80px).  
Escala tipográfica: `--t-hero: 80px` → `--t-tiny: 12px` (7 pasos).  
Easing: `--ease` y `--ease-out` — no usar valores raw cubic-bezier.

## Diferencias respecto al principal (`../`)

- Estructura plana: CSS y JS en la raíz, sin `css/` ni `js/`
- Assets propios en `assets/images/` (24 WebP, ya optimizadas)
- No hay `package.json` ni scripts de Node en v2
- El `.claude/settings.json` de v2 tiene sus propios permisos de lectura
