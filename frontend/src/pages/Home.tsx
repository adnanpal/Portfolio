import { AnimatePresence, motion } from "motion/react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { toast } from "sonner";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Copy,
  Database,
  Download,
  ExternalLink,
  Github,
  Globe2,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Server,
  Sparkles,
  Sun,
  Terminal,
  Wrench,
  X,
} from "@/lib/lucide-react";
import { Toaster } from "@/components/ui/sonner";

type Project = {
  number: string;
  name: string;
  status: "In Progress" | "Completed";
  description: string;
  stack: string[];
  repo?: string;
  demo?: string;
  tone: string;
};

const navItems = [
  ["01", "About", "about"],
  ["02", "Skills", "skills"],
  ["03", "Deployments", "deployments"],
  ["04", "Projects", "projects"],
  ["05", "Contact", "contact"],
] as const;

const skillGroups = [
  { title: "Frontend", icon: Code2, skills: ["React", "Tailwind CSS", "JavaScript", "HTML/CSS"] },
  { title: "Backend", icon: Server, skills: ["Node.js", "Express", "Socket.io"] },
  { title: "Database", icon: Database, skills: ["MongoDB", "MySQL", "Mongoose"] },
  { title: "Tools", icon: Wrench, skills: ["Git", "VS Code", "Figma", "Python", "Java"] },
] as const;

const deployments = [
  {
    key: "aws",
    name: "AWS",
    eyebrow: "01 / CLOUD INFRASTRUCTURE",
    description: "Composable infrastructure for apps that need room to grow.",
    services: ["S3 + CloudFront", "EC2 compute", "IAM permissions"],
    log: ["s3://portfolio-assets synced", "cloudfront distribution ready", "iam policy checked"],
    icon: Cloud,
  },
  {
    key: "vercel",
    name: "Vercel",
    eyebrow: "02 / EDGE DELIVERY",
    description: "Fast, frictionless shipping from a clean Git workflow.",
    services: ["Edge network", "Git deployments", "Serverless functions"],
    log: ["production branch detected", "preview deployment created", "edge cache warmed"],
    icon: Globe2,
  },
  {
    key: "render",
    name: "Render",
    eyebrow: "03 / SERVICE HOSTING",
    description: "Straightforward hosting for APIs, workers, and data services.",
    services: ["Node.js services", "PostgreSQL hosting", "Background workers"],
    log: ["build command completed", "service health check passed", "worker listening on :8000"],
    icon: Activity,
  },
] as const;

const projects: Project[] = [
  {
    number: "01",
    name: "Arcane",
    status: "In Progress",
    description: "A real-time chat app inspired by Discord, shaped around fluid conversations and a glassmorphism UI.",
    stack: ["React", "Socket.io", "Tailwind", "Node"],
    repo: "https://github.com/adnanpal/Arcane",
    tone: "from-neutral-100 via-white to-neutral-300",
  },
  {
    number: "02",
    name: "BuildNet",
    status: "Completed",
    description: "A professional networking platform for builders to connect, share projects, and collaborate.",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    repo: "https://github.com/adnanpal/buildnet",
    demo: "https://build-net.online/",
    tone: "from-zinc-200 via-white to-zinc-400",
  },
  {
    number: "03",
    name: "Trading Website",
    status: "Completed",
    description: "A stock market simulator with real-time price animations, portfolio tracking, and trade history.",
    stack: ["React", "JavaScript", "CSS"],
    repo: "https://github.com/adnanpal/College-projects/tree/main/trading-website",
    demo: "https://trading-website-nullcass.netlify.app/",
    tone: "from-neutral-300 via-white to-neutral-100",
  },
  {
    number: "04",
    name: "AI Website Builder",
    status: "Completed",
    description: "A Laravel mini-app with Sanctum auth, CRUD, AI-mocked generation, caching, and history.",
    stack: ["PHP", "Laravel", "MySQL", "Sanctum"],
    tone: "from-zinc-100 via-neutral-200 to-white",
  },
  {
    number: "05",
    name: "Notes Manager",
    status: "Completed",
    description: "A Java desktop app using Hibernate for persistent notes, tagging, and full-text search.",
    stack: ["Java", "Hibernate", "MySQL"],
    repo: "https://github.com/adnanpal/College-projects/tree/main/notesManager",
    tone: "from-white via-neutral-200 to-zinc-300",
  },
  {
    number: "06",
    name: "Data Structure Visualizer",
    status: "Completed",
    description: "An interactive Python visualizer for trees, graphs, stacks, and queues.",
    stack: ["Python", "Tkinter"],
    repo: "https://github.com/adnanpal/College-projects/blob/main/Data-Structure%20Visualizer.py",
    tone: "from-neutral-200 via-white to-neutral-300",
  },
];

