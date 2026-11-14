-- 001_initial_schemas.sql
-- NayaMarg 2.0 Database Architecture
-- Creates logical schemas and foundational extensions

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 4 Logical Business Schemas
CREATE SCHEMA IF NOT EXISTS recruitment;
CREATE SCHEMA IF NOT EXISTS communications;
CREATE SCHEMA IF NOT EXISTS operations;

-- Grant usage on schemas to authenticated backend roles
GRANT USAGE ON SCHEMA recruitment TO authenticated, service_role;
GRANT USAGE ON SCHEMA communications TO authenticated, service_role;
GRANT USAGE ON SCHEMA operations TO authenticated, service_role;
-- 002_identity_and_tenancy.sql
-- Identity, Organizations, Membership and Access Controls

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    email TEXT UNIQUE,
    preferred_language VARCHAR(10) DEFAULT 'hi-IN',
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'EMPLOYER' CHECK (type IN ('EMPLOYER', 'AGENCY', 'INTERNAL')),
    verification_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
    gstin TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.organization_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'MEMBER' CHECK (role IN ('OWNER', 'ADMIN', 'RECRUITER', 'MEMBER')),
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INVITED', 'SUSPENDED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_org_user UNIQUE (organization_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.staff_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    department TEXT NOT NULL CHECK (department IN ('OPERATIONS', 'SUPPORT', 'ENGINEERING', 'EXECUTIVE')),
    staff_status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (staff_status IN ('ACTIVE', 'INACTIVE')),
    is_super_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    channel TEXT NOT NULL CHECK (channel IN ('VOICE', 'SMS', 'WHATSAPP')),
    preference TEXT NOT NULL DEFAULT 'OPT_IN' CHECK (preference IN ('OPT_IN', 'OPT_OUT', 'SCHEDULED_ONLY')),
    allowed_start_time TIME DEFAULT '09:00:00',
    allowed_end_time TIME DEFAULT '19:00:00',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_channel_pref UNIQUE (user_id, channel)
);

CREATE INDEX IF NOT EXISTS idx_org_members_user ON public.organization_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org ON public.organization_memberships(organization_id);
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
-- 004_communications_voice_sms.sql
-- Voice Orchestration, Sarvam Telephony Integration, SMS DLT & Consent Management

CREATE TABLE IF NOT EXISTS communications.communication_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    channel TEXT NOT NULL CHECK (channel IN ('VOICE', 'SMS', 'WHATSAPP')),
    purpose TEXT NOT NULL CHECK (purpose IN ('RECRUITMENT_OPPORTUNITY', 'INTERVIEW_NOTIFICATION', 'TRANSACTIONAL', 'SUPPORT')),
    notice_version VARCHAR(20) NOT NULL DEFAULT 'v1.0',
    status TEXT NOT NULL DEFAULT 'GRANTED' CHECK (status IN ('GRANTED', 'WITHDRAWN', 'EXPIRED')),
    granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    withdrawn_at TIMESTAMPTZ,
    evidence JSONB NOT NULL DEFAULT '{}'::jsonb,
    CONSTRAINT uq_person_channel_purpose UNIQUE (person_id, channel, purpose)
);

CREATE TABLE IF NOT EXISTS communications.contact_suppressions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    channel TEXT NOT NULL CHECK (channel IN ('VOICE', 'SMS', 'ALL')),
    reason TEXT NOT NULL CHECK (reason IN ('USER_OPT_OUT', 'DND_REGISTERED', 'INVALID_NUMBER', 'COMPLAINT', 'ADMIN_ACTION')),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- Cross-Campaign Candidate Contact Coordinator Lock
