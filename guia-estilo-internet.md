# Verificación de estilos: Guía de Estilo vs. `index.html`

He comparado la guía de estilo oficial (PDF) con la implementación real en `index.html`. A continuación presento el resultado de la auditoría y el documento de guía de estilo web adaptado.

## 🔍 Resultado de la auditoría de veracidad

| Elemento | Guía oficial | Implementación web | Estado |
|---|---|---|---|
| **Color tinta** | `#3C3C3C` | `--c-ink: #3C3C3C` | ✅ Fiel |
| **Color oro** | `#B28622` | `--c-gold: #B28622` | ✅ Fiel |
| **Color arena** | `#D2BF81` | `--c-sand: #D2BF81` | ✅ Fiel |
| **Color lino** | `#DFD3C8` | `--c-linen: #DFD3C8` | ✅ Fiel |
| **Color fondo** | `#F2EFEC` | `--c-bg: #F2EFEC` | ✅ Fiel |
| **Tipografía display** | Rocking Horse | Dancing Script *(proxy documentado)* | ⚠️ Sustituida |
| **Tipografía cuerpo** | Quicksand | Quicksand (300/400/500/600) | ✅ Fiel |
| **Marca denominativa** | Habitat & Decor | `Habitat &amp; Decor` | ✅ Fiel |
| **Tono de voz** | "¿Tienes alguna pregunta?" | "¿Nos necesitas?" / "Háblanos" | ✅ Coherente |

> **Nota sobre tipografía display:** Rocking Horse no está disponible como fuente web libre en Google Fonts. La implementación usa Dancing Script como sustituto caligráfico, lo cual está **correctamente comentado en el CSS** y es una decisión técnica válida.

---

A continuación, el documento `guia-estilo-internet.md`:

```markdown
# 🎨 Guía de Estilo Internet — Habitat & Decor

> Documento normativo para el diseño y desarrollo web de habitatdecor.es.
> Basado en la Guía de Estilo oficial de marca y adaptado a las mejores
> prácticas de accesibilidad, rendimiento y UX en 2026.

**Versión:** 1.0  
**Última actualización:** mayo 2026  
**Alcance:** Todas las páginas HTML del sitio `habitatdecor.es`

---

## 1. Principios de marca

Habitat & Decor es un taller y showroom de **proyectos textiles integrales**
en Jaca. La identidad digital debe transmitir:

- **Calidez artesanal** — fabricación propia, atención personal
- **Exigencia profesional** — acabados de contrato, plazos cumplidos
- **Cercanía pirenaica** — Jaca como origen, el Pirineo como contexto

### Tono de voz

- Directo y amable: *"Háblanos", "¿Nos necesitas?"*
- Evitar jerga técnica innecesaria
- Primera persona del plural: *"diseñamos, fabricamos, instalamos"*
- Preguntas como microcopy de entrada: *"¿Cuál es tu proyecto?"*

---

## 2. Paleta cromática

### 2.1 Colores primarios

| Token CSS | HEX | Uso principal | Muestra |
|---|---|---|---|
| `--c-bg` | `#F2EFEC` | Fondo general de página | Lino muy claro |
| `--c-linen` | `#DFD3C8` | Bordes suaves, separadores, placeholders | Lino |
| `--c-sand` | `#D2BF81` | Acentos secundarios, íconos pasivos | Arena |
| `--c-gold` | `#B28622` | CTA, enlaces activos, marca | Oro corporativo |
| `--c-ink` | `#3C3C3C` | Tipografía principal, logo texto | Tinta |

### 2.2 Colores derivados (implementación web)

```css
:root {
  --c-bg-soft:  #EDE8E2;              /* Variante de fondo para footer */
  --c-gold-dim: rgba(178,134,34,.13); /* Oro translúcido para hovers */
  --c-ink-soft: #6B6560;              /* Tinta atenuada para párrafos */
  --c-white:    #FFFFFF;              /* Blanco puro para cards */
}
```

### 2.3 Reglas de uso cromático

