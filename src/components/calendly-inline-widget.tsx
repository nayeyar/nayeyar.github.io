"use client";

import { useEffect, useRef, useState } from "react";

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
  const [fallbackToIframe, setFallbackToIframe] = useState(false);

  useEffect(() => {
    const win = window as CalendlyWindow;
    let cancelled = false;
    let attempts = 0;
    let intervalId: number | null = null;

    const mountWidget = () => {
      if (!containerRef.current || typeof win.Calendly?.initInlineWidget !== "function") {
        return false;
      }

      try {
        // Remove stale embeds on client-side re-entry before creating a fresh inline widget.
        containerRef.current.innerHTML = "";
        win.Calendly.initInlineWidget({
          url,
          parentElement: containerRef.current,
        });
        return true;
      } catch {
        return false;
      }
    };

    const startPolling = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }

      intervalId = window.setInterval(() => {
        if (cancelled) {
          if (intervalId !== null) {
            window.clearInterval(intervalId);
          }
          return;
        }

        if (mountWidget()) {
          if (intervalId !== null) {
            window.clearInterval(intervalId);
          }
          return;
        }

        attempts += 1;
        if (attempts > 80) {
          if (intervalId !== null) {
            window.clearInterval(intervalId);
          }
          setFallbackToIframe(true);
        }
      }, 200);
    };

    const existingScript = document.getElementById(CALENDLY_SCRIPT_ID) as HTMLScriptElement | null;
    const onScriptLoad = () => {
      if (!cancelled && !mountWidget()) {
        startPolling();
      }
    };

    if (mountWidget()) {
      return () => {
        cancelled = true;
      };
    }

    if (existingScript) {
      existingScript.addEventListener("load", onScriptLoad);
      startPolling();
      return () => {
        cancelled = true;
        existingScript.removeEventListener("load", onScriptLoad);
        if (intervalId !== null) {
          window.clearInterval(intervalId);
        }
      };
    }

    const script = document.createElement("script");
    script.id = CALENDLY_SCRIPT_ID;
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", onScriptLoad);
    document.body.appendChild(script);
    startPolling();

    return () => {
      cancelled = true;
      script.removeEventListener("load", onScriptLoad);
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [url]);

  if (fallbackToIframe) {
    return (
      <iframe
        src={url}
        title="Calendly scheduler"
        className={className}
        style={{ minWidth: "320px", height: "700px" }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
