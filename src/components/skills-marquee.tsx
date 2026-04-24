"use client";

import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";

type Skill = {
  name: string;
  badge: string;
  iconSrc?: string;
  description: string;
};

type SkillsMarqueeProps = {
  skills: Skill[];
};

type ActivePopover = {
  id: string;
  skill: Skill;
  top: number;
  left: number;
};

export function SkillsMarquee({ skills }: SkillsMarqueeProps) {
  const [activePopover, setActivePopover] = useState<ActivePopover | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const shellRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const loopWidthRef = useRef(0);
  const manualTargetRef = useRef<number | null>(null);

  const marqueeSkills = useMemo(() => [...skills, ...skills], [skills]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const closePopover = () => {
    clearCloseTimer();
    anchorRef.current = null;
    setActivePopover(null);
  };

  const scheduleClosePopover = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      anchorRef.current = null;
      setActivePopover(null);
      closeTimerRef.current = null;
    }, 1000);
  };

  const updatePopoverPosition = () => {
    if (!anchorRef.current || !activePopover) {
      return;
    }

    const rect = anchorRef.current.getBoundingClientRect();
    setActivePopover((current) =>
      current
        ? {
            ...current,
            top: rect.bottom + 12,
            left: rect.left + rect.width / 2,
          }
        : null,
    );
  };

  const normalizeScrollLeft = (value: number) => {
    const loopWidth = loopWidthRef.current;
    if (loopWidth <= 0) {
      return value;
    }

    while (value < 0) {
      value += loopWidth;
    }
    while (value >= loopWidth) {
      value -= loopWidth;
    }

    return value;
  };

  useEffect(() => {
    setMounted(true);
    setDirection(Math.random() > 0.5 ? 1 : -1);

    return () => {
      clearCloseTimer();
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    const measure = () => {
      loopWidthRef.current = shell.scrollWidth / 2;
      if (direction === -1 && shell.scrollLeft <= 0) {
        shell.scrollLeft = loopWidthRef.current;
      }
      manualTargetRef.current = normalizeScrollLeft(shell.scrollLeft);
    };

    measure();
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [direction, marqueeSkills]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    const wheelHandler = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      const base = manualTargetRef.current ?? normalizeScrollLeft(shell.scrollLeft);
      manualTargetRef.current = normalizeScrollLeft(base + delta);
    };

    shell.addEventListener("wheel", wheelHandler, { passive: false });

    return () => {
      shell.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    const animate = (timestamp: number) => {
      const paused = isHovered || Boolean(activePopover);
      const loopWidth = loopWidthRef.current;

      if (!paused && loopWidth > 0) {
        const last = lastTimestampRef.current ?? timestamp;
        const delta = timestamp - last;
        const speed = 0.035;
        shell.scrollLeft += direction * speed * delta;
        manualTargetRef.current = normalizeScrollLeft(shell.scrollLeft);

        if (direction === 1 && shell.scrollLeft >= loopWidth) {
          shell.scrollLeft -= loopWidth;
        } else if (direction === -1 && shell.scrollLeft <= 0) {
          shell.scrollLeft += loopWidth;
        }
      } else if (isHovered && loopWidth > 0 && manualTargetRef.current !== null) {
        const current = normalizeScrollLeft(shell.scrollLeft);
        const target = manualTargetRef.current;
        let diff = target - current;

        if (diff > loopWidth / 2) {
          diff -= loopWidth;
        } else if (diff < -loopWidth / 2) {
          diff += loopWidth;
        }

        if (Math.abs(diff) > 0.15) {
          shell.scrollLeft = normalizeScrollLeft(current + diff * 0.22);
        } else {
          shell.scrollLeft = target;
        }
      }

      lastTimestampRef.current = timestamp;
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activePopover, direction, isHovered]);

  useEffect(() => {
    if (!activePopover) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopover();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        anchorRef.current &&
        (anchorRef.current === target || anchorRef.current.contains(target))
      ) {
        return;
      }

      const popoverElement = document.querySelector("[data-skill-popover]");
      if (target && popoverElement && popoverElement.contains(target)) {
        return;
      }

      closePopover();
    };

    window.addEventListener("resize", updatePopoverPosition);
    window.addEventListener("scroll", updatePopoverPosition, true);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("resize", updatePopoverPosition);
      window.removeEventListener("scroll", updatePopoverPosition, true);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [activePopover]);

  const openPopover = (id: string, skill: Skill, element: HTMLButtonElement) => {
    clearCloseTimer();
    const rect = element.getBoundingClientRect();
    anchorRef.current = element;
    setActivePopover({
      id,
      skill,
      top: rect.bottom + 12,
      left: rect.left + rect.width / 2,
    });
  };

  return (
    <div className="mt-8">
      <div className="skills-marquee-shell relative">
        <div className="skills-marquee-edge skills-marquee-edge-left" />
        <div className="skills-marquee-edge skills-marquee-edge-right" />
        <div
          ref={shellRef}
          className="skills-marquee overflow-x-auto py-6 [scrollbar-width:none] [-ms-overflow-style:none]"
          onPointerEnter={() => {
            setIsHovered(true);
            clearCloseTimer();
          }}
          onPointerLeave={() => {
            setIsHovered(false);
            scheduleClosePopover();
          }}
        >
          <div className="skills-marquee-track flex w-max gap-3">
            {marqueeSkills.map((skill, index) => {
              const id = `${skill.name}-${index}`;
              const isActive = activePopover?.id === id;
              const hasIcon = Boolean(skill.iconSrc);

              return (
                <button
                  key={id}
                  type="button"
                  aria-expanded={isActive}
                  className={`group relative flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center rounded-full p-4 text-center transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] md:h-28 md:w-28 ${
                    hasIcon
                      ? "border border-transparent bg-transparent hover:bg-transparent"
                      : "border border-white/12 bg-white/8 hover:border-[var(--accent)] hover:bg-white/14"
                  }`}
                  onClick={(event) => openPopover(id, skill, event.currentTarget)}
                  onFocus={(event) => openPopover(id, skill, event.currentTarget)}
                  onBlur={scheduleClosePopover}
                  onPointerEnter={(event) => openPopover(id, skill, event.currentTarget)}
                  onPointerLeave={scheduleClosePopover}
                >
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -inset-1 rounded-full blur-lg transition duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                    }`}
                    style={{
                      background: "color-mix(in oklab, var(--accent) 40%, transparent)",
                    }}
                  />
                  {skill.iconSrc ? (
                    <img
                      src={skill.iconSrc}
                      alt={skill.name}
                      width={56}
                      height={56}
                      loading="lazy"
                      className={`relative h-12 w-12 object-contain transition duration-300 ease-out md:h-14 md:w-14 ${
                        isActive
                          ? "scale-[1.24]"
                          : "scale-100 group-hover:scale-[1.24] group-focus-visible:scale-[1.24]"
                      }`}
                    />
                  ) : (
                    <span
                      className={`relative font-mono text-xl font-semibold uppercase tracking-[0.18em] text-[var(--accent)] transition duration-300 ease-out md:text-2xl ${
                        isActive
                          ? "scale-[1.24]"
                          : "scale-100 group-hover:scale-[1.24] group-focus-visible:scale-[1.24]"
                      }`}
                    >
                      {skill.badge}
                    </span>
                  )}
                  <span className="sr-only">{skill.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {mounted && activePopover
        ? createPortal(
            <div
              data-skill-popover
              role="dialog"
              aria-label={`${activePopover.skill.name} details`}
              className="fixed z-[80] w-64 -translate-x-1/2 rounded-3xl border border-white/15 bg-[var(--panel-strong)] p-4 text-left shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl"
              style={{
                top: activePopover.top,
                left: activePopover.left,
              }}
              onPointerEnter={clearCloseTimer}
              onPointerLeave={scheduleClosePopover}
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                {activePopover.skill.name}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                {activePopover.skill.description}
              </p>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
