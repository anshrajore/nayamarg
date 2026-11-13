import {
  AutonomousRecruitmentOrchestrator,
  CandidateProfile,
} from "@nayamarg/recruitment-orchestrator";

// Sample verified industrial candidates for live demonstrations & tests in Maharashtra
export const INITIAL_CANDIDATE_POOL: CandidateProfile[] = [
  {
    id: "cand_ramesh_01",
    name: "Ramesh Pawar",
    phoneNumber: "+919822001122",
    preferredLanguage: "mr",
    coordinates: [73.765, 19.965], // ~4.8 km from Ambad MIDC, Nashik
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
    coordinates: [73.82, 19.99], // ~3.5 km away in Nashik
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
    coordinates: [73.85, 19.92], // ~10 km away in Nashik
    tradeCategory: "MANUFACTURING",
    skills: ["CNC Milling", "Lathe Machine"],
    experienceMonths: 24,
    currentSalary: 15500,
    expectedSalary: 17000,
    shiftPreference: "day",
    availableFromDays: 4,
    verified: true,
  },
  {
    id: "cand_sunil_05",
    name: "Sunil Kadam",
    phoneNumber: "+919822009911",
    preferredLanguage: "mr",
    coordinates: [73.79, 19.98], // ~2.2 km away
    tradeCategory: "MANUFACTURING",
    skills: ["CNC Milling", "Quality Check"],
    experienceMonths: 36,
    currentSalary: 16500,
    expectedSalary: 18000,
    shiftPreference: "day",
    availableFromDays: 2,
    verified: true,
  },
  {
    id: "cand_out_of_range_06",
    name: "Pooja Deshmukh",
    phoneNumber: "+919822009900",
    preferredLanguage: "mr",
    coordinates: [72.8777, 19.076], // Mumbai (~160 km away, out of 25km radius)
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

class OrchestratorManager {
  private orchestrator: AutonomousRecruitmentOrchestrator;
  private initialized: boolean = false;

  constructor() {
    this.orchestrator = new AutonomousRecruitmentOrchestrator();
  }

  public getOrchestrator(): AutonomousRecruitmentOrchestrator {
    if (!this.initialized) {
      this.orchestrator.registerCandidatePool(INITIAL_CANDIDATE_POOL);
      this.initialized = true;
    }
    return this.orchestrator;
  }
}

// Global singleton across serverless invocations in dev/prod
const globalForOrchestrator = global as unknown as {
  nayamargOrchestratorManager?: OrchestratorManager;
};

export const orchestratorManager =
  globalForOrchestrator.nayamargOrchestratorManager || new OrchestratorManager();

if (process.env.NODE_ENV !== "production") {
  globalForOrchestrator.nayamargOrchestratorManager = orchestratorManager;
}
