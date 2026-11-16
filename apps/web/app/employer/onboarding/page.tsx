"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  MapPin,
  Users,
  Briefcase,
  ShieldCheck,
  Plus,
  Trash2,
  Mail,
  Phone,
  Clock,
  Sparkles,
} from "lucide-react";

export default function EmployerOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Form state across 5 checklist steps
  const [formData, setFormData] = useState({
    // 01. Company details
    companyName: "Precision Forge & Tools Ltd.",
    businessType: "Private Limited",
    industrySector: "Automotive & Industrial Manufacturing",
    cinNumber: "U28910MH2012PTC234567",
    gstinNumber: "27AABCP1234F1Z5",
    registeredAddress: "Plot No. 42, Sector F, Satpur MIDC, Nashik, Maharashtra 422007",
    website: "https://precisionforge.example.com",

    // 02. Primary contact
    contactName: "Sunil Deshmukh",
    contactDesignation: "Head of Talent Acquisition & HR",
    contactEmail: "sunil.d@precisionforge.in",
    contactPhone: "9822012345",
    isPhoneVerified: true,

    // 03. Work locations
    locations: [
      {
        id: "loc-1",
        name: "Satpur Plant - Unit 1",
        zone: "Satpur MIDC",
        address: "Plot No. 42, Sector F, Satpur MIDC, Nashik",
        pincode: "422007",
        nearbyLandmark: "Opposite MSEB Substation",
      },
      {
        id: "loc-2",
        name: "Ambad Tooling Facility - Unit 2",
        zone: "Ambad MIDC",
        address: "Plot No. 18, MIDC Ambad, Nashik",
        pincode: "422010",
        nearbyLandmark: "Near Garware Stadium",
      },
    ],

    // 04. Team members
    teamMembers: [
      {
        id: "tm-1",
        name: "Pooja Kulkarni",
        email: "pooja.k@precisionforge.in",
        role: "Recruiter",
      },
      {
        id: "tm-2",
        name: "Rajesh Gaikwad",
        email: "rajesh.g@precisionforge.in",
        role: "Plant Supervisor",
      },
    ],

    // 05. First hiring request
    firstRequest: {
      title: "CNC Machine Operator (Lathe / Milling)",
      headcount: 15,
      minSalary: 16000,
      maxSalary: 18500,
      shift: "Day Shift (8 Hours)",
      location: "Satpur Plant - Unit 1",
      experienceRequired: "1 - 3 years",
      skills: ["CNC Programming", "Tool Setting", "Vernier Caliper", "Micrometer"],
    },
  });

  const handleNext = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      if (step < 5) {
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/employer");
      }
    }, 300);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const addLocation = () => {
    setFormData((prev) => ({
      ...prev,
      locations: [
        ...prev.locations,
        {
          id: `loc-${Date.now()}`,
          name: "New Manufacturing Unit",
          zone: "MIDC",
          address: "",
          pincode: "",
          nearbyLandmark: "",
        },
      ],
    }));
  };

  const removeLocation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.filter((l) => l.id !== id),
    }));
  };

  const addTeamMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [
        ...prev.teamMembers,
        {
          id: `tm-${Date.now()}`,
          name: "",
          email: "",
          role: "Recruiter",
        },
      ],
    }));
  };

  const removeTeamMember = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((tm) => tm.id !== id),
    }));
  };

  const stepsList = [
    { number: 1, title: "01. Company details", desc: "Business name, type and registration" },
    { number: 2, title: "02. Primary contact", desc: "Authorised representative and verified phone" },
    { number: 3, title: "03. Work locations", desc: "Branches and plant hiring locations" },
    { number: 4, title: "04. Team members", desc: "Invite recruiters and assign permissions" },
    { number: 5, title: "05. First hiring request", desc: "Role, headcount, salary and requirements" },
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Top Bar */}
      <header className="border-b border-white/[0.08] bg-[#0A0D14]/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white hover:text-emerald-400 transition-colors">
            nayamarg<span className="text-emerald-400">.</span>
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Business Onboarding
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="hidden sm:inline">Step {step} of 5</span>
          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
          <Link href="/employer" className="text-gray-400 hover:text-white transition-colors text-xs ml-2">
            Skip for now
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex-1">
        {/* Onboarding Overview Header */}
        <div className="mb-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
            EMPLOYER FIRST LOGIN
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Set up your business
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Complete the 5-step checklist to start creating verified recruitment campaigns.
          </p>
        </div>

        {/* 5-Step Progress Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
          {stepsList.map((s) => {
            const isCompleted = step > s.number;
            const isCurrent = step === s.number;
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => setStep(s.number)}
                className={`text-left p-3 rounded-xl border text-xs transition-all ${
                  isCurrent
                    ? "bg-emerald-500/15 border-emerald-500 text-white shadow-sm"
                    : isCompleted
                    ? "bg-white/[0.03] border-white/15 text-gray-300 hover:border-white/30"
                    : "bg-white/[0.01] border-white/5 text-gray-500"
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <span className={isCurrent ? "text-emerald-400 font-bold" : ""}>Step {s.number}</span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="font-semibold truncate">{s.title.split(". ")[1]}</div>
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1017] border border-white/[0.08] shadow-2xl">
          {/* STEP 1: Company Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  01. Company details
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Business name, company structure, CIN and GSTIN registration numbers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-300">Legal Business Name *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Precision Forge & Tools Ltd."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Entity Type</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Private Limited">Private Limited (Pvt Ltd)</option>
                    <option value="Public Limited">Public Limited Ltd</option>
                    <option value="LLP">Limited Liability Partnership (LLP)</option>
                    <option value="Partnership">Partnership Firm</option>
                    <option value="Proprietorship">Sole Proprietorship</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Industry Sector</label>
                  <select
                    value={formData.industrySector}
                    onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Automotive & Industrial Manufacturing">Automotive & Industrial Manufacturing</option>
                    <option value="Warehousing & Logistics">Warehousing & Logistics</option>
                    <option value="Pharmaceuticals & Chemical">Pharmaceuticals & Chemical</option>
                    <option value="Electronics Assembly">Electronics Assembly</option>
                    <option value="Textiles & Garments">Textiles & Garments</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">GSTIN Number *</label>
                  <input
                    type="text"
                    value={formData.gstinNumber}
                    onChange={(e) => setFormData({ ...formData, gstinNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono uppercase focus:outline-none focus:border-emerald-500"
                    placeholder="27AABCP1234F1Z5"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Corporate Identification Number (CIN)</label>
                  <input
                    type="text"
                    value={formData.cinNumber}
                    onChange={(e) => setFormData({ ...formData, cinNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono uppercase focus:outline-none focus:border-emerald-500"
                    placeholder="U28910MH2012PTC234567"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-300">Registered Office Address</label>
                  <textarea
                    rows={2}
                    value={formData.registeredAddress}
                    onChange={(e) => setFormData({ ...formData, registeredAddress: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="Complete corporate address..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Primary Contact */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-400" />
                  02. Primary contact
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Authorised representative who will verify candidates and approve hiring requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Representative Full Name *</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Sunil Deshmukh"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Official Designation *</label>
                  <input
                    type="text"
                    value={formData.contactDesignation}
                    onChange={(e) => setFormData({ ...formData, contactDesignation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Head of HR / Factory Manager"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Corporate Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                      placeholder="hr@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Verified Work Mobile Number *</label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-gray-300">
                      +91
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                        placeholder="9822012345"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Representative Verified</div>
                    <div className="text-[11px] text-gray-300">
                      OTP verification active. This phone receives hiring updates and candidate interview check-ins.
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/20 px-2.5 py-1 rounded-full">
                  VERIFIED
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Work Locations */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                    03. Work locations
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Plant, warehouse, or factory locations where workers will be deployed.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addLocation}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-emerald-400 font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Location</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.locations.map((loc, idx) => (
                  <div
                    key={loc.id}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Location #{idx + 1}
                      </span>
                      {formData.locations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLocation(loc.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Facility / Plant Name</label>
                        <input
                          type="text"
                          value={loc.name}
                          onChange={(e) => {
                            const updated = [...formData.locations];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, locations: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Industrial Zone / MIDC</label>
                        <input
                          type="text"
                          value={loc.zone}
                          onChange={(e) => {
                            const updated = [...formData.locations];
                            updated[idx].zone = e.target.value;
                            setFormData({ ...formData, locations: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] text-gray-400 block mb-1">Detailed Street Address</label>
                        <input
                          type="text"
                          value={loc.address}
                          onChange={(e) => {
                            const updated = [...formData.locations];
                            updated[idx].address = e.target.value;
                            setFormData({ ...formData, locations: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Pincode</label>
                        <input
                          type="text"
                          value={loc.pincode}
                          onChange={(e) => {
                            const updated = [...formData.locations];
                            updated[idx].pincode = e.target.value;
                            setFormData({ ...formData, locations: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Nearby Landmark for Workers</label>
                        <input
                          type="text"
                          value={loc.nearbyLandmark}
                          onChange={(e) => {
                            const updated = [...formData.locations];
                            updated[idx].nearbyLandmark = e.target.value;
                            setFormData({ ...formData, locations: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Team Members */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-400" />
                    04. Team members
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Invite recruiters, hiring managers and plant supervisors with permission controls.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-emerald-400 font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Invite Member</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.teamMembers.map((member, idx) => (
                  <div
                    key={member.id}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => {
                          const updated = [...formData.teamMembers];
                          updated[idx].name = e.target.value;
                          setFormData({ ...formData, teamMembers: updated });
                        }}
                        placeholder="Member Full Name"
                        className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                      />

                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => {
                          const updated = [...formData.teamMembers];
                          updated[idx].email = e.target.value;
                          setFormData({ ...formData, teamMembers: updated });
                        }}
                        placeholder="corporate@email.com"
                        className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                      />

                      <select
                        value={member.role}
                        onChange={(e) => {
                          const updated = [...formData.teamMembers];
                          updated[idx].role = e.target.value;
                          setFormData({ ...formData, teamMembers: updated });
                        }}
                        className="px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Admin">Admin (Full Control)</option>
                        <option value="Recruiter">Recruiter (Post & Shortlist)</option>
                        <option value="Plant Supervisor">Plant Supervisor (Interviews & Joining)</option>
                        <option value="Viewer">Viewer (Read-only)</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeTeamMember(member.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors self-end sm:self-center p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: First Hiring Request */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                  05. Create your first hiring request
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Specify your primary vacancy. Our autonomous engine immediately matches verified local candidates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-300">Job Title / Trade *</label>
                  <input
                    type="text"
                    value={formData.firstRequest.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstRequest: { ...formData.firstRequest, title: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Required Headcount (Vacancies) *</label>
                  <input
                    type="number"
                    value={formData.firstRequest.headcount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstRequest: { ...formData.firstRequest, headcount: Number(e.target.value) },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Target Plant Location *</label>
                  <select
                    value={formData.firstRequest.location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstRequest: { ...formData.firstRequest, location: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    {formData.locations.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name} ({loc.zone})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Monthly Wage (Min - Max INR) *</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.firstRequest.minSalary}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstRequest: { ...formData.firstRequest, minSalary: Number(e.target.value) },
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                      placeholder="16000"
                    />
                    <span className="text-gray-500 text-xs">to</span>
                    <input
                      type="number"
                      value={formData.firstRequest.maxSalary}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstRequest: { ...formData.firstRequest, maxSalary: Number(e.target.value) },
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                      placeholder="18500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Shift Timing</label>
                  <select
                    value={formData.firstRequest.shift}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstRequest: { ...formData.firstRequest, shift: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Day Shift (8 Hours)">Day Shift (8 Hours)</option>
                    <option value="Night Shift (8 Hours)">Night Shift (8 Hours)</option>
                    <option value="Rotational (8 Hours)">Rotational Shifts (8 Hours)</option>
                    <option value="12 Hour Shift with OT">12 Hour Shift (with Overtime)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs text-gray-300">
                  <span className="font-bold text-white block">Autonomous Candidate Sourcing</span>
                  Once created, NayaMarg immediately initiates geospatial matching and Sarvam voice screening for workers within 25 km of your selected plant.
                </div>
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all ${
                step === 1
                  ? "opacity-30 cursor-not-allowed text-gray-500"
                  : "text-gray-300 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold flex items-center gap-2 transition-all shadow-lg active:scale-95"
            >
              <span>{step === 5 ? "Complete setup & launch" : "Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