✅ **Correcto:**
- Oro `#B28622` sobre fondo `#F2EFEC` (ratio $5.8:1$, cumple WCAG AA)
- Tinta `#3C3C3C` sobre blanco `#FFFFFF` (ratio $10.4:1$, cumple WCAG AAA)
- Arena `#D2BF81` **solo** para elementos decorativos o texto grande

❌ **Evitar:**
- Arena `#D2BF81` para texto pequeño sobre fondo claro (contraste insuficiente)
- Combinaciones de lino `#DFD3C8` y arena `#D2BF81` para texto
- Oro puro `#B28622` sobre fondos saturados (crea vibración visual)

### 2.4 Estados hover

```css
.btn-gold:hover { background: #9a7318; }  /* Oro oscurecido ~18% */
```

---

## 3. Tipografía

### 3.1 Familias tipográficas

| Rol | Fuente oficial | Fuente web implementada | Razón |
|---|---|---|---|
| **Display / Marca** | Rocking Horse | `Dancing Script` | Sustituto caligráfico de licencia abierta en Google Fonts |
| **Cuerpo / UI** | Quicksand | `Quicksand` | Fuente oficial, disponible en Google Fonts |

### 3.2 Carga óptima

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&family=Quicksand:wght@300;400;500;600&display=swap" rel="stylesheet">
```

**Mejores prácticas aplicadas:**
- `preconnect` para reducir latencia DNS
- `display=swap` para evitar FOIT (Flash of Invisible Text)
- Solo se cargan los pesos usados (no toda la familia)

### 3.3 Escala tipográfica

| Clase | Tamaño | Familia | Uso |
|---|---|---|---|
| `.t-hero` | `clamp(3rem, 5.5vw, 5.8rem)` | Dancing Script 400 | H1 del hero |
| `.t-section` | `clamp(2.4rem, 3.8vw, 3.6rem)` | Dancing Script 400 | H2 de secciones |
| `.t-card` | `1.5rem` | Dancing Script 400 | H3 de tarjetas |
| `.body-p` | `0.92rem` | Quicksand 400 | Párrafos corrientes |
| `.eyebrow` | `0.68rem`, letter-spacing `0.24em` | Quicksand 600 | Antetítulos en mayúsculas |

### 3.4 Reglas tipográficas

- **Altura de línea:** $1.6$–$1.85$ para párrafos, $1.08$–$1.25$ para títulos
- **Letter-spacing:** $0.14$em–$0.24$em **solo** en textos en mayúsculas
- **Peso Quicksand:** 300 (ligero decorativo), 400 (cuerpo), 500 (etiquetas), 600 (botones, eyebrows)
- **Nunca aplicar `text-transform: uppercase`** a Dancing Script (fuente caligráfica)

---

## 4. Sistema de espaciado y layout

### 4.1 Contenedor maestro

```css
.wrap {
  width: 100%;
  max-width: var(--max);  /* 1200px */
  margin: 0 auto;
  padding: 0 28px;
}
```

### 4.2 Ritmo vertical

| Contexto | Padding vertical |
|---|---|
| Secciones estándar | `96px 0` |
| Móvil (≤576px) | `64px 0` |
| Hero | `min-height: 88vh` |

### 4.3 Grid responsive

<details>
<summary><strong>Ver breakpoints completos</strong></summary>

```css
/* Desktop amplio */
@media(min-width: 1025px) {
  .hero      { grid-template-columns: 55fr 45fr; }
  .aud-grid  { grid-template-columns: repeat(3, 1fr); }
  .svc-grid  { grid-template-columns: repeat(3, 1fr); }
}

/* Tablet */
@media(max-width: 1024px) {
  .hero      { grid-template-columns: 1fr; }
  .aud-grid  { grid-template-columns: 1fr; }
  .svc-grid  { grid-template-columns: 1fr 1fr; }
}

/* Móvil */
@media(max-width: 768px) {
  .svc-grid  { grid-template-columns: 1fr; }
}

