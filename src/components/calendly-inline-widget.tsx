"use client";

type CalendlyInlineWidgetProps = {
  url: string;
  className?: string;
};

export function CalendlyInlineWidget({ url, className }: CalendlyInlineWidgetProps) {
  return (
    <iframe
      src={url}
      title="Calendly scheduler"
      className={className}
      style={{ width: "100%", minWidth: "320px", height: "700px", border: 0, display: "block" }}
    />
  );
}
