import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Deployments from "@/components/sections/Deployments";
import Projects from "@/components/sections/Projects/Projects";
import LeetCode from "@/components/sections/LeetCode";
import Contact from "@/components/sections/Contacts/Contact";

function PortfolioShell() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)]" data-testid="portfolio-page">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Deployments />
        <Projects />
        <LeetCode />
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioShell />
    </ThemeProvider>
  );
}
