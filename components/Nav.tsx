"use client";

import { useLocale } from "@/content/LocaleContext";
import LangSwitcher from "./LangSwitcher";

export default function Nav() {
  const { t } = useLocale();

  return (
    <nav className="nav">
      <span>{t.nav.brand}</span>
      <LangSwitcher />
    </nav>
  );
}
