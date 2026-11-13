"use client";

import React from "react";
import { Layers, MapPin, Mic, CalendarCheck, CheckCircle2, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Employer Submits Vacancy",
      desc: "Define roles, required vacancies, salary bracket, shift, and commute radius. NayaMarg creates immutable requirement snapshots.",
      icon: Layers,
      tag: "Deterministic Planning",
    },
    {
      step: "02",
      title: "PostGIS Geospatial Discovery",
      desc: "Our engine filters verified workers within the exact commute radius and ranks them by skill, experience, and availability.",
      icon: MapPin,
      tag: "Explainable Scoring",
    },
    {
      step: "03",
      title: "Sarvam AI Voice Conversation",
      desc: "Our voice agent conducts structured conversations in Hindi, Marathi, or English. It confirms interest, salary fit, and availability.",
      icon: Mic,
      tag: "TRAI / DLT Compliant",
    },
    {
      step: "04",
      title: "Employer Reviews & Interviews",
      desc: "Employers receive ready-to-interview candidate shortlists with verified experience and confirmed joining dates.",
      icon: CalendarCheck,
      tag: "Stage-Weighted Pipeline",
    },
    {
      step: "05",
      title: "Joining Confirmation & Closure",
      desc: "Positions are marked filled only upon verified joining confirmation. Outreach auto-pauses when target coverage is reached.",
      icon: CheckCircle2,
      tag: "Slot Reservations",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.06] gap-4">
        <div>
          <span className="text-[11px] uppercase font-mono tracking-widest text-emerald-400 font-semibold block mb-2">
            END-TO-END PROCESS
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            How NayaMarg <span className="font-serif-italic font-normal">Operates</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl font-normal">
            A fully managed recruitment lifecycle powered by autonomous voice qualification and strict database
            accounting.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-[24px] bg-[#0A0C11] border border-white/[0.07] hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-gray-500 group-hover:text-emerald-400 transition-colors">
                    {st.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] text-gray-300 group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-white font-bold text-sm mb-2">{st.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-normal">{st.desc}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.05]">
                <span className="text-[10px] font-mono text-gray-500 group-hover:text-gray-400">
                  {st.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
