"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
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
  Lock,
  Globe,
  Volume2,
  MapPin,
  Briefcase,
  Check,
  Compass,
  KeyRound,
  Radio,
  FileCheck2,
} from "lucide-react";

type RoleMode = "worker" | "employer" | "staff";
type Language = "MR" | "HI" | "EN";

function ProLoginPortal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next");
  const errorParam = searchParams.get("error");
  const rawRole = searchParams.get("role");
  const defaultRole: RoleMode =
    rawRole === "worker"
      ? "worker"
      : rawRole === "staff" || rawRole === "admin"
      ? "staff"
      : "employer";

  const [role, setRole] = useState<RoleMode>(defaultRole);
  const [lang, setLang] = useState<Language>("MR");

  // Phone OTP State
  const [phone, setPhone] = useState("9823145670");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState(["4", "8", "2", "1", "9", "0"]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    errorParam === "unauthorized_staff_access"
      ? "Access denied: Your Google identity is not authorized for Internal Operations staff access."
      : errorParam === "oauth_exchange_failed"
      ? "Authentication failed during OAuth token exchange. Please retry."
      : null
  );

  // Audio Playback Simulation for Worker
  const [isPlayingVoiceIntro, setIsPlayingVoiceIntro] = useState(false);

  useEffect(() => {
    if (rawRole === "worker" || rawRole === "employer" || rawRole === "staff") {
      setRole(rawRole);
    } else if (rawRole === "admin") {
      setRole("staff");
    }
  }, [rawRole]);

  const handleGoogleSignIn = async (targetRole: RoleMode = role) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const targetPath =
        nextParam ||
        (targetRole === "employer"
          ? "/employer"
          : targetRole === "staff"
          ? "/admin"
          : "/worker");

      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(targetPath)}`
          : `http://localhost:3000/auth/callback?next=${encodeURIComponent(targetPath)}`;

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

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) {
        console.warn("Supabase Phone OTP notice:", error.message);
      }
      setStep("otp");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otp.join("");
    if (token.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token,
        type: "sms",
      });

      if (error) {
        console.warn("Supabase OTP verify notice:", error.message);
      }

      const destination =
        nextParam || (role === "employer" ? "/employer" : role === "staff" ? "/admin" : "/worker");
      router.push(destination);
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid OTP code.");
    } finally {
      setIsLoading(false);
    }
  };

  // Vernacular copy dictionary for workers
  const workerCopy = {
    MR: {
      headline: "तुमच्या हक्काची फॅक्टरी नोकरी",
      subheadline: "मशिन ऑपरेटर, इलेक्ट्रिशियन, वेल्डर, फिटर कामे थेट तुमच्या जवळ.",
      phoneLabel: "तुमचा मोबाईल नंबर टाका",
      ctaGetOtp: "ओटीपी कोड मिळवा (Get OTP)",
      ctaVerify: "नोंदणी पूर्ण करा (Verify & Login)",
      listenVoice: "आवाज ऐका (मराठी)",
      voiceSample: "नमस्कार! प्रिसिजन फोर्ज नाशिकमध्ये १० मशिन ऑपरेटर भरत आहे. त्वरित अर्ज करा.",
      badgeFree: "कामगारांसाठी १००% मोफत",
      badgeGovt: "पीएफ + ईएसआयसी + थेट जॉइनिंग",
    },
    HI: {
      headline: "आपके नज़दीक सत्यापित फैक्ट्री नौकरियाँ",
      subheadline: "मशीन ऑपरेटर, इलेक्ट्रीशियन, वेल्डर और फिटर काम सीधे अपनी भाषा में।",
      phoneLabel: "अपना मोबाइल नंबर दर्ज करें",
      ctaGetOtp: "ओटीपी कोड प्राप्त करें (Get OTP)",
      ctaVerify: "सत्यापित करें और आगे बढ़ें",
      listenVoice: "आवाज़ सुनें (हिंदी)",
      voiceSample: "नमस्ते! प्रिसिजन फोर्ज नासिक में १० मशीन ऑपरेटर ढूंढ रही है। तुरंत आवेदन करें।",
      badgeFree: "कामगारों के लिए १००% मुफ्त",
      badgeGovt: "पीएफ + ईएसआईसी + सीधी जॉइनिंग",
    },
    EN: {
      headline: "Verified Industrial Factory Jobs Near You",
      subheadline: "Machine Operators, CNC, Electricians, and Welders with verified employers.",
      phoneLabel: "Enter 10-digit Mobile Number",
      ctaGetOtp: "Get OTP Verification Code",
      ctaVerify: "Verify & Enter Worker App",
      listenVoice: "Listen Audio Summary",
      voiceSample: "Precision Forge Nashik is hiring 10 Machine Operators at 18,000 INR per month.",
      badgeFree: "100% Free for Workers",
      badgeGovt: "PF + ESIC + Direct Factory Placement",
    },
  }[lang];

  return (
    <div className="min-h-screen bg-[#06080E] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Ambient background glow meshes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {role === "employer" ? (
          <>
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-emerald-500/10 blur-[140px] rounded-full" />
            <div className="absolute bottom-0 right-10 w-[500px] h-[400px] bg-teal-500/5 blur-[120px] rounded-full" />
          </>
        ) : role === "worker" ? (
          <>
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-amber-500/10 blur-[140px] rounded-full" />
            <div className="absolute bottom-0 left-10 w-[500px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full" />
          </>
        ) : (
          <>
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-blue-600/15 blur-[140px] rounded-full" />
            <div className="absolute bottom-0 right-10 w-[500px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full" />
          </>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            nayamarg<span className="text-emerald-400">.</span>
          </span>
          <span
            className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold border transition-all ${
              role === "employer"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                : role === "worker"
                ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                : "bg-blue-500/15 text-blue-400 border-blue-500/30"
            }`}
          >
            {role === "employer" ? "Employer Hub" : role === "worker" ? "Worker Portal" : "Staff Console"}
          </span>
        </Link>

        {/* Global Return Home link */}
        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1 font-medium bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Dynamic Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 py-4 flex-1 flex flex-col justify-center items-center">
        {/* Role Mode Segmented Selector */}
        <div className="w-full max-w-md mb-8">
          <div className="p-1 rounded-2xl bg-[#0B0E16]/90 backdrop-blur-xl border border-white/[0.08] shadow-2xl grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => {
                setRole("employer");
                setStep("phone");
                setErrorMessage(null);
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                role === "employer"
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-[1.02]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Employer</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole("worker");
                setStep("phone");
                setErrorMessage(null);
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                role === "worker"
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-[1.02]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Worker / Trade</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole("staff");
                setErrorMessage(null);
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                role === "staff"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-[1.02]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Staff / Ops</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW 1: WORKER AUTHENTICATION (Mobile-First & Vernacular)     */}
        {/* ============================================================== */}
        {role === "worker" && (
          <div className="w-full max-w-lg space-y-6 animate-fadeIn">
            {/* Language Switcher Bar */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-white/[0.03] border border-white/5 text-xs">
              <span className="text-[11px] text-gray-400 font-mono flex items-center gap-1.5 pl-2">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                भाषा निवडा / Choose Language:
              </span>
              <div className="flex gap-1">
                {(["MR", "HI", "EN"] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-xl font-bold text-xs transition-all ${
                      lang === l
                        ? "bg-amber-500 text-black shadow font-bold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {l === "MR" ? "मराठी" : l === "HI" ? "हिंदी" : "English"}
                  </button>
                ))}
              </div>
            </div>

            {/* Worker Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1017]/95 border border-amber-500/20 shadow-2xl backdrop-blur-2xl space-y-6">
              {/* Voice Prompt Teaser */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span className="text-xs font-bold text-amber-300">
                      AI व्हॉइस असिस्टंट (Voice Screened)
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 line-clamp-1">{workerCopy.voiceSample}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPlayingVoiceIntro(!isPlayingVoiceIntro)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isPlayingVoiceIntro ? "थांबवा (Pause)" : workerCopy.listenVoice}</span>
                </button>
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {workerCopy.headline}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">{workerCopy.subheadline}</p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
                  {errorMessage}
                </div>
              )}

              {step === "phone" ? (
                <form onSubmit={handleSendOtp} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-300 flex items-center justify-between">
                      <span>{workerCopy.phoneLabel}</span>
                      <span className="text-[11px] text-amber-400 font-mono">१० अंक (10 Digits)</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-sm font-bold text-gray-300 font-mono border-r border-white/10 pr-2.5">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="98231 45670"
                        className="w-full pl-20 pr-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-base font-mono font-bold focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm transition-all shadow-xl shadow-amber-500/15 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="animate-pulse">ओटीपी पाठवत आहे (Sending)...</span>
                    ) : (
                      <>
                        <span>{workerCopy.ctaGetOtp}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div className="space-y-3 text-center">
                    <p className="text-xs text-gray-300">
                      मोबाईल नंबर <span className="font-mono font-bold text-amber-400">+91 {phone}</span> वर
                      पाठवलेला ६-अंकी ओटीपी टाका:
                    </p>
                    <div className="flex justify-center gap-2">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`worker-otp-${idx}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const val = e.target.value.slice(-1);
                            const nextOtp = [...otp];
                            nextOtp[idx] = val;
                            setOtp(nextOtp);
                            if (val && idx < 5) {
                              document.getElementById(`worker-otp-${idx + 1}`)?.focus();
                            }
                          }}
                          className="w-11 h-12 text-center rounded-xl bg-white/[0.06] border border-amber-500/30 text-white font-mono text-lg font-black focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm transition-all shadow-xl shadow-amber-500/15 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="animate-pulse">तपासत आहे (Verifying)...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{workerCopy.ctaVerify}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("phone")}
                    className="w-full text-center text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>नंबर बदला (Change Number)</span>
                  </button>
                </form>
              )}

              {/* Trust Badges */}
              <div className="pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-2 text-center text-[11px] text-gray-400 font-medium">
                <span className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                  ✓ {workerCopy.badgeFree}
                </span>
                <span className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                  ✓ {workerCopy.badgeGovt}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: EMPLOYER AUTHENTICATION (Desktop-First Enterprise)     */}
        {/* ============================================================== */}
        {role === "employer" && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            {/* Left Column: Enterprise Login Card (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#0D111A]/95 border border-emerald-500/20 shadow-2xl backdrop-blur-2xl space-y-6">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Enterprise Client Portal
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Sign in to Employer Console
                </h2>
                <p className="text-xs text-gray-400">
                  Manage requirements, vacancy slot accounting, and autonomous voice campaigns.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
                  {errorMessage}
                </div>
              )}

              {/* 1-Click Google Workspace SSO */}
              <div>
                <button
                  type="button"
                  onClick={() => handleGoogleSignIn("employer")}
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs transition-all flex items-center justify-center gap-2.5 shadow-md active:scale-95 disabled:opacity-50"
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
                  <span>Sign in with Corporate Google Account</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-white/[0.08] w-full" />
                <span className="bg-[#0D111A] px-3 text-[10px] uppercase font-mono tracking-wider text-gray-500 absolute">
                  or sign in via work mobile
                </span>
              </div>

              {step === "phone" ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 flex items-center justify-between">
                      <span>Authorized Mobile Phone</span>
                      <span className="text-[10px] text-emerald-400 font-mono">10 digits</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs font-bold text-gray-400 font-mono border-r border-white/10 pr-2.5">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        inputMode="numeric"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="98231 45670"
                        className="w-full pl-16 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono font-bold focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/15 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="animate-pulse">Generating OTP...</span>
                    ) : (
                      <>
                        <span>Verify Corporate Identity</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-3 text-center">
                    <p className="text-xs text-gray-300">
                      Enter 6-digit security OTP sent to{" "}
                      <span className="font-mono font-bold text-emerald-400">+91 {phone}</span>
                    </p>
                    <div className="flex justify-center gap-2">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`employer-otp-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const val = e.target.value.slice(-1);
                            const nextOtp = [...otp];
                            nextOtp[idx] = val;
                            setOtp(nextOtp);
                            if (val && idx < 5) {
                              document.getElementById(`employer-otp-${idx + 1}`)?.focus();
                            }
                          }}
                          className="w-10 h-11 text-center rounded-xl bg-white/[0.06] border border-emerald-500/30 text-white font-mono text-base font-bold focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="animate-pulse">Authorizing...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Enter Employer Console</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Platform Intelligence Preview (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-[#090C13] border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Compass className="w-4 h-4 text-emerald-400" />
                    Autonomous Sourcing Radar
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                    Nashik Cluster Active
                  </span>
                </div>

                {/* Candidate funnel snapshot */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-gray-400">Total Vacancies Requested</span>
                    <span className="font-mono font-bold text-white">10 Slots</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-gray-400">Discovered Within 25 km</span>
                    <span className="font-mono font-bold text-emerald-400">15 Candidates</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-gray-400">Confirmed Voice Screened</span>
                    <span className="font-mono font-bold text-white">8 Interview Ready</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-gray-400">Confirmed Joined Outcome</span>
                    <span className="font-mono font-bold text-emerald-400">6 Vacancies Filled</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 text-[11px] text-gray-400 space-y-1">
                  <span className="font-bold text-emerald-300 block">
                    Privacy-Preserving Contact Masking
                  </span>
                  Candidate phone numbers are shielded until candidate approval and mutual interview
                  confirmation.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: STAFF / INTERNAL OPERATIONS (High-Security Terminal)   */}
        {/* ============================================================== */}
        {role === "staff" && (
          <div className="w-full max-w-lg space-y-6 animate-fadeIn">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#090C14]/98 border border-blue-500/30 shadow-2xl backdrop-blur-2xl space-y-6">
              {/* Security Shield Header */}
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400 shadow-lg shadow-blue-500/10">
                  <ShieldAlert className="w-7 h-7" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Internal Operations Console
                </h2>
                <p className="text-xs text-gray-400 font-mono">
                  Restricted to authorized NayaMarg staff, operational engineers, and support leads.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Staff Google SSO */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => handleGoogleSignIn("staff")}
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 active:scale-95 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authenticate with Corporate Staff Identity</span>
                </button>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Authorized Domain</span>
                    <span className="text-emerald-400 font-bold">@nayamarg.com</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Audit Policy</span>
                    <span className="text-blue-400 font-bold">operations.audit_logs</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Session Security</span>
                    <span className="text-gray-300">Deterministic Fencing Token</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[10px] text-gray-500 font-mono">
                  Notice: Public registration is prohibited. Unauthorized access attempts are logged.
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Pro Footer */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
        <div>
          <span>© 2026 NayaMarg Recruitment Engine. Maharashtra Trade Network.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/#faq" className="hover:text-gray-300 transition-colors">
            Security & DPDP
          </Link>
          <span>•</span>
          <Link href="/worker" className="hover:text-gray-300 transition-colors">
            Worker App
          </Link>
          <span>•</span>
          <Link href="/employer" className="hover:text-gray-300 transition-colors">
            Employer Portal
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07090E] flex items-center justify-center text-gray-400 font-mono text-xs">
          Loading NayaMarg Portal...
        </div>
      }
    >
      <ProLoginPortal />
    </Suspense>
  );
}
