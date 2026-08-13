"use client";

import { useLocale } from "@/content/LocaleContext";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="sec" data-cosmic={0}>
      <div className="marker">{t.hero.marker}</div>
      <h1>{t.hero.name}</h1>
      <p className="role">{t.hero.role}</p>
      <p className="body-text">{t.hero.tagline}</p>
    </section>
  );
}
