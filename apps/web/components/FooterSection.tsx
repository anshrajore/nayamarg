"use client";

import React from "react";
import { ArrowRight, Plus, Twitter, Linkedin, Instagram, PhoneCall } from "lucide-react";

export function FooterSection() {
  return (
    <footer id="join" className="pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Top Banner matching reference: Circular Stamp on left + "Join the Platform" on right */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-20 border-b border-white/[0.06] gap-8">
        {/* Left Stamped Monogram Circle */}
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-full border border-dashed border-white/20 flex items-center justify-center bg-white/[0.02] shadow-2xl">
            <span className="font-extrabold text-2xl text-white tracking-tighter">nm</span>
            <span className="absolute -top-1.5 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[9px] font-black uppercase tracking-wider">
              2.0
            </span>
          </div>

          <div className="text-xs text-gray-400">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">GET IN TOUCH</span>
            <span className="text-white font-semibold text-sm">support@nayamarg.in</span>
            <span className="block text-gray-500 text-[11px] mt-0.5">+91 (020) 6700-XXXX</span>
          </div>
        </div>

        {/* Right Headline & "Get in touch" CTA button */}
        <div className="text-left md:text-right">
          <span className="text-xs font-mono text-gray-400 block mb-1">Let's start</span>
          <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight leading-tight">
            Join the <span className="font-serif-italic font-normal text-white">Platform</span>
          </h2>

          <div className="mt-4 flex md:justify-end">
            <a
              href="mailto:contact@nayamarg.in"
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-gray-200 transition-all shadow-xl active:scale-95"
            >
              <span>Get in touch</span>
              <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
                <ArrowRight className="w-3 h-3" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Two Dark Cards from Reference Image */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-12">
        {/* Left Card (7 Cols) */}
        <div className="md:col-span-7 p-8 rounded-[28px] bg-[#0A0C11] border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="font-extrabold text-2xl text-white tracking-tight mb-4">
              nayamarg<span className="text-emerald-400">.</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
              We empower workers to find dignified livelihood through accessible voice AI, and enable employers to
              hire verified talent through autonomous recruitment orchestration.
            </p>
          </div>

          <div className="pt-8 text-[11px] font-mono text-gray-500">
            NayaMarg Technologies Pvt. Ltd. © 2026. All Rights Reserved.
          </div>
        </div>

        {/* Right Card (5 Cols) */}
        <div className="md:col-span-5 p-8 rounded-[28px] bg-[#0A0C11] border border-white/[0.08] flex flex-col justify-between">
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 font-semibold mb-3">
              Explore NayaMarg
            </h4>

            {/* Social Pills */}
            <div className="flex items-center gap-2 mb-6">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/5 hover:border-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all text-xs"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/5 hover:border-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all text-xs"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/5 hover:border-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all text-xs"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Newsletter Input Box matching reference image */}
            <div className="space-y-2">
              <span className="text-[11px] text-gray-400 font-medium block">Stay updated with hiring insights</span>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all pr-10"
                />
                <button className="absolute right-1.5 w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-all">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 text-[10px] text-gray-500">
            By connecting, you agree to our{" "}
            <a href="#" className="underline text-gray-400 hover:text-white">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-gray-400 hover:text-white">
              Communication Terms
            </a>
            .
          </div>
        </div>
      </div>

      {/* Bottom Center Pill Navigation Bar */}
      <div className="flex justify-center pt-6">
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-[11px] text-gray-400">
          <a href="#" className="px-3 py-1 rounded-full hover:text-white transition-colors">
            Home
          </a>
          <span>•</span>
          <a href="#employer" className="px-3 py-1 rounded-full hover:text-white transition-colors">
            For Employers
          </a>
          <span>•</span>
          <a href="#worker" className="px-3 py-1 rounded-full hover:text-white transition-colors">
            For Workers
          </a>
          <span>•</span>
          <a href="#how-it-works" className="px-3 py-1 rounded-full hover:text-white transition-colors">
            How It Works
          </a>
          <span>•</span>
          <a href="#featured-talent" className="px-3 py-1 rounded-full hover:text-white transition-colors">
            Candidate Pipeline
          </a>
        </div>
      </div>
    </footer>
  );
}
