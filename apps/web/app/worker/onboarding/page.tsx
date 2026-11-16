"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  MapPin,
  Briefcase,
  IndianRupee,
  FileCheck2,
  PhoneCall,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function WorkerOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: "Ramesh Tukaram Shinde",
    phone: "9823145670",
    language: "mr",
    city: "Nashik",
    area: "Satpur MIDC",
    pincode: "422007",
    maxCommuteKm: 25,

    // Step 2: Work Preferences
    tradeCategory: "MANUFACTURING",
    expectedSalary: 18000,
    preferredShift: "day",
    joiningWindow: "within_7_days",

    // Step 3: Skills & Experience
    primaryTrade: "CNC Machine Operator",
    experienceYears: 3.5,
    skills: ["CNC Milling", "Lathe Machine", "Tool Setup", "Quality Check"],
    currentEmployer: "Local Engineering Works, Ambad",

    // Step 4: Documents
    hasAadhaar: true,
    hasPan: true,
    hasBankPassbook: true,

    // Step 5: Communication Preferences & TRAI Consent
    voiceCallConsent: true,
    preferredCallingWindow: "morning", // morning, afternoon, any
    callLanguage: "mr-IN",
  });

  const handleNext = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      if (step < 5) {
        setStep(step + 1);
      } else {
        // Completed onboarding! Route to worker workspace
        router.push("/worker");
      }
    }, 400);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Top Header */}
      <header className="border-b border-white/[0.08] bg-[#0A0D15]/90 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            NAYAMARG<span className="text-amber-400">.</span>
          </Link>
          <div className="text-xs font-mono text-gray-400">
            Step <span className="text-white font-bold">{step}</span> of 5
          </div>
        </div>
      </header>

      {/* Main Form Body */}
      <main className="max-w-3xl mx-auto px-4 py-8 w-full flex-1 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Set up your work profile
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Complete your profile once to receive matching factory jobs across Nashik.
          </p>
        </div>

        {/* Stepper Tabs Bar */}
        <div className="grid grid-cols-5 gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-semibold text-center">
          {[
            { num: 1, label: "01. Personal" },
            { num: 2, label: "02. Preferences" },
            { num: 3, label: "03. Skills" },
            { num: 4, label: "04. Documents" },
            { num: 5, label: "05. Consent" },
          ].map((s) => (
            <div
              key={s.num}
              className={`py-2 px-1 rounded-xl transition-all truncate ${
                step === s.num
                  ? "bg-amber-500 text-black font-extrabold shadow"
                  : step > s.num
                  ? "text-emerald-400 font-bold bg-emerald-500/10"
                  : "text-gray-500"
              }`}
            >
              {step > s.num ? `✓ ${s.label.split(".")[1]}` : s.label}
            </div>
          ))}
        </div>

        {/* Active Step Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121A] border border-white/[0.08] shadow-2xl space-y-6">
          {/* STEP 1: PERSONAL DETAILS */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1 pb-3 border-b border-white/[0.06]">
                <h2 className="text-base font-bold text-white">01. Personal details</h2>
                <p className="text-xs text-gray-400">Name, phone, language and location</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-300">Full Name (पूर्ण नाव)</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-300">Verified Phone Number</label>
                    <div className="px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 font-mono">
                      +91 {formData.phone}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-300">Primary Language (भाषा)</label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141824] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="mr">मराठी (Marathi)</option>
                      <option value="hi">हिंदी (Hindi)</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-300">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-300">Industrial Area</label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-300">Pincode</label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: WORK PREFERENCES */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1 pb-3 border-b border-white/[0.06]">
                <h2 className="text-base font-bold text-white">02. Work preferences</h2>
                <p className="text-xs text-gray-400">Job type, salary, location and shifts</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-300">Expected Monthly Salary (₹)</label>
                    <input
                      type="number"
                      value={formData.expectedSalary}
                      onChange={(e) => setFormData({ ...formData, expectedSalary: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-300">Preferred Shift</label>
                    <select
                      value={formData.preferredShift}
                      onChange={(e) => setFormData({ ...formData, preferredShift: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141824] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="day">Day shift only (८ तास)</option>
                      <option value="rotational">Rotational shift allowed</option>
                      <option value="night">Night shift</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-300">Joining Availability</label>
                    <select
                      value={formData.joiningWindow}
                      onChange={(e) => setFormData({ ...formData, joiningWindow: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141824] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="immediate">Immediate (१-२ दिवसांत)</option>
                      <option value="within_7_days">Within 7 days (एका आठवड्यात)</option>
                      <option value="within_15_days">Within 15 days</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-300">Maximum Commute Distance</label>
                    <select
                      value={formData.maxCommuteKm}
                      onChange={(e) => setFormData({ ...formData, maxCommuteKm: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141824] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value={10}>10 km</option>
                      <option value={20}>20 km</option>
                      <option value={25}>25 km (Recommended)</option>
                      <option value={35}>35 km</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SKILLS AND EXPERIENCE */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1 pb-3 border-b border-white/[0.06]">
                <h2 className="text-base font-bold text-white">03. Skills and experience</h2>
                <p className="text-xs text-gray-400">Trade, experience and verified capabilities</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-300">Primary Trade / Role</label>
                    <input
                      type="text"
                      value={formData.primaryTrade}
                      onChange={(e) => setFormData({ ...formData, primaryTrade: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-300">Total Experience (Years)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-300">Verified Technical Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DOCUMENTS */}
          {step === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1 pb-3 border-b border-white/[0.06]">
                <h2 className="text-base font-bold text-white">04. Verification documents</h2>
                <p className="text-xs text-gray-400">Check availability of essential employment records</p>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { key: "hasAadhaar", label: "Aadhaar Card (आधार कार्ड)" },
                  { key: "hasPan", label: "PAN Card (पॅन कार्ड)" },
                  { key: "hasBankPassbook", label: "Bank Account Passbook / Cheque (बँक खाते)" },
                ].map((doc) => (
                  <div
                    key={doc.key}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        [doc.key]: !formData[doc.key as keyof typeof formData],
                      })
                    }
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 flex items-center justify-between cursor-pointer transition-all"
                  >
                    <span className="font-medium text-white">{doc.label}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                        formData[doc.key as keyof typeof formData]
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-white/5 text-gray-400"
                      }`}
                    >
                      {formData[doc.key as keyof typeof formData] ? "उपलब्ध आहे (Available ✓)" : "नाही (Pending)"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: COMMUNICATION PREFERENCES & CONSENT */}
          {step === 5 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1 pb-3 border-b border-white/[0.06]">
                <h2 className="text-base font-bold text-white">05. Communication preferences</h2>
                <p className="text-xs text-gray-400">
                  Language, contact channels and purpose-specific consent
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="font-bold text-white text-sm">
                      TRAI DLT Voice Outreach Consent
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-[11px]">
                    I grant explicit consent to NayaMarg to initiate automated telephone calls and SMS
                    notifications to +91 {formData.phone} exclusively for matching factory employment
                    opportunities in Maharashtra.
                  </p>
                  <div className="pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-amber-300 font-bold">
                      <input
                        type="checkbox"
                        checked={formData.voiceCallConsent}
                        onChange={(e) => setFormData({ ...formData, voiceCallConsent: e.target.checked })}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-0"
                      />
                      <span>सहमती मंजूर केली (Consent Granted)</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-300">Voice Interview Language</label>
                    <select
                      value={formData.callLanguage}
                      onChange={(e) => setFormData({ ...formData, callLanguage: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141824] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="mr-IN">मराठी (Marathi)</option>
                      <option value="hi-IN">हिंदी (Hindi)</option>
                      <option value="en-IN">English</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-300">Preferred Calling Window</label>
                    <select
                      value={formData.preferredCallingWindow}
                      onChange={(e) => setFormData({ ...formData, preferredCallingWindow: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141824] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="morning">Morning (10:00 AM – 1:00 PM)</option>
                      <option value="afternoon">Afternoon (2:00 PM – 5:00 PM)</option>
                      <option value="any">Any reasonable daytime hour</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Footer Controls */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-gray-300 font-semibold text-xs flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <span className="text-[11px] font-mono text-gray-500">Auto-saving progress</span>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={isSaving}
              className="px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all shadow-lg flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <span className="animate-pulse">Saving...</span>
              ) : (
                <>
                  <span>{step === 5 ? "Complete & Enter Workspace" : "Continue"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
