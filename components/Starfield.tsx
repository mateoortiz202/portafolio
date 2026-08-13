"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { STAR_COUNT_DESKTOP, STAR_COUNT_MOBILE, MOBILE_BREAKPOINT } from "@/lib/config";
import { COSMIC_CONFIG, type CosmicObjectVariant } from "@/lib/cosmicObjects";

interface Star {
  angle: number;
  radius: number;
  z: number;
  twinkle: number;
}

interface DustPoint {
  x: number;
  y: number;
  size: number;
  alpha: number;
}

const CRATER_SPOTS = [
  { dx: -0.32, dy: -0.22, r: 0.11, alpha: 0.28 },
  { dx: 0.24, dy: 0.12, r: 0.15, alpha: 0.22 },
  { dx: -0.12, dy: 0.36, r: 0.08, alpha: 0.3 },
  { dx: 0.4, dy: -0.32, r: 0.06, alpha: 0.24 },
  { dx: 0.08, dy: -0.1, r: 0.05, alpha: 0.2 },
];

const CONSTELLATION_POINTS = [
  { x: -0.9, y: 0.3 },
  { x: -0.45, y: -0.4 },
  { x: 0, y: 0.2 },
  { x: 0.45, y: -0.5 },
  { x: 0.9, y: 0.1 },
  { x: 0.55, y: 0.6 },
];

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

function makeNebulaDust(): DustPoint[] {
  const clusters = [
    { x: -0.3, y: -0.1, spread: 0.42 },
    { x: 0.25, y: 0.15, spread: 0.46 },
    { x: 0, y: -0.32, spread: 0.32 },
    { x: 0.12, y: 0.32, spread: 0.36 },
  ];
  const pts: DustPoint[] = [];
  for (const c of clusters) {
    for (let i = 0; i < 45; i++) {
      const jx = (Math.random() + Math.random() - 1) * c.spread;
      const jy = (Math.random() + Math.random() - 1) * c.spread;
      pts.push({
        x: c.x + jx,
        y: c.y + jy,
        size: 0.012 + Math.random() * 0.05,
        alpha: 0.04 + Math.random() * 0.16,
      });
    }
  }
  return pts;
}

const GALAXY_DUST = makeGalaxyDust();
const NEBULA_DUST = makeNebulaDust();
const NEBULA_SPARKS = [
  { dx: -0.15, dy: 0.05 },
  { dx: 0.2, dy: -0.1 },
  { dx: 0.05, dy: 0.25 },
  { dx: -0.25, dy: -0.2 },
  { dx: 0.32, dy: 0.08 },
];

