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
  ArrowLeft,
} from "lucide-react";

export default function WorkerApplicationsPage() {
  const applications = [
    {
      id: "app-901",
      jobTitle: "CNC Machine Operator",
      employer: "Precision Forge & Tools Ltd.",
      location: "Satpur MIDC, Nashik (4.2 km)",
      salary: "₹16,000 – ₹18,500 / महिना",
      stage: "INTERVIEW_SCHEDULED",
      stageLabel: "मुलाखत निश्चित (Interview Scheduled)",
      appliedDate: "13 Nov 2026",
      interviewDetails: "उद्या दुपारी ०२:३० वाजता (Tomorrow 2:30 PM) · Satpur Plant Gate #2",
      audioFeedback: "Sarvam Voice AI द्वारे पात्रता आणि अंतर तपासणी पूर्ण झाली आहे (९४% जुळणी).",
    },
    {
      id: "app-902",
      jobTitle: "Quality Inspector (Auto Components)",
      employer: "Mahindra Heavy Engineering",
      location: "Ambad MIDC, Nashik (6.8 km)",
      salary: "₹18,000 – ₹21,000 / महिना",
      stage: "VOICE_QUALIFICATION",
      stageLabel: "व्हॉइस कॉल द्वारे तपासणी (Voice Call in Progress)",
      appliedDate: "14 Nov 2026",
      audioFeedback: "नयामार्ग एआय कडून लवकरच ऑटोमॅटिक कॉल येईल.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          href="/worker"
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Jobs</span>
        </Link>

        {/* Title */}
        <div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
            माझे अर्ज (My Applications)
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            अर्ज प्रगती अहवाल (Application Status)
          </h1>
          <p className="text-xs text-gray-400">
            Track your job application stages, Sarvam voice screening results, and employer interview calls.
          </p>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-6 rounded-2xl bg-[#0E121A] border border-white/[0.08] hover:border-amber-500/30 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{app.jobTitle}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                      {app.id}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 font-semibold">{app.employer}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    {app.location}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-emerald-400 font-mono block">
                    {app.salary}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">
                    अर्ज केला: {app.appliedDate}
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
                    {app.stage === "INTERVIEW_SCHEDULED" ? "Step 3 of 4: Interview Ready" : "Step 2 of 4: Voice Call"}
                  </span>
                </div>

                {app.interviewDetails && (
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>मुलाखत वेळ: {app.interviewDetails}</span>
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
    </div>
  );
}