CREATE TABLE IF NOT EXISTS communications.candidate_contact_locks (
    worker_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    locked_by_run_id UUID NOT NULL,
    locked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    fencing_token BIGINT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS communications.voice_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    provider TEXT NOT NULL DEFAULT 'SARVAM' CHECK (provider IN ('SARVAM', 'MOCK', 'VOBIZ')),
    role_type TEXT NOT NULL CHECK (role_type IN ('QUALIFICATION', 'FOLLOW_UP', 'INTERVIEW_SCHEDULER', 'INBOUND_SUPPORT')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS communications.voice_agent_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES communications.voice_agents(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    sarvam_app_id TEXT NOT NULL,
    sarvam_app_version TEXT,
    system_prompt TEXT NOT NULL,
    supported_languages TEXT[] NOT NULL DEFAULT ARRAY['hi-IN', 'mr-IN', 'en-IN'],
    max_duration_seconds INTEGER NOT NULL DEFAULT 300,
    approved_by UUID REFERENCES public.staff_profiles(user_id),
    approved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_agent_version UNIQUE (agent_id, version)
);

CREATE TABLE IF NOT EXISTS communications.voice_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hiring_request_id UUID REFERENCES recruitment.hiring_requests(id) ON DELETE CASCADE,
    run_id UUID REFERENCES recruitment.recruitment_runs(id) ON DELETE CASCADE,
    agent_version_id UUID NOT NULL REFERENCES communications.voice_agent_versions(id),
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN (
        'DRAFT', 'VALIDATING', 'READY', 'BLOCKED', 'QUEUED', 'RUNNING', 'PAUSED', 'COMPLETED', 'FAILED', 'CANCELLED'
    )),
    concurrency_limit INTEGER NOT NULL DEFAULT 1,
    max_attempts_per_candidate INTEGER NOT NULL DEFAULT 3,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS communications.campaign_recipients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES communications.voice_campaigns(id) ON DELETE CASCADE,
    worker_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    priority_rank INTEGER NOT NULL,
    state TEXT NOT NULL DEFAULT 'PENDING' CHECK (state IN ('PENDING', 'QUEUED', 'CALLING', 'COMPLETED', 'EXHAUSTED', 'SUPPRESSED')),
    attempt_count INTEGER NOT NULL DEFAULT 0,
    last_attempt_at TIMESTAMPTZ,
    next_retry_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_campaign_worker UNIQUE (campaign_id, worker_id)
);

CREATE TABLE IF NOT EXISTS communications.call_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES communications.voice_campaigns(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES communications.campaign_recipients(id) ON DELETE CASCADE,
    worker_id UUID NOT NULL REFERENCES public.profiles(id),
    idempotency_key TEXT NOT NULL UNIQUE,
    provider_attempt_id TEXT,
    telephony_call_id TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN (
        'PENDING', 'ELIGIBILITY_CHECK', 'QUEUED', 'DISPATCHING', 'PROVIDER_ACCEPTED',
        'RINGING', 'CONNECTED', 'PROCESSING_RESULT', 'COMPLETED', 'NO_ANSWER',
        'BUSY', 'FAILED', 'UNKNOWN', 'CANCELLED', 'SUPPRESSED'
    )),
    started_at TIMESTAMPTZ,
    connected_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER DEFAULT 0,
    error_code TEXT,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_call_attempts_worker ON communications.call_attempts(worker_id);
CREATE INDEX IF NOT EXISTS idx_call_attempts_provider ON communications.call_attempts(provider_attempt_id);

CREATE TABLE IF NOT EXISTS communications.call_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    call_attempt_id UUID NOT NULL REFERENCES communications.call_attempts(id) ON DELETE CASCADE UNIQUE,
    call_disposition TEXT NOT NULL CHECK (call_disposition IN ('CONNECTED', 'NO_ANSWER', 'BUSY', 'FAILED')),
    candidate_interest TEXT CHECK (candidate_interest IN ('INTERESTED', 'NOT_INTERESTED', 'UNDECIDED', 'NOT_APPLICABLE')),
    availability_status TEXT CHECK (availability_status IN ('AVAILABLE', 'UNAVAILABLE', 'NOTICE_PERIOD', 'UNKNOWN')),
    available_from DATE,
    experience_years NUMERIC(4, 1),
    salary_expectation_min INTEGER,
    location_acceptable BOOLEAN,
    shift_acceptable BOOLEAN,
    interview_interest BOOLEAN,
    callback_requested BOOLEAN DEFAULT FALSE,
    callback_time TIMESTAMPTZ,
    refusal_reason TEXT,
    preferred_language VARCHAR(10) DEFAULT 'hi-IN',
    human_assistance_required BOOLEAN DEFAULT FALSE,
    extraction_confidence NUMERIC(3, 2) DEFAULT 1.0,
    raw_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS communications.call_transcripts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    call_attempt_id UUID NOT NULL REFERENCES communications.call_attempts(id) ON DELETE CASCADE UNIQUE,
    transcript_text TEXT NOT NULL,
    retention_status TEXT NOT NULL DEFAULT 'RETAINED' CHECK (retention_status IN ('RETAINED', 'ANONYMIZED', 'PURGED')),
    retention_until TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '90 days',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- DLT Compliant SMS System
