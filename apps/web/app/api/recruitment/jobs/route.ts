import { NextRequest, NextResponse } from "next/server";
import { orchestratorManager } from "@/lib/recruitment/backend-orchestrator";
import { HiringRequestInputSchema } from "@nayamarg/contracts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedInput = HiringRequestInputSchema.parse(body);

    const orchestrator = orchestratorManager.getOrchestrator();
    const hiringRequestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // 1. Ingest job & initialize 10 discrete vacancy slots
    const state = orchestrator.publishJobAndInitialize(hiringRequestId, validatedInput);

    // 2. Discover within specified radius (e.g. 25km) & rank with nayamarg-match-v1
    // In dev / test, use 11:00 AM IST calling window
    const callingTime = body.simulatedTime
      ? new Date(body.simulatedTime)
      : new Date("2026-11-14T11:00:00+05:30");
    const rankedCandidates = orchestrator.discoverAndRank(callingTime);

    return NextResponse.json({
      success: true,
      message: "Hiring request published and recruitment campaign initialized",
      hiringRequestId,
      campaignId: state.campaign.id,
      snapshot: state.jobSnapshot,
      vacancyAccounting: {
        totalVacancies: state.capacityStatus.totalVacancies,
        openSlots: state.capacityStatus.openSlots,
        weightedCapacity: state.capacityStatus.weightedPipelineCapacity,
        pipelineTarget: state.capacityStatus.pipelineTarget,
      },
      discoveredCandidatesCount: rankedCandidates.length,
      topRankedCandidates: rankedCandidates.slice(0, 3).map((r) => ({
        rank: r.rank,
        candidateId: r.candidate.id,
        name: r.candidate.name,
        trade: r.candidate.tradeCategory,
        score: r.totalScore,
        distanceKm: r.distanceKm,
        expectedSalary: r.candidate.expectedSalary,
      })),
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to publish hiring request",
        details: err.issues || undefined,
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  const orchestrator = orchestratorManager.getOrchestrator();
  const state = orchestrator.getState();

  if (!state) {
    return NextResponse.json(
      {
        success: false,
        message: "No active recruitment campaign running. POST to /api/recruitment/jobs to publish.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    hiringRequestId: state.jobSnapshot.hiringRequestId,
    campaignId: state.campaign.id,
    jobTitle: state.jobSnapshot.title,
    location: `${state.jobSnapshot.location.city}, ${state.jobSnapshot.location.state}`,
    vacancies: state.jobSnapshot.vacanciesCount,
    status: state.campaign.status,
    capacity: state.capacityStatus,
    slots: state.slots,
  });
}
