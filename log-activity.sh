#!/bin/bash
# Mission Control Activity Logger
# Usage: ./log-activity.sh <type> "<title>"
# Types: task, message, search, system, error

LOG_FILE="/Users/Hans/code/personal-site/data/activity-log.json"
TYPE="$1"
TITLE="$2"

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

# Create new entry
ENTRY=$(cat <<EOF
{
    "type": "$TYPE",
    "title": "$TITLE",
    "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF
)

# Add to beginning of array
NEW_LOG=$(echo "$LOG" | jq --argjson entry "$ENTRY" '[$entry] + .')

# Keep only last 1000 entries
NEW_LOG=$(echo "$NEW_LOG" | jq '.[:1000]')

# Write back
echo "$NEW_LOG" > "$LOG_FILE"

echo "Logged: [$TYPE] $TITLE"
