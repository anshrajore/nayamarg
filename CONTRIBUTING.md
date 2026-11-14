# 🤝 2-Developer Collaboration Guide (NayaMarg Monorepo)

This document establishes the collaboration guidelines for developers working concurrently on NayaMarg 2.0.

---

## 1. Branching Strategy

| Branch | Purpose | Who pushes? |
| :--- | :--- | :--- |
| **`main`** | **Production-ready releases**. Always buildable and deployable. | Merged via Pull Request after peer review. |
| **`dev`** | **Shared staging & integration branch**. Both developers sync here. | PR or rebased fast-forward merges. |
| **`feat/<name>`** | New feature (e.g. `feat/employer-analytics`, `feat/voice-intent-parser`). | Author developer. |
| **`fix/<name>`** | Bug fix or exception resolution (e.g. `fix/sms-dlt-header-timeout`). | Author developer. |

---

## 2. Recommended Git Configuration (Run Once Locally)

To prevent messy merge bubbles (`Merge branch 'main' of ...`) and ensure clean commit history:

```bash
# 1. Always rebase when pulling remote updates
git config pull.rebase true

# 2. Automatically set up remote tracking on first push
git config push.autoSetupRemote true
```

---

## 3. Daily 2-Developer Collaboration Workflow

### Starting a New Task
```bash
# 1. Switch to dev and pull the latest changes from your teammate
git checkout dev
git pull

# 2. Create your isolated feature branch
git checkout -b feat/your-feature-name
```

### Developing & Testing Locally
```bash
# Verify your changes build cleanly across all monorepo packages
pnpm build

# Run local development server
pnpm --filter @nayamarg/web dev
```

### Syncing Teammate's Changes Before Pushing
```bash
# If your teammate pushed commits while you were working:
git fetch origin
git rebase origin/dev

# If conflicts occur, resolve them in VS Code / IDE, then:
# git add <resolved-files>
# git rebase --continue
```

### Submitting Your Work
```bash
# Push your branch
git push origin feat/your-feature-name

# Open a Pull Request on GitHub:
# Base: `dev`  <---  Compare: `feat/your-feature-name`
```

---

## 4. Conflict Prevention Checklist

1. **Database Migrations (`supabase/migrations/`)**:
   - Always name new migrations chronologically (e.g. `007_new_feature.sql`).
   - Coordinate with your teammate before modifying existing migration files.

2. **Package Separation**:
   - Frontend and UI work should be committed in `apps/web/`.
   - Core orchestrator and backend business logic should be in `packages/recruitment-orchestrator/` or `packages/domain/`.
   - Shared types and contracts in `packages/contracts/`.

3. **Lockfile Discipline**:
   - Always use `pnpm install`, never `npm install` or `yarn`.
   - Commit `pnpm-lock.yaml` when adding new packages.
