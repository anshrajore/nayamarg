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

export default function WorkerPortalPage() {
  const [lang, setLang] = useState<"HI" | "MR" | "EN">("MR");
  const [activeAudioJobId, setActiveAudioJobId] = useState<string | null>(null);
  const [consentGranted, setConsentGranted] = useState(true);

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
    if (activeAudioJobId === jobId) {
      setActiveAudioJobId(null);
    } else {
      setActiveAudioJobId(jobId);
    }
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
    }, 800);
  };

  const copy = {
    MR: {
      pageTitle: "तुमच्या जवळच्या सत्यापित फॅक्टरी नोकऱ्या",
      pageSubtitle: "मशिन ऑपरेटर, फिटर, इलेक्ट्रिशियन आणि वेल्डर कामे थेट तुमच्या मातृभाषेत.",
      vacanciesNotice: "नाशिक परिसरातील थेट कंपनी भरती • ० रुपये फी",
      applyBtn: "अर्ज करा (Apply Now)",
      appliedBtn: "अर्ज नोंदवला गेला ✓",
      listenVoice: "ऑडिओ ऐका",
      playing: "आवाज चालू आहे...",
      modalTitle: "नोकरीसाठी अर्ज नोंदणी",
      fullNameLabel: "तुमचे पूर्ण नाव",
      mobileLabel: "मोबाईल नंबर (कॉलसाठी)",
      expLabel: "कामाचा अनुभव",
      shiftLabel: "शिफ्ट पसंती",
      submitBtn: "अर्ज पूर्ण करा (Confirm & Apply)",
      successMsg: "तुमचा अर्ज यशस्वीरीत्या नोंदवला गेला आहे! नयामार्ग कडून तुम्हाला ५ मिनिटांत फोन कॉल येईल.",
      callUs: "मदतीसाठी कॉल करा: १८००-२००-६२९२ (टोल फ्री)",
      consentTitle: "ऑटोमॅटिक व्हॉइस कॉल संमती (TRAI Consent)",
      consentDesc: "नयामार्ग च्या AI असिस्टंट कडून नोकरीच्या पडताळणीसाठी फोन कॉल स्वीकारण्यास संमती.",
    },
    HI: {
      pageTitle: "आपके नज़दीक सत्यापित फैक्ट्री नौकरियाँ",
      pageSubtitle: "मशीन ऑपरेटर, फिटर, इलेक्ट्रीशियन और वेल्डर काम सीधे अपनी भाषा में।",
      vacanciesNotice: "नासिक क्षेत्र में सीधी कंपनी भर्ती • ० रुपये शुल्क",
      applyBtn: "आवेदन करें (Apply Now)",
      appliedBtn: "आवेदन दर्ज हुआ ✓",
      listenVoice: "ऑडियो सुनें",
      playing: "आवाज चल रही है...",
      modalTitle: "नौकरी के लिए आवेदन",
      fullNameLabel: "आपका पूरा नाम",
      mobileLabel: "मोबाइल नंबर (कॉल के लिए)",
      expLabel: "काम का अनुभव",
      shiftLabel: "शिफ्ट पसंद",
      submitBtn: "आवेदन पूरा करें (Confirm & Apply)",
      successMsg: "आपका आवेदन सफलतापूर्वक दर्ज हो गया है! नयामार्ग से आपको ५ मिनट में फोन कॉल आएगा।",
      callUs: "मदद के लिए कॉल करें: १८००-२००-६२९२ (टोल फ्री)",
      consentTitle: "ऑटोमैटिक वॉइस कॉल सहमति (TRAI Consent)",
      consentDesc: "नयामार्ग के AI असिस्टेंट से जॉब वेरिफिकेशन के लिए फोन कॉल प्राप्त करने की सहमति।",
    },
    EN: {
      pageTitle: "Verified Manufacturing Factory Jobs Near You",
      pageSubtitle: "Machine Operator, Fitter, Electrician and Welder roles directly in Maharashtra.",
      vacanciesNotice: "Direct Factory Hiring in Nashik Cluster • Zero Fees for Workers",
      applyBtn: "Apply Now",
      appliedBtn: "Applied & Queued ✓",
      listenVoice: "Listen Audio",
      playing: "Playing Voice Summary...",
      modalTitle: "Submit Job Application",
      fullNameLabel: "Your Full Name",
      mobileLabel: "Mobile Phone (For Interview Call)",
      expLabel: "Relevant Work Experience",
      shiftLabel: "Preferred Working Shift",
      submitBtn: "Confirm & Submit Application",
      successMsg: "Application successfully submitted! NayaMarg's voice agent will contact you within 5 minutes.",
      callUs: "Toll-Free Helpline: 1800-200-6292",
      consentTitle: "Automated Voice Call Consent (TRAI DLT)",
      consentDesc: "Consent to receive automated voice qualification calls for local industrial job matches.",
    },
  }[lang];

  return (
    <div className="min-h-screen bg-[#07090F] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#0B0E17]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
              nayamarg<span className="text-amber-400">.</span>
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 font-bold">
              कामगार ॲप
            </span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-semibold">
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
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-6 w-full space-y-6 flex-1">
        {/* Vernacular Hero Notice Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border border-amber-500/25 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              {copy.vacanciesNotice}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {copy.pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">{copy.pageSubtitle}</p>
        </div>

        {/* Job Listings Feed */}
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
                      {job.vacancies} जागा उपलब्ध (Vacancies)
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

        {/* Telecom & Voice Consent Policy Block */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-gray-300 block">{copy.consentTitle}</span>
            <p className="text-[11px] text-gray-400">{copy.consentDesc}</p>
          </div>
          <button
            type="button"
            onClick={() => setConsentGranted(!consentGranted)}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all border shrink-0 ${
              consentGranted
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-red-500/10 text-red-400 border-red-500/30"
            }`}
          >
            {consentGranted ? "संमती दिली (Consent Active ✓)" : "बंद करा (Opt-out)"}
          </button>
        </div>
      </main>

      {/* Pro Worker Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-[#0D1018] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-5 animate-slideUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                  {selectedJob.employer}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {lang === "MR" ? selectedJob.titleMR : lang === "HI" ? selectedJob.titleHI : selectedJob.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submissionSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">अर्ज यशस्वीरीत्या पाठवला!</h4>
                  <p className="text-xs text-gray-300 max-w-sm mx-auto">{copy.successMsg}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-6 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-gray-200 transition-colors"
                >
                  बंद करा (Done)
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmApply} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">
                    {copy.fullNameLabel}
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-gray-500 absolute left-3.5" />
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">
                    {copy.mobileLabel}
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-xs text-gray-400 font-mono font-bold border-r border-white/10 pr-2">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value.replace(/\D/g, ""))}
                      className="w-full pl-16 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono font-bold focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">{copy.expLabel}</label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                    >
                      <option value="fresher">Fresher (नवीन कामगार)</option>
                      <option value="1-2 years">1-2 वर्षे (Years)</option>
                      <option value="2-5 years">2-5 वर्षे (Years)</option>
                      <option value="5+ years">5+ वर्षे (Years)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">{copy.shiftLabel}</label>
                    <select
                      value={shiftPreference}
                      onChange={(e) => setShiftPreference(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                    >
                      <option value="day">Day Shift (दिवसा)</option>
                      <option value="rotational">Rotational (कोणतीही)</option>
                      <option value="night">Night Shift (रात्र)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">नोंदणी करत आहे (Submitting)...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{copy.submitBtn}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer Helpline */}
      <footer className="w-full border-t border-white/[0.06] bg-[#0A0D14] px-4 py-5 text-center text-xs text-gray-400 font-mono">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{copy.callUs}</span>
          <span className="text-[11px] text-gray-500">
            © 2026 NayaMarg • कामगारांसाठी १००% मोफत व सुरक्षित सेवा
          </span>
        </div>
      </footer>
    </div>
  );
}
