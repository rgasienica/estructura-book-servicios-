# Habitat & Decor · Book Profesional 2026

Book digital interactivo de 19 slides para presentación profesional.

## Estructura

```
book-profesional-2026/
├── index.html                  # Todas las 19 slides
├── css/
│   ├── variables.css          # Design tokens (colores, tipografía, espaciado)
│   ├── layout.css             # Stage, controles, navegación
│   ├── slides.css             # Estilos específicos por slide
│   └── print.css              # Overrides para impresión
├── js/
│   └── book.js                # Navegación, transiciones, keyboard, fullscreen
└── assets/
    └── images/                # Imágenes WebP del proyecto
```

## Cómo usar

### Abrir localmente

```bash
# Opción 1: Abrir directamente
open index.html

# Opción 2: Servidor local (recomendado)
python3 -m http.server 8000
# Luego abre: http://localhost:8000
```

### Navegación

- **Flechas** ← → : Anterior / Siguiente
- **Espacio**: Siguiente
- **Page Up / Page Down**: Anterior / Siguiente
- **Home / End**: Primera / Última slide
- **F**: Pantalla completa
- **Swipe** (móvil): Izquierda/Derecha

### Funcionalidades

- **19 slides temáticas**: Portada, índice con navegación directa, perfiles de cliente, casos reales, servicios, proceso, mapa de cobertura
- **Transiciones suaves**: Animaciones entre slides con exit-left/exit-right
- **Responsive**: Canvas 1920×1080 escalado automáticamente a cualquier viewport
- **Barra de progreso**: Indicador visual en la parte superior
- **Controles flotantes**: Botones prev/next + contador
- **Fullscreen**: Botón dedicado y atajo de teclado (F)

## Design tokens

Definidos en `css/variables.css`:

- **Colores**: `--c-gold` (#B28622), `--c-bg` (#F2EFEC), `--c-ink` (#3C3C3C)
- **Tipografía**: Dancing Script (display), Quicksand 300-600 (body)
- **Espaciado**: Sistema de gaps (xs/sm/md/lg/xl)
- **Easing**: `--ease`, `--ease-out`

## Slides

01. **Portada**: Logo + claim + hero image
02. **Índice**: 3 tarjetas clicables (Profesionales / Negocios / Tu Hogar)
03. **Manifiesto**: Declaración de principios
04. **Quiénes somos**: Equipo + contacto
05. **Taller & Showroom**: Instalaciones
06. **Qué hacemos**: Grid de 6 servicios con imágenes
07. **Proceso**: 4 pasos del workflow
08. **Perfil Profesionales**: Interioristas y arquitectos
09. **Perfil Negocios**: Alojamientos y restaurantes
10. **Perfil Tu Hogar**: Particulares
11. **Caso Hecho**: Casa rural Valle de Hecho
12. **Caso Canfranc**: Hotel boutique Canfranc Estación
13. **Caso Ansó**: Vivienda particular Valle de Ansó
14. **Tejidos**: Catálogo de materiales y marcas
15. **Mapa**: Zona de cobertura Pirineo Aragonés
16. **Testimonios**: 3 testimoniales en grid
17. **Propuesta de valor**: 5 pilares en 2 columnas
18. **Contacto**: Formulario de contacto + CTA
19. **Contraportada**: Logo + claim final

## Personalización

### Cambiar colores
Edita `css/variables.css`:
```css
--c-gold: #TU_COLOR;
--c-bg: #TU_BG;
```

### Añadir slide
1. Añade `<section class="slide slide-XX">` en `index.html`
2. Crea estilos `.slide-XX` en `css/slides.css`
3. Actualiza `const TOTAL = 20;` en `js/book.js`

### Cambiar imágenes
Reemplaza archivos en `assets/images/` manteniendo los nombres originales.

## Requisitos

- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+)
- Fuentes Google: Dancing Script, Quicksand
- No requiere build ni npm

## Compatibilidad

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablets (iPad, Android)
- ✅ Móviles (iOS, Android)
- ✅ Impresión (CSS print incluido)

## Créditos

Diseñado y desarrollado para **Habitat & Decor**  
Jaca, Pirineo Aragonés  
2026
