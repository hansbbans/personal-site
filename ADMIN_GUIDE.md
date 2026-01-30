# Photo Admin Guide

Complete guide to using the enhanced photo admin panel.

## 🚀 Quick Start

1. **Setup Configuration**
   ```bash
   cp config.example.json config.json
   ```

2. **Edit config.json**
   ```json
   {
     "adminPassword": "your_secure_password",
     "githubToken": "ghp_your_token_here",
     "repoOwner": "hansbbans",
     "repoName": "personal-site"
   }
   ```

3. **Get GitHub Token**
   - Go to: https://github.com/settings/tokens/new
   - Scopes needed: `repo` (full control)
   - Copy token to config.json

4. **Access Admin Panel**
   - Open: `https://yourdomain.com/admin.html`
   - Enter password from config.json

---

## 📋 Features Overview

### 1. **Manage Photos Tab**
View and edit all existing photos in your gallery.

**Features:**
- 🔍 **Search** - Find photos by filename, location, or year
- 🎯 **Filters** - Filter by year or location
- ✏️ **Inline Editing** - Update location, year, alt text directly
- 🗑️ **Delete** - Remove photos from gallery
- 👁️ **Live Preview** - See changes before committing

**Workflow:**
1. Click "🔄 Refresh" to load photos from GitHub
2. Edit photo metadata inline
3. Click "👁️ Preview Changes" to see how it will look
4. Confirm and commit to GitHub

### 2. **Upload New Tab**
Add new photos to your gallery with automatic EXIF extraction.

**Features:**
- 📁 **Drag & Drop** - Drop multiple photos at once
- 📸 **EXIF Extraction** - Automatically pulls:
  - Date taken → Year
  - GPS coordinates → Location (if available)
  - Camera model, lens, aperture, ISO, shutter speed
- 🗜️ **Auto Compression** - Reduces file size before upload
  - Configurable max width (default: 1920px)
  - Adjustable JPEG quality (default: 85%)
  - Shows size savings
- ✏️ **Edit Before Upload** - Review and edit metadata before uploading

**Workflow:**
1. Drag photos into drop zone (or click to select)
2. Review extracted EXIF data
3. Edit location/year/alt text as needed
4. Click "📤 Process & Upload"
5. Photos are optimized, uploaded, and added to gallery automatically

### 3. **Batch Edit Tab**
Edit multiple photos at once - perfect for bulk updates.

**Features:**
- ✅ **Select Multiple** - Check photos to edit
- 🎯 **Smart Selection**:
  - Select All / Deselect All
  - Select by Year
  - Select by Location
- 🔄 **Bulk Updates**:
  - Update location for all selected
  - Update year for all selected
  - Add tags to multiple photos
  - Add descriptions

**Workflow:**
1. Select photos you want to edit
2. Fill in the fields you want to update (leave others empty)
3. Click "Apply to Selected"
4. Preview changes and commit

---

## 🎨 Live Preview System

Before committing any changes, you can preview exactly how your gallery will look.

**How it works:**
1. Make changes to photos (edit, delete, batch update)
2. Click "👁️ Preview Changes" button
3. See a live preview of the updated gallery in a modal
4. If happy → "Looks Good - Commit Changes"
5. If not → Close preview and make more edits

**What gets previewed:**
- Updated locations and years
- Deleted photos (removed from view)
- New metadata
- Exact layout as it will appear on site

---

## 📸 EXIF Data Extraction

The admin automatically extracts metadata from uploaded photos.

### Supported EXIF Fields:

| Field | Extracted To | Example |
|-------|--------------|---------|
| DateTimeOriginal | Year | "2023" from "2023:05:15 14:30:00" |
| GPSLatitude/GPSLongitude | Location | "GPS: 40.7128, -74.0060" |
| Model | Camera info | "Canon EOS R5" |
| LensModel | Lens info | "RF 24-70mm F2.8 L IS USM" |
| FNumber | Aperture | "f/2.8" |
| ISOSpeedRatings | ISO | "400" |
| ExposureTime | Shutter speed | "1/250s" |
| FocalLength | Focal length | "50mm" |

