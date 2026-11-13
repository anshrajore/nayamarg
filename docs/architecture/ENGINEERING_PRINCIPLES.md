# NayaMarg 2.0 — Engineering Principles

These ten architectural and operational decisions are immutable foundations of the NayaMarg 2.0 system.

1. **PostgreSQL is the source of truth.**  
   Redis, BullMQ, Sarvam, telephony, and SMS providers cannot independently define final business state. All authoritative business outcomes, vacancy counters, and candidate states persist in Supabase PostgreSQL.

2. **No hidden business operations.**  
   Every operation must have an internal UUID, traceable status, timestamps, and an immutable audit trail. No state changes occur without a persistent database record.

3. **No blind retries.**  
   An uncertain provider operation must be marked `UNKNOWN` and reconciled before another external side-effect is issued. Never redial or re-send messages blindly.

4. **No unrestricted admin access.**  
   Admin roles, sensitive customer PII, and operational interventions are strictly governed by RBAC, least privilege, and auditable permissions.

5. **No automatic unsolicited outreach.**  
   Candidate matching and communication eligibility are separate decisions. A candidate can match a job but still be ineligible for a particular communication due to consent, DND/NDNC, or cooldown rules.

6. **No fake functionality.**  
   Screens must be connected to real API contracts, database records, and verified state transitions. A frontend animation must never misrepresent an unconfirmed call status.

7. **No provider lock-in.**  
   Sarvam AI and telephony networks are integrated behind standard provider adapter interfaces (`VoiceProvider`, `SmsProvider`), enabling provider interchangeability without rewriting business domains.

8. **No unnecessary microservices.**  
   Keep business domains within a modular monorepo architecture. Workers scale execution independently while sharing unified database contracts and event definitions.

9. **No UI-led architecture.**  
   UI design must reflect the authentic business, state machine, and data model. Database structures must not be distorted to fit dashboard cards.

10. **No deployment without recovery tests.**  
    An application is not production-ready merely because it builds. Workers must demonstrate safe resumption across restarts, reconciliation of pending provider webhooks, and idempotent outbox dispatch.
