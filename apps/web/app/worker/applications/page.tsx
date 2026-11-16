"use client";

import React from "react";
import Link from "next/link";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  MapPin,
  CalendarCheck,
  Building2,
  PhoneCall,
  Volume2,
  ChevronRight,
} from "lucide-react";

export default function WorkerApplicationsPage() {
  const applications = [
    {
      id: "app-901",
      jobTitle: "CNC Machine Operator",
      employer: "Precision Forge & Tools Ltd.",
      location: "Satpur MIDC, Nashik (4.2 km)",
      salary: "₹16,000 – ₹18,500 / month",
      stage: "INTERVIEW_SCHEDULED",
      stageLabel: "मुलाखत निश्चित (Interview Scheduled)",
      appliedDate: "13 Nov 2026",
      statusColor: "emerald",
      interviewDetails: "उद्या दुपारी ०२:३० वाजता (Tomorrow 2:30 PM) · Satpur Plant Gate #2",
      audioFeedback: "Sarvam Voice AI द्वारे पात्रता आणि अंतर तपासणी पूर्ण झाली आहे (९४% जुळणी).",
    },
    {
      id: "app-902",
      jobTitle: "Quality Inspector (Auto Components)",
      employer: "Mahindra Heavy Engineering",
      location: "Ambad MIDC, Nashik (6.8 km)",
      salary: "₹18,000 – ₹21,000 / month",
      stage: "VOICE_QUALIFICATION",
      stageLabel: "व्हॉइस कॉल द्वारे तपासणी (Voice Call in Progress)",
      appliedDate: "14 Nov 2026",
      statusColor: "amber",
      interviewDetails: null,
      audioFeedback: "नयामार्ग एआय कडून लवकरच ऑटोमॅटिक कॉल येईल.",
    },
    {
      id: "app-903",
      jobTitle: "MIG / TIG Welder & Fabricator",
      employer: "Nashik Auto Components Pvt. Ltd.",
      location: "Ozar Industrial Area, Nashik (11 km)",
      salary: "₹17,000 – ₹20,000 / month",
      stage: "VOICE_PASSED",
      stageLabel: "पात्रता पूर्ण (Voice Screen Passed)",
      appliedDate: "09 Nov 2026",
      statusColor: "blue",
      interviewDetails: "Waiting for plant interview slot",
      audioFeedback: "९४% कौशल्य व शिफ्ट उपलब्धता जुळली आहे.",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
          <span>Worker workspace</span>
          <span>/</span>
          <span className="text-amber-400 font-semibold">My applications (माझे अर्ज)</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">Your Job Applications</h1>
        <p className="text-xs text-gray-400 mt-1">
          Track real-time status of your active industrial applications, Sarvam Voice AI results, and scheduled plant interviews.
        </p>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-amber-500/30 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
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
                  {app.stageLabel}
                </span>
                <h3 className="text-lg font-bold text-white mt-2 flex items-center gap-2">
                  {app.jobTitle}
                </h3>
                <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-gray-500" />
                  {app.employer}
                  <span className="text-gray-600">•</span>
                  <MapPin className="w-3.5 h-3.5 text-gray-500" />
                  {app.location}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-sm font-bold text-emerald-400 font-mono block">
                  {app.salary}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  Applied: {app.appliedDate}
                </span>
              </div>
            </div>

            {/* Stage Stepper Banner */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-amber-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {app.stageLabel}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {app.stage === "INTERVIEW_SCHEDULED"
                    ? "Step 3 of 4: Interview Ready"
                    : app.stage === "VOICE_PASSED"
                    ? "Step 2 of 4: Voice Passed"
                    : "Step 1 of 4: Voice Call"}
                </span>
              </div>

              {app.interviewDetails && (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>मुलाखत वेळ (Interview): {app.interviewDetails}</span>
                </div>
              )}

              <div className="text-[11px] text-gray-400 italic flex items-center gap-1.5 pt-1">
                <Volume2 className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <span>"{app.audioFeedback}"</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
