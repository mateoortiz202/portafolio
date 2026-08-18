/** Color ambiental por sección (después del salto): un glow suave que se
 * enciende cuando la sección está en foco y se disuelve al pasar a la
 * siguiente — no es un objeto literal, solo atmósfera de color. */
export const SECTION_GLOW_COLORS = [
  "125,211,252", // 0 Sobre mí — cian (acento del sitio)
  "251,191,109", // 1 Stack — ámbar
  "226,114,91", // 2 Experiencia — terracota
  "255,233,176", // 3 Contacto — blanco cálido
  "196,181,253", // 4 Proyectos (oculto) — violeta
] as const;
