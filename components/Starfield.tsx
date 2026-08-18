"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { STAR_COUNT_DESKTOP, STAR_COUNT_MOBILE, MOBILE_BREAKPOINT } from "@/lib/config";
import { GALAXY_CONFIG } from "@/lib/galaxy";
import { SECTION_GLOW_COLORS } from "@/lib/sectionGlow";

interface Star {
  angle: number;
  radius: number;
  z: number;
  twinkle: number;
  heldFlicker: number;
  lastLap: number;
}

interface DustPoint {
  x: number;
  y: number;
  size: number;
  alpha: number;
}

// Puntos generados una sola vez al cargar el módulo (no por frame) para dar
// textura de "campo de partículas" real en vez de manchas planas.
function makeGalaxyDust(): DustPoint[] {
  const pts: DustPoint[] = [];
  const arms = 2;
  for (let arm = 0; arm < arms; arm++) {
    const armOffset = (arm * Math.PI * 2) / arms;
    for (let i = 0; i < 90; i++) {
      const t = i / 90;
      const angle = armOffset + t * Math.PI * 2.4;
      const r = 0.08 + t * 0.9;
      const jitter = (Math.random() - 0.5) * 0.05;
      pts.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r * 0.5 + jitter,
        size: (0.004 + Math.random() * 0.012) * (1 - t * 0.4),
        alpha: (0.2 + Math.random() * 0.5) * (1 - t * 0.35),
      });
    }
  }
  return pts;
}

const GALAXY_DUST = makeGalaxyDust();

