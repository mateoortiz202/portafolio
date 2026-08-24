import type { Dictionary } from "./types";

export const en = {
  nav: {
    brand: "Mateo Ortiz López",
    langLabel: "Switch language",
  },
  hero: {
    marker: "01 / INTRO",
    name: "Mateo Ortiz López",
    role: "Backend Developer",
    tagline:
      "3 years building APIs and backend systems across different languages, with no attachment to a single stack — the goal is to solve the problem well.",
    scrollHint: "Scroll",
  },
  warp: {
    label: "Initiating hyperspace jump",
  },
  about: {
    marker: "02 / ABOUT",
    heading: "ADSI Technologist",
    badge: "SENASOFT 2022 · Winner",
    body: "I won the Full Development category at SENASOFT 2022, a competition that tested my ability to learn and solve problems under pressure. I'm self-taught and persistent: when I don't know something, I learn it; once I learn it, I like to share it. I care about technology that improves people's lives, and I see programming as a tool to build solutions with real impact.",
    traits: ["Self-taught", "Problem solving", "Persistent", "Impact-driven"],
    thesis: "My favorite tool isn't a language: it's curiosity.",
  },
  stack: {
    marker: "03 / STACK",
    heading: "Polyglot backend",
    body: "No single flagship language — the same care in every stack.",
    items: ["TypeScript", "Python", "Rust", "MongoDB", "NestJS", "Django", "Java · Spring Boot", "Node.js"],
    // TODO(Mateo): draft — confirm or correct each one before publishing.
    descriptions: [
      "My go-to language for backend APIs — strong typing, fast to iterate on.",
      "Automation and integrations on top of enterprise platforms (Odoo).",
      "For systems where performance and memory safety aren't negotiable.",
      "Flexible data modeling for APIs that evolve quickly.",
      "My default framework for building robust backend APIs.",
      "For APIs and admin panels that need to ship fast and stay well-structured.",
      "Enterprise backend in environments where stability comes first.",
      "The base underneath almost everything above — the common runtime for TypeScript and JavaScript.",
    ],
  },
  experience: {
    marker: "04 / EXPERIENCE",
    heading: "3 years building backend systems",
    body: "Senior Backend at a software development company, leading part of the Backend team and building robust, scalable APIs. Before that, experience as a Fullstack JavaScript developer with React. I also currently work with Python on implementation and customization projects on enterprise platforms.",
    epmMention: "One of those projects involved direct work with EPM as a client.",
  },
  projects: {
    marker: "05 / PROJECTS",
    heading: "Projects",
  },
  contact: {
    marker: "05 / CONTACT",
    heading: "Let's talk",
    body: "I'm comfortable in my current role, but open to hearing about interesting opportunities, new challenges, or just exchanging ideas.",
  },
  footer: {
    text: "Designed and built by Mateo Ortiz López",
  },
} satisfies Dictionary;
