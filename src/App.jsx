import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";
import { Footer } from "./layout/Footer";
import { Achievements } from "./sections/Achievements";
import { TechStack } from "./sections/TechStack";
function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <About />
        <Projects />
        <Achievements />
        <Experience />
        
        
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
