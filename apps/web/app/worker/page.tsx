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
  Clock,
  IndianRupee,
  Factory,
  ChevronRight,
  X,
  Phone,
  User,
  Calendar,
  AlertCircle,
  FileText,
  Award,
} from "lucide-react";

interface WorkerJob {
  id: string;
  title: string;
  titleMR: string;
  titleHI: string;
  employer: string;
  location: string;
  wage: string;
  wageMR: string;
  wageHI: string;
  vacancies: number;
  shift: string;
  shiftMR: string;
  shiftHI: string;
  perks: string[];
  perksMR: string[];
  perksHI: string[];
  audioScript: {
    MR: string;
    HI: string;
    EN: string;
  };
}

const FEATURED_JOBS: WorkerJob[] = [
  {
    id: "job-nashik-01",
    title: "Machine Operator (CNC / Lathe)",
    titleMR: "मशिन ऑपरेटर (CNC / लेथ मशिन)",
    titleHI: "मशीन ऑपरेटर (CNC / लेथ मशीन)",
    employer: "Precision Forge & Tools Ltd.",
    location: "Satpur MIDC, Nashik (सातपूर एमआयडीसी, नाशिक)",
    wage: "₹16,000 – ₹18,500 / month",
    wageMR: "₹१६,००० – ₹१८,५०० / महिना",
    wageHI: "₹१६,००० – ₹१८,५०० / महीना",
    vacancies: 10,
    shift: "Day Shift (8 Hours)",
    shiftMR: "डे शिफ्ट (८ तास)",
    shiftHI: "दिन की शिफ्ट (८ घंटे)",
    perks: ["PF + ESIC", "Company Bus", "Overtime ₹120/hr", "Canteen"],
    perksMR: ["पीएफ + ईएसआयसी", "कंपनी बस सोय", "ओव्हरटाईम ₹१२०/तास", "कँटीन सुविधा"],
    perksHI: ["पीएफ + ईएसआईसी", "कंपनी बस", "ओवरटाइम ₹१२०/घंटा", "कैंटीन"],
    audioScript: {
      MR: "प्रिसिजन फोर्ज कंपनी नाशिक (सातपूर एमआयडीसी) मध्ये १० सीएनसी मशिन ऑपरेटर भरत आहे. मासिक वेतन १६,००० ते १८,५०० रुपये + पीएफ + डे शिफ्ट. त्वरित रुजू व्हा.",
      HI: "प्रिसिजन फोर्ज कंपनी नाशिक (सातपूर एमआईडीसी) में १० सीएनसी मशीन ऑपरेटर ढूंढ रही है। मासिक वेतन १६,००० से १८,५०० रुपये + पीएफ + डे शिफ्ट। तुरंत ज्वाइन करें।",
      EN: "Precision Forge & Tools Ltd. is hiring 10 CNC Machine Operators in Satpur MIDC Nashik. Salary: ₹16,000 to ₹18,500 per month with PF, ESIC, and day shift.",
    },
  },
  {
    id: "job-nashik-02",
    title: "Industrial Maintenance Electrician",
    titleMR: "इंडस्ट्रियल मेंटेनन्स इलेक्ट्रिशियन",
    titleHI: "औद्योगिक रखरखाव इलेक्ट्रीशियन",
    employer: "Mahindra Heavy Engineering",
    location: "Ambad MIDC, Nashik (अंबड एमआयडीसी, नाशिक)",
    wage: "₹18,500 – ₹22,000 / month",
    wageMR: "₹१८,५०० – ₹२२,००० / महिना",
    wageHI: "₹१८,५०० – ₹२२,००० / महीना",
    vacancies: 5,
    shift: "Rotational (8 Hours)",
    shiftMR: "रोटेशनल शिफ्ट (८ तास)",
    shiftHI: "रोटेशनल शिफ्ट (८ घंटे)",
    perks: ["PF + Medical Insurance", "Safety Shoes", "Annual Bonus"],
    perksMR: ["पीएफ + मेडिकल विमा", "सेफ्टी शूज", "वार्षिक बोनस"],
    perksHI: ["पीएफ + मेडिकल बीमा", "सेफ्टी जूते", "सालाना बोनस"],
    audioScript: {
      MR: "महिंद्रा हेवी इंजिनिअरिंग अंबड नाशिक येथे ५ इलेक्ट्रिशियनची भरती सुरू आहे. वेतन १८,५०० ते २२,००० रुपये + पीएफ.",
      HI: "महिंद्रा हैवी इंजीनियरिंग अंबड नासिक में ५ इलेक्ट्रीशियन की भर्ती चल रही है। वेतन १८,५०० से २२,००० रुपये + पीएफ।",
      EN: "Mahindra Heavy Engineering is hiring 5 Maintenance Electricians in Ambad MIDC Nashik. Salary: ₹18,500 to ₹22,000 per month.",
    },
  },
  {
    id: "job-nashik-03",
    title: "MIG / TIG Welder & Fabricator",
    titleMR: "मिग / टिग वेल्डर आणि फॅब्रिकेटर",
    titleHI: "एमआईजी / टीआईजी वेल्डर और फैब्रिकेटर",
    employer: "Nashik Auto Components Pvt. Ltd.",
    location: "Ozar Industrial Area, Nashik (ओझर, नाशिक)",
    wage: "₹17,000 – ₹20,000 / month",
    wageMR: "₹१७,००० – ₹२०,००० / महिना",
    wageHI: "₹१७,००० – ₹२०,००० / महीना",
    vacancies: 8,
    shift: "Day Shift (8 Hours)",
    shiftMR: "डे शिफ्ट (८ तास)",
    shiftHI: "दिन की शिफ्ट (८ घंटे)",
    perks: ["PF + Accident Cover", "Weekly Payouts", "Overtime Available"],
    perksMR: ["पीएफ + अपघाती विमा", "आठवडी पेमेंट", "ओव्हरटाईम उपलब्ध"],
    perksHI: ["पीएफ + दुर्घटना बीमा", "साप्ताहिक भुगतान", "ओवरटाइम उपलब्ध"],
    audioScript: {
      MR: "नाशिक ऑटो कंपोनेंट्स ओझर येथे ८ वेल्डर हवे आहेत. मिग वेल्डिंगचा १ वर्षाचा अनुभव असणाऱ्यांना प्राधान्य. त्वरित अर्ज करा.",
      HI: "नासिक ऑटो कॉम्पोनेन्ट्स ओझर में ८ वेल्डर की आवश्यकता है। मिग वेल्डिंग का अनुभव आवश्यक है।",
      EN: "Nashik Auto Components is hiring 8 MIG/TIG Welders in Ozar Nashik. 1+ year experience preferred with day shift.",
    },
  },
];

