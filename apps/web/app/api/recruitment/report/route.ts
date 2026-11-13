import { NextResponse } from "next/server";
import { orchestratorManager } from "@/lib/recruitment/backend-orchestrator";

export async function GET() {
  const orchestrator = orchestratorManager.getOrchestrator();
  const state = orchestrator.getState();

  if (!state) {
    return NextResponse.json(
      {
        success: false,
        error: "No active recruitment campaign to report on.",
      },
      { status: 404 }
    );
  }

  const report = orchestrator.generateEmployerReport();
  return NextResponse.json({
    success: true,
    report,
  });
}