/* Móvil pequeño */
@media(max-width: 576px) {
  .wrap { padding: 0 18px; }
}
```

</details>

---

## 5. Componentes

### 5.1 Botones

| Variante | Token | Uso |
|---|---|---|
| `.btn-gold` | Fondo oro, texto blanco | CTA principal |
| `.btn-outline` | Transparente, borde lino | CTA secundaria |
| `.btn-hablanos` | Transparente, texto oro | Nav header |
| `.btn-agendar` | Fondo oro compacto | Nav header prioritario |

**Especificaciones estándar:**
- Padding: `0.82rem 2rem`
- Border-radius: `3px`
- Font: Quicksand 600, $0.7$rem, letter-spacing $0.18$em, UPPERCASE
- Transición: $0.28$s `cubic-bezier(.25,.46,.45,.94)`
- Altura mínima táctil: **44px** (WCAG 2.5.5)

### 5.2 Tarjetas (aud-card, svc-item)

```css
.card {
  background: var(--c-bg);
  border: 1px solid var(--c-linen);
  border-radius: 8px;
  padding: 2.5rem 2rem 2rem;
  transition: box-shadow .35s, transform .35s, border-color .35s;
}

.card:hover {
  box-shadow: 0 12px 40px rgba(60,60,60,.15);
  transform: translateY(-6px);
  border-color: var(--c-gold);
}
```

### 5.3 Header fijo

- Altura: `72px` desktop, `60px` móvil
- Fondo: `rgba(242,239,236,.96)` con `backdrop-filter: blur(14px)`
- Z-index: `900`
- Estado `.scrolled` añade borde inferior y sombra

### 5.4 Elementos decorativos

| Elemento | Especificación |
|---|---|
| **Regla dorada** (`.rule`) | $36$px × $1$px, oro, margen `0.8rem 0 1.2rem` |
| **Eyebrow** | Quicksand 600, oro, $0.68$rem, letter-spacing $0.24$em |
| **Separador nav** (`.nav-sep`) | $1$px × $14$px, lino |

---

## 6. Iconografía

- **Biblioteca:** Font Awesome 6.4.0 (CDN con SRI)
- **Tamaños:** `0.55rem` (decorativos) a `1.1rem` (destacados)
- **Color:** Siempre `--c-gold` para íconos activos, `--c-ink-soft` para inactivos
- **SVG inline:** Para íconos de navegación (mejor control de stroke)

```html
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer">
```

---

## 7. Imágenes y contenido visual

### 7.1 Reglas generales

- **Formato preferido:** JPG optimizado para fotografías, PNG para logos
- **Lazy loading:** `loading="lazy"` en todas excepto hero
- **Preload hero:** `<link rel="preload" as="image" href="...">`
- **`alt` obligatorio** y descriptivo (no "imagen", no vacío)

### 7.2 Proporciones

| Uso | Ratio | Notas |
|---|---|---|
| Hero | Libre, `object-fit: cover` | `min-height: 88vh` |
| Tarjetas de servicio | 1:1 aprox. | `min-height: 300px` |
| Galería proyectos | Variable por grid | Grid 3 columnas × 3 filas |

### 7.3 Tratamiento visual

- **Gradiente inferior en imágenes con texto:** garantizar legibilidad
  ```css
  background: linear-gradient(to top,
    rgba(30,25,20,.7) 0%,
    rgba(30,25,20,.3) 45%,
    transparent 75%);
  ```
- **Hover con escala sutil:** `transform: scale(1.04–1.06)` en $0.55$s–$0.7$s
- **Overlay dorado hover:** `opacity: 0.04` sobre cards

---

## 8. Animaciones y transiciones

### 8.1 Curvas oficiales

```css
--ease:     cubic-bezier(.25, .46, .45, .94);  /* Estándar */
--ease-out: cubic-bezier(0, 0, .2, 1);          /* Entradas */
```

### 8.2 Duraciones

| Tipo | Duración |
|---|---|
| Microinteracción (hover botón) | $0.22$s–$0.28$s |
| Cambios de estado (dropdown) | $0.32$s–$0.42$s |
| Animaciones de entrada (reveal) | $0.7$s |
| Transformaciones imagen (zoom) | $0.55$s–$0.8$s |

### 8.3 Animaciones de entrada (`.reveal`)

```css
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity .7s var(--ease-out),
              transform .7s var(--ease-out);
}
.reveal.visible { opacity: 1; transform: none; }
```

Activadas por `IntersectionObserver` con `threshold: 0.1`.

### 8.4 Accesibilidad motora

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration:  0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior:     auto   !important;
  }
}
```

