#!/bin/bash

# Batch optimize all images for the photos page

echo "🖼️ Optimizing photos..."

cd "$(dirname "$0")"

# Create directories
mkdir -p images/optimized/{small,medium,large}

# Process each photo
for img in images/photo_*.jpg images/photo_*.jpeg; do
    if [[ -f "$img" ]]; then
        filename=$(basename "$img")
        echo "Processing $filename..."
        
        # Small: 400px max, quality 70
        sips -Z 400 -s format jpeg -s formatOptions 70 "$img" --out "images/optimized/small/$filename" 2>/dev/null
        
        # Medium: 800px max, quality 75  
        sips -Z 800 -s format jpeg -s formatOptions 75 "$img" --out "images/optimized/medium/$filename" 2>/dev/null
        
        # Large: 1200px max, quality 80
        sips -Z 1200 -s format jpeg -s formatOptions 80 "$img" --out "images/optimized/large/$filename" 2>/dev/null
    fi
done

echo "✅ Optimization complete!"
echo ""
echo "📊 Size comparison:"
echo "Original total: $(du -ch images/photo_*.{jpg,jpeg} 2>/dev/null | tail -1 | cut -f1)"
echo "Small total: $(du -ch images/optimized/small/* 2>/dev/null | tail -1 | cut -f1)"
echo "Medium total: $(du -ch images/optimized/medium/* 2>/dev/null | tail -1 | cut -f1)"
echo "Large total: $(du -ch images/optimized/large/* 2>/dev/null | tail -1 | cut -f1)"