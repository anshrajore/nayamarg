"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Award, CheckCircle2, Sliders, ChevronRight } from "lucide-react";
import { scoreCandidate } from "@nayamarg/domain";

export function GeospatialRadar() {
  const [selectedCandidate, setSelectedCandidate] = useState(0);

  const candidatePool = [
    {
      name: "Ramesh Pawar",
      phone: "+91 98234-•••••",
      locality: "Ambad MIDC, Nashik",
      distanceKm: 4.8,
      experienceYears: 3.5,
      skills: ["machine_operation", "lathe_cutting", "safety_compliance"],
      availability: "AVAILABLE" as const,
      shift: "DAY",
      salaryMin: 16000,
      languages: ["hi-IN", "mr-IN"],
    },
    {
      name: "Santosh Shinde",
      phone: "+91 94031-•••••",
      locality: "Satpur Industrial Zone",
      distanceKm: 7.2,
      experienceYears: 2.0,
      skills: ["machine_operation", "lathe_cutting"],
      availability: "AVAILABLE" as const,
      shift: "DAY",
      salaryMin: 15500,
      languages: ["hi-IN", "mr-IN"],
    },
    {
      name: "Ganesh Jadhav",
      phone: "+91 98901-•••••",
      locality: "Deolali Gaon, Nashik",
      distanceKm: 11.5,
      experienceYears: 4.0,
      skills: ["machine_operation", "cnc_basic"],
      availability: "NOTICE_PERIOD" as const,
      shift: "ANY",
      salaryMin: 17500,
      languages: ["hi-IN", "mr-IN"],
    },
    {
      name: "Sunil Wagh",
      phone: "+91 97652-•••••",
      locality: "Sinnar Rural Outskirts",
      distanceKm: 22.4,
      experienceYears: 1.5,
      skills: ["machine_operation"],
      availability: "AVAILABLE" as const,
      shift: "DAY",
      salaryMin: 15000,
      languages: ["mr-IN"],
    },
  ];

  const current = candidatePool[selectedCandidate];
  const scoreResult = scoreCandidate({
    workerSkills: current.skills,
    requiredSkills: ["machine_operation", "lathe_cutting"],
    workerExperienceYears: current.experienceYears,
    requiredMinExpYears: 1,
    requiredMaxExpYears: 5,
    distanceKm: current.distanceKm,
    maxRadiusKm: 25.0,
    workerExpectedSalaryMin: current.salaryMin,
    jobSalaryMin: 15000,
    jobSalaryMax: 18000,
    workerAvailability: current.availability,
    workerShift: current.shift,
    jobShift: "DAY",
    workerLanguages: current.languages,
    jobLanguages: ["hi-IN", "mr-IN"],
  });

  return (
    <section id="orchestrator" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Navigation className="w-3.5 h-3.5" />
            PostGIS Spatial Discovery & Explainable Scoring (Section 5 & 10)
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Geospatial Candidate Ranking Engine
          </h2>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl">
            Hard constraints filter out-of-radius workers; multi-factor scoring ranks candidates by skill fit,
            verified commute distance, and salary compatibility.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-400 font-mono block">Geocenter: Nashik (422001)</span>
          <span className="text-xs font-bold text-white font-mono">19.9975° N, 73.7898° E (25 km radius)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Candidate List (5 Cols) */}
        <div className="lg:col-span-5 rounded-card bg-[#0D0F14] border border-white/10 p-5 flex flex-col gap-3">
          <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
            Discovered Candidates (Ranked)
          </span>

          {candidatePool.map((cand, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCandidate(idx)}
              className={`p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                selectedCandidate === idx
                  ? "bg-white/[0.08] border-brand-blue shadow-lg shadow-blue-500/10"
                  : "bg-white/[0.02] border-white/5 hover:border-white/15"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-bold text-sm">{cand.name}</h4>
                  <span className="text-[10px] text-gray-400 font-mono">{cand.phone}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>{cand.locality}</span>
                  <span>•</span>
                  <span className="text-blue-400 font-medium">{cand.distanceKm} km</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-brand-electricLime bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {idx === 0 ? "91%" : idx === 1 ? "86%" : idx === 2 ? "74%" : "62%"}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
            </button>
          ))}
        </div>

        {/* Right Column: Factor-level Suitability Breakdown (7 Cols) */}
        <div className="lg:col-span-7 rounded-card bg-[#0A0C10] border border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5">
              <div>
                <h3 className="text-white font-bold text-base">{current.name}</h3>
                <span className="text-xs text-gray-400 font-mono">
                  Suitability Score: <strong className="text-brand-electricLime">{scoreResult.totalScore} / 100</strong>
                </span>
              </div>

              <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Hard Constraints Passed
              </div>
            </div>

            {/* Score Breakdown Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>Skill Match (30%)</span>
                  <span className="font-mono text-white">{scoreResult.factors.skillScore} / 30 pts</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${(scoreResult.factors.skillScore / 30) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>Experience Fit (20%)</span>
                  <span className="font-mono text-white">{scoreResult.factors.experienceScore} / 20 pts</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${(scoreResult.factors.experienceScore / 20) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>Commute Proximity (20%)</span>
                  <span className="font-mono text-white">{scoreResult.factors.locationScore} / 20 pts</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${(scoreResult.factors.locationScore / 20) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>Salary Compatibility (15%)</span>
                  <span className="font-mono text-white">{scoreResult.factors.salaryScore} / 15 pts</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${(scoreResult.factors.salaryScore / 15) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>Availability & Shift (15%)</span>
                  <span className="font-mono text-white">
                    {scoreResult.factors.availabilityScore + scoreResult.factors.shiftLanguageScore} / 15 pts
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        ((scoreResult.factors.availabilityScore + scoreResult.factors.shiftLanguageScore) / 15) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-400">
            <strong>Model:</strong> nayamarg-match-v1 • <strong>Audit Note:</strong> No protected personal traits (caste,
            religion, gender, age) are evaluated. Ranking is strictly job requirement suitability.
          </div>
        </div>
      </div>
    </section>
  );
}
