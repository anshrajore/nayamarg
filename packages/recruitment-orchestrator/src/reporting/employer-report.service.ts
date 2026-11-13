import { JobRequirementSnapshot, VacancySlotModel } from "../job-intelligence/job-intelligence.service";
import { RecruitmentCampaign } from "../campaign-manager/campaign.service";
import { VacancyCapacityStatus } from "../vacancy-manager/vacancy-slot-manager.service";

export interface QualifiedCandidateReportItem {
  candidateId: string;
  name: string;
  matchScore: number;
  distanceKm: number;
  experienceMonths: number;
  expectedSalary: number;
  shiftPreference: string;
  availableInDays: number;
  callNotes?: string;
  contactedAt: Date;
}

export interface EmployerRecruitmentReport {
  reportId: string;
  hiringRequestId: string;
  campaignId: string;
  jobTitle: string;
  location: string;
  targetVacancies: number;
  campaignStatus: string;
  slotSummary: {
    total: number;
    open: number;
    reserved: number;
    filled: number;
  };
  pipelineFunnel: {
    totalDiscovered: number;
    totalContacted: number;
    interested: number;
    declined: number;
    callbacksPending: number;
    weightedCapacity: number;
    capacityTarget: number;
    fulfillmentRatePercent: number;
  };
  qualifiedCandidates: QualifiedCandidateReportItem[];
  generatedAt: Date;
}

export class EmployerReportService {
  public generateReport(
    job: JobRequirementSnapshot,
    campaign: RecruitmentCampaign,
    capacity: VacancyCapacityStatus,
    slots: VacancySlotModel[],
    qualifiedCandidates: QualifiedCandidateReportItem[]
  ): EmployerRecruitmentReport {
    const fulfillmentRate = Math.min(
      100,
      Math.round((capacity.weightedPipelineCapacity / capacity.pipelineTarget) * 100)
    );

    return {
      reportId: `rep_${job.hiringRequestId}_${Date.now()}`,
      hiringRequestId: job.hiringRequestId,
      campaignId: campaign.id,
      jobTitle: job.title,
      location: `${job.location.city}, ${job.location.state}`,
      targetVacancies: job.vacanciesCount,
      campaignStatus: campaign.status,
      slotSummary: {
        total: capacity.totalVacancies,
        open: capacity.openSlots,
        reserved: capacity.reservedSlots,
        filled: capacity.filledSlots,
      },
      pipelineFunnel: {
        totalDiscovered: campaign.totalDiscovered,
        totalContacted: campaign.totalDialed,
        interested: campaign.totalInterested,
        declined: campaign.totalDeclined,
        callbacksPending: campaign.totalCallbacksScheduled,
        weightedCapacity: capacity.weightedPipelineCapacity,
        capacityTarget: capacity.pipelineTarget,
        fulfillmentRatePercent: fulfillmentRate,
      },
      qualifiedCandidates,
      generatedAt: new Date(),
    };
  }
}
