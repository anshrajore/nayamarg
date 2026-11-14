"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Factory, ChevronRight, Play, Pause, CheckCircle2 } from "lucide-react";

export default function WorkerJobsPage() {
  const [search, setSearch] = useState("");
  const [selectedZone, setSelectedZone] = useState("ALL");

  const jobs = [
    {
      id: "job-1",
      title: "Machine Operator (CNC / Lathe)",
      titleMR: "मशिन ऑपरेटर (CNC / लेथ मशिन)",
      employer: "Precision Forge & Tools Ltd.",
      location: "Satpur MIDC, Nashik",
      wage: "₹16,000 – ₹18,500 / month",
      vacancies: 10,
      shift: "Day Shift (8 Hours)",
      zone: "Satpur",
    },
    {
      id: "job-2",
      title: "Industrial Maintenance Electrician",
      titleMR: "इंडस्ट्रियल मेंटेनन्स इलेक्ट्रिशियन",
      employer: "Mahindra Heavy Engineering",
      location: "Ambad MIDC, Nashik",
      wage: "₹18,500 – ₹22,000 / month",
      vacancies: 5,
      shift: "Rotational (8 Hours)",
      zone: "Ambad",
    },
    {
      id: "job-3",
      title: "MIG / TIG Welder & Fabricator",
      titleMR: "मिग / टिग वेल्डर आणि फॅब्रिकेटर",
      employer: "Nashik Auto Components Pvt. Ltd.",
      location: "Ozar Industrial Area, Nashik",
      wage: "₹17,000 – ₹20,000 / month",
      vacancies: 8,
      shift: "Day Shift (8 Hours)",
      zone: "Ozar",
    },
  ];

  const filtered = jobs.filter((j) => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.employer.toLowerCase().includes(search.toLowerCase());
    if (selectedZone === "ALL") return matchSearch;
    return matchSearch && j.zone === selectedZone;
  });

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
          <span>Worker workspace</span>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Find jobs</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">Verified Factory Jobs</h1>
        <p className="text-xs text-gray-400 mt-1">
          Explore direct manufacturing requirements across Nashik, Sinnar and Pune industrial clusters.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title or company name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
          />
        </div>
        <div className="flex items-center gap-2">
          {["ALL", "Satpur", "Ambad", "Ozar"].map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedZone === zone
                  ? "bg-amber-500 text-black font-extrabold"
                  : "bg-white/[0.03] text-gray-400 hover:text-white border border-white/5"
              }`}
            >
              {zone === "ALL" ? "All Clusters" : zone}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((j) => (
          <div
            key={j.id}
            className="p-5 rounded-2xl bg-[#0D1018] border border-white/[0.08] hover:border-amber-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                {j.vacancies} VACANCIES
              </span>
              <h3 className="text-base font-bold text-white mt-1">{j.titleMR}</h3>
              <p className="text-xs text-gray-300">{j.title} · {j.employer}</p>
              <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{j.location}</span>
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
              <span className="text-sm font-bold text-emerald-400 font-mono">{j.wage}</span>
              <Link
                href="/worker"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all flex items-center gap-1"
              >
                <span>Apply</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
