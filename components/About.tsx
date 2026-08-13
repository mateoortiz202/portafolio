"use client";

import { useLocale } from "@/content/LocaleContext";
import RevealSection from "./RevealSection";

export default function About() {
  const { t } = useLocale();

  return (
    <RevealSection>
      <div className="marker">{t.about.marker}</div>
      <h2>{t.about.heading}</h2>
      <p className="body-text">{t.about.body}</p>
      <div className="tag-row">
        {t.about.traits.map((trait) => (
          <span className="tag" key={trait}>
            {trait}
          </span>
        ))}
      </div>
    </RevealSection>
  );
}
