"use client";

import React, { useState } from "react";
import { PhoneCall, ShieldCheck, Check, Clock, Volume2 } from "lucide-react";

export default function WorkerCommunicationPage() {
  const [voiceConsent, setVoiceConsent] = useState(true);
  const [preferredLang, setPreferredLang] = useState("mr-IN");
  const [callingWindow, setCallingWindow] = useState("morning");

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
          <span>Worker workspace</span>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Communication</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">Voice & Consent Preferences</h1>
        <p className="text-xs text-gray-400 mt-1">
          Manage how NayaMarg's vernacular voice assistant communicates job offers and interview updates.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Automated Voice Screening Consent (TRAI DLT)</h3>
              <p className="text-xs text-gray-400 mt-0.5 max-w-xl">
                Allow NayaMarg AI to contact you via telephone to confirm your interest in manufacturing jobs, verify shift timings, and coordinate interview slots.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setVoiceConsent(!voiceConsent)}
            className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
              voiceConsent ? "bg-amber-500" : "bg-white/10"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                voiceConsent ? "left-6.5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/[0.04]">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Preferred Voice Language</label>
            <select
              value={preferredLang}
              onChange={(e) => setPreferredLang(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs"
            >
              <option value="mr-IN">मराठी (Marathi - Nashik Dialect)</option>
              <option value="hi-IN">हिंदी (Hindi)</option>
              <option value="en-IN">English</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Preferred Calling Window</label>
            <select
              value={callingWindow}
              onChange={(e) => setCallingWindow(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs"
            >
              <option value="morning">Morning (9:00 AM – 1:00 PM)</option>
              <option value="afternoon">Afternoon (2:00 PM – 6:00 PM)</option>
              <option value="any">Anytime between 9 AM and 8 PM</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
