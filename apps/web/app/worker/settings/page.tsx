"use client";

import React, { useState } from "react";
import { Settings, Shield, Bell, User, Trash2 } from "lucide-react";

export default function WorkerSettingsPage() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
          <span>Worker workspace</span>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Settings</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">Account & Privacy Settings</h1>
        <p className="text-xs text-gray-400 mt-1">
          Manage your login credentials, notification preferences, and privacy controls.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.04]">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-white">Registered Mobile Number</h4>
            <p className="text-[11px] text-gray-400">Used for OTP sign in and verification calls</p>
          </div>
          <span className="text-xs font-mono font-bold text-gray-300 bg-white/[0.04] px-3 py-1 rounded-lg border border-white/10">
            +91 98231 45670
          </span>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-white/[0.04]">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-white">SMS Job Alerts</h4>
            <p className="text-[11px] text-gray-400">Receive instant SMS alerts when matching factory jobs are posted</p>
          </div>
          <button
            type="button"
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              notifications ? "bg-amber-500" : "bg-white/10"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                notifications ? "left-6.5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-red-400">Delete Account & Data</h4>
            <p className="text-[11px] text-gray-400">Permanently remove all your personal profiles and applications</p>
          </div>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-lg border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 transition-colors"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
}
