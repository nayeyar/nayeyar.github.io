import { ArrowUpRight, CalendarDays, Mail, MapPin } from "lucide-react";
import Link from "next/link";

import { MotionReveal } from "@/components/motion-reveal";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioContent } from "@/lib/site-content";

const content = getPortfolioContent();

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-20 pt-4">
      <div className="absolute inset-0 -z-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          src={content.contact.videoSrc}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.82),rgba(15,23,42,0.68),rgba(37,99,235,0.45))]" />
      </div>
      <SiteHeader />
      <main className="mx-auto mt-12 flex w-[min(1120px,calc(100%-1.5rem))] flex-col gap-8">
        <MotionReveal className="light-glass max-w-4xl rounded-[2rem] border border-white/15 p-8 md:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Book a build session, start a project, or send a direct note.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-strong)] md:text-lg">
            {content.contact.blurb}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={content.contact.bookingUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <CalendarDays className="h-4 w-4" />
              {content.contact.bookingLabel}
            </Link>
            <Link
              href={`mailto:${content.identity.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-white/15"
            >
              <Mail className="h-4 w-4" />
              Email Me
            </Link>
          </div>
        </MotionReveal>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionReveal className="light-glass rounded-[2rem] border border-white/15 p-8">
            <h2 className="text-2xl font-semibold">Direct contact</h2>
            <div className="mt-6 grid gap-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Email</p>
                <Link href={`mailto:${content.identity.email}`} className="mt-2 inline-block text-lg font-medium">
                  {content.identity.email}
                </Link>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Location</p>
                <p className="mt-2 inline-flex items-center gap-2 text-lg font-medium">
                  <MapPin className="h-4 w-4 text-[var(--accent)]" />
                  {content.identity.location}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">GitHub</p>
                <Link
                  href={content.identity.githubUrl}
                  target="_blank"
                  className="mt-2 inline-flex items-center gap-2 text-lg font-medium transition hover:text-[var(--accent)]"
                >
                  {content.identity.githubUrl.replace("https://", "")}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08} className="light-glass rounded-[2rem] border border-white/15 p-8">
            <h2 className="text-2xl font-semibold">Project inquiry</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
              This form uses your mail client as the handoff so the page stays deployment-ready without a backend dependency.
            </p>
            <form
              action={`mailto:${content.identity.email}`}
              method="post"
              encType="text/plain"
              className="mt-8 grid gap-4"
            >
              <label className="grid gap-2 text-sm">
                <span className="text-[var(--muted-strong)]">Name</span>
                <input
                  required
                  name="name"
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="text-[var(--muted-strong)]">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  placeholder="you@example.com"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="text-[var(--muted-strong)]">What are you building?</span>
                <textarea
                  required
                  name="project"
                  rows={6}
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  placeholder="Project scope, timeline, team size, and where AI fits."
                />
              </label>
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Send Inquiry
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </MotionReveal>
        </div>
      </main>
    </div>
  );
}