CREATE TABLE IF NOT EXISTS communications.sms_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_code TEXT NOT NULL UNIQUE,
    dlt_template_id VARCHAR(50) NOT NULL UNIQUE,
    category TEXT NOT NULL CHECK (category IN ('SERVICE_IMPLICIT', 'SERVICE_EXPLICIT', 'TRANSACTIONAL')),
    language VARCHAR(10) NOT NULL DEFAULT 'hi-IN',
    content TEXT NOT NULL,
    variables TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS communications.sms_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID NOT NULL REFERENCES public.profiles(id),
    template_id UUID NOT NULL REFERENCES communications.sms_templates(id),
    phone_number TEXT NOT NULL,
    rendered_content TEXT NOT NULL,
    provider_message_id TEXT,
    status TEXT NOT NULL DEFAULT 'CREATED' CHECK (status IN (
        'CREATED', 'VALIDATING', 'SUPPRESSED', 'QUEUED', 'SUBMITTING',
        'ACCEPTED', 'FAILED', 'SENT', 'DELIVERED', 'UNDELIVERED', 'EXPIRED', 'CANCELLED'
    )),
    idempotency_key TEXT NOT NULL UNIQUE,
    error_code TEXT,
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- 005_operations_automation_outbox.sql
-- Transactional Outbox, Webhook Inbox, Failure Centre & Idempotency Store

CREATE TABLE IF NOT EXISTS operations.outbox_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL UNIQUE,
    event_type TEXT NOT NULL,
    aggregate_type TEXT NOT NULL,
    aggregate_id UUID NOT NULL,
    tenant_id UUID,
    correlation_id UUID NOT NULL,
    causation_id UUID,
    payload JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'PUBLISHED', 'FAILED')),
    retry_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_outbox_pending ON operations.outbox_events(status, created_at) WHERE status = 'PENDING';

CREATE TABLE IF NOT EXISTS operations.webhook_inbox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider TEXT NOT NULL CHECK (provider IN ('SARVAM', 'TELEPHONY', 'SMS', 'PAYMENT')),
    provider_event_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processed_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'RECEIVED' CHECK (status IN ('RECEIVED', 'PROCESSING', 'PROCESSED', 'FAILED', 'DUPLICATE')),
    payload JSONB NOT NULL,
    error_message TEXT,
    CONSTRAINT uq_provider_event UNIQUE (provider, provider_event_id)
);

CREATE TABLE IF NOT EXISTS operations.idempotency_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scope TEXT NOT NULL,
    idempotency_key TEXT NOT NULL,
    request_hash TEXT,
    response_payload JSONB,
    status TEXT NOT NULL DEFAULT 'IN_PROGRESS' CHECK (status IN ('IN_PROGRESS', 'RESOLVED', 'FAILED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
    CONSTRAINT uq_scope_key UNIQUE (scope, idempotency_key)
);

CREATE TABLE IF NOT EXISTS operations.workflow_definitions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    owner_module TEXT NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    definition JSONB NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS operations.workflow_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id TEXT NOT NULL REFERENCES operations.workflow_definitions(id),
    workflow_version INTEGER NOT NULL DEFAULT 1,
    correlation_id UUID NOT NULL,
    status TEXT NOT NULL DEFAULT 'CREATED' CHECK (status IN (
        'CREATED', 'QUEUED', 'RUNNING', 'WAITING', 'RETRY_WAIT', 'COMPLETED', 'FAILED', 'CANCELLED'
    )),
    current_step_id TEXT,
    context JSONB NOT NULL DEFAULT '{}'::jsonb,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    error_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS operations.workflow_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID NOT NULL REFERENCES operations.workflow_executions(id) ON DELETE CASCADE,
    step_key TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'PENDING' CHECK (state IN ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'SKIPPED')),
    attempt_count INTEGER NOT NULL DEFAULT 0,
    input_data JSONB,
    output_data JSONB,
    error_code TEXT,
    error_message TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    retry_at TIMESTAMPTZ,
    CONSTRAINT uq_exec_step UNIQUE (execution_id, step_key)
);

