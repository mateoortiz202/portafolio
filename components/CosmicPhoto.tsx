"use client";

import { useEffect, useRef } from "react";
import { COSMIC_CONFIG, type CosmicObjectVariant, type CosmicObjectType } from "@/lib/cosmicObjects";

const IMAGE_SRC: Partial<Record<CosmicObjectType, string>> = {
  galaxy: "/images/cosmic/galaxy.webp",
  star: "/images/cosmic/star.webp",
  planet: "/images/cosmic/planet.webp",
  blackhole: "/images/cosmic/blackhole.webp",
  nebula: "/images/cosmic/nebula.webp",
};

// Cuánto se difumina el borde de la foto: valores altos = borde casi nítido
// (el planeta, que en la realidad SÍ tiene un borde definido), valores bajos =
// borde muy difuso (galaxia/nebulosa/estrella/agujero negro, cuerpos difusos).
const FEATHER: Partial<Record<CosmicObjectType, number>> = {
  galaxy: 35,
  star: 40,
  nebula: 30,
  blackhole: 50,
  planet: 92,
};

export default function CosmicPhoto() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-cosmic]"));
    let currentType: CosmicObjectType | null = null;
    let rafId: number;

    function frame() {
      const H = window.innerHeight;
      let best: { variant: CosmicObjectVariant; proximity: number } | null = null;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - H / 2);
        const raw = Math.max(0, Math.min(1, 1 - dist / (H * 0.9)));
        const eased = raw * raw * (3 - 2 * raw);
        if (!best || eased > best.proximity) {
          best = { variant: Number(section.dataset.cosmic) as CosmicObjectVariant, proximity: eased };
        }
      }

      const cfg = best ? COSMIC_CONFIG[best.variant] : null;
      const src = cfg ? IMAGE_SRC[cfg.type] : undefined;

      if (best && cfg && src && best.proximity > 0.02) {
        if (currentType !== cfg.type) {
          el!.src = src;
          currentType = cfg.type;
          const feather = FEATHER[cfg.type] ?? 45;
          const mask = `radial-gradient(circle, black ${feather}%, transparent 100%)`;
          el!.style.maskImage = mask;
          el!.style.webkitMaskImage = mask;
        }
        const maxSize = Math.min(window.innerWidth, window.innerHeight) * 0.9 * cfg.sizeFactor;
        const size = maxSize * best.proximity;
        el!.style.width = `${size}px`;
        el!.style.height = `${size}px`;
        el!.style.opacity = String(best.proximity);
      } else {
        el!.style.opacity = "0";
      }

      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(rafId);
  }, []);

  // next/image no encaja aquí: tamaño/src cambian cada frame de forma imperativa,
  // y el export estático ya corre con `images.unoptimized`, sin beneficio real.
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} className="cosmic-photo" alt="" aria-hidden="true" />;
}
