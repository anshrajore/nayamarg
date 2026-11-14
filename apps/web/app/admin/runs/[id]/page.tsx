"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRecruitment } from "@/lib/RecruitmentContext";
import {
  Layers,
  CheckCircle2,
  Clock,
  PhoneCall,
  Users,
  MapPin,
  CalendarCheck,
  AlertOctagon,
  FileText,
  Volume2,
  ShieldCheck,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function AdminRunDetailPage() {
  const params = useParams();
  const runId = (params?.id as string) || "run-9001";
  const { runs, jobs, candidates, exceptions, pauseRun, resumeRun } = useRecruitment();

  const run = runs.find((r) => r.id === runId) || runs[0];
  const job = jobs.find((j) => j.id === run?.jobId) || jobs[0];

  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "workflow"
    | "candidates"
    | "queue"
    | "history"
    | "responses"
    | "followups"
    | "interviews"
    | "vacancies"
    | "reports"
    | "audit"
  >("overview");

  const tabs = [
    { key: "overview", label: "1. Overview" },
    { key: "workflow", label: "2. Workflow Timeline" },
    { key: "candidates", label: "3. Candidates" },
    { key: "queue", label: "4. Call Queue" },
    { key: "history", label: "5. Call History" },
    { key: "responses", label: "6. Structured Responses" },
    { key: "followups", label: "7. Follow-ups" },
    { key: "interviews", label: "8. Interviews" },
    { key: "vacancies", label: "9. Vacancies (10 Slots)" },
    { key: "reports", label: "10. Reports" },
    { key: "audit", label: "11. Audit Ledger" },
  ];

  if (!run) {
    return <div className="p-10 text-white">Recruitment Run not found.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Run Header */}
      <div className="p-6 rounded-2xl bg-[#0B0E16] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white">{run.jobTitle}</h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
              {run.id}
            </span>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                run.status === "RUNNING"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : run.status === "PIPELINE_READY"
                  ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                  : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
              }`}
            >
              {run.status}
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Employer: <strong className="text-gray-200">{run.employer}</strong> · Location:{" "}
            <strong className="text-gray-200">{run.city}</strong> · Vacancies:{" "}
            <strong className="text-white font-mono">{run.requiredVacancies}</strong> · Target Pool:{" "}
            <strong className="text-white font-mono">{run.targetCandidatePool}</strong>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {run.status === "RUNNING" ? (
            <button
              onClick={() => pauseRun(run.id)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-200 flex items-center gap-1.5 transition-all border border-white/10"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Outreach</span>
            </button>
          ) : (
            <button
              onClick={() => resumeRun(run.id)}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 flex items-center gap-1.5 transition-all shadow"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Resume Outreach</span>
            </button>
          )}

          <Link
            href="/admin/calls/live"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Open Live Audio</span>
          </Link>
        </div>
      </div>

      {/* 11 Horizontal Tab Bar */}
      <div className="flex overflow-x-auto gap-1 p-1 bg-white/[0.02] border border-white/[0.06] rounded-2xl scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? "bg-blue-600 text-white font-bold shadow-md"
                : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="p-6 rounded-2xl bg-[#0B0E16] border border-white/[0.08]">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              1. Job Requirements & Capacity Accounting
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-xs text-gray-500">Required Vacancies</span>
                <div className="text-2xl font-bold text-white font-mono">{run.requiredVacancies}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-xs text-gray-500">Interested Candidates</span>
                <div className="text-2xl font-bold text-purple-400 font-mono">{run.interestedCount}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-xs text-gray-500">Interviews Scheduled</span>
                <div className="text-2xl font-bold text-blue-400 font-mono">{run.interviewScheduledCount}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-xs text-gray-500">Confirmed Joined (Filled)</span>
                <div className="text-2xl font-bold text-emerald-400 font-mono">{run.filledVacancies}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <h4 className="font-bold text-white">Canonical Job Specification</h4>
              <p className="text-gray-400">
                Location: {job?.location.city} ({job?.location.radiusKm} km radius) · Shift: {job?.shift.toUpperCase()} · Languages: {job?.languages.join(", ")}
              </p>
              <p className="text-gray-400">
                Required Skills: <span className="text-gray-200">{job?.skills.join(", ")}</span>
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: WORKFLOW */}
        {activeTab === "workflow" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              2. Chronological Automation Lifecycle
            </h3>
            <div className="space-y-2.5">
              {run.workflowEvents.map((evt, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3 text-xs"
                >
                  <span className="font-mono text-gray-500 shrink-0 mt-0.5">{evt.timestamp}</span>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0 font-bold">
                    {evt.event}
                  </span>
                  <span className="text-gray-300">{evt.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CANDIDATES */}
        {activeTab === "candidates" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              3. Ranked Candidate Matches (PostGIS Radius: 25 km)
            </h3>
            <div className="space-y-2">
              {candidates.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white mr-2">{c.name}</span>
                    <span className="text-gray-500 font-mono text-[11px]">{c.city} ({c.distanceKm} km)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-emerald-400 font-bold">{c.matchScore}% Suitability</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-400 text-[10px]">
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: QUEUE */}
        {activeTab === "queue" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
                4. Sequential Call Queue (Strict Concurrency = 1)
              </h3>
              <span className="text-xs text-emerald-400 font-mono">Slot Lock: Acquired</span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 flex items-center justify-between text-blue-300">
                <span>01 · Vikas Balasaheb Pawar (14.5 km)</span>
                <span className="text-xs text-blue-400 font-bold animate-pulse">IN PROGRESS (Attempt #1)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-gray-400">
                <span>02 · Sunil Dattatray Shirsath (5.1 km)</span>
                <span className="text-gray-500">QUEUED</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-gray-400">
                <span>03 · Pravin Suresh Sonawane (18.2 km)</span>
                <span className="text-gray-500">QUEUED</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: HISTORY */}
        {activeTab === "history" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              5. Completed Call Attempts & Provider Outcomes
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold mr-2">Ramesh Tukaram Shinde</span>
                  <span className="text-gray-500">Provider ID: srv_att_101 · Duration: 2m 14s</span>
                </div>
                <span className="text-emerald-400 font-mono font-bold">CONNECTED / INTERESTED</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold mr-2">Ganesh Vishnu Jadhav</span>
                  <span className="text-gray-500">Provider ID: srv_att_102 · Duration: 1m 40s</span>
                </div>
                <span className="text-red-400 font-mono font-bold">CONNECTED / SALARY_MISMATCH</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: RESPONSES */}
        {activeTab === "responses" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              6. Structured Candidate Responses (Zod Validated)
            </h3>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-[11px] text-emerald-400 space-y-1">
              <div>&#123;</div>
              <div className="pl-4">"candidate_id": "cand-101",</div>
              <div className="pl-4">"disposition": "CONNECTED",</div>
              <div className="pl-4">"candidate_interest": "INTERESTED",</div>
              <div className="pl-4">"availability_status": "AVAILABLE",</div>
              <div className="pl-4">"available_from": "2026-11-18",</div>
              <div className="pl-4">"experience_years": 3.5,</div>
              <div className="pl-4">"salary_acceptable": true,</div>
              <div className="pl-4">"shift_acceptable": true,</div>
              <div className="pl-4">"interview_interest": true,</div>
              <div className="pl-4">"confidence_score": 0.96</div>
              <div>&#125;</div>
            </div>
          </div>
        )}

        {/* TAB 7: FOLLOW-UPS */}
        {activeTab === "followups" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              7. Pending Callback Scheduler (recruitment_followups)
            </h3>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-white">Sanjay M. Deshmukh</p>
                <p className="text-gray-500">Reason: Candidate requested evening callback ("काम संपल्यावर ६ वाजता कॉल करा")</p>
              </div>
              <span className="text-amber-400 font-mono font-bold">Scheduled: Today 18:00</span>
            </div>
          </div>
        )}

        {/* TAB 8: INTERVIEWS */}
        {activeTab === "interviews" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              8. Employer Interview Decisions
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <span>Amit Kumar Maurya</span>
                <span className="text-blue-400 font-mono font-bold">Scheduled for Satpur Plant (Gate #2)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: VACANCIES */}
        {activeTab === "vacancies" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              9. Individual Vacancy Slot Accounting (10 Slots)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {run.slots.map((s) => (
                <div
                  key={s.slotNumber}
                  className={`p-3.5 rounded-xl border text-xs space-y-1 font-mono ${
                    s.status === "FILLED"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : s.status === "RESERVED"
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                      : "bg-white/[0.02] border-white/5 text-gray-500"
                  }`}
                >
                  <div className="flex justify-between font-bold">
                    <span>Slot #{s.slotNumber}</span>
                    <span className="uppercase">{s.status}</span>
                  </div>
                  {s.assignedCandidateName && (
                    <p className="text-white font-sans">{s.assignedCandidateName}</p>
                  )}
                  {s.confirmedJoinedAt && (
                    <p className="text-[10px] text-gray-400">Joined: {s.confirmedJoinedAt}</p>
                  )}
                  {s.reservationExpiresAt && (
                    <p className="text-[10px] text-amber-400">Hold Expires: {s.reservationExpiresAt}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 10: REPORTS */}
        {activeTab === "reports" && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              10. Employer-Facing Progress Summary
            </h3>
            <p className="text-gray-400">
              Status: <strong className="text-emerald-400">Partially Filled</strong> · 6 Confirmed Joined · 2 Reserved Offers · 2 Vacancies Open
            </p>
          </div>
        )}

        {/* TAB 11: AUDIT */}
        {activeTab === "audit" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              11. Immutable Audit Ledger (operations.outbox_events)
            </h3>
            <div className="space-y-2 font-mono text-[11px] text-gray-400">
              <div className="p-2.5 rounded bg-black/40 border border-white/5">
                [2026-11-13T10:00:00Z] job.published → Aggregate ID: {job?.id} → Version: 1
              </div>
              <div className="p-2.5 rounded bg-black/40 border border-white/5">
                [2026-11-13T10:00:05Z] recruitment.run.created → Run ID: {run.id} → IdempotencyKey: job_1001:v1:policy_v1
              </div>
              <div className="p-2.5 rounded bg-black/40 border border-white/5">
                [2026-11-13T10:14:30Z] recruitment.candidate.joined → Candidate ID: cand-103 → Slot #1 FILLED
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
