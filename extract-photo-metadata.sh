#!/bin/bash

# Fill photo-metadata.json with EXIF capture dates for every gallery photo.
# Existing entries are merged: curated year, location, date and description
# values are kept, and only missing fields are filled in.
#
# (Spotlight's kMDItemContentCreationDate is the file's creation time on
# disk, e.g. the checkout date, not when the photo was taken, so the date is
# read from EXIF instead.)

set -euo pipefail
cd "$(dirname "$0")"

echo "🔍 Extracting photo metadata..."
node scripts/extract-photo-metadata.js
