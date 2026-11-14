"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { ShieldCheck, ArrowRight, UserCheck, Briefcase, Phone, Sparkles, LogOut } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const [role, setRole] = useState<"employer" | "worker">("employer");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback?next=${role === "employer" ? "/#featured-talent" : "/#worker"}`
          : "http://localhost:3000/auth/callback";

      const { data, error } = await supabase.auth.signInWithOAuth({
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
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-[#050608] text-gray-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-blue-500/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Header Logo */}
      <Link href="/" className="mb-8 flex items-center gap-1.5 group">
        <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-gray-200 transition-colors">
          nayamarg<span className="text-emerald-400">.</span>
        </span>
      </Link>

      {/* Main Auth Card */}
      <div className="w-full max-w-md art-card p-8 sm:p-10 border border-white/10 shadow-2xl relative z-10 bg-[#0E1016]/90 backdrop-blur-2xl rounded-3xl">
        {user ? (
          /* User Logged In State */
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <UserCheck className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Authenticated Session</h2>
              <p className="text-xs text-gray-400 mt-1">{user.email}</p>
              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Supabase Auth Active
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/#featured-talent"
                className="w-full py-3 px-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <span>Go to Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handleSignOut}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all text-xs font-medium flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Sign In Form */
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Single Identity Sign-In</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Access NayaMarg</h1>
              <p className="text-xs text-gray-400 mt-1">One secure portal for employers and skilled workers</p>
            </div>

            {/* Role Toggle */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-white/[0.04] rounded-2xl border border-white/5 mb-6 text-xs">
              <button
                type="button"
                onClick={() => setRole("employer")}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all font-medium ${
                  role === "employer"
                    ? "bg-white text-black shadow-md font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Employer</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("worker")}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all font-medium ${
                  role === "worker"
                    ? "bg-white text-black shadow-md font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Worker</span>
              </button>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                {errorMessage}
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-gray-100 text-gray-900 font-semibold text-sm transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
            >
              {/* Google Brand SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              <span>{loading ? "Redirecting..." : `Continue with Google as ${role === "employer" ? "Employer" : "Worker"}`}</span>
            </button>

            {/* Separator */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <span className="relative px-3 bg-[#0E1016] text-[11px] uppercase tracking-wider text-gray-500 font-mono">
                or mobile OTP
              </span>
            </div>

            {/* Fast Phone Login input for Industrial Workers */}
            <div className="space-y-3">
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+91 98000 00000"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={() => setErrorMessage("OTP Gateway verification: please use Google Sign-In above.")}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors"
              >
                Get Voice / SMS Code
              </button>
            </div>

            {/* Security note */}
            <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Protected by Supabase Row-Level Security</span>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-300 transition-colors">
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
}
