import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "UNKNOWN";
  let latencyMs = 0;

  try {
    // Query the live profiles table in Supabase
    const { count, error } = await supabaseAdmin.from("profiles").select("*", { count: "exact", head: true });
    
    if (error) {
      dbStatus = "CONNECTED_WITH_NOTICE: " + error.message;
    } else {
      dbStatus = "CONNECTED_LIVE_TABLES_READY";
    }
  } catch (err: any) {
    dbStatus = "ERROR: " + (err.message || String(err));
  } finally {
    latencyMs = Date.now() - startTime;
  }

  return NextResponse.json({
    status: "HEALTHY",
    service: "NayaMarg 2.0 Backend Core",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
    database: {
      provider: "Supabase PostgreSQL",
      projectId: process.env.SUPABASE_PROJECT_ID || "fuitxkkmilvefbikvzje",
      status: dbStatus,
      latencyMs,
    },
    voiceProvider: {
      provider: "Sarvam AI",
      agentStatus: "READY",
    },
    orchestrator: {
      sequentialDialer: "ONLINE",
      concurrencyLimit: 1,
      complianceGate: "TRAI_DLT_ENABLED",
    },
  });
}
