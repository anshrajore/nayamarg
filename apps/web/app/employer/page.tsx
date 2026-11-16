"use client";

import React from "react";
import Link from "next/link";
import { useRecruitment } from "@/lib/RecruitmentContext";
import {
  Users,
  CheckCircle2,
  Clock,
  UserCheck,
  Briefcase,
  ArrowRight,
  PhoneCall,
  Sparkles,
  MapPin,
  Calendar,
  AlertCircle,
  Pause,
  Play,
  PlusCircle,
  Award,
  ChevronRight,
} from "lucide-react";

export default function EmployerOverviewPage() {
  const { jobs, runs, candidates, pauseRun, resumeRun } = useRecruitment();

  const totalRequired = runs.reduce((acc, r) => acc + r.requiredVacancies, 0) || 20;
  const totalFilled = runs.reduce((acc, r) => acc + r.filledVacancies, 0) || 6;
  const totalApplicants = 48;
  const totalInterviewsPending = 8;
  const totalJoined = 6;
  const openVacancies = totalRequired - totalFilled;

  const hiringRequests = [
    {
      id: "HR-0001",
      title: "Machine Operator (CNC / Lathe)",
      location: "Satpur MIDC Unit 1",
      required: 15,
      applicants: 28,
      selected: 8,
      joined: 4,
      status: "Active",
      lastActivity: "2h ago",
    },
    {
      id: "HR-0002",
      title: "Industrial Maintenance Electrician",
      location: "Ambad MIDC Unit 2",
      required: 5,
      applicants: 14,
      selected: 4,
      joined: 2,
      status: "Active",
      lastActivity: "4h ago",
    },
  ];

  const applicantActivity = [
    {
      id: "act-1",
      name: "Ramesh Tukaram Shinde",
      role: "CNC Machine Operator",
      appliedDate: "Nov 12, 2026",
      status: "Interview Scheduled",
      statusColor: "emerald",
      badge: "Nov 18, 10:30 AM",
    },
    {
      id: "act-2",
      name: "Sanjay Namdeo Patil",
      role: "CNC Machine Operator",
      appliedDate: "Nov 13, 2026",
      status: "Reviewing",
      statusColor: "blue",
      badge: "Voice Verified 94%",
    },
    {
      id: "act-3",
      name: "Ganesh Vishnu Wagh",
      role: "Industrial Electrician",
      appliedDate: "Nov 13, 2026",
      status: "Shortlisted",
      statusColor: "amber",
      badge: "Slot Pending",
    },
    {
      id: "act-4",
      name: "Kishor Dnyaneshwar Bhamre",
      role: "CNC Machine Operator",
      appliedDate: "Nov 11, 2026",
      status: "Joined Plant",
      statusColor: "emerald",
      badge: "Nov 14 (Today)",
    },
  ];

  const upcomingEvents = [
    {
      date: "Monday, Nov 18 · 10:30 AM",
      candidate: "Ramesh Tukaram Shinde",
      role: "CNC Machine Operator",
      location: "Satpur MIDC Unit 1 (Tool Room)",
      type: "Technical Trade Test",
    },
    {
      date: "Tuesday, Nov 19 · 02:00 PM",
      candidate: "Sachin Madhukar Aher",
      role: "Industrial Electrician",
      location: "Ambad MIDC Unit 2",
      type: "HR & Plant Manager Round",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header with Breadcrumb, Greeting and Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
            <span>Overview</span>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Employer workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Good morning, Sunil Deshmukh
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Manage your active hiring requirements, applicant dossiers, and voice progress reports.
          </p>
        </div>

        <Link
          href="/employer/jobs/new"
          className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold flex items-center gap-2 transition-all shadow-lg active:scale-95 self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create hiring request</span>
        </Link>
      </div>

      {/* 2. Four Summary Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Open vacancies</span>
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">
            {openVacancies}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Total required: {totalRequired}</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Total applicants</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">
            {totalApplicants}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">From 4 industrial zones</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Interviews pending</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">
            {totalInterviewsPending}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Requires confirmation</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Joined plant</span>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">
            {totalJoined}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Verified on-site</p>
        </div>
      </div>

      {/* 3. Active Hiring Requests Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>Active hiring requests</span>
          </h2>
          <Link
            href="/employer/jobs"
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            <span>View all requests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="rounded-2xl bg-[#0D1018] border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] border-b border-white/[0.06] text-gray-400 font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4">Request & Job Title</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4 text-center">Required</th>
                  <th className="py-3 px-4 text-center">Applicants</th>
                  <th className="py-3 px-4 text-center">Selected</th>
                  <th className="py-3 px-4 text-center">Joined</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {hiringRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-white text-sm">{req.title}</div>
                      <div className="text-[10px] font-mono text-gray-500">{req.id} · Updated {req.lastActivity}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span>{req.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-white">{req.required}</td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-blue-400">{req.applicants}</td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-amber-400">{req.selected}</td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-emerald-400">{req.joined}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {req.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href="/employer/candidates"
                        className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-emerald-500/10 hover:text-emerald-400 text-gray-300 border border-white/10 text-xs font-semibold inline-flex items-center gap-1 transition-all"
                      >
                        <span>View Applicants</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Split Grid: Applicant Activity & Upcoming Interviews/Joining */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applicant activity list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Applicant activity</span>
            </h3>
            <Link href="/employer/candidates" className="text-xs text-blue-400 hover:underline">
              View all candidates →
            </Link>
          </div>

          <div className="rounded-2xl bg-[#0D1018] border border-white/[0.08] divide-y divide-white/[0.04]">
            {applicantActivity.map((act) => (
              <div key={act.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-white/[0.01] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center font-bold text-white text-xs shrink-0">
                    {act.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{act.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{act.role} · {act.appliedDate}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border block ${
                      act.statusColor === "emerald"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : act.statusColor === "amber"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    }`}
                  >
                    {act.status}
                  </span>
                  <span className="text-[10px] text-gray-500 mt-0.5 block">{act.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming interviews and joining */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Upcoming interviews & joining</span>
            </h3>
            <Link href="/employer/interviews" className="text-xs text-emerald-400 hover:underline">
              View calendar →
            </Link>
          </div>

          <div className="rounded-2xl bg-[#0D1018] border border-white/[0.08] p-4 space-y-3">
            {upcomingEvents.map((evt, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{evt.date}</span>
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                    {evt.type}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{evt.candidate}</h4>
                  <p className="text-[11px] text-gray-400">{evt.role} · {evt.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
