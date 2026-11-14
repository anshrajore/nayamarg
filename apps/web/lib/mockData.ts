export interface JobRequirement {
  id: string;
  version: number;
  title: string;
  category: string;
  vacancies: number;
  location: {
    city: string;
    state: string;
    pincode: string;
    latitude: number;
    longitude: number;
    radiusKm: number;
  };
  salary: {
    min: number;
    max: number;
    period: "monthly" | "daily";
  };
  experience: {
    minYears: number;
    maxYears: number;
  };
  languages: string[];
  skills: string[];
  shift: "day" | "night" | "rotational" | "any";
  employmentType: "full_time" | "contract";
  joiningWindow: "immediate" | "within_7_days" | "within_15_days";
  targetCoverageFactor: number;
  status: "DRAFT" | "SUBMITTED" | "VALIDATING" | "MATCHING" | "CAMPAIGN_ACTIVE" | "PIPELINE_READY" | "INTERVIEWING" | "COMPLETED" | "PAUSED";
  createdAt: string;
  employerName: string;
}

export interface Candidate {
  id: string;
  name: string;
  phone: string;
  city: string;
  distanceKm: number;
  skills: string[];
  experienceYears: number;
  matchScore: number;
  salaryExpectation: number;
  preferredLanguage: string;
  availability: "AVAILABLE" | "EMPLOYED" | "NOTICE_PERIOD";
  interviewInterest: boolean;
  status: "MATCHED" | "QUEUED" | "CALLING" | "INTERESTED" | "QUALIFIED" | "INTERVIEW_SCHEDULED" | "OFFER_MADE" | "JOINED" | "DECLINED" | "UNREACHABLE";
  callTranscript?: string;
  availableFrom?: string;
}

export interface VacancySlot {
  slotNumber: number;
  status: "OPEN" | "RESERVED" | "FILLED";
  assignedCandidateId?: string;
  assignedCandidateName?: string;
  reservationExpiresAt?: string;
  confirmedJoinedAt?: string;
}

export interface RecruitmentRun {
  id: string;
  jobId: string;
  jobTitle: string;
  employer: string;
  city: string;
  requiredVacancies: number;
  filledVacancies: number;
  targetCandidatePool: number;
  interestedCount: number;
  interviewScheduledCount: number;
  selectedCount: number;
  joinedCount: number;
  status: "RUNNING" | "PIPELINE_READY" | "INTERVIEWING" | "PAUSED" | "FILLED";
  activeCallCandidate?: string;
  activeCallDurationSec?: number;
  activeCallStatus?: string;
  currentBatch: number;
  slots: VacancySlot[];
  workflowEvents: {
    timestamp: string;
    event: string;
    description: string;
  }[];
}

export interface FailureException {
  id: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  type: string;
  jobTitle: string;
  candidateName?: string;
  timestamp: string;
  explanation: string;
  remediationAction: string;
  resolved: boolean;
}

