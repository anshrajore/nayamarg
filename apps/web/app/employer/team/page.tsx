"use client";

import React, { useState } from "react";
import { Users, Plus, ShieldCheck, Mail, Trash2 } from "lucide-react";

export default function EmployerTeamPage() {
  const [members, setMembers] = useState([
    {
      id: "tm-1",
      name: "Sunil Deshmukh",
      email: "sunil.d@precisionforge.in",
      role: "Admin (Talent Lead)",
      status: "Active",
    },
    {
      id: "tm-2",
      name: "Pooja Kulkarni",
      email: "pooja.k@precisionforge.in",
      role: "Recruiter",
      status: "Active",
    },
    {
      id: "tm-3",
      name: "Rajesh Gaikwad",
      email: "rajesh.g@precisionforge.in",
      role: "Plant Supervisor (Satpur)",
      status: "Active",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
            <span>Employer workspace</span>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Team members</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Hiring Team & Permissions</h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage recruiter access, interview scheduling rights, and factory supervisor invitations.
          </p>
        </div>

        <button
          type="button"
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold flex items-center gap-1.5 transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="rounded-2xl bg-[#0D1018] border border-white/[0.08] divide-y divide-white/[0.04]">
        {members.map((m) => (
          <div key={m.id} className="p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{m.name}</h4>
                <p className="text-[11px] text-gray-400">{m.email} · {m.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {m.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
