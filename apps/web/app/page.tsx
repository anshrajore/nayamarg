"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Factory, Users, Building2, PhoneCall } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GeospatialRadar } from "@/components/GeospatialRadar";
import { LiveVoiceSimulator } from "@/components/LiveVoiceSimulator";

export default function PublicHomePage() {
  return (
    <div className="min-h-screen bg-[#06080E] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 max-w-6xl mx-auto w-full text-center space-y-8">
        <div className="space-y-4 max-w-3xl mx-auto">
          <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 inline-block">
            RECRUITMENT · WORKFORCE · OPPORTUNITY
          </span>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            The right people. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-white">
              The right opportunities.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            NayaMarg connects businesses looking to hire with workers looking for meaningful
            employment in Maharashtra's industrial clusters.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login?role=worker"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm transition-all shadow-lg shadow-amber-500/15 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Find work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login?role=employer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-gray-100 text-black font-extrabold text-sm transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Hire workers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Brand Visual — Spatial Radar / Operational Canvas */}
        <div className="pt-4 max-w-5xl mx-auto">
          <div className="p-3 sm:p-5 rounded-3xl bg-[#0B0E16]/80 border border-white/[0.08] shadow-2xl backdrop-blur-xl">
            <GeospatialRadar />
          </div>
        </div>
      </section>

      {/* Choose Your Journey Section */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-8 border-t border-white/[0.06]">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Choose your journey
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Tailored workflows for candidates seeking employment and businesses managing headcount.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Journey 1: Looking for work */}
          <div className="p-8 rounded-3xl bg-[#0D1018] border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">I'm looking for work</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Explore local factory jobs, create your verified work profile, and receive automated
                voice call interviews directly in Marathi or Hindi.
              </p>
            </div>

            <Link
              href="/login?role=worker"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-amber-400 group-hover:text-amber-300 transition-colors"
            >
              <span>Create worker account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Journey 2: Hiring */}
          <div className="p-8 rounded-3xl bg-[#0D1018] border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">I'm hiring</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Publish hiring requirements, discover verified candidates within your commute radius,
                and track recruitment from applicant screening to physical joining.
              </p>
            </div>

            <Link
              href="/login?role=employer"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-400 group-hover:text-emerald-300 transition-colors"
            >
              <span>Register your business</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* How NayaMarg Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-10 border-t border-white/[0.06]">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono tracking-widest uppercase text-gray-400 font-bold">
            END-TO-END PROCESS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            How NayaMarg works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 01 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <span className="text-2xl font-black text-emerald-400 font-mono">01</span>
            <h3 className="text-base font-bold text-white">Create a profile</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Workers complete their trade profile and commute preferences; employers register their
              company and plant locations.
            </p>
          </div>

          {/* Step 02 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <span className="text-2xl font-black text-emerald-400 font-mono">02</span>
            <h3 className="text-base font-bold text-white">Find or post work</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Employers publish requirements with discrete vacancy slots; workers browse verified
              factory opportunities.
            </p>
          </div>

          {/* Step 03 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <span className="text-2xl font-black text-emerald-400 font-mono">03</span>
            <h3 className="text-base font-bold text-white">Connect and interview</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Autonomous voice campaigns qualify interested candidates sequentially, and interview
              dates are scheduled seamlessly.
            </p>
          </div>

          {/* Step 04 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <span className="text-2xl font-black text-emerald-400 font-mono">04</span>
            <h3 className="text-base font-bold text-white">Complete hiring</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Offers are sent and physical joining is confirmed, automatically locking vacancy slots
              and updating employer reports.
            </p>
          </div>
        </div>
      </section>

      {/* Voice Assistant Demonstration */}
      <section id="voice-screening" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-6 border-t border-white/[0.06]">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold">
            VERNACULAR VOICE RECRUITMENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Conversational screening in Marathi & Hindi
          </h2>
          <p className="text-xs text-gray-400 max-w-xl mx-auto">
            Experience how NayaMarg qualifies worker readiness, salary alignment, and availability over
            standard telephone calls.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <LiveVoiceSimulator />
        </div>
      </section>

      {/* Footer */}
      <footer id="help" className="mt-auto border-t border-white/[0.06] bg-[#07090F] py-10 px-4 sm:px-6 text-xs text-gray-500 font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">NAYAMARG</span>
            <span>· Industrial Recruitment Platform · Maharashtra Trade Network</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/#about" className="hover:text-gray-300 transition-colors">
              About
            </Link>
            <Link href="/#help" className="hover:text-gray-300 transition-colors">
              Contact
            </Link>
            <Link href="/#help" className="hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link href="/#help" className="hover:text-gray-300 transition-colors">
              Terms
            </Link>
            <Link href="/#help" className="hover:text-gray-300 transition-colors">
              Support
            </Link>
            <Link href="/login?role=staff" className="text-gray-600 hover:text-blue-400 transition-colors">
              Staff
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
