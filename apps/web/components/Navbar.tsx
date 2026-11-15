"use client";

import React, { useState } from "react";
import { Globe, ArrowRight, Sparkles } from "lucide-react";

export function Navbar({
  activeTab = "all",
  onTabChange = () => {},
}: {
  activeTab?: "all" | "employer" | "worker";
  onTabChange?: (tab: "all" | "employer" | "worker") => void;
}) {
  const [lang, setLang] = useState<"EN" | "HI" | "MR">("EN");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-5 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-4 px-7 py-3 rounded-full bg-[#0D0F14]/75 backdrop-blur-2xl border border-white/[0.08] shadow-2xl max-w-6xl w-full">
        {/* Logo matching reference "artfolio" style: bold lowercase modern font */}
        <a href="#" className="flex items-center gap-1.5 group">
          <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-gray-200 transition-colors">
            nayamarg<span className="text-emerald-400">.</span>
          </span>
        </a>

        {/* Center Pill Nav Bar */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5 text-xs text-gray-400">
          <button
            onClick={() => onTabChange("all")}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeTab === "all" ? "bg-white/10 text-white font-medium" : "hover:text-white"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onTabChange("employer")}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeTab === "employer" ? "bg-white/10 text-white font-medium" : "hover:text-white"
            }`}
          >
            For Employers
          </button>
          <button
            onClick={() => onTabChange("worker")}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeTab === "worker" ? "bg-white/10 text-white font-medium" : "hover:text-white"
            }`}
          >
            Find Work
          </button>
          <a href="#how-it-works" className="px-4 py-1.5 rounded-full hover:text-white transition-all">
            How It Works
          </a>
          <a href="#featured-talent" className="px-4 py-1.5 rounded-full hover:text-white transition-all">
            Featured Talent
          </a>
        </div>

        {/* Right CTA Links */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 text-[11px] font-mono text-gray-400 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/5">
            <Globe className="w-3 h-3 text-gray-400 mr-0.5" />
            <button
              onClick={() => setLang(lang === "EN" ? "HI" : lang === "HI" ? "MR" : "EN")}
              className="text-white hover:text-emerald-400 transition-colors font-semibold"
            >
              {lang}
            </button>
          </div>

          <a href="#auth" className="hidden sm:inline-block text-xs font-medium text-gray-300 hover:text-white transition-colors">
            Sign In
          </a>

          <a
            href="#join"
            className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-200 transition-all shadow-lg active:scale-95 flex items-center gap-1.5"
          >
            <span>Hire Talent</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </nav>
    </header>
  );
}
