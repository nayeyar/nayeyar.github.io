import { ArrowUpRight, CalendarDays, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

import { MotionReveal } from "@/components/motion-reveal";
import { ProjectInquiryForm } from "@/components/project-inquiry-form";
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
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Book a build session, start a project, or send a direct note.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-strong)] md:text-lg">
            {content.contact.blurb}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={content.contact.bookingUrl}
              target="_blank"
              rel="noreferrer"
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

        <MotionReveal className="light-glass rounded-[2rem] border border-white/15 p-5 md:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Schedule via Calendly</h2>
            <Link
              href={content.contact.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-strong)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Open in new tab
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div
            className="calendly-inline-widget overflow-hidden rounded-[1.5rem] border border-white/10"
            data-url={content.contact.bookingUrl}
            style={{ minWidth: "320px", height: "700px" }}
          />
        </MotionReveal>
        <Script
          id="calendly-widget-script"
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionReveal className="light-glass rounded-[2rem] border border-white/15 p-8">
            <h2 className="text-2xl font-semibold">Direct contact</h2>
            <div className="mt-6 grid gap-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                  Email
                </p>
                <Link
                  href={`mailto:${content.identity.email}`}
                  className="mt-2 inline-block text-lg font-medium"
                >
                  {content.identity.email}
                </Link>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                  Location
                </p>
                <p className="mt-2 inline-flex items-center gap-2 text-lg font-medium">
                  <MapPin className="h-4 w-4 text-[var(--accent)]" />
                  {content.identity.location}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                  GitHub
                </p>
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
          <MotionReveal
            delay={0.08}
            className="light-glass rounded-[2rem] border border-white/15 p-8"
          >
            <h2 className="text-2xl font-semibold">Project inquiry</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
              Submit your project details through a secure server-side endpoint.
              You can also use direct email as fallback.
            </p>
            <ProjectInquiryForm email={content.identity.email} />
          </MotionReveal>
        </div>
      </main>
    </div>
  );
}
