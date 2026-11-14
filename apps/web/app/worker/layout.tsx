"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  FileText,
  CalendarCheck,
  Award,
  User,
  Files,
  PhoneCall,
  HelpCircle,
  Settings,
  Globe,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [lang, setLang] = useState<"mr" | "hi" | "en">("mr");

  const navItems = [
    { label: "Overview", labelMR: "मुख्य पान", href: "/worker", icon: LayoutDashboard },
    { label: "Find jobs", labelMR: "नोकऱ्या शोधा", href: "/worker/jobs", icon: Search },
    { label: "My applications", labelMR: "माझे अर्ज", href: "/worker/applications", icon: FileText, badge: "3" },
    { label: "Interviews", labelMR: "मुलाखती", href: "/worker/interviews", icon: CalendarCheck, badge: "1" },
    { label: "Offers", labelMR: "ऑफर लेटर", href: "/worker/offers", icon: Award },
    { label: "Work profile", labelMR: "कामाचे प्रोफाइल", href: "/worker/onboarding", icon: User },
    { label: "Documents", labelMR: "कागदपत्रे", href: "/worker/documents", icon: Files },
    { label: "Communication", labelMR: "संवाद व संमती", href: "/worker/communication", icon: PhoneCall },
    { label: "Support", labelMR: "मदत व तक्रार", href: "/worker/support", icon: HelpCircle },
    { label: "Settings", labelMR: "सेटिंग्ज", href: "/worker/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#06080E] text-slate-100 flex flex-col md:flex-row selection:bg-amber-500 selection:text-black">
      {/* Desktop/Tablet Docked Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/[0.08] bg-[#0A0D14]/90 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand & Role Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/[0.06]">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-black text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                nayamarg<span className="text-amber-400">.</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                कामगार ॲप
              </span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-lg border border-white/[0.06] text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setLang("mr")}
                className={`px-1.5 py-0.5 rounded ${lang === "mr" ? "bg-amber-500 text-black font-extrabold" : "text-gray-400 hover:text-white"}`}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => setLang("hi")}
                className={`px-1.5 py-0.5 rounded ${lang === "hi" ? "bg-amber-500 text-black font-extrabold" : "text-gray-400 hover:text-white"}`}
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-1.5 py-0.5 rounded ${lang === "en" ? "bg-amber-500 text-black font-extrabold" : "text-gray-400 hover:text-white"}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Worker Verified Profile Pill */}
          <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-xs shrink-0">
                RT
              </div>
              <div className="truncate text-left">
                <p className="text-xs font-semibold text-white truncate">Ramesh Shinde</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified · Satpur MIDC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-5 text-[10px] font-mono uppercase tracking-wider text-gray-500 font-semibold px-2">
            WORKSPACE
          </div>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-gray-400"}`} />
                    <span>{lang === "mr" ? item.labelMR : item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-amber-500 text-black"
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

        {/* Bottom shortcuts */}
        <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Main Website
          </Link>
          <Link href="/login" className="flex items-center gap-1 hover:text-red-400 transition-colors">
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
