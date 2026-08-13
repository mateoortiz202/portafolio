"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { es } from "./es";
import { en } from "./en";
import type { Dictionary } from "./types";

type Locale = "es" | "en";

const dictionaries: Record<Locale, Dictionary> = { es, en };

interface LocaleContextValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    // One-time sync from localStorage on mount: the server/export always renders "es"
    // (documented trade-off in the design spec), then the client corrects it if "en" was saved.
    const stored = window.localStorage.getItem("locale");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "en" || stored === "es") setLocaleState(stored);
  }, []);

  function setLocale(next: Locale) {
    setLocaleState(next);
    window.localStorage.setItem("locale", next);
  }

  return (
    <LocaleContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
