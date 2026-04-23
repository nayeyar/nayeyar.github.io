import type { Metadata } from "next";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/600.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";

import { AsciiBackground } from "@/components/ascii-background";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Nay Ayeyar | Software & AI Engineer",
  description:
    "Portfolio for Nay Ayeyar, a software and AI engineer building modern products, web systems, and applied AI experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-[var(--background)] font-sans text-[var(--foreground)] antialiased"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AsciiBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
