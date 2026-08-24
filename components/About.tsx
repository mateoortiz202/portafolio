"use client";

import { useLocale } from "@/content/LocaleContext";
import RevealSection from "./RevealSection";

export default function About() {
  const { t } = useLocale();
  const number = t.about.marker.split(" ")[0];

  return (
    <RevealSection
      reverse={false}
      glow={0}
      aux={
        <div className="thesis">
          <p>{t.about.thesis}</p>
          <div className="rule" aria-hidden="true" />
        </div>
      }
    >
      <span className="about-watermark" aria-hidden="true">
        {number}
      </span>
      <div className="marker">{t.about.marker}</div>
      <div className="badge">
        <span className="dot" aria-hidden="true" />
        {t.about.badge}
      </div>
      <h2>{t.about.heading}</h2>
      <p className="body-text about-body-text">{t.about.body}</p>
      <div className="tag-row">
        {t.about.traits.map((trait) => (
          <span className="tag about-tag" key={trait}>
            {trait}
          </span>
        ))}
      </div>
    </RevealSection>
  );
}
