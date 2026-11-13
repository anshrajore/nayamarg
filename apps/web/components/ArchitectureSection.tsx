"use client";

import React from "react";
import { Database, Server, Cpu, ShieldCheck, RefreshCw, Layers } from "lucide-react";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            Technology Architecture (Section 2 & 3)
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            System Topology & Invariant Guarantees
          </h2>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl">
            Clean architectural separation between persistent database state, independent worker runtimes, and external
            telecom/AI providers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: 4 Logical PostgreSQL Schemas */}
        <div className="p-6 rounded-card bg-[#0D0F14] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-white font-bold text-base mb-2">4 Logical PostgreSQL Schemas</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Sensitive operations are never exposed to the public Data API.
            </p>

            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                <span className="font-mono text-blue-300">public</span>
                <span className="text-gray-400 text-[11px]">Profiles & Orgs</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                <span className="font-mono text-purple-300">recruitment</span>
                <span className="text-gray-400 text-[11px]">Jobs & Vacancy Slots</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                <span className="font-mono text-amber-300">communications</span>
                <span className="text-gray-400 text-[11px]">Calls, Transcripts, SMS</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                <span className="font-mono text-emerald-300">operations</span>
                <span className="text-gray-400 text-[11px]">Outbox, Failures, Audit</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Transactional Outbox & Queue */}
        <div className="p-6 rounded-card bg-[#0D0F14] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-4">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-white font-bold text-base mb-2">Transactional Outbox Pattern</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Guarantees at-least-once domain event delivery across worker crashes and restarts.
            </p>

            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono text-[11px]">
                <div className="text-gray-400">// Atomic Database Transaction</div>
                <div className="text-purple-300">UPDATE hiring_requests...</div>
                <div className="text-emerald-300">INSERT INTO operations.outbox_events...</div>
                <div className="text-gray-400">COMMIT;</div>
              </div>
              <p className="text-gray-400 text-[11px]">
                Dispatcher reads pending events $\rightarrow$ pushes to BullMQ $\rightarrow$ workers process idempotently.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Telecom & Consent Gates */}
        <div className="p-6 rounded-card bg-[#0D0F14] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-white font-bold text-base mb-2">TRAI / DLT Regulatory Gates</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Outbound calls and SMS are strictly validated before any provider dispatch.
            </p>

            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Calling Window: 09:00 to 19:00 IST</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Mandatory Purpose-Tied Consent</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Registered DLT Header & Templates</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Instant Opt-Out Suppression</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
