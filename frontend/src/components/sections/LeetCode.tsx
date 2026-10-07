import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ActivityIcon, ChevronDownIcon, ExternalIcon, SparklesIcon } from "@/components/icons/Icons";
import { OWNER } from "@/data/portfolioData";
import SectionHeader from "@/components/ui/SectionHeader";

interface LeetCodeStats {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

interface RecentSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

const POLL_INTERVAL_MS = 5 * 60 * 1000;
const DIFFICULTIES = [
  { key: "easySolved", label: "Easy" },
  { key: "mediumSolved", label: "Medium" },
  { key: "hardSolved", label: "Hard" },
] as const;

function timeAgo(timestamp: string) {
  const seconds = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days < 30 ? `${days}d ago` : `${Math.floor(days / 30)}mo ago`;
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`LeetCode service returned ${response.status}`);
  return response.json() as Promise<T>;
}

export default function LeetCode() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    let cancelled = false;
    const username = encodeURIComponent(OWNER.leetcode);
    const load = () => {
      void getJson<LeetCodeStats>(`https://leetpulse-api.vercel.app/api/leetcode/solved/${username}`)
        .then((data) => { if (!cancelled) { setStats(data); setError(false); } })
        .catch(() => { if (!cancelled) setError(true); });
      void getJson<{ recentSubmissions?: RecentSubmission[] }>(`https://leetpulse-api.vercel.app/api/leetcode/calendar/${username}`)
        .then((data) => { if (!cancelled) setRecentSubmissions(data.recentSubmissions ?? []); })
        .catch(() => undefined);
    };
    load();
    const interval = window.setInterval(load, POLL_INTERVAL_MS);
    const onVisible = () => { if (document.visibilityState === "visible") load(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { cancelled = true; window.clearInterval(interval); document.removeEventListener("visibilitychange", onVisible); };
  }, []);

  const total = stats ? stats.easySolved + stats.mediumSolved + stats.hardSolved : 0;
  const visibleSubmissions = expanded ? recentSubmissions : recentSubmissions.slice(0, 5);

  return (
    <section ref={sectionRef} id="leetcode" className="editorial-inverse scroll-mt-20 border-y border-[var(--section-border)] py-20 sm:py-24" data-testid="leetcode-section">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-12">
        <div><SectionHeader index="05" label="LeetCode" title="Problems," accent="Solved." /><p className="max-w-sm text-sm leading-relaxed text-[var(--section-muted)]" data-testid="leetcode-description">Live problem-solving stats, pulled straight from my LeetCode profile.</p><a href={OWNER.leetcodeHref} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-[var(--section-text)] pb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-[gap,color] duration-200 hover:gap-3 hover:text-[var(--section-muted)]" data-testid="leetcode-profile-link">View profile <ExternalIcon size={13} aria-hidden="true" /></a></div>
        <div className="lg:pt-5" data-testid="leetcode-stats-panel">
          {!stats && !error && <div className="space-y-7 animate-pulse" data-testid="leetcode-loading"><div className="h-32 w-48 bg-[var(--section-border)]" /><div className="grid gap-5 sm:grid-cols-3">{[0, 1, 2].map((item) => <div key={item} className="h-24 bg-[var(--section-border)]" />)}</div></div>}
          {error && !stats && <div className="border border-[var(--section-border)] p-6" data-testid="leetcode-error"><p className="font-mono text-xs leading-relaxed text-[var(--section-muted)]">Couldn't reach LeetCode right now — it will retry automatically.</p><a href={OWNER.leetcodeHref} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 bg-[var(--section-text)] px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--section-bg)]">View profile <ExternalIcon size={13} /></a></div>}
          {stats && <>
            <div className="flex items-end justify-between border-b border-[var(--section-border)] pb-6"><div><p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--section-muted)]"><span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" /><span className="relative h-2 w-2 rounded-full bg-emerald-500" /></span>Live stats</p><motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mt-3 font-heading text-8xl font-bold leading-none tracking-[-0.1em] sm:text-[10rem]" data-testid="leetcode-total">{stats.solvedProblem}</motion.p><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--section-muted)]">problems solved</p></div><ActivityIcon size={44} strokeWidth={1} className="mb-3 text-[var(--section-dim)]" aria-hidden="true" /></div>
            <div className="mt-7 grid gap-6 sm:grid-cols-3" data-testid="leetcode-breakdown">{DIFFICULTIES.map(({ key, label }, index) => { const count = stats[key]; const percentage = total ? Math.round((count / total) * 100) : 0; return <div key={key} data-testid={`leetcode-${label.toLowerCase()}-stat`}><div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em]"><span>{label}</span><span className="text-[var(--section-muted)]">{percentage}%</span></div><div className="h-1 bg-[var(--section-border)]" role="progressbar" aria-label={`${label} solved percentage`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={inView ? percentage : 0}><motion.div initial={{ width: 0 }} animate={{ width: inView ? `${percentage}%` : 0 }} transition={{ duration: 0.9, delay: index * 0.12, ease: "easeOut" }} className="h-1 bg-[var(--section-text)]" /></div><p className="mt-3 font-heading text-3xl font-bold">{count}</p></div>; })}</div>
            {recentSubmissions.length > 0 && <div className="mt-10 border-t border-[var(--section-border)] pt-6" data-testid="leetcode-submissions"><div className="mb-4 flex items-center justify-between"><h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">Recent submissions</h3>{recentSubmissions.length > 5 && <button type="button" onClick={() => setExpanded((value) => !value)} className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--section-muted)]" data-testid="leetcode-expand-button">{expanded ? "Show less" : "Show all"}<ChevronDownIcon size={13} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} /></button>}</div><div className={`space-y-2 pr-1 ${expanded ? "lc-scroll max-h-80 overflow-y-auto" : ""}`}>{visibleSubmissions.map((submission, index) => <a key={`${submission.titleSlug}-${index}`} href={`https://leetcode.com/problems/${submission.titleSlug}/`} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 border border-[var(--section-border)] px-4 py-3 transition-transform duration-200 hover:translate-x-1" data-testid={`leetcode-submission-${index + 1}`}><div className="min-w-0"><p className="truncate text-sm font-medium">{submission.title}</p><p className="mt-0.5 font-mono text-[10px] text-[var(--section-muted)]">{submission.lang} · {timeAgo(submission.timestamp)}</p></div><span className="inline-flex min-h-7 shrink-0 items-center justify-center bg-[var(--section-text)] px-2 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--section-bg)]" data-testid={`leetcode-submission-status-${index + 1}`}>{submission.statusDisplay}</span></a>)}</div></div>}
            <p className="mt-8 flex items-center gap-2 border-t border-[var(--section-border)] pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--section-muted)]" data-testid="leetcode-refresh-note"><SparklesIcon size={13} aria-hidden="true" /> Auto-refreshes every 5 min · syncs when you return</p>
          </>}
        </div>
      </div>
    </section>
  );
}