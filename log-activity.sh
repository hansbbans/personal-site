#!/bin/bash
# Mission Control Activity Logger
# Usage: ./log-activity.sh <type> "<title>"
# Types: task, message, search, system, error

set -euo pipefail

LOG_FILE="${LOG_FILE:-$(cd "$(dirname "$0")" && pwd)/data/activity-log.json}"
TYPE="${1:-}"
TITLE="${2:-}"

if [ -z "$TYPE" ] || [ -z "$TITLE" ]; then
    echo "Usage: ./log-activity.sh <type> \"<title>\""
    exit 1
fi

# Read existing log
if [ -f "$LOG_FILE" ]; then
    LOG=$(cat "$LOG_FILE")
else
    LOG="[]"
fi

# Add the new entry (jq escapes quotes etc.) to the beginning, keep the last 1000.
# With pipefail, a jq failure aborts before the log file is overwritten.
NEW_LOG=$(echo "$LOG" | jq \
    --arg type "$TYPE" \
    --arg title "$TITLE" \
    --arg timestamp "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
    '([{type: $type, title: $title, timestamp: $timestamp}] + .) | .[:1000]')

# Write back
echo "$NEW_LOG" > "$LOG_FILE"

echo "Logged: [$TYPE] $TITLE"