function drawGalaxy(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
  if (radius < 1) return;
  const colorRgb = GALAXY_CONFIG.colorRgb;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  const haloGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.15);
  haloGrad.addColorStop(0, `rgba(${colorRgb}, 0.16)`);
  haloGrad.addColorStop(0.5, `rgba(${colorRgb}, 0.06)`);
  haloGrad.addColorStop(1, `rgba(${colorRgb}, 0)`);
  ctx.beginPath();
  ctx.fillStyle = haloGrad;
  ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
  ctx.fill();

  for (const p of GALAXY_DUST) {
    const size = Math.max(0.4, p.size * radius);
    const warm = p.size > 0.011;
    const tint = warm ? "255,225,190" : colorRgb;
    ctx.beginPath();
    ctx.fillStyle = `rgba(${tint}, ${p.alpha})`;
    ctx.arc(cx + p.x * radius, cy + p.y * radius, size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawSectionGlow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  W: number,
  H: number,
  side: "left" | "right",
  proximity: number,
  colorRgb: string,
) {
  const gx = side === "right" ? cx + W * 0.28 : cx - W * 0.28;
  const radius = Math.min(W, H) * 0.62;
  const alpha = proximity * 0.32;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const grad = ctx.createRadialGradient(gx, cy, 0, gx, cy, radius);
  grad.addColorStop(0, `rgba(${colorRgb}, ${alpha})`);
  grad.addColorStop(0.6, `rgba(${colorRgb}, ${alpha * 0.35})`);
  grad.addColorStop(1, `rgba(${colorRgb}, 0)`);
  ctx.beginPath();
  ctx.fillStyle = grad;
  ctx.arc(gx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accentRgb =
      getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim() ||
      "125,211,252";

    let W = 0;
    let H = 0;
    let cx = 0;
    let cy = 0;

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      cx = W / 2;
      cy = H / 2;
    }
    window.addEventListener("resize", resize);
    resize();

    const starCount = window.innerWidth < MOBILE_BREAKPOINT ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP;
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * Math.max(W, H) * 0.6,
        z: 0.2 + Math.random() * 0.8,
        twinkle: Math.random() * Math.PI * 2,
        heldFlicker: 0.55,
        lastLap: 0,
      });
    }

    const warpZone = document.querySelector<HTMLElement>(".warp-zone");
    const warpLabel = document.querySelector<HTMLElement>(".warp-label");
    // Único "objeto cósmico" del sitio: la galaxia del Hero (ver lib/galaxy.ts).
    const heroSection = document.querySelector<HTMLElement>("[data-cosmic]");
    const glowSections = Array.from(document.querySelectorAll<HTMLElement>("[data-glow]"))
      .map((el) => {
        const glowIndex = Number(el.dataset.glow);
        return {
          el,
          side: (el.dataset.glowSide === "left" ? "left" : "right") as "left" | "right",
          colorIndex: glowIndex % SECTION_GLOW_COLORS.length,
          // Sobre mí / Stack / Experiencia (0,1,2): el brillo se pausa una vez
          // el texto ya llegó casi del todo (90-100%). Contacto (3) se deja
          // fuera a propósito, para no apagarlo justo donde están los enlaces.
          pausesNearFullFocus: glowIndex <= 2,
          content: el.querySelector<HTMLElement>(".sec-content"),
        };
      })
      .filter((s): s is typeof s & { content: HTMLElement } => s.content !== null);

    // Sin animación: el contenido queda visible de una vez (en flujo normal,
    // ver el media query prefers-reduced-motion en globals.css), sin depender del scroll.
    if (reducedMotion) {
      for (const section of glowSections) {
        section.content.style.opacity = "1";
        section.content.style.transform = "none";
      }
    }

    function warpIntensity() {
      if (!warpZone || reducedMotion) return 0;
      const rect = warpZone.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return 0;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      return Math.sin(progress * Math.PI);
    }

    // Qué tan "presente" está la galaxia: 1 mientras el Hero llena la pantalla,
    // 0 en cuanto te alejas de él (no vuelve a aparecer más adelante).
    function galaxyProximity() {
      if (reducedMotion || !heroSection) return 0;
      return sectionProximity(heroSection);
    }

    function sectionProximity(el: HTMLElement) {
      const rect = el.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = H / 2;
      const dist = Math.abs(sectionCenter - viewportCenter);
      const raw = Math.max(0, Math.min(1, 1 - dist / (H * 0.9)));
      return raw * raw * (3 - 2 * raw);
    }

    function maxRadius() {
      return Math.hypot(W, H) * 0.65;
    }

    const lenis = reducedMotion ? null : new Lenis({ lerp: 0.1 });

    // Suaviza la intensidad en el tiempo (no solo atada al instante del
    // scroll): sin esto, la estela "palpita" rápido si scrolleas a velocidad
    // normal. Con este suavizado, subir y bajar se siente lento y gradual.
    let smoothedIntensity = 0;

    // El titileo se congela por INACTIVIDAD de scroll, no por qué tan
    // centrada esté una sección: verificado con datos reales (Chrome
    // DevTools) que basarlo en proximity fallaba en dos formas — durante la
    // lectura normal casi nunca se llegaba al umbral (apenas ~0.336 con el
    // texto ya legible), y al final de la página (después de Contacto, ya
    // sin ninguna sección centrada) el sistema asumía "nada en foco" y
    // dejaba el titileo activo, justo al revés de lo esperado. "¿Dejaste de
    // scrollear?" es la pregunta correcta y cubre ambos casos sin depender
    // de la geometría de ninguna sección en particular.
    let lastScrollY = window.scrollY;
    let lastScrollChangeTime: number | null = null;
    const SCROLL_IDLE_MS = 350;
    const SCROLL_EPSILON = 0.4;

    let rafId: number;
    function frame(t: number) {
      lenis?.raf(t);

      const scrollY = window.scrollY;
      const warpInt = warpIntensity();
      if (warpLabel) warpLabel.style.opacity = warpInt.toFixed(2);
      const proximity = galaxyProximity();

      const sectionProximities = glowSections.map((section) => sectionProximity(section.el));
      // Las secciones después del salto se quedan tan calmadas como el Hero:
      // solo el salto en sí mismo acelera/deja estela en las estrellas.
      smoothedIntensity += (warpInt - smoothedIntensity) * 0.06;
      const intensity = smoothedIntensity;

      if (lastScrollChangeTime === null) lastScrollChangeTime = t;
      if (Math.abs(scrollY - lastScrollY) > SCROLL_EPSILON) {
        lastScrollY = scrollY;
        lastScrollChangeTime = t;
      }
      const twinkleFrozen = t - lastScrollChangeTime > SCROLL_IDLE_MS;

      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = "#05060a";
      ctx!.fillRect(0, 0, W, H);

      const mr = maxRadius();
      for (const star of stars) {
        const speed = (0.12 + star.z * 0.9) * (1 + intensity * 6);
        // rawR se recalcula entero cada frame a partir de star.radius (que
        // nunca cambia) más el scrollY actual — con scrollY grande y quieto,
        // rawR > mr se cumple igual de frame en frame. Comparar solo "¿pasó
        // el umbral?" (como antes) reasignaba un ángulo aleatorio en CADA
        // frame para siempre, no solo al cruzar — eso hacía que cualquier
        // estrella "envuelta" (cualquier sección lejos del tope) saltara de
        // posición sin parar incluso con scroll totalmente quieto. Contar en
        // qué "vuelta" (lap) del radio está y solo re-aleatorizar cuando esa
        // vuelta cambia respecto al frame anterior arregla esto: con scrollY
        // fijo, lap no cambia, así que el ángulo deja de reasignarse.
        const rawR = star.radius + scrollY * speed * 0.5;
        const lap = Math.floor(rawR / mr);
        if (lap !== star.lastLap) {
          star.angle = Math.random() * Math.PI * 2;
          star.lastLap = lap;
        }
        const r = rawR - lap * mr;
        const dx = Math.cos(star.angle);
        const dy = Math.sin(star.angle) * 0.6;
        const x = cx + dx * r;
        const y = cy + dy * r;
        const size = 0.4 + star.z * 2.2;
        if (!twinkleFrozen) {
          star.heldFlicker = 0.55 + 0.45 * Math.sin(t * 0.002 + star.twinkle);
        }
        const flicker = star.heldFlicker;
        const alpha = (0.25 + star.z * 0.65) * flicker;
        ctx!.strokeStyle = ctx!.fillStyle = `rgba(${accentRgb}, ${alpha})`;

        if (intensity > 0.12) {
          const streak = intensity * size * 16 * star.z;
          ctx!.lineWidth = size;
          ctx!.lineCap = "round";
          ctx!.beginPath();
          ctx!.moveTo(x, y);
          ctx!.lineTo(x - dx * streak, y - dy * streak);
          ctx!.stroke();
        } else {
          ctx!.beginPath();
          ctx!.arc(x, y, size, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      if (proximity > 0.01) {
        // La galaxia vive pegada al borde derecho (mismo lugar que la foto en
        // CosmicPhoto.tsx) — antes seguía dibujándose en el centro, dejando
        // un halo/estela "huérfano" en medio de la pantalla.
        const radius = maxRadius() * 0.44 * GALAXY_CONFIG.sizeFactor * proximity;
        drawGalaxy(ctx!, W, cy, radius);
      }

      if (!reducedMotion) {
        for (let i = 0; i < glowSections.length; i++) {
          const section = glowSections[i];
          const glowProximity = sectionProximities[i];

          const paused = section.pausesNearFullFocus && glowProximity >= 0.9;
          if (glowProximity > 0.01 && !paused) {
            drawSectionGlow(ctx!, cx, cy, W, H, section.side, glowProximity, SECTION_GLOW_COLORS[section.colorIndex]);
          }

          // El contenedor completo (no cada hijo por separado) crece/se
          // desvanece como un solo bloque. El translateY(-50%) es el mismo
          // que ya centra verticalmente al volverse "fixed" en CSS — se debe
          // repetir aquí porque el estilo inline reemplaza el transform entero.
          const scale = (0.2 + 0.8 * glowProximity).toFixed(3);
          section.content.style.opacity = glowProximity.toFixed(2);
          section.content.style.transform = `translateY(-50%) scale(${scale})`;
          section.content.style.pointerEvents = glowProximity > 0.4 ? "auto" : "none";
        }
      }

      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <canvas id="stars" ref={canvasRef} aria-hidden="true" />;
}
