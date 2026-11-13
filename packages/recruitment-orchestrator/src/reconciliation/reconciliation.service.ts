import { SequentialDialerService } from "../call-scheduler/sequential-dialer.service";
import { VacancySlotManagerService } from "../vacancy-manager/vacancy-slot-manager.service";

export interface ReconciliationReport {
  timestamp: Date;
  staleLeasesCleared: number;
  expiredReservationsReset: number;
}

export class ReconciliationService {
  constructor(
    private dialer: SequentialDialerService,
    private slotManager: VacancySlotManagerService
  ) {}

  public reconcileCampaign(
    campaignId: string,
    hiringRequestId: string,
    currentTime: Date = new Date()
  ): ReconciliationReport {
    let staleLeasesCleared = 0;

    // 1. Check dialer lease expiry
    const activeLease = this.dialer.getActiveLease(campaignId);
    if (activeLease && activeLease.leaseExpiresAt <= currentTime) {
      this.dialer.completeCall(
        campaignId,
        activeLease.activeCallAttemptId,
        activeLease.fencingToken,
        "FAILED"
      );
      staleLeasesCleared++;
    }

    // 2. Check slot reservation expiry
    const expiredReservationsReset = this.slotManager.releaseExpiredReservations(
      hiringRequestId,
      currentTime
    );

    return {
      timestamp: currentTime,
      staleLeasesCleared,
      expiredReservationsReset,
    };
  }
}
