"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Volume2,
  PhoneCall,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Briefcase,
  Play,
  Pause,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function WorkerPortalPage() {
  const [lang, setLang] = useState<"HI" | "MR" | "EN">("MR");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [consentGranted, setConsentGranted] = useState(true);

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const copy = {
    MR: {
      title: "तुमच्या जवळच्या सत्यापित नोकऱ्या",
      subtitle: "मशिन ऑपरेटर, फिटर, इलेक्ट्रिशियन आणि फॅक्टरी कामे थेट तुमच्या मातृभाषेत.",
      playAudio: "नोकरीचे तपशील ऐका (ऑडिओ)",
      audioSample:
        "प्रिसिजन फोर्ज कंपनी नाशिक (सातपूर एमआयडीसी) मध्ये १० सीएनसी मशिन ऑपरेटर भरत आहे. मासिक वेतन १६,००० ते १८,५०० रुपये + पीएफ + डे शिफ्ट. त्वरित रुजू व्हा.",
      wage: "₹१६,००० – ₹१८,५०० / महिना",
      shift: "डे शिफ्ट (८ तास)",
      location: "सातपूर एमआयडीसी, नाशिक",
      callUs: "कॉल करा: १८००-२००-६२९२ (टोल फ्री)",
    },
    HI: {
      title: "आपके नज़दीक सत्यापित नौकरियाँ",
      subtitle: "मशीन ऑपरेटर, फिटर, इलेक्ट्रीशियन और फैक्ट्री काम सीधे अपनी भाषा में।",
      playAudio: "नौकरी का विवरण सुनें (ऑडियो)",
      audioSample:
        "प्रिसिजन फोर्ज कंपनी नाशिक (सातपूर एमआईडीसी) में १० सीएनसी मशीन ऑपरेटर ढूंढ रही है। मासिक वेतन १६,००० से १८,५०० रुपये + पीएफ + डे शिफ्ट। तुरंत ज्वाइन करें।",
      wage: "₹१६,००० – ₹१८,५०० / महीना",
      shift: "दिन की शिफ्ट (८ घंटे)",
      location: "सातपूर एमआईडीसी, नाशिक",
      callUs: "कॉल करें: १८००-२००-६२९२ (टोल फ्री)",
    },
    EN: {
      title: "Verified Trade Jobs Near You",
      subtitle: "Machine Operator, Fitter, Electrician and Factory roles in your local language.",
      playAudio: "Listen to Job Details (Audio)",
      audioSample:
        "Precision Forge & Tools Ltd. is hiring 10 CNC Machine Operators in Satpur MIDC Nashik. Salary: ₹16,000 to ₹18,500/month + PF + Day shift. Join within 7 days.",
      wage: "₹16,000 – ₹18,500 / month",
      shift: "Day Shift (8 Hours)",
      location: "Satpur MIDC, Nashik",
      callUs: "Call toll-free: 1800-200-6292",
    },
  }[lang];

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top bar with back to home and language selector */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>nayamarg. home</span>
          </Link>

          {/* Tongue pill */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold">
            {(["MR", "HI", "EN"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full transition-all ${
                  lang === l
                    ? "bg-emerald-500 text-black shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {l === "MR" ? "मराठी" : l === "HI" ? "हिन्दी" : "English"}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#111624] to-[#0A0D15] border border-emerald-500/30 space-y-5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                आवाज-आधारित नोकरी पोर्टल
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
                {copy.title}
              </h1>
              <p className="text-xs text-gray-300 mt-1">{copy.subtitle}</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <PhoneCall className="w-8 h-8 animate-pulse" />
            </div>
          </div>

          {/* Interactive Audio Trigger */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>{copy.playAudio}</span>
              </div>
              <button
                onClick={toggleAudio}
                className="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? "थांबवा (Pause)" : "ऐका (Play)"}</span>
              </button>
            </div>
            <p className="text-xs text-gray-300 italic bg-white/[0.02] p-3 rounded-xl border border-white/5">
              "{copy.audioSample}"
            </p>
          </div>

          {/* Job Card */}
          <div className="p-5 rounded-2xl bg-[#141A28] border border-white/10 space-y-3 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-white">सीएनसी मशिन ऑपरेटर (CNC Operator)</h3>
                <p className="text-gray-400 text-xs mt-0.5">{copy.location}</p>
              </div>
              <span className="text-emerald-400 font-mono font-bold text-sm">{copy.wage}</span>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] text-gray-300">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">
                {copy.shift}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">
                पीएफ + ईएसआयसी + बस सोय
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                १० जागा उपलब्ध
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => alert("तुमचा अर्ज नोंदवला गेला आहे! नयामार्ग कडून तुम्हाला लवकरच फोन कॉल येईल.")}
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>या नोकरीसाठी अर्ज करा (Apply Now)</span>
              </button>
            </div>
          </div>

          {/* Consent and telecom preferences */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-semibold text-gray-300">कॉल आणि एसएमएस संमती (TRAI Consent)</span>
              <p className="text-[11px] text-gray-500">
                नयामार्ग कडून नवीन नोकऱ्यांसाठी ऑटोमॅटिक व्हॉइस कॉल स्वीकारण्यास संमती.
              </p>
            </div>
            <button
              onClick={() => setConsentGranted(!consentGranted)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                consentGranted
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}
            >
              {consentGranted ? "संमती दिली (Granted)" : "बंद (Opt-out)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
