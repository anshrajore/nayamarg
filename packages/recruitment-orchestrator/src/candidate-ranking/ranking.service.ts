import { CandidateProfile, SpatialMatchResult } from "../candidate-discovery/spatial-matcher.service";
import { JobRequirementSnapshot } from "../job-intelligence/job-intelligence.service";
import { scoreCandidate, CandidateScoreBreakdown } from "@nayamarg/domain";

export interface RankedCandidate {
  candidate: CandidateProfile;
  distanceKm: number;
  totalScore: number;
  breakdown: CandidateScoreBreakdown;
  rank: number;
}

export class RankingService {
  /**
   * Applies nayamarg-match-v1 scoring model across discovered candidates.
   */
  public rankCandidates(
    discovered: SpatialMatchResult[],
    jobSnapshot: JobRequirementSnapshot
  ): RankedCandidate[] {
    const scoredList: {
      candidate: CandidateProfile;
      distanceKm: number;
      totalScore: number;
      breakdown: CandidateScoreBreakdown;
    }[] = [];

    for (const item of discovered) {
      const breakdown = scoreCandidate({
        workerSkills: item.candidate.skills,
        requiredSkills: jobSnapshot.qualifications.requiredSkills,
        workerExperienceYears: item.candidate.experienceMonths / 12,
        requiredMinExpYears: jobSnapshot.qualifications.minExperienceYears,
        requiredMaxExpYears: jobSnapshot.qualifications.maxExperienceYears,
        distanceKm: item.distanceKm,
        maxRadiusKm: jobSnapshot.location.radiusKm,
        workerExpectedSalaryMin: item.candidate.expectedSalary,
        jobSalaryMin: jobSnapshot.compensation.minMonthlySalary,
        jobSalaryMax: jobSnapshot.compensation.maxMonthlySalary,
        workerAvailability: "AVAILABLE",
        workerShift: item.candidate.shiftPreference,
        jobShift: jobSnapshot.shiftDetails.shiftType,
        workerLanguages: [item.candidate.preferredLanguage],
        jobLanguages: jobSnapshot.qualifications.languages,
      });

      scoredList.push({
        candidate: item.candidate,
        distanceKm: item.distanceKm,
        totalScore: breakdown.totalScore,
        breakdown,
      });
    }

    // Sort descending by total score, then ascending by distance as tie-breaker
    scoredList.sort((a, b) => {
      if (b.totalScore !== a.totalScore) {
        return b.totalScore - a.totalScore;
      }
      return a.distanceKm - b.distanceKm;
    });

    // Assign sequential ranks (1-based)
    return scoredList.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
  }
}
