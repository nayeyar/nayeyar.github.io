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
  return (
    <section
      id="github"
      className="light-glass rounded-[2rem] border border-white/15 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] md:p-8"
    >
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
            Open Source
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
            GitHub activity, shipped in public
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted-strong)] md:text-base">
            A live contribution chart for the existing GitHub profile, paired with direct access to repositories and recent work.
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
          src={`https://ghchart.rshah.org/2563eb/${username}`}
          alt={`${username} GitHub contributions chart`}
          className="w-full rounded-xl"
        />
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
        Live chart source may fall back if the third-party contribution service is unavailable.
      </p>
    </section>
  );
}
