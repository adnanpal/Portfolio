import { ThemeProvider } from "./context/ThemeContext";
import NavBar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects/Projects";
import Contact from "./components/sections/Contacts/Contact";
 
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=DM+Mono:wght@400;500&display=swap');
 
  *, *::before, *::after { box-sizing: border-box; }
  * { font-family: 'Sora', sans-serif; }
  .font-mono { font-family: 'DM Mono', monospace !important; }
 
  /* ── DARK THEME (default) ── */
  :root, [data-theme="dark"] {
    --bg:          #0A0A0F;
    --bg-card:     rgba(61,58,74,0.2);
    --border:      rgba(61,58,74,0.4);
    --border-hover:rgba(130,0,246,0.4);
    --text:        #F0EDF6;
    --text-muted:  rgba(240,237,246,0.55);
    --text-dim:    rgba(240,237,246,0.30);
    --accent:      #8200F6;
    --accent-hover:#9B1EFF;
    --accent-soft: rgba(130,0,246,0.10);
    --lavender:    #C084FC;
    --grid-line:   rgba(130,0,246,0.03);
    --terminal-bg: rgba(61,58,74,0.20);
    --terminal-border: rgba(61,58,74,0.40);
    --input-bg:    rgba(61,58,74,0.20);
    --input-border:rgba(61,58,74,0.50);
  }
 
  /* ── LIGHT THEME ── */
  [data-theme="light"] {
    --bg:          #FAFAFA;
    --bg-card:     rgba(255,255,255,0.80);
    --border:      rgba(0,0,0,0.10);
    --border-hover:rgba(130,0,246,0.35);
    --text:        #0A0A0F;
    --text-muted:  rgba(10,10,15,0.55);
    --text-dim:    rgba(10,10,15,0.35);
    --accent:      #7000D4;
    --accent-hover:#8200F6;
    --accent-soft: rgba(112,0,212,0.08);
    --lavender:    #6D28D9;
    --grid-line:   rgba(112,0,212,0.04);
    --terminal-bg: rgba(245,245,250,1);
    --terminal-border: rgba(0,0,0,0.10);
    --input-bg:    rgba(0,0,0,0.03);
    --input-border:rgba(0,0,0,0.12);
  }
 
  body {
    background-color: var(--bg);
    color: var(--text);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
 
  /* Smooth transition on ALL themed elements */
  *, *::before, *::after {
    transition-property: background-color, border-color, color, box-shadow;
    transition-duration: 0.25s;
    transition-timing-function: ease;
  }
`;
 
function AppShell() {
  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: "var(--bg)" }}>
      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
 
export default function App() {
  return (
    <ThemeProvider>
      <style>{GLOBAL_STYLES}</style>
      <AppShell />
    </ThemeProvider>
  );
}