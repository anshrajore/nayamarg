"use client";

import React from "react";
import Link from "next/link";
import { useAuthRole } from "@/lib/AuthRoleContext";
import {
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  Lock,
  UserCheck,
  Cpu,
  History,
  Activity,
  ArrowLeft,
  Server,
} from "lucide-react";

export default function AdminProfilePage() {
  const { adminProfile } = useAuthRole();

  const auditEvents = [
    { time: "16:22:10", action: "AUTH_TOKEN_ISSUED", detail: "Fencing lease verified for Campaign #run-9001" },
    { time: "16:15:00", action: "REMEDIATION_OVERRIDE", detail: "Resolved exception #exc-501 (Telephony Provider Timeout)" },
    { time: "15:40:22", action: "RADIUS_SEARCH_AUTHORIZED", detail: "PostGIS radius expansion query logged for Nashik Satpur" },
    { time: "14:10:05", action: "SESSION_MFA_AUTHENTICATED", detail: "Hardware key verified for clearance tier SUPER_ADMIN" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Link */}
      <Link
        href="/admin"
        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Command Centre</span>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
            Internal Platform Staff
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            Operator Clearance & Security Profile
          </h1>
          <p className="text-xs text-gray-400">
            NayaMarg Autonomous Orchestration Engine — Privileged Access Controller
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold flex items-center gap-1.5 self-start">
          <ShieldAlert className="w-4 h-4 text-blue-400" />
          <span>{adminProfile.clearanceLevel}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Staff Identification */}
        <div className="p-6 rounded-2xl bg-[#0B0E16] border border-white/[0.08] space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-400" />
            <span>Staff Credentials</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-gray-400">Operator Name:</span>
              <span className="text-white font-bold">{adminProfile.staffName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-gray-400">Staff Identifier:</span>
              <span className="text-blue-400 font-mono font-bold">{adminProfile.staffId}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-gray-400">Operational Desk:</span>
              <span className="text-white">{adminProfile.activeDesk}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Department:</span>
              <span className="text-gray-300">{adminProfile.department}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Security & Session Status */}
        <div className="p-6 rounded-2xl bg-[#0B0E16] border border-white/[0.08] space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-blue-400" />
            <span>Session Integrity & Fencing</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-gray-400">Multi-Factor Authentication:</span>
              <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                ACTIVE (Hardware Token)
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-gray-400">Kernel Concurrency Lock:</span>
              <span className="text-white font-mono">STRICT (Concurrency = 1)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-gray-400">Client Access Mode:</span>
              <span className="text-blue-300 font-mono">Restricted Intranet Gateway</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Session Lease TTL:</span>
              <span className="text-emerald-400 font-mono">Valid (Expires in 7h 42m)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Operator Audit Trail */}
      <div className="p-6 rounded-2xl bg-[#0B0E16] border border-white/[0.08] space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <History className="w-4 h-4 text-blue-400" />
          <span>Recent Supervisory Interventions (operations.outbox_events)</span>
        </h2>

        <div className="space-y-2 font-mono text-xs">
          {auditEvents.map((evt, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-500">{evt.time}</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 font-bold text-[10px]">
                  {evt.action}
                </span>
                <span className="text-gray-300">{evt.detail}</span>
              </div>
              <span className="text-emerald-400 text-[10px]">VERIFIED</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
