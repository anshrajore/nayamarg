export type CampaignStatus = "CREATED" | "RUNNING" | "PAUSED" | "PIPELINE_READY" | "COMPLETED" | "FAILED";

export interface RecruitmentCampaign {
  id: string;
  hiringRequestId: string;
  status: CampaignStatus;
  targetVacancies: number;
  weightedPipelineTarget: number; // e.g. targetVacancies * 1.5
  totalDiscovered: number;
  totalEligible: number;
  totalDialed: number;
  totalAnswered: number;
  totalInterested: number;
  totalDeclined: number;
  totalCallbacksScheduled: number;
  startedAt?: Date;
  pausedAt?: Date;
  completedAt?: Date;
  statusReason?: string;
}

export class CampaignManagerService {
  public createCampaign(hiringRequestId: string, vacanciesCount: number): RecruitmentCampaign {
    return {
      id: `camp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      hiringRequestId,
      status: "CREATED",
      targetVacancies: vacanciesCount,
      weightedPipelineTarget: vacanciesCount * 1.5,
      totalDiscovered: 0,
      totalEligible: 0,
      totalDialed: 0,
      totalAnswered: 0,
      totalInterested: 0,
      totalDeclined: 0,
      totalCallbacksScheduled: 0,
    };
  }

  public startCampaign(campaign: RecruitmentCampaign): RecruitmentCampaign {
    if (campaign.status !== "CREATED" && campaign.status !== "PAUSED") {
      throw new Error(`Cannot start campaign in state: ${campaign.status}`);
    }
    return {
      ...campaign,
      status: "RUNNING",
      startedAt: campaign.startedAt || new Date(),
      statusReason: undefined,
    };
  }

  public pauseCampaign(campaign: RecruitmentCampaign, reason: string): RecruitmentCampaign {
    return {
      ...campaign,
      status: "PAUSED",
      pausedAt: new Date(),
      statusReason: reason,
    };
  }

  public markPipelineReady(campaign: RecruitmentCampaign): RecruitmentCampaign {
    return {
      ...campaign,
      status: "PIPELINE_READY",
      pausedAt: new Date(),
      statusReason: "Weighted pipeline capacity target fulfilled (150% of required vacancies)",
    };
  }

  public completeCampaign(campaign: RecruitmentCampaign): RecruitmentCampaign {
    return {
      ...campaign,
      status: "COMPLETED",
      completedAt: new Date(),
      statusReason: "All vacancy slots filled and verified",
    };
  }
}
