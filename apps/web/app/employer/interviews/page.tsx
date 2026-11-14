"use client";

import React from "react";
import { useRecruitment } from "@/lib/RecruitmentContext";
import {
  CalendarCheck,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building2,
} from "lucide-react";

export default function EmployerInterviewsPage() {
  const { candidates, markCandidateHired } = useRecruitment();

  const interviewCandidates = candidates.filter(
    (c) => c.status === "INTERVIEW_SCHEDULED" || c.status === "JOINED"
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Interview Pipeline & Decisions</h1>
        <p className="text-xs text-gray-400 mt-1">
          Review candidates scheduled for in-person or telephony interviews. Mark final selection outcomes to reserve vacancy slots.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interviewCandidates.map((cand, idx) => (
          <div
            key={cand.id}
            className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08] hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{cand.name}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    {cand.city} ({cand.distanceKm} km away)
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {cand.matchScore}% Fit
                </span>
              </div>

              {/* Slot & Time */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Interview Scheduled: Tomorrow, 02:30 PM</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Building2 className="w-3.5 h-3.5 text-gray-500" />
                  <span>Venue: Satpur Plant Gate #2</span>
                </div>
              </div>

              <div className="text-xs text-gray-400">
                Skills: <span className="text-gray-200">{cand.skills.join(", ")}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2">
              {cand.status !== "JOINED" ? (
                <>
                  <button
                    onClick={() => markCandidateHired(cand.id, 9)}
                    className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Hire</span>
                  </button>
                  <button className="px-3 py-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 text-xs font-semibold transition-all">
                    Reject
                  </button>
                </>
              ) : (
                <div className="w-full py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs text-center font-bold flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Offer Accepted & Joined</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
