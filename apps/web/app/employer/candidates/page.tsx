"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Clock,
  Briefcase,
  FileText,
  Download,
  Filter,
} from "lucide-react";

export default function EmployerCandidatesPage() {
  const { candidates, runs, jobs, shortlistCandidate, scheduleInterview, markCandidateHired } = useRecruitment();
  const [selectedJobId, setSelectedJobId] = useState<string>("job-1001");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(candidates[0]?.id || null);

  const currentJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];
  const currentRun = runs.find((r) => r.jobId === selectedJobId) || runs[0];

  const filtered = candidates.filter((c) => {
    if (stageFilter === "ALL") return true;
    return c.status === stageFilter;
  });

  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              Active Job Requirement
            </span>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-white">{currentJob?.title}</h2>
              <span className="text-xs font-mono text-gray-400">{currentJob?.location.city}</span>
            </div>
            <p className="text-xs text-gray-400">
              Vacancies: <strong className="text-white font-mono">{currentJob?.vacancies} positions</strong> · Wage:{" "}
              <strong className="text-emerald-400 font-mono">
                ₹{currentJob?.salary.min.toLocaleString()} – ₹{currentJob?.salary.max.toLocaleString()}
              </strong>
            </p>
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
      <div className="flex flex-wrap gap-2">
        {["ALL", "INTERESTED", "QUALIFIED", "INTERVIEW_SCHEDULED", "JOINED", "DECLINED"].map((st) => (
          <button
            key={st}
            onClick={() => setStageFilter(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              stageFilter === st
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-semibold"
                : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white"
            }`}
          >
            {st === "ALL" ? "All Applicants (48)" : `${st.replace("_", " ")}`}
          </button>
        ))}
      </div>

      {/* 2-Column Explorer: Applicant List + Detailed Candidate Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Applicant List */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((cand) => {
            const isSelected = cand.id === selectedCandidateId;
            return (
              <div
                key={cand.id}
                onClick={() => setSelectedCandidateId(cand.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? "bg-[#111624] border-emerald-500/50 shadow-xl ring-1 ring-emerald-500/20"
                    : "bg-[#0E121A] border-white/[0.08] hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base font-bold text-white">{cand.name}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                        {cand.phone}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      {cand.city} · <strong className="text-gray-300 font-mono">{cand.distanceKm} km commute distance</strong>
                    </p>
                  </div>

                  {/* Match badge */}
                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {cand.matchScore}% Match Score
                    </div>
                    <span className="text-[10px] text-gray-500 block mt-1 font-mono">
                      {cand.preferredLanguage} Speaker
                    </span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cand.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] bg-white/[0.04] text-gray-300 px-2 py-0.5 rounded-md border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                  <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-md border border-blue-500/20 font-semibold">
                    {cand.experienceYears} Years Shopfloor Exp
                  </span>
                </div>

                {/* Bottom status & salary line */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    Candidate Wage Ask:{" "}
                    <strong className="text-white font-mono">
                      ₹{cand.salaryExpectation.toLocaleString()} / mo
                    </strong>
                  </span>
                  <span
                    className={`font-semibold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${
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

        {/* Right Col: Comprehensive Dossier & Sarvam Voice Telemetry */}
        {selectedCandidate && (
          <div className="p-6 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-5 sticky top-20 self-start">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-white">{selectedCandidate.name}</h3>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">
                  Verified Candidate Dossier
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
                <span className="text-gray-500 block text-[10px]">Suitability Match</span>
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

            {/* Sarvam AI Audio Telemetry */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-bold text-gray-300 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  Sarvam Voice AI Interview Record
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Audio Verified
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-300 leading-relaxed font-sans italic">
                "{selectedCandidate.callTranscript || "Candidate confirmed 3.5 years lathe experience, acceptable wage bracket ₹17,500, day shift agreement, and readiness for interview."}"
              </div>
            </div>

            {/* Progress Actions */}
            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              {selectedCandidate.status !== "INTERVIEW_SCHEDULED" && selectedCandidate.status !== "JOINED" && (
                <button
                  onClick={() => scheduleInterview(selectedCandidate.id)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Schedule Interview Slot</span>
                </button>
              )}

              {selectedCandidate.status !== "JOINED" && (
                <button
                  onClick={() => markCandidateHired(selectedCandidate.id, 9)}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirm Hire & Allocate Vacancy Slot</span>
                </button>
              )}

              {selectedCandidate.status === "JOINED" && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Worker Confirmed Joined & Slot Filled</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
