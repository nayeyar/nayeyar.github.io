"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";

type GitHubContributionCardProps = {
  username: string;
  githubUrl: string;
};

export function GitHubContributionCard({
  username,
  githubUrl,
}: GitHubContributionCardProps) {
  const [chartState, setChartState] = useState<"checking" | "online" | "offline">("checking");
  const chartImageRef = useRef<HTMLImageElement | null>(null);
  const statusLabel =
    chartState === "checking" ? "checking" : chartState === "online" ? "in-sync" : "out-of-sync";
  const statusDotClass =
    chartState === "checking"
      ? "bg-slate-400"
      : chartState === "online"
        ? "bg-emerald-500"
        : "bg-rose-500";

  useEffect(() => {
    const image = chartImageRef.current;
    if (!image || !image.complete) {
      return;
    }

    setChartState(image.naturalWidth > 0 ? "online" : "offline");
  }, [username]);

  return (
    <section
      id="github"
      className="light-glass rounded-[2rem] border border-white/15 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] md:p-8"
    >
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">OPEN SOURCE</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
            Contribution history and recent code activity
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted-strong)] md:text-base">
            Live contribution snapshot with direct access to repositories and current work.
          </p>
        </div>
        <Link
          href={githubUrl}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-5 py-3 text-sm font-medium text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
        >
          <Github className="h-4 w-4" />
          View GitHub
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--panel-strong)] p-4">
        <img
          ref={chartImageRef}
          src={`https://ghchart.rshah.org/2563eb/${username}`}
          alt={`${username} GitHub contributions chart`}
          className="w-full rounded-xl"
          onLoad={() => setChartState("online")}
          onError={() => setChartState("offline")}
        />
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
        <span className={`h-2.5 w-2.5 rounded-full ${statusDotClass}`} aria-hidden />
        <span>{statusLabel}</span>
      </div>
    </section>
  );
}
