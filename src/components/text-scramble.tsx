"use client";

import { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#________";

type TextScrambleProps = {
  phrases: string[];
  className?: string;
};

export function TextScramble({ phrases, className }: TextScrambleProps) {
  const [markup, setMarkup] = useState(phrases[0] ?? "");
  const animatePhraseRef = useRef<(from: string, to: string) => () => void>(() => () => {});

  animatePhraseRef.current = (from: string, to: string) => {
    const length = Math.max(from.length, to.length);
    const queue = Array.from({ length }, (_, index) => ({
      from: from[index] ?? "",
      to: to[index] ?? "",
      start: Math.floor(Math.random() * 18),
      end: 18 + Math.floor(Math.random() * 18),
      char: "",
    }));

    let frame = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) {
        return;
      }

      let complete = 0;
      let output = "";

      for (const item of queue) {
        if (frame >= item.end) {
          complete += 1;
          output += item.to;
          continue;
        }

        if (frame >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] ?? "_";
          }

          output += `<span class="text-[var(--muted)]">${item.char}</span>`;
          continue;
        }

        output += item.from;
      }

      setMarkup(output);

      if (complete < queue.length) {
        frame += 1;
        requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      cancelled = true;
    };
  };

  useEffect(() => {
    if (phrases.length === 0) {
      return;
    }

    let activeCleanup = () => {};
    let timeoutId: number | undefined;
    let current = 0;

    const advance = () => {
      const from = phrases[current] ?? "";
      current = (current + 1) % phrases.length;
      const to = phrases[current] ?? "";

      activeCleanup();
      activeCleanup = animatePhraseRef.current(from, to);
      timeoutId = window.setTimeout(advance, 2400);
    };

    setMarkup(phrases[0] ?? "");
    timeoutId = window.setTimeout(advance, 1800);

    return () => {
      activeCleanup();
      window.clearTimeout(timeoutId);
    };
  }, [phrases]);

  return (
    <p
      className={className}
      aria-live="polite"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