export const INITIAL_JOBS: JobRequirement[] = [
  {
    id: "job-1001",
    version: 1,
    title: "Machine Operator (CNC / Lathe)",
    category: "Manufacturing",
    vacancies: 10,
    location: {
      city: "Nashik",
      state: "Maharashtra",
      pincode: "422007",
      latitude: 19.9975,
      longitude: 73.7898,
      radiusKm: 25,
    },
    salary: {
      min: 16000,
      max: 18500,
      period: "monthly",
    },
    experience: {
      minYears: 1,
      maxYears: 5,
    },
    languages: ["Hindi", "Marathi"],
    skills: ["Machine Operation", "CNC Turning", "Quality Check", "Tool Setup"],
    shift: "day",
    employmentType: "full_time",
    joiningWindow: "within_7_days",
    targetCoverageFactor: 1.5,
    status: "CAMPAIGN_ACTIVE",
    createdAt: "2026-11-13T09:30:00Z",
    employerName: "Precision Forge & Tools Ltd.",
  },
  {
    id: "job-1002",
    version: 1,
    title: "Industrial Maintenance Electrician",
    category: "Electrical & Plant",
    vacancies: 5,
    location: {
      city: "Pune",
      state: "Maharashtra",
      pincode: "411018",
      latitude: 18.5204,
      longitude: 73.8567,
      radiusKm: 20,
    },
    salary: {
      min: 19000,
      max: 23000,
      period: "monthly",
    },
    experience: {
      minYears: 2,
      maxYears: 6,
    },
    languages: ["Hindi", "Marathi"],
    skills: ["PLC Troubleshooting", "Panel Wiring", "Motor Maintenance"],
    shift: "rotational",
    employmentType: "full_time",
    joiningWindow: "within_7_days",
    targetCoverageFactor: 1.5,
    status: "PIPELINE_READY",
    createdAt: "2026-11-12T14:15:00Z",
    employerName: "Mahindra Heavy Engineering",
  },
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: "cand-101",
    name: "Ramesh Tukaram Shinde",
    phone: "+91 98231 •••••",
    city: "Nashik (Satpur MIDC)",
    distanceKm: 4.2,
    skills: ["Machine Operation", "CNC Turning", "Tool Setup"],
    experienceYears: 3.5,
    matchScore: 94,
    salaryExpectation: 17500,
    preferredLanguage: "Marathi",
    availability: "AVAILABLE",
    interviewInterest: true,
    status: "INTERESTED",
    availableFrom: "2026-11-18",
    callTranscript: "होय, मी नाशिकमध्ये सीएनसी ऑपरेटर म्हणून ३ वर्षे काम केले आहे. १८,००० रुपये वेतन आणि डे शिफ्ट मला मान्य आहे. मी मुलाखतीसाठी तयार आहे.",
  },
  {
    id: "cand-102",
    name: "Amit Kumar Maurya",
    phone: "+91 97114 •••••",
    city: "Nashik (Ambad)",
    distanceKm: 6.8,
    skills: ["Machine Operation", "Quality Check"],
    experienceYears: 2.0,
    matchScore: 89,
    salaryExpectation: 17000,
    preferredLanguage: "Hindi",
    availability: "AVAILABLE",
    interviewInterest: true,
    status: "INTERVIEW_SCHEDULED",
    availableFrom: "2026-11-16",
    callTranscript: "हाँ जी, मैं अंबड में रहता हूँ। दिन की शिफ्ट और १६,५०० रुपये वेतन बिल्कुल सही है। कल दोपहर २ बजे इंटरव्यू के लिए आ सकता हूँ।",
  },
  {
    id: "cand-103",
    name: "Sandeep Vilas Patil",
    phone: "+91 94220 •••••",
    city: "Nashik (Deolali)",
    distanceKm: 9.1,
    skills: ["Machine Operation", "CNC Turning", "Safety Protocol"],
    experienceYears: 4.2,
    matchScore: 96,
    salaryExpectation: 18000,
    preferredLanguage: "Marathi",
    availability: "AVAILABLE",
    interviewInterest: true,
    status: "JOINED",
    availableFrom: "2026-11-14",
    callTranscript: "मी लगेच जॉईन करू शकतो. ऑफर लेटर मिळाले आहे आणि मी सोमवारी कामावर रुजू होत आहे.",
  },
  {
    id: "cand-104",
    name: "Vikas Balasaheb Pawar",
    phone: "+91 98902 •••••",
    city: "Nashik (Ozar)",
    distanceKm: 14.5,
    skills: ["Machine Operation", "Lathe Turning"],
    experienceYears: 1.8,
    matchScore: 82,
    salaryExpectation: 16500,
    preferredLanguage: "Marathi",
    availability: "AVAILABLE",
    interviewInterest: false,
    status: "CALLING",
    availableFrom: "2026-11-20",
    callTranscript: "Live Call Active with Sarvam AI Voice Agent (hi-IN / mr-IN)...",
  },
  {
    id: "cand-105",
    name: "Ganesh Vishnu Jadhav",
    phone: "+91 96041 •••••",
    city: "Nashik (Sinnar)",
    distanceKm: 18.2,
    skills: ["CNC Turning", "Grinding"],
    experienceYears: 3.0,
    matchScore: 78,
    salaryExpectation: 21000,
    preferredLanguage: "Marathi",
    availability: "EMPLOYED",
    interviewInterest: false,
    status: "DECLINED",
    callTranscript: "मी सध्या दुसऱ्या कंपनीत २०,००० मिळवतो. हे वेतन माझ्यासाठी कमी आहे, धन्यवाद.",
  },
  {
    id: "cand-106",
    name: "Sunil Dattatray Shirsath",
    phone: "+91 98813 •••••",
    city: "Nashik (Satpur)",
    distanceKm: 5.1,
    skills: ["Machine Operation", "Tool Setup"],
    experienceYears: 2.8,
    matchScore: 91,
    salaryExpectation: 17000,
    preferredLanguage: "Hindi",
    availability: "AVAILABLE",
    interviewInterest: true,
    status: "QUEUED",
  },
];

