"use client";

import React, { useState } from "react";
import { Settings, Building2, Bell, Shield, Key } from "lucide-react";

export default function EmployerSettingsPage() {
  const [voiceNotifications, setVoiceNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
          <span>Employer workspace</span>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">Settings</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">Company & Recruitment Settings</h1>
        <p className="text-xs text-gray-400 mt-1">
          Manage factory credentials, autonomous voice campaign parameters, and billing details.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#0D1018] border border-white/[0.08] space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.04]">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-white">Automated Sarvam Voice Outbound Calling</h4>
            <p className="text-[11px] text-gray-400">Instantly trigger outbound vernacular phone qualification for new applicants</p>
          </div>
          <button
            type="button"
            onClick={() => setVoiceNotifications(!voiceNotifications)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              voiceNotifications ? "bg-emerald-500" : "bg-white/10"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                voiceNotifications ? "left-6.5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-white/[0.04]">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-white">Default Industrial Cluster</h4>
            <p className="text-[11px] text-gray-400">Primary manufacturing geography for proximity matching</p>
          </div>
          <span className="text-xs font-mono font-bold text-gray-200 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/10">
            Satpur MIDC & Ambad MIDC (Nashik)
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-white">Corporate Identification & GSTIN</h4>
            <p className="text-[11px] text-gray-400">U28910MH2012PTC234567 • 27AABCP1234F1Z5</p>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            VERIFIED ENTERPRISE
          </span>
        </div>
      </div>
    </div>
  );
}
