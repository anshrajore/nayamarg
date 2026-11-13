/**
 * Candidate Suitability Scoring Model (nayamarg-match-v1)
 * Weights:
 * - Skill match: 30%
 * - Experience: 20%
 * - Location / Distance: 20%
 * - Salary compatibility: 15%
 * - Availability: 10%
 * - Shift / Language fit: 5%
 */

export interface CandidateProfileScoringInput {
  workerSkills: string[];
  requiredSkills: string[];
  workerExperienceYears: number;
  requiredMinExpYears: number;
  requiredMaxExpYears: number;
  distanceKm: number;
  maxRadiusKm: number;
  workerExpectedSalaryMin?: number;
  jobSalaryMin: number;
  jobSalaryMax: number;
  workerAvailability: "AVAILABLE" | "EMPLOYED" | "NOTICE_PERIOD" | "UNAVAILABLE";
  workerShift: string;
  jobShift: string;
  workerLanguages: string[];
  jobLanguages: string[];
}

export interface CandidateScoreBreakdown {
  totalScore: number;
  factors: {
    skillScore: number;
    experienceScore: number;
    locationScore: number;
    salaryScore: number;
    availabilityScore: number;
    shiftLanguageScore: number;
  };
  isEligible: boolean;
  explanation: Record<string, any>;
}

export function scoreCandidate(input: CandidateProfileScoringInput): CandidateScoreBreakdown {
  // Hard Constraint Checks
  if (input.distanceKm > input.maxRadiusKm) {
    return {
      totalScore: 0,
      factors: { skillScore: 0, experienceScore: 0, locationScore: 0, salaryScore: 0, availabilityScore: 0, shiftLanguageScore: 0 },
      isEligible: false,
      explanation: { failure: "Distance exceeds permitted search radius", distanceKm: input.distanceKm, maxRadiusKm: input.maxRadiusKm },
    };
  }

  // 1. Skill Match (30 pts)
  const matchedSkills = input.requiredSkills.filter(s => input.workerSkills.includes(s));
  const skillRatio = input.requiredSkills.length > 0 ? matchedSkills.length / input.requiredSkills.length : 1.0;
  const skillScore = skillRatio * 30;

  // 2. Experience Fit (20 pts)
  let experienceScore = 0;
  if (input.workerExperienceYears >= input.requiredMinExpYears && input.workerExperienceYears <= input.requiredMaxExpYears) {
    experienceScore = 20;
  } else if (input.workerExperienceYears > input.requiredMaxExpYears) {
    experienceScore = 16; // Overqualified slight adjustment
  } else {
    const ratio = input.requiredMinExpYears > 0 ? input.workerExperienceYears / input.requiredMinExpYears : 1.0;
    experienceScore = Math.max(0, ratio * 15);
  }

  // 3. Location / Proximity Fit (20 pts)
  // Closer candidates score higher linearly within search radius
  const proximityRatio = Math.max(0, 1 - (input.distanceKm / input.maxRadiusKm));
  const locationScore = proximityRatio * 20;

  // 4. Salary Compatibility (15 pts)
  let salaryScore = 15;
  if (input.workerExpectedSalaryMin) {
    if (input.workerExpectedSalaryMin <= input.jobSalaryMax) {
      salaryScore = 15;
    } else if (input.workerExpectedSalaryMin <= input.jobSalaryMax * 1.15) {
      salaryScore = 9; // Negotiable within 15%
    } else {
      salaryScore = 3; // Significant mismatch
    }
  }

  // 5. Availability (10 pts)
  let availabilityScore = 5;
  if (input.workerAvailability === "AVAILABLE") availabilityScore = 10;
  else if (input.workerAvailability === "NOTICE_PERIOD") availabilityScore = 7;
  else if (input.workerAvailability === "EMPLOYED") availabilityScore = 4;
  else availabilityScore = 0;

  // 6. Shift and Language Fit (5 pts)
  let shiftLanguageScore = 0;
  if (input.workerShift === "ANY" || input.workerShift.toLowerCase() === input.jobShift.toLowerCase()) {
    shiftLanguageScore += 2.5;
  }
  const langMatch = input.jobLanguages.some(l => input.workerLanguages.includes(l));
  if (langMatch) shiftLanguageScore += 2.5;

  const totalScore = Math.round(
    skillScore + experienceScore + locationScore + salaryScore + availabilityScore + shiftLanguageScore
  );

  return {
    totalScore,
    factors: {
      skillScore: Number(skillScore.toFixed(1)),
      experienceScore: Number(experienceScore.toFixed(1)),
      locationScore: Number(locationScore.toFixed(1)),
      salaryScore: Number(salaryScore.toFixed(1)),
      availabilityScore: Number(availabilityScore.toFixed(1)),
      shiftLanguageScore: Number(shiftLanguageScore.toFixed(1)),
    },
    isEligible: totalScore >= 45,
    explanation: {
      matchedSkills,
      distanceKm: input.distanceKm,
      experienceYears: input.workerExperienceYears,
      model: "nayamarg-match-v1",
    },
  };
}
