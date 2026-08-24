export interface Dictionary {
  nav: {
    brand: string;
    langLabel: string;
  };
  hero: {
    marker: string;
    name: string;
    role: string;
    tagline: string;
    scrollHint: string;
  };
  warp: {
    label: string;
  };
  about: {
    marker: string;
    heading: string;
    badge: string;
    body: string;
    traits: string[];
    thesis: string;
  };
  stack: {
    marker: string;
    heading: string;
    body: string;
    items: string[];
    // Mismo índice que `items` — descripción corta para la ficha de la
    // constelación (ver StackConstellation.tsx).
    descriptions: string[];
  };
  experience: {
    marker: string;
    heading: string;
    body: string;
    epmMention: string;
    // Las 3 etapas reales del camino interactivo (ver ExperiencePath.tsx),
    // en orden cronológico.
    stops: { role: string; duration: string; blurb: string }[];
  };
  projects: {
    marker: string;
    heading: string;
  };
  contact: {
    marker: string;
    heading: string;
    body: string;
  };
  footer: {
    text: string;
  };
}
