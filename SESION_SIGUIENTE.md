# Book Profesional — Sesión siguiente (20% restante)

## Estado al cerrar esta sesión
- **Commit:** `ad1134d` — v1.1 lista, 19 slides, marca real, fotos, menú de perfiles
- **Rama:** master (limpia, nada pendiente de commit)

---

## Lo que queda por hacer

### 1. Revisión visual en navegador (primer paso)
Abrir `index.html` en Chrome/Edge y recorrer las 19 slides.
Anotar cualquier slide que tenga:
- Texto demasiado grande o pequeño (Dancing Script renderiza ~15% más grande que Playfair)
- Fotos mal encuadradas (se puede cambiar `object-position` en CSS)
- Colores o contrastes que no convencen

### 2. Nombres reales en testimonios
Reemplazar en el HTML:
| Placeholder | Slide | Valor real |
|-------------|-------|------------|
| `[Nombre Interiorista]` | 11, 16 | — |
| `[Estudio Nombre]` | 11 | — |
| `[Nombre Propietario]` / `[Apartamentos Nombre]` | 12, 16 | — |
| `[Familia Apellido]` | 13, 16 | — |

### 3. QR real de habitatdecor.es
- Generar en qr-code-generator.com o similar
- Guardar como `assets/images/qr-habitatdecor.svg` o `.png`
- En `index.html` slide 19: reemplazar `.qr-ph` por `<img src="assets/images/qr-habitatdecor.svg" …>`

### 4. Refinamiento de fotos (opcional)
Galería completa en: `D:\Documents\DECO\habitatdeco-galeria\imagenes_tv\`
Se pueden swapear imágenes puntuales según lo que se vea en revisión.

---

## Cómo arrancar la sesión de mañana
1. Abrir este fichero
2. Abrir `index.html` en Chrome
3. Decirle a Claude: *"Continúa con el book, ya revisé visualmente — aquí mis notas: …"*
