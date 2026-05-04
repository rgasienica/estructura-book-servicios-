---
name: book-frontend
description: >
  Especialista en frontend y marketing del Book Profesional 2026 de Habitat & Decor
  (habitatdecor.es). Usa este skill siempre que el usuario trabaje con cualquier
  slide del book, pida auditar o mejorar contenido, revise copy, quiera añadir o
  modificar elementos visuales, pregunte sobre un slide concreto, o mencione los
  tres segmentos de cliente (interioristas, alojamientos, hogar pirenaico).
  También activa cuando el usuario pide coherencia de marca, ajustes de tipografía,
  colores o espaciado en el HTML/CSS del book.
---

# Book Profesional 2026 — Habitat & Decor

Taller y showroom de **proyectos textiles integrales** en Jaca, Pirineo Aragonés.
Fabricación propia, atención personal, arraigo local.

**Arquitectura y tokens**: ver `CLAUDE.md` y `css/variables.css`. Regla crítica: solo tokens `--c-*`, `--t-*`, `--gap-*` — nunca valores hardcodeados. Para auditoría de estilo: `/habitat-style`.

---

## Los tres segmentos: quiénes son y qué valoran

### Segmento A — Interioristas · Arquitectos · Estudios de Decoración

**Quiénes son**: profesionales que subcontratan la ejecución. Conocen los materiales, exigen calidad y puntualidad. Su reputación depende de que el taller cumpla.

**Qué buscan**:
- Socio fiable, no un proveedor genérico
- Comunicación directa con quien fabrica (sin intermediarios)
- Plazos exactos y capacidad para resolver imprevistos
- Muestras de materiales disponibles en showroom
- Facturación B2B sin complicaciones

**Mensajes clave**:
- *"Tu taller en el Pirineo. Plazos exactos, comunicación directa."*
- *"Acabados que llevan tu firma."*
- *"Muestras físicas, visita al taller, presupuesto en 24 h."*
- Evitar: hablar de "precio asequible" — les importa la fiabilidad

**Tono**: técnico-profesional, de igual a igual. Nombrar materiales por nombre.

---

### Segmento B — Alojamientos · Restaurantes · Casas Rurales · Hoteles

**Quiénes son**: propietarios o gestores de negocios turísticos en el Pirineo y entorno. Buscan rentabilidad y mínima interrupción operativa.

**Qué buscan**:
- Un solo proveedor para todos los espacios (habitaciones, restaurante, recepción)
- Tejidos técnicos: fácil mantenimiento, resistencia al uso intensivo
- Instalación en temporada baja o en horarios que no interrumpan reservas
- Presupuesto por proyecto completo (no por unidad)
- Conocimiento local: entienden el negocio turístico pirenaico

**Mensajes clave**:
- *"De la habitación al comedor. Un solo proveedor."*
- *"Instalación sin interrumpir tus reservas."*
- *"Tejidos de contrato: resistentes, fáciles de limpiar, duraderos."*
- *"Sabemos lo que es el Pirineo en temporada alta."*
- Evitar: exceso de vocabulario de lujo — buscan ROI y practicidad

**Tono**: directo, práctico, con datos cuando sea posible (años de experiencia, proyectos en la zona).

---

### Segmento C — Visitantes y Habitantes con Entusiasmo por las Montañas

**Quiénes son**: particulares que viven o tienen segunda residencia en el Pirineo Aragonés y su entorno. Aman este territorio y quieren que su hogar lo refleje. Aprecian lo artesanal y lo local.

**Qué buscan**:
- Atención personalizada, trato humano
- Que alguien venga a su casa, entienda su espacio y proponga soluciones
- Materiales únicos que no se encuentran en grandes superficies
- Conexión con el entorno pirenaico (paletas de color, texturas naturales)
- Confianza: compran a personas, no a marcas

**Mensajes clave**:
- *"Visita a domicilio. Diseño personalizado. Nada de catálogos."*
- *"Hecho a mano en Jaca, para tu casa en el Pirineo."*
- *"No vendemos lo que tenemos. Creamos lo que necesitas."*
- *"Tu hogar, tu historia."*
- Evitar: tecnicismos de contrato o B2B

**Tono**: cálido, cercano, inspirador. Evocar el paisaje y la vida pirenaica.

---

## Proceso de auditoría de un slide

Cuando el usuario pide revisar o mejorar un slide:

1. **Leer el HTML del slide** en `index.html` para entender el contenido actual.
2. **Leer el CSS del slide** en `css/slides.css` (clases `.sN-*`).
3. **Evaluar** usando este checklist:

### Checklist de calidad por slide

**Contenido / Marketing**
- [ ] El mensaje está orientado al segmento correcto (A/B/C o "todos")
- [ ] El claim o titular es concreto, no genérico ("servicio de calidad" no vale)
- [ ] Hay una sola idea principal por slide (no sobrecargado)
- [ ] El CTA (si existe) es claro y específico
- [ ] Los testimonios o cases tienen nombres reales (no placeholders)

**Diseño / Código**
- [ ] Solo usa tokens `--c-*`, `--t-*`, `--gap-*`, `--pad-*`
- [ ] La jerarquía visual está clara: eyebrow → título → subtítulo → cuerpo → CTA
- [ ] Hay breathing room (no slide lleno hasta los bordes)
- [ ] Las imágenes tienen `alt` descriptivo
- [ ] No hay hardcoding de colores ni tamaños fuera de `variables.css`

**Coherencia de marca**
- [ ] Tono de voz coherente (primera persona plural: "diseñamos", "fabricamos")
- [ ] Dancing Script solo en titulares, no en cuerpo
- [ ] Gold `--c-gold` solo para CTAs, iconos activos, elementos de énfasis
- [ ] No combinar arena `--c-sand` con lino `--c-linen` para texto

---

## Cómo proponer mejoras de copy

Cuando propongas copy nuevo, sigue esta estructura:

1. **Eyebrow** (opcional): Quicksand 600, mayúsculas, oro — máx. 4 palabras
2. **Titular**: Dancing Script, 1–2 líneas, concreto y evocador
3. **Subtítulo / bodycopy**: Quicksand 400, 2–4 líneas, máx. 3 bullet points si es lista
4. **CTA** (si aplica): verbo + objeto específico — *"Solicita visita"*, *"Ver proyecto"*, *"Hablamos"*

Ejemplo para Segmento B:
```
Eyebrow:  ALOJAMIENTOS · PIRINEO
Titular:  De la habitación al comedor.
Body:     Un solo proveedor para toda tu propiedad. Tejidos de
          contrato, instalación sin cortar reservas, presupuesto
          por proyecto completo.
CTA:      Cuéntanos tu proyecto →
```

---

## Pendientes conocidos (SESION_SIGUIENTE.md)

- Reemplazar nombres placeholder en testimonios (slides 11, 12, 13, 16): `[Nombre Interiorista]`, `[Estudio Nombre]`, `[Nombre Propietario]`, `[Familia Apellido]`
- Generar QR real de habitatdecor.es → `images/qr-habitatdecor.svg` → slide 19
- Galería de imágenes alternativas en: `D:\Documents\DECO\habitatdeco-galeria\imagenes_tv\`

---

## Reglas de trabajo

- Editar `index.html` para contenido. Editar `css/slides.css` para estilos de slide.
- Nunca tocar `variables.css` salvo que el usuario pida cambiar un token de marca.
- No introducir nuevas dependencias JS ni librerías CSS.
- Probar visualmente abriendo `index.html` en el navegador antes de dar por terminado.
- Los cambios de copy van en el HTML; los cambios de estilo solo en `slides.css`.