function drawGalaxy(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, colorRgb: string) {
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
    // Ligera variación de temperatura de color por partícula (no todas el mismo tono exacto).
    const warm = p.size > 0.011;
    const tint = warm ? "255,225,190" : colorRgb;
    ctx.beginPath();
    ctx.fillStyle = `rgba(${tint}, ${p.alpha})`;
    ctx.arc(cx + p.x * radius, cy + p.y * radius, size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.3);
  coreGrad.addColorStop(0, "#fffdf6");
  coreGrad.addColorStop(0.25, "#fff6e6");
  coreGrad.addColorStop(0.6, `rgba(${colorRgb}, 0.7)`);
  coreGrad.addColorStop(1, `rgba(${colorRgb}, 0)`);
  ctx.beginPath();
  ctx.fillStyle = coreGrad;
  ctx.arc(cx, cy, radius * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, colorRgb: string) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  const haloGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.6);
  haloGrad.addColorStop(0, `rgba(${colorRgb}, 0.45)`);
  haloGrad.addColorStop(0.18, `rgba(${colorRgb}, 0.22)`);
  haloGrad.addColorStop(0.45, `rgba(${colorRgb}, 0.08)`);
  haloGrad.addColorStop(1, `rgba(${colorRgb}, 0)`);
  ctx.beginPath();
  ctx.fillStyle = haloGrad;
  ctx.arc(cx, cy, radius * 2.6, 0, Math.PI * 2);
  ctx.fill();

  // Dos ejes de difracción sutiles, ligeramente desalineados (no perfectamente
  // en cruz, como suelen verse en fotos reales de sensores/lentes).
  const spikeLen = radius * 5.5;
  for (const angle of [0.07, Math.PI / 2 - 0.05]) {
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const grad = ctx.createLinearGradient(
      cx - dx * spikeLen,
      cy - dy * spikeLen,
      cx + dx * spikeLen,
      cy + dy * spikeLen,
    );
    grad.addColorStop(0, `rgba(${colorRgb}, 0)`);
    grad.addColorStop(0.5, `rgba(${colorRgb}, 0.3)`);
    grad.addColorStop(1, `rgba(${colorRgb}, 0)`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = Math.max(0.6, radius * 0.035);
    ctx.beginPath();
    ctx.moveTo(cx - dx * spikeLen, cy - dy * spikeLen);
    ctx.lineTo(cx + dx * spikeLen, cy + dy * spikeLen);
    ctx.stroke();
  }

  const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  coreGrad.addColorStop(0, "#ffffff");
  coreGrad.addColorStop(0.2, "#fffaf0");
  coreGrad.addColorStop(0.55, `rgb(${colorRgb})`);
  coreGrad.addColorStop(1, `rgba(${colorRgb}, 0)`);
  ctx.beginPath();
  ctx.fillStyle = coreGrad;
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // Grano sutil alrededor del núcleo, para romper la suavidad "vectorial".
  for (let i = 0; i < 40; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = radius * (0.3 + Math.random() * 0.9);
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.12})`;
    ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, Math.max(0.4, radius * 0.01), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawConstellation(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, colorRgb: string) {
  const pts = CONSTELLATION_POINTS.map((p) => ({ x: cx + p.x * radius, y: cy + p.y * radius }));

  // Estrellas de fondo sin conectar, para que se sienta un trozo real de cielo
  // y no solo un diagrama aislado.
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 25; i++) {
    const bx = cx + (Math.random() * 2 - 1) * radius * 1.3;
    const by = cy + (Math.random() * 2 - 1) * radius * 0.9;
    ctx.beginPath();
    ctx.fillStyle = `rgba(${colorRgb}, ${Math.random() * 0.35})`;
    ctx.arc(bx, by, Math.max(0.4, radius * 0.012), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.strokeStyle = `rgba(${colorRgb}, 0.32)`;
  ctx.lineWidth = Math.max(0.6, radius * 0.012);
  ctx.beginPath();
  pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.stroke();

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const p of pts) {
    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 0.16);
    glow.addColorStop(0, `rgba(${colorRgb}, 0.5)`);
    glow.addColorStop(1, `rgba(${colorRgb}, 0)`);
    ctx.beginPath();
    ctx.fillStyle = glow;
    ctx.arc(p.x, p.y, radius * 0.16, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#fdfdfd";
    ctx.arc(p.x, p.y, Math.max(0.6, radius * 0.028), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawPlanet(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, colorRgb: string) {
  ctx.beginPath();
  ctx.fillStyle = `rgba(${colorRgb}, 0.08)`;
  ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
  ctx.fill();

  // Degradado con más paradas: luz directa -> terminador marcado -> lado oscuro casi negro.
  const grad = ctx.createRadialGradient(cx - radius * 0.32, cy - radius * 0.38, radius * 0.04, cx, cy, radius);
  grad.addColorStop(0, "#fff6ee");
  grad.addColorStop(0.16, `rgb(${colorRgb})`);
  grad.addColorStop(0.42, `rgba(${colorRgb}, 0.75)`);
  grad.addColorStop(0.6, "#3a1f18");
  grad.addColorStop(0.8, "#140b09");
  grad.addColorStop(1, "#05060a");
  ctx.beginPath();
  ctx.fillStyle = grad;
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();

  for (const spot of CRATER_SPOTS) {
    const sx = cx + spot.dx * radius;
    const sy = cy + spot.dy * radius;
    const sr = spot.r * radius;
    const craterGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
    craterGrad.addColorStop(0, `rgba(5,6,10,${spot.alpha})`);
    craterGrad.addColorStop(1, "rgba(5,6,10,0)");
    ctx.beginPath();
    ctx.fillStyle = craterGrad;
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }

  // Grano de superficie: rompe la suavidad "vectorial" del degradado.
  for (let i = 0; i < 90; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * radius;
    const light = Math.random() > 0.5;
    ctx.beginPath();
    ctx.fillStyle = light ? `rgba(255,255,255,${Math.random() * 0.05})` : `rgba(0,0,0,${Math.random() * 0.1})`;
    ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, Math.max(0.3, radius * 0.004), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Filo atmosférico sutil en el borde iluminado.
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.beginPath();
  ctx.strokeStyle = `rgba(${colorRgb}, 0.35)`;
  ctx.lineWidth = Math.max(0.6, radius * 0.02);
  ctx.arc(cx, cy, radius * 0.99, Math.PI * 1.05, Math.PI * 1.75);
  ctx.stroke();
  ctx.restore();
}

function drawBlackHole(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, colorRgb: string) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  ctx.beginPath();
  ctx.fillStyle = `rgba(${colorRgb}, 0.1)`;
  ctx.arc(cx, cy, radius * 1.7, 0, Math.PI * 2);
  ctx.fill();

  ctx.translate(cx, cy);
  ctx.rotate((-16 * Math.PI) / 180);

  // Disco de acreción con asimetría de brillo (más brillante al frente, como
  // el efecto Doppler que se ve en las imágenes reales de agujeros negros).
  ctx.beginPath();
  ctx.ellipse(0, 0, radius * 1.4, radius * 0.44, 0, 0, Math.PI, false);
  const backGrad = ctx.createRadialGradient(0, 0, radius * 0.5, 0, 0, radius * 1.4);
  backGrad.addColorStop(0, `rgba(${colorRgb}, 0)`);
  backGrad.addColorStop(0.6, `rgba(${colorRgb}, 0.35)`);
  backGrad.addColorStop(1, `rgba(${colorRgb}, 0)`);
  ctx.fillStyle = backGrad;
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(0, 0, radius * 1.4, radius * 0.44, 0, Math.PI, Math.PI * 2, false);
  const frontGrad = ctx.createRadialGradient(0, 0, radius * 0.5, 0, 0, radius * 1.4);
  frontGrad.addColorStop(0, `rgba(${colorRgb}, 0)`);
  frontGrad.addColorStop(0.55, `rgba(255,255,255,0.5)`);
  frontGrad.addColorStop(0.75, `rgba(${colorRgb}, 0.9)`);
  frontGrad.addColorStop(1, `rgba(${colorRgb}, 0)`);
  ctx.fillStyle = frontGrad;
  ctx.fill();

  // Grano en el disco para que no se sienta un degradado plano.
  for (let i = 0; i < 70; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 0.6 + Math.random() * 0.75;
    const gx = Math.cos(angle) * radius * 1.4 * dist;
    const gy = Math.sin(angle) * radius * 0.44 * dist;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.1})`;
    ctx.arc(gx, gy, Math.max(0.3, radius * 0.006), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();

  // Vacío del horizonte de sucesos, con borde difuminado (falsa lente gravitacional).
  for (let i = 0; i < 5; i++) {
    const rr = radius * (0.5 + i * 0.03);
    ctx.beginPath();
    ctx.fillStyle = `rgba(5,6,10,${0.22 - i * 0.03})`;
    ctx.arc(cx, cy, rr, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.beginPath();
  ctx.fillStyle = "#05060a";
  ctx.arc(cx, cy, radius * 0.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawNebula(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, colorRgb: string) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  const washes = [
    { dx: -0.3, dy: -0.1, r: 0.55, rgb: colorRgb },
    { dx: 0.25, dy: 0.15, r: 0.6, rgb: "244,163,200" },
    { dx: 0, dy: -0.3, r: 0.4, rgb: colorRgb },
    { dx: 0.1, dy: 0.3, r: 0.5, rgb: "244,163,200" },
  ];
  for (const w of washes) {
    const bx = cx + w.dx * radius;
    const by = cy + w.dy * radius;
    const br = w.r * radius;
    const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
    grad.addColorStop(0, `rgba(${w.rgb}, 0.16)`);
    grad.addColorStop(0.6, `rgba(${w.rgb}, 0.07)`);
    grad.addColorStop(1, `rgba(${w.rgb}, 0)`);
    ctx.beginPath();
    ctx.fillStyle = grad;
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const p of NEBULA_DUST) {
    const size = Math.max(0.4, p.size * radius);
    ctx.beginPath();
    ctx.fillStyle = `rgba(${colorRgb}, ${p.alpha})`;
    ctx.arc(cx + p.x * radius, cy + p.y * radius, size, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const s of NEBULA_SPARKS) {
    const sx = cx + s.dx * radius;
    const sy = cy + s.dy * radius;
    const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * 0.06);
    glow.addColorStop(0, "rgba(255,255,255,0.9)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.beginPath();
    ctx.fillStyle = glow;
    ctx.arc(sx, sy, radius * 0.06, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawCosmicObject(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  variant: CosmicObjectVariant,
) {
  if (radius < 1) return;
  const cfg = COSMIC_CONFIG[variant];
  switch (cfg.type) {
    case "galaxy":
      return drawGalaxy(ctx, cx, cy, radius, cfg.colorRgb);
    case "star":
      return drawStar(ctx, cx, cy, radius, cfg.colorRgb);
    case "constellation":
      return drawConstellation(ctx, cx, cy, radius, cfg.colorRgb);
    case "planet":
      return drawPlanet(ctx, cx, cy, radius, cfg.colorRgb);
    case "blackhole":
      return drawBlackHole(ctx, cx, cy, radius, cfg.colorRgb);
    case "nebula":
      return drawNebula(ctx, cx, cy, radius, cfg.colorRgb);
  }
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
      });
    }

    const warpZone = document.querySelector<HTMLElement>(".warp-zone");
    const warpLabel = document.querySelector<HTMLElement>(".warp-label");
    const cosmicSections = Array.from(document.querySelectorAll<HTMLElement>("[data-cosmic]"));

    function warpIntensity() {
      if (!warpZone || reducedMotion) return 0;
      const rect = warpZone.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return 0;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      return Math.sin(progress * Math.PI);
    }

    // Qué tan "llegado" estás a cada objeto: 0 cuando su sección está lejos
    // del centro de la pantalla, 1 cuando está perfectamente centrada.
    function activeCosmicObject(): { variant: CosmicObjectVariant; proximity: number } | null {
      if (reducedMotion || cosmicSections.length === 0) return null;
      let best: { variant: CosmicObjectVariant; proximity: number } | null = null;
      for (const el of cosmicSections) {
        const rect = el.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = H / 2;
        const dist = Math.abs(sectionCenter - viewportCenter);
        const raw = Math.max(0, Math.min(1, 1 - dist / (H * 0.9)));
        const eased = raw * raw * (3 - 2 * raw);
        if (!best || eased > best.proximity) {
          best = { variant: Number(el.dataset.cosmic) as CosmicObjectVariant, proximity: eased };
        }
      }
      return best;
    }

    function maxRadius() {
      return Math.hypot(W, H) * 0.65;
    }

    const lenis = reducedMotion ? null : new Lenis({ lerp: 0.1 });

    let rafId: number;
    function frame(t: number) {
      lenis?.raf(t);

      const scrollY = window.scrollY;
      const intensity = warpIntensity();
      if (warpLabel) warpLabel.style.opacity = intensity.toFixed(2);
      const active = activeCosmicObject();

      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = "#05060a";
      ctx!.fillRect(0, 0, W, H);

      for (const star of stars) {
        const speed = (0.12 + star.z * 0.9) * (1 + intensity * 6);
        let r = star.radius + scrollY * speed * 0.5;
        const mr = maxRadius();
        if (r > mr) {
          r = r % mr;
          star.angle = Math.random() * Math.PI * 2;
        }
        const dx = Math.cos(star.angle);
        const dy = Math.sin(star.angle) * 0.6;
        const x = cx + dx * r;
        const y = cy + dy * r;
        const size = 0.4 + star.z * 2.2;
        const flicker = 0.55 + 0.45 * Math.sin(t * 0.002 + star.twinkle);
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

      if (active && active.proximity > 0.01) {
        const cfg = COSMIC_CONFIG[active.variant];
        const radius = maxRadius() * 0.44 * cfg.sizeFactor * active.proximity;
        drawCosmicObject(ctx!, cx, cy, radius, active.variant);
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
