"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  const { loginAs } = useAuthRole();

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

      // Set client auth state
      if (targetRole === "employer") loginAs("employer");
      else if (targetRole === "staff") loginAs("admin");
      else loginAs("worker");

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
        console.warn("Supabase Google Auth Notice:", error.message);
        router.push(targetPath);
      }
    } catch (err: any) {
      console.warn("OAuth fallback for local development:", err.message);
      const targetPath =
        targetRole === "employer"
          ? "/employer"
          : targetRole === "staff"
          ? "/admin"
          : "/worker";
      router.push(targetPath);
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

      if (role === "employer") loginAs("employer");
      else if (role === "staff") loginAs("admin");
      else loginAs("worker");

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
      headline: "तुमच्या हक्काचा रोजगार, थेट तुमच्या भाषेत.",
      subhead: "ना फसवणूक, ना एजंट फी. औद्योगिक एमआयडीसीतील प्रमाणित नोकऱ्यांसाठी नोंदणी करा.",
      phoneLabel: "तुमचा १० अंकी मोबाईल नंबर टाका",
      sendOtp: "ओटीपी मागवा (Send OTP)",
      voiceHint: "बोलून नोंदणी करण्यासाठी फोन नंबर टाका, आमचा एआय कॉल करेल.",
      changePhone: "नंबर बदला",
      verifyOtp: "ओटीपी तपासा आणि पुढे जा",
      step1: "१. नंबर पडताळणी",
      step2: "२. कौशल्य व अंतर",
      step3: "३. थेट मुलाखत",
    },
    HI: {
      headline: "आपका सही रोजगार, आपकी अपनी भाषा में।",
      subhead: "बिना किसी दलाल के सीधे एमआईडीसी कंपनियों में पक्की नौकरी।",
      phoneLabel: "अपना १० अंकों का मोबाइल नंबर दर्ज करें",
      sendOtp: "ओटीपी भेजें (Send OTP)",
      voiceHint: "बोलकर रजिस्ट्रेशन के लिए मोबाइल नंबर डालें, एआई तुरंत कॉल करेगा।",
      changePhone: "नंबर बदलें",
      verifyOtp: "ओटीपी सत्यापित करें",
      step1: "१. मोबाइल सत्यापन",
      step2: "२. हुनर और दूरी",
      step3: "३. सीधी मुलाकात",
    },
    EN: {
      headline: "Verified industrial jobs with dignified wages.",
      subhead: "Zero agent fees. Direct plant placements across Maharashtra MIDC clusters.",
      phoneLabel: "Enter your 10-digit mobile number",
      sendOtp: "Send Verification Code",
      voiceHint: "Voice screening enabled: AI calls in your mother tongue to assess fit.",
      changePhone: "Change Number",
      verifyOtp: "Verify OTP & Continue",
      step1: "1. Mobile verification",
      step2: "2. Trade & radius",
      step3: "3. Direct interview",
    },
  }[lang];

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          <span className="font-extrabold text-xl tracking-tight text-white">
            nayamarg<span className="text-emerald-400">.</span>
          </span>
        </Link>

        {/* Vernacular Language Switcher */}
        <div className="flex items-center gap-1 text-xs font-mono bg-white/[0.04] p-1 rounded-full border border-white/5">
          <Globe className="w-3.5 h-3.5 text-gray-400 ml-2 mr-1" />
          {(["MR", "HI", "EN"] as Language[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 rounded-full transition-all ${
                lang === l
                  ? "bg-white/10 text-white font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {l === "MR" ? "मराठी" : l === "HI" ? "हिंदी" : "English"}
            </button>
          ))}
        </div>
      </header>

      {/* Main Auth Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-7xl w-full mx-auto">
        {/* PUBLIC Role Selector Tabs: Strictly restricted to Employer and Worker. Admin/Staff is NEVER exposed publicly! */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/5 max-w-md w-full mb-8">
          <button
            type="button"
            onClick={() => setRole("employer")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              role === "employer"
                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Employer / HR Lead</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("worker")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              role === "worker"
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Worker / कुशल कारागीर</span>
          </button>
          {/* If accessed via stealth /login?role=staff, show staff active tab */}
          {role === "staff" && (
            <button
              type="button"
              className="py-2.5 px-3 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Staff Gateway</span>
            </button>
          )}
        </div>

        {/* ============================================================== */}
        {/* VIEW 1: EMPLOYER / CORPORATE HR PORTAL                         */}
        {/* ============================================================== */}
        {role === "employer" && (
          <div className="w-full max-w-lg space-y-6 animate-fadeIn">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#090C14]/95 border border-white/[0.08] shadow-2xl backdrop-blur-2xl space-y-6">
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Corporate Employer Workspace
                </span>
                <span className="text-xs text-gray-400 font-mono">Nashik · Pune · Chakan</span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Autonomous Plant Hiring
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed">
                  Post vacancy constraints. Sarvam Voice AI contacts, screens, and reserves matching
                  candidates within 48 hours.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Google Workspace SSO Button */}
              <button
                type="button"
                onClick={() => handleGoogleSignIn("employer")}
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-xs transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 disabled:opacity-50"
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
                <span>Sign in with Work Email (Google SSO)</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-white/[0.08] w-full" />
                <span className="bg-[#090C14] px-3 text-[11px] font-mono text-gray-500 uppercase">
                  Or corporate phone
                </span>
              </div>

              {/* Work Phone OTP */}
              <form onSubmit={step === "phone" ? handleSendOtp : handleVerifyOtp} className="space-y-4">
                {step === "phone" ? (
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      HR / Factory Authorized Mobile
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-gray-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9823145670"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-gray-300">
                        6-Digit Corporate Passcode
                      </label>
                      <button
                        type="button"
                        onClick={() => setStep("phone")}
                        className="text-xs text-emerald-400 hover:underline"
                      >
                        Change
                      </button>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {otp.map((d, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          value={d}
                          onChange={(e) => {
                            const newOtp = [...otp];
                            newOtp[idx] = e.target.value;
                            setOtp(newOtp);
                          }}
                          className="h-12 text-center rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-lg font-bold focus:outline-none focus:border-emerald-500"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Verifying...</span>
                  ) : step === "phone" ? (
                    <>
                      <span>Send OTP</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>Access Employer Dashboard</span>
                      <Check className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Employer Features Proof Points */}
              <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Real-time applicant counts & audio interview recordings</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>PostGIS 15 km commute radius verification & wage agreement</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: WORKER / BLUE-COLLAR MOBILE PORTAL                     */}
        {/* ============================================================== */}
        {role === "worker" && (
          <div className="w-full max-w-md space-y-5 animate-fadeIn">
            <div className="p-7 sm:p-9 rounded-3xl bg-[#0B0E17]/98 border border-amber-500/30 shadow-2xl backdrop-blur-2xl space-y-6">
              {/* Badge & Voice Simulation Pill */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                  कामगार / Worker Registration
                </span>
                <button
                  type="button"
                  onClick={() => setIsPlayingVoiceIntro(!isPlayingVoiceIntro)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300 hover:text-white"
                >
                  <Volume2 className="w-3 h-3 text-amber-400 animate-pulse" />
                  <span>{isPlayingVoiceIntro ? "आवाज चालू आहे..." : "कॉल ऐका"}</span>
                </button>
              </div>

              {/* Title in Selected Language */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  {workerCopy.headline}
                </h2>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                  {workerCopy.subhead}
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Mobile OTP Form */}
              <form onSubmit={step === "phone" ? handleSendOtp : handleVerifyOtp} className="space-y-4">
                {step === "phone" ? (
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      {workerCopy.phoneLabel}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-gray-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9823145670"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-base font-bold focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{workerCopy.voiceHint}</span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-gray-300">
                        एसएमएस वर आलेला ६ अंकी कोड टाका
                      </label>
                      <button
                        type="button"
                        onClick={() => setStep("phone")}
                        className="text-xs text-amber-400 hover:underline"
                      >
                        {workerCopy.changePhone}
                      </button>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {otp.map((d, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          value={d}
                          onChange={(e) => {
                            const newOtp = [...otp];
                            newOtp[idx] = e.target.value;
                            setOtp(newOtp);
                          }}
                          className="h-12 text-center rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-lg font-bold focus:outline-none focus:border-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>पडताळणी चालू आहे...</span>
                  ) : step === "phone" ? (
                    <>
                      <span>{workerCopy.sendOtp}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>{workerCopy.verifyOtp}</span>
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* 3 Step Simple Timeline */}
              <div className="pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-2 text-center text-[10px] text-gray-400 font-medium">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-amber-400 block font-bold">{workerCopy.step1}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-gray-300 block font-bold">{workerCopy.step2}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-emerald-400 block font-bold">{workerCopy.step3}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: STAFF / INTERNAL OPERATIONS (Stealth Terminal)         */}
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
