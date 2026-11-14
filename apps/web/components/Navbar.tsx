"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  // Do not render navbar on authenticated workspace shells or login
  if (
    pathname.startsWith("/worker") ||
    pathname.startsWith("/employer") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login")
  ) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-6 px-6 py-3 rounded-full bg-[#080B11]/90 backdrop-blur-2xl border border-white/[0.08] shadow-2xl max-w-6xl w-full">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            NAYAMARG<span className="text-emerald-400">.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-xs text-gray-300 font-medium">
          <Link href="/#how-it-works" className="hover:text-white transition-colors">
            How it works
          </Link>
          <Link href="/#for-workers" className="hover:text-white transition-colors">
            For workers
          </Link>
          <Link href="/#for-employers" className="hover:text-white transition-colors">
            For employers
          </Link>
          <Link href="/#about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/#help" className="hover:text-white transition-colors">
            Help
          </Link>
        </div>

        {/* Simple Sign-in Button (No profile dropdown) */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/login"
            className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-all active:scale-95"
          >
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  );
}
