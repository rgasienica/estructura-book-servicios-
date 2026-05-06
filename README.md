# Habitat & Decor Book Profesional 2026

## Descripción

Book profesional digital para Habitat & Decor, taller de tapicería, cortinas y decoración a medida en el Pirineo Aragonés (Jaca, España). Dirigido a interioristas, arquitectos, alojamientos turísticos y propietarios particulares.

Este proyecto presenta una brochure interactiva de 21 slides optimizada para web y PDF, con navegación por teclado, pantalla completa y diseño responsive.

## Propósito

- **Captar atención**: Portada impactante con imagen hero y claim memorable.
- **Explicar propuesta de valor**: Servicios integrales desde diseño hasta instalación.
- **Convertir**: CTAs claros para contacto directo.

## Cómo ejecutar

### Versión completa (21 slides)
```bash
python -m http.server 8000
```
Abre http://localhost:8000/index.html

### Versión corta (11 slides)
```bash
python -m http.server 8000
```
Abre http://localhost:8000/index-corta.html

### Abrir directamente
Haz doble clic en `index.html` o `index-corta.html`.

### Navegación
- **Flechas**: Anterior/Siguiente
- **Espacio**: Siguiente
- **F**: Pantalla completa
- **Home/End**: Ir al inicio/final

## Estructura del proyecto

- `index.html`: Todos los 21 slides en un solo archivo HTML.
- `js/book.js`: Navegación, transiciones, escala y controles.
- `css/`: Estilos modulares (variables, layout, slides, print).
- `assets/images/webp/`: Imágenes optimizadas en WebP.
- `scripts/`: Herramientas para optimizar imágenes y edición AI.

## Diseño y UX

- **Canvas fijo**: 1920x1080 escalado al viewport.
- **Tipografía**: Dancing Script (títulos), Quicksand (cuerpo).
- **Colores**: Paleta inspirada en el Pirineo (oro, beige, negro).
- **Responsive**: Escala automática sin breakpoints tradicionales.

## Optimización

- **Imágenes**: Batch-convertidas a WebP con Sharp (Node.js).
- **Performance**: Lazy loading, preconnect a fonts.
- **Accesibilidad**: Contraste WCAG, navegación por teclado.

## Producción

- **PDF**: Exportable desde navegador (Ctrl+P) con ajustes de impresión.
- **Web**: Single-page con anclas, formularios opcionales.

## Contenido por slides

1. Portada
2. Índice / Selector de perfiles
3-5. Manifiesto, Quiénes somos, Taller
6-7. Servicios, Proceso
8-10. Perfiles (Profesionales, Negocios, Hogar)
11-13. Casos de éxito
14-15. Materiales, Cobertura
16-17. Testimonios, Propuesta de valor
18-19. Disponibilidad, Red artesanal
20-21. Contacto, Contraportada

## Checklist de producción

- [x] Contenido finalizado
- [ ] Reemplazar placeholders en testimonios
- [ ] Generar QR code para habitatdecor.es
- [ ] Revisión visual en navegador
- [ ] Optimización de imágenes finales

## Contacto

Habitat & Decor  
Jaca, Pirineo Aragonés  
tienda@habitatdecor.es  
+34 630 908 883  
habitatdecor.es

---

*2026 - Creamos ambientes que cuentan historias.*