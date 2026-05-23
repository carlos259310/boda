# Skill: Deploy a Vercel

Compila el proyecto y lo despliega a Vercel en producción.

## Proyecto activo
- Raíz: `/home/batman/boda/boda/`
- Framework: Astro 5.x
- Plataforma: Vercel (configurado en `vercel.json`)
- Output: carpeta `dist/` (generada por el build)

## Comandos

```bash
# Build primero
npm run build

# Deploy a producción
vercel --prod
```

## Notas
- `vercel.json` usa `@vercel/static-build` apuntando a `dist/`
- Verificar que `npm run build` termine sin errores antes del deploy
- Si es el primer deploy, `vercel` pedirá configuración inicial del proyecto
