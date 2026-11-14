"use client";

import React from "react";
import { useRecruitment } from "@/lib/RecruitmentContext";
import {
  BarChart3,
  Download,
  CheckCircle2,
  Users,
  PhoneCall,
  Clock,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function EmployerReportsPage() {
  const { runs } = useRecruitment();
  const currentRun = runs[0];

  const funnelStages = [
    { name: "PostGIS Discovered", count: 150, pct: "100%", color: "bg-blue-500" },
    { name: "Outreach Dispatched", count: 42, pct: "28%", color: "bg-indigo-500" },
    { name: "Voice Connected & Interested", count: 18, pct: "12%", color: "bg-purple-500" },
    { name: "Interview Ready", count: 12, pct: "8%", color: "bg-amber-500" },
    { name: "Employer Selected", count: 8, pct: "5.3%", color: "bg-teal-500" },
    { name: "Confirmed Joined (Filled)", count: 6, pct: "4%", color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Recruitment Performance Report</h1>
          <p className="text-xs text-gray-400 mt-1">
            Machine Operator (10 Vacancies) · Satpur Plant Nashik · Autonomous Funnel Analytics
          </p>
        </div>
        <button
          onClick={() => alert("Recruitment Audit PDF generated and ready for download.")}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2 border border-white/10 transition-all self-start"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Audit PDF</span>
        </button>
      </div>

      {/* Top 4 Summary Cards (Spec Section 12.2) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08]">
          <span className="text-xs text-gray-400">Candidates Contacted</span>
          <div className="text-3xl font-extrabold text-white mt-2 font-mono">42</div>
          <span className="text-[11px] text-gray-500">Sequential Sarvam calls</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08]">
          <span className="text-xs text-gray-400">Expressed Interest</span>
          <div className="text-3xl font-extrabold text-purple-400 mt-2 font-mono">18</div>
          <span className="text-[11px] text-purple-400/80">42.8% Conversion rate</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08]">
          <span className="text-xs text-gray-400">Interview Ready</span>
          <div className="text-3xl font-extrabold text-blue-400 mt-2 font-mono">12</div>
          <span className="text-[11px] text-blue-400/80">Available within 7 days</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08]">
          <span className="text-xs text-gray-400">Confirmed Joined</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2 font-mono">6</div>
          <span className="text-[11px] text-emerald-400/80">6 of 10 Vacancies filled</span>
        </div>
      </div>

      {/* Funnel Graph Card */}
      <div className="p-6 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Recruitment Funnel Conversion Matrix
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            End-to-end autonomous progression from PostGIS spatial coordinates to verified on-site joinings.
          </p>
        </div>

        <div className="space-y-3.5">
          {funnelStages.map((stage) => (
            <div key={stage.name} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300 font-medium">{stage.name}</span>
                <span className="font-mono text-gray-400">
                  <strong className="text-white">{stage.count}</strong> candidates ({stage.pct})
                </span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div
                  className={`h-full ${stage.color} rounded-full transition-all duration-700`}
                  style={{ width: stage.pct }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Efficiency Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-1">
          <span className="text-xs text-gray-400">Average Conversation Duration</span>
          <div className="text-2xl font-bold text-white font-mono">2m 14s</div>
          <p className="text-[11px] text-gray-500">Sarvam Multilingual Voice Agent (hi-IN / mr-IN)</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-1">
          <span className="text-xs text-gray-400">Vacancy Fulfilment Rate</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono">60.0%</div>
          <p className="text-[11px] text-gray-500">6 confirmed slots / 10 required slots</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-1">
          <span className="text-xs text-gray-400">Time to First Qualified Batch</span>
          <div className="text-2xl font-bold text-blue-400 font-mono">44 Minutes</div>
          <p className="text-[11px] text-gray-500">From job publishing to 10 qualified interviews</p>
        </div>
      </div>
    </div>
  );
}
