import { NextRequest, NextResponse } from "next/server";
import { orchestratorManager } from "@/lib/recruitment/backend-orchestrator";

export async function POST(req: NextRequest) {
  try {
    const orchestrator = orchestratorManager.getOrchestrator();
    const state = orchestrator.getState();

    if (!state) {
      return NextResponse.json(
        {
          success: false,
          error: "No active campaign. Call POST /api/recruitment/jobs first.",
        },
        { status: 400 }
      );
    }

    const workerId = `worker-api-${Date.now()}`;
    let body: any = {};
    try {
      body = await req.json();
    } catch (_) {}

    const callingTime = body.simulatedTime
      ? new Date(body.simulatedTime)
      : new Date("2026-11-14T11:00:00+05:30");
    const result = await orchestrator.stepOutreach(workerId, callingTime);

    if (!result) {
      const isSaturated = state.capacityStatus.isPipelineSaturated;
      return NextResponse.json({
        success: false,
        message: isSaturated
          ? "Outreach halted: Weighted pipeline capacity target reached (150% of required vacancies)."
          : "Dialer busy: Active call lease in-flight (c = 1 concurrency enforcement) or no more queued candidates.",
        campaignStatus: state.campaign.status,
        capacityStatus: state.capacityStatus,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Outreach initiated sequentially under exclusive campaign lease (c = 1)",
      dialedCandidate: {
        id: result.call.candidate.id,
        name: result.call.candidate.name,
        phone: result.call.candidate.phoneNumber,
        rank: result.call.rank,
        suitabilityScore: result.call.score,
        distanceKm: result.call.distanceKm,
      },
      lease: {
        queueId: result.call.queueId,
        fencingToken: result.call.fencingToken,
        leaseExpiresAt: result.call.leaseExpiresAt,
      },
      sarvamSession: {
        sessionId: result.session.sessionId,
        sarvamCallId: result.session.sarvamCallId,
        language: result.session.promptLanguage,
        contextVariables: result.session.contextVariables,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to step outreach",
      },
      { status: 500 }
    );
  }
}
