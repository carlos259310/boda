# Skill: Compilar proyecto para producción

Genera la versión estática del sitio en la carpeta `dist/`.

## Proyecto activo
- Raíz: `/home/batman/boda/boda/`
- Framework: Astro 5.x
- Output: `dist/` (ignorada en git, generada en cada build)

## Comandos

```bash
npm run build
```

Para previsualizar el resultado localmente:

```bash
npm run preview
```

## Estructura de componentes
Los archivos fuente que se compilan están en:
- `src/pages/index.astro` — página principal
- `src/components/` — 21 componentes (Hero, Countdown, VideoSection, Gallery, RSVP, etc.)
- `src/layouts/Layout.astro` — layout base con meta tags OG
- `src/styles/global.css` — estilos globales
- `public/` — assets estáticos (imágenes, audio, favicon, videos)

## Notas
- El build falla si hay errores en cualquier componente `.astro`
- Verificar `build_error.txt` si hay errores previos documentados
- Luego del build usar `/deploy` para subir a Vercel
