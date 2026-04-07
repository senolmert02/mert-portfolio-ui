import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import FeaturedProjects from "./components/FeaturedProjects";
import Contact from "./components/Contact";
import SocialBar from "./components/SocialBar";
import MouseGlow from "./components/MouseGlow";
import LangToggle from "./components/LangToggle";

export default function Home() {
  return (
    <div className="bg-black text-white">
      <MouseGlow />
      <SocialBar />
      <LangToggle />
      <Hero />
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      <About />
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      <Experience />
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      <Skills />
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      <FeaturedProjects />
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      <Contact />
    </div>
  );
}
