"use client";

import { useEffect, useMemo, useRef } from "react";

const ASCII_CHARS = [".", "+", "*", ":", "=", "~", "#", "%"];

export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });
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

    const columns = Math.ceil(width / 18);
    const rows = Math.ceil(height / 18);
    const wave = time / 900;

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const dx = pointerRef.current.x * columns - x;
        const dy = pointerRef.current.y * rows - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const ripple = Math.sin(x * 0.55 + wave) + Math.cos(y * 0.48 + wave * 1.2);
        const pointerBoost = pointerRef.current.active ? Math.max(0, 4 - distance) : 0;
        const intensity = ripple + pointerBoost;
        const character =
          ASCII_CHARS[Math.abs(Math.round(intensity * 1.5)) % ASCII_CHARS.length] ?? ".";
        const alpha = prefersReducedMotion ? 0.08 : Math.max(0.08, Math.min(0.28, 0.12 + intensity * 0.03));

        context.fillStyle = `color-mix(in oklab, var(--accent) ${Math.round(alpha * 100)}%, transparent)`;
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
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
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
      pointerRef.current = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
        active: true,
      };
    };

    const handleLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-90" />;
}
