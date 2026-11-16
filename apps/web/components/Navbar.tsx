"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthRole } from "@/lib/AuthRoleContext";
import {
  Globe,
  ArrowRight,
  Building2,
  User,
  ShieldAlert,
  LogOut,
  Briefcase,
  Users,
  BarChart3,
  PlusCircle,
  FileText,
  Volume2,
} from "lucide-react";

export function Navbar({
  activeTab,
  onTabChange,
}: {
  activeTab?: "all" | "employer" | "worker";
  onTabChange?: (tab: "all" | "employer" | "worker") => void;
}) {
  const pathname = usePathname();
  const { role, logout, employerProfile, workerProfile, adminProfile } = useAuthRole();
  const [lang, setLang] = useState<"EN" | "HI" | "MR">("EN");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-5 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-4 px-6 py-3 rounded-full bg-[#0D0F14]/90 backdrop-blur-2xl border border-white/[0.08] shadow-2xl max-w-6xl w-full">
        {/* Brand Logo & Role Tag */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link href={role === "employer" ? "/employer" : role === "worker" ? "/worker" : role === "admin" ? "/admin" : "/"} className="flex items-center gap-1.5 group">
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              nayamarg<span className="text-emerald-400">.</span>
            </span>
          </Link>
          {role === "employer" && (
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              Employer
            </span>
          )}
          {role === "worker" && (
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
              Worker
            </span>
          )}
          {role === "admin" && (
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
              Admin Ops
            </span>
          )}
        </div>

        {/* Dynamic Center Navigation Bar according to Role */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5 text-xs text-gray-400">
          {/* GUEST ROLE: Public Corporate Website navigation only (NO Admin Console visible) */}
          {role === "guest" && (
            <>
              <Link
                href="/"
                className={`px-4 py-1.5 rounded-full transition-all ${
                  pathname === "/" ? "bg-white/10 text-white font-medium" : "hover:text-white"
                }`}
              >
                Home
              </Link>
              <a href="/#employer" className="px-4 py-1.5 rounded-full hover:text-white transition-all">
                For Employers
              </a>
              <a href="/#worker" className="px-4 py-1.5 rounded-full hover:text-white transition-all">
                Find Work
              </a>
              <a href="/#how-it-works" className="px-4 py-1.5 rounded-full hover:text-white transition-all">
                How It Works
              </a>
              <a href="/#featured-talent" className="px-4 py-1.5 rounded-full hover:text-white transition-all">
                Featured Talent
              </a>
            </>
          )}

          {/* EMPLOYER ROLE: Employer Hiring Tools only (NO Worker Portal, NO Admin Console) */}
          {role === "employer" && (
            <>
              <Link
                href="/employer"
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  pathname === "/employer" ? "bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/20" : "hover:text-white"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/employer/jobs/new"
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  pathname === "/employer/jobs/new" ? "bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/20" : "hover:text-white"
                }`}
              >
                Post a Job
              </Link>
              <Link
                href="/employer/jobs"
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  pathname === "/employer/jobs" ? "bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/20" : "hover:text-white"
                }`}
              >
                My Jobs
              </Link>
              <Link
                href="/employer/candidates"
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  pathname === "/employer/candidates" ? "bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/20" : "hover:text-white"
                }`}
              >
                Applicants & Pipeline
              </Link>
              <Link
                href="/employer/reports"
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  pathname === "/employer/reports" ? "bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/20" : "hover:text-white"
                }`}
              >
                Reports
              </Link>
            </>
          )}

          {/* WORKER ROLE: Blue-collar Trade Tools only (NO Employer Portal, NO Admin Console) */}
          {role === "worker" && (
            <>
              <Link
                href="/worker"
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  pathname === "/worker" ? "bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/20" : "hover:text-white"
                }`}
              >
                Find Jobs (नोकऱ्या)
              </Link>
              <Link
                href="/worker/applications"
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  pathname === "/worker/applications" ? "bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/20" : "hover:text-white"
                }`}
              >
                My Applications
              </Link>
              <a
                href="/worker#audio-assistant"
                className="px-3.5 py-1.5 rounded-full hover:text-white transition-all flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Voice Assistant</span>
              </a>
            </>
          )}

          {/* ADMIN ROLE: Internal Platform Operations only */}
          {role === "admin" && (
            <>
              <Link
                href="/admin"
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  pathname === "/admin" ? "bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/30" : "hover:text-white"
                }`}
              >
                Command Centre
              </Link>
              <Link
                href="/admin/runs/run-9001"
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  pathname.startsWith("/admin/runs") ? "bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/30" : "hover:text-white"
                }`}
              >
                Recruitment Runs
              </Link>
              <Link
                href="/admin/calls/live"
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  pathname === "/admin/calls/live" ? "bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/30" : "hover:text-white"
                }`}
              >
                Live Telemetry
              </Link>
              <Link
                href="/admin/exceptions"
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  pathname === "/admin/exceptions" ? "bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/30" : "hover:text-white"
                }`}
              >
                Exceptions (3)
              </Link>
            </>
          )}
        </div>

        {/* Right CTA Actions according to Role */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Guest Action: Public Sign In & Hire Talent */}
          {role === "guest" && (
            <>
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
                href="/login?role=employer"
                className="px-4 py-2 rounded-full bg-emerald-500 text-black text-xs font-extrabold hover:bg-emerald-400 transition-all shadow-lg active:scale-95 flex items-center gap-1.5"
              >
                <span>Hire Talent</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </>
          )}

          {/* Employer Actions: Profile & Sign Out */}
          {role === "employer" && (
            <>
              <Link
                href="/employer/profile"
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  pathname === "/employer/profile"
                    ? "bg-emerald-500 text-black font-bold"
                    : "bg-white/[0.04] text-gray-300 hover:text-white border border-white/10"
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Company Profile</span>
              </Link>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-1.5 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all border border-white/5"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {/* Worker Actions: Language Toggle, Profile & Sign Out */}
          {role === "worker" && (
            <>
              <div className="flex items-center gap-1 text-[11px] font-mono text-gray-400 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/5">
                <button
                  onClick={() => setLang(lang === "EN" ? "HI" : lang === "HI" ? "MR" : "EN")}
                  className="text-white hover:text-amber-400 transition-colors font-bold"
                >
                  {lang === "EN" ? "English" : lang === "HI" ? "हिन्दी" : "मराठी"}
                </button>
              </div>

              <Link
                href="/worker/profile"
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  pathname === "/worker/profile"
                    ? "bg-amber-500 text-black font-bold"
                    : "bg-white/[0.04] text-gray-300 hover:text-white border border-white/10"
                }`}
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">My Profile</span>
              </Link>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-1.5 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all border border-white/5"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {/* Admin Actions: Staff Profile & Sign Out */}
          {role === "admin" && (
            <>
              <Link
                href="/admin/profile"
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  pathname === "/admin/profile"
                    ? "bg-blue-600 text-white font-bold"
                    : "bg-white/[0.04] text-gray-300 hover:text-white border border-white/10"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Staff Clearance</span>
              </Link>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-1.5 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all border border-white/5"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
