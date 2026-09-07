"use client";

import { useLocale } from "@/content/LocaleContext";
import RevealSection from "./RevealSection";
import StackConstellation from "./StackConstellation";
import TechIcon from "./TechIcon";
import styles from "./Stack.module.css";

export default function Stack() {
  const { t } = useLocale();
  const number = t.stack.marker.split(" ")[0];

  return (
    <RevealSection
      reverse={true}
      glow={1}
      aux={<StackConstellation items={t.stack.items} descriptions={t.stack.descriptions} />}
    >
      <span className="stack-watermark" aria-hidden="true">
        {number}
      </span>
      <div className="marker">{t.stack.marker}</div>
      <h2>{t.stack.heading}</h2>
      <p className="body-text">{t.stack.body}</p>
      <div className={styles.stackGrid}>
        {t.stack.items.map((item, i) => (
          <div className={`${styles.stackTile} tile-${i + 1}`} key={item}>
            <TechIcon name={item} />
            {item.toUpperCase()}
            {/* Solo visible en móvil (ver Stack.module.css) — en escritorio esta
                descripción se revela al pasar el mouse sobre la constelación
                (StackConstellation.tsx), que en móvil queda oculta. */}
            <span className={styles.stackDesc}>{t.stack.descriptions[i]}</span>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
