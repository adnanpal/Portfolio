// src/components/sections/LeetCode.tsx
import { useEffect, useState } from "react";
import { OWNER } from "../../data/portfolioData";
import SectionHeader from "../ui/SectionHeader";
import { ExternalIcon, ChevronDownIcon } from "../icons/Icons";

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

const USERNAME = OWNER.leetcode;
const COLLAPSED_COUNT = 5;
const POLL_INTERVAL_MS = 5 * 60 * 1000; // 5 min — keeps the card "live" without hammering the API

const DIFFICULTY_META = [
  { key: "easySolved", label: "Easy", color: "#22c55e" },
  { key: "mediumSolved", label: "Medium", color: "#eab308" },
  { key: "hardSolved", label: "Hard", color: "#f43f5e" },
] as const;

function timeAgo(timestamp: string) {
  const seconds = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (seconds < 60) return "just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function LeetCode() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      fetch(`https://leetpulse-api.vercel.app/api/leetcode/solved/${USERNAME}`)
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;
          setStats(data);
          setError(false);
        })
        .catch(() => { if (!cancelled) setError(true); });

      fetch(`https://leetpulse-api.vercel.app/api/leetcode/calendar/${USERNAME}`)
        .then((res) => res.json())
        .then((data) => { if (!cancelled) setRecentSubmissions(data.recentSubmissions || []); })
        .catch(() => {});
    };

    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const total = stats ? stats.easySolved + stats.mediumSolved + stats.hardSolved : 0;
  const visibleSubmissions = expanded ? recentSubmissions : recentSubmissions.slice(0, COLLAPSED_COUNT);
  const canExpand = recentSubmissions.length > COLLAPSED_COUNT;

  return (
    <section id="leetcode" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionHeader index="04" label="LeetCode" title="Problems," accent="Solved" />

      <p className="leading-relaxed mb-10 max-w-md -mt-6" style={{ color: "var(--text-muted)" }}>
        Live problem-solving stats, pulled straight from my LeetCode profile.
      </p>

      <div
        className="rounded-lg p-6 md:p-8 transition-colors"
        style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-card)" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        {/* Loading skeleton */}
        {!stats && !error && (
          <div className="animate-pulse space-y-6">
            <div className="h-12 w-40 rounded-sm" style={{ backgroundColor: "var(--border)" }} />
            <div className="grid sm:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-24 rounded-lg" style={{ backgroundColor: "var(--border)" }} />
              ))}
            </div>
          </div>
        )}

        {/* Error state */}
        {error && !stats && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>
              Couldn't reach LeetCode right now — it'll retry automatically. Meanwhile:
            </p>
            <a
              href={OWNER.leetcodeHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 shrink-0 px-4 py-2 font-mono text-xs tracking-widest rounded-sm transition-colors"
              style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--lavender)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              VIEW PROFILE <ExternalIcon />
            </a>
          </div>
        )}

        {stats && (
          <>
            {/* Top row: live badge + total + CTA */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "var(--accent)" }} />
                  </span>
                  <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                    Live
                  </span>
                </div>
                <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: "var(--text-dim)" }}>
                  Problems Solved
                </p>
                <h3 className="text-5xl md:text-6xl font-bold" style={{ color: "var(--text)" }}>
                  {stats.solvedProblem}
                </h3>
              </div>

              <a
                href={OWNER.leetcodeHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 self-start md:self-auto px-5 py-2.5 text-white font-mono text-xs tracking-widest rounded-sm transition-colors"
                style={{ backgroundColor: "var(--accent)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--accent)")}
              >
                VIEW PROFILE <ExternalIcon />
              </a>
            </div>

            {/* Difficulty breakdown with progress bars */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {DIFFICULTY_META.map(({ key, label, color }) => {
                const count = stats[key];
                const pct = total ? Math.round((count / total) * 100) : 0;
                return (
                  <div
                    key={key}
                    className="rounded-lg p-4 transition-colors"
                    style={{ border: "1px solid var(--border)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
                        {label}
                      </span>
                      <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                        {pct}%
                      </span>
                    </div>
                    <p className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>
                      {count}
                    </p>
                    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "var(--border)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${pct}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent submissions */}
            {recentSubmissions.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                    Recent Submissions
                  </h4>
                  {canExpand && (
                    <button
                      onClick={() => setExpanded((v) => !v)}
                      className="flex items-center gap-1 font-mono text-xs transition-colors"
                      style={{ color: "var(--text-dim)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lavender)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
                    >
                      {expanded ? "Show less" : "Show all"}
                      <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>

                <div className={`space-y-2 pr-1 ${expanded ? "max-h-80 overflow-y-auto lc-scroll" : ""}`}>
                  {visibleSubmissions.map((submission, index) => {
                    const accepted = submission.statusDisplay === "Accepted";
                    return (
                      <a
                        key={`${submission.titleSlug}-${index}`}
                        href={`https://leetcode.com/problems/${submission.titleSlug}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-4 rounded-lg px-4 py-3 transition-colors"
                        style={{ border: "1px solid var(--border)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>
                            {submission.title}
                          </p>
                          <p className="text-xs font-mono mt-0.5" style={{ color: "var(--text-dim)" }}>
                            {submission.lang} · {timeAgo(submission.timestamp)}
                          </p>
                        </div>
                        <span
                          className="shrink-0 text-xs font-mono px-2 py-0.5 rounded-full border"
                          style={
                            accepted
                              ? { borderColor: "rgba(34,197,94,0.4)", color: "#22c55e" }
                              : { borderColor: "rgba(244,63,94,0.4)", color: "#f43f5e" }
                          }
                        >
                          {submission.statusDisplay}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
                Auto-refreshes every 5 min · syncs when you return to this tab
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}