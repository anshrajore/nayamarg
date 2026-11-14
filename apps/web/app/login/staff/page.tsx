"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StaffLoginRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/login?role=staff");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#06080E] flex items-center justify-center text-blue-400 font-mono text-xs">
      Loading Staff Console...
    </div>
  );
}
