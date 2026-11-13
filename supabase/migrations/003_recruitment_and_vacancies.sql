-- 003_recruitment_and_vacancies.sql
-- Recruitment Domain, Vacancy Slot Management & PostGIS Radius Engine

CREATE TABLE IF NOT EXISTS recruitment.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    normalized_name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recruitment.worker_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    bio TEXT,
    experience_years NUMERIC(4, 1) NOT NULL DEFAULT 0,
    current_city TEXT NOT NULL,
    current_state TEXT NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    location GEOGRAPHY(Point, 4326) NOT NULL,
    location_accuracy_meters NUMERIC(6, 1),
    availability_status TEXT NOT NULL DEFAULT 'AVAILABLE' CHECK (availability_status IN ('AVAILABLE', 'EMPLOYED', 'UNAVAILABLE', 'NOTICE_PERIOD')),
    available_from DATE DEFAULT CURRENT_DATE,
    expected_salary_min INTEGER,
    preferred_shift TEXT DEFAULT 'ANY' CHECK (preferred_shift IN ('DAY', 'NIGHT', 'ROTATIONAL', 'ANY')),
    preferred_languages TEXT[] DEFAULT ARRAY['hi-IN'],
    is_profile_verified BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_worker_location ON recruitment.worker_profiles USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_worker_availability ON recruitment.worker_profiles(availability_status);

CREATE TABLE IF NOT EXISTS recruitment.worker_skills (
    worker_id UUID NOT NULL REFERENCES recruitment.worker_profiles(user_id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES recruitment.skills(id) ON DELETE CASCADE,
    proficiency TEXT NOT NULL DEFAULT 'INTERMEDIATE' CHECK (proficiency IN ('BEGINNER', 'INTERMEDIATE', 'EXPERT')),
    PRIMARY KEY (worker_id, skill_id)
);

CREATE TABLE IF NOT EXISTS recruitment.hiring_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    vacancies_requested INTEGER NOT NULL CHECK (vacancies_requested > 0),
    status TEXT NOT NULL DEFAULT 'SUBMITTED' CHECK (status IN (
        'DRAFT', 'SUBMITTED', 'VALIDATING', 'NEEDS_INFORMATION', 'APPROVED',
        'MATCHING', 'CAMPAIGN_ACTIVE', 'SHORTLIST_READY', 'INTERVIEWING',
        'OFFER_PENDING', 'HIRED', 'COMPLETED', 'PAUSED', 'CANCELLED', 'REJECTED'
    )),
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    location GEOGRAPHY(Point, 4326) NOT NULL,
    search_radius_km NUMERIC(5, 1) NOT NULL DEFAULT 25.0,
    salary_min INTEGER NOT NULL,
    salary_max INTEGER NOT NULL,
    salary_currency VARCHAR(3) DEFAULT 'INR',
    salary_period TEXT DEFAULT 'monthly',
    min_experience_years NUMERIC(4, 1) DEFAULT 0,
    max_experience_years NUMERIC(4, 1) DEFAULT 20,
    preferred_shift TEXT DEFAULT 'DAY',
    job_type TEXT DEFAULT 'full_time',
    languages TEXT[] DEFAULT ARRAY['hi-IN'],
    target_coverage_factor NUMERIC(3, 2) NOT NULL DEFAULT 1.50,
    version INTEGER NOT NULL DEFAULT 1,
    approved_by UUID REFERENCES public.staff_profiles(user_id),
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hiring_org ON recruitment.hiring_requests(organization_id);
CREATE INDEX IF NOT EXISTS idx_hiring_status ON recruitment.hiring_requests(status);
CREATE INDEX IF NOT EXISTS idx_hiring_location ON recruitment.hiring_requests USING GIST(location);

-- Individual Vacancy Slots Accounting (Section 10 of Spec)
CREATE TABLE IF NOT EXISTS recruitment.vacancy_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hiring_request_id UUID NOT NULL REFERENCES recruitment.hiring_requests(id) ON DELETE CASCADE,
    slot_number INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'RESERVED', 'OFFER_PENDING', 'FILLED', 'CANCELLED')),
    filled_by_worker_id UUID REFERENCES recruitment.worker_profiles(user_id),
    joined_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_request_slot UNIQUE (hiring_request_id, slot_number)
);

