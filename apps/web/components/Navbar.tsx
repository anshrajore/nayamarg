"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, ArrowRight, ShieldAlert, Sparkles, Building2, Users, ChevronDown } from "lucide-react";

export function Navbar({
  activeTab,
  onTabChange,
}: {
  activeTab?: "all" | "employer" | "worker";
  onTabChange?: (tab: "all" | "employer" | "worker") => void;
}) {
  const [lang, setLang] = useState<"EN" | "HI" | "MR">("EN");
  const [showSignInMenu, setShowSignInMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 sm:py-5 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-4 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#0B0E14]/90 backdrop-blur-2xl border border-white/[0.08] shadow-2xl max-w-6xl w-full">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-1.5 group shrink-0">
          <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            nayamarg<span className="text-emerald-400">.</span>
          </span>
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5 text-xs text-gray-400">
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-full hover:text-white transition-all text-white font-medium"
          >
            Overview
          </Link>
          <Link
            href="/employer"
            className="px-3.5 py-1.5 rounded-full hover:text-emerald-300 transition-all flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>For Employers</span>
          </Link>
          <Link
            href="/worker"
            className="px-3.5 py-1.5 rounded-full hover:text-amber-300 transition-all flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>For Workers (कामगार)</span>
          </Link>
          <Link
            href="/#radar"
            className="px-3.5 py-1.5 rounded-full hover:text-white transition-all"
          >
            Geospatial Radar
          </Link>
        </div>

        {/* Right CTA Links & Role Login Menu */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Vernacular Language Switcher */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-gray-400 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/5">
            <Globe className="w-3 h-3 text-gray-400 mr-0.5" />
            <button
              onClick={() => setLang(lang === "EN" ? "HI" : lang === "HI" ? "MR" : "EN")}
              className="text-white hover:text-emerald-400 transition-colors font-semibold"
              title="Switch display language"
            >
              {lang}
            </button>
          </div>

          {/* Role Sign In Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSignInMenu(!showSignInMenu)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-gray-300 hover:text-white transition-colors bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 flex items-center gap-1"
            >
              <span>Sign In</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {showSignInMenu && (
              <div
                className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0E121A]/95 border border-white/10 shadow-2xl backdrop-blur-2xl p-1.5 text-xs z-50 animate-fadeIn"
                onMouseLeave={() => setShowSignInMenu(false)}
              >
                <Link
                  href="/login?role=employer"
                  onClick={() => setShowSignInMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-emerald-500/10 text-gray-300 hover:text-emerald-300 transition-colors"
                >
                  <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Employer Portal</span>
                    <span className="text-[10px] text-gray-400">Post jobs & hire</span>
                  </div>
                </Link>

                <Link
                  href="/login?role=worker"
                  onClick={() => setShowSignInMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-amber-500/10 text-gray-300 hover:text-amber-300 transition-colors"
                >
                  <Users className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Worker Portal</span>
                    <span className="text-[10px] text-gray-400">कामगार नोंदणी व नोकरी</span>
                  </div>
                </Link>

                <div className="border-t border-white/5 my-1" />

                <Link
                  href="/login?role=staff"
                  onClick={() => setShowSignInMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-blue-500/10 text-gray-400 hover:text-blue-300 transition-colors text-[11px]"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Operations Console</span>
                </Link>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <Link
            href="/employer/jobs/new"
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500 text-black text-xs font-extrabold hover:bg-emerald-400 transition-all shadow-lg active:scale-95 flex items-center gap-1.5"
          >
            <span>Post a Job</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
