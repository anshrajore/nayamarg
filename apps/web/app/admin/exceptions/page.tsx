"use client";

import React, { useState } from "react";
import { useRecruitment } from "@/lib/RecruitmentContext";
import {
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldAlert,
  Search,
  Filter,
  ArrowRight,
  Info,
} from "lucide-react";

export default function AdminExceptionsPage() {
  const { exceptions, resolveException } = useRecruitment();
  const [filter, setFilter] = useState("ALL");

  const filtered = exceptions.filter((exc) => {
    if (filter === "UNRESOLVED") return !exc.resolved;
    if (filter === "RESOLVED") return exc.resolved;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-red-400" />
            Failure & Exception Inbox
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Reconcile uncertain telephony provider outcomes, optical radius exhaustions, and compliance opt-out events.
          </p>
        </div>

        <div className="flex gap-2">
          {["ALL", "UNRESOLVED", "RESOLVED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                filter === st
                  ? "bg-blue-600/20 border-blue-500/40 text-blue-300"
                  : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Exception cards */}
      <div className="space-y-4">
        {filtered.map((exc) => (
          <div
            key={exc.id}
            className={`p-5 rounded-2xl border transition-all space-y-4 ${
              exc.resolved
                ? "bg-[#090C12]/50 border-white/[0.04] opacity-60"
                : "bg-[#0E121A] border-red-500/30 hover:border-red-500/50"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      exc.severity === "CRITICAL" || exc.severity === "HIGH"
                        ? "bg-red-500/15 text-red-400 border border-red-500/30"
                        : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {exc.severity} SEVERITY
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">{exc.id}</span>
                  <span className="text-xs font-bold text-white">{exc.type}</span>
                </div>
                <p className="text-xs text-gray-300">
                  Target: <strong className="text-white">{exc.jobTitle}</strong>
                  {exc.candidateName && <span> · Candidate: <strong className="text-white">{exc.candidateName}</strong></span>}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-gray-500">{exc.timestamp}</span>
                {exc.resolved ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Resolved
                  </span>
                ) : (
                  <button
                    onClick={() => resolveException(exc.id)}
                    className="px-4 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Execute Safe Remediation</span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
              <div className="text-gray-300">
                <strong className="text-gray-400 block text-[10px] uppercase font-mono mb-0.5">Explanation:</strong>
                {exc.explanation}
              </div>
              <div className="text-emerald-400 pt-1 border-t border-white/5">
                <strong className="text-gray-400 block text-[10px] uppercase font-mono mb-0.5">Remediation Policy:</strong>
                {exc.remediationAction}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
