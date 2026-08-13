"use client";

import { useLocale } from "@/content/LocaleContext";

export default function WarpZone() {
  const { t } = useLocale();

  return (
    <div className="warp-zone">
      <div className="pin">
        <div className="warp-label">{t.warp.label}</div>
      </div>
    </div>
  );
}
