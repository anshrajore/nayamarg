"use client";

import React from "react";
import { PhoneCall, ShieldCheck, Activity, Cpu, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-6 px-6 py-3 rounded-pill bg-[#101319]/80 backdrop-blur-xl border border-white/10 shadow-2xl max-w-6xl w-full">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-brand-blue to-brand-purple flex items-center justify-center shadow-lg shadow-blue-500/20">
            <PhoneCall className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white">NayaMarg</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-brand-blue/20 text-blue-400 border border-blue-500/30">
                2.0 OS
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium -mt-0.5">Voice-first Recruitment</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-black/30 p-1 rounded-full border border-white/5">
          <a
            href="#orchestrator"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          >
            Orchestrator
          </a>
          <a
            href="#voice-simulator"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-brand-electricYellow" />
            Live Voice AI
          </a>
          <a
            href="#vacancy-matrix"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          >
            Vacancy Matrix
          </a>
          <a
            href="#failure-centre"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <Activity className="w-3 h-3 text-brand-neonGreen" />
            Failure Centre
          </a>
          <a
            href="#architecture"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          >
            Architecture
          </a>
        </div>

        {/* Live System State Indicators */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold">Sarvam & Telephony Online</span>
          </div>

          <a
            href="#voice-simulator"
            className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-white/20 active:scale-95"
          >
            Test Call Flow
          </a>
        </div>
      </nav>
    </header>
  );
}
