# CLAUDE.md — Book Profesional 2026 · v2

Sub-proyecto independiente dentro del mismo repositorio. Experimenta libremente
sin afectar la versión de producción en `../`.

## Relación con el proyecto principal

- Hereda el sistema de diseño: tokens en `../css/variables.css`
- Hereda los assets: `../assets/images/`
- **No hereda** el HTML ni los estilos de slides — v2 parte desde cero

## Cómo correr

```powershell
cd d:\Documents\DECO\BOOK_PROFESIONAL_2026\v2
python -m http.server 8001   # puerto diferente al principal (8000)
# abrir http://localhost:8001
```

## Objetivos de v2

> Definir aquí el diferenciador respecto a v1 cuando empiece el trabajo.

## Stack

Misma base: HTML/CSS/JS puro, canvas 1920×1080, sin build step.

## Tokens a reutilizar del principal

- `--c-*` color aliases
- `--font-display` / `--font-body`
- `--pad-x`, `--pad-y`, `--gap-*`
- `--t-*` escala tipográfica

Para usar los tokens: `<link rel="stylesheet" href="../css/variables.css">`

## Optimización de sesión

- Trabajar en esta carpeta abre un contexto Claude propio (este CLAUDE.md)
- El contexto del principal (`../CLAUDE.md`) no se carga automáticamente
- Usar `@../css/variables.css` o `@../index.html` si necesitas referenciar v1
