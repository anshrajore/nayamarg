"use client";

import React from "react";
import Link from "next/link";
import { useRecruitment } from "@/lib/RecruitmentContext";
import {
  Users,
  CheckCircle2,
  Clock,
  UserCheck,
  Briefcase,
  ArrowRight,
  PhoneCall,
  Sparkles,
  MapPin,
  Calendar,
  AlertCircle,
  Pause,
  Play,
} from "lucide-react";

export default function EmployerOverview() {
  const { jobs, runs, candidates, pauseRun, resumeRun } = useRecruitment();

  const totalRequired = runs.reduce((acc, r) => acc + r.requiredVacancies, 0);
  const totalFilled = runs.reduce((acc, r) => acc + r.filledVacancies, 0);
  const totalInterested = runs.reduce((acc, r) => acc + r.interestedCount, 0);
  const totalSelected = runs.reduce((acc, r) => acc + r.selectedCount, 0);

  const fillPercentage = totalRequired > 0 ? Math.round((totalFilled / totalRequired) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Top Welcome & KPI Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          Recruitment Workspace
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-medium">
            Autonomous Engine Live
          </span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Precision Forge & Tools Ltd. · Operational monitoring across active hiring requirements
        </p>
      </div>

      {/* 4 Distinct Vacancy Metrics (Spec Section 2) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Required */}
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08] relative overflow-hidden group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Required Vacancies</span>
            <Briefcase className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mt-3 font-mono">
            {totalRequired}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Employer approved hiring quota</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5" />
        </div>

        {/* Metric 2: Interested */}
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08] relative overflow-hidden group hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Interested Candidates</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-blue-400 mt-3 font-mono">
            {totalInterested}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Confirmed via Sarvam Voice AI</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500/30" />
        </div>

        {/* Metric 3: Selected */}
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08] relative overflow-hidden group hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Selected / Reserved</span>
            <UserCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400 mt-3 font-mono">
            {totalSelected}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Temporary slot reservation active</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500/30" />
        </div>

        {/* Metric 4: Joined */}
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08] relative overflow-hidden group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Joined Workers</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-3 font-mono">
            {totalFilled}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Confirmed hiring outcome (Filled)</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500" />
        </div>
      </div>

      {/* Vacancy Accounting Banner (Spec Section 2: Rule A-E) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-[#0E121A] to-blue-950/20 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Hiring Fulfilment Status
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h2 className="text-lg font-bold text-white">
            {totalFilled} of {totalRequired} Vacancies Confirmed Joined ({fillPercentage}%)
          </h2>
          <p className="text-xs text-gray-400 max-w-xl">
            {totalRequired - totalFilled > 0
              ? `Recruitment engine is actively continuing candidate discovery and outreach for the remaining ${
                  totalRequired - totalFilled
                } open vacancies.`
              : "All positions filled! System transitioned to post-selection retention monitoring."}
          </p>
        </div>

        {/* Progress gauge */}
        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between text-xs font-mono text-gray-400">
            <span>Slot Fill Progress</span>
            <span className="text-emerald-400 font-bold">{fillPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, fillPercentage)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>6 Joined</span>
            <span>2 Reserved</span>
            <span>2 Open</span>
          </div>
        </div>
      </div>

      {/* Main 2-column Section: Active Recruitment Runs + Candidate Shortlist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Runs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              Active Recruitment Runs ({runs.length})
            </h3>
            <Link
              href="/employer/jobs"
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
            >
              <span>View All Requirements</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {runs.map((run) => (
              <div
                key={run.id}
                className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08] hover:border-white/20 transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white hover:text-emerald-400 transition-colors">
                        {run.jobTitle}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {run.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        {run.city}
                      </span>
                      <span>•</span>
                      <span>Target Pool: {run.targetCandidatePool}</span>
                      <span>•</span>
                      <span>Batch #{run.currentBatch}</span>
                    </div>
                  </div>

                  {/* Status pill & Controls */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                        run.status === "RUNNING"
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : run.status === "PIPELINE_READY"
                          ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                          : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {run.status}
                    </span>
                    {run.status === "RUNNING" ? (
                      <button
                        onClick={() => pauseRun(run.id)}
                        title="Pause Outbound Calls"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-all"
                      >
                        <Pause className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => resumeRun(run.id)}
                        title="Resume Campaign"
                        className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-all"
                      >
                        <Play className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Live Call Simulator / Current Telephony Action */}
                {run.activeCallCandidate && (
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          Current Outreach: {run.activeCallCandidate}
                        </p>
                        <p className="text-[11px] text-emerald-400">{run.activeCallStatus}</p>
                      </div>
                    </div>
                    <span className="font-mono text-gray-400">00:{run.activeCallDurationSec ?? 24}s</span>
                  </div>
                )}

                {/* 10-Slot Vacancy Grid */}
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-2 font-mono">
                    <span>Individual Vacancy Slots (10 Total)</span>
                    <span>
                      {run.slots.filter((s) => s.status === "FILLED").length} Filled ·{" "}
                      {run.slots.filter((s) => s.status === "RESERVED").length} Reserved ·{" "}
                      {run.slots.filter((s) => s.status === "OPEN").length} Open
                    </span>
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                    {run.slots.map((slot) => (
                      <div
                        key={slot.slotNumber}
                        className={`p-2 rounded-lg text-center border text-[11px] font-mono transition-all ${
                          slot.status === "FILLED"
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold"
                            : slot.status === "RESERVED"
                            ? "bg-amber-500/20 border-amber-500/40 text-amber-300 font-medium animate-pulse"
                            : "bg-white/[0.02] border-white/10 text-gray-500"
                        }`}
                        title={
                          slot.status === "FILLED"
                            ? `Slot #${slot.slotNumber}: Confirmed Joined (${slot.assignedCandidateName})`
                            : slot.status === "RESERVED"
                            ? `Slot #${slot.slotNumber}: Reserved for ${slot.assignedCandidateName} (Expires: ${slot.reservationExpiresAt})`
                            : `Slot #${slot.slotNumber}: Open Vacancy`
                        }
                      >
                        #{slot.slotNumber}
                        <div className="text-[9px] uppercase tracking-tighter truncate mt-0.5">
                          {slot.status === "FILLED" ? "Hired" : slot.status === "RESERVED" ? "Hold" : "Open"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/[0.06] text-xs">
                  <div className="text-gray-400">
                    Latest event:{" "}
                    <span className="text-gray-200">
                      {run.workflowEvents[run.workflowEvents.length - 1]?.description}
                    </span>
                  </div>
                  <Link
                    href={`/admin/runs/${run.id}`}
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                  >
                    <span>Run Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Candidate Pipeline & Interview Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              Verified Pipeline
            </h3>
            <Link
              href="/employer/candidates"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              See All
            </Link>
          </div>

          <div className="space-y-3">
            {candidates.slice(0, 4).map((cand) => (
              <div
                key={cand.id}
                className="p-4 rounded-xl bg-[#0E121A] border border-white/[0.08] hover:border-emerald-500/30 transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">{cand.name}</h5>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      {cand.city} ({cand.distanceKm} km away)
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {cand.matchScore}% Match
                    </span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1">
                  {cand.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] bg-white/[0.04] text-gray-300 px-2 py-0.5 rounded-md border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Exp: {cand.experienceYears} yrs</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-full ${
                      cand.status === "JOINED"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : cand.status === "INTERVIEW_SCHEDULED"
                        ? "bg-blue-500/15 text-blue-400"
                        : cand.status === "INTERESTED"
                        ? "bg-purple-500/15 text-purple-400"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    {cand.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Support Banner */}
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-300">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Autonomous Guarantee</span>
            </div>
            <p className="text-gray-400 text-[11px]">
              Every candidate is verified via Sarvam Voice for distance, wage bracket, and shift agreement before interview scheduling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
