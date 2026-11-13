import { VacancySlotModel } from "../job-intelligence/job-intelligence.service";
import { calculateWeightedPipelineCapacity, PipelineCounts } from "@nayamarg/domain";

export interface VacancyCapacityStatus {
  totalVacancies: number;
  openSlots: number;
  reservedSlots: number;
  filledSlots: number;
  weightedPipelineCapacity: number;
  pipelineTarget: number;
  isPipelineSaturated: boolean; // weightedPipelineCapacity >= pipelineTarget
}

export class VacancySlotManagerService {
  private slots: Map<string, VacancySlotModel[]> = new Map(); // hiringRequestId -> slots

  public initializeSlots(hiringRequestId: string, initialSlots: VacancySlotModel[]): void {
    this.slots.set(hiringRequestId, [...initialSlots]);
  }

  public getSlots(hiringRequestId: string): VacancySlotModel[] {
    return this.slots.get(hiringRequestId) || [];
  }

  /**
   * Evaluates vacancy capacity using stage-weighted formula.
   */
  public evaluateCapacity(
    hiringRequestId: string,
    counts: PipelineCounts
  ): VacancyCapacityStatus {
    const slots = this.getSlots(hiringRequestId);
    const totalVacancies = slots.length;
    const openSlots = slots.filter((s) => s.status === "OPEN").length;
    const reservedSlots = slots.filter((s) => s.status === "RESERVED").length;
    const filledSlots = slots.filter((s) => s.status === "FILLED").length;

    const weightedPipelineCapacity = calculateWeightedPipelineCapacity(counts);
    const pipelineTarget = totalVacancies * 1.5;

    return {
      totalVacancies,
      openSlots,
      reservedSlots,
      filledSlots,
      weightedPipelineCapacity,
      pipelineTarget,
      isPipelineSaturated: weightedPipelineCapacity >= pipelineTarget,
    };
  }

  /**
   * Reserves an OPEN slot for an offered candidate with an expiration lease.
   */
  public reserveSlot(
    hiringRequestId: string,
    candidateId: string,
    leaseHours: number = 48
  ): VacancySlotModel | null {
    const slots = this.getSlots(hiringRequestId);
    const openSlot = slots.find((s) => s.status === "OPEN");

    if (!openSlot) {
      return null;
    }

    const expiresAt = new Date(Date.now() + leaseHours * 60 * 60 * 1000);
    openSlot.status = "RESERVED";
    openSlot.assignedCandidateId = candidateId;
    openSlot.reservationExpiresAt = expiresAt;

    return openSlot;
  }

  /**
   * Confirms a candidate joining, locking the slot permanently to FILLED.
   */
  public confirmJoining(hiringRequestId: string, candidateId: string): VacancySlotModel | null {
    const slots = this.getSlots(hiringRequestId);
    const reservedSlot = slots.find(
      (s) => s.assignedCandidateId === candidateId && s.status === "RESERVED"
    );

    if (!reservedSlot) {
      // Fallback: take first open slot if directly joined
      const openSlot = slots.find((s) => s.status === "OPEN");
      if (!openSlot) return null;
      openSlot.status = "FILLED";
      openSlot.assignedCandidateId = candidateId;
      openSlot.filledAt = new Date();
      return openSlot;
    }

    reservedSlot.status = "FILLED";
    reservedSlot.filledAt = new Date();
    reservedSlot.reservationExpiresAt = undefined;
    return reservedSlot;
  }

  /**
   * Releases an expired reservation back to OPEN.
   */
  public releaseExpiredReservations(hiringRequestId: string, currentTime: Date = new Date()): number {
    const slots = this.getSlots(hiringRequestId);
    let releasedCount = 0;

    for (const slot of slots) {
      if (
        slot.status === "RESERVED" &&
        slot.reservationExpiresAt &&
        slot.reservationExpiresAt < currentTime
      ) {
        slot.status = "OPEN";
        slot.assignedCandidateId = undefined;
        slot.reservationExpiresAt = undefined;
        releasedCount++;
      }
    }

    return releasedCount;
  }
}
