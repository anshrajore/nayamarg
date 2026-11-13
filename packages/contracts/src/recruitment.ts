import { z } from "zod";

export const HiringRequestInputSchema = z.object({
  title: z.string().min(2, "Title is required"),
  category: z.string().min(2, "Category is required"),
  vacancies: z.number().int().positive("Vacancies must be at least 1"),
  location: z.object({
    city: z.string().min(1),
    state: z.string().min(1),
    pincode: z.string().regex(/^\d{6}$/, "Must be valid 6-digit Indian PIN code"),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    search_radius_km: z.number().positive().default(25.0),
  }),
  salary: z.object({
    minimum: z.number().positive(),
    maximum: z.number().positive(),
    currency: z.literal("INR").default("INR"),
    period: z.enum(["monthly", "daily", "hourly"]).default("monthly"),
  }).refine((data) => data.maximum >= data.minimum, {
    message: "Maximum salary must be greater than or equal to minimum salary",
    path: ["maximum"],
  }),
  experience: z.object({
    minimum_years: z.number().min(0).default(0),
    maximum_years: z.number().min(0).default(20),
  }),
  languages: z.array(z.string()).default(["hi-IN", "mr-IN"]),
  requirements: z.array(z.string()).default([]),
  shift: z.enum(["day", "night", "rotational", "any"]).default("day"),
  job_type: z.enum(["full_time", "part_time", "contract"]).default("full_time"),
  target_coverage_factor: z.number().min(1.0).max(3.0).default(1.5),
});

export type HiringRequestInput = z.infer<typeof HiringRequestInputSchema>;

export const CandidateMatchResultSchema = z.object({
  worker_id: z.string().uuid(),
  hiring_request_id: z.string().uuid(),
  score: z.number().min(0).max(100),
  distance_km: z.number().min(0),
  matched_skills: z.array(z.string()),
  experience_years: z.number(),
  salary_compatibility: z.enum(["compatible", "negotiable", "mismatch"]),
  availability: z.enum(["immediate", "within_7_days", "notice_period", "unavailable"]),
  ranking_model: z.string().default("nayamarg-match-v1"),
  explanation: z.record(z.any()),
});

export type CandidateMatchResult = z.infer<typeof CandidateMatchResultSchema>;
