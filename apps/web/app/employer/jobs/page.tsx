"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRecruitment } from "@/lib/RecruitmentContext";
import {
  Briefcase,
  MapPin,
  PlusCircle,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Pause,
  Play,
  ArrowRight,
} from "lucide-react";

export default function MyJobsPage() {
  const { jobs, runs, pauseRun, resumeRun } = useRecruitment();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.city.toLowerCase().includes(search.toLowerCase());
    if (filter === "ALL") return matchSearch;
    return matchSearch && job.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">My Hiring Requirements</h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage, monitor, pause, or inspect your active recruitment campaigns.
          </p>
        </div>
        <Link
          href="/employer/jobs/new"
          className="px-5 py-2.5 rounded-full bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 self-start shadow-lg"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Job</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search requirements by title or location..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="flex gap-2">
          {["ALL", "CAMPAIGN_ACTIVE", "PIPELINE_READY", "PAUSED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                filter === st
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {st === "ALL" ? "All" : st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs list */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const run = runs.find((r) => r.jobId === job.id);
          const filled = run?.filledVacancies ?? 0;
          const total = job.vacancies;

          return (
            <div
              key={job.id}
              className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-bold text-white">{job.title}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {job.id}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      job.status === "CAMPAIGN_ACTIVE"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : job.status === "PIPELINE_READY"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {job.status.replace("_", " ")}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1 text-gray-300">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {job.location.city} ({job.location.radiusKm} km radius)
                  </span>
                  <span>•</span>
                  <span>₹{job.salary.min.toLocaleString()} – ₹{job.salary.max.toLocaleString()} / mo</span>
                  <span>•</span>
                  <span>Shift: {job.shift.toUpperCase()}</span>
                  <span>•</span>
                  <span>Exp: {job.experience.minYears}–{job.experience.maxYears} yrs</span>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {job.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] bg-white/[0.03] text-gray-300 px-2 py-0.5 rounded-md border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress & Actions */}
              <div className="flex items-center gap-6 shrink-0">
                <div className="text-right">
                  <div className="text-xs text-gray-400">Hiring Progress</div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">
                    <span className="text-emerald-400">{filled}</span> / {total} Hired
                  </div>
                  <div className="w-28 h-2 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${Math.min(100, (filled / total) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {run && (
                    <>
                      {run.status === "RUNNING" ? (
                        <button
                          onClick={() => pauseRun(run.id)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 flex items-center gap-1.5 transition-all"
                        >
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => resumeRun(run.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Resume</span>
                        </button>
                      )}
                      <Link
                        href={`/employer/requests/${job.id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/30 transition-all"
                      >
                        <span>Pipeline</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/runs/${run.id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold flex items-center gap-1.5 border border-blue-500/30 transition-all"
                      >
                        <span>Audit</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
