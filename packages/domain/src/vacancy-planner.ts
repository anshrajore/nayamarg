/**
 * Vacancy Planner & Capacity Engine
 * Enforces strict distinction between:
 * - Required vacancies (Employer need)
 * - Interested candidates (Candidate agreement)
 * - Selected candidates (Offer extended)
 * - Joined candidates (Verified employment outcome)
 */

export interface VacancyPlanInput {
  requiredVacancies: number;
  filledVacancies: number;
  qualifiedInterestedCount: number;
  shortlistedCount: number;
  interviewScheduledCount: number;
  offerPendingCount: number;
  targetCoverageFactor?: number; // e.g. 1.5x
}

export interface VacancyPlanOutput {
  remainingVacancies: number;
  targetCandidatePool: number;
  rawActivePipeline: number;
  weightedPipelineScore: number;
  additionalCandidatesNeeded: number;
  isPipelineReady: boolean;
  isPositionFilled: boolean;
  status: "OPEN" | "PIPELINE_READY" | "FILLED";
}

// Stage weights reflect real-world probability of candidate reaching joined state
export const STAGE_WEIGHTS = {
  QUALIFIED_INTERESTED: 0.35,
  SHORTLISTED: 0.55,
  INTERVIEW_SCHEDULED: 0.75,
  OFFER_PENDING: 0.90,
} as const;

export function calculateVacancyCapacity(input: VacancyPlanInput): VacancyPlanOutput {
  const coverageFactor = input.targetCoverageFactor ?? 1.5;
  const remainingVacancies = Math.max(0, input.requiredVacancies - input.filledVacancies);

  if (remainingVacancies === 0) {
    return {
      remainingVacancies: 0,
      targetCandidatePool: 0,
      rawActivePipeline: 0,
      weightedPipelineScore: 0,
      additionalCandidatesNeeded: 0,
      isPipelineReady: true,
      isPositionFilled: true,
      status: "FILLED",
    };
  }

  const rawActivePipeline =
    input.qualifiedInterestedCount +
    input.shortlistedCount +
    input.interviewScheduledCount +
    input.offerPendingCount;

  const weightedPipelineScore =
    input.qualifiedInterestedCount * STAGE_WEIGHTS.QUALIFIED_INTERESTED +
    input.shortlistedCount * STAGE_WEIGHTS.SHORTLISTED +
    input.interviewScheduledCount * STAGE_WEIGHTS.INTERVIEW_SCHEDULED +
    input.offerPendingCount * STAGE_WEIGHTS.OFFER_PENDING;

  const targetCandidatePool = Math.ceil(remainingVacancies * coverageFactor);
  const additionalCandidatesNeeded = Math.max(0, targetCandidatePool - rawActivePipeline);
  const isPipelineReady = additionalCandidatesNeeded === 0 || weightedPipelineScore >= remainingVacancies;

  return {
    remainingVacancies,
    targetCandidatePool,
    rawActivePipeline,
    weightedPipelineScore: Number(weightedPipelineScore.toFixed(2)),
    additionalCandidatesNeeded,
    isPipelineReady,
    isPositionFilled: false,
    status: isPipelineReady ? "PIPELINE_READY" : "OPEN",
  };
}
