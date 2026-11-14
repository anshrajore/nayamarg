"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, ArrowRight, ShieldAlert, Sparkles, Building2, User } from "lucide-react";

export function Navbar({
  activeTab,
  onTabChange,
}: {
  activeTab: "all" | "employer" | "worker";
  onTabChange: (tab: "all" | "employer" | "worker") => void;
}) {
  const [lang, setLang] = useState<"EN" | "HI" | "MR">("EN");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-5 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-4 px-6 py-3 rounded-full bg-[#0D0F14]/85 backdrop-blur-2xl border border-white/[0.08] shadow-2xl max-w-6xl w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 group shrink-0">
          <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            nayamarg<span className="text-emerald-400">.</span>
          </span>
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5 text-xs text-gray-400">
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-full hover:text-white transition-all text-white font-medium"
          >
            Home
          </Link>
          <Link
            href="/employer"
            className="px-3.5 py-1.5 rounded-full hover:text-emerald-300 transition-all flex items-center gap-1.5"
          >
            <span>Employer Portal</span>
          </Link>
          <Link
            href="/worker"
            className="px-3.5 py-1.5 rounded-full hover:text-amber-300 transition-all flex items-center gap-1.5"
          >
            <span>Worker Portal</span>
          </Link>
          <Link
            href="/admin"
            className="px-3.5 py-1.5 rounded-full hover:text-blue-300 transition-all flex items-center gap-1.5 text-blue-400/90"
          >
            <ShieldAlert className="w-3 h-3 text-blue-400" />
            <span>Admin Console</span>
          </Link>
        </div>

        {/* Right CTA Links */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-gray-400 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/5">
            <Globe className="w-3 h-3 text-gray-400 mr-0.5" />
            <button
              onClick={() => setLang(lang === "EN" ? "HI" : lang === "HI" ? "MR" : "EN")}
              className="text-white hover:text-emerald-400 transition-colors font-semibold"
            >
              {lang}
            </button>
          </div>

          <Link
            href="/login"
            className="text-xs font-semibold text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>

          <Link
            href="/employer/jobs/new"
            className="px-4 py-2 rounded-full bg-emerald-500 text-black text-xs font-extrabold hover:bg-emerald-400 transition-all shadow-lg active:scale-95 flex items-center gap-1.5"
          >
            <span>Post a Job</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
