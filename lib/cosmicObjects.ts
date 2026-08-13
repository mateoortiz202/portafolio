export type CosmicObjectType = "galaxy" | "star" | "constellation" | "planet" | "blackhole" | "nebula";

/**
 * Índice de sección (en orden de aparición al hacer scroll):
 * 0 Hero (galaxia), 1 Sobre mí (estrella), 2 Stack (constelación),
 * 3 Experiencia (planeta), 4 Contacto (agujero negro), 5 Proyectos, oculto (nebulosa).
 */
export type CosmicObjectVariant = 0 | 1 | 2 | 3 | 4 | 5;

export interface CosmicObjectConfig {
  type: CosmicObjectType;
  /** Radio relativo al radio máximo disponible en pantalla (0-1). */
  sizeFactor: number;
  glow: number;
  colorRgb: string;
}

export const COSMIC_CONFIG: Record<CosmicObjectVariant, CosmicObjectConfig> = {
  0: { type: "galaxy", sizeFactor: 0.95, glow: 0.4, colorRgb: "165,180,252" },
  1: { type: "star", sizeFactor: 0.32, glow: 0.7, colorRgb: "125,211,252" },
  2: { type: "constellation", sizeFactor: 0.75, glow: 0.35, colorRgb: "251,191,109" },
  3: { type: "planet", sizeFactor: 0.6, glow: 0.28, colorRgb: "226,114,91" },
  4: { type: "blackhole", sizeFactor: 0.68, glow: 0.55, colorRgb: "255,200,120" },
  5: { type: "nebula", sizeFactor: 0.85, glow: 0.35, colorRgb: "196,181,253" },
};
