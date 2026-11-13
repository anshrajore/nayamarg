"use client";

import React, { useEffect, useRef } from "react";
import {
  Mic,
  MapPin,
  Bot,
  CheckCircle2,
  Users,
  Search,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Layers,
  PhoneForwarded,
} from "lucide-react";
import gsap from "gsap";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim-text", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".flow-pill-node", {
        scale: 0.85,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.4,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-purple-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 left-10 w-72 h-72 bg-emerald-500/10 blur-[90px] pointer-events-none rounded-full" />

      {/* Top Pill Tag */}
      <div className="flex justify-center mb-6">
        <div className="hero-anim-text inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-inner text-xs font-medium text-gray-300">
          <span className="flex h-2 w-2 rounded-full bg-brand-electricLime animate-pulse" />
          <span>NayaMarg 2.0 Autonomous Recruiter</span>
          <span className="text-gray-500">•</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            Sarvam AI Native <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Main Bold Visual Headline (Inspired by Reference Images 1 & 2) */}
      <div className="text-center max-w-5xl mx-auto mb-12">
        <h1 className="hero-anim-text text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
          Find. Contact.
          <span className="inline-block mx-3 px-5 py-1.5 rounded-full bg-gradient-to-r from-brand-blue to-indigo-600 text-white shadow-xl shadow-blue-500/25 border border-blue-400/30 text-4xl sm:text-5xl lg:text-6xl align-middle">
            Understand.
          </span>
          <br className="hidden sm:inline" />
          Qualify.
          <span className="relative inline-flex items-center mx-2 px-5 py-1 rounded-full bg-[#181D26] border border-brand-electricLime/40 text-brand-electricLime shadow-lg shadow-lime-500/10 text-4xl sm:text-5xl lg:text-6xl align-middle">
            <span className="mr-2 text-2xl font-mono">⚡</span> Hire.
          </span>
        </h1>

        <p className="hero-anim-text text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          NayaMarg operates the full recruitment cycle on behalf of employers. Vacancy planning, PostGIS radius search,
          conversational Sarvam voice calls in Hindi & Marathi, and deterministic vacancy slot accounting.
        </p>
      </div>

      {/* Fluid Connected Pill Flow Diagram (Inspired directly by Image 1 Capsule Layout) */}
      <div className="relative max-w-4xl mx-auto my-12 p-8 rounded-card bg-[#0D0F14]/90 border border-white/10 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/5 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="font-semibold text-white">AUTONOMOUS WORKFLOW PIPELINE</span>
            <span className="text-gray-500">| Job: #HR-1001 (Machine Operator - Nashik)</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-brand-neonGreen/10 text-brand-neonGreen border border-brand-neonGreen/30 text-[11px] font-mono font-bold">
            SEQUENTIAL CONCURRENCY: 1
          </span>
        </div>

        {/* Dynamic Nodes with Overlapping Capsules */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {/* Step 1 */}
          <div className="flow-pill-node p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">01 • INGESTION</span>
              <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">
                <Layers className="w-3.5 h-3.5" />
              </div>
            </div>
            <h3 className="text-white font-bold text-sm mb-1">10 Vacancies Published</h3>
            <p className="text-gray-400 text-xs">Nashik, ₹15k–₹18k/mo, Day shift, 1–5 yrs exp</p>
            <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-gray-300">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Job Spec Version 1.0</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flow-pill-node p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">02 • POSTGIS DISCOVERY</span>
              <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">
                <MapPin className="w-3.5 h-3.5" />
              </div>
            </div>
            <h3 className="text-white font-bold text-sm mb-1">150 Candidates Filtered</h3>
            <p className="text-gray-400 text-xs">25km radius from 19.9975, 73.7898</p>
            <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-gray-300">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Ranked 91% to 45% suitability</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flow-pill-node p-5 rounded-2xl bg-gradient-to-b from-blue-950/30 to-purple-950/30 border border-blue-500/30 shadow-lg shadow-blue-500/10 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold text-brand-electricYellow uppercase tracking-wider">03 • VOICE CALLING</span>
              <div className="w-7 h-7 rounded-full bg-brand-electricYellow/20 text-brand-electricYellow flex items-center justify-center text-xs animate-pulse">
                <Mic className="w-3.5 h-3.5" />
              </div>
            </div>
            <h3 className="text-white font-bold text-sm mb-1">Sarvam AI Conversation</h3>
            <p className="text-gray-400 text-xs">Sequential Hindi/Marathi candidate qualification</p>
            <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-brand-electricYellow">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-electricYellow animate-ping" />
              <span>Active Attempt: 42 contacted</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flow-pill-node p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">04 • OUTCOMES</span>
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <h3 className="text-white font-bold text-sm mb-1">6 Joined • 4 Remaining</h3>
            <p className="text-gray-400 text-xs">8 selected, 2 slots reserved, 4 open</p>
            <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Vacancy Slots Synchronized</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards (Inspired by Reference Image 1 metrics cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="p-5 rounded-2xl bg-[#101319] border border-white/5 flex flex-col">
          <span className="text-gray-400 text-xs font-medium">Target Vacancies</span>
          <span className="text-3xl font-extrabold text-white mt-1">10</span>
          <span className="text-[11px] text-gray-500 mt-2">Employer verified request</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#101319] border border-white/5 flex flex-col">
          <span className="text-gray-400 text-xs font-medium">Pipeline Target (1.5x)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-brand-electricLime">15</span>
            <span className="text-xs text-gray-400 font-semibold">candidates</span>
          </div>
          <span className="text-[11px] text-emerald-500/80 mt-2">Stops outreach when ready</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#101319] border border-white/5 flex flex-col">
          <span className="text-gray-400 text-xs font-medium">Connected Candidates</span>
          <span className="text-3xl font-extrabold text-white mt-1">18</span>
          <span className="text-[11px] text-blue-400 mt-2">12 agreed to interviews</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#101319] border border-white/5 flex flex-col">
          <span className="text-gray-400 text-xs font-medium">Confirmed Joinings</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white">6</span>
            <span className="text-xs text-gray-500">/ 10 filled</span>
          </div>
          <span className="text-[11px] text-purple-400 mt-2">Partially filled status</span>
        </div>
      </div>
    </section>
  );
}
