"use client";

import React from "react";
import Link from "next/link";
import { useRecruitment } from "@/lib/RecruitmentContext";
import {
  Activity,
  Layers,
  PhoneCall,
  AlertOctagon,
  Users,
  Radio,
  CheckCircle2,
  Clock,
  ArrowRight,
  Server,
  Zap,
  ShieldCheck,
  Pause,
  Play,
} from "lucide-react";

export default function AdminCommandCentre() {
  const { runs, exceptions, pauseRun, resumeRun } = useRecruitment();

  const providerHealth = [
    { name: "Sarvam Voice Agents", status: "HEALTHY", latency: "14ms", uptime: "99.98%", type: "Conversational AI" },
    { name: "PSTN Telephony Gateway", status: "HEALTHY", latency: "42ms", uptime: "99.95%", type: "Carrier E1/SIP" },
    { name: "DLT / SMS Gateway", status: "HEALTHY", latency: "88ms", uptime: "99.90%", type: "TRAI Header Registered" },
    { name: "Supabase PostGIS Cluster", status: "HEALTHY", latency: "2ms", uptime: "100.0%", type: "Spatial RLS DB" },
    { name: "Redis & BullMQ Queues", status: "HEALTHY", latency: "1ms", uptime: "99.99%", type: "Message Broker" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          Autonomous Command Centre
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-medium">
            Supervisory Console
          </span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Real-time oversight of autonomous recruitment runs, sequential voice dispatchers, and reconciliation queues.
        </p>
      </div>

      {/* 4 Critical Command Metrics (Spec Section 13.1) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0B0E16] border border-white/[0.08] relative group">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Active Recruitment Runs</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mt-3 font-mono">18</div>
          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            2 Currently Calling
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B0E16] border border-white/[0.08] relative group">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Eligible Candidate Pool</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-purple-400 mt-3 font-mono">2,450</div>
          <span className="text-[11px] text-gray-500 mt-1 block">PostGIS indexed (Point 4326)</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B0E16] border border-white/[0.08] relative group">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Calls Completed Today</span>
            <PhoneCall className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-3 font-mono">342</div>
          <span className="text-[11px] text-emerald-400/80 font-mono mt-1 block">189 Answered (55.2%)</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B0E16] border border-white/[0.08] relative group">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Needs Intervention</span>
            <AlertOctagon className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-3xl font-extrabold text-red-400 mt-3 font-mono">
            {exceptions.filter((e) => !e.resolved).length}
          </div>
          <Link
            href="/admin/exceptions"
            className="text-[11px] text-red-400 hover:underline mt-1 block font-semibold"
          >
            Open Exception Inbox →
          </Link>
        </div>
      </div>

      {/* Main 2-column section: Active Campaign Activity + Infrastructure Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Campaigns (Spec Section 13.1) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              Live Campaign Activity
            </h3>
            <span className="text-xs text-gray-500 font-mono">Deterministic State Machines</span>
          </div>

          <div className="space-y-3">
            {runs.map((run) => (
              <div
                key={run.id}
                className="p-5 rounded-2xl bg-[#0B0E16] border border-white/[0.08] hover:border-blue-500/30 transition-all space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h4 className="text-base font-bold text-white">{run.jobTitle}</h4>
                      <span className="text-xs font-mono text-gray-400">{run.city}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {run.id}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {run.employer} · Vacancies: {run.requiredVacancies} · Target Pool: {run.targetCandidatePool}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        run.status === "RUNNING"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : run.status === "PIPELINE_READY"
                          ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                          : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {run.status === "RUNNING" ? "CALLING" : run.status.replace("_", " ")}
                    </span>
                    {run.status === "RUNNING" ? (
                      <button
                        onClick={() => pauseRun(run.id)}
                        className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
                        title="Pause Execution"
                      >
                        <Pause className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => resumeRun(run.id)}
                        className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                        title="Resume Execution"
                      >
                        <Play className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Live Candidate Audio Dialing Banner */}
                {run.activeCallCandidate && (
                  <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center">
                        <PhoneCall className="w-4 h-4 animate-bounce" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">Active Recipient: {run.activeCallCandidate}</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                            LOCK: SECURED
                          </span>
                        </div>
                        <p className="text-[11px] text-blue-300 font-mono mt-0.5">
                          Sarvam Attempt: {run.activeCallStatus}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/admin/calls/live"
                      className="px-3 py-1 rounded-lg bg-blue-500 text-black text-xs font-bold hover:bg-blue-400 transition-all flex items-center gap-1 shadow"
                    >
                      <span>Listen Live</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}

                {/* 10 Vacancy Slot Accounting */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-400 mb-1.5">
                    <span>Individual Vacancy Slots Accounting</span>
                    <span>
                      {run.slots.filter((s) => s.status === "FILLED").length} Confirmed Joined ·{" "}
                      {run.slots.filter((s) => s.status === "RESERVED").length} Temporary Hold
                    </span>
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                    {run.slots.map((s) => (
                      <div
                        key={s.slotNumber}
                        className={`p-1.5 rounded-lg text-center text-[10px] font-mono border ${
                          s.status === "FILLED"
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold"
                            : s.status === "RESERVED"
                            ? "bg-amber-500/20 border-amber-500/40 text-amber-300 animate-pulse"
                            : "bg-white/[0.02] border-white/5 text-gray-600"
                        }`}
                      >
                        #{s.slotNumber}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="text-gray-400 font-mono text-[11px]">
                    Pipeline: {run.interestedCount} Interested · {run.interviewScheduledCount} Interviews
                  </div>
                  <Link
                    href={`/admin/runs/${run.id}`}
                    className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                  >
                    <span>Open 11-Tab Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Infrastructure & Provider Health */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-400" />
              Provider Topology & Health
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">ALL SYSTEMS GO</span>
          </div>

          <div className="space-y-3">
            {providerHealth.map((p) => (
              <div
                key={p.name}
                className="p-3.5 rounded-xl bg-[#0B0E16] border border-white/[0.08] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{p.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    {p.status}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">{p.type}</p>
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 pt-1 border-t border-white/5">
                  <span>Latency: {p.latency}</span>
                  <span>Uptime: {p.uptime}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Telecom Compliance Gate */}
          <div className="p-4 rounded-xl bg-[#0B0E16] border border-white/[0.08] space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-gray-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Telecom Compliance Gate</span>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Hard pre-dispatch validation checks: active consent record in <code>communication_consents</code>, suppression table check, and TRAI calling hours restriction (09:00–21:00).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
