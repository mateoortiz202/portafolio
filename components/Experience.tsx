"use client";

import { useLocale } from "@/content/LocaleContext";
import ExperiencePath from "./ExperiencePath";
import RevealSection from "./RevealSection";

export default function Experience() {
  const { t } = useLocale();

  return (
    <RevealSection reverse={false} glow={2}>
      <ExperiencePath
        marker={t.experience.marker}
        heading={t.experience.heading}
        body={t.experience.body}
        stageLabel={t.experience.stageLabel}
        stops={t.experience.stops}
      />
    </RevealSection>
  );
}
