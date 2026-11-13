import { NextRequest, NextResponse } from "next/server";
import { orchestratorManager } from "@/lib/recruitment/backend-orchestrator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      queueId,
      fencingToken,
      callStatus = "COMPLETED",
      durationSeconds = 60,
      structuredResult,
      transcript,
      confidence = 0.95,
    } = body;

    if (!queueId || fencingToken === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameters: queueId and fencingToken are mandatory.",
        },
        { status: 400 }
      );
    }

    const orchestrator = orchestratorManager.getOrchestrator();

    const parsed = orchestrator.handleCallWebhook(queueId, fencingToken, {
      callStatus,
      durationSeconds,
      structuredResult,
      transcript,
      confidence,
    });

    const state = orchestrator.getState()!;

    return NextResponse.json({
      success: true,
      message: "Webhook processed and state updated",
      callAttemptId: parsed.callAttemptId,
      candidateId: parsed.candidateId,
      decision: parsed.decision,
      callOutcome: parsed.callOutcome,
      updatedCapacity: {
        totalVacancies: state.capacityStatus.totalVacancies,
        openSlots: state.capacityStatus.openSlots,
        weightedCapacity: state.capacityStatus.weightedPipelineCapacity,
        pipelineTarget: state.capacityStatus.pipelineTarget,
        isSaturated: state.capacityStatus.isPipelineSaturated,
      },
      campaignMetrics: {
        dialed: state.campaign.totalDialed,
        answered: state.campaign.totalAnswered,
        interested: state.campaign.totalInterested,
        declined: state.campaign.totalDeclined,
        callbacks: state.campaign.totalCallbacksScheduled,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to process Sarvam webhook",
      },
      { status: 500 }
    );
  }
}
