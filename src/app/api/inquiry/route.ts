import { NextResponse } from "next/server";

type InquiryPayload = {
  name: string;
  email: string;
  project: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseInquiryPayload(payload: unknown): InquiryPayload | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const raw = payload as Record<string, unknown>;
  const name = String(raw.name ?? "").trim();
  const email = String(raw.email ?? "").trim();
  const project = String(raw.project ?? "").trim();

  if (!name || name.length > 120) {
    return null;
  }
  if (!isValidEmail(email) || email.length > 320) {
    return null;
  }
  if (!project || project.length > 5000) {
    return null;
  }

  return { name, email, project };
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json(
      {
        error:
          "Inquiry service is not configured. Set RESEND_API_KEY on the server to enable submissions.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const inquiry = parseInquiryPayload(body);
  if (!inquiry) {
    return NextResponse.json({ error: "Invalid inquiry fields." }, { status: 400 });
  }

  const to = process.env.INQUIRY_TO_EMAIL ?? "nayayeyar2230@gmail.com";
  const from = process.env.INQUIRY_FROM_EMAIL ?? "Portfolio Inquiry <onboarding@resend.dev>";

  const subject = `Project inquiry from ${inquiry.name}`;
  const text = [
    "New project inquiry",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    "",
    "Project details:",
    inquiry.project,
  ].join("\n");

  const html = `
    <h2>New project inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
    <p><strong>Project details:</strong></p>
    <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(inquiry.project)}</pre>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: inquiry.email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response
        .json()
        .catch(async () => ({ message: await response.text() }));
      const resendMessage =
        typeof errorBody?.message === "string" && errorBody.message.trim().length > 0
          ? errorBody.message.trim()
          : "Unknown provider error.";

      const normalized = resendMessage.toLowerCase();
      const guidance =
        normalized.includes("testing emails") || normalized.includes("verify a domain")
          ? " Configure INQUIRY_FROM_EMAIL with a verified sender and INQUIRY_TO_EMAIL with an allowed recipient."
          : "";

      return NextResponse.json(
        { error: `Email delivery failed: ${resendMessage}.${guidance}` },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while sending inquiry email." },
      { status: 500 },
    );
  }
}
