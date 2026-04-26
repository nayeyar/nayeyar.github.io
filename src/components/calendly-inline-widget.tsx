"use client";

import { useEffect, useRef } from "react";

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
    let cancelled = false;

    const mountWidget = () => {
      if (cancelled || !containerRef.current || !win.Calendly) {
        return;
      }

      // Clear stale iframes when revisiting the page through client-side navigation.
      containerRef.current.innerHTML = "";
      win.Calendly.initInlineWidget({
        url,
        parentElement: containerRef.current,
      });
    };

    const scriptEl = document.getElementById(CALENDLY_SCRIPT_ID) as HTMLScriptElement | null;
    if (win.Calendly) {
      mountWidget();
      return () => {
        cancelled = true;
      };
    }

    if (scriptEl) {
      scriptEl.addEventListener("load", mountWidget);
      return () => {
        cancelled = true;
        scriptEl.removeEventListener("load", mountWidget);
      };
    }

    const script = document.createElement("script");
    script.id = CALENDLY_SCRIPT_ID;
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", mountWidget);
    document.body.appendChild(script);

    return () => {
      cancelled = true;
      script.removeEventListener("load", mountWidget);
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
