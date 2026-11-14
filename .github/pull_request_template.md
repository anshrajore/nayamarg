## 📌 Pull Request Overview

### Summary
<!-- Provide a clear, brief summary of what this PR does and why it was created -->

### Associated Domain / Packages
- [ ] `apps/web` (Frontend Portal & UI)
- [ ] `packages/recruitment-orchestrator` (Core Autonomous Orchestrator)
- [ ] `packages/domain` (State Machines, Vacancy Math)
- [ ] `packages/contracts` (Zod Schemas & Event Definitions)
- [ ] `packages/providers` (Sarvam AI, Telephony PSTN, SMS)
- [ ] `supabase/migrations` (Database Schema & PostGIS)

---

### 🧪 Testing & Verification
<!-- Describe how you verified your changes locally -->
- [ ] Ran `pnpm build` across workspace (0 errors)
- [ ] Verified locally in browser at `http://localhost:3000`
- [ ] Automated tests passed (`pnpm test` / Turborepo)
- [ ] Visual UI verified on desktop & mobile screen sizes

### 📸 Screenshots / Recordings (if UI changes)
<!-- Paste screenshots or videos demonstrating the UI before / after -->

---

### 🤝 Peer Review Checklist (For Co-Developer)
- [ ] Code follows NayaMarg architectural invariants (Postgres source of truth, RLS, no fake mock data in production)
- [ ] No hardcoded secrets, API keys, or service role tokens
- [ ] Rebased on latest `dev` / `main` without merge conflicts
