"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, AlertCircle, Users, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { calculateVacancyCapacity } from "@nayamarg/domain";

export function RecruitmentPipelineMatrix() {
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

  const slots = [
    { slotNumber: 1, status: "FILLED", workerName: "Ramesh Pawar", joinedDate: "2026-11-10", badge: "Joined" },
    { slotNumber: 2, status: "FILLED", workerName: "Santosh Shinde", joinedDate: "2026-11-11", badge: "Joined" },
    { slotNumber: 3, status: "FILLED", workerName: "Ganesh Jadhav", joinedDate: "2026-11-11", badge: "Joined" },
    { slotNumber: 4, status: "FILLED", workerName: "Nilesh Patil", joinedDate: "2026-11-12", badge: "Joined" },
    { slotNumber: 5, status: "FILLED", workerName: "Rahul More", joinedDate: "2026-11-12", badge: "Joined" },
    { slotNumber: 6, status: "FILLED", workerName: "Deepak Gaikwad", joinedDate: "2026-11-13", badge: "Joined" },
    { slotNumber: 7, status: "OFFER_PENDING", workerName: "Amit Kulkarni", expiry: "23h remaining", badge: "Offer Reserved" },
    { slotNumber: 8, status: "OFFER_PENDING", workerName: "Vikas Deshmukh", expiry: "41h remaining", badge: "Offer Reserved" },
    { slotNumber: 9, status: "OPEN", workerName: "Active Outreach...", badge: "Seeking Match" },
    { slotNumber: 10, status: "OPEN", workerName: "Active Outreach...", badge: "Seeking Match" },
  ];

  return (
    <section id="vacancy-matrix" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            Deterministic Vacancy Accounting (Section 2 & 10)
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Vacancy Slots vs. Pipeline Capacity
          </h2>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl">
            A candidate saying "yes" on a call does not mean the position is filled. We enforce strict transactional
            slot reservations and stage-weighted pipeline targets.
          </p>
        </div>

        {/* Dynamic Capacity Status Pill */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-[#12151D] border border-white/10 flex items-center gap-3">
            <div>
              <span className="text-[10px] uppercase font-mono text-gray-400 block">Current Status</span>
              <span className="text-xs font-bold text-brand-electricLime">
                {capacity.status} ({capacity.remainingVacancies} Vacancies Open)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pipeline Metric Banners */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-[#0D0F14] border border-white/5">
          <span className="text-xs text-gray-400 font-medium">1. Required Vacancies</span>
          <div className="text-2xl font-black text-white mt-1">{pipelineData.requiredVacancies}</div>
          <span className="text-[11px] text-gray-500">Employer hiring target</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0D0F14] border border-white/5">
          <span className="text-xs text-gray-400 font-medium">2. Target Candidate Pool (1.5x)</span>
          <div className="text-2xl font-black text-purple-400 mt-1">{capacity.targetCandidatePool}</div>
          <span className="text-[11px] text-gray-500">Ceil(Remaining × 1.5)</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0D0F14] border border-white/5">
          <span className="text-xs text-gray-400 font-medium">3. Weighted Active Pipeline</span>
          <div className="text-2xl font-black text-brand-electricLime mt-1">{capacity.weightedPipelineScore}</div>
          <span className="text-[11px] text-emerald-500">Raw candidates: {capacity.rawActivePipeline}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0D0F14] border border-white/5">
          <span className="text-xs text-gray-400 font-medium">4. Additional Outreach Needed</span>
          <div className="text-2xl font-black text-blue-400 mt-1">{capacity.additionalCandidatesNeeded}</div>
          <span className="text-[11px] text-gray-500">Auto-pauses when 0</span>
        </div>
      </div>

      {/* 10 Individual Vacancy Slots Grid */}
      <div className="rounded-card bg-[#0D0F14] border border-white/10 p-6">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5">
          <h3 className="font-bold text-white text-sm">
            Hiring Request #HR-1001: 10 Individual Vacancy Slots
          </h3>
          <span className="text-xs text-gray-400">
            6 Joined • 2 Offer Reservations • 2 Open
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {slots.map((slot) => (
            <div
              key={slot.slotNumber}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                slot.status === "FILLED"
                  ? "bg-emerald-500/[0.04] border-emerald-500/25 hover:border-emerald-500/40"
                  : slot.status === "OFFER_PENDING"
                  ? "bg-amber-500/[0.04] border-amber-500/25 hover:border-amber-500/40"
                  : "bg-white/[0.02] border-dashed border-white/10 hover:border-white/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-gray-400">
                    SLOT #{String(slot.slotNumber).padStart(2, "0")}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      slot.status === "FILLED"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : slot.status === "OFFER_PENDING"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    {slot.badge}
                  </span>
                </div>

                <div className="font-semibold text-xs text-white truncate">{slot.workerName}</div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 text-[11px] text-gray-400 flex items-center justify-between">
                {slot.status === "FILLED" ? (
                  <>
                    <span className="text-emerald-400/80">Start Date</span>
                    <span className="text-gray-300 font-mono">{slot.joinedDate}</span>
                  </>
                ) : slot.status === "OFFER_PENDING" ? (
                  <>
                    <span className="text-amber-400/80">Lease Expiry</span>
                    <span className="text-gray-300 font-mono">{slot.expiry}</span>
                  </>
                ) : (
                  <span className="text-blue-400">Calling candidate queue</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
