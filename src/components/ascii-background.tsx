"use client";

import { useEffect, useMemo, useRef } from "react";

const ASCII_CHARS = [".", "+", "*", ":", "=", "~", "#", "%"];

export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });
  const viewportRef = useRef({ width: 1, height: 1 });
  const drawRef = useRef<(time: number) => void>(() => {});

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false,
    [],
  );

  drawRef.current = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);
    context.font = "14px var(--font-mono)";
    context.textBaseline = "top";

    const isDark = document.documentElement.classList.contains("dark");
    const inkColor = isDark ? "255, 255, 255" : "0, 0, 0";
    const minAlpha = isDark ? 0.16 : 0.12;
    const maxAlpha = isDark ? 0.5 : 0.34;
    const baseAlpha = isDark ? 0.22 : 0.16;
    const alphaWeight = isDark ? 0.05 : 0.04;

    const columns = Math.ceil(width / 18);
    const rows = Math.ceil(height / 18);
    const wave = time / 900;

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const dx = pointerRef.current.x * columns - x;
        const dy = pointerRef.current.y * rows - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const ripple = Math.sin(x * 0.55 + wave) + Math.cos(y * 0.48 + wave * 1.2);
        const pointerRadius = pointerRef.current.active ? 9 : 5;
        const pointerInfluence = Math.max(0, 1 - distance / pointerRadius);
        const pointerPulse = Math.sin(distance * 1.6 - time / 220) * pointerInfluence;
        const pointerBoost = pointerRef.current.active ? pointerInfluence * 2.2 + pointerPulse * 1.1 : 0;
        const intensity = ripple + pointerBoost;
        const character =
          ASCII_CHARS[Math.abs(Math.round(intensity * 1.5)) % ASCII_CHARS.length] ?? ".";
        const alpha = prefersReducedMotion
          ? minAlpha
          : Math.max(
              minAlpha,
              Math.min(maxAlpha, baseAlpha + intensity * alphaWeight + pointerInfluence * 0.18),
            );

        context.fillStyle = `rgba(${inkColor}, ${alpha})`;
        context.fillText(character, x * 18, y * 18);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const resize = () => {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      const { devicePixelRatio } = window;
      viewportRef.current = { width, height };
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const context = canvas.getContext("2d");
      context?.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    resize();

    let frameId = 0;
    const loop = (time: number) => {
      drawRef.current(time);
      if (!prefersReducedMotion) {
        frameId = window.requestAnimationFrame(loop);
      }
    };

    drawRef.current(0);
    if (!prefersReducedMotion) {
      frameId = window.requestAnimationFrame(loop);
    }

    const handleMove = (event: PointerEvent) => {
      const { width, height } = viewportRef.current;
      pointerRef.current = {
        x: event.clientX / width,
        y: event.clientY / height,
        active: true,
      };
    };

    const handleLeave = () => {
      pointerRef.current.active = false;
    };

    const handleThemeChange = () => {
      drawRef.current(performance.now());
    };

    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-90" />;
}
