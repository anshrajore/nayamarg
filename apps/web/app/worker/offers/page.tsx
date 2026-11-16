"use client";

import React from "react";
import Link from "next/link";
import { Award, Clock, FileCheck2, ArrowRight } from "lucide-react";

export default function WorkerOffersPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
          <span>Worker workspace</span>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Offers</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">Employment Offers</h1>
        <p className="text-xs text-gray-400 mt-1">
          Official joining letters, agreed wages, and documented work contracts.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-[#0D1018] border border-white/[0.08] text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
          <Clock className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">No pending offers</h3>
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          Your interview at Precision Forge & Tools Ltd. is scheduled for Monday, Nov 18. Upon successful plant clearance, your formal offer letter will appear here.
        </p>
        <Link
          href="/worker/interviews"
          className="inline-block mt-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/10 text-white font-bold text-xs transition-all"
        >
          Check Scheduled Interviews
        </Link>
      </div>
    </div>
  );
}
