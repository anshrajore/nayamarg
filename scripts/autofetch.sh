#!/usr/bin/env bash

echo "======================================================="
echo "📡 NayaMarg Background Auto-Fetch Daemon Started       "
echo "Monitoring remote repository every 45 seconds...       "
echo "======================================================="

POLL_INTERVAL_SECONDS=${1:-45}

while true; do
  CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "main")
  
  # Quietly fetch all branches without modifying working tree
  git fetch --all --prune --quiet 2>/dev/null || true

  # Check if remote has new commits on current branch
  BEHIND_COUNT=$(git rev-list --count HEAD..origin/$CURRENT_BRANCH 2>/dev/null || echo "0")

  if [ "$BEHIND_COUNT" -gt 0 ]; then
    echo ""
    echo "🔔 [$(date +'%H:%M:%S')] Teammate pushed $BEHIND_COUNT new commit(s) on origin/$CURRENT_BRANCH!"
    git log --oneline -n 3 HEAD..origin/$CURRENT_BRANCH 2>/dev/null || true
    echo "💡 Run 'pnpm sync' to safely pull & rebase teammate's work."
    echo ""
  fi

  sleep "$POLL_INTERVAL_SECONDS"
done
