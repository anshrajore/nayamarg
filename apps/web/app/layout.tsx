import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "nayamarg. — Connecting the Finest Talent to Real Work",
  description:
    "Autonomous voice-first recruitment platform. Seamless hiring for employers, accessible multilingual opportunities for job seekers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#050608] text-gray-100 antialiased min-h-screen selection:bg-blue-600 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
