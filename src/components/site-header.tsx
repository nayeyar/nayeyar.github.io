"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "GitHub", href: "#github" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const resolveHref = (href: string) => {
    if (!href.startsWith("#")) {
      return href;
    }
    return pathname === "/" ? href : `/${href}`;
  };

  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(1120px,calc(100%-1.5rem))]">
      <div className="light-glass flex items-center justify-between rounded-full border border-white/15 px-4 py-3 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-2xl">
        <Link
          href="/"
          className="group flex items-center gap-3 text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <span className="relative inline-flex h-12 w-12 items-center justify-center">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-2 rounded-full bg-[#00FF41]/30 blur-xl opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            <BrandLogo className="relative h-11 w-11 shrink-0 rounded-xl transition duration-300 group-hover:scale-105 group-focus-visible:scale-105" />
          </span>
          <span className="text-lg font-semibold tracking-[0.1em] md:text-xl">Nay Ayeyar</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={resolveHref(item.href)}
              className="rounded-full px-4 py-2 text-sm text-[var(--muted-strong)] transition hover:bg-white/10 hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="light-glass inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 md:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div
        className={cn(
          "light-glass mt-3 overflow-hidden rounded-[2rem] border border-white/15 transition md:hidden",
          open ? "max-h-96 p-3 opacity-100" : "max-h-0 p-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={resolveHref(item.href)}
              className="rounded-2xl px-4 py-3 text-sm text-[var(--muted-strong)] transition hover:bg-white/10 hover:text-[var(--foreground)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
