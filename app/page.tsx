import Starfield from "@/components/Starfield";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WarpZone from "@/components/WarpZone";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SHOW_PROJECTS } from "@/lib/config";

export default function Home() {
  return (
    <>
      <Starfield />
      <Nav />
      <Hero />
      <WarpZone />
      <About />
      <Stack />
      <Experience />
      {SHOW_PROJECTS && <Projects />}
      <Contact />
      <Footer />
    </>
  );
}
