"use client";

import { useLocale } from "@/content/LocaleContext";
import { SHOW_EPM_MENTION } from "@/lib/config";
import ExperiencePath from "./ExperiencePath";
import RevealSection from "./RevealSection";

export default function Experience() {
  const { t } = useLocale();
  const number = t.experience.marker.split(" ")[0];

  return (
    <RevealSection reverse={false} glow={2} aux={<ExperiencePath stops={t.experience.stops} />}>
      <span className="exp-watermark" aria-hidden="true">
        {number}
      </span>
      <div className="marker">{t.experience.marker}</div>
      <h2>{t.experience.heading}</h2>
      <p className="body-text">{t.experience.body}</p>
      {SHOW_EPM_MENTION && <p className="body-text">{t.experience.epmMention}</p>}
    </RevealSection>
  );
}
