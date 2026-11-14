#!/usr/bin/env bash
set -e

echo "======================================================="
echo "🗄️  NayaMarg Supabase Database & Migration Sync       "
echo "======================================================="

PROJECT_ID="fuitxkkmilvefbikvzje"
echo "📍 Supabase Project: $PROJECT_ID"

# 1. Compile all migrations into consolidated schema
echo "📄 Compiling migrations from supabase/migrations/*.sql..."
cat supabase/migrations/*.sql > supabase/complete_schema.sql
LINE_COUNT=$(wc -l < supabase/complete_schema.sql | tr -d ' ')
echo "✅ Consolidated supabase/complete_schema.sql generated ($LINE_COUNT lines)."

# 2. Check Supabase REST API & Latency
echo "🌐 Checking remote Supabase database connectivity..."
HEALTH_STATUS=$(curl -s "http://localhost:3000/api/health" | grep -o '"status":"[^"]*"' | head -n 1 || echo '"status":"UNKNOWN"')
echo "📊 Database status: $HEALTH_STATUS"

echo "======================================================="
echo "💡 To apply changes directly on Supabase:             "
echo "   Copy supabase/complete_schema.sql and run in:       "
echo "   https://supabase.com/dashboard/project/$PROJECT_ID/sql"
echo "======================================================="
