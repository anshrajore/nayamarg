#!/usr/bin/env bash
set -e

COMMIT_MSG="$1"

if [ -z "$COMMIT_MSG" ]; then
  echo "❌ Error: Please provide a commit message."
  echo "Usage: pnpm ship \"feat(module): description\""
  exit 1
fi

echo "======================================================="
echo "🚀 NayaMarg 2-Developer Automated Ship & Push Pipeline "
echo "======================================================="

CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Shipping on branch: $CURRENT_BRANCH"

# 1. Run Security Audit (Ensure zero secrets in git index)
echo "🔒 Running pre-ship security leak checks..."
pnpm --filter @nayamarg/recruitment-orchestrator test -- -t "Security"

# 2. Run Monorepo Test Suites
echo "🧪 Running automated test suites..."
pnpm --filter @nayamarg/recruitment-orchestrator test

# 3. Verify Clean Production Build
echo "🏗️  Verifying production build..."
pnpm build

# 4. Fetch & Rebase with teammate's latest changes
echo "🌐 Syncing latest teammate updates before pushing..."
git fetch --all --prune
git pull --rebase --autostash origin "$CURRENT_BRANCH"

# 5. Stage, Commit & Push
echo "📝 Committing and pushing to origin/$CURRENT_BRANCH..."
git add .
git commit -m "$COMMIT_MSG" || {
  echo "ℹ️  No changes to commit or commit already up-to-date."
}
git push origin "$CURRENT_BRANCH"

echo "======================================================="
echo "✅ Code successfully verified, committed, and pushed! "
echo "======================================================="
