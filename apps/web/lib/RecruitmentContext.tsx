"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  JobRequirement,
  Candidate,
  RecruitmentRun,
  FailureException,
  INITIAL_JOBS,
  INITIAL_CANDIDATES,
  INITIAL_RUNS,
  INITIAL_EXCEPTIONS,
} from "./mockData";

interface RecruitmentContextType {
  jobs: JobRequirement[];
  candidates: Candidate[];
  runs: RecruitmentRun[];
  exceptions: FailureException[];
  addJob: (job: Omit<JobRequirement, "id" | "version" | "createdAt" | "status">) => string;
  updateJobStatus: (id: string, status: JobRequirement["status"]) => void;
  pauseRun: (runId: string) => void;
  resumeRun: (runId: string) => void;
  resolveException: (excId: string) => void;
  shortlistCandidate: (candId: string) => void;
  scheduleInterview: (candId: string) => void;
  markCandidateHired: (candId: string, slotNumber: number) => void;
}

const RecruitmentContext = createContext<RecruitmentContextType | undefined>(undefined);

export function RecruitmentProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<JobRequirement[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nayamarg_jobs");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_JOBS;
  });

  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nayamarg_candidates");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_CANDIDATES;
  });

  const [runs, setRuns] = useState<RecruitmentRun[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nayamarg_runs");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_RUNS;
  });

  const [exceptions, setExceptions] = useState<FailureException[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nayamarg_exceptions");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_EXCEPTIONS;
  });

  useEffect(() => {
    localStorage.setItem("nayamarg_jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("nayamarg_candidates", JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem("nayamarg_runs", JSON.stringify(runs));
  }, [runs]);

  useEffect(() => {
    localStorage.setItem("nayamarg_exceptions", JSON.stringify(exceptions));
  }, [exceptions]);

  const addJob = (input: Omit<JobRequirement, "id" | "version" | "createdAt" | "status">): string => {
    const newId = `job-${Date.now().toString().slice(-4)}`;
    const newRunId = `run-${Date.now().toString().slice(-4)}`;

    const newJob: JobRequirement = {
      ...input,
      id: newId,
      version: 1,
      createdAt: new Date().toISOString(),
      status: "CAMPAIGN_ACTIVE",
    };

    // Automatically initialize slots
    const slots = Array.from({ length: input.vacancies }, (_, idx) => ({
      slotNumber: idx + 1,
      status: "OPEN" as const,
    }));

    const newRun: RecruitmentRun = {
      id: newRunId,
      jobId: newId,
      jobTitle: input.title,
      employer: input.employerName,
      city: input.location.city,
      requiredVacancies: input.vacancies,
      filledVacancies: 0,
      targetCandidatePool: Math.ceil(input.vacancies * input.targetCoverageFactor),
      interestedCount: 0,
      interviewScheduledCount: 0,
      selectedCount: 0,
      joinedCount: 0,
      status: "RUNNING",
      activeCallCandidate: "Suhas R. Patil (Discovered via PostGIS radius)",
      activeCallDurationSec: 15,
      activeCallStatus: "DIALING - Sarvam Voice Agent",
      currentBatch: 1,
      slots,
      workflowEvents: [
        {
          timestamp: new Date().toLocaleTimeString(),
          event: "job.published",
          description: `Requirement posted for ${input.vacancies} ${input.title} in ${input.location.city}`,
        },
        {
          timestamp: new Date().toLocaleTimeString(),
          event: "recruitment.search.started",
          description: `PostGIS spatial radius search within ${input.location.radiusKm} km initiated`,
        },
        {
          timestamp: new Date().toLocaleTimeString(),
          event: "recruitment.candidates.discovered",
          description: `Ranked top candidates matching required skills: ${input.skills.join(", ")}`,
        },
      ],
    };

    setJobs((prev) => [newJob, ...prev]);
    setRuns((prev) => [newRun, ...prev]);
    return newId;
  };

  const updateJobStatus = (id: string, status: JobRequirement["status"]) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
  };

  const pauseRun = (runId: string) => {
    setRuns((prev) =>
      prev.map((r) =>
        r.id === runId
          ? {
              ...r,
              status: "PAUSED",
              workflowEvents: [
                ...r.workflowEvents,
                {
                  timestamp: new Date().toLocaleTimeString(),
                  event: "recruitment.run.paused",
                  description: "Recruitment campaign paused by operator",
                },
              ],
            }
          : r
      )
    );
  };

  const resumeRun = (runId: string) => {
    setRuns((prev) =>
      prev.map((r) =>
        r.id === runId
          ? {
              ...r,
              status: "RUNNING",
              workflowEvents: [
                ...r.workflowEvents,
                {
                  timestamp: new Date().toLocaleTimeString(),
                  event: "recruitment.run.resumed",
                  description: "Recruitment campaign resumed",
                },
              ],
            }
          : r
      )
    );
  };

  const resolveException = (excId: string) => {
    setExceptions((prev) => prev.map((e) => (e.id === excId ? { ...e, resolved: true } : e)));
  };

  const shortlistCandidate = (candId: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candId ? { ...c, status: "QUALIFIED" } : c))
    );
  };

  const scheduleInterview = (candId: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candId ? { ...c, status: "INTERVIEW_SCHEDULED" } : c))
    );
  };

  const markCandidateHired = (candId: string, slotNumber: number) => {
    const candidate = candidates.find((c) => c.id === candId);
    if (!candidate) return;

    setCandidates((prev) =>
      prev.map((c) => (c.id === candId ? { ...c, status: "JOINED" } : c))
    );

    setRuns((prev) =>
      prev.map((r) => {
        const updatedSlots = r.slots.map((s) =>
          s.slotNumber === slotNumber
            ? {
                ...s,
                status: "FILLED" as const,
                assignedCandidateId: candId,
                assignedCandidateName: candidate.name,
                confirmedJoinedAt: new Date().toISOString().split("T")[0],
              }
            : s
        );
        const newFilled = updatedSlots.filter((s) => s.status === "FILLED").length;
        return {
          ...r,
          filledVacancies: newFilled,
          joinedCount: newFilled,
          slots: updatedSlots,
          workflowEvents: [
            ...r.workflowEvents,
            {
              timestamp: new Date().toLocaleTimeString(),
              event: "recruitment.candidate.joined",
              description: `Slot #${slotNumber} confirmed joined: ${candidate.name}`,
            },
          ],
        };
      })
    );
  };

  return (
    <RecruitmentContext.Provider
      value={{
        jobs,
        candidates,
        runs,
        exceptions,
        addJob,
        updateJobStatus,
        pauseRun,
        resumeRun,
        resolveException,
        shortlistCandidate,
        scheduleInterview,
        markCandidateHired,
      }}
    >
      {children}
    </RecruitmentContext.Provider>
  );
}

export function useRecruitment() {
  const context = useContext(RecruitmentContext);
  if (!context) {
    throw new Error("useRecruitment must be used within a RecruitmentProvider");
  }
  return context;
}