-- Failure Centre & Incident Management (Section 5.8 & 8.4)
CREATE TABLE IF NOT EXISTS operations.incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    affected_provider TEXT,
    status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'INVESTIGATING', 'MITIGATED', 'RESOLVED', 'CLOSED')),
    assigned_to UUID REFERENCES public.staff_profiles(user_id),
    summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS operations.system_failures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    failure_code TEXT NOT NULL,
    classification TEXT NOT NULL CHECK (classification IN (
        'TRANSIENT_SYSTEM', 'PERMANENT_VALIDATION', 'EXTERNAL_PROVIDER',
        'BUSINESS_OUTCOME', 'COMPLIANCE_SUPPRESSION', 'MANUAL_INTERVENTION_REQUIRED', 'DATA_QUALITY'
    )),
    source_module TEXT NOT NULL,
    correlation_id UUID NOT NULL,
    incident_id UUID REFERENCES operations.incidents(id) ON DELETE SET NULL,
    related_entity_type TEXT,
    related_entity_id UUID,
    status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'ASSIGNED', 'RECOVERING', 'RESOLVED', 'IGNORED')),
    assigned_to UUID REFERENCES public.staff_profiles(user_id),
    retry_count INTEGER NOT NULL DEFAULT 0,
    max_retries INTEGER NOT NULL DEFAULT 3,
    error_details JSONB NOT NULL DEFAULT '{}'::jsonb,
    suggested_runbook TEXT,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS operations.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id),
    category TEXT NOT NULL CHECK (category IN ('GENERAL', 'COMPLAINT', 'CANDIDATE_DISPUTE', 'EMPLOYER_REQUEST', 'FRAUD_ALERT')),
    priority TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
    status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN (
        'NEW', 'TRIAGED', 'ASSIGNED', 'INVESTIGATING', 'WAITING_FOR_CUSTOMER',
        'WAITING_FOR_PROVIDER', 'RESOLUTION_PROPOSED', 'RESOLVED', 'CLOSED'
    )),
    assigned_to UUID REFERENCES public.staff_profiles(user_id),
    subject TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS operations.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT NOT NULL,
    changes JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_address INET,
    user_agent TEXT,
    request_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_resource ON operations.audit_logs(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON operations.audit_logs(actor_id);
-- 006_rls_and_security.sql
-- Row Level Security (RLS) and Tenant Isolation Policies

-- Enable RLS on Public Schema Tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_preferences ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if current auth user is internal staff
CREATE OR REPLACE FUNCTION public.is_internal_staff(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.staff_profiles
        WHERE user_id = user_uuid AND staff_status = 'ACTIVE'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function: Check organization membership
CREATE OR REPLACE FUNCTION public.is_org_member(org_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.organization_memberships
        WHERE organization_id = org_uuid AND user_id = user_uuid AND status = 'ACTIVE'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_internal_staff(auth.uid()));

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Organizations Policies
CREATE POLICY "Members and Staff can view organizations"
    ON public.organizations FOR SELECT
    USING (public.is_org_member(id, auth.uid()) OR public.is_internal_staff(auth.uid()));

-- Enable RLS on Recruitment Schema
ALTER TABLE recruitment.hiring_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruitment.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruitment.vacancy_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can view their hiring requests"
    ON recruitment.hiring_requests FOR SELECT
    USING (public.is_org_member(organization_id, auth.uid()) OR public.is_internal_staff(auth.uid()));

CREATE POLICY "Org recruiters can create hiring requests"
    ON recruitment.hiring_requests FOR INSERT
    WITH CHECK (public.is_org_member(organization_id, auth.uid()) OR public.is_internal_staff(auth.uid()));

CREATE POLICY "Workers can view their own applications"
    ON recruitment.applications FOR SELECT
    USING (worker_id = auth.uid() OR public.is_internal_staff(auth.uid()));

-- Enable RLS on Communications Schema
ALTER TABLE communications.communication_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications.call_transcripts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own consent"
    ON communications.communication_consents FOR ALL
    USING (person_id = auth.uid() OR public.is_internal_staff(auth.uid()));

CREATE POLICY "Transcripts restricted to internal authorized staff"
    ON communications.call_transcripts FOR SELECT
    USING (public.is_internal_staff(auth.uid()));