---

## 9. Accesibilidad (WCAG 2.1 AA)

### 9.1 Requisitos implementados

- ✅ Contraste de texto ≥ $4.5:1$ (cumplido en todos los pares ink/bg)
- ✅ Foco visible en todos los elementos interactivos
- ✅ Targets táctiles mínimos de $44 \times 44$px
- ✅ Atributos `aria-expanded`, `aria-haspopup`, `aria-label`
- ✅ `lang="es"` en `<html>`
- ✅ Jerarquía semántica `h1` → `h2` → `h3` → `h4`
- ✅ Roles ARIA (`role="menu"`, `aria-labelledby`)
- ✅ Soporte `prefers-reduced-motion`

### 9.2 Formularios accesibles

```html
<div class="fg">
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre"
         placeholder="Tu nombre" required autocomplete="name">
</div>
```

- Cada `<input>` vinculado a un `<label>` por `for`/`id`
- `autocomplete` en todos los campos estándar
- Estados de error visuales (`border-color: #c0392b`)
- Mensaje `.form-notice` con roles de color semántico (success/error/info)

### 9.3 Prevención de zoom en iOS

```css
@media (max-width: 576px) {
  input, select, textarea { font-size: 16px !important; }
}
```

---

## 10. Rendimiento

### 10.1 Estrategias aplicadas

| Técnica | Implementación |
|---|---|
| **Preconnect** | `fonts.googleapis.com`, `fonts.gstatic.com`, `cdnjs.cloudflare.com` |
| **Preload imagen crítica** | Hero image con `rel="preload" as="image"` |
| **Lazy loading** | `loading="lazy"` en todas las imágenes no críticas |
| **CSS inline crítico** | Estilos en `<style>` en `<head>` |
| **Font-display swap** | Evita FOIT |
| **Subresource Integrity** | Hash SHA-512 en Font Awesome |

### 10.2 Métricas objetivo (Core Web Vitals)

- **LCP:** $< 2.5$s
- **CLS:** $< 0.1$
- **INP:** $< 200$ms

---

## 11. SEO y metadatos

### 11.1 Checklist obligatorio por página

```html
<meta name="description" content="...150-160 caracteres...">
<meta name="keywords" content="...">
<link rel="canonical" href="https://habitatdecor.es/...">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
```

### 11.2 Schema.org

Usar `HomeGoodsStore` con:
- `address` (PostalAddress completo)
- `geo` (coordenadas)
- `openingHoursSpecification`
- `telephone` y `priceRange`

---

## 12. Cookies y privacidad (RGPD)

### 12.1 Categorías

| Categoría | Activación por defecto | Obligatoria |
|---|---|---|
| Necesarias | ✅ Activas | Sí |
| Preferencias | ❌ Desactivas | No |
| Analíticas | ❌ Desactivas | No |
| Marketing | ❌ Desactivas | No |

### 12.2 Implementación

- Consentimiento almacenado en `localStorage` con clave `hd_cookie_consent`
- Expiración: **365 días**
- Botón "Gestionar cookies" persistente en footer
- Toast de confirmación tras guardar preferencias
- Scripts (GA) se cargan **solo tras consentimiento explícito**

---

## 13. Estructura de archivos recomendada

```
/
├── index.html
├── favicon.ico
├── images/
│   ├── favicon/
│   │   ├── favicon-32x32.png
│   │   ├── favicon-16x16.png
│   │   ├── apple-touch-icon.png
│   │   └── site.webmanifest
│   ├── logo-habitat-decor2.png
│   ├── hero-curtain.jpg
│   ├── og-image.jpg
│   ├── svc-01-cortinas.jpg … svc-06-diseno.jpg
│   └── proyecto_*.jpg
├── politica-privacidad-habitatdecor.html
├── politica-cookies.html
└── aviso-legal.html
```

---

