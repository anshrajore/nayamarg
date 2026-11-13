"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Mic,
  MapPin,
  CheckCircle2,
  Clock,
  Volume2,
  Bookmark,
  ArrowRight,
  ShieldCheck,
  Send,
} from "lucide-react";

export function WorkerExperience() {
  const [selectedLang, setSelectedLang] = useState<"HI" | "EN" | "MR">("HI");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const jobs = [
    {
      id: "j1",
      title: "Machine Operator (मशीन ऑपरेटर)",
      company: "Precision Auto Components Ltd.",
      location: "Ambad MIDC, Nashik",
      distance: "4.8 km दूर",
      salary: "₹15,000 – ₹18,000",
      shift: "Day Shift (डे शिफ्ट)",
      exp: "1–3 साल अनुभव",
      voiceSummary: "नासिक अंबड एमआईडीसी में लेथ मशीन ऑपरेटर की आवश्यकता है। वेतन ₹15,000 से ₹18,000, डे शिफ्ट।",
    },
    {
      id: "j2",
      title: "Quality Inspector (क्वालिटी चेकर)",
      company: "Bosch Vendor Partner",
      location: "Satpur Industrial Zone",
      distance: "7.2 km दूर",
      salary: "₹17,000 – ₹20,000",
      shift: "Rotational (रोटेशनल)",
      exp: "2+ साल अनुभव",
      voiceSummary: "सातपुर में ऑटोमोटिव पार्ट्स क्वालिटी चेकर के लिए तुरंत भर्ती।",
    },
    {
      id: "j3",
      title: "Forklift Driver (फोर्कलिफ्ट चालक)",
      company: "Mahindra Logistics Hub",
      location: "Igatpuri Logistics Park",
      distance: "18.0 km दूर",
      salary: "₹18,500 – ₹22,000",
      shift: "Day Shift (डे शिफ्ट)",
      exp: "लाइसेंस अनिवार्य",
      voiceSummary: "महिंद्रा लॉजिस्टिक्स में वैध हेवी लाइसेंस वाले फोर्कलिफ्ट चालकों की जरूरत।",
    },
  ];

  const handleApply = (id: string) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs([...appliedJobs, id]);
    }
  };

  const handlePlayVoice = (text: string) => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 3000);
  };

  return (
    <section id="worker" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/[0.06] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            NayaMarg for Workers • Mobile-First & Multilingual
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
            Accessible Jobs & <span className="font-serif-italic font-normal">Voice Assistance</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl font-normal">
            No complicated forms. Verify via mobile OTP, listen to opportunities in Hindi or Marathi, speak directly to
            our AI recruiter, and track your joining status.
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/5 rounded-full text-xs">
          <button
            onClick={() => setSelectedLang("HI")}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedLang === "HI" ? "bg-white text-black font-semibold" : "text-gray-400 hover:text-white"
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setSelectedLang("MR")}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedLang === "MR" ? "bg-white text-black font-semibold" : "text-gray-400 hover:text-white"
            }`}
          >
            मराठी
          </button>
          <button
            onClick={() => setSelectedLang("EN")}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedLang === "EN" ? "bg-white text-black font-semibold" : "text-gray-400 hover:text-white"
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Mobile Experience Simulation Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Explanation Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-[28px] bg-[#0A0C11] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Voice-First Experience (Sarvam AI)</h3>
                <span className="text-xs text-gray-400">Speak naturally in your mother tongue</span>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-normal">
              Workers don't need to read long job descriptions. Our AI assistant calls and explains salary, location,
              shift, and company details over a simple phone conversation.
            </p>
          </div>

          <div className="p-6 rounded-[28px] bg-[#0A0C11] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Transparent Application Tracker</h3>
                <span className="text-xs text-gray-400">Clear progress at every stage</span>
              </div>
            </div>

            {/* Visual Timeline Steps */}
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-center gap-2.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>1. प्रोफाइल सत्यापित (Profile Verified)</span>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>2. नयामार्ग से फोन पर बात (Voice Contact Confirmed)</span>
              </div>
              <div className="flex items-center gap-2.5 text-blue-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                <span>3. इंटरव्यू तय (Interview Scheduled)</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-gray-600" />
                <span>4. जॉइनिंग पक्की (Joining Confirmation)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Phone Mockup (7 Cols) */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-md rounded-[36px] bg-[#0B0D13] border-4 border-white/[0.08] shadow-2xl p-6 relative overflow-hidden">
            {/* Top Phone Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">
                  nayamarg<span className="text-emerald-400">.</span>
                </span>
                <span className="text-[10px] text-gray-400 font-mono bg-white/[0.05] px-2 py-0.5 rounded-full">
                  नासिक (Nashik)
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] font-semibold">सत्यापित</span>
              </div>
            </div>

            {/* Voice Prompt Announcement Pill */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/20 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handlePlayVoice("voice")}
                  className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg active:scale-95"
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-bounce" : ""}`} />
                </button>
                <div className="text-xs">
                  <span className="font-bold text-white block">बोलकर नौकरी सुनें</span>
                  <span className="text-[10px] text-gray-400">
                    {isPlayingAudio ? "ऑडियो चल रहा है..." : "1-क्लिक में पूरी जानकारी सुनें"}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">AI VOICE</span>
            </div>

            {/* Jobs Stream */}
            <div className="space-y-3">
              {jobs.map((job) => {
                const isApplied = appliedJobs.includes(job.id);
                return (
                  <div
                    key={job.id}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-white font-bold text-sm">{job.title}</h4>
                        <span className="text-gray-400 text-xs">{job.company}</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        {job.salary}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-400" />
                        {job.location} ({job.distance})
                      </span>
                      <span>•</span>
                      <span>{job.shift}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                      <button
                        onClick={() => handlePlayVoice(job.voiceSummary)}
                        className="text-xs text-gray-300 hover:text-white flex items-center gap-1 font-medium"
                      >
                        <Volume2 className="w-3 h-3 text-emerald-400" />
                        <span>विवरण सुनें</span>
                      </button>

                      <button
                        onClick={() => handleApply(job.id)}
                        disabled={isApplied}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                          isApplied
                            ? "bg-emerald-500/20 text-emerald-300 cursor-default"
                            : "bg-white text-black hover:bg-gray-200 active:scale-95"
                        }`}
                      >
                        {isApplied ? "आवेदन भेजा गया ✓" : "रुचि व्यक्त करें (Apply)"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
