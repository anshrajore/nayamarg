import { CANDIDATE_APPLICATION_TRANSITIONS, canTransition } from "@nayamarg/domain";

export type ApplicationState =
  | "MATCHED"
  | "CONTACT_PENDING"
  | "CONTACTED"
  | "CALLBACK_REQUESTED"
  | "INTERESTED"
  | "NOT_INTERESTED"
  | "QUALIFIED"
  | "SHORTLISTED"
  | "INTERVIEW_SCHEDULED"
  | "INTERVIEWED"
  | "OFFER_MADE"
  | "OFFER_ACCEPTED"
  | "JOINED"
  | "WITHDRAWN"
  | "REJECTED"
  | "SUPPRESSED";

export interface CandidateApplicationRecord {
  id: string;
  hiringRequestId: string;
  candidateId: string;
  status: ApplicationState;
  qualificationConfirmed: boolean;
  declineReason?: string;
  updatedAt: Date;
  statusHistory: {
    from: ApplicationState;
    to: ApplicationState;
    reason?: string;
    timestamp: Date;
  }[];
}

export class CandidateStateService {
  public createApplication(
    hiringRequestId: string,
    candidateId: string
  ): CandidateApplicationRecord {
    return {
      id: `app_${hiringRequestId}_${candidateId}`,
      hiringRequestId,
      candidateId,
      status: "MATCHED",
      qualificationConfirmed: false,
      updatedAt: new Date(),
      statusHistory: [],
    };
  }

  public transition(
    application: CandidateApplicationRecord,
    newStatus: ApplicationState,
    reason?: string
  ): CandidateApplicationRecord {
    const valid = canTransition(CANDIDATE_APPLICATION_TRANSITIONS, application.status, newStatus);
    if (!valid) {
      throw new Error(
        `Invalid application state transition from ${application.status} to ${newStatus}`
      );
    }

    return {
      ...application,
      status: newStatus,
      updatedAt: new Date(),
      statusHistory: [
        ...application.statusHistory,
        {
          from: application.status,
          to: newStatus,
          reason,
          timestamp: new Date(),
        },
      ],
    };
  }
}
