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
