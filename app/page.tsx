import Starfield from "@/components/Starfield";
import CosmicPhoto from "@/components/CosmicPhoto";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScrollHint from "@/components/ScrollHint";
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
      <CosmicPhoto />
      <Nav />
      <Hero />
      <ScrollHint />
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
