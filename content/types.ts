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
    body: string;
    traits: string[];
  };
  stack: {
    marker: string;
    heading: string;
    body: string;
    items: string[];
  };
  experience: {
    marker: string;
    heading: string;
    body: string;
    epmMention: string;
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
