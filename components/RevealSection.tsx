"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import type { CosmicObjectVariant } from "@/lib/cosmicObjects";

interface RevealSectionProps {
  children: ReactNode;
  reverse?: boolean;
  cosmic: CosmicObjectVariant;
}

export default function RevealSection({ children, reverse = false, cosmic }: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`sec sec-split${reverse ? " reverse" : ""}`}
      data-cosmic={cosmic}
    >
      <div className="sec-content">
        {Children.map(children, (child, i) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<{ style?: CSSProperties }>, {
                style: { "--i": i } as CSSProperties,
              })
            : child,
        )}
      </div>
    </section>
  );
}
