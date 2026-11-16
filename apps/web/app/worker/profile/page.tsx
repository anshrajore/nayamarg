"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuthRole } from "@/lib/AuthRoleContext";
import {
  User,
  MapPin,
  Briefcase,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  Save,
  Volume2,
  ArrowLeft,
  Phone,
} from "lucide-react";

export default function WorkerProfilePage() {
  const { workerProfile, updateWorkerProfile } = useAuthRole();
  const [formData, setFormData] = useState(workerProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkerProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          href="/worker"
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Worker Portal</span>
        </Link>

        {/* Title */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
              कामगार प्रोफाइल (Worker Profile)
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
              माझी माहिती आणि पसंती
            </h1>
            <p className="text-xs text-gray-400">
              Manage your trade experience, commute limits, language, and voice call preferences.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <User className="w-6 h-6" />
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Section 1: Basic Details */}
          <div className="p-6 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>Personal Details (वैयक्तिक माहिती)</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Full Name (पूर्ण नाव)</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 block mb-1">Mobile Number (फोन नंबर)</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Current Area / City (शहर / परिसर)</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Trade & Wage Expectations */}
          <div className="p-6 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>Trade & Experience (काम आणि अनुभव)</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 block mb-1">Trade / Skill Category</label>
                  <input
                    type="text"
                    value={formData.trade}
                    onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Experience in Years (एकूण अनुभव)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 block mb-1">Expected Monthly Wage (अपेक्षित वेतन ₹)</label>
                  <input
                    type="number"
                    value={formData.expectedSalary}
                    onChange={(e) => setFormData({ ...formData, expectedSalary: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-amber-400 font-bold font-mono"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Preferred Shift (शिफ्ट पसंती)</label>
                  <select
                    value={formData.shiftPreference}
                    onChange={(e) => setFormData({ ...formData, shiftPreference: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0E121A] border border-white/10 text-white"
                  >
                    <option value="Day">Day Shift (डे शिफ्ट)</option>
                    <option value="Night">Night Shift (नाईट शिफ्ट)</option>
                    <option value="Rotational">Rotational (बदलती शिफ्ट)</option>
                    <option value="Any">Flexible / Any (कोणतीही)</option>
                  </select>
                </div>
              </div>

              {/* Commute Radius Slider */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-300">Max Travel Distance (प्रवास मर्यादा)</span>
                  <span className="text-amber-400 font-mono font-bold">{formData.commuteRadiusKm} km</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="5"
                  value={formData.commuteRadiusKm}
                  onChange={(e) => setFormData({ ...formData, commuteRadiusKm: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Audio & Consent */}
          <div className="p-6 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Language & Call Consent (भाषा आणि संमती)</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Preferred Tongue for AI Voice Calls</label>
                <div className="flex gap-3">
                  {(["Marathi", "Hindi", "English"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredLanguage: l })}
                      className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
                        formData.preferredLanguage === l
                          ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                          : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      {l === "Marathi" ? "मराठी" : l === "Hindi" ? "हिन्दी" : "English"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="space-y-0.5">
                  <span className="font-semibold text-white">TRAI Voice Calling Consent</span>
                  <p className="text-[11px] text-gray-500">Allow NayaMarg AI to call you with matching opportunities.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, consentGranted: !formData.consentGranted })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    formData.consentGranted
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}
                >
                  {formData.consentGranted ? "Granted (संमती आहे)" : "Opt-out (बंद)"}
                </button>
              </div>
            </div>
          </div>

          {/* Save button */}
          <div className="flex items-center justify-between pt-2">
            {savedSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>माहिती जतन केली गेली आहे (Profile Saved)!</span>
              </span>
            )}
            <div className="ml-auto">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition-all shadow-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>बदल जतन करा (Save Profile)</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
