#!/bin/bash

# Extract metadata from photos and generate updated HTML

echo "🔍 Extracting photo metadata..."

cd "$(dirname "$0")"

# Create metadata JSON file
echo "{" > photo-metadata.json

first=true
for img in images/photo_*.{jpg,jpeg}; do
    if [[ -f "$img" ]]; then
        filename=$(basename "$img")
        
        # Extract date using mdls
        creation_date=$(mdls "$img" | grep "kMDItemContentCreationDate " | awk -F' = ' '{print $2}' | cut -d' ' -f1)
        year=$(echo "$creation_date" | cut -d'-' -f1)
        
        # Add comma if not first entry
        if [ "$first" = false ]; then
            echo "," >> photo-metadata.json
        fi
        first=false
        
        # Add to JSON
        echo "  \"$filename\": {" >> photo-metadata.json
        echo "    \"year\": \"$year\"," >> photo-metadata.json
        echo "    \"location\": \"Update location\"," >> photo-metadata.json
        echo "    \"date\": \"$creation_date\"" >> photo-metadata.json
        echo -n "  }" >> photo-metadata.json
        
        echo "$filename: $year"
    fi
done

echo "" >> photo-metadata.json
echo "}" >> photo-metadata.json

echo ""
echo "✅ Metadata extracted to photo-metadata.json"
echo "📊 Photo years found:"
cat photo-metadata.json | grep -o '"year": "[0-9]*"' | sort | uniq -c | sort -nr