import { describe, it, expect, beforeEach } from "vitest";
import { AutonomousRecruitmentOrchestrator } from "../src/orchestrator";
import { CandidateProfile } from "../src/candidate-discovery/spatial-matcher.service";

describe("Autonomous Recruitment Orchestrator — End-to-End Simulation", () => {
  let orchestrator: AutonomousRecruitmentOrchestrator;

  // Nashik Machine Operator Job Parameters conforming to HiringRequestInputSchema
  const hiringInput = {
    title: "Machine Operator",
    category: "MANUFACTURING",
    vacancies: 10,
    location: {
      city: "Nashik",
      state: "Maharashtra",
      pincode: "422010",
      latitude: 19.9975,
      longitude: 73.7898,
      search_radius_km: 25.0,
    },
    salary: {
      minimum: 15000,
      maximum: 18000,
      currency: "INR" as const,
      period: "monthly" as const,
    },
    experience: {
      minimum_years: 1,
      maximum_years: 5,
    },
    languages: ["hi-IN", "mr-IN"],
    requirements: ["CNC Milling", "Lathe Machine", "Blueprint Reading"],
    shift: "day" as const,
    job_type: "full_time" as const,
    target_coverage_factor: 1.5,
  };

  // Realistic candidates in and around Nashik + 1 out-of-range candidate
  const candidatePool: CandidateProfile[] = [
    {
      id: "cand_ramesh_01",
      name: "Ramesh Pawar",
      phoneNumber: "+919822001122",
      preferredLanguage: "mr",
      coordinates: [73.765, 19.965], // ~4.8 km from Ambad MIDC
      tradeCategory: "MANUFACTURING",
      skills: ["CNC Milling", "Lathe Machine", "Blueprint Reading", "Quality Check"],
      experienceMonths: 42,
      currentSalary: 16000,
      expectedSalary: 17500,
      shiftPreference: "day",
      availableFromDays: 3,
      verified: true,
    },
    {
      id: "cand_suresh_02",
      name: "Suresh Shinde",
      phoneNumber: "+919822003344",
      preferredLanguage: "hi",
      coordinates: [73.82, 19.99], // ~3.5 km away
      tradeCategory: "MANUFACTURING",
      skills: ["Lathe Machine", "Tool Setting"],
      experienceMonths: 18,
      currentSalary: 22000,
      expectedSalary: 25000, // Salary mismatch!
      shiftPreference: "day",
      availableFromDays: 5,
      verified: true,
    },
    {
      id: "cand_ganesh_03",
      name: "Ganesh Jadhav",
      phoneNumber: "+919822005566",
      preferredLanguage: "mr",
      coordinates: [73.74, 20.02], // ~6.1 km away in Satpur
      tradeCategory: "MANUFACTURING",
      skills: ["CNC Milling", "Drill Press"],
      experienceMonths: 30,
      currentSalary: 15000,
      expectedSalary: 16500,
      shiftPreference: "day",
      availableFromDays: 7,
      verified: true,
    },
    {
      id: "cand_vijay_04",
      name: "Vijay Patil",
      phoneNumber: "+919822007788",
      preferredLanguage: "mr",
      coordinates: [73.85, 19.92], // ~10 km away (well within 25km radius)
      tradeCategory: "MANUFACTURING",
      skills: ["CNC Milling", "Lathe Machine"],
      experienceMonths: 24,
      currentSalary: 15500,
      expectedSalary: 17000,
      shiftPreference: "day",
      availableFromDays: 4,
      verified: false,
    },
    {
      id: "cand_out_of_range_05",
      name: "Pooja Deshmukh",
      phoneNumber: "+919822009900",
      preferredLanguage: "mr",
      coordinates: [72.8777, 19.076], // Mumbai (~160 km away, out of 25km radius!)
      tradeCategory: "MANUFACTURING",
      skills: ["CNC Milling"],
      experienceMonths: 36,
      currentSalary: 16000,
      expectedSalary: 17000,
      shiftPreference: "day",
      availableFromDays: 5,
      verified: true,
    },
  ];

  beforeEach(() => {
    orchestrator = new AutonomousRecruitmentOrchestrator();
  });

  it("Stage 1: Ingests hiring request, validates requirements, and initializes 10 discrete vacancy slots", () => {
    const state = orchestrator.publishJobAndInitialize("req_nashik_machine_op_10", hiringInput);

    expect(state.jobSnapshot.title).toBe("Machine Operator");
    expect(state.jobSnapshot.vacanciesCount).toBe(10);
    expect(state.slots.length).toBe(10);
    expect(state.slots[0].status).toBe("OPEN");
    expect(state.slots[9].status).toBe("OPEN");
    expect(state.campaign.targetVacancies).toBe(10);
    expect(state.campaign.weightedPipelineTarget).toBe(15); // 10 * 1.5
    expect(state.capacityStatus.openSlots).toBe(10);
    expect(state.capacityStatus.isPipelineSaturated).toBe(false);
  });

  it("Stage 2: Discovers candidates within 25km radius, excludes distant workers, and ranks by nayamarg-match-v1", () => {
    orchestrator.publishJobAndInitialize("req_nashik_machine_op_10", hiringInput);
    orchestrator.registerCandidatePool(candidatePool);

    // Run discovery at 11:00 AM IST (well within TRAI 09:00 - 19:00 IST window)
    const callingTime = new Date("2026-11-14T11:00:00+05:30");
    const ranked = orchestrator.discoverAndRank(callingTime);

    // Total candidates in pool: 5. Discovered within 25km: 4. Mumbai candidate excluded.
    expect(ranked.length).toBe(4);
    expect(ranked.map((r) => r.candidate.id)).not.toContain("cand_out_of_range_05");

    // Highest ranked candidate should be Ramesh Pawar (high skills, high experience, close distance)
    expect(ranked[0].candidate.name).toBe("Ramesh Pawar");
    expect(ranked[0].rank).toBe(1);
    expect(ranked[0].totalScore).toBeGreaterThan(80);
    expect(ranked[0].distanceKm).toBeLessThan(10);
  });

  it("Stage 3: Executes sequential outreach (c=1), simulates 4 voice calls, and updates vacancy accounting", async () => {
    orchestrator.publishJobAndInitialize("req_nashik_machine_op_10", hiringInput);
    orchestrator.registerCandidatePool(candidatePool);

    const callingTime = new Date("2026-11-14T11:00:00+05:30");
    orchestrator.discoverAndRank(callingTime);

    // --- CALL 1: Ramesh Pawar (Top ranked) ---
    const step1 = await orchestrator.stepOutreach("worker-node-1", callingTime);
    expect(step1).not.toBeNull();
    expect(step1!.call.candidate.name).toBe("Ramesh Pawar");
    expect(step1!.call.status).toBe("DIALING");

    // Concurrency check: immediate second dial attempt must return null because c=1 lease is active!
    const concurrentAttempt = await orchestrator.stepOutreach("worker-node-2", callingTime);
    expect(concurrentAttempt).toBeNull();

    // Webhook for Call 1: Ramesh confirms interest & availability
    orchestrator.handleCallWebhook(step1!.call.queueId, step1!.call.fencingToken!, {
      callStatus: "COMPLETED",
      durationSeconds: 125,
      confidence: 0.96,
      transcript: "Haan bilkul, main Ambad MIDC mein 3 din mein join kar sakta hoon. 17500 salary theek hai.",
      structuredResult: {
        isInterested: true,
        availableFromDays: 3,
        expectedSalaryMonthly: 17500,
        preferredShift: "day",
        notes: "Experienced CNC machinist, ready to join in 3 days",
        qualificationConfirmed: true,
      },
    });

    const stateAfterCall1 = orchestrator.getState()!;
    expect(stateAfterCall1.campaign.totalInterested).toBe(1);
    expect(stateAfterCall1.qualifiedCandidates.length).toBe(1);
    expect(stateAfterCall1.qualifiedCandidates[0].name).toBe("Ramesh Pawar");
    // Weighted capacity should reflect 1 interested candidate (1 * 0.35 = 0.35)
    expect(stateAfterCall1.capacityStatus.weightedPipelineCapacity).toBeCloseTo(0.35, 2);

    // --- CALL 2: Vijay Patil (Rank 2) ---
    const step2 = await orchestrator.stepOutreach("worker-node-1", callingTime);
    expect(step2).not.toBeNull();
    expect(step2!.call.candidate.name).toBe("Vijay Patil");

    // Webhook for Call 2: Unanswered / No answer
    orchestrator.handleCallWebhook(step2!.call.queueId, step2!.call.fencingToken!, {
      callStatus: "NO_ANSWER",
      durationSeconds: 30,
    });

    // --- CALL 3: Ganesh Jadhav (Rank 3) ---
    const step3 = await orchestrator.stepOutreach("worker-node-1", callingTime);
    expect(step3).not.toBeNull();
    expect(step3!.call.candidate.name).toBe("Ganesh Jadhav");

    // Webhook for Call 3: Ganesh is working on machine, asks to call back at 4:00 PM
    const callbackTargetTime = new Date("2026-11-14T16:00:00+05:30");
    orchestrator.handleCallWebhook(step3!.call.queueId, step3!.call.fencingToken!, {
      callStatus: "COMPLETED",
      durationSeconds: 40,
      confidence: 0.95,
      transcript: "Abhi main factory floor pe machine chala raha hoon, mujhe sham ko 4 baje call karo.",
      structuredResult: {
        isInterested: true,
        callbackRequestedAt: callbackTargetTime.toISOString(),
        notes: "Requested callback at 4 PM",
        qualificationConfirmed: false,
      },
    });

    const stateAfterCall3 = orchestrator.getState()!;
    expect(stateAfterCall3.campaign.totalCallbacksScheduled).toBe(1);

    // --- CALL 4: Suresh Shinde (Rank 4 due to salary expectation mismatch) ---
    const step4 = await orchestrator.stepOutreach("worker-node-1", callingTime);
    expect(step4).not.toBeNull();
    expect(step4!.call.candidate.name).toBe("Suresh Shinde");

    // Webhook for Call 4: Suresh declines due to salary expectation (wants ₹25,000)
    orchestrator.handleCallWebhook(step4!.call.queueId, step4!.call.fencingToken!, {
      callStatus: "COMPLETED",
      durationSeconds: 65,
      confidence: 0.92,
      transcript: "Mujhe kam se kam 25000 chahiye. 18000 bohot kam hai.",
      structuredResult: {
        isInterested: false,
        expectedSalaryMonthly: 25000,
        notes: "Salary mismatch: expects 25,000",
        qualificationConfirmed: false,
      },
    });

    const stateAfterCall4 = orchestrator.getState()!;
    expect(stateAfterCall4.campaign.totalDeclined).toBe(1);

    // Verification of follow-up retry registration for Vijay Patil (unanswered call)
    const dueFollowUps = orchestrator.followUp.getDueFollowUps(
      stateAfterCall3.campaign.id,
      new Date("2026-11-14T17:00:00+05:30")
    );
    expect(dueFollowUps.length).toBeGreaterThanOrEqual(1);
  });

  it("Stage 4: Extends offer with 48hr reservation lease and confirms verified joining to lock slot as FILLED", () => {
    orchestrator.publishJobAndInitialize("req_nashik_machine_op_10", hiringInput);
    orchestrator.registerCandidatePool(candidatePool);

    // 1. Extend offer to Ramesh Pawar
    const reservedSlot = orchestrator.reserveSlotForOffer("cand_ramesh_01");
    expect(reservedSlot).not.toBeNull();
    expect(reservedSlot!.slotNumber).toBe(1);
    expect(reservedSlot!.status).toBe("RESERVED");
    expect(reservedSlot!.assignedCandidateId).toBe("cand_ramesh_01");
    expect(reservedSlot!.reservationExpiresAt).toBeDefined();

    // Capacity verification
    let state = orchestrator.getState()!;
    expect(state.capacityStatus.reservedSlots).toBe(1);
    expect(state.capacityStatus.openSlots).toBe(9);

    // 2. Candidate completes onboarding and joining is verified
    const filledSlot = orchestrator.confirmCandidateJoining("cand_ramesh_01");
    expect(filledSlot).not.toBeNull();
    expect(filledSlot!.status).toBe("FILLED");
    expect(filledSlot!.filledAt).toBeDefined();

    state = orchestrator.getState()!;
    expect(state.capacityStatus.filledSlots).toBe(1);
    expect(state.capacityStatus.reservedSlots).toBe(0);
    expect(state.capacityStatus.openSlots).toBe(9);
  });

  it("Stage 5: Generates comprehensive employer progress report", async () => {
    orchestrator.publishJobAndInitialize("req_nashik_machine_op_10", hiringInput);
    orchestrator.registerCandidatePool(candidatePool);

    const callingTime = new Date("2026-11-14T11:00:00+05:30");
    orchestrator.discoverAndRank(callingTime);

    // Execute first call
    const step = await orchestrator.stepOutreach("worker-node-1", callingTime);
    orchestrator.handleCallWebhook(step!.call.queueId, step!.call.fencingToken!, {
      callStatus: "COMPLETED",
      durationSeconds: 120,
      structuredResult: {
        isInterested: true,
        availableFromDays: 2,
        expectedSalaryMonthly: 17000,
        notes: "Ready to join",
      },
    });

    const report = orchestrator.generateEmployerReport();

    expect(report.jobTitle).toBe("Machine Operator");
    expect(report.location).toBe("Nashik, Maharashtra");
    expect(report.targetVacancies).toBe(10);
    expect(report.pipelineFunnel.totalDiscovered).toBe(4);
    expect(report.pipelineFunnel.totalContacted).toBe(1);
    expect(report.pipelineFunnel.interested).toBe(1);
    expect(report.qualifiedCandidates.length).toBe(1);
    expect(report.qualifiedCandidates[0].name).toBe("Ramesh Pawar");
    expect(report.qualifiedCandidates[0].expectedSalary).toBe(17000);
  });
});
