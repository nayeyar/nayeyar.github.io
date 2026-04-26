"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

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

  useEffect(() => {
    const win = window as CalendlyWindow;
    let attempts = 0;

    const mountWidget = () => {
      if (!containerRef.current || !win.Calendly) {
        return false;
      }

      // Clear stale iframes when revisiting the page through client-side navigation.
      containerRef.current.innerHTML = "";
      win.Calendly.initInlineWidget({
        url,
        parentElement: containerRef.current,
      });
      return true;
    };

    if (mountWidget()) {
      return;
    }

    const timer = window.setInterval(() => {
      attempts += 1;
      if (mountWidget() || attempts > 40) {
        window.clearInterval(timer);
      }
    }, 150);

    return () => {
      window.clearInterval(timer);
    };
  }, [url]);

  return (
    <>
      <Script id={CALENDLY_SCRIPT_ID} src={CALENDLY_SCRIPT_SRC} strategy="afterInteractive" />
      <div
        ref={containerRef}
        className={className}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </>
  );
}
