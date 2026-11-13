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
  SlidersHorizontal,
  Volume2,
} from "lucide-react";

export function HeroSection({
  onSelectRole,
}: {
  onSelectRole: (role: "employer" | "worker") => void;
}) {
  const [activeCardIndex, setActiveCardIndex] = useState(1);

  const candidates = [
    {
      id: "cand_1",
      name: "Ramesh Pawar",
      handle: "@machine_operator",
      role: "CNC & Lathe Specialist",
      location: "Nashik, Maharashtra",
      distance: "4.8 km",
      experience: "3.5 yrs",
      salary: "₹18,000/mo",
      bio: "Machine operator focused on precision milling, safety compliance, and day shifts in Nashik.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      skills: ["Lathe", "CNC", "Safety"],
      verified: true,
      audioSnippet: "हाँ, मैं सोमवार से जॉइन कर सकता हूँ।",
    },
    {
      id: "cand_2",
      name: "Sunita Sharma",
      handle: "@quality_inspector",
      role: "Quality Assurance Inspector",
      location: "Chakan, Pune",
      distance: "6.2 km",
      experience: "4.0 yrs",
      salary: "₹21,000/mo",
      bio: "Automotive component inspection specialist. ISO 9001 trained, available immediately.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      skills: ["Quality", "ISO 9001", "Vernier"],
      verified: true,
      audioSnippet: "मी चाकण एमआयडीसी मध्ये 4 वर्षे काम केले आहे.",
    },
    {
      id: "cand_3",
      name: "Ganesh Jadhav",
      handle: "@warehouse_lead",
      role: "Logistics Inventory Supervisor",
      location: "Bhiwandi, Mumbai",
      distance: "8.4 km",
      experience: "5.0 yrs",
      salary: "₹24,000/mo",
      bio: "Warehouse operations leader with team management and barcoding inventory expertise.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      skills: ["WMS", "Dispatch", "Inventory"],
      verified: true,
      audioSnippet: "Yes, I manage 40+ pickers and daily dispatches.",
    },
  ];

  const handlePrev = () => {
    setActiveCardIndex((prev) => (prev === 0 ? candidates.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev === candidates.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative pt-36 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient background soft light */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Top Pill Capsule */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-[11px] font-medium text-gray-300">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Voice-First Autonomous Hiring</span>
        </div>
      </div>

      {/* Main Luxury Headline matching Reference Typography */}
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

        {/* Dual CTA Buttons */}
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

      {/* 3-Card Carousel matching Reference Image Layout */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-12 mb-24">
        {/* Navigation Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 text-gray-300 hover:text-white hover:bg-white/15 flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Navigation Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 text-gray-300 hover:text-white hover:bg-white/15 flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* The 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {candidates.map((cand, idx) => {
            const isCenter = idx === activeCardIndex;
            return (
              <div
                key={cand.id}
                onClick={() => setActiveCardIndex(idx)}
                className={`art-card p-6 flex flex-col justify-between cursor-pointer ${
                  isCenter ? "center-glow border-white/20 bg-[#0E1118]/85" : "opacity-85 hover:opacity-100"
                }`}
              >
                {/* Top icons bar */}
                <div>
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
                      {cand.distance} away
                    </span>
                  </div>

                  {/* Centered Avatar and Name */}
                  <div className="flex flex-col items-center text-center mt-5 mb-4">
                    <div className="relative mb-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white/10 shadow-lg"
                      />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0E1118]" />
                    </div>

                    <h3 className="text-white font-bold text-base tracking-tight">{cand.name}</h3>
                    <span className="text-xs text-gray-400 font-mono -mt-0.5">{cand.handle}</span>
                    <span className="text-[11px] text-emerald-400 font-semibold mt-1">{cand.role}</span>
                  </div>

                  {/* Bio quote */}
                  <p className="text-gray-300 text-xs text-center leading-relaxed mb-6 font-normal">
                    "{cand.bio}"
                  </p>
                </div>

                {/* Bottom Stats Pills */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <div className="text-center flex-1">
                    <span className="text-gray-500 block text-[9px] uppercase">EXP</span>
                    <span className="text-white font-semibold">{cand.experience}</span>
                  </div>
                  <div className="text-center flex-1 border-x border-white/5">
                    <span className="text-gray-500 block text-[9px] uppercase">SALARY</span>
                    <span className="text-emerald-400 font-semibold">{cand.salary}</span>
                  </div>
                  <div className="text-center flex-1">
                    <span className="text-gray-500 block text-[9px] uppercase">STATUS</span>
                    <span className="text-blue-400 font-semibold">Available</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Horizontal Staggered Visual Gallery Grid (Matching Middle Section of Reference Image) */}
      <div className="mt-8 mb-20">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase font-mono tracking-widest text-gray-500 font-semibold">
            REAL WORKFORCE • MANUFACTURING • LOGISTICS • RETAIL • SERVICES
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 opacity-90">
          {[
            { title: "Machine Operator", loc: "Nashik", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80" },
            { title: "Forklift Driver", loc: "Pune", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop&q=80" },
            { title: "Welder & Fitter", loc: "Surat", img: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=300&auto=format&fit=crop&q=80" },
            { title: "Quality Inspector", loc: "Chakan", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80" },
            { title: "Delivery Associate", loc: "Mumbai", img: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=300&auto=format&fit=crop&q=80" },
            { title: "Electrician", loc: "Nagpur", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&auto=format&fit=crop&q=80" },
            { title: "Store Supervisor", loc: "Thane", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/[0.08] bg-[#0E1015]"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3">
                <span className="text-white font-bold text-xs leading-tight">{item.title}</span>
                <span className="text-gray-400 text-[10px] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-2.5 h-2.5 text-emerald-400" />
                  {item.loc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
