"use client";

import { useLocale } from "@/content/LocaleContext";

export default function Footer() {
  const { t } = useLocale();

  return <footer>{t.footer.text}</footer>;
}
