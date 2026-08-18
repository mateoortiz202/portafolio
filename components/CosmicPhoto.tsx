"use client";

import { useEffect, useRef } from "react";

const GALAXY_IMAGE_SRC = "/images/cosmic/galaxy.webp";
const GALAXY_FEATHER = "radial-gradient(circle, black 35%, transparent 100%)";
const GALAXY_SIZE_FACTOR = 0.95;

export default function CosmicPhoto() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heroSection = document.querySelector<HTMLElement>("[data-cosmic]");
    if (!heroSection) return;

    el.src = GALAXY_IMAGE_SRC;
    el.style.maskImage = GALAXY_FEATHER;
    el.style.webkitMaskImage = GALAXY_FEATHER;

    let rafId: number;
    function frame() {
      const H = window.innerHeight;
      const rect = heroSection!.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - H / 2);
      const raw = Math.max(0, Math.min(1, 1 - dist / (H * 0.9)));
      const proximity = raw * raw * (3 - 2 * raw);

      if (proximity > 0.02) {
        const maxSize = Math.min(window.innerWidth, window.innerHeight) * 0.9 * GALAXY_SIZE_FACTOR;
        const size = maxSize * proximity;
        el!.style.width = `${size}px`;
        el!.style.height = `${size}px`;
        el!.style.opacity = String(proximity);
      } else {
        el!.style.opacity = "0";
      }

      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(rafId);
  }, []);

  // next/image no encaja aquí: tamaño cambia cada frame de forma imperativa,
  // y el export estático ya corre con `images.unoptimized`, sin beneficio real.
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} className="cosmic-photo" alt="" aria-hidden="true" />;
}
