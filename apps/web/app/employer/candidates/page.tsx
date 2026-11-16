"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useRecruitment } from "@/lib/RecruitmentContext";
import {
  Users,
  CheckCircle2,
  CalendarCheck,
  PhoneCall,
  Volume2,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Download,
  Filter,
  Building2,
} from "lucide-react";

function EmployerCandidatesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stageParam = searchParams.get("stage");

  const { candidates, runs, jobs, shortlistCandidate, scheduleInterview, markCandidateHired } = useRecruitment();
  const [selectedJobId, setSelectedJobId] = useState<string>("job-1001");

  const initialFilter =
    stageParam === "reviewing"
      ? "QUALIFIED"
      : stageParam === "offer"
      ? "INTERVIEW_SCHEDULED"
      : stageParam === "joining"
      ? "JOINED"
      : "ALL";

  const [stageFilter, setStageFilter] = useState(initialFilter);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(candidates[0]?.id || null);

  useEffect(() => {
    if (stageParam === "reviewing") setStageFilter("QUALIFIED");
    else if (stageParam === "offer") setStageFilter("INTERVIEW_SCHEDULED");
    else if (stageParam === "joining") setStageFilter("JOINED");
  }, [stageParam]);

  const filtered = candidates.filter((c) => {
    if (stageFilter === "ALL") return true;
    return c.status === stageFilter;
  });

  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];

  const handleFilterClick = (st: string) => {
    setStageFilter(st);
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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Applicant Dossiers & Voice Progress Reports
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Review detailed candidate applications, PostGIS travel distances, and verified Sarvam conversational screening records.
          </p>
        </div>
        <button
          onClick={() => alert("Applicant Progress Report (PDF) exported successfully.")}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2 border border-white/10 transition-all self-start"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Applicant Report</span>
        </button>
      </div>

      {/* Requirement Selector & Application Counts Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#101522] via-[#0E121A] to-[#101522] border border-emerald-500/30 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Active Hiring Campaign Applicants</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  LIVE OUTREACH
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Target: 10 Machine Operators · Satpur MIDC Industrial Zone
              </p>
            </div>
          </div>

          {/* Job Picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Switch Job:</span>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#080B10] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500 font-medium"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} ({j.location.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4 Application Stage Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-white/[0.06]">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[11px] text-gray-400 block">Total Workers Applied</span>
            <div className="text-2xl font-bold text-white font-mono">48</div>
            <span className="text-[10px] text-gray-500">PostGIS matched pool</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[11px] text-gray-400 block">Pre-Qualified Voice AI</span>
            <div className="text-2xl font-bold text-purple-400 font-mono">18</div>
            <span className="text-[10px] text-purple-400/80">Sarvam verified fit</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[11px] text-gray-400 block">Interview Ready</span>
            <div className="text-2xl font-bold text-blue-400 font-mono">8</div>
            <span className="text-[10px] text-blue-400/80">Available within 7 days</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[11px] text-gray-400 block">Confirmed Joined</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono">6</div>
            <span className="text-[10px] text-emerald-400/80">Slots filled & verified</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-white/[0.06]">
        {["ALL", "INTERESTED", "QUALIFIED", "INTERVIEW_SCHEDULED", "JOINED", "DECLINED"].map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => handleFilterClick(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              stageFilter === st
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-semibold"
                : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white"
            }`}
          >
            {st.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Two Column Layout: Candidate List & Detailed Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Candidates List */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.map((candidate) => {
            const isSelected = candidate.id === selectedCandidate?.id;
            return (
              <div
                key={candidate.id}
                onClick={() => setSelectedCandidateId(candidate.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-[#111726] border-emerald-500/50 shadow-lg shadow-emerald-500/5"
                    : "bg-[#0A0D14] border-white/[0.06] hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center font-bold text-white text-sm">
                      {candidate.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        {candidate.name}
                        {candidate.verifiedTrade && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </h4>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        {candidate.city} · {candidate.distanceKm} km away
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                      candidate.status === "JOINED"
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : candidate.status === "INTERVIEW_SCHEDULED"
                        ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                        : candidate.status === "QUALIFIED"
                        ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
                        : "bg-gray-500/15 text-gray-400 border-gray-500/30"
                    }`}
                  >
                    {candidate.status}
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span>Match: {candidate.matchScore}%</span>
                  <span>Exp: {candidate.experienceYears}y</span>
                  <span className="text-emerald-400">₹{candidate.expectedSalary.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Candidate Dossier */}
        <div className="lg:col-span-7">
          {selectedCandidate ? (
            <div className="p-6 rounded-2xl bg-[#0A0D14] border border-white/[0.08] space-y-6 sticky top-24">
              {/* Dossier Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center font-bold text-white text-xl">
                    {selectedCandidate.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{selectedCandidate.name}</h3>
                      <span className="text-xs font-mono text-gray-400">({selectedCandidate.id})</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span>{selectedCandidate.phoneMasked}</span>
                      <span>•</span>
                      <span>Primary Lang: {selectedCandidate.preferredLanguage}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-400">Match Confidence</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {selectedCandidate.matchScore}%
                  </div>
                </div>
              </div>

              {/* Verified Voice Call Summary & Audio Snippet */}
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-purple-300">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-purple-400" />
                    Sarvam Voice AI Outreach Record
                  </span>
                  <span className="text-[10px] font-mono bg-purple-500/20 px-2 py-0.5 rounded text-purple-200">
                    CALL DURATION: 1m 42s
                  </span>
                </div>
                <div className="text-xs text-gray-300 italic bg-black/30 p-3 rounded-lg border border-purple-500/10">
                  "{selectedCandidate.voiceCallSummary || "Candidate confirmed 3 years experience on Fanuc 3-axis CNC machines. Agreed to rotational day/night shifts and confirmed commute distance of 4.2 km is acceptable."}"
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono pt-1">
                  <span>Speech-to-Text Model: Sarvam-1 Vernacular</span>
                  <span className="text-emerald-400">Consent Logged: TRAI Compliant</span>
                </div>
              </div>

              {/* Core Qualifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Experience</span>
                  <span className="text-white font-bold">{selectedCandidate.experienceYears} Years</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Travel Distance</span>
                  <span className="text-white font-bold">{selectedCandidate.distanceKm} km (MIDC Ring)</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Expected Wage</span>
                  <span className="text-white font-bold">₹{selectedCandidate.expectedSalary.toLocaleString()}/mo</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Shift Availability</span>
                  <span className="text-emerald-400 font-bold">Day & Night Shifts</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Notice Period</span>
                  <span className="text-white font-bold">Immediate (3 Days)</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Trade Skills</span>
                  <span className="text-blue-400 font-bold">{selectedCandidate.skills.join(", ")}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                {selectedCandidate.status !== "INTERVIEW_SCHEDULED" && selectedCandidate.status !== "JOINED" && (
                  <button
                    type="button"
                    onClick={() => scheduleInterview(selectedCandidate.id)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Schedule Interview Slot</span>
                  </button>
                )}

                {selectedCandidate.status !== "JOINED" && (
                  <button
                    type="button"
                    onClick={() => markCandidateHired(selectedCandidate.id, 9)}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm Hire & Allocate Vacancy Slot</span>
                  </button>
                )}

                <div className="text-[11px] text-gray-500 text-center font-mono pt-1">
                  All employer actions trigger automated webhook notifications to the candidate via SMS.
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500 border border-white/5 rounded-2xl">
              Select a candidate from the left to view dossier and voice records.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EmployerCandidatesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading candidate dossiers...</div>}>
      <EmployerCandidatesContent />
    </Suspense>
  );
}
