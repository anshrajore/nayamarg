"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  ShieldCheck,
  Building2,
  Users,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"employer" | "admin" | "worker">("employer");
  const [phone, setPhone] = useState("9823145670");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState(["4", "8", "2", "1", "9", "0"]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === "employer") router.push("/employer");
      else if (role === "admin") router.push("/admin");
      else router.push("/worker");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block group">
            <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              nayamarg<span className="text-emerald-400">.</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-white">Sign in to your Portal</h1>
          <p className="text-xs text-gray-400">
            Secure OTP authentication for employers, operational admins, and trade candidates.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setRole("employer")}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              role === "employer"
                ? "bg-emerald-500 text-black shadow font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Employer</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              role === "admin"
                ? "bg-blue-600 text-white shadow font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("worker")}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              role === "worker"
                ? "bg-amber-500 text-black shadow font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Worker</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="p-6 rounded-3xl bg-[#0E121A] border border-white/[0.08] shadow-2xl space-y-5">
          {step === "phone" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs text-gray-300 block mb-1 font-semibold">
                  Mobile Number (India)
                </label>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-gray-400">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-1.5">
                  A 6-digit one-time password will be sent via DLT-registered SMS.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-full text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                  role === "employer"
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                    : role === "admin"
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-amber-500 hover:bg-amber-400 text-black"
                }`}
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs text-gray-400">
                  Code sent to <strong className="text-white font-mono">+91 {phone}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="text-[11px] text-emerald-400 hover:underline block mx-auto"
                >
                  Change number
                </button>
              </div>

              <div className="flex justify-center gap-2 my-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-10 h-12 rounded-xl bg-white/[0.04] border border-white/10 text-center text-lg font-bold text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-full text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                  role === "employer"
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                    : role === "admin"
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-amber-500 hover:bg-amber-400 text-black"
                }`}
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify OTP & Enter {role.toUpperCase()}</span>
                  </>
                )}
              </button>
            </form>
          )}

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
