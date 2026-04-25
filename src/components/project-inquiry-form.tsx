"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

type ProjectInquiryFormProps = {
  email: string;
};

const inquiryApiUrl = process.env.NEXT_PUBLIC_INQUIRY_API_URL?.trim();

export function ProjectInquiryForm({ email }: ProjectInquiryFormProps) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inquiryApiUrl) {
      setSubmitStatus("idle");
      setSubmitError(
        "Inquiry form is not configured yet. Please use the direct email link below for now.",
      );
      return;
    }

    setSubmitStatus("submitting");
    setSubmitError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const senderEmail = String(formData.get("email") ?? "").trim();
    const project = String(formData.get("project") ?? "").trim();

    try {
      const response = await fetch(inquiryApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: senderEmail,
          project,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Inquiry submission failed.");
      }

      form.reset();
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("idle");
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Could not send inquiry right now. Please use the direct email link below.";
      setSubmitError(message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <label className="grid gap-2 text-sm">
          <span className="text-[var(--muted-strong)]">Name</span>
          <input
            required
            name="name"
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-[var(--muted-strong)]">Email</span>
          <input
            required
            type="email"
            name="email"
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-[var(--muted-strong)]">What are you building?</span>
          <textarea
            required
            name="project"
            rows={6}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
            placeholder="Project scope, timeline, team size, and where AI fits."
          />
        </label>
        <button
          type="submit"
          disabled={submitStatus === "submitting"}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          {submitStatus === "submitting" ? "Sending..." : "Send Inquiry"}
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-4 text-xs leading-6 text-[var(--muted)]" aria-live="polite">
        {submitStatus === "success"
          ? "Inquiry sent successfully. We will review your request and follow up as soon as possible."
          : "If submission fails, email directly at "}
        {submitStatus === "success" ? null : (
          <>
            <Link
              href={`mailto:${email}`}
              className="underline decoration-white/30 underline-offset-4"
            >
              {email}
            </Link>
            .
          </>
        )}
      </p>
      {submitError ? <p className="mt-2 text-xs text-rose-400">{submitError}</p> : null}
    </>
  );
}
