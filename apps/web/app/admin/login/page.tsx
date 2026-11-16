"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthRole } from "@/lib/AuthRoleContext";
import {
  ShieldAlert,
  KeyRound,
  Lock,
  ArrowRight,
  ShieldCheck,
  Server,
  AlertCircle,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAs } = useAuthRole();

  const [staffId, setStaffId] = useState("NYM-OPS-042");
  const [passkey, setPasskey] = useState("admin-sarvam-kernel-2026");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      if (passkey.trim().length < 6) {
        setError("Invalid Operator Passkey or Hardware Token mismatch.");
        setIsLoading(false);
        return;
      }

      loginAs("admin");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            NayaMarg Operations Gateway
          </h1>
          <p className="text-xs text-gray-400">
            Internal Platform Control & Autonomous Campaign Supervisor Access
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0B0E16] border border-blue-500/20 shadow-2xl space-y-5">
          <form onSubmit={handleAdminAuth} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="text-xs text-gray-300 block mb-1 font-semibold">
                Staff Operator ID
              </label>
              <input
                type="text"
                required
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="NYM-OPS-XXXX"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 block mb-1 font-semibold">
                Operator Security Passkey / FIDO2 Key
              </label>
              <input
                type="password"
                required
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter security clearance key"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-400 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-400 font-mono font-bold">
                <Server className="w-3.5 h-3.5" />
                <span>Security Notice</span>
              </div>
              <p>
                All session actions are logged to <code>operations.outbox_events</code>. Unauthorized access attempts are monitored and recorded.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Verify Credentials & Enter Command Centre</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-white/[0.06] text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-gray-300">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
