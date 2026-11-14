"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRecruitment } from "@/lib/RecruitmentContext";
import {
  Briefcase,
  MapPin,
  CheckSquare,
  IndianRupee,
  Target,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function PostJobPage() {
  const router = useRouter();
  const { addJob } = useRecruitment();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "Machine Operator (CNC / Lathe)",
    employerName: "Precision Forge & Tools Ltd.",
    category: "Manufacturing",
    description: "Operate high precision CNC turning center, execute daily maintenance and quality checks.",
    address: "Plot 42, Satpur MIDC Industrial Area",
    city: "Nashik",
    state: "Maharashtra",
    pincode: "422007",
    radiusKm: 25,
    transportProvided: true,
    skills: ["Machine Operation", "CNC Turning", "Quality Check"],
    newSkillInput: "",
    minExpYears: 1,
    maxExpYears: 5,
    languages: ["Hindi", "Marathi"],
    education: "ITI or Diploma in Mechanical",
    salaryMin: 16000,
    salaryMax: 18500,
    salaryPeriod: "monthly" as const,
    shift: "day" as const,
    workingDays: "Monday to Saturday (6 days)",
    benefits: "PF + ESIC + Subsidized Canteen",
    joiningWindow: "within_7_days" as const,
    vacancies: 10,
    targetCoverageFactor: 1.5,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdJobId, setCreatedJobId] = useState<string | null>(null);

  const steps = [
    { num: 1, title: "Job Basics", icon: Briefcase },
    { num: 2, title: "Work Location", icon: MapPin },
    { num: 3, title: "Requirements", icon: CheckSquare },
    { num: 4, title: "Salary & Shift", icon: IndianRupee },
    { num: 5, title: "Hiring Target", icon: Target },
    { num: 6, title: "Review & Dispatch", icon: Sparkles },
  ];

  const handleAddSkill = () => {
    if (formData.newSkillInput.trim() && !formData.skills.includes(formData.newSkillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.newSkillInput.trim()],
        newSkillInput: "",
      });
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const jobId = addJob({
        title: formData.title,
        employerName: formData.employerName,
        category: formData.category,
        vacancies: Number(formData.vacancies),
        location: {
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          latitude: 19.9975,
          longitude: 73.7898,
          radiusKm: Number(formData.radiusKm),
        },
        salary: {
          min: Number(formData.salaryMin),
          max: Number(formData.salaryMax),
          period: formData.salaryPeriod,
        },
        experience: {
          minYears: Number(formData.minExpYears),
          maxYears: Number(formData.maxExpYears),
        },
        languages: formData.languages,
        skills: formData.skills,
        shift: formData.shift,
        employmentType: "full_time",
        joiningWindow: formData.joiningWindow,
        targetCoverageFactor: Number(formData.targetCoverageFactor),
      });

      setCreatedJobId(jobId);
      setIsSubmitting(false);
    }, 1200);
  };

  if (createdJobId) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6 rounded-3xl bg-[#0E121A] border border-emerald-500/30 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8 animate-bounce" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            Requirement Dispatched Successfully
          </span>
          <h2 className="text-2xl font-bold text-white mt-2">
            Autonomous Recruitment Active for {formData.title}
          </h2>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Job ID <strong className="text-emerald-400 font-mono">{createdJobId}</strong> has been registered. PostGIS radius search is discovering eligible candidates, and sequential voice outreach is beginning.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-left text-xs space-y-2 max-w-md mx-auto font-mono text-gray-300">
          <div className="flex justify-between">
            <span className="text-gray-500">Vacancies Requested:</span>
            <span>{formData.vacancies} Positions</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Target Candidate Pool (1.5x):</span>
            <span>{Math.ceil(formData.vacancies * formData.targetCoverageFactor)} Candidates</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Location & Radius:</span>
            <span>{formData.city} ({formData.radiusKm} km)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Autonomous Voice Agent:</span>
            <span className="text-emerald-400">Sarvam Multilingual (hi / mr)</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => router.push("/employer")}
            className="px-6 py-2.5 rounded-full bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-all shadow-lg"
          >
            Go to Employer Workspace
          </button>
          <button
            onClick={() => router.push(`/admin`)}
            className="px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all"
          >
            Monitor in Admin Command Centre
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          Post a Hiring Requirement
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          NayaMarg's Autonomous Orchestrator handles discovery, voice calls, qualification, and vacancy reservations.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {steps.map((s) => {
          const Icon = s.icon;
          const isDone = step > s.num;
          const isCurrent = step === s.num;
          return (
            <button
              key={s.num}
              onClick={() => s.num < step && setStep(s.num)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isCurrent
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold"
                  : isDone
                  ? "bg-white/[0.02] border-emerald-500/20 text-gray-300"
                  : "bg-white/[0.01] border-white/5 text-gray-500"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5">0{s.num}</span>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] truncate">{s.title}</div>
            </button>
          );
        })}
      </div>

      {/* Form Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-6">
        {/* STEP 1: Job Basics */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              Step 1: Job Basics
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Job Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. CNC Machine Operator"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Company / Facility *</label>
                  <input
                    type="text"
                    value={formData.employerName}
                    onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Industry Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0E121A] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Manufacturing">Manufacturing & Engineering</option>
                    <option value="Logistics">Logistics & Warehousing</option>
                    <option value="Construction">Construction & Infrastructure</option>
                    <option value="Electrical">Electrical & Utilities</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Job Description & Responsibilities</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Work Location */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              Step 2: Work Location & PostGIS Radius
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Workplace Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 block mb-1">State *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Radius slider */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-semibold">PostGIS Geographic Search Radius</span>
                  <span className="text-emerald-400 font-mono font-bold">{formData.radiusKm} km</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={formData.radiusKm}
                  onChange={(e) => setFormData({ ...formData, radiusKm: Number(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <p className="text-[11px] text-gray-400">
                  Workers residing within {formData.radiusKm} km of this point will be matched via spatial coordinates.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="transport"
                  checked={formData.transportProvided}
                  onChange={(e) => setFormData({ ...formData, transportProvided: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
                <label htmlFor="transport" className="text-xs text-gray-300 cursor-pointer">
                  Company transport or bus route provided from major transit stops
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Requirements */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              Step 3: Skills & Candidate Requirements
            </h2>

            <div className="space-y-4">
              {/* Skills picker */}
              <div>
                <label className="text-xs text-gray-300 block mb-1">Required Skills *</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formData.newSkillInput}
                    onChange={(e) => setFormData({ ...formData, newSkillInput: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                    placeholder="Type skill & press Enter (e.g. PLC Wiring)"
                    className="flex-1 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1.5"
                    >
                      {s}
                      <button
                        onClick={() => handleRemoveSkill(s)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Min Experience (Years)</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.minExpYears}
                    onChange={(e) => setFormData({ ...formData, minExpYears: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Max Experience (Years)</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.maxExpYears}
                    onChange={(e) => setFormData({ ...formData, maxExpYears: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="text-xs text-gray-300 block mb-1">Voice Agent Languages</label>
                <div className="flex gap-4 text-xs text-gray-300">
                  {["Hindi", "Marathi", "English"].map((lang) => (
                    <label key={lang} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(lang)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, languages: [...formData.languages, lang] });
                          } else {
                            setFormData({
                              ...formData,
                              languages: formData.languages.filter((l) => l !== lang),
                            });
                          }
                        }}
                        className="accent-emerald-500"
                      />
                      <span>{lang}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Salary & Shift */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-emerald-400" />
              Step 4: Salary & Shift Details
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Min Salary (₹/month) *</label>
                  <input
                    type="number"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Max Salary (₹/month) *</label>
                  <input
                    type="number"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Shift Type *</label>
                  <select
                    value={formData.shift}
                    onChange={(e) => setFormData({ ...formData, shift: e.target.value as any })}
                    className="w-full px-4 py-2 rounded-xl bg-[#0E121A] border border-white/10 text-white text-xs"
                  >
                    <option value="day">Day Shift (8 Hours)</option>
                    <option value="night">Night Shift</option>
                    <option value="rotational">Rotational Shift</option>
                    <option value="any">Flexible / Any</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Joining Window *</label>
                  <select
                    value={formData.joiningWindow}
                    onChange={(e) => setFormData({ ...formData, joiningWindow: e.target.value as any })}
                    className="w-full px-4 py-2 rounded-xl bg-[#0E121A] border border-white/10 text-white text-xs"
                  >
                    <option value="immediate">Immediate (1-3 Days)</option>
                    <option value="within_7_days">Within 7 Days</option>
                    <option value="within_15_days">Within 15 Days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Benefits Included</label>
                <input
                  type="text"
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  placeholder="e.g. PF + ESIC + Canteen + Overtime Bonus"
                  className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Hiring Target & Coverage */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Step 5: Hiring Target & Capacity Formula
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Number of Vacancies to Fill *</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.vacancies}
                  onChange={(e) => setFormData({ ...formData, vacancies: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-base font-bold font-mono"
                />
              </div>

              {/* Coverage factor card */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 font-semibold">Candidate Pool Coverage Multiplier</span>
                  <span className="text-emerald-400 font-mono font-bold">{formData.targetCoverageFactor}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="2.5"
                  step="0.1"
                  value={formData.targetCoverageFactor}
                  onChange={(e) => setFormData({ ...formData, targetCoverageFactor: Number(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                  <strong>Autonomous Pipeline Target:</strong> To reliably fill <strong>{formData.vacancies}</strong> confirmed joinings, the orchestrator will qualify{" "}
                  <strong>{Math.ceil(formData.vacancies * formData.targetCoverageFactor)}</strong> interested candidates before auto-pausing as <code>PIPELINE_READY</code>.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Review & Submit */}
        {step === 6 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Step 6: Review & Autonomous Dispatch
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <h3 className="font-bold text-gray-300 uppercase tracking-wider text-[10px]">Position Overview</h3>
                <p className="text-sm font-bold text-white">{formData.title}</p>
                <p className="text-gray-400">{formData.employerName} · {formData.category}</p>
                <p className="text-gray-400">Vacancies: <strong className="text-white">{formData.vacancies} slots</strong></p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <h3 className="font-bold text-gray-300 uppercase tracking-wider text-[10px]">Location & Radius</h3>
                <p className="text-white font-semibold">{formData.city}, {formData.state}</p>
                <p className="text-gray-400">Search Radius: <strong className="text-emerald-400">{formData.radiusKm} km</strong></p>
                <p className="text-gray-400">PIN: {formData.pincode}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <h3 className="font-bold text-gray-300 uppercase tracking-wider text-[10px]">Compensation & Shifts</h3>
                <p className="text-emerald-400 font-bold font-mono">₹{formData.salaryMin.toLocaleString()} – ₹{formData.salaryMax.toLocaleString()} / mo</p>
                <p className="text-gray-400">Shift: {formData.shift.toUpperCase()} · Joining: {formData.joiningWindow.replace("_", " ")}</p>
                <p className="text-gray-400">Benefits: {formData.benefits}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <h3 className="font-bold text-gray-300 uppercase tracking-wider text-[10px]">Voice Qualification</h3>
                <p className="text-white font-semibold">Sarvam Voice Engine (hi-IN, mr-IN)</p>
                <p className="text-gray-400">Required Skills: {formData.skills.join(", ")}</p>
                <p className="text-gray-400">Pipeline Target: {Math.ceil(formData.vacancies * formData.targetCoverageFactor)} candidates</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                By submitting, the requirement will be checked for telecom calling compliance and candidate locks before sequential calling begins.
              </span>
            </div>
          </div>
        )}

        {/* Nav Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 font-semibold flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-full bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 flex items-center gap-1.5 transition-all shadow-lg active:scale-95"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-full bg-emerald-500 text-black text-xs font-extrabold hover:bg-emerald-400 flex items-center gap-2 transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Activating Autonomous Pipeline...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm & Start Recruitment</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
