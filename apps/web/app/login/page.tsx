"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useAuthRole } from "@/lib/AuthRoleContext";
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
  const { loginAs } = useAuthRole();

  const [role, setRole] = useState<"employer" | "worker">("employer");
  const [phone, setPhone] = useState("9823145670");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState(["4", "8", "2", "1", "9", "0"]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const targetPath = role === "employer" ? "/employer" : "/worker";
      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback?next=${targetPath}`
          : "http://localhost:3000/auth/callback";

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to initiate Google Authentication.");
    } finally {
      setIsLoading(false);
    }
  };

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
      loginAs(role);
    }, 600);
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
            Secure login for hiring employers and trade job seekers across India.
          </p>
        </div>

        {/* Public Role Selector Tabs (Employer & Worker Only - Admin is isolated) */}
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setRole("employer")}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              role === "employer"
                ? "bg-emerald-500 text-black shadow font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Employer / HR</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("worker")}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              role === "worker"
                ? "bg-amber-500 text-black shadow font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Worker (कामगार)</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="p-6 rounded-3xl bg-[#0E121A] border border-white/[0.08] shadow-2xl space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
              {errorMessage}
            </div>
          )}

          {/* Google SSO Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2.5 transition-all shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[11px] text-gray-500 font-mono uppercase">or mobile OTP</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

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
                    : "bg-amber-500 hover:bg-amber-400 text-black"
                }`}
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Enter {role.toUpperCase()} Workspace</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-300">
              ← Public website
            </Link>
            <Link href="/admin/login" className="text-gray-500 hover:text-blue-400 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Staff Gateway</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
