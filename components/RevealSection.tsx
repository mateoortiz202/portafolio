import type { ReactNode } from "react";

interface RevealSectionProps {
  children: ReactNode;
  reverse?: boolean;
  glow: number;
}

// La revelación del contenido (opacidad + escala) no se dispara por umbral:
// Starfield.tsx la actualiza cada frame atada directamente al scroll, igual
// que el salto a hipervelocidad — por eso este componente no necesita estado
// ni observadores propios, solo marcar la sección para que Starfield la encuentre.
export default function RevealSection({ children, reverse = false, glow }: RevealSectionProps) {
  return (
    <section
      className={`sec sec-split${reverse ? " reverse" : ""}`}
      data-glow={glow}
      data-glow-side={reverse ? "left" : "right"}
    >
      <div className="sec-content">{children}</div>
    </section>
  );
}
