"use client";

import { useLocale } from "@/content/LocaleContext";
import RevealSection from "./RevealSection";
import styles from "./Stack.module.css";

export default function Stack() {
  const { t } = useLocale();

  return (
    <RevealSection>
      <div className="marker">{t.stack.marker}</div>
      <h2>{t.stack.heading}</h2>
      <p className="body-text">{t.stack.body}</p>
      <div className={styles.stackGrid}>
        {t.stack.items.map((item) => (
          <div className={styles.stackTile} key={item}>
            {item.toUpperCase()}
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
