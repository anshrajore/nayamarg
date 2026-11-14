#!/usr/bin/env bash
set -e

echo "======================================================="
echo "🔄 NayaMarg 2-Developer Auto-Sync (GitHub & Monorepo)  "
echo "======================================================="

CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current local branch: $CURRENT_BRANCH"

# 1. Fetch all updates from all remotes & prune deleted branches
echo "🌐 Fetching latest commits from GitHub..."
git fetch --all --prune

# 2. Check if remote has new commits
LOCAL_HASH=$(git rev-parse HEAD)
REMOTE_HASH=$(git rev-parse "origin/$CURRENT_BRANCH" 2>/dev/null || echo "$LOCAL_HASH")

if [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
  INCOMING_COUNT=$(git rev-list --count HEAD..origin/$CURRENT_BRANCH 2>/dev/null || echo "0")
  if [ "$INCOMING_COUNT" -gt 0 ]; then
    echo "📥 Incoming commits from teammate: $INCOMING_COUNT"
    git log --oneline HEAD..origin/$CURRENT_BRANCH
  fi
fi

# 3. Pull and rebase with autostash
echo "🔀 Rebase-pulling remote changes with autostash..."
git pull --rebase --autostash origin "$CURRENT_BRANCH"

# 4. Check if dependencies changed
LOCKFILE_CHANGED=$(git diff --name-only HEAD@{1} HEAD 2>/dev/null | grep -E "pnpm-lock.yaml|package.json" || true)
if [ -n "$LOCKFILE_CHANGED" ]; then
  echo "📦 Teammate updated dependencies. Running 'pnpm install'..."
  pnpm install
else
  echo "✅ Dependencies are up to date."
fi

echo "======================================================="
echo "✨ Your local workspace is in sync with GitHub!       "
echo "======================================================="
