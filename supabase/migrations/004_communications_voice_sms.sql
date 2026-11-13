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
