import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import FeaturedProjects from "./components/FeaturedProjects";
import Contact from "./components/Contact";
import SocialBar from "./components/SocialBar";
import MouseGlow from "./components/MouseGlow";
import LangToggle from "./components/LangToggle";
import ParallaxSection from "./components/ParallaxSection";

export default function Home() {
  return (
    <div className="bg-black text-white">
      <MouseGlow />
      <SocialBar />
      <LangToggle />
      <Hero />
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent my-12 md:my-0" />
      <ParallaxSection>
        <About />
      </ParallaxSection>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent my-12 md:my-0" />
      <ParallaxSection>
        <Experience />
      </ParallaxSection>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent my-12 md:my-0" />
      <ParallaxSection>
        <Skills />
      </ParallaxSection>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent my-12 md:my-0" />
      <ParallaxSection>
        <FeaturedProjects />
      </ParallaxSection>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent my-12 md:my-0" />
      <ParallaxSection>
        <Contact />
      </ParallaxSection>
    </div>
  );
}