### GPS to Location:
Currently shows raw coordinates. For production, consider adding:
- **Reverse Geocoding**: Convert GPS to city/country names
- **Services**: Google Maps API, OpenStreetMap Nominatim
- **Implementation**: Add to `extractExif()` function

---

## 🗜️ Image Optimization

Photos are automatically compressed before upload to save bandwidth.

### Default Settings:
- **Max Width**: 1920px (4K screens)
- **JPEG Quality**: 85% (great quality, smaller size)
- **Format**: Converts to JPEG

### Typical Savings:
- Original iPhone photo: 3-5 MB
- Optimized photo: 300-800 KB
- **Savings: ~80-90%**

### Configuration:
Adjust in Settings (⚙️ icon):
```javascript
{
  "maxWidth": 1920,        // Resize to this width
  "jpegQuality": 85,       // 1-100 (higher = better quality)
  "autoOptimize": true     // Auto-optimize on upload
}
```

### When to Adjust:
- **Higher quality needed**: Increase quality to 90-95
- **Slower connections**: Decrease maxWidth to 1280px
- **Print photos**: Keep original size (set very high maxWidth)

---

## 🔒 Security Best Practices

### Password Protection:
1. **Use Strong Password**: 16+ characters, mix of letters/numbers/symbols
2. **Store in config.json**: Never commit this file to Git
3. **Change Regularly**: Update password every few months

### GitHub Token:
1. **Minimal Scopes**: Only grant `repo` access
2. **Expiration**: Set token to expire (e.g., 90 days)
3. **Regenerate**: If compromised, revoke and create new token
4. **Never Share**: Don't paste in logs, screenshots, or share with others

### Access Control:
- Only share admin URL with trusted people
- Use HTTPS (important for token security)
- Consider IP whitelisting if your host supports it
- Log out when done (clears session)

### config.json Security:
```bash
# Set proper permissions (Unix/Mac)
chmod 600 config.json

# Verify it's in .gitignore
git check-ignore config.json  # Should show the file
```

---

## 🛠️ Troubleshooting

### "Incorrect password"
- Check `config.json` exists and has `adminPassword` field
- Password is case-sensitive
- Try hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### "Please configure GitHub token"
- Open Settings (⚙️ icon)
- Enter GitHub token with `repo` scope
- Save settings

### "Failed to fetch photos.html"
- Verify GitHub token is valid
- Check repo owner/name are correct
- Ensure token has `repo` access

### Photos not uploading:
- Check file size (GitHub has 100MB limit per file)
- Verify token hasn't expired
- Check browser console for errors (F12)

### EXIF data not extracting:
- Some photos don't have EXIF (screenshots, edited photos)
- Ensure EXIF library loaded (check console)
- Camera must write EXIF data (most do)

### Images too large after optimization:
- Reduce JPEG quality (try 75-80)
- Reduce maxWidth (try 1280)
- Check optimization is enabled in settings

### Changes not appearing on site:
- GitHub Pages can take 1-2 minutes to rebuild
- Clear browser cache (Ctrl+Shift+R)
- Check commits on GitHub to verify upload

---

## 💡 Tips & Tricks

### Batch Operations:
- Use "Select by Year" to update all 2023 photos at once
- Add location tags incrementally as you remember places
- Add descriptions for SEO (search engines index alt text)

### EXIF Workflow:
1. Import batch from camera with original dates
2. EXIF auto-extracts years
3. Manually add locations (or use GPS if available)
4. Review EXIF camera info for geeky details

### Organizing:
- Use consistent location names: "Tokyo, Japan" not "tokyo" or "Tokyo"
- Add tags for themes: "landscape", "portrait", "travel"
- Fill in alt text for accessibility and SEO

