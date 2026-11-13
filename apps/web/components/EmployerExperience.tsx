"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Plus,
  SlidersHorizontal,
  Building2,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";
import { calculateVacancyCapacity } from "@nayamarg/domain";

export function EmployerExperience() {
  const [pipelineData, setPipelineData] = useState({
    requiredVacancies: 10,
    filledVacancies: 6,
    qualifiedInterestedCount: 6,
    shortlistedCount: 3,
    interviewScheduledCount: 2,
    offerPendingCount: 2,
    targetCoverageFactor: 1.5,
  });

  const capacity = calculateVacancyCapacity(pipelineData);

  const [activeTab, setActiveTab] = useState<"pipeline" | "vacancies" | "interviews">("pipeline");

  const candidatesInPipeline = [
    {
      id: "c1",
      name: "Ramesh Pawar",
      role: "Machine Operator",
      stage: "JOINED",
      score: 91,
      salary: "₹17,000/mo",
      distance: "4.8 km",
      interview: "Completed (Joined 10 Nov)",
    },
    {
      id: "c2",
      name: "Amit Kulkarni",
      role: "Machine Operator",
      stage: "OFFER_PENDING",
      score: 88,
      salary: "₹17,500/mo",
      distance: "6.2 km",
      interview: "Offer sent • 23h to accept",
    },
    {
      id: "c3",
      name: "Vikas Deshmukh",
      role: "Machine Operator",
      stage: "INTERVIEW_SCHEDULED",
      score: 85,
      salary: "₹16,500/mo",
      distance: "9.1 km",
      interview: "Tomorrow at 11:30 AM",
    },
    {
      id: "c4",
      name: "Sachin Borse",
      role: "Machine Operator",
      stage: "SHORTLISTED",
      score: 82,
      salary: "₹18,000/mo",
      distance: "12.0 km",
      interview: "Awaiting Employer Slot",
    },
  ];

  return (
    <section id="employer" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/[0.06] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5" />
            NayaMarg for Employers • Desktop-First Workspace
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
            Recruitment Workspace & <span className="font-serif-italic font-normal">Candidate Pipeline</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl font-normal">
            Manage vacancies, review AI-qualified worker shortlists, schedule interviews, and track joining outcomes
            without manual recruitment spreadsheets.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/5 rounded-full text-xs">
          <button
            onClick={() => setActiveTab("pipeline")}
            className={`px-4 py-1.5 rounded-full font-medium transition-all ${
              activeTab === "pipeline" ? "bg-white text-black font-semibold shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            Candidate Pipeline
          </button>
          <button
            onClick={() => setActiveTab("vacancies")}
            className={`px-4 py-1.5 rounded-full font-medium transition-all ${
              activeTab === "vacancies" ? "bg-white text-black font-semibold shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            10 Vacancy Slots
          </button>
        </div>
      </div>

      {/* Main Workspace Canvas */}
      <div className="rounded-[28px] bg-[#0A0C11] border border-white/[0.08] p-6 shadow-2xl">
        {/* Top Active Job Summary Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/[0.06] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                CAMPAIGN ACTIVE
              </span>
              <span className="text-xs text-gray-500 font-mono">Job ID: #HR-1001</span>
            </div>
            <h3 className="text-white font-bold text-lg">Machine Operator — Nashik Plant</h3>
            <span className="text-xs text-gray-400">
              ₹15,000–₹18,000/mo • Day Shift • 10 Vacancies • 25 km Search Radius
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 text-right">
              <span className="text-[10px] text-gray-500 uppercase font-mono block">FILLED / VACANCIES</span>
              <span className="text-sm font-bold text-white font-mono">
                {pipelineData.filledVacancies} of {pipelineData.requiredVacancies} Filled
              </span>
            </div>

            <button className="px-4 py-2.5 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-200 transition-all shadow active:scale-95 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Create Vacancy</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Stage-based Pipeline Table/Cards */}
        {activeTab === "pipeline" && (
          <div className="space-y-3">
            <div className="grid grid-cols-12 text-[11px] font-mono text-gray-500 px-4 py-2 uppercase tracking-wider">
              <span className="col-span-4">Candidate</span>
              <span className="col-span-3">Suitability & Distance</span>
              <span className="col-span-3">Recruitment Stage</span>
              <span className="col-span-2 text-right">Action</span>
            </div>

            {candidatesInPipeline.map((c) => (
              <div
                key={c.id}
                className="grid grid-cols-12 items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all text-xs"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                    {c.name.split(" ")[0][0]}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{c.name}</h4>
                    <span className="text-gray-400 text-[11px]">{c.role}</span>
                  </div>
                </div>

                <div className="col-span-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[11px]">
                    {c.score}% Match
                  </span>
                  <span className="text-gray-400 text-[11px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-400" />
                    {c.distance}
                  </span>
                </div>

                <div className="col-span-3">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      c.stage === "JOINED"
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                        : c.stage === "OFFER_PENDING"
                        ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        : "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    {c.interview}
                  </span>
                </div>

                <div className="col-span-2 text-right">
                  <button className="px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium transition-all">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: 10 Vacancy Slots Representation */}
        {activeTab === "vacancies" && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((slot) => {
              const isFilled = slot <= 6;
              const isPending = slot === 7 || slot === 8;
              return (
                <div
                  key={slot}
                  className={`p-4 rounded-2xl border flex flex-col justify-between ${
                    isFilled
                      ? "bg-emerald-500/[0.04] border-emerald-500/20"
                      : isPending
                      ? "bg-amber-500/[0.04] border-amber-500/20"
                      : "bg-white/[0.02] border-dashed border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-gray-400">SLOT #{slot}</span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        isFilled
                          ? "bg-emerald-500/20 text-emerald-300"
                          : isPending
                          ? "bg-amber-500/20 text-amber-300"
                          : "text-gray-500"
                      }`}
                    >
                      {isFilled ? "FILLED" : isPending ? "RESERVED" : "OPEN"}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-white truncate">
                    {isFilled
                      ? `Worker Joined #${slot}`
                      : isPending
                      ? "Offer Pending"
                      : "Outreach in Progress"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
