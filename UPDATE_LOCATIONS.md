# 📍 Updating Photo Locations

## Quick Update
Edit `photos.html` and replace `"Update location"` with actual location names:

```html
<!-- Before -->
<span class="photo-location">Update location</span>

<!-- After -->
<span class="photo-location">Seoul, Korea</span>
<span class="photo-location">Central Park, NYC</span>
<span class="photo-location">Tokyo Station</span>
```

## Tips
- Keep locations short (fits on mobile)
- Use consistent format: `City, Country` or `Landmark`
- Consider: neighborhood names, restaurant names, or specific spots

## Future Enhancement Ideas
- Extract GPS data from photo EXIF → auto-resolve to location names
- Create location database/dropdown for consistency
- Add map integration to show photo locations