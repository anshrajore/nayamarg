"use client";

import React from "react";
import Link from "next/link";
import { Files, CheckCircle2, ShieldCheck, Upload, FileText } from "lucide-react";

export default function WorkerDocumentsPage() {
  const documents = [
    { title: "Aadhaar Card", status: "Verified", date: "Verified via UIDAI e-KYC", icon: ShieldCheck, color: "emerald" },
    { title: "PAN Card", status: "Uploaded", date: "Added during onboarding", icon: FileText, color: "blue" },
    { title: "Bank Passbook / Cancelled Cheque", status: "Uploaded", date: "Bank of Maharashtra (Nashik Branch)", icon: FileText, color: "blue" },
    { title: "ITI Certificate (Turner / Machinist)", status: "Optional", date: "Not uploaded yet", icon: Upload, color: "gray" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
          <span>Worker workspace</span>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Documents</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">Verified Documents & KYC</h1>
        <p className="text-xs text-gray-400 mt-1">
          Stored securely. Used only for direct factory verification and salary account processing.
        </p>
      </div>

      <div className="space-y-3">
        {documents.map((doc, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#0D1018] border border-white/[0.08] flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-300">
                <doc.icon className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{doc.title}</h4>
                <p className="text-[11px] text-gray-400">{doc.date}</p>
              </div>
            </div>

            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                doc.color === "emerald"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : doc.color === "blue"
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  : "bg-white/5 text-gray-400 border-white/10"
              }`}
            >
              {doc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
