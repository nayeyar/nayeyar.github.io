import { describe, expect, it } from "vitest";
import { getPortfolioContent } from "@/lib/site-content";

describe("getPortfolioContent", () => {
  it("preserves the public portfolio contract for identity, assets, and booking links", () => {
    const content = getPortfolioContent();

    expect(content.identity.name).toBe("Nay Ayeyar");
    expect(content.identity.location).toBe("Dallas, TX");
    expect(content.identity.githubUrl).toBe("https://github.com/nayeyar");
    expect(content.identity.email).toBe("nayayeyar2230@gmail.com");
    expect(content.hero.profileImage.src).toBe("/resources/images/profilepic_788x788.png");
    expect(content.contact.videoSrc).toBe("/resources/images/video.mp4");
    expect(content.contact.bookingUrl).toBe("https://calendly.com/nayayeyar2230/30min");
  });
});
