const DEFAULT_ALLOWED_ORIGINS = [
  "https://nayeyar.github.io",
  "http://localhost:3000",
  "http://localhost:8888",
];

function parseAllowedOrigins() {
  const raw = process.env.INQUIRY_ALLOWED_ORIGINS;
  if (!raw) {
    return DEFAULT_ALLOWED_ORIGINS;
  }

  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function getCorsHeaders(origin, allowedOrigins) {
  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : "";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(statusCode, body, origin, allowedOrigins) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      ...getCorsHeaders(origin, allowedOrigins),
    },
    body: JSON.stringify(body),
  };
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseInquiryPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const project = String(payload.project ?? "").trim();

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

export async function handler(event) {
  const allowedOrigins = parseAllowedOrigins();
  const origin = event.headers.origin || event.headers.Origin || "";

  if (event.httpMethod === "OPTIONS") {
    const headers = getCorsHeaders(origin, allowedOrigins);
    const statusCode = headers["Access-Control-Allow-Origin"] ? 204 : 403;
    return {
      statusCode,
      headers,
      body: "",
    };
  }

  if (!origin || !allowedOrigins.includes(origin)) {
    return json(403, { error: "Inquiry origin is not allowed." }, origin, allowedOrigins);
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." }, origin, allowedOrigins);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return json(
      503,
      {
        error:
          "Inquiry service is not configured. Set RESEND_API_KEY on the server to enable submissions.",
      },
      origin,
      allowedOrigins,
    );
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON payload." }, origin, allowedOrigins);
  }

  const inquiry = parseInquiryPayload(body);
  if (!inquiry) {
    return json(400, { error: "Invalid inquiry fields." }, origin, allowedOrigins);
  }

  const to = process.env.INQUIRY_TO_EMAIL || "nayayeyar2230@gmail.com";
  const from = process.env.INQUIRY_FROM_EMAIL || "Portfolio Inquiry <onboarding@resend.dev>";

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

      return json(
        502,
        { error: `Email delivery failed: ${resendMessage}.${guidance}` },
        origin,
        allowedOrigins,
      );
    }

    return json(200, { success: true }, origin, allowedOrigins);
  } catch {
    return json(
      500,
      { error: "Unexpected error while sending inquiry email." },
      origin,
      allowedOrigins,
    );
  }
}
