import { NextRequest, NextResponse } from "next/server";
import { orchestratorManager } from "@/lib/recruitment/backend-orchestrator";
import crypto from "crypto";

function verifyWebhookSecurity(req: NextRequest, rawBody: string): boolean {
  const secret = process.env.SARVAM_WEBHOOK_SECRET;

  // In test / dev environments without explicit secret set, allow fallback
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("SECURITY VIOLATION: SARVAM_WEBHOOK_SECRET must be set in production.");
      return false;
    }
    return true;
  }

  // Check 1: Shared secret header
  const authHeader = req.headers.get("x-sarvam-webhook-secret") || req.headers.get("authorization");
  if (authHeader && (authHeader === secret || authHeader === `Bearer ${secret}`)) {
    return true;
  }

  // Check 2: HMAC-SHA256 signature verification
  const signature = req.headers.get("x-sarvam-signature");
  if (!signature) {
    return false;
  }

  const computedHmac = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedHmac));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    if (!verifyWebhookSecurity(req, rawBody)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Invalid or missing webhook authentication signature.",
        },
        { status: 401 }
      );
    }

    const body = JSON.parse(rawBody);

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
