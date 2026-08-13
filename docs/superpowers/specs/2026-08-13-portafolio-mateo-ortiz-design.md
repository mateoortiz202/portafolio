# Portafolio profesional — Mateo Ortiz López

**Fecha:** 2026-08-13
**Estado:** Aprobado para implementación

## 1. Propósito

Sitio web de una sola página (one-pager) que funciona como carta de presentación profesional para Mateo Ortiz López, Backend Developer Senior. No es un CV interactivo exhaustivo ni busca reemplazar la hoja de vida: es una pieza de impacto visual, memorable y original, para compartir con oportunidades laborales interesantes (sin búsqueda activa de cambio de empleo).

## 2. Arquitectura y stack técnico

- **Framework:** Next.js (App Router), export estático (sin backend, sin CMS).
- **Tipografía:** `next/font` auto-hospedando Space Grotesk (titulares), JetBrains Mono (marcadores/etiquetas), Inter (texto de cuerpo). Evita el bloqueo de render de cargar fuentes desde Google Fonts en runtime.
- **Scroll:** Lenis para scroll con inercia (smooth scroll con "peso").
- **Animación de fondo:** Canvas 2D nativo (sin Three.js/WebGL) para el starfield — más liviano y con mejor rendimiento que una escena 3D completa.
- **Revelado de contenido:** `IntersectionObserver` nativo para fade-in escalonado por sección.
- **Internacionalización:** selector ES/EN en el nav, preferencia persistida en `localStorage`. Implementación con `next-intl` si el alcance lo justifica; si no, diccionario JS simple.
- **Despliegue:** Vercel.
- **Control de versiones:** repositorio git local, con `user.name`/`user.email` configurados a nivel de repo (identidad personal, no laboral).

## 3. Estructura de secciones

| # | Sección | Contenido |
|---|---------|-----------|
| 01 | **Hero** | Nombre completo, rol ("Backend Developer" — poliglota, sin lenguaje insignia único), ubicación (Itagüí, Antioquia), indicio visual de scroll. |
| — | **Salto a hipervelocidad** | Transición flagship (no es contenido): zona de scroll donde el starfield acelera y deja estelas, ligada 1:1 a la velocidad de scroll del usuario. Ocurre una sola vez, entre Hero y Sobre mí. |
| 02 | **Sobre mí** | Tecnólogo ADSI, ganador SENASOFT 2022 (categoría Desarrollo Integral), 3 años de experiencia, rasgos personales (perseverante, autodidacta, resolución de problemas), motivación (tecnología con impacto positivo en las personas). |
| 03 | **Stack** | Grid monocromático (acento cian, sin colores de marca) con los lenguajes/tecnologías, **sin jerarquía visual marcada entre ellos** (enfoque "backend poliglota"): Rust, TypeScript, Python, MongoDB, NestJS, React, Java/Spring Boot, Node.js. Odoo no se detalla como framework aparte — Python se menciona como lenguaje general. |
| 04 | **Experiencia** | Backend Senior — la empresa empleadora **no se nombra** (se describe por contexto/sector si aporta valor); mención de EPM como cliente **condicionada**: solo se incluye si Mateo confirma que no existe restricción de confidencialidad contractual para nombrarlo. Experiencia práctica con Python (sin profundizar en Odoo). Trayectoria previa como Fullstack JavaScript (React). |
| 05 | **Proyectos** | Sección construida pero **comentada/oculta** en el código, lista para activar cuando haya casos de estudio que mostrar. Patrón de referencia para cuando se active: galería con overlay al hacer hover mostrando "Tecnología · nombre del proyecto". |
| 06 | **Contacto** | Email (mateoortiz202@gmail.com), LinkedIn (linkedin.com/in/mateo-ortiz-lopez), GitHub (github.com/mateoortiz202). Sin teléfono (se considera información sensible para exposición pública). Sin formulario de contacto funcional. |

## 4. Sistema visual y de movimiento

- **Paleta:** fondo oscuro (`#05060a`), acento cian (`#7dd3fc`), texto principal crema/blanco (`#f1f5f9`), texto secundario gris azulado (`#94a3b8`).
- **Tipografía:** titulares (h1/h2) en Space Grotesk 700, mayúsculas, tracking apretado (`-1px`); marcadores de sección (ej. "01 / INICIO") y etiquetas en JetBrains Mono; texto de cuerpo en Inter.
- **Starfield:** campo de estrellas en canvas de fondo, fijo, con parallax radial (efecto "volar a través del espacio") atado a la posición de scroll en toda la página.
- **Restricción deliberada de movimiento** (lección aplicada de referencias investigadas): solo tres patrones de animación, repetidos consistentemente en vez de un efecto distinto por sección:
  1. Starfield continuo de fondo.
  2. Fade-in escalonado del texto de cada sección al entrar en el viewport.
  3. Un único momento flagship: el salto a hipervelocidad.
- **Sección Stack:** cada tile tiene borde cian sutil que se intensifica (glow + leve elevación) al hacer hover, en vez de efectos de zoom de imagen.

## 5. Responsive y accesibilidad

- **Mobile:** menor densidad de estrellas en el canvas (ajuste de rendimiento), grid de Stack a 2-3 columnas, nav colapsado.
- **`prefers-reduced-motion`:** se respeta reduciendo o desactivando las animaciones de scroll/starfield/salto a hipervelocidad para quienes lo tengan activado a nivel de sistema.
- **Contraste:** combinación cian sobre fondo oscuro verificada para cumplir contraste mínimo AA en texto grande.

## 6. Explícitamente fuera de alcance (YAGNI)

- Formulario de contacto funcional (backend/API).
- CMS o gestión de contenido dinámico.
- Blog.
- Teléfono público.
- Nombre del empleador actual.
- Sección de Proyectos visible (queda en código, comentada, para activar después).
- Reemplazo de la hoja de vida / CV tradicional.

## 7. Datos de contenido confirmados

- **Nombre:** Mateo Ortiz López
- **Ubicación:** Itagüí, Antioquia
- **Años de experiencia:** 3
- **Email de contacto:** mateoortiz202@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/mateo-ortiz-lopez
- **GitHub:** https://github.com/mateoortiz202

## 8. Pendiente de confirmar antes/durante implementación

- Si se incluye o no la mención a EPM como cliente en la sección Experiencia (sujeto a que Mateo confirme que no hay restricción de confidencialidad).
- Redacción final de copy en español e inglés para cada sección.
