"use client";

import { useLocale } from "@/content/LocaleContext";
import RevealSection from "./RevealSection";
import styles from "./Projects.module.css";

// Placeholder hasta que haya proyectos reales que mostrar — ver SHOW_PROJECTS en lib/config.ts.
const PLACEHOLDER_COUNT = 3;

export default function Projects() {
  const { t, locale } = useLocale();
  const comingSoon = locale === "es" ? "Próximamente" : "Coming soon";

  return (
    <RevealSection reverse={false} glow={4}>
      <div className="marker">{t.projects.marker}</div>
      <h2>{t.projects.heading}</h2>
      <div className={styles.grid}>
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <div className={styles.tile} key={i}>
            <div className={styles.overlay}>
              <span className={styles.overlayText}>{comingSoon}</span>
            </div>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
