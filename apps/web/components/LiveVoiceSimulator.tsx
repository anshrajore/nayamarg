"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  Volume2,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  Terminal,
  Activity,
  Layers,
} from "lucide-react";

interface SimulationState {
  stage: "IDLE" | "DIALING" | "CONNECTED" | "PROCESSING" | "COMPLETED";
  disposition: "CONNECTED" | "NO_ANSWER" | "BUSY" | "FAILED" | "SUPPRESSED";
  activeCandidate: {
    id: string;
    name: string;
    phone: string;
    location: string;
    distance: string;
    matchScore: number;
    experienceYears: number;
  };
  messages: Array<{ speaker: "SARVAM_AI" | "CANDIDATE"; text: string; language: string }>;
  structuredOutput: Record<string, any> | null;
}

export function LiveVoiceSimulator({
  onCandidateResponse,
}: {
  onCandidateResponse?: (result: { type: string; payload: any }) => void;
}) {
  const [state, setState] = useState<SimulationState>({
    stage: "CONNECTED",
    disposition: "CONNECTED",
    activeCandidate: {
      id: "cand_9182",
      name: "Ramesh Pawar",
      phone: "+91 98234-•••••",
      location: "Ambad MIDC, Nashik",
      distance: "4.8 km",
      matchScore: 91,
      experienceYears: 3.5,
    },
    messages: [
      {
        speaker: "SARVAM_AI",
        text: "नमस्ते! मैं नयामार्ग का AI रिक्रूटमेंट असिस्टेंट हूँ। नासिक में मशीन ऑपरेटर पद के लिए आपसे बात करनी थी। क्या यह सही समय है?",
        language: "hi-IN",
      },
      {
        speaker: "CANDIDATE",
        text: "हाँ नमस्ते, मैं सुन रहा हूँ। नासिक में कहाँ काम है और पगार कितनी है?",
        language: "hi-IN",
      },
      {
        speaker: "SARVAM_AI",
        text: "यह पद अंबड एमआईडीसी में है। वेतन ₹15,000 से ₹18,000 प्रति माह है, डे शिफ्ट। क्या आप इस नौकरी में रुचि रखते हैं?",
        language: "hi-IN",
      },
    ],
    structuredOutput: {
      call_disposition: "CONNECTED",
      candidate_interest: "INTERESTED",
      employment_status: "LOOKING_FOR_WORK",
      availability_status: "AVAILABLE",
      available_from: "2026-11-18",
      experience_years: 3.5,
      salary_expectation_min: 16500,
      location_acceptable: true,
      shift_acceptable: true,
      interview_interest: true,
      callback_requested: false,
      preferred_language: "hi-IN",
      human_assistance_required: false,
      extraction_confidence: 0.96,
    },
  });

  const handleSimulateOutcome = (outcomeType: "INTERESTED" | "SALARY_MISMATCH" | "CALLBACK" | "OPT_OUT" | "NO_ANSWER") => {
    setState((prev) => ({ ...prev, stage: "PROCESSING" }));

    setTimeout(() => {
      if (outcomeType === "INTERESTED") {
        setState({
          stage: "COMPLETED",
          disposition: "CONNECTED",
          activeCandidate: state.activeCandidate,
          messages: [
            ...state.messages,
            {
              speaker: "CANDIDATE",
              text: "हाँ, मैं इच्छुक हूँ। मेरे पास 3 साल का लेथ मशीन का अनुभव है और मैं सोमवार से जॉइन कर सकता हूँ। इंटरव्यू करवा दीजिए।",
              language: "hi-IN",
            },
            {
              speaker: "SARVAM_AI",
              text: "बहुत धन्यवाद! आपकी सहमति दर्ज कर ली गई है। इंटरव्यू का विवरण और समय आपके फोन पर SMS द्वारा भेज दिया जाएगा।",
              language: "hi-IN",
            },
          ],
          structuredOutput: {
            call_disposition: "CONNECTED",
            candidate_interest: "INTERESTED",
            employment_status: "LOOKING_FOR_WORK",
            availability_status: "AVAILABLE",
            available_from: "2026-11-18",
            experience_years: 3.5,
            salary_expectation_min: 17000,
            location_acceptable: true,
            shift_acceptable: true,
            interview_interest: true,
            callback_requested: false,
            preferred_language: "hi-IN",
            human_assistance_required: false,
            extraction_confidence: 0.98,
          },
        });
        onCandidateResponse?.({ type: "INTERESTED", payload: { candidateId: state.activeCandidate.id } });
      } else if (outcomeType === "SALARY_MISMATCH") {
        setState({
          stage: "COMPLETED",
          disposition: "CONNECTED",
          activeCandidate: state.activeCandidate,
          messages: [
            ...state.messages,
            {
              speaker: "CANDIDATE",
              text: "नहीं भाई, ₹18,000 बहुत कम है। मुझे कम से कम ₹22,000 चाहिए। इस पगार में नहीं आ पाऊंगा।",
              language: "hi-IN",
            },
            {
              speaker: "SARVAM_AI",
              text: "कोई बात नहीं। हम आपकी वेतन अपेक्षा दर्ज कर लेते हैं। भविष्य में उपयुक्त अवसर आने पर संपर्क करेंगे। धन्यवाद।",
              language: "hi-IN",
            },
          ],
          structuredOutput: {
            call_disposition: "CONNECTED",
            candidate_interest: "NOT_INTERESTED",
            employment_status: "EMPLOYED",
            availability_status: "UNAVAILABLE",
            available_from: null,
            experience_years: 3.5,
            salary_expectation_min: 22000,
            location_acceptable: true,
            shift_acceptable: true,
            interview_interest: false,
            refusal_reason: "SALARY_BELOW_EXPECTATION",
            callback_requested: false,
            preferred_language: "hi-IN",
            extraction_confidence: 0.95,
          },
        });
        onCandidateResponse?.({ type: "SALARY_MISMATCH", payload: { candidateId: state.activeCandidate.id } });
      } else if (outcomeType === "CALLBACK") {
        setState({
          stage: "COMPLETED",
          disposition: "CONNECTED",
          activeCandidate: state.activeCandidate,
          messages: [
            ...state.messages,
            {
              speaker: "CANDIDATE",
              text: "अभी मैं काम पर हूँ, बात नहीं कर सकता। 20 तारीख को दोपहर 3 बजे कॉल करो।",
              language: "hi-IN",
            },
            {
              speaker: "SARVAM_AI",
              text: "समझ गया। हम 20 तारीख को दोपहर 3:00 बजे आपको दोबारा कॉल करेंगे। आपका दिन शुभ हो।",
              language: "hi-IN",
            },
          ],
          structuredOutput: {
            call_disposition: "CONNECTED",
            candidate_interest: "UNDECIDED",
            employment_status: "EMPLOYED",
            availability_status: "UNKNOWN",
            callback_requested: true,
            callback_time: "2026-11-20T09:30:00Z", // 3:00 PM IST
            preferred_language: "hi-IN",
            extraction_confidence: 0.97,
          },
        });
        onCandidateResponse?.({ type: "CALLBACK", payload: { candidateId: state.activeCandidate.id } });
      } else if (outcomeType === "OPT_OUT") {
        setState({
          stage: "COMPLETED",
          disposition: "SUPPRESSED",
          activeCandidate: state.activeCandidate,
          messages: [
            ...state.messages,
            {
              speaker: "CANDIDATE",
              text: "मुझे कोई कॉल मत करो। मेरा नंबर अपनी लिस्ट से हटा दो।",
              language: "hi-IN",
            },
            {
              speaker: "SARVAM_AI",
              text: "हम आपकी इच्छा का सम्मान करते हैं। आपका नंबर संचार सूची से हटा दिया गया है। धन्यवाद।",
              language: "hi-IN",
            },
          ],
          structuredOutput: {
            call_disposition: "CONNECTED",
            candidate_interest: "NOT_APPLICABLE",
            suppression_triggered: true,
            suppression_reason: "USER_OPT_OUT",
            channel: "ALL",
            applied_at: new Date().toISOString(),
          },
        });
        onCandidateResponse?.({ type: "OPT_OUT", payload: { candidateId: state.activeCandidate.id } });
      } else if (outcomeType === "NO_ANSWER") {
        setState({
          stage: "COMPLETED",
          disposition: "NO_ANSWER",
          activeCandidate: state.activeCandidate,
          messages: [
            {
              speaker: "SARVAM_AI",
              text: "[Telephony Event: Outbound ringing for 45s - No Answer from Handset]",
              language: "en-IN",
            },
          ],
          structuredOutput: {
            call_disposition: "NO_ANSWER",
            duration_seconds: 0,
            retry_eligible: true,
            next_retry_recommended_after: "30_MINUTES",
          },
        });
        onCandidateResponse?.({ type: "NO_ANSWER", payload: { candidateId: state.activeCandidate.id } });
      }
    }, 400);
  };

  return (
    <section id="voice-simulator" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            <Mic className="w-3.5 h-3.5" />
            Sarvam AI + Unified Telephony Engine
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Live Voice Recruitment Conversation
          </h2>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl">
            Simulates the exact Sarvam AI instant outbound call flow, real-time speech translation, and
            deterministic Zod extraction.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium">Sequential Queue Active:</span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
            Candidate 1 of 1 (Slot Locked)
          </span>
        </div>
      </div>

      {/* Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Call Interface (7 Cols) */}
        <div className="lg:col-span-7 rounded-card bg-[#0D0F14] border border-white/10 shadow-2xl p-6 flex flex-col justify-between">
          {/* Call Metadata Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-purple-600 flex items-center justify-center text-white shadow-lg">
                  <PhoneCall className="w-5 h-5 animate-pulse" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0D0F14]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-sm">{state.activeCandidate.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-300 text-[10px] font-mono">
                    {state.activeCandidate.phone}
                  </span>
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                  <span>{state.activeCandidate.location}</span>
                  <span>•</span>
                  <span className="text-blue-400 font-medium">{state.activeCandidate.distance}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{state.activeCandidate.matchScore}% Match</span>
                </div>
              </div>
            </div>

            {/* Audio Waveform Animation (21st.dev style) */}
            <div className="flex items-center gap-1 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
              <span className="w-1 h-3 bg-brand-neonGreen rounded-full animate-wave [animation-delay:0.1s]" />
              <span className="w-1 h-5 bg-brand-neonGreen rounded-full animate-wave [animation-delay:0.3s]" />
              <span className="w-1 h-2 bg-brand-neonGreen rounded-full animate-wave [animation-delay:0.2s]" />
              <span className="w-1 h-6 bg-brand-neonGreen rounded-full animate-wave [animation-delay:0.4s]" />
              <span className="w-1 h-4 bg-brand-neonGreen rounded-full animate-wave [animation-delay:0.15s]" />
              <span className="text-[10px] text-gray-400 font-mono ml-1.5">00:42</span>
            </div>
          </div>

          {/* Conversation Transcript Stream */}
          <div className="my-6 space-y-4 max-h-[340px] overflow-y-auto pr-2">
            {state.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.speaker === "SARVAM_AI" ? "items-start" : "items-end"}`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[11px] font-medium text-gray-400">
                  {msg.speaker === "SARVAM_AI" ? (
                    <>
                      <Sparkles className="w-3 h-3 text-brand-electricYellow" />
                      <span className="text-brand-electricYellow font-semibold">Sarvam Voice Agent</span>
                    </>
                  ) : (
                    <>
                      <span>{state.activeCandidate.name}</span>
                      <Mic className="w-3 h-3 text-blue-400" />
                    </>
                  )}
                </div>

                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                    msg.speaker === "SARVAM_AI"
                      ? "bg-white/[0.05] border border-white/10 text-gray-200"
                      : "bg-blue-600/20 border border-blue-500/30 text-blue-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Simulation Response Buttons */}
          <div className="pt-4 border-t border-white/5">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2.5">
              Simulate Candidate Response to Sarvam AI:
            </span>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSimulateOutcome("INTERESTED")}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Interested & Available
              </button>

              <button
                onClick={() => handleSimulateOutcome("SALARY_MISMATCH")}
                className="px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <XCircle className="w-3.5 h-3.5" />
                Salary Mismatch (₹22k)
              </button>

              <button
                onClick={() => handleSimulateOutcome("CALLBACK")}
                className="px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-300 hover:bg-blue-500/25 text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5" />
                Call Back on 20th
              </button>

              <button
                onClick={() => handleSimulateOutcome("OPT_OUT")}
                className="px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 hover:bg-red-500/25 text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Explicit Opt-out
              </button>

              <button
                onClick={() => handleSimulateOutcome("NO_ANSWER")}
                className="px-3 py-1.5 rounded-lg bg-gray-500/15 border border-gray-500/30 text-gray-300 hover:bg-gray-500/25 text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                No Answer (Retry Policy)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Structured Decision Engine Extraction (5 Cols) */}
        <div className="lg:col-span-5 rounded-card bg-[#0A0C10] border border-white/10 shadow-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-electricLime" />
                <span className="font-bold text-white text-xs font-mono">STRUCTURED EXTRACTION (ZOD)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Confidence: {state.structuredOutput?.extraction_confidence ? `${Math.round(state.structuredOutput.extraction_confidence * 100)}%` : "N/A"}
              </span>
            </div>

            {/* Extracted JSON Inspector */}
            <div className="rounded-xl bg-black/60 p-4 border border-white/5 text-[11px] font-mono text-gray-300 overflow-x-auto max-h-[300px]">
              <pre>{JSON.stringify(state.structuredOutput, null, 2)}</pre>
            </div>
          </div>

          {/* Engine Decision Summary Card */}
          <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1">
              DECISION ENGINE ACTION:
            </span>
            {state.disposition === "CONNECTED" && state.structuredOutput?.candidate_interest === "INTERESTED" ? (
              <div className="text-xs text-emerald-400 font-medium">
                ✅ Application updated to <strong className="text-white">INTEREST_EXPRESSED</strong>. Added to
                interview coordination pipeline. Active candidate pool updated.
              </div>
            ) : state.disposition === "SUPPRESSED" ? (
              <div className="text-xs text-red-400 font-medium">
                🛑 Global contact suppression applied to <strong className="text-white">contact_suppressions</strong>.
                All active campaigns for this worker cancelled immediately.
              </div>
            ) : state.structuredOutput?.callback_requested ? (
              <div className="text-xs text-blue-400 font-medium">
                ⏱️ Callback registered in <strong className="text-white">recruitment_followups</strong> for 20th Nov.
                Cooldown coordinator prevents simultaneous calls.
              </div>
            ) : (
              <div className="text-xs text-gray-400 font-medium">
                ℹ️ Attempt classified. Sequential scheduler evaluates next candidate in queue.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
