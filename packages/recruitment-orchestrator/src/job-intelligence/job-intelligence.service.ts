import { HiringRequestInput, HiringRequestInputSchema } from "@nayamarg/contracts";

export interface VacancySlotModel {
  slotId: string;
  hiringRequestId: string;
  slotNumber: number;
  status: "OPEN" | "RESERVED" | "FILLED" | "CANCELLED";
  assignedCandidateId?: string;
  reservationExpiresAt?: Date;
  filledAt?: Date;
}

export interface JobRequirementSnapshot {
  snapshotId: string;
  hiringRequestId: string;
  title: string;
  category: string;
  vacanciesCount: number;
  location: {
    city: string;
    state: string;
    pincode: string;
    coordinates: [number, number]; // [lng, lat]
    radiusKm: number;
  };
  compensation: {
    minMonthlySalary: number;
    maxMonthlySalary: number;
    currency: string;
    period: string;
  };
  qualifications: {
    minExperienceYears: number;
    maxExperienceYears: number;
    minExperienceMonths: number;
    maxExperienceMonths: number;
    requiredSkills: string[];
    languages: string[];
  };
  shiftDetails: {
    shiftType: string;
    jobType: string;
    targetCoverageFactor: number;
    joiningTimelineDays: number;
  };
  createdAt: Date;
}

export class JobIntelligenceService {
  public validateAndSnapshot(
    hiringRequestId: string,
    rawInput: unknown
  ): { snapshot: JobRequirementSnapshot; slots: VacancySlotModel[] } {
    // 1. Zod schema validation
    const input: HiringRequestInput = HiringRequestInputSchema.parse(rawInput);

    // 2. Build immutable snapshot
    const snapshot: JobRequirementSnapshot = {
      snapshotId: `snap_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      hiringRequestId,
      title: input.title.trim(),
      category: input.category,
      vacanciesCount: input.vacancies,
      location: {
        city: input.location.city,
        state: input.location.state,
        pincode: input.location.pincode,
        coordinates: [input.location.longitude, input.location.latitude],
        radiusKm: input.location.search_radius_km || 25.0,
      },
      compensation: {
        minMonthlySalary: input.salary.minimum,
        maxMonthlySalary: input.salary.maximum,
        currency: input.salary.currency || "INR",
        period: input.salary.period || "monthly",
      },
      qualifications: {
        minExperienceYears: input.experience.minimum_years,
        maxExperienceYears: input.experience.maximum_years,
        minExperienceMonths: Math.round(input.experience.minimum_years * 12),
        maxExperienceMonths: Math.round(input.experience.maximum_years * 12),
        requiredSkills: input.requirements || [],
        languages: input.languages || ["hi-IN", "mr-IN"],
      },
      shiftDetails: {
        shiftType: input.shift,
        jobType: input.job_type,
        targetCoverageFactor: input.target_coverage_factor || 1.5,
        joiningTimelineDays: 7,
      },
      createdAt: new Date(),
    };

    // 3. Initialize discrete individual vacancy slots (1 to N)
    const slots: VacancySlotModel[] = [];
    for (let i = 1; i <= input.vacancies; i++) {
      slots.push({
        slotId: `slot_${hiringRequestId}_${String(i).padStart(2, "0")}`,
        hiringRequestId,
        slotNumber: i,
        status: "OPEN",
      });
    }

    return { snapshot, slots };
  }
}
