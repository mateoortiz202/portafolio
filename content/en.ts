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
    items: [
      "TypeScript",
      "NestJS",
      "Python",
      "Django",
      "Rust",
      "MongoDB",
      "PostgreSQL",
      "Java · Spring Boot",
      "Node.js",
    ],
    // TODO(Mateo): draft — confirm or correct each one before publishing.
    descriptions: [
      "My go-to language for backend APIs — strong typing, fast, and scalable.",
      "My default framework for building robust backend APIs.",
      "Readable and versatile — my tool for automation, scripting, and quick prototypes.",
      "For APIs and admin panels that need to ship fast and stay well-structured.",
      "For systems where performance and memory safety aren't negotiable.",
      "Flexible data modeling for APIs that evolve quickly.",
      "My go-to relational database when the data model calls for structure and strong consistency.",
      "Enterprise backend in environments where stability comes first.",
      "Non-blocking and event-driven — the runtime behind my APIs in production.",
    ],
  },
  experience: {
    marker: "04 / EXPERIENCE",
    heading: "+3 years building backend systems",
    body: "Senior Backend at my current company — I joined as semi-senior and was promoted in under a year. Before that, I led a backend team with TypeScript and NestJS from my first months in the field, and picked up additional experience with Python at another company. Today I build robust, scale-minded APIs, owning technical decisions end to end.",
    epmMention: "One of those projects involved direct work with EPM as a client.",
    stageLabel: "STAGE",
    stops: [
      {
        role: "NestJS + Team Lead",
        duration: "1 year 3 months",
        blurb: "First backend role, leading part of the team from the start.",
      },
      {
        role: "Backend with Python",
        duration: "~1 year",
        blurb: "Additional experience at another company.",
      },
      {
        role: "Senior Backend — current",
        duration: "+1 year, ongoing",
        blurb: "Promoted from semi-senior in under a year. Still here.",
      },
    ],
  },
  projects: {
    marker: "05 / PROJECTS",
    heading: "Projects",
  },
  contact: {
    marker: "05 / CONTACT",
    heading: "Let's talk",
    body: "Looking for my next challenge. If you have a role, a project, or just want to connect, reach out.",
  },
  footer: {
    text: "Designed and built by Mateo Ortiz López",
  },
} satisfies Dictionary;
