"use client";

import React from "react";
import Link from "next/link";
import { FileText, MapPin, Calendar, Clock, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";

export default function WorkerApplicationsPage() {
  const applications = [
    {
      id: "app-1",
      role: "Machine Operator (CNC / Lathe)",
      employer: "Precision Forge & Tools Ltd.",
      location: "Satpur MIDC, Nashik",
      appliedDate: "Nov 12, 2026",
      status: "Shortlisted for Interview",
      statusColor: "emerald",
      stage: "Interview Round 2",
      timeline: "Nov 18, 10:30 AM",
      wage: "₹16,000 – ₹18,500 / month",
    },
    {
      id: "app-2",
      role: "Industrial Maintenance Electrician",
      employer: "Mahindra Heavy Engineering",
      location: "Ambad MIDC, Nashik",
      appliedDate: "Nov 11, 2026",
      status: "Under Review",
      statusColor: "blue",
      stage: "Profile Evaluation",
      timeline: "Expected response in 24h",
      wage: "₹18,500 – ₹22,000 / month",
    },
    {
      id: "app-3",
      role: "MIG / TIG Welder & Fabricator",
      employer: "Nashik Auto Components Pvt. Ltd.",
      location: "Ozar Industrial Area, Nashik",
      appliedDate: "Nov 09, 2026",
      status: "Voice Screen Passed",
      statusColor: "amber",
      stage: "94% AI Match Score",
      timeline: "Awaiting employer interview slot",
      wage: "₹17,000 – ₹20,000 / month",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
          <span>Worker workspace</span>
          <span>/</span>
          <span className="text-amber-400 font-semibold">My applications</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">Your Job Applications</h1>
        <p className="text-xs text-gray-400 mt-1">
          Track the real-time status of your active factory and industrial recruitment applications.
        </p>
      </div>

      <div className="space-y-3">
        {applications.map((app) => (
          <div
            key={app.id}
            className="p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-amber-500/30 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold border ${
                    app.statusColor === "emerald"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : app.statusColor === "blue"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}
                >
                  {app.status}
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">{app.role}</h3>
                <p className="text-xs text-gray-400">{app.employer} · {app.location}</p>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-sm font-bold text-emerald-400 font-mono">{app.wage}</div>
                <div className="text-[11px] text-gray-500">Applied: {app.appliedDate}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Next Milestone: <strong className="text-white">{app.stage}</strong> ({app.timeline})</span>
              </div>
              <Link
                href="/worker"
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 self-start sm:self-center"
              >
                <span>View Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
