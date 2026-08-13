"use client";

import { useLocale } from "@/content/LocaleContext";

export default function LangSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <button
      type="button"
      className="accent"
      aria-label={t.nav.langLabel}
      onClick={() => setLocale(locale === "es" ? "en" : "es")}
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