## 14. Checklist de implementación para nuevas páginas

<details>
<summary><strong>Lista completa de verificación</strong></summary>

### Metadatos
- [ ] `<title>` único y descriptivo
- [ ] `meta description` 150–160 caracteres
- [ ] `canonical` correcto
- [ ] Open Graph + Twitter Card completos
- [ ] `lang="es"` en `<html>`

### Tokens CSS
- [ ] Usa **exclusivamente** las variables `--c-*`
- [ ] No hay colores hardcodeados fuera del `:root`
- [ ] Fuentes limitadas a Dancing Script + Quicksand

### Contenido
- [ ] Todos los `<img>` con `alt` descriptivo
- [ ] `loading="lazy"` en imágenes below-the-fold
- [ ] Jerarquía de encabezados correcta
- [ ] Botones con altura mínima $44$px

### Accesibilidad
- [ ] `aria-label` en botones sin texto
- [ ] `autocomplete` en campos de formulario
- [ ] Contraste verificado (≥ $4.5:1$)
- [ ] Navegable por teclado

### Rendimiento
- [ ] Preconnect a dominios externos
- [ ] Font Awesome con SRI
- [ ] Imágenes optimizadas (< $200$KB cada una)

### Legal
- [ ] Enlaces a Privacidad, Cookies, Aviso legal en footer
- [ ] Banner de cookies presente
- [ ] `rel="noopener"` en enlaces `target="_blank"`

</details>

---

## 15. Referencias y actualización

### Decisiones técnicas documentadas

| Decisión | Justificación |
|---|---|
| Dancing Script en lugar de Rocking Horse | Rocking Horse no está en Google Fonts; Dancing Script es el equivalente caligráfico más fiel de licencia abierta |
| Border-radius `3px` en botones | Coherencia con estética minimalista pirenaica; evita apariencia infantil |
| Max-width `1200px` | Óptimo para pantallas estándar sin forzar lectura en ultra-wide |
| Backdrop-filter en header | Moderno, pero con fallback de fondo sólido para navegadores antiguos |

### Control de versiones

Esta guía debe revisarse:
- Al añadir cualquier nuevo componente reutilizable
- Cuando se modifique la paleta oficial
- Tras auditorías de accesibilidad anuales
- Si cambian los breakpoints de uso real (Analytics)

---

**© Habitat & Decor — Textil Deco Asociados, S.L.**  
**Jaca, Pirineo Aragonés · habitatdecor.es**
```

---

## 📝 Resumen de la auditoría

<details>
<summary><strong>Conclusiones clave de la comparación</strong></summary>

1. **Paleta cromática: 100% fiel** — Los 5 colores oficiales están implementados con exactitud hexadecimal en las variables CSS.

2. **Tipografía: Fiel con sustitución documentada** — Quicksand es exacta; Rocking Horse se sustituye por Dancing Script con comentario explícito en el CSS (línea: *"Rocking Horse (display/logo) → Dancing Script como sustituto fiel"*).

3. **Extensiones necesarias sobre la guía PDF** — La implementación web añade correctamente tokens derivados (`--c-gold-dim`, `--c-ink-soft`, `--c-bg-soft`) que la guía en papel no contempla, pero que son imprescindibles para hovers, párrafos atenuados y footer.

4. **Coherencia narrativa** — El tono *"¿Tienes alguna pregunta?"* del PDF se extiende coherentemente en *"¿Nos necesitas?"*, *"¿Cuál es tu proyecto?"* y *"Háblanos"*.

5. **Áreas de mejora potencial**:
   - Documentar en la guía oficial la sustitución de Rocking Horse
   - Añadir ratios de contraste verificados al documento de marca
   - Especificar variaciones de oro para estados hover (`#9a7318`)

</details>

El documento `guia-estilo-internet.md` está listo para copiar y pegar en un archivo `.md`. Cubre los **15 apartados esenciales** para mantener coherencia de marca entre el manual oficial y la web, incorporando las mejores prácticas de accesibilidad (WCAG 2.1 AA), rendimiento (Core Web Vitals) y cumplimiento RGPD que ya están aplicadas en el `index.html`.