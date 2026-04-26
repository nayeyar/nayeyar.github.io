"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type CalendlyWindow = Window & {
  Calendly?: {
    initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
  };
};

type CalendlyInlineWidgetProps = {
  url: string;
  className?: string;
};

const CALENDLY_SCRIPT_ID = "calendly-widget-script";
const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

export function CalendlyInlineWidget({ url, className }: CalendlyInlineWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);

  const initWidget = useCallback(() => {
    const win = window as CalendlyWindow;
    if (!containerRef.current || typeof win.Calendly?.initInlineWidget !== "function") {
      return false;
    }

    if (initializedRef.current) {
      return true;
    }

    // Ensure a single embed instance per mount to avoid flash/repaint.
    containerRef.current.innerHTML = "";
    win.Calendly.initInlineWidget({
      url,
      parentElement: containerRef.current,
    });
    initializedRef.current = true;
    return true;
  }, [url]);

  useEffect(() => {
    initializedRef.current = false;
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (initWidget() || attempts > 50) {
        window.clearInterval(timer);
      }
    }, 150);

    return () => {
      window.clearInterval(timer);
      initializedRef.current = false;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [initWidget]);

  return (
    <>
      <Script id={CALENDLY_SCRIPT_ID} src={CALENDLY_SCRIPT_SRC} strategy="afterInteractive" onLoad={initWidget} />
      <div
        ref={containerRef}
        className={className}
        style={{ width: "100%", minWidth: "320px", height: "700px" }}
      />
    </>
  );
}
