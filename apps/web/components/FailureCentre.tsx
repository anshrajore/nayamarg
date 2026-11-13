"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
  ServerCrash,
  Radio,
  FileText,
  Activity,
  ArrowRight,
} from "lucide-react";

interface FailureItem {
  id: string;
  code: string;
  classification: string;
  sourceModule: string;
  correlationId: string;
  relatedEntity: string;
  status: "OPEN" | "RECOVERING" | "RESOLVED";
  errorDetails: string;
  suggestedRunbook: string;
  canReconcile: boolean;
}

export function FailureCentre() {
  const [failures, setFailures] = useState<FailureItem[]>([
    {
      id: "fail_4019",
      code: "SARVAM_ATTEMPT_RESPONSE_TIMEOUT",
      classification: "EXTERNAL_PROVIDER",
      sourceModule: "voice.dispatcher",
      correlationId: "corr_9021-voice-HR1001",
      relatedEntity: "call_attempt: #CA-4001 (Worker: Cand_812)",
      status: "OPEN",
      errorDetails: "Call submitted to Sarvam API, but HTTP response timed out. Attempt moved to UNKNOWN status.",
      suggestedRunbook: "RB-VOICE-04: Query Sarvam Analytics API by provider attempt reference before any retry.",
      canReconcile: true,
    },
    {
      id: "fail_3892",
      code: "COMMUNICATION_CONSENT_EXPIRED",
      classification: "COMPLIANCE_SUPPRESSION",
      sourceModule: "compliance.evaluator",
      correlationId: "corr_8911-sms-HR1001",
      relatedEntity: "worker: Cand_419",
      status: "RESOLVED",
      errorDetails: "Consent notice v1.0 expired. Automated SMS blocked. Worker invited to re-verify in worker portal.",
      suggestedRunbook: "RB-COMPLIANCE-01: Auto-suppressed without penalty. No retry.",
      canReconcile: false,
    },
    {
      id: "fail_3771",
      code: "GEO_POSTGIS_CLUSTER_EXHAUSTED",
      classification: "DATA_QUALITY",
      sourceModule: "recruitment.search",
      correlationId: "corr_7719-match-HR1002",
      relatedEntity: "hiring_request: #HR-1002",
      status: "OPEN",
      errorDetails: "All 150 candidates within 25km radius exhausted without reaching target pipeline coverage.",
      suggestedRunbook: "RB-MATCH-02: Review with employer to expand radius to 35km or relax non-mandatory skills.",
      canReconcile: false,
    },
  ]);

  const handleReconcile = (id: string) => {
    setFailures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "RECOVERING" } : f))
    );

    setTimeout(() => {
      setFailures((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                status: "RESOLVED",
                errorDetails:
                  "Reconciled via Sarvam Analytics API: Call was completed successfully (duration 62s, disposition: CONNECTED). No duplicate retry needed.",
              }
            : f
        )
      );
    }, 900);
  };

  return (
    <section id="failure-centre" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            Operations Reliability & Failure Centre (Section 5.8 & 8.4)
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Classified Failure & Recovery Engine
          </h2>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl">
            Failures are classified into 7 distinct categories. We enforce safe reconciliation before re-dispatching
            any external call or SMS side-effect.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-mono">
            Active Incidents: 0
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-mono font-bold">
            2 Recoverable Events
          </span>
        </div>
      </div>

      {/* Failure List Cards */}
      <div className="space-y-4">
        {failures.map((f) => (
          <div
            key={f.id}
            className={`p-6 rounded-2xl border transition-all ${
              f.status === "RESOLVED"
                ? "bg-white/[0.02] border-white/5 opacity-80"
                : "bg-[#0D0F14] border-white/10 shadow-xl hover:border-white/20"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                    f.classification === "EXTERNAL_PROVIDER"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : f.classification === "COMPLIANCE_SUPPRESSION"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  }`}
                >
                  {f.classification}
                </span>

                <span className="text-sm font-bold text-white font-mono">{f.code}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-mono">{f.relatedEntity}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    f.status === "RESOLVED"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : f.status === "RECOVERING"
                      ? "bg-blue-500/20 text-blue-400 animate-pulse"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {f.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mb-4">{f.errorDetails}</p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/5 text-[11px] text-gray-400">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-300 font-medium">Suggested Runbook:</span>
                <span className="text-gray-400">{f.suggestedRunbook}</span>
              </div>

              {f.canReconcile && f.status !== "RESOLVED" && (
                <button
                  onClick={() => handleReconcile(f.id)}
                  disabled={f.status === "RECOVERING"}
                  className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20 active:scale-95 disabled:opacity-50"
                >
                  <RotateCcw className={`w-3 h-3 ${f.status === "RECOVERING" ? "animate-spin" : ""}`} />
                  {f.status === "RECOVERING" ? "Reconciling Provider..." : "Reconcile With Sarvam"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
