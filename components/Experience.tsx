"use client";

import { useLocale } from "@/content/LocaleContext";
import { SHOW_EPM_MENTION } from "@/lib/config";
import RevealSection from "./RevealSection";

export default function Experience() {
  const { t } = useLocale();

  return (
    <RevealSection>
      <div className="marker">{t.experience.marker}</div>
      <h2>{t.experience.heading}</h2>
      <p className="body-text">{t.experience.body}</p>
      {SHOW_EPM_MENTION && <p className="body-text">{t.experience.epmMention}</p>}
    </RevealSection>
  );
}
