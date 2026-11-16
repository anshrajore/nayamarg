"use client";

import React, { useState } from "react";
import { useAuthRole } from "@/lib/AuthRoleContext";
import {
  Building2,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  FileText,
  CreditCard,
  Sliders,
  CheckCircle2,
  Save,
  Sparkles,
} from "lucide-react";

export default function EmployerProfilePage() {
  const { employerProfile, updateEmployerProfile } = useAuthRole();
  const [formData, setFormData] = useState(employerProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmployerProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Company Profile & Hiring Settings
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage your verified enterprise credentials, plant locations, and default recruitment policies.
          </p>
        </div>

        {formData.isVerified && (
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5 self-start">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>GST Verified Entity</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Card 1: Enterprise Identity */}
        <div className="p-6 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Company Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-400 block mb-1">Company Legal Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">GSTIN Number</label>
              <input
                type="text"
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="text-gray-400 block mb-1">Registered Facility / Plant Address</label>
            <input
              type="text"
              value={formData.facilityLocation}
              onChange={(e) => setFormData({ ...formData, facilityLocation: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Card 2: Primary Authorized Contact */}
        <div className="p-6 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Authorized HR & Signatory Contact</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-gray-400 block mb-1">Contact Officer</label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Email Address</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Official Mobile Phone</label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Default Hiring Constraints */}
        <div className="p-6 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Default Recruitment Parameters</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-gray-300">Default Commute Radius</span>
                <span className="text-emerald-400 font-mono font-bold">{formData.hiringRadiusKm} km</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={formData.hiringRadiusKm}
                onChange={(e) => setFormData({ ...formData, hiringRadiusKm: Number(e.target.value) })}
                className="w-full accent-emerald-500"
              />
              <p className="text-[11px] text-gray-500">
                PostGIS spatial coordinate limit applied when publishing new job openings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-gray-300">Target Coverage Factor</span>
                <span className="text-emerald-400 font-mono font-bold">{formData.coverageMultiplier}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.1"
                value={formData.coverageMultiplier}
                onChange={(e) => setFormData({ ...formData, coverageMultiplier: Number(e.target.value) })}
                className="w-full accent-emerald-500"
              />
              <p className="text-[11px] text-gray-500">
                Orchestrator pre-qualifies {formData.coverageMultiplier}x interested candidates before pausing.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess && (
            <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Profile details saved successfully!</span>
            </span>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-all shadow-lg flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
