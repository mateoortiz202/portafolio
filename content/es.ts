import type { Dictionary } from "./types";

export const es = {
  nav: {
    brand: "Mateo Ortiz López",
    langLabel: "Cambiar idioma",
  },
  hero: {
    marker: "01 / INICIO",
    name: "Mateo Ortiz López",
    role: "Backend Developer",
    tagline:
      "3 años construyendo APIs y sistemas backend en distintos lenguajes, sin apego a un único stack — el objetivo es resolver bien el problema.",
    scrollHint: "Desplázate",
  },
  warp: {
    label: "Iniciando salto a hipervelocidad",
  },
  about: {
    marker: "02 / SOBRE MÍ",
    heading: "Tecnólogo ADSI",
    badge: "SENASOFT 2022 · Ganador",
    body: "Gané la categoría Desarrollo Integral en SENASOFT 2022, una competencia que puso a prueba mi capacidad de aprender y resolver problemas bajo presión. Soy autodidacta y perseverante: cuando algo no lo sé, lo aprendo; cuando lo aprendo, me gusta compartirlo. Me interesa la tecnología que mejora la vida de las personas, y veo la programación como una herramienta para construir soluciones con impacto real.",
    traits: ["Autodidacta", "Resolución de problemas", "Perseverante", "Orientado a impacto"],
    thesis: "Mi herramienta favorita no es un lenguaje: es la curiosidad.",
  },
  stack: {
    marker: "03 / STACK",
    heading: "Backend poliglota",
    body: "Sin un lenguaje insignia único — el mismo cuidado en cada stack.",
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
    // TODO(Mateo): borrador — confirma o corrige cada una antes de publicar.
    descriptions: [
      "Mi lenguaje de cabecera para APIs backend — tipado fuerte, rápido y escalable.",
      "Mi framework por defecto para construir APIs backend robustas.",
      "Legible y versátil — mi herramienta para automatización, scripting y prototipos rápidos.",
      "Para APIs y paneles administrativos que necesitan salir rápido y bien estructurados.",
      "Para sistemas donde el rendimiento y la seguridad de memoria no son negociables.",
      "Modelado de datos flexible para APIs que evolucionan rápido.",
      "Mi base relacional de referencia cuando el modelo de datos pide estructura y consistencia fuerte.",
      "Backend empresarial en entornos donde la estabilidad manda.",
      "No bloqueante y basado en eventos — el runtime detrás de mis APIs en producción.",
    ],
  },
  experience: {
    marker: "04 / EXPERIENCIA",
    heading: "3 años construyendo backend",
    body: "Senior Backend en una empresa de desarrollo de software, liderando parte del equipo Backend y construyendo APIs robustas y escalables. Antes de eso, experiencia como Fullstack JavaScript con React. Actualmente también trabajo con Python en proyectos de implementación y personalización sobre plataformas empresariales.",
    epmMention: "Uno de esos proyectos incluyó trabajo directo con EPM como cliente.",
  },
  projects: {
    marker: "05 / PROYECTOS",
    heading: "Proyectos",
  },
  contact: {
    marker: "05 / CONTACTO",
    heading: "Hablemos",
    body: "Estoy cómodo en mi rol actual, pero abierto a conversar sobre oportunidades interesantes, nuevos retos o simplemente intercambiar ideas.",
  },
  footer: {
    text: "Diseñado y construido por Mateo Ortiz López",
  },
} satisfies Dictionary;
