"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkerLoginRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/login?role=worker");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#06080E] flex items-center justify-center text-amber-400 font-mono text-xs">
      Loading Worker Portal...
    </div>
  );
}
