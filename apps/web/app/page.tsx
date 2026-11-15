"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { EmployerExperience } from "@/components/EmployerExperience";
import { WorkerExperience } from "@/components/WorkerExperience";
import { FooterSection } from "@/components/FooterSection";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"all" | "employer" | "worker">("all");

  const handleSelectRole = (role: "employer" | "worker") => {
    setActiveTab(role);
    const element = document.getElementById(role);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050608] text-gray-100 selection:bg-blue-600 selection:text-white">
      {/* Floating Navbar matching inspiration */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Hero with exact luxury typography ("We connect the best workers in this country") + 3-card carousel + mosaic */}
      <HeroSection onSelectRole={handleSelectRole} />

      {/* 5-Stage Recruitment Operational Process */}
      <HowItWorksSection />

      {/* Desktop-first Employer Workspace */}
      <div id="featured-talent">
        <EmployerExperience />
      </div>

      {/* Mobile-first Multilingual Worker Experience */}
      <WorkerExperience />

      {/* Stamped Monogram CTA & Editorial Footer matching reference */}
      <FooterSection />
    </div>
  );
}
