# Image Tools — Habitat & Decor Book

Eres el agente de gestión de imágenes del proyecto **Habitat & Decor Book Profesional 2026**.
Tienes acceso a dos herramientas en `scripts/`:

---

## Herramientas disponibles

### 1. `optimize-images.js` — Optimización batch con Sharp
Convierte JPG/PNG → WebP, redimensiona a max 1920px, calidad configurable.
Output en `assets/images/webp/`. Los originales no se tocan.

```powershell
# Optimizar todas las imágenes (q85, max 1920px)
node scripts/optimize-images.js

# Opciones avanzadas
node scripts/optimize-images.js --quality 90 --width 2560
node scripts/optimize-images.js --file cortinas_lino.jpg
```

### 2. `edit-image.js` — Edición creativa con FLUX.1 Kontext Pro (Fal.ai)
Edita una imagen existente del book mediante instrucción de texto.
Requiere `FAL_KEY` en entorno.

```powershell
# Configurar API key (una sola vez por sesión)
$env:FAL_KEY = "tu-api-key-de-fal.ai"

# Editar imagen
node scripts/edit-image.js hero-curtain.jpg "Añade luz dorada de atardecer pirenaico"
node scripts/edit-image.js cortinas_lino.jpg "Elimina el fondo, pon pared de piedra rústica"
node scripts/edit-image.js tapizado_sofa.jpg "Cambia el tapizado a color arena/beige cálido"

# Con opciones
node scripts/edit-image.js imagen.jpg "prompt" --output nueva.jpg --strength 0.85
```

---

## Flujo de trabajo recomendado

### Para actualizar imágenes del book (web):
1. Optimizar todas: `node scripts/optimize-images.js`
2. Verificar resultados en `images/webp/`
3. Actualizar `index.html` — cambiar extensión `.jpg` → `.webp` en los `<img src="">`

### Para edición creativa de una foto:
1. Asegurarse de que `FAL_KEY` está en entorno
2. Ejecutar `edit-image.js` con la imagen y el prompt
3. Revisar resultado en `images/<nombre>_edited.jpg`
4. Si es aceptable, moverlo a `images/` con el nombre definitivo

---

## Cuándo invocar cada herramienta

| Necesidad | Herramienta |
|---|---|
| El book carga lento (imágenes pesadas) | `optimize-images.js` |
| Quiero versiones WebP para web | `optimize-images.js` |
| Cambiar fondos, colores, luz de una foto | `edit-image.js` |
| Quitar objetos / retocar composición | `edit-image.js` |
| Ajustar estilo de imagen a marca | `edit-image.js` |

---

## Estado actual de imágenes

Las siguientes imágenes son las más pesadas y prioritarias para optimizar:

| Imagen | Tamaño | Prioridad |
|---|---|---|
| `mostrarios.jpg` | 3.1MB | ALTA |
| `Mostrario_tapiceria.jpg` | 832KB | ALTA |
| `tapizado_sofa.jpg` | 788KB | MEDIA |
| `furgoneta_casa_rural.jpg` | 660KB | MEDIA |
| `dormitorio_casa_rural_v2.jpg` | 616KB | MEDIA |
| `cortinas_lino.jpg` | 1.8MB | ALTA |

---

## Instrucciones para el agente

Cuando el usuario invoque `/image-tools`:

1. **Sin argumentos** → muestra este menú con estado actual de imágenes.
2. **Con `optimize`** → ejecuta `node scripts/optimize-images.js` y muestra la tabla de resultados.
3. **Con `edit <imagen> <prompt>`** → verifica que `FAL_KEY` esté en entorno, luego ejecuta `node scripts/edit-image.js`.
4. **Con `status`** → lista imágenes en `images/` con tamaño, y en `images/webp/` si existen versiones WebP.

Nunca modifiques `index.html` sin confirmación del usuario.
Si el usuario quiere usar las WebP en producción, propón el cambio de rutas en `index.html` y espera aprobación.
