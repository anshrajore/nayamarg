"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmployerLoginRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/login?role=employer");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#06080E] flex items-center justify-center text-emerald-400 font-mono text-xs">
      Loading Employer Console...
    </div>
  );
}
