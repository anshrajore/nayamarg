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
