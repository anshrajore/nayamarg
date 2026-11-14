"use client";

import React from "react";
import { HelpCircle, PhoneCall, MessageSquare, AlertCircle } from "lucide-react";

export default function WorkerSupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
          <span>Worker workspace</span>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Support</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">Worker Helpline & Support</h1>
        <p className="text-xs text-gray-400 mt-1">
          NayaMarg never charges fees from workers. If anyone asks for money for jobs, report it here immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Toll-Free Helpline (मराठी / हिंदी)</h3>
          <p className="text-xs text-gray-400">
            Available Monday to Saturday from 8:00 AM to 8:00 PM.
          </p>
          <div className="text-lg font-mono font-bold text-amber-400">1800-200-6292</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">WhatsApp Assistance</h3>
          <p className="text-xs text-gray-400">
            Send a voice note or message to receive callback within 10 minutes.
          </p>
          <div className="text-lg font-mono font-bold text-emerald-400">+91 98220 12345</div>
        </div>
      </div>
    </div>
  );
}
