"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/content/LocaleContext";

export default function ScrollHint() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLocale();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onScroll() {
      el!.style.opacity = window.scrollY > 80 ? "0" : "1";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="scroll-hint">
      <span className="scroll-hint-text">{t.hero.scrollHint}</span>
      <span className="scroll-hint-chevron" />
    </div>
  );
}