### Performance:
- Compress images before first upload (settings → maxWidth: 1920)
- Delete unused/duplicate photos to keep gallery fast
- Use specific years in filenames for easy sorting

### Version Control:
- Preview changes before committing (safety net!)
- Use descriptive commit messages
- Check GitHub commit history if you need to revert

---

## 🔧 Advanced Configuration

### Custom Password Location:
If you want to use environment variables instead:

```javascript
// In admin-app.js, modify checkPassword():
const password = process.env.ADMIN_PASSWORD || this.config.password;
```

### Reverse Geocoding (GPS → Location):
Add to `extractExif()` function:

```javascript
async reverseGeocode(lat, lng) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`
  );
  const data = await response.json();
  return data.results[0]?.formatted_address || null;
}
```

### Image Format Support:
Currently supports: JPG, JPEG, PNG
To add HEIC support, install `heic2any`:

```javascript
import heic2any from 'heic2any';

// In handleFiles():
if (file.type === 'image/heic') {
  const converted = await heic2any({ blob: file, toType: 'image/jpeg' });
  file = new File([converted], file.name.replace('.heic', '.jpg'), { type: 'image/jpeg' });
}
```

---

## 📊 Metadata Schema

Photos support the following metadata fields:

```javascript
{
  id: 'photo_123',           // Unique identifier
  src: 'images/photo.jpg',   // Image path
  alt: 'Sunset in Tokyo',    // Alt text (accessibility)
  location: 'Tokyo, Japan',  // Where photo was taken
  year: '2023',              // Year taken
  tags: ['travel', 'sunset'], // Categories/themes
  description: '...',        // Long description (optional)
  exif: {                    // Camera metadata
    camera: 'Canon EOS R5',
    lens: 'RF 24-70mm f/2.8',
    aperture: 'f/2.8',
    iso: '400',
    shutterSpeed: '1/250s',
    focalLength: '50mm',
    date: '2023:05:15 14:30:00',
    gpsLat: 35.6762,
    gpsLng: 139.6503
  }
}
```

---

## 🚀 Future Enhancements

Potential features to add:

- [ ] **Reverse Geocoding** - Auto-convert GPS to location names
- [ ] **Photo Reordering** - Drag-and-drop to change gallery order
- [ ] **Categories/Albums** - Organize photos into collections
- [ ] **Search by EXIF** - Filter by camera, lens, aperture, etc.
- [ ] **Bulk Import** - Import metadata from CSV
- [ ] **Duplicate Detection** - Find similar photos
- [ ] **WebP/AVIF Support** - Modern image formats for smaller files
- [ ] **Lazy Preview** - Don't load all photos at once in admin
- [ ] **Undo/Redo** - Revert changes before committing
- [ ] **Dark/Light Mode** - User preference
- [ ] **Multi-user Support** - Different admin accounts
- [ ] **Activity Log** - Track who changed what and when
- [ ] **Backup/Restore** - Export and import gallery state

---

## 📞 Support

**Issues?**
- Check this guide first
- Review browser console (F12) for errors
- Check GitHub repo issues
- Verify all dependencies loaded (EXIF.js, Pica.js)

**Need Help?**
- File an issue on GitHub
- Check `PHOTO_ADMIN_ASSESSMENT.md` for known issues
- Review commit history for changes

---

## 📝 Changelog

### v2.0.0 (Current)
- ✨ **NEW**: EXIF metadata extraction
- ✨ **NEW**: Image optimization/compression
- ✨ **NEW**: Batch editing for multiple photos
- ✨ **NEW**: Live preview before committing
- 🔒 **NEW**: Password moved to config.json
- 🎨 **IMPROVED**: Complete UI redesign
- 🐛 **FIXED**: Duplicate code between admin.html and photo-admin.js
- 📚 **DOCS**: Comprehensive admin guide

### v1.0.0 (Original)
- Basic upload functionality
- Simple photo management
- GitHub integration
- Manual metadata entry

---

**Last Updated**: January 2025
**Version**: 2.0.0