CREATE TABLE IF NOT EXISTS recruitment.slot_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_id UUID NOT NULL REFERENCES recruitment.vacancy_slots(id) ON DELETE CASCADE,
    worker_id UUID NOT NULL REFERENCES recruitment.worker_profiles(user_id) ON DELETE CASCADE,
    reserved_by UUID NOT NULL REFERENCES public.profiles(id),
    reserved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    reason TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    released_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS recruitment.candidate_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hiring_request_id UUID NOT NULL REFERENCES recruitment.hiring_requests(id) ON DELETE CASCADE,
    worker_id UUID NOT NULL REFERENCES recruitment.worker_profiles(user_id) ON DELETE CASCADE,
    score NUMERIC(5, 2) NOT NULL,
    distance_km NUMERIC(6, 2) NOT NULL,
    model_version TEXT NOT NULL DEFAULT 'nayamarg-match-v1',
    is_eligible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_job_worker_model UNIQUE (hiring_request_id, worker_id, model_version)
);

CREATE TABLE IF NOT EXISTS recruitment.match_factors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID NOT NULL REFERENCES recruitment.candidate_matches(id) ON DELETE CASCADE,
    factor_name TEXT NOT NULL,
    weight NUMERIC(3, 2) NOT NULL,
    score NUMERIC(5, 2) NOT NULL,
    evidence JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS recruitment.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hiring_request_id UUID NOT NULL REFERENCES recruitment.hiring_requests(id) ON DELETE CASCADE,
    worker_id UUID NOT NULL REFERENCES recruitment.worker_profiles(user_id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'MATCHED' CHECK (status IN (
        'MATCHED', 'CONTACT_PENDING', 'CONTACTED', 'INTERESTED', 'NOT_INTERESTED',
        'CALLBACK_REQUESTED', 'QUALIFIED', 'SHORTLISTED', 'INTERVIEW_SCHEDULED',
        'INTERVIEWED', 'OFFER_MADE', 'OFFER_ACCEPTED', 'JOINED', 'WITHDRAWN', 'REJECTED'
    )),
    source TEXT NOT NULL DEFAULT 'AUTONOMOUS_VOICE' CHECK (source IN ('AUTONOMOUS_VOICE', 'MANUAL_APPLY', 'REFERRAL', 'ADMIN')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_app_worker_job UNIQUE (hiring_request_id, worker_id)
);

CREATE TABLE IF NOT EXISTS recruitment.interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES recruitment.applications(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMPTZ NOT NULL,
    location_or_link TEXT NOT NULL,
    mode TEXT NOT NULL DEFAULT 'IN_PERSON' CHECK (mode IN ('IN_PERSON', 'TELEPHONIC', 'VIDEO')),
    status TEXT NOT NULL DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED', 'ATTENDED', 'RESCHEDULED', 'CANCELLED', 'NO_SHOW')),
    employer_feedback TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Autonomous Recruitment Runs State Machine (Section 11)
CREATE TABLE IF NOT EXISTS recruitment.recruitment_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hiring_request_id UUID NOT NULL REFERENCES recruitment.hiring_requests(id) ON DELETE CASCADE,
    hiring_request_version INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'CREATED' CHECK (status IN (
        'CREATED', 'VALIDATING', 'NEEDS_INFORMATION', 'SEARCHING', 'CANDIDATES_FOUND',
        'NO_CANDIDATES', 'OUTREACH_READY', 'CONTACTING', 'PIPELINE_READY',
        'QUEUE_EXHAUSTED', 'INTERVIEWING', 'OFFER_STAGE', 'COMPLETED', 'PAUSED', 'CANCELLED'
    )),
    target_pool_size INTEGER NOT NULL,
    active_call_attempt_id UUID,
    concurrency_limit INTEGER NOT NULL DEFAULT 1,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    paused_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recruitment.recruitment_run_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id UUID NOT NULL REFERENCES recruitment.recruitment_runs(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    previous_state TEXT,
    new_state TEXT,
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
