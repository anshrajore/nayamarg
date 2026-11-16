"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  Users,
  CalendarCheck,
  BarChart3,
  Building2,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeOrg, setActiveOrg] = useState("Precision Forge & Tools Ltd.");

  const navItems = [
    { label: "Overview", href: "/employer", icon: LayoutDashboard },
    { label: "Post a Job", href: "/employer/jobs/new", icon: PlusCircle, highlight: true },
    { label: "My Jobs", href: "/employer/jobs", icon: Briefcase },
    { label: "Candidates", href: "/employer/candidates", icon: Users },
    { label: "Interviews", href: "/employer/interviews", icon: CalendarCheck },
    { label: "Recruitment Reports", href: "/employer/reports", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/[0.08] bg-[#0A0D14]/90 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                nayamarg<span className="text-emerald-400">.</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                Employer
              </span>
            </Link>
          </div>

          {/* Org Switcher */}
          <div className="mt-5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="truncate text-left">
                <p className="text-xs font-semibold text-white truncate">{activeOrg}</p>
                <p className="text-[10px] text-gray-400">MIDC Nashik Unit 1</p>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold shadow-sm"
                      : item.highlight
                      ? "text-emerald-300 bg-white/[0.02] hover:bg-emerald-500/10 hover:text-emerald-300 border border-emerald-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-gray-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer shortcuts */}
        <div className="pt-6 border-t border-white/[0.06] space-y-3">
          <Link
            href="/employer/profile"
            className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-gray-300 text-xs hover:bg-emerald-500/10 hover:text-emerald-300 hover:border-emerald-500/30 transition-all"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Company Profile</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
          </Link>
          <div className="text-[11px] text-gray-500 flex items-center justify-between px-1">
            <span>NayaMarg 2.0 Engine</span>
            <span className="text-emerald-400 font-mono">v2.1.0</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-white/[0.06] bg-[#0A0D14]/50 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium capitalize">
              {pathname === "/employer" ? "Overview" : pathname.replace("/employer/", "").replace("-", " ")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/employer/jobs/new"
              className="px-4 py-1.5 rounded-full bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-lg active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post New Requirement</span>
            </Link>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-full bg-white/[0.04] text-xs text-gray-300 hover:text-white border border-white/10"
            >
              Public View
            </Link>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
