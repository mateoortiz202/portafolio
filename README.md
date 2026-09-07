# Portafolio — Mateo Ortiz López

Portafolio personal de [Mateo Ortiz López](https://mateoortizlopez.vercel.app), Backend Developer. Sitio de una sola página con una identidad visual de "viaje espacial": un starfield animado en canvas, scroll con inercia, un salto a hipervelocidad como momento central, y escenas SVG animadas propias por sección (órbitas para Experiencia, una estación de acople giratoria para Contacto).

🔗 **Sitio en vivo:** https://mateoortizlopez.vercel.app

## Stack

- [Next.js 16](https://nextjs.org) (App Router, exportado como sitio estático)
- React 19 + TypeScript
- CSS puro (custom properties, sin Tailwind) — la identidad visual ya estaba resuelta como variables y clases semánticas, no había necesidad de un framework de utilidades
- [Lenis](https://github.com/darkroomengineering/lenis) para el scroll con inercia
- Animaciones SVG (`offset-path`/CSS Motion Path y SMIL) para las escenas decorativas de cada sección

## Contenido

- **Inicio** — presentación
- **Sobre mí** — trayectoria y forma de trabajar
- **Stack** — tecnologías, con una constelación interactiva en escritorio
- **Experiencia** — 3 etapas de carrera, representadas como planetas en órbitas conectadas por una ruta de transferencia
- **Contacto** — email, LinkedIn y GitHub, con una estación de acople orbital animada de fondo

Todo el contenido está en español e inglés (selector de idioma en la barra de navegación), definido en `content/es.ts` y `content/en.ts`.

## Desarrollo local

Este proyecto usa `pnpm` como gestor de paquetes.

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
pnpm build   # genera el export estático en out/
pnpm lint    # eslint
```

## Estructura

```
app/            # layout raíz, globals.css, entry point
components/     # una sección/pieza de UI por archivo (Hero, About, Stack, Experience, Contact, Starfield, ...)
content/        # diccionarios de i18n (es.ts, en.ts) y el contexto de idioma
lib/            # configuración (feature flags, breakpoints, datos de contacto)
```

Cada sección de contenido (Stack, Experiencia, Contacto) separa el texto real (`content/*.ts`) de su presentación (`components/*.tsx`), así que cambiar copy no implica tocar layout ni animaciones.

## Despliegue

Desplegado en [Vercel](https://vercel.com), conectado directamente a la rama `main` de este repo — cada push a `main` dispara un nuevo deploy automático.
