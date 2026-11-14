"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  Users,
  UserCheck,
  CalendarCheck,
  Award,
  CheckCircle2,
  BarChart3,
  Building2,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeOrg, setActiveOrg] = useState("Precision Forge & Tools Ltd.");

  const navItems = [
    { label: "Overview", href: "/employer", icon: LayoutDashboard },
    { label: "Hiring requests", href: "/employer/jobs", icon: Briefcase },
    { label: "Applicants", href: "/employer/candidates", icon: Users, badge: "42" },
    { label: "Candidate review", href: "/employer/candidates?stage=reviewing", icon: UserCheck, badge: "10" },
    { label: "Interviews", href: "/employer/interviews", icon: CalendarCheck, badge: "8" },
    { label: "Offers", href: "/employer/candidates?stage=offer", icon: Award, badge: "4" },
    { label: "Joining", href: "/employer/candidates?stage=joining", icon: CheckCircle2, badge: "6" },
    { label: "Reports", href: "/employer/reports", icon: BarChart3 },
    { label: "Team", href: "/employer/team", icon: Users },
    { label: "Settings", href: "/employer/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col md:flex-row selection:bg-emerald-500 selection:text-black">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/[0.08] bg-[#0A0D14]/90 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/[0.06]">
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
          <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
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

          {/* Quick Create Hiring Request Button */}
          <div className="mt-4">
            <Link
              href="/employer/jobs/new"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Create hiring request</span>
            </Link>
          </div>

          {/* Nav links */}
          <div className="mt-5 text-[10px] font-mono uppercase tracking-wider text-gray-500 font-semibold px-2">
            WORKSPACE
          </div>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href.split("?")[0] && (!item.href.includes("?") || pathname === item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-gray-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-emerald-500 text-black"
                          : "bg-white/10 text-gray-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer shortcuts */}
        <div className="pt-4 border-t border-white/[0.06] space-y-2">
          <Link
            href="/admin"
            className="flex items-center justify-between p-2.5 rounded-xl bg-blue-950/20 border border-blue-500/20 text-blue-300 text-xs hover:bg-blue-900/30 transition-all"
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
              <span>Operations Console</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
          </Link>

          <div className="flex items-center justify-between text-xs text-gray-500 px-1 pt-1">
            <Link href="/" className="hover:text-white transition-colors">
              Website
            </Link>
            <Link href="/login" className="flex items-center gap-1 hover:text-red-400 transition-colors">
              <LogOut className="w-3 h-3" />
              <span>Sign out</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
