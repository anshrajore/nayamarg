"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  PhoneCall,
  MapPin,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Layers,
  Volume2,
  Cpu,
  Wrench,
  Gauge,
  Truck,
  Activity,
  Boxes,
} from "lucide-react";

export function HeroSection({
  onSelectRole,
}: {
  onSelectRole: (role: "employer" | "worker") => void;
}) {
  const [activeCardIndex, setActiveCardIndex] = useState(1);

  const campaigns = [
    {
      id: "camp_1",
      tradeCode: "TRADE-CNC-01",
      title: "Machine Operator",
      cluster: "Ambad MIDC, Nashik",
      icon: Cpu,
      vacancies: 10,
      filled: 6,
      salary: "₹15,000 – ₹18,000",
      shift: "Day Shift",
      minExp: "1–3 yrs experience",
      description: "Lathe and CNC milling operations with safety compliance and verifiable shop-floor experience.",
      statusText: "Active Voice Outreach",
      activeBadgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      voiceLanguage: "Hindi & Marathi",
      audioPreview: "मशीन ऑपरेटर • ₹15k–₹18k • डे शिफ्ट",
    },
    {
      id: "camp_2",
      tradeCode: "TRADE-QA-02",
      title: "Quality Inspector",
      cluster: "Chakan Industrial Zone, Pune",
      icon: Gauge,
      vacancies: 5,
      filled: 4,
      salary: "₹18,000 – ₹22,000",
      shift: "Rotational Shift",
      minExp: "2+ yrs experience",
      description: "Vernier caliper, micrometre, and ISO 9001 automotive component dimensional testing.",
      statusText: "Pipeline Ready (1.5x Target Reached)",
      activeBadgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      voiceLanguage: "Marathi & English",
      audioPreview: "क्वालिटी चेकर • ISO 9001 • चाकण",
    },
    {
      id: "camp_3",
      tradeCode: "TRADE-LOG-03",
      title: "Logistics Lead",
      cluster: "Bhiwandi Hub, Mumbai",
      icon: Boxes,
      vacancies: 8,
      filled: 5,
      salary: "₹20,000 – ₹24,000",
      shift: "Day / Night Shifts",
      minExp: "3+ yrs experience",
      description: "High-density warehouse management, inventory scanning, team supervision, and dispatch dispatching.",
      statusText: "Slot Reservations Active",
      activeBadgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      voiceLanguage: "Hindi & English",
      audioPreview: "लॉजिस्टिक्स सुपरवाइजर • भिवंडी हब",
    },
  ];

  const handlePrev = () => {
    setActiveCardIndex((prev) => (prev === 0 ? campaigns.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev === campaigns.length - 1 ? 0 : prev + 1));
  };

  const industries = [
    { title: "Manufacturing & Machining", loc: "Nashik Hub", icon: Wrench, wage: "₹15k – ₹20k" },
    { title: "Automotive Component QA", loc: "Pune Cluster", icon: Gauge, wage: "₹18k – ₹24k" },
    { title: "Heavy Logistics & WMS", loc: "Bhiwandi Hub", icon: Truck, wage: "₹18k – ₹25k" },
    { title: "Industrial Fabrication", loc: "Surat Zone", icon: Cpu, wage: "₹16k – ₹22k" },
    { title: "Electrical Maintenance", loc: "Nagpur Plant", icon: Activity, wage: "₹17k – ₹23k" },
    { title: "Supply Chain Operations", loc: "Thane Corridor", icon: Boxes, wage: "₹19k – ₹26k" },
    { title: "Assembly & Packaging", loc: "Aurangabad", icon: Layers, wage: "₹14k – ₹18k" },
  ];

  return (
    <section className="relative pt-36 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Diffused green ambient light from reference */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-emerald-500/[0.08] blur-[150px] pointer-events-none rounded-full" />

      {/* Top Pill Capsule */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-[11px] font-medium text-gray-300">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Voice-First Autonomous Hiring</span>
        </div>
      </div>

      {/* Headline with exact Typography pairing */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.12]">
          We connect <span className="font-serif-italic font-normal text-white">the best</span>
          <br />
          <span className="font-serif-italic font-normal text-white">workers</span> in this country
        </h1>
        <p className="mt-5 text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
          NayaMarg was born from a simple idea: every hard-working person deserves a worthy stage, and every employer
          deserves effortless hiring without manual chaos.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
          <button
            onClick={() => onSelectRole("employer")}
            className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wide hover:bg-gray-100 transition-all shadow-xl active:scale-95 flex items-center gap-2"
          >
            <span>Hire Verified Talent</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onSelectRole("worker")}
            className="px-6 py-3 rounded-full bg-white/[0.05] border border-white/10 text-white font-medium text-xs hover:bg-white/[0.09] transition-all"
          >
            Find Work (नौकरी खोजें)
          </button>
        </div>
      </div>

      {/* 3-Card Carousel matching Reference Image Layout without fake people */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-12 mb-24">
        {/* Navigation Left Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous card"
          className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 text-gray-300 hover:text-white hover:bg-white/15 flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Navigation Right Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next card"
          className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 text-gray-300 hover:text-white hover:bg-white/15 flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* The 3 Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {campaigns.map((camp, idx) => {
            const isCenter = idx === activeCardIndex;
            const Icon = camp.icon;
            return (
              <div
                key={camp.id}
                onClick={() => setActiveCardIndex(idx)}
                className={`art-card p-6 flex flex-col justify-between cursor-pointer ${
                  isCenter ? "center-glow border-white/20 bg-[#0E1118]/85" : "opacity-85 hover:opacity-100"
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <span className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center text-[10px]">
                        <Volume2 className="w-3 h-3 text-emerald-400" />
                      </span>
                      <span className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center text-[10px]">
                        <ShieldCheck className="w-3 h-3 text-blue-400" />
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/[0.05] text-gray-300 border border-white/5">
                      {camp.tradeCode}
                    </span>
                  </div>

                  {/* Centered Trade Icon & Title */}
                  <div className="flex flex-col items-center text-center mt-5 mb-4">
                    <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3 shadow-lg">
                      <Icon className="w-7 h-7 text-emerald-400" />
                    </div>

                    <h3 className="text-white font-bold text-base tracking-tight">{camp.title}</h3>
                    <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-red-400" />
                      {camp.cluster}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border mt-2 ${camp.activeBadgeColor}`}>
                      {camp.statusText}
                    </span>
                  </div>

                  {/* Operational Description */}
                  <p className="text-gray-300 text-xs text-center leading-relaxed mb-6 font-normal">
                    "{camp.description}"
                  </p>
                </div>

                {/* Bottom Stats Pills */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <div className="text-center flex-1">
                    <span className="text-gray-500 block text-[9px] uppercase">WAGE</span>
                    <span className="text-emerald-400 font-semibold">{camp.salary}</span>
                  </div>
                  <div className="text-center flex-1 border-x border-white/5">
                    <span className="text-gray-500 block text-[9px] uppercase">VACANCIES</span>
                    <span className="text-white font-semibold">
                      {camp.filled} / {camp.vacancies}
                    </span>
                  </div>
                  <div className="text-center flex-1">
                    <span className="text-gray-500 block text-[9px] uppercase">LANGUAGE</span>
                    <span className="text-blue-400 font-semibold">{camp.voiceLanguage}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Horizontal Staggered Trade Categories (Clean geometric cards without stock photos) */}
      <div className="mt-8 mb-20">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase font-mono tracking-widest text-gray-500 font-semibold">
            VERIFIED INDUSTRY TRADES • AUTOMATED PIPELINES
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {industries.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-4 border border-white/[0.08] bg-[#0A0C11] hover:border-white/20 transition-all flex flex-col justify-between aspect-[4/5]"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] text-gray-300 group-hover:text-emerald-400 flex items-center justify-center transition-colors mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-white font-bold text-xs leading-tight block mb-1">{item.title}</span>
                  <span className="text-gray-400 text-[10px] flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-red-400" />
                    {item.loc}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/[0.04]">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block">{item.wage}</span>
                  <span className="text-[9px] text-gray-500">Verified Demand</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
