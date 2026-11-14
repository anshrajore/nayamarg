"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const next = searchParams.get("next") || "/login";
    router.replace(`/login?next=${encodeURIComponent(next)}`);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#07090E] flex items-center justify-center text-gray-400 font-mono text-xs">
      Redirecting to unified authentication portal...
    </div>
  );
}

export default function AuthRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07090E] flex items-center justify-center text-gray-400 font-mono text-xs">
          Loading...
        </div>
      }
    >
      <AuthRedirectContent />
    </Suspense>
  );
}
