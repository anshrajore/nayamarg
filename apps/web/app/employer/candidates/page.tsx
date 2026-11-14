"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useRecruitment } from "@/lib/RecruitmentContext";
import {
  Users,
  MapPin,
  CheckCircle2,
  CalendarCheck,
  PhoneCall,
  Volume2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Filter,
} from "lucide-react";

function EmployerCandidatesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stageParam = searchParams.get("stage");

  const { candidates, runs, shortlistCandidate, scheduleInterview, markCandidateHired } = useRecruitment();
  
  // Map stageParam to internal status or filter
  const initialFilter = stageParam === "reviewing"
    ? "QUALIFIED"
    : stageParam === "offer"
    ? "INTERVIEW_SCHEDULED"
    : stageParam === "joining"
    ? "JOINED"
    : "ALL";

  const [filter, setFilter] = useState(initialFilter);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(candidates[0]?.id || null);

  useEffect(() => {
    if (stageParam === "reviewing") setFilter("QUALIFIED");
    else if (stageParam === "offer") setFilter("INTERVIEW_SCHEDULED");
    else if (stageParam === "joining") setFilter("JOINED");
  }, [stageParam]);

  const filtered = candidates.filter((c) => {
    if (filter === "ALL") return true;
    return c.status === filter;
  });

  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];

  const handleFilterClick = (st: string) => {
    setFilter(st);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (st === "ALL") params.delete("stage");
    else if (st === "QUALIFIED") params.set("stage", "reviewing");
    else if (st === "INTERVIEW_SCHEDULED") params.set("stage", "offer");
    else if (st === "JOINED") params.set("stage", "joining");
    else params.set("status", st.toLowerCase());
    
    const query = params.toString();
    router.push(`/employer/candidates${query ? `?${query}` : ""}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Candidate Pipeline & Voice Records</h1>
        <p className="text-xs text-gray-400 mt-1">
          Review candidates pre-qualified by Sarvam Voice AI for skills, commute distance, shift availability, and wage agreement.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {["ALL", "INTERESTED", "QUALIFIED", "INTERVIEW_SCHEDULED", "JOINED", "DECLINED"].map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => handleFilterClick(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              filter === st
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-semibold"
                : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white"
            }`}
          >
            {st === "ALL" ? "All Candidates" : st.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* 2-Column Explorer: Candidate List + Candidate Deep Dive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Cards */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((cand) => {
            const isSelected = cand.id === selectedCandidateId;
            return (
              <div
                key={cand.id}
                onClick={() => setSelectedCandidateId(cand.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#111622] border-emerald-500/40 shadow-lg ring-1 ring-emerald-500/20"
                    : "bg-[#0E121A] border-white/[0.08] hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{cand.name}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                        {cand.phone}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      {cand.city} · <strong className="text-gray-300 font-mono">{cand.distanceKm} km commute</strong>
                    </p>
                  </div>

                  {/* Match badge */}
                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {cand.matchScore}% Match
                    </div>
                    <span className="text-[10px] text-gray-500 block mt-1">
                      {cand.preferredLanguage} Speaker
                    </span>
                  </div>
                </div>

                {/* Skills & Experience */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cand.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] bg-white/[0.04] text-gray-300 px-2 py-0.5 rounded-md border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                  <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-md border border-blue-500/20 font-semibold">
                    {cand.experienceYears} Years Exp
                  </span>
                </div>

                {/* Bottom Status bar */}
                <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    Wage Expectation:{" "}
                    <strong className="text-white font-mono">
                      ₹{cand.salaryExpectation.toLocaleString()}
                    </strong>
                  </span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${
                      cand.status === "JOINED"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : cand.status === "INTERVIEW_SCHEDULED"
                        ? "bg-blue-500/20 text-blue-400"
                        : cand.status === "INTERESTED"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    {cand.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Candidate Profile & Telephony Details */}
        {selectedCandidate && (
          <div className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-5 sticky top-20 self-start">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-white">{selectedCandidate.name}</h3>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">
                  Verified Candidate Profile
                </p>
              </div>
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-gray-500 block text-[10px]">PostGIS Proximity</span>
                <span className="font-bold text-white font-mono">{selectedCandidate.distanceKm} km</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-gray-500 block text-[10px]">Suitability Score</span>
                <span className="font-bold text-emerald-400 font-mono">{selectedCandidate.matchScore}%</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-gray-500 block text-[10px]">Joining Window</span>
                <span className="font-bold text-white">{selectedCandidate.availableFrom || "Immediate"}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-gray-500 block text-[10px]">Preferred Tongue</span>
                <span className="font-bold text-white">{selectedCandidate.preferredLanguage}</span>
              </div>
            </div>

            {/* Voice call transcript */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-bold text-gray-300 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  Sarvam Voice AI Transcript
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Audio Verified
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-300 leading-relaxed font-sans italic">
                "{selectedCandidate.callTranscript || "Voice recording and structured extraction verified."}"
              </div>
            </div>

            {/* Actions for this candidate */}
            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              {selectedCandidate.status !== "INTERVIEW_SCHEDULED" && selectedCandidate.status !== "JOINED" && (
                <button
                  type="button"
                  onClick={() => scheduleInterview(selectedCandidate.id)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Schedule Interview</span>
                </button>
              )}

              {selectedCandidate.status !== "JOINED" && (
                <button
                  type="button"
                  onClick={() => markCandidateHired(selectedCandidate.id, 9)}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirm Hire (Allocate Open Slot)</span>
                </button>
              )}

              {selectedCandidate.status === "JOINED" && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Candidate Successfully Joined & Slot Filled</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EmployerCandidatesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-gray-400">Loading Candidates...</div>}>
      <EmployerCandidatesContent />
    </Suspense>
  );
}
