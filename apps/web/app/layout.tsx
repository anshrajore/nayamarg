import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "NayaMarg 2.0 — Voice-First Recruitment Platform",
  description:
    "Autonomous recruitment orchestrator powered by Sarvam AI, Supabase PostgreSQL, and deterministic vacancy slot accounting.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#08090C] text-gray-100 antialiased min-h-screen">
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <footer className="border-t border-white/5 py-12 px-6 text-center text-xs text-gray-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">NayaMarg 2.0</span>
                <span>•</span>
                <span>Production Recruitment Operations Platform</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <a href="#orchestrator" className="hover:text-white transition-colors">Orchestrator</a>
                <a href="#voice-simulator" className="hover:text-white transition-colors">Sarvam Voice AI</a>
                <a href="#failure-centre" className="hover:text-white transition-colors">Failure Centre</a>
              </div>
            </div>
          </footer>
        </SmoothScroll>
      </body>
    </html>
  );
}