export default function WorkerWorkspaceOverview() {
  const [lang, setLang] = useState<"MR" | "HI" | "EN">("MR");
  const [activeAudioJobId, setActiveAudioJobId] = useState<string | null>(null);

  // Application Modal State
  const [selectedJob, setSelectedJob] = useState<WorkerJob | null>(null);
  const [applicantName, setApplicantName] = useState("रमेश तुकाराम शिंदे");
  const [applicantPhone, setApplicantPhone] = useState("9823145670");
  const [experience, setExperience] = useState("2-5 years");
  const [shiftPreference, setShiftPreference] = useState("day");
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const toggleAudio = (jobId: string) => {
    setActiveAudioJobId((prev) => (prev === jobId ? null : jobId));
  };

  const handleOpenApplyModal = (job: WorkerJob) => {
    setSelectedJob(job);
    setSubmissionSuccess(false);
  };

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      setAppliedJobs((prev) => [...prev, selectedJob.id]);
    }, 600);
  };

  const copy = {
    MR: {
      overview: "मुख्य पृष्ठ",
      workspace: "कामगार कार्यस्थळ",
      greeting: "शुभ सकाळ, रमेश",
      greetingSub: "तुमची चालू नोकरी प्रक्रिया, मुलाखत आणि पुढील पावले.",
      applicationsCount: "अर्ज",
      interviewsCount: "मुलाखती",
      offersCount: "ऑफर",
      myApplications: "तुमचे सक्रिय अर्ज",
      recommendedJobs: "तुमच्या जवळच्या सत्यापित फॅक्टरी नोकऱ्या (१० किमी आत)",
      vacanciesNotice: "नाशिक परिसरातील थेट कंपनी भरती • ० रुपये फी",
      applyBtn: "अर्ज करा (Apply Now)",
      appliedBtn: "अर्ज नोंदवला गेला ✓",
      listenVoice: "ऑडिओ ऐका",
      playing: "आवाज चालू आहे...",
      nextActionTitle: "पुढील कृती आणि अपडेट्स",
      modalTitle: "नोकरीसाठी अर्ज नोंदणी",
      submitBtn: "अर्ज पूर्ण करा (Confirm & Apply)",
      successMsg: "तुमचा अर्ज यशस्वीरीत्या नोंदवला गेला आहे! नयामार्ग कडून तुम्हाला ५ मिनिटांत फोन कॉल येईल.",
    },
    HI: {
      overview: "अवलोकन",
      workspace: "कार्यस्थल",
      greeting: "शुभ प्रभात, रमेश",
      greetingSub: "आपकी वर्तमान नौकरी गतिविधियाँ, साक्षात्कार और आगामी कदम।",
      applicationsCount: "आवेदन",
      interviewsCount: "साक्षात्कार",
      offersCount: "ऑफर",
      myApplications: "आपके सक्रिय आवेदन",
      recommendedJobs: "आपके नज़दीक सत्यापित फैक्ट्री नौकरियाँ (१० किमी)",
      vacanciesNotice: "नासिक क्षेत्र में सीधी कंपनी भर्ती • ० रुपये शुल्क",
      applyBtn: "आवेदन करें (Apply Now)",
      appliedBtn: "आवेदन दर्ज हुआ ✓",
      listenVoice: "ऑडियो सुनें",
      playing: "आवाज चल रही है...",
      nextActionTitle: "अगले कदम और अपडेट",
      modalTitle: "नौकरी के लिए आवेदन",
      submitBtn: "आवेदन पूरा करें (Confirm & Apply)",
      successMsg: "आपका आवेदन सफलतापूर्वक दर्ज हो गया है! नयामार्ग से आपको ५ मिनट में फोन कॉल आएगा।",
    },
    EN: {
      overview: "Overview",
      workspace: "Worker workspace",
      greeting: "Good morning, Ramesh",
      greetingSub: "Your employment activity and next steps.",
      applicationsCount: "Applications",
      interviewsCount: "Interviews",
      offersCount: "Offers",
      myApplications: "Your applications",
      recommendedJobs: "Recommended opportunities (within 10 km)",
      vacanciesNotice: "Direct Factory Hiring in Nashik Cluster • Zero Fees",
      applyBtn: "Apply Now",
      appliedBtn: "Applied ✓",
      listenVoice: "Listen Audio",
      playing: "Playing Voice Summary...",
      nextActionTitle: "Next action and recent updates",
      modalTitle: "Submit Job Application",
      submitBtn: "Confirm & Apply",
      successMsg: "Application successfully submitted! You will receive a verification call within 5 minutes.",
    },
  }[lang];

  return (
    <div className="space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
            <span>{copy.overview}</span>
            <span>/</span>
            <span className="text-amber-400 font-semibold">{copy.workspace}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {copy.greeting}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            {copy.greetingSub}
          </p>
        </div>

        {/* Vernacular Language Switcher */}
        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/5 text-xs font-semibold self-start sm:self-center">
          <Globe className="w-3.5 h-3.5 text-amber-400 ml-1.5 mr-0.5" />
          {(["MR", "HI", "EN"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === l
                  ? "bg-amber-500 text-black shadow font-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {l === "MR" ? "मराठी" : l === "HI" ? "हिंदी" : "EN"}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Three Summary Counters (Spec Section 4) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>{copy.applicationsCount}</span>
            <FileText className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-white mt-2 font-mono">
            3
          </div>
          <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">2 in review · 1 shortlisted</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>{copy.interviewsCount}</span>
            <Calendar className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-emerald-400 mt-2 font-mono">
            1
          </div>
          <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">Nov 18, 10:30 AM (Satpur)</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>{copy.offersCount}</span>
            <Award className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-blue-400 mt-2 font-mono">
            0
          </div>
          <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">Awaiting interview round</p>
        </div>
      </div>

      {/* 3. Your Applications Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>{copy.myApplications}</span>
            <span className="text-xs font-mono font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              3 Active
            </span>
          </h2>
          <Link href="/worker/applications" className="text-xs text-amber-400 hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                Interview Scheduled
              </span>
              <span className="text-[10px] text-gray-500">Nov 18</span>
            </div>
            <div className="font-bold text-white text-sm">CNC Machine Operator</div>
            <div className="text-xs text-gray-400">Precision Forge & Tools Ltd.</div>
            <div className="text-[11px] text-emerald-400 font-mono">Round 2 · Plant Visit · Satpur</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                Under Review
              </span>
              <span className="text-[10px] text-gray-500">2d ago</span>
            </div>
            <div className="font-bold text-white text-sm">Industrial Electrician</div>
            <div className="text-xs text-gray-400">Mahindra Heavy Engineering</div>
            <div className="text-[11px] text-gray-400 font-mono">Employer evaluating profile</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                Voice Screen Passed
              </span>
              <span className="text-[10px] text-gray-500">3d ago</span>
            </div>
            <div className="font-bold text-white text-sm">MIG / TIG Welder</div>
            <div className="text-xs text-gray-400">Nashik Auto Components</div>
            <div className="text-[11px] text-amber-300 font-mono">AI Verification Score: 94%</div>
          </div>
        </div>
      </div>

      {/* 4. Recommended Opportunities (Exact Card Design from Image 1) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {copy.recommendedJobs}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {copy.vacanciesNotice}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {FEATURED_JOBS.map((job) => {
            const isApplied = appliedJobs.includes(job.id);
            const isPlaying = activeAudioJobId === job.id;
            const displayTitle = lang === "MR" ? job.titleMR : lang === "HI" ? job.titleHI : job.title;
            const displayWage = lang === "MR" ? job.wageMR : lang === "HI" ? job.wageHI : job.wage;
            const displayShift = lang === "MR" ? job.shiftMR : lang === "HI" ? job.shiftHI : job.shift;
            const displayPerks = lang === "MR" ? job.perksMR : lang === "HI" ? job.perksHI : job.perks;

            return (
              <div
                key={job.id}
                className="p-5 sm:p-6 rounded-3xl bg-[#0D1018] border border-white/[0.08] hover:border-amber-500/30 transition-all space-y-4 shadow-xl"
              >
                {/* Job Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                      {job.vacancies} जागा उपलब्ध (VACANCIES)
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
                      {displayTitle}
                    </h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                      <Factory className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                      <span>{job.employer}</span>
                    </p>
                  </div>

                  {/* Wage Pill */}
                  <div className="text-left sm:text-right">
                    <span className="text-base sm:text-lg font-black text-emerald-400 font-mono block">
                      {displayWage}
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">
                      {displayShift}
                    </span>
                  </div>
                </div>

                {/* Location & Perks Pills */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-3 py-1 rounded-xl bg-white/[0.03] border border-white/5 text-gray-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{job.location}</span>
                  </span>
                  {displayPerks.map((perk, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 text-[11px]"
                    >
                      ✓ {perk}
                    </span>
                  ))}
                </div>

                {/* Audio Waveform Summary Bar */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      type="button"
                      onClick={() => toggleAudio(job.id)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isPlaying
                          ? "bg-amber-500 text-black font-bold"
                          : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                      }`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block">
                        {isPlaying ? copy.playing : copy.listenVoice}
                      </span>
                      <p className="text-[11px] text-gray-400 truncate">
                        {job.audioScript[lang]}
                      </p>
                    </div>
                  </div>

                  {isPlaying && (
                    <div className="flex items-center gap-0.5 h-6 shrink-0">
                      {[12, 20, 8, 16, 24, 10, 18, 14].map((h, i) => (
                        <div
                          key={i}
                          className="w-1 bg-amber-400 rounded-full animate-pulse"
                          style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Card CTA Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.04]">
                  <span className="text-[11px] text-gray-500 font-mono">
                    थेट कंपनी भरती • नोकरीसाठी कोणतेही शुल्क नाही
                  </span>
                  <button
                    type="button"
                    disabled={isApplied}
                    onClick={() => handleOpenApplyModal(job)}
                    className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                      isApplied
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default"
                        : "bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/15 active:scale-95"
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{copy.appliedBtn}</span>
                      </>
                    ) : (
                      <>
                        <span>{copy.applyBtn}</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Next Action and Recent Updates Feed (Spec Section 4) */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{copy.nextActionTitle}</span>
        </h3>
        <div className="space-y-2 text-xs text-gray-300">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Interview Scheduled at Precision Forge</span>
              Bring your original Aadhaar card and ITI trade certificates to Satpur MIDC Unit 1 on Monday, Nov 18, 10:30 AM.
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Aadhaar e-KYC Complete</span>
              Your identity has been verified. Verified candidate badge is now visible to recruiters.
            </div>
          </div>
        </div>
      </div>

      {/* Application Confirmation Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0F121C] border border-white/10 p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {submissionSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">अर्ज यशस्वीरीत्या नोंदवला!</h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto">
                  {copy.successMsg}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-6 py-2.5 rounded-full bg-emerald-500 text-black font-extrabold text-xs"
                >
                  पूर्ण झाले (Close)
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmApply} className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                    थेट कंपनी अर्ज
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {lang === "MR" ? selectedJob.titleMR : lang === "HI" ? selectedJob.titleHI : selectedJob.title}
                  </h3>
                  <p className="text-xs text-gray-400">{selectedJob.employer} · {selectedJob.location}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">पूर्ण नाव (Full Name)</label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">मोबाईल नंबर (Phone for Interview Call)</label>
                    <input
                      type="tel"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-300 block mb-1">अनुभव (Experience)</label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs"
                      >
                        <option value="fresher">Fresher (नवीन)</option>
                        <option value="1-2 years">१-२ वर्षे</option>
                        <option value="2-5 years">२-५ वर्षे</option>
                        <option value="5+ years">५+ वर्षे</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-300 block mb-1">शिफ्ट (Shift)</label>
                      <select
                        value={shiftPreference}
                        onChange={(e) => setShiftPreference(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs"
                      >
                        <option value="day">डे शिफ्ट (Day)</option>
                        <option value="night">नाईट शिफ्ट (Night)</option>
                        <option value="any">कोणतीही (Any)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all shadow-lg active:scale-95"
                  >
                    {isSubmitting ? "अर्ज नोंदवत आहे..." : copy.submitBtn}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
