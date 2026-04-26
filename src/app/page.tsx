import { ArrowRight, CalendarDays, Github, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GitHubContributionCard } from "@/components/github-contribution-card";
import { MotionReveal } from "@/components/motion-reveal";
import { SiteHeader } from "@/components/site-header";
import { SkillsMarquee } from "@/components/skills-marquee";
import { TextScramble } from "@/components/text-scramble";
import { getPortfolioContent } from "@/lib/site-content";

const content = getPortfolioContent();

export default function HomePage() {
  return (
    <div className="overflow-x-hidden pb-20 pt-4">
      <SiteHeader />
      <main className="mx-auto mt-10 flex w-[min(1120px,calc(100%-1.5rem))] flex-col gap-8 md:mt-12">
        <MotionReveal>
          <section className="light-glass rounded-[2rem] border border-white/15 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.14)] md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-[var(--accent)]">
              <Sparkles className="h-3.5 w-3.5" />
              Software / AI Engineer
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
              Building clean products, useful AI workflows, and fast web systems.
            </h1>
            <TextScramble
              phrases={content.hero.scramblePhrases}
              className="mt-6 min-h-10 max-w-4xl font-mono text-sm uppercase tracking-[0.2em] text-[var(--accent)] md:min-h-8 md:text-base"
            />
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted-strong)] md:text-lg">
              {content.hero.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={content.hero.primaryCta.href}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                <CalendarDays className="h-4 w-4" />
                {content.hero.primaryCta.label}
              </Link>
            </div>
          </section>
        </MotionReveal>

        <section id="about" className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <MotionReveal className="light-glass relative overflow-hidden rounded-[2rem] border border-white/15 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.25),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.16),transparent_35%)]" />
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">About</p>
              <div className="relative mt-5 aspect-square w-full overflow-hidden rounded-[2rem] border border-white/15 bg-white/10">
                <Image
                  src={content.hero.profileImage.src}
                  alt={content.hero.profileImage.alt}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="mt-6 grid gap-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Based In</p>
                  <p className="mt-2 text-lg font-medium">{content.identity.location}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Focus</p>
                  <ul className="mt-2 text-lg font-medium list-disc list-inside space-y-1">
                    <li>AI/ML</li>
                    <li>System Architectures</li>
                    <li>Distributed Microservices</li>
                    <li>Event-Driven Systems</li>
                    <li>Cloud-Native Products</li>
                  </ul>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-[var(--panel-strong)] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Reach Out</p>
                  <Link
                    href={`mailto:${content.identity.email}`}
                    className="mt-3 inline-flex items-center gap-2 text-base font-medium text-[var(--foreground)] transition hover:text-[var(--accent)]"
                  >
                    <Mail className="h-4 w-4" />
                    {content.identity.email}
                  </Link>
                </div>
              </div>
            </div>
          </MotionReveal>
          <div className="grid gap-4">
            <MotionReveal className="light-glass rounded-[2rem] border border-white/15 p-8">
              <h2 className="text-3xl font-semibold tracking-[-0.03em]">Engineering with clarity first.</h2>
              <p className="mt-4 text-base leading-8 text-[var(--muted-strong)]">{content.about.summary}</p>
            </MotionReveal>
            {content.about.highlights.map((item, index) => (
              <MotionReveal
                key={`${item.year}-${item.role}`}
                delay={(index + 1) * 0.08}
                className="light-glass rounded-[2rem] border border-white/15 p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">{item.year}</p>
                    <h3 className="mt-2 text-xl font-semibold">{item.role}</h3>
                  </div>
                  {item.href ? (
                    <Link
                      href={item.href}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-strong)] transition hover:text-[var(--accent)]"
                    >
                      View reference
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">{item.detail}</p>
              </MotionReveal>
            ))}
          </div>
        </section>

        <section id="skills" className="py-4">
          <MotionReveal>
            <div className="mx-auto w-[min(1120px,calc(100%-1.5rem))]">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Skills</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                Tools and technologies in rotation.
              </h2>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.05}>
            <div className="relative left-1/2 right-1/2 mt-2 -ml-[50vw] -mr-[50vw] w-screen max-w-none overflow-visible">
              <SkillsMarquee skills={content.skills} />
            </div>
          </MotionReveal>
        </section>

        <MotionReveal>
          <GitHubContributionCard
            username={content.identity.githubUsername}
            githubUrl={content.identity.githubUrl}
          />
        </MotionReveal>

        <section id="projects" className="light-glass rounded-[2rem] border border-white/15 p-8 md:p-10">
          <MotionReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Projects</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">Selected work and experiments.</h2>
          </MotionReveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {content.projects.map((project, index) => {
              const isProjectExternal = project.href.startsWith("http");
              const derivedRepoHref =
                project.repoHref ?? (project.href.includes("github.com/") ? project.href : undefined);
              const isRepoExternal = Boolean(derivedRepoHref && derivedRepoHref.startsWith("http"));
              const showProjectButton = project.href !== derivedRepoHref;

              return (
                <MotionReveal
                  key={project.name}
                  delay={index * 0.08}
                  className="group rounded-[1.75rem] border border-white/10 bg-[var(--panel-strong)] p-6 transition hover:border-[var(--accent)]/35"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted-strong)]">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {showProjectButton ? (
                        <Link
                          href={project.href}
                          target={isProjectExternal ? "_blank" : undefined}
                          rel={isProjectExternal ? "noreferrer" : undefined}
                          aria-label={`Open ${project.name} project`}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 transition group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ) : null}
                      {derivedRepoHref ? (
                        <Link
                          href={derivedRepoHref}
                          target={isRepoExternal ? "_blank" : undefined}
                          rel={isRepoExternal ? "noreferrer" : undefined}
                          aria-label={`Open ${project.name} repository`}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 transition group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
                        >
                          <Github className="h-4 w-4" />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase leading-4 tracking-[0.08em] text-[var(--muted-strong)] sm:px-3 sm:text-xs sm:tracking-[0.14em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </section>

        <MotionReveal className="light-glass flex flex-col gap-4 rounded-[2rem] border border-white/15 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Next Step</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
              Need a product-minded engineer for web or AI work?
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Contact Me
            <ArrowRight className="h-4 w-4" />
          </Link>
        </MotionReveal>
      </main>
    </div>
  );
}
