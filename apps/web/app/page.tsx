"use client";

import React, { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { GeospatialRadar } from "@/components/GeospatialRadar";
import { LiveVoiceSimulator } from "@/components/LiveVoiceSimulator";
import { RecruitmentPipelineMatrix } from "@/components/RecruitmentPipelineMatrix";
import { FailureCentre } from "@/components/FailureCentre";
import { ArchitectureSection } from "@/components/ArchitectureSection";

export default function Home() {
  const [pipelineToast, setPipelineToast] = useState<string | null>(null);

  const handleVoiceResponse = (result: { type: string; payload: any }) => {
    if (result.type === "INTERESTED") {
      setPipelineToast("Candidate qualified! Interview stage updated and vacancy reservation checked.");
      setTimeout(() => setPipelineToast(null), 4000);
    } else if (result.type === "OPT_OUT") {
      setPipelineToast("Candidate opted out. Suppression recorded globally across all campaigns.");
      setTimeout(() => setPipelineToast(null), 4000);
    }
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {pipelineToast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-black/90 border border-brand-electricLime/40 text-brand-electricLime text-xs font-semibold shadow-2xl backdrop-blur-xl animate-bounce">
          ⚡ {pipelineToast}
        </div>
      )}

      {/* 1. Hero with Capsule Typography & Process Flow */}
      <HeroSection />

      {/* 2. Geospatial PostGIS Radar & Suitability Scoring */}
      <GeospatialRadar />

      {/* 3. Live Sarvam Voice Call Simulator */}
      <LiveVoiceSimulator onCandidateResponse={handleVoiceResponse} />

      {/* 4. Vacancy Slots & Capacity Accounting Matrix */}
      <RecruitmentPipelineMatrix />

      {/* 5. Failure Centre & Operations Center */}
      <FailureCentre />

      {/* 6. System Architecture & Invariant Standards */}
      <ArchitectureSection />
    </div>
  );
}
