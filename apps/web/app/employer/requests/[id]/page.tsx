"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  Briefcase,
  Users,
  UserCheck,
  CheckCircle2,
  CalendarCheck,
  MapPin,
  Clock,
  Phone,
  ArrowLeft,
  Filter,
  Search,
  Sparkles,
  Award,
  ChevronRight,
  X,
  ShieldCheck,
  Check,
  AlertCircle,
  FileText,
} from "lucide-react";

interface CandidateRecord {
  id: string;
  name: string;
  phone: string;
  trade: string;
  experienceYears: number;
  commuteKm: number;
  appliedDate: string;
  stage: "new" | "reviewing" | "shortlisted" | "interview" | "offer" | "joining";
  voiceScore: number;
  vernacularLang: string;
  statusNote: string;
}

const CANDIDATES: CandidateRecord[] = [
  {
    id: "cand-1",
    name: "Ramesh Tukaram Shinde",
    phone: "+91 98231 45670",
    trade: "CNC Machine Operator",
    experienceYears: 3.5,
    commuteKm: 4.2,
    appliedDate: "Nov 12, 2026",
    stage: "interview",
    voiceScore: 94,
    vernacularLang: "मराठी (Fluent)",
    statusNote: "Interview confirmed for Monday, Nov 18, 10:30 AM at Satpur Unit 1.",
  },
  {
    id: "cand-2",
    name: "Sanjay Namdeo Patil",
    phone: "+91 98221 88412",
    trade: "CNC Machine Operator",
    experienceYears: 2.0,
    commuteKm: 6.8,
    appliedDate: "Nov 13, 2026",
    stage: "reviewing",
    voiceScore: 89,
    vernacularLang: "मराठी (Fluent) / हिंदी",
    statusNote: "Voice screening cleared. Evaluated on lathe calibration & shift flexibility.",
  },
  {
    id: "cand-3",
    name: "Ganesh Vishnu Wagh",
    phone: "+91 94230 55198",
    trade: "CNC Machine Operator",
    experienceYears: 4.0,
    commuteKm: 5.1,
    appliedDate: "Nov 10, 2026",
    stage: "shortlisted",
    voiceScore: 92,
    vernacularLang: "मराठी (Fluent)",
    statusNote: "Profile accepted by plant manager. Awaiting interview slot booking.",
  },
  {
    id: "cand-4",
    name: "Kishor Dnyaneshwar Bhamre",
    phone: "+91 91580 33241",
    trade: "CNC Machine Operator",
    experienceYears: 5.0,
    commuteKm: 3.5,
    appliedDate: "Nov 08, 2026",
    stage: "joining",
    voiceScore: 96,
    vernacularLang: "मराठी (Fluent)",
    statusNote: "Offer signed. Joined plant shift on Nov 14.",
  },
  {
    id: "cand-5",
    name: "Pravin Baburao Jagtap",
    phone: "+91 97632 11094",
    trade: "CNC Machine Operator",
    experienceYears: 1.5,
    commuteKm: 8.0,
    appliedDate: "Nov 14, 2026",
    stage: "new",
    voiceScore: 88,
    vernacularLang: "मराठी / हिंदी",
    statusNote: "Applied via Worker App. Voice qualification queued for Sarvam agent.",
  },
  {
    id: "cand-6",
    name: "Mahesh Arjun Kadam",
    phone: "+91 98904 77623",
    trade: "CNC Machine Operator",
    experienceYears: 3.0,
    commuteKm: 7.4,
    appliedDate: "Nov 09, 2026",
    stage: "offer",
    voiceScore: 91,
    vernacularLang: "मराठी (Fluent)",
    statusNote: "Offer letter issued at ₹18,000/mo. Acceptance window expires Nov 16.",
  },
];

function HiringRequestDeepDiveContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const reqId = (params?.id as string) || "HR-0001";
  const activeStage = searchParams.get("stage") || "all";

  const [candidatesList, setCandidatesList] = useState<CandidateRecord[]>(CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const stages = [
    { key: "all", label: "All", count: candidatesList.length },
    { key: "new", label: "New", count: candidatesList.filter((c) => c.stage === "new").length },
    { key: "reviewing", label: "Reviewing", count: candidatesList.filter((c) => c.stage === "reviewing").length },
    { key: "shortlisted", label: "Shortlisted", count: candidatesList.filter((c) => c.stage === "shortlisted").length },
    { key: "interview", label: "Interview", count: candidatesList.filter((c) => c.stage === "interview").length },
    { key: "offer", label: "Offer", count: candidatesList.filter((c) => c.stage === "offer").length },
    { key: "joining", label: "Joining", count: candidatesList.filter((c) => c.stage === "joining").length },
  ];

  const filteredCandidates = candidatesList.filter((c) => {
    const matchesStage = activeStage === "all" || c.stage === activeStage;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    return matchesStage && matchesSearch;
  });

  const handleStageSelect = (stageKey: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (stageKey === "all") {
      current.delete("stage");
    } else {
      current.set("stage", stageKey);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/employer/requests/${reqId}${query}`);
  };

  const handleUpdateCandidateStage = (
    candidateId: string,
    newStage: "shortlisted" | "interview" | "offer" | "joining"
  ) => {
    setCandidatesList((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c))
    );
    if (selectedCandidate && selectedCandidate.id === candidateId) {
      setSelectedCandidate({ ...selectedCandidate, stage: newStage });
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Breadcrumb & Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
            <Link href="/employer" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">{reqId}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Machine Operator (CNC / Lathe)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active · Recruiting
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
            <span>Requisition Code: <strong className="text-gray-300 font-mono">{reqId}</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Plot No. 42, Sector F, Satpur MIDC, Nashik</span>
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/employer/jobs"
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-gray-300 transition-all"
          >
            Edit Requirement
          </Link>
        </div>
      </div>

      {/* 2. Four Vacancy Metrics (Spec Section 6) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Required</span>
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono">
            20
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Approved headcount</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Applicants</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-400 mt-2 font-mono">
            42
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Within 15 km of plant</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Selected</span>
            <UserCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-2 font-mono">
            12
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Interview & offer stage</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Joined</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2 font-mono">
            06
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Confirmed on-site joining</p>
        </div>
      </div>

      {/* 3. Pipeline Stage Tabs (Synced to URL ?stage=) */}
      <div className="border-b border-white/[0.08] flex items-center justify-between overflow-x-auto gap-2 pb-px">
        <div className="flex items-center gap-1.5 shrink-0">
          {stages.map((st) => {
            const isActive = activeStage === st.key;
            return (
              <button
                key={st.key}
                type="button"
                onClick={() => handleStageSelect(st.key)}
                className={`px-3.5 py-2.5 rounded-t-xl text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
                  isActive
                    ? "border-emerald-400 text-emerald-400 bg-white/[0.03]"
                    : "border-transparent text-gray-400 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <span>{st.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-emerald-500 text-black font-bold" : "bg-white/10 text-gray-400"
                  }`}
                >
                  {st.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applicants by name, trade or phone..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="text-xs text-gray-400 flex items-center px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 font-mono">
          Showing {filteredCandidates.length} of {candidatesList.length} records
        </div>
      </div>

      {/* 5. Applicant Records Data Table (Spec Section 6) */}
      <div className="rounded-2xl bg-[#0D1018] border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.02] border-b border-white/[0.06] text-gray-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Candidate</th>
                <th className="py-3.5 px-4 font-semibold">Trade & Experience</th>
                <th className="py-3.5 px-4 font-semibold">Commute</th>
                <th className="py-3.5 px-4 font-semibold">AI Match Score</th>
                <th className="py-3.5 px-4 font-semibold">Applied Date</th>
                <th className="py-3.5 px-4 font-semibold">Current Stage</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredCandidates.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCandidate(c)}
                  className={`hover:bg-white/[0.02] cursor-pointer transition-colors ${
                    selectedCandidate?.id === c.id ? "bg-emerald-500/[0.06]" : ""
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="font-bold text-white text-sm">{c.name}</div>
                    <div className="text-[11px] font-mono text-gray-400 mt-0.5">{c.phone}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-200">{c.trade}</div>
                    <div className="text-[11px] text-gray-500">{c.experienceYears} yrs verified experience</div>
                  </td>
                  <td className="py-4 px-4 font-mono text-gray-300">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{c.commuteKm} km</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px]">
                      {c.voiceScore}% Match
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-400 font-mono text-[11px]">
                    {c.appliedDate}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-white/[0.04] text-gray-200 border border-white/10">
                      {c.stage}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCandidate(c);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold inline-flex items-center gap-1 transition-all"
                    >
                      <span>Review</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Candidate Detail Drawer / Slide-Out Panel (Spec Section 6) */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-[#0F121C] border-l border-white/10 h-full p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                  CANDIDATE ACTION DRAWER
                </span>
                <h3 className="text-xl font-black text-white mt-1">{selectedCandidate.name}</h3>
                <p className="text-xs text-gray-400">{selectedCandidate.phone}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg bg-white/[0.03]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Screening Transcript & Qualification Data */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI Voice Screening Summary</span>
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {selectedCandidate.voiceScore}% Match
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Candidate confirmed active interest in the CNC Operator position. Stated 3.5 years of experience with lathe tooling and Vernier calipers. Willing to work 8-hour day shifts.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-gray-400 pt-1 border-t border-white/[0.04]">
                <span>Language: <strong className="text-white">{selectedCandidate.vernacularLang}</strong></span>
                <span>Distance: <strong className="text-white">{selectedCandidate.commuteKm} km</strong></span>
              </div>
            </div>

            {/* Current Pipeline Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Current Pipeline Stage</label>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono font-bold uppercase text-emerald-400">
                {selectedCandidate.stage}
              </div>
              <p className="text-[11px] text-gray-500">{selectedCandidate.statusNote}</p>
            </div>

            {/* Candidate Action Controls (Shortlist, Reject, Hold, Schedule Interview, Send Offer, Confirm Joining) */}
            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              <span className="text-xs font-mono uppercase text-gray-400 font-bold block">
                RECRUITMENT PIPELINE ACTIONS
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateCandidateStage(selectedCandidate.id, "shortlisted")}
                  className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-semibold border border-white/10 transition-all text-center"
                >
                  Shortlist Profile
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateCandidateStage(selectedCandidate.id, "interview")}
                  className="py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-all text-center"
                >
                  Schedule Interview
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateCandidateStage(selectedCandidate.id, "offer")}
                  className="py-2.5 px-3 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-all text-center"
                >
                  Issue Offer Letter
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateCandidateStage(selectedCandidate.id, "joining")}
                  className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold transition-all text-center"
                >
                  Confirm Joining
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCandidate(null)}
                  className="w-1/2 py-2 rounded-lg bg-white/[0.02] text-gray-400 hover:text-white border border-white/5 text-xs transition-colors"
                >
                  Put on Hold
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCandidate(null)}
                  className="w-1/2 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs transition-colors"
                >
                  Reject Candidate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HiringRequestDeepDivePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-gray-400">Loading Hiring Pipeline...</div>}>
      <HiringRequestDeepDiveContent />
    </Suspense>
  );
}
