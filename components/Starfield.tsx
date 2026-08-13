"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { STAR_COUNT_DESKTOP, STAR_COUNT_MOBILE, MOBILE_BREAKPOINT } from "@/lib/config";

interface Star {
  angle: number;
  radius: number;
  z: number;
  twinkle: number;
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

    function warpIntensity() {
      if (!warpZone || reducedMotion) return 0;
      const rect = warpZone.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return 0;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      return Math.sin(progress * Math.PI);
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
