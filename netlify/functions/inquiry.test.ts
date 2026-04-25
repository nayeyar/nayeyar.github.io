import { afterEach, describe, expect, it, vi } from "vitest";

import { handler } from "./inquiry";

describe("Netlify inquiry handler", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("rejects requests from disallowed origins", async () => {
    const response = await handler({
      httpMethod: "POST",
      headers: { origin: "https://example.com" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        project: "Test project",
      }),
    });

    expect(response.statusCode).toBe(403);
    expect(JSON.parse(response.body)).toEqual({
      error: "Inquiry origin is not allowed.",
    });
  });

  it("returns a configuration error when the Resend key is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const response = await handler({
      httpMethod: "POST",
      headers: { origin: "https://nayeyar.github.io" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        project: "Test project",
      }),
    });

    expect(response.statusCode).toBe(503);
    expect(JSON.parse(response.body)).toEqual({
      error:
        "Inquiry service is not configured. Set RESEND_API_KEY on the server to enable submissions.",
    });
  });

  it("rejects invalid inquiry payloads before calling Resend", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    const fetchSpy = vi.spyOn(global, "fetch");

    const response = await handler({
      httpMethod: "POST",
      headers: { origin: "https://nayeyar.github.io" },
      body: JSON.stringify({
        name: "",
        email: "bad-email",
        project: "",
      }),
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({
      error: "Invalid inquiry fields.",
    });
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