export const INITIAL_RUNS: RecruitmentRun[] = [
  {
    id: "run-9001",
    jobId: "job-1001",
    jobTitle: "Machine Operator (CNC / Lathe)",
    employer: "Precision Forge & Tools Ltd.",
    city: "Nashik",
    requiredVacancies: 10,
    filledVacancies: 6,
    targetCandidatePool: 15,
    interestedCount: 15,
    interviewScheduledCount: 8,
    selectedCount: 8,
    joinedCount: 6,
    status: "RUNNING",
    activeCallCandidate: "Vikas Balasaheb Pawar",
    activeCallDurationSec: 42,
    activeCallStatus: "CONNECTED - Qualifying Experience & Commute",
    currentBatch: 2,
    slots: [
      { slotNumber: 1, status: "FILLED", assignedCandidateId: "cand-103", assignedCandidateName: "Sandeep Vilas Patil", confirmedJoinedAt: "2026-11-13" },
      { slotNumber: 2, status: "FILLED", assignedCandidateId: "cand-107", assignedCandidateName: "Pravin K. Kadam", confirmedJoinedAt: "2026-11-13" },
      { slotNumber: 3, status: "FILLED", assignedCandidateId: "cand-108", assignedCandidateName: "Sunil M. Gaikwad", confirmedJoinedAt: "2026-11-12" },
      { slotNumber: 4, status: "FILLED", assignedCandidateId: "cand-109", assignedCandidateName: "Anil R. Bhalerao", confirmedJoinedAt: "2026-11-12" },
      { slotNumber: 5, status: "FILLED", assignedCandidateId: "cand-110", assignedCandidateName: "Kishor D. Wagh", confirmedJoinedAt: "2026-11-11" },
      { slotNumber: 6, status: "FILLED", assignedCandidateId: "cand-111", assignedCandidateName: "Dnyaneshwar More", confirmedJoinedAt: "2026-11-11" },
      { slotNumber: 7, status: "RESERVED", assignedCandidateId: "cand-102", assignedCandidateName: "Amit Kumar Maurya", reservationExpiresAt: "2026-11-16 18:00" },
      { slotNumber: 8, status: "RESERVED", assignedCandidateId: "cand-101", assignedCandidateName: "Ramesh Tukaram Shinde", reservationExpiresAt: "2026-11-17 18:00" },
      { slotNumber: 9, status: "OPEN" },
      { slotNumber: 10, status: "OPEN" },
    ],
    workflowEvents: [
      { timestamp: "10:00:00", event: "job.published", description: "Requirement validated: 10 vacancies in Nashik, ₹16k-18.5k, radius 25km" },
      { timestamp: "10:00:05", event: "recruitment.search.started", description: "PostGIS radius query executed on geography(Point, 4326)" },
      { timestamp: "10:00:12", event: "recruitment.candidates.discovered", description: "Discovered 48 eligible workers; ranked by skills (30%), exp (20%), loc (20%)" },
      { timestamp: "10:01:00", event: "recruitment.call.dispatched", description: "Batch 1 dispatched via Sarvam Voice Agent (Sequential concurrency = 1)" },
      { timestamp: "10:14:30", event: "recruitment.candidate.joined", description: "Slot 6 confirmed joined: Dnyaneshwar More" },
      { timestamp: "10:25:00", event: "recruitment.call.connected", description: "Outbound call to Vikas Balasaheb Pawar in progress" },
    ],
  },
];

export const INITIAL_EXCEPTIONS: FailureException[] = [
  {
    id: "exc-501",
    severity: "HIGH",
    type: "Telephony Provider Timeout",
    jobTitle: "Machine Operator",
    candidateName: "Mahesh Jadhav",
    timestamp: "10:22:15",
    explanation: "Sarvam returned HTTP 504 on initial dial dispatch. Status marked UNKNOWN in outbox.",
    remediationAction: "Reconcile with Sarvam Attempt Analytics API before executing safe single retry.",
    resolved: false,
  },
  {
    id: "exc-502",
    severity: "MEDIUM",
    type: "Candidate Opt-Out Recorded",
    jobTitle: "Machine Operator",
    candidateName: "Nitin Sonawane",
    timestamp: "10:18:40",
    explanation: "Candidate stated 'मला कॉल करू नका' (Do not call). Explicit opt-out detected by NLP parser.",
    remediationAction: "Suppression record added to communications.contact_suppressions. Outreach halted.",
    resolved: true,
  },
  {
    id: "exc-503",
    severity: "LOW",
    type: "Search Radius Saturation",
    jobTitle: "Maintenance Electrician",
    timestamp: "09:45:00",
    explanation: "Initial 20 km search in Pune returned only 3 candidates matching 3+ years PLC experience.",
    remediationAction: "Employer review required: authorize geographic radius expansion from 20 km to 35 km.",
    resolved: false,
  },
];