const leetcodeStats = [
  { level: "Easy", count: 28, percentage: 45 },
  { level: "Medium", count: 31, percentage: 50 },
  { level: "Hard", count: 3, percentage: 5 },
] as const;

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
} as const;

const heroTitle = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.14, delayChildren: 0.1 } },
} as const;

const heroWord = {
  hidden: { opacity: 0, y: 46, rotateX: -82 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.72, ease: "easeOut" } },
} as const;

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500" data-testid={`section-label-${children.toLowerCase()}`}>
      <span className="inline-flex h-7 min-w-7 items-center justify-center border border-black bg-black px-1 text-[10px] text-white" data-testid={`section-number-${number}`}>
        {number}
      </span>
      <span data-testid={`section-label-text-${children.toLowerCase()}`}>{children}</span>
    </div>
  );
}

function ArrowLink({ href, children, testId, external = false }: { href: string; children: string; testId: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group inline-flex items-center gap-2 border-b border-black pb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-[gap,color] duration-200 hover:gap-3 hover:text-neutral-500"
      data-testid={testId}
    >
      <span>{children}</span>
      <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
    </a>
  );
}

function AnimatedLeetCodeStat({ level, count, percentage, index }: { level: string; count: number; percentage: number; index: number }) {
  const statRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statRef, { once: true, amount: 0.55 });
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    let frameId = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 850, 1);
      setDisplayCount(Math.round(progress * count));
      if (progress < 1) frameId = window.requestAnimationFrame(tick);
    };
    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [count, isInView]);

  return (
    <div ref={statRef} data-testid={`leetcode-${level.toLowerCase()}-stat`}>
      <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em]"><span>{level}</span><span className="text-neutral-400">{percentage}%</span></div>
      <div className="h-1 bg-white/20 dark:bg-black/15" role="progressbar" aria-label={`${level} solved percentage`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={isInView ? percentage : 0} data-testid={`leetcode-${level.toLowerCase()}-progress`}>
        <motion.div initial={{ width: 0 }} animate={{ width: isInView ? `${percentage}%` : 0 }} transition={{ duration: 0.9, delay: index * 0.12, ease: "easeOut" }} className="h-1 bg-white dark:bg-black" />
      </div>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ duration: 0.35, delay: index * 0.12 }} className="mt-3 font-heading text-3xl font-bold" data-testid={`leetcode-${level.toLowerCase()}-count`}>{displayCount}</motion.p>
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const [activeDeployment, setActiveDeployment] = useState("aws");
  const [copied, setCopied] = useState(false);
  const deployment = deployments.find((item) => item.key === activeDeployment) ?? deployments[0];

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("paladnan70930@gmail.com");
      setCopied(true);
      toast.success("Email copied to clipboard");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy is unavailable — use the email link instead");
    }
  };

  const handleSectionNavigation = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (!target) return;
    setMobileOpen(false);
    window.history.pushState(null, "", `#${sectionId}`);
    const targetTop = target.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-black transition-colors duration-500 dark:bg-[#09090b] dark:text-white" data-testid="portfolio-page">
      <Toaster />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#09090b]/90" data-testid="site-header">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
          <a href="#top" onClick={(event) => handleSectionNavigation(event, "top")} className="group flex items-center gap-3" data-testid="nav-logo-link">
            <span className="flex h-9 w-9 items-center justify-center bg-black font-mono text-xs font-bold text-white transition-transform duration-200 group-hover:rotate-6 dark:bg-white dark:text-black">AP</span>
            <span className="font-heading text-sm font-bold tracking-[-0.04em]" data-testid="nav-logo-text">ADNAN.PAL</span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation" data-testid="desktop-navigation">
            {navItems.map(([number, label, href]) => (
              <a key={href} href={`#${href}`} onClick={(event) => handleSectionNavigation(event, href)} className="group flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500 transition-colors duration-200 hover:text-black dark:hover:text-white" data-testid={`nav-${href}-link`}>
                <span className="text-[9px] text-neutral-400">{number}</span>
                <span>{label}</span>
              </a>
            ))}
            <a href="mailto:paladnan70930@gmail.com?subject=Hiring%20Inquiry" className="bg-black px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-[background,transform] duration-200 hover:-translate-y-0.5 hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200" data-testid="nav-hire-me-button">Hire me</a>
          </nav>

          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center border border-black/15 transition-[background,transform] duration-200 hover:-translate-y-0.5 hover:bg-neutral-100 dark:border-white/20 dark:hover:bg-white/10" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} data-testid="theme-toggle-button">
              {dark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            </button>
            <button type="button" onClick={() => setMobileOpen((open) => !open)} className="flex h-9 w-9 items-center justify-center border border-black/15 lg:hidden dark:border-white/20" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} data-testid="mobile-navigation-toggle">
              {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-black/10 bg-white px-4 py-4 dark:border-white/10 dark:bg-[#09090b] lg:hidden" aria-label="Mobile navigation" data-testid="mobile-navigation">
              <div className="grid gap-1">
                {navItems.map(([number, label, href]) => (
                  <a key={href} href={`#${href}`} onClick={(event) => handleSectionNavigation(event, href)} className="flex items-center justify-between border-b border-black/10 py-3 font-mono text-xs uppercase tracking-[0.16em] dark:border-white/10" data-testid={`mobile-nav-${href}-link`}>
                    <span><span className="mr-3 text-neutral-400">{number}</span>{label}</span><ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="top">
        <section className="relative mx-auto grid min-h-[720px] max-w-7xl items-end gap-10 px-4 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:pb-28 lg:pt-44" data-testid="hero-section">
          <div className="absolute left-4 top-28 h-px w-20 bg-black sm:left-8 lg:left-12 dark:bg-white" data-testid="hero-rule" />
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="relative">
            <motion.div variants={reveal} className="mb-8" data-testid="hero-kicker"><SectionLabel number="00" children="Portfolio.exe" /></motion.div>
            <motion.h1 variants={heroTitle} className="max-w-4xl [perspective:900px] font-heading text-[clamp(3.75rem,10vw,9.5rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.085em]" data-testid="hero-heading" aria-label="Hi, I'm Adnan Pal">
              {['Hi,', "I'm", "Adnan", "Pal"].map((word, index) => <motion.span key={word} className={`mr-[0.16em] inline-block ${index === 3 ? "bg-black px-[0.08em] text-white dark:bg-white dark:text-black" : ""}`} variants={heroWord} data-testid={`hero-word-${index + 1}`}>{word}</motion.span>)}
            </motion.h1>
            <motion.div variants={reveal} className="mt-10 flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-end" data-testid="hero-intro">
              <p className="max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300" data-testid="hero-description">Full-stack developer building real-world products, shipping clean interfaces, and obsessing over backend architecture.</p>
              <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500" data-testid="hero-location"><MapPin size={14} className="mb-2" aria-hidden="true" />Navi Mumbai<br />India</div>
            </motion.div>
            <motion.div variants={reveal} className="mt-10 flex flex-wrap items-center gap-5" data-testid="hero-actions">
              <a href="#projects" onClick={(event) => handleSectionNavigation(event, "projects")} className="inline-flex items-center gap-3 bg-black px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-[transform,background] duration-200 hover:-translate-y-1 hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200" data-testid="hero-view-projects-button">View projects <ArrowDownRight size={15} aria-hidden="true" /></a>
              <a href="mailto:paladnan70930@gmail.com?subject=Hiring%20Inquiry" className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-[gap,color] duration-200 hover:gap-3 hover:text-neutral-500" data-testid="hero-get-in-touch-link">Get in touch <ArrowUpRight size={15} aria-hidden="true" /></a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.35 }} className="relative lg:mb-1" data-testid="hero-terminal-card">
            <div className="absolute -right-2 -top-2 h-full w-full border border-black/20 dark:border-white/15" aria-hidden="true" />
            <div className="relative border border-black bg-[#f6f6f4] p-5 shadow-[8px_8px_0_#000] dark:border-white dark:bg-[#121215] dark:shadow-[8px_8px_0_#fff] sm:p-7">
              <div className="mb-10 flex items-center justify-between border-b border-black/15 pb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500 dark:border-white/15" data-testid="terminal-header"><span>~/adnan</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />online</span></div>
              <div className="space-y-5 font-mono text-xs leading-relaxed sm:text-sm" data-testid="terminal-content">
                <p><span className="mr-2 text-neutral-400">$</span><span className="text-neutral-500">init</span> portfolio.exe</p>
                <p className="pl-4 text-neutral-500">loading <span className="text-black dark:text-white">full-stack.dev</span> ... done</p>
                <p><span className="mr-2 text-neutral-400">$</span><span className="text-neutral-500">cat</span> adnan.json</p>
                <div className="border-l-2 border-black pl-4 text-neutral-600 dark:border-white dark:text-neutral-400" data-testid="terminal-profile-json">
                  <p><span className="text-black dark:text-white">name:</span> "Adnan Pal",</p>
                  <p><span className="text-black dark:text-white">role:</span> "Full-Stack Dev",</p>
                  <p><span className="text-black dark:text-white">focus:</span> [React, Node, AI/ML],</p>
                  <p><span className="text-black dark:text-white">status:</span> "Open to internships"</p>
                </div>
                <p className="pt-1"><span className="mr-2 text-neutral-400">$</span><span className="inline-block h-4 w-2 animate-pulse bg-black align-middle dark:bg-white" /></p>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section id="about" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} className="border-t border-black bg-black py-20 text-white dark:border-white dark:bg-white dark:text-black sm:py-28" data-testid="about-section">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 lg:px-12">
            <div><SectionLabel number="01" children="About" /><h2 className="mt-8 max-w-md font-heading text-5xl font-bold uppercase leading-[0.9] tracking-[-0.07em] sm:text-7xl" data-testid="about-heading">Code,<br />design,<br /><span className="text-neutral-500">repeat.</span></h2></div>
            <div className="max-w-2xl lg:pt-10"><p className="text-2xl leading-tight tracking-[-0.03em] sm:text-3xl" data-testid="about-lead">I build things that actually ship — from fluid React interfaces to real-time backends and systems that scale.</p><p className="mt-8 max-w-xl text-base leading-relaxed text-neutral-400 dark:text-neutral-600" data-testid="about-description">I'm a Computer Science student at Pillai College, Navi Mumbai (2023–2026). My flagship project, BuildNet, gave me hands-on experience with React, TypeScript, Node.js, authentication systems, REST APIs, and PostgreSQL. I'm currently looking for opportunities to apply these skills in real-world software development.</p><div className="mt-10 grid gap-4 border-t border-white/20 pt-6 dark:border-black/20 sm:grid-cols-2" data-testid="about-facts"><div className="flex items-start gap-3"><GraduationCap size={18} className="mt-0.5" aria-hidden="true" /><div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-600">Education</p><p className="mt-1 text-sm">B.Sc Computer Science · 2023–2026</p></div></div><div className="flex items-start gap-3"><BriefcaseBusiness size={18} className="mt-0.5" aria-hidden="true" /><div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-600">Availability</p><p className="mt-1 text-sm">Open to internships & freelance</p></div></div></div><div className="mt-10 flex flex-wrap gap-6"><ArrowLink href="mailto:paladnan70930@gmail.com?subject=Hiring%20Inquiry" testId="about-hire-me-link">Hire me</ArrowLink><a href="https://adnanpal-portfolio.vercel.app/AdnanPal_Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400 transition-colors hover:text-white dark:text-neutral-600 dark:hover:text-black" data-testid="about-resume-link">Resume <Download size={14} aria-hidden="true" /></a></div></div>
          </div>
        </motion.section>

        <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12" data-testid="skills-section">
          <div className="flex flex-col justify-between gap-5 border-b-2 border-black pb-6 dark:border-white sm:flex-row sm:items-end"><div><SectionLabel number="02" children="Skills" /><h2 className="mt-5 font-heading text-4xl font-bold uppercase tracking-[-0.06em] sm:text-6xl" data-testid="skills-heading">Tech stack</h2></div><p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-neutral-500" data-testid="skills-description">Tools for building useful things<br />from interface to infrastructure.</p></div>
          <div className="mt-8 grid border-l border-t border-black dark:border-white sm:grid-cols-2 lg:grid-cols-4" data-testid="skills-grid">{skillGroups.map(({ title, icon: Icon, skills }, groupIndex) => <motion.article key={title} whileHover={{ backgroundColor: "#f4f4f4" }} transition={{ duration: 0.2 }} className="border-b border-r border-black p-6 dark:border-white dark:hover:bg-[#121215] sm:p-7" data-testid={`skill-card-${title.toLowerCase()}`}><div className="flex items-center justify-between"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /><span className="font-mono text-[10px] text-neutral-400">0{groupIndex + 1}</span></div><h3 className="mt-12 font-heading text-2xl font-bold tracking-[-0.05em]" data-testid={`skill-group-${title.toLowerCase()}`}>{title}</h3><div className="mt-5 space-y-2">{skills.map((skill) => <div key={skill} className="flex items-center justify-between border-t border-black/10 pt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-neutral-600 dark:border-white/10 dark:text-neutral-400" data-testid={`skill-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}><span>{skill}</span><span className="text-neutral-400">↗</span></div>)}</div></motion.article>)}</div>
        </section>

        <section id="deployments" className="border-y border-black bg-[#f5f5f3] py-20 dark:border-white dark:bg-[#121215] sm:py-28" data-testid="deployments-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12"><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><SectionLabel number="03" children="Deployments" /><h2 className="mt-8 max-w-md font-heading text-5xl font-bold uppercase leading-[0.88] tracking-[-0.07em] sm:text-7xl" data-testid="deployments-heading">Ship it.<br /><span className="text-neutral-400">Scale it.</span></h2><p className="mt-7 max-w-sm text-base leading-relaxed text-neutral-600 dark:text-neutral-400" data-testid="deployments-description">A small toolkit for moving projects from local machine to a dependable public URL.</p><div className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500" data-testid="deployments-status"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Systems operational</div></div><div><div className="flex flex-wrap gap-2 border-b border-black/15 pb-5 dark:border-white/15" role="tablist" aria-label="Deployment platforms" data-testid="deployment-tabs">{deployments.map((item) => <button type="button" key={item.key} onClick={() => setActiveDeployment(item.key)} className={`border px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-[background,color,border] duration-200 ${activeDeployment === item.key ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black" : "border-black/20 text-neutral-500 hover:border-black hover:text-black dark:border-white/20 dark:hover:border-white dark:hover:text-white"}`} role="tab" aria-selected={activeDeployment === item.key} data-testid={`deployment-tab-${item.key}`}>{item.name}</button>)}</div><AnimatePresence mode="wait"><motion.div key={deployment.key} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.3 }} className="mt-7 border border-black bg-white p-6 dark:border-white dark:bg-[#09090b] sm:p-8" role="tabpanel" data-testid={`deployment-panel-${deployment.key}`}><div className="flex items-start justify-between gap-5"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500" data-testid="deployment-eyebrow">{deployment.eyebrow}</p><h3 className="mt-3 font-heading text-4xl font-bold tracking-[-0.06em]" data-testid="deployment-name">{deployment.name}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-400" data-testid="deployment-panel-description">{deployment.description}</p></div><deployment.icon size={34} strokeWidth={1.3} aria-hidden="true" /></div><div className="mt-9 grid gap-3 sm:grid-cols-3" data-testid="deployment-services">{deployment.services.map((service) => <div key={service} className="border-t-2 border-black pt-3 dark:border-white" data-testid={`deployment-service-${service.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}><p className="font-mono text-[10px] font-semibold uppercase leading-relaxed tracking-[0.1em]">{service}</p></div>)}</div><div className="mt-9 border-t border-black/10 pt-5 dark:border-white/10" data-testid="deployment-log"><div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500"><Terminal size={13} aria-hidden="true" /> deployment.log</div><div className="space-y-2 font-mono text-[11px] text-neutral-500">{deployment.log.map((line, index) => <p key={line}><span className="mr-3 text-emerald-600">0{index + 1}</span>{line}<Check size={12} className="ml-2 inline text-emerald-600" aria-hidden="true" /></p>)}</div></div></motion.div></AnimatePresence></div></div></div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12" data-testid="projects-section"><div className="flex flex-col justify-between gap-5 border-b-2 border-black pb-6 dark:border-white sm:flex-row sm:items-end"><div><SectionLabel number="04" children="Projects" /><h2 className="mt-5 font-heading text-4xl font-bold uppercase tracking-[-0.06em] sm:text-6xl" data-testid="projects-heading">Things I've built</h2></div><p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-neutral-500" data-testid="projects-description">Experiments, products,<br />and a lot of shipped code.</p></div><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="projects-grid">{projects.map((project, index) => <motion.article key={project.name} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }} variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: (index % 3) * 0.07 } } }} whileHover={{ y: -8 }} className="group relative overflow-hidden border border-black bg-white transition-shadow duration-300 hover:shadow-[7px_7px_0_#000] dark:border-white dark:bg-[#121215] dark:hover:shadow-[7px_7px_0_#fff]" data-testid={`project-card-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}><div className={`relative h-44 overflow-hidden bg-gradient-to-br ${project.tone} p-5 transition-transform duration-500 group-hover:scale-[1.03] dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-900`}><div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(135deg, transparent 45%, rgba(0,0,0,.24) 46%, transparent 47%), linear-gradient(45deg, transparent 45%, rgba(0,0,0,.18) 46%, transparent 47%)", backgroundSize: "28px 28px" }} /><div className="relative flex items-start justify-between"><span className="font-mono text-[11px] font-bold">/{project.number}</span><span className="flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]"><span className={`h-1.5 w-1.5 rounded-full ${project.status === "In Progress" ? "animate-pulse bg-amber-500" : "bg-emerald-600"}`} />{project.status}</span></div><div className="absolute bottom-5 left-5 font-heading text-5xl font-extrabold uppercase tracking-[-0.09em] text-black/80 dark:text-white/70">{project.name.split(" ")[0]}</div></div><div className="p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><h3 className="font-heading text-2xl font-bold tracking-[-0.06em]" data-testid={`project-title-${project.number}`}>{project.name}</h3><ArrowUpRight size={18} className="shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></div><p className="mt-4 min-h-[72px] text-sm leading-relaxed text-neutral-600 dark:text-neutral-400" data-testid={`project-description-${project.number}`}>{project.description}</p><div className="mt-5 flex flex-wrap gap-1.5" data-testid={`project-stack-${project.number}`}>{project.stack.map((tech) => <span key={tech} className="border border-black/15 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-neutral-500 dark:border-white/15" data-testid={`project-tag-${tech.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{tech}</span>)}</div><div className="mt-6 flex items-center gap-5 border-t border-black/10 pt-4 dark:border-white/10">{project.repo && <ArrowLink href={project.repo} children="Code" testId={`project-${project.number}-code-link`} external />}{project.demo && <ArrowLink href={project.demo} children="Live demo" testId={`project-${project.number}-demo-link`} external />}{!project.repo && !project.demo && <a href="mailto:paladnan70930@gmail.com?subject=AI%20Website%20Builder" className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500 hover:text-black dark:hover:text-white" data-testid={`project-${project.number}-ask-link`}>Ask about it</a>}</div></div></motion.article>)}</div></section>

        <section className="border-y border-black bg-black py-20 text-white dark:border-white dark:bg-white dark:text-black sm:py-24" data-testid="leetcode-section"><div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-12"><div><SectionLabel number="05" children="LeetCode" /><h2 className="mt-7 max-w-md font-heading text-5xl font-bold uppercase leading-[0.88] tracking-[-0.07em] sm:text-7xl" data-testid="leetcode-heading">Problems,<br /><span className="text-neutral-500">solved.</span></h2><p className="mt-7 max-w-sm text-sm leading-relaxed text-neutral-400 dark:text-neutral-600" data-testid="leetcode-description">Live problem-solving stats pulled straight from my LeetCode profile.</p><ArrowLink href="https://leetcode.com/u/paladnan70930/" children="View profile" testId="leetcode-profile-link" external /></div><div className="lg:pt-5"><div className="flex items-end justify-between border-b border-white/25 pb-6 dark:border-black/25"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-600" data-testid="leetcode-live-label">Live stats</p><p className="mt-3 font-heading text-8xl font-bold leading-none tracking-[-0.1em] sm:text-[10rem]" data-testid="leetcode-total">62</p><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-600">problems solved</p></div><Activity size={44} strokeWidth={1} className="mb-3 text-neutral-500" aria-hidden="true" /></div><div className="mt-7 grid gap-6 sm:grid-cols-3" data-testid="leetcode-breakdown">{leetcodeStats.map((stat, index) => <AnimatedLeetCodeStat key={stat.level} {...stat} index={index} />)}</div><p className="mt-9 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500" data-testid="leetcode-refresh-note"><Sparkles size={13} aria-hidden="true" /> Auto-refreshes every 5 min · syncs on return</p></div></div></section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12" data-testid="contact-section"><div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]"><div><SectionLabel number="06" children="Contact" /><h2 className="mt-7 max-w-lg font-heading text-5xl font-bold uppercase leading-[0.88] tracking-[-0.07em] sm:text-7xl" data-testid="contact-heading">Let's<br /><span className="text-neutral-400">connect.</span></h2><p className="mt-8 max-w-md text-lg leading-relaxed text-neutral-600 dark:text-neutral-400" data-testid="contact-description">Open to internship roles, freelance projects, and interesting collaborations. Drop a line.</p><div className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em]" data-testid="contact-availability"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Available for internships & freelance work</div></div><div className="border-t-2 border-black pt-6 dark:border-white"><div className="grid gap-3" data-testid="contact-links-grid"><a href="mailto:paladnan70930@gmail.com" className="group flex items-center justify-between border-b border-black/15 py-5 transition-[padding,color] duration-200 hover:pl-2 hover:text-neutral-500 dark:border-white/15" data-testid="contact-email-link"><span className="flex items-center gap-4"><Mail size={20} strokeWidth={1.5} aria-hidden="true" /><span><span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">Email</span><span className="mt-1 block text-lg">paladnan70930@gmail.com</span></span></span><ArrowUpRight size={19} aria-hidden="true" /></a><a href="https://www.linkedin.com/in/adnan-pal-140534348" target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-black/15 py-5 transition-[padding,color] duration-200 hover:pl-2 hover:text-neutral-500 dark:border-white/15" data-testid="contact-linkedin-link"><span className="flex items-center gap-4"><Linkedin size={20} strokeWidth={1.5} aria-hidden="true" /><span><span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">LinkedIn</span><span className="mt-1 block text-lg">linkedin.com/in/adnanpal</span></span></span><ExternalLink size={18} aria-hidden="true" /></a><a href="https://github.com/adnanpal" target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-black/15 py-5 transition-[padding,color] duration-200 hover:pl-2 hover:text-neutral-500 dark:border-white/15" data-testid="contact-github-link"><span className="flex items-center gap-4"><Github size={20} strokeWidth={1.5} aria-hidden="true" /><span><span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">GitHub</span><span className="mt-1 block text-lg">github.com/adnanpal</span></span></span><ExternalLink size={18} aria-hidden="true" /></a></div><div className="mt-10 flex flex-wrap gap-3"><a href="mailto:paladnan70930@gmail.com?subject=Hiring%20Inquiry" className="inline-flex items-center gap-3 bg-black px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-[transform,background] duration-200 hover:-translate-y-1 hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200" data-testid="contact-hire-me-button">Hire me <ArrowUpRight size={15} aria-hidden="true" /></a><button type="button" onClick={() => void copyEmail()} className="inline-flex items-center gap-2 border border-black px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-[background,color] duration-200 hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black" data-testid="contact-copy-email-button">{copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}{copied ? "Copied" : "Copy email"}</button></div></div></div></section>
      </main>

      <footer className="border-t border-black bg-[#f5f5f3] dark:border-white dark:bg-[#121215]" data-testid="site-footer"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><span data-testid="footer-copyright">© 2026 Adnan Pal — Built with React & Tailwind</span><span data-testid="footer-location">Navi Mumbai, India</span><a href="#top" onClick={(event) => handleSectionNavigation(event, "top")} className="inline-flex items-center gap-2 transition-colors hover:text-black dark:hover:text-white" data-testid="footer-back-to-top-link">Back to top <ChevronRight size={13} className="-rotate-90" aria-hidden="true" /></a></div></footer>
    </div>
  );
}
