"use client";

import { useLocale } from "@/content/LocaleContext";
import { CONTACT } from "@/lib/contact";
import RevealSection from "./RevealSection";

export default function Contact() {
  const { t } = useLocale();

  return (
    <RevealSection reverse={true} glow={3}>
      <div className="marker">{t.contact.marker}</div>
      <h2>{t.contact.heading}</h2>
      <p className="body-text">{t.contact.body}</p>
      <div className="tag-row">
        <a className="tag" href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
        </a>
        <a className="tag" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="tag" href={CONTACT.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </RevealSection>
  );
}
