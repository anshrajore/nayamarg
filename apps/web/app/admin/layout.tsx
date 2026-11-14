"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldAlert,
  Activity,
  Layers,
  PhoneCall,
  AlertOctagon,
  Cpu,
  Database,
  ArrowUpRight,
  Radio,
  FileText,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Command Centre", href: "/admin", icon: Activity },
    { label: "Recruitment Runs", href: "/admin/runs/run-9001", icon: Layers },
    { label: "Live Call Monitor", href: "/admin/calls/live", icon: Radio, pulse: true },
    { label: "Exception Inbox", href: "/admin/exceptions", icon: AlertOctagon, badge: "3" },
  ];

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/[0.08] bg-[#090C12]/95 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                nayamarg<span className="text-blue-500">.</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 font-bold">
                Admin
              </span>
            </Link>
          </div>

          {/* System status pill */}
          <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-gray-300">Orchestrator: ACTIVE</span>
            </div>
            <span className="text-emerald-400">0.998 SLA</span>
          </div>

          {/* Navigation links */}
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
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-gray-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.pulse && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded-full bg-red-500/20 text-red-400 text-[10px] font-mono font-bold border border-red-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom shortcuts */}
        <div className="pt-6 border-t border-white/[0.06] space-y-3">
          <Link
            href="/employer"
            className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-xs hover:bg-emerald-900/30 transition-all"
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span>Employer Workspace</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
          </Link>
          <div className="text-[11px] text-gray-500 flex items-center justify-between px-1">
            <span>Kernel Concurrency: 1</span>
            <span className="text-blue-400 font-mono">Sarvam AI PSTN</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-white/[0.06] bg-[#080B10]/60 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium capitalize">
              {pathname === "/admin" ? "Command Centre" : pathname.replace("/admin/", "").replace("-", " ")}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-gray-300">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>PostGIS Spatial: OK</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-gray-300">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Sarvam Voice: 12ms</span>
            </div>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-full bg-white/[0.04] text-xs text-gray-300 hover:text-white border border-white/10"
            >
              Public Home
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
