"use client";

import React from "react";
import Link from "next/link";
import { CalendarCheck, MapPin, Clock, Phone, AlertCircle, Building2 } from "lucide-react";

export default function WorkerInterviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
          <span>Worker workspace</span>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Interviews</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">Scheduled Interviews</h1>
        <p className="text-xs text-gray-400 mt-1">
          Upcoming plant visits, trade tests, and direct employer meetings.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#0D1018] border border-emerald-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
            CONFIRMED INTERVIEW
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">Monday, Nov 18</span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">CNC Machine Operator (Technical Round)</h2>
          <p className="text-xs text-gray-400 mt-0.5">Precision Forge & Tools Ltd. · Satpur MIDC</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-gray-400 block text-[11px]">Reporting Time & Location</span>
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>10:30 AM (Morning Shift)</span>
            </div>
            <div className="text-gray-300 text-[11px]">Plot No. 42, Sector F, Satpur MIDC, Nashik</div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-gray-400 block text-[11px]">Factory HR Representative</span>
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sunil Deshmukh (Head HR)</span>
            </div>
            <div className="text-gray-300 text-[11px]">Phone: +91 98220 12345</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-300">
          <strong className="text-white block mb-0.5">What to bring:</strong>
          Original Aadhaar Card, ITI Trade Certificate (if available), and 2 passport-size photographs. Safety shoes will be provided at the security gate.
        </div>
      </div>
    </div>
  );
}
