"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  PhoneCall,
  Radio,
  Volume2,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export default function LiveCallMonitorPage() {
  const [timer, setTimer] = useState(48);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Radio className="w-5 h-5 text-red-500 animate-pulse" />
            Live Voice Call Telemetry
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time Sarvam AI conversational agent session over Indian PSTN gateway.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 flex items-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            ON AIR: CONNECTED
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10 font-bold">
            {formatTime(timer)}
          </span>
        </div>
      </div>

      {/* Main Grid: Active Call Panel + Real-time Streaming Transcript */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Call Specs & Candidate Meta */}
        <div className="p-6 rounded-2xl bg-[#0B0E16] border border-white/[0.08] space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
              Campaign: Machine Operator
            </span>
            <h3 className="text-lg font-bold text-white mt-1">Vikas Balasaheb Pawar</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-500" />
              Nashik (Ozar) · 14.5 km distance
            </p>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-gray-500 text-[10px]">Sarvam Attempt ID</span>
              <p className="text-white font-bold truncate">srv_att_live_9482b610</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-gray-500 text-[10px]">Target Language</span>
              <p className="text-emerald-400 font-bold">Marathi (mr-IN) / Hindi (hi-IN)</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-gray-500 text-[10px]">Sequential Scheduler Token</span>
              <p className="text-gray-300 font-bold">lease_fencing_seq_004</p>
            </div>
          </div>

          {/* Sound wave visualizer animation */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                Live Audio Stream
              </span>
              <span className="text-[10px] font-mono text-emerald-400">PSTN 8kHz G.711</span>
            </div>
            <div className="flex items-center justify-center gap-1 h-12">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-emerald-500 to-blue-400 rounded-full animate-wave"
                  style={{
                    animationDelay: `${(i * 0.08) % 1.2}s`,
                    height: `${Math.max(6, (i * 7) % 36)}px`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Live Sarvam Speech-to-Text Conversation Stream */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0B0E16] border border-white/[0.08] flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Live Dialogue Stream (Sarvam Audio LLM)
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Real-time intent extraction and qualification branching.
                </p>
              </div>
              <span className="text-xs font-mono text-gray-500">Stage 5: Compatibility Check</span>
            </div>

            {/* Conversation Bubbles */}
            <div className="space-y-4 mt-6 text-xs">
              {/* Agent Bubble 1 */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-[10px] shrink-0">
                  AI
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-sm bg-blue-950/20 border border-blue-500/20 text-gray-200 space-y-1 max-w-lg">
                  <p className="font-semibold text-blue-300 text-[11px]">NayaMarg AI Assistant (Marathi):</p>
                  <p>
                    "नमस्कार विकासजी! मी नयामार्ग कडून बोलत आहे. सातपूर एमआयडीसी मधील सीएनसी मशीन ऑपरेटर पदासाठी तुम्हाला विचारत आहे. बोलण्यासाठी हा योग्य वेळ आहे का?"
                  </p>
                </div>
              </div>

              {/* Candidate Bubble 1 */}
              <div className="flex items-start gap-3 justify-end">
                <div className="p-3.5 rounded-2xl rounded-tr-sm bg-white/[0.04] border border-white/10 text-white space-y-1 max-w-lg text-right">
                  <p className="font-semibold text-emerald-400 text-[11px]">Vikas (Candidate):</p>
                  <p>
                    "हो, बोला. काय ऑफर आहे आणि कंपनी कोणती आहे?"
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-[10px] shrink-0">
                  VK
                </div>
              </div>

              {/* Agent Bubble 2 */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-[10px] shrink-0">
                  AI
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-sm bg-blue-950/20 border border-blue-500/20 text-gray-200 space-y-1 max-w-lg">
                  <p className="font-semibold text-blue-300 text-[11px]">NayaMarg AI Assistant:</p>
                  <p>
                    "प्रिसिजन फोर्ज कंपनी आहे. मासिक वेतन १६,००० ते १८,५०० रुपये आहे, सोबत पीएफ आणि डे शिफ्ट आहे. तुम्हाला या वेतनावर काम करायला आवडेल का?"
                  </p>
                </div>
              </div>

              {/* Candidate Bubble 2 */}
              <div className="flex items-start gap-3 justify-end">
                <div className="p-3.5 rounded-2xl rounded-tr-sm bg-white/[0.04] border border-white/10 text-white space-y-1 max-w-lg text-right">
                  <p className="font-semibold text-emerald-400 text-[11px]">Vikas (Candidate):</p>
                  <p>
                    "होय, हे वेतन मला योग्य आहे. मी ओझर मध्ये राहतो, बस ची सोय आहे का?"
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-[10px] shrink-0">
                  VK
                </div>
              </div>
            </div>
          </div>

          {/* Structured Zod Output Extractor Live Preview */}
          <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Live Structured Intent Extracted
              </span>
              <span className="text-[10px] font-mono text-gray-500">Confidence: 0.94</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded bg-white/[0.02]">
                <span className="text-gray-500 block">Interest:</span>
                <span className="text-emerald-400 font-bold">INTERESTED</span>
              </div>
              <div className="p-2 rounded bg-white/[0.02]">
                <span className="text-gray-500 block">Commute:</span>
                <span className="text-emerald-400 font-bold">ACCEPTABLE</span>
              </div>
              <div className="p-2 rounded bg-white/[0.02]">
                <span className="text-gray-500 block">Wage Match:</span>
                <span className="text-emerald-400 font-bold">COMPATIBLE</span>
              </div>
              <div className="p-2 rounded bg-white/[0.02]">
                <span className="text-gray-500 block">Interview Ready:</span>
                <span className="text-blue-400 font-bold">PENDING_CONFIRM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
