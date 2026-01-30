# Photo Admin Documentation

The Photo Admin is a web-based interface for managing photos on your personal site. It provides features for uploading, editing, batch processing, and optimizing photos.

## Features

- ✅ **EXIF Metadata Extraction** - Automatically extracts camera info, date, GPS, and settings from uploaded photos
- ✅ **Image Optimization** - Compresses and resizes images before upload using Pica
- ✅ **Batch Editing** - Edit multiple photos at once (location, year, tags, descriptions)
- ✅ **Live Preview** - See how changes will look on the site before committing
- ✅ **Delete/Edit Photos** - Full CRUD functionality for existing photos
- ✅ **Secure Authentication** - Password stored in config file (not in source code)

## Setup

### 1. Create Configuration File

Copy the example config and fill in your details:

```bash
cp config.example.json config.json
```

Edit `config.json`:

```json
{
  "adminPassword": "your_secure_password_here",
  "githubToken": "ghp_your_github_token_here",
  "repoOwner": "hansbbans",
  "repoName": "personal-site",
  "imageOptimization": {
    "maxWidth": 1920,
    "jpegQuality": 85,
    "autoOptimize": true
  }
}
```

### 2. Get a GitHub Token

1. Go to https://github.com/settings/tokens
2. Generate a new token with `repo` scope
3. Copy the token to `config.json`

### 3. Security Note

**IMPORTANT**: `config.json` is in `.gitignore` and should never be committed to the repository. It contains sensitive credentials.

## Usage

### Access the Admin Panel

Navigate to `admin.html` on your site:
```
https://yourdomain.com/admin.html
```

Enter the password from your `config.json` file.

### Uploading Photos

1. Switch to the "Upload New" tab
2. Drag and drop photos or click to select files
3. EXIF data will be extracted automatically
4. Review/edit metadata (location, year, alt text)
5. Click "Process & Upload"

### Managing Existing Photos

1. Switch to the "Manage Photos" tab
2. Click "Refresh" to load existing photos from GitHub
3. Edit photo details inline or click the ✏️ button for full edit
4. Use the 🗑️ button to delete photos

### Batch Editing

1. Switch to the "Batch Edit" tab
2. Select photos using checkboxes
3. Use toolbar buttons to select by year or location
4. Fill in the batch form with changes
5. Click "Apply to Selected"

### Live Preview

Before committing changes:
1. Click "Preview Changes" to see how the gallery will look
2. Review the preview in the modal
3. Click "Looks Good - Commit Changes" to save to GitHub

## Technical Details

### EXIF Data Extracted

The admin extracts the following EXIF data from photos:
- Camera model
- Lens model
- Focal length
- Aperture (f-stop)
- ISO
- Shutter speed
- Date taken
- GPS coordinates (if available)

### Image Optimization

Images are processed using Pica library:
- Resized to max width (default 1920px)
- Compressed to JPEG with configurable quality (default 85%)
- Original aspect ratio preserved

### File Structure

```
personal-site/
├── admin.html              # Main admin interface
├── admin-enhanced.html     # Enhanced version (same as admin.html)
├── config.example.json     # Configuration template
├── config.json             # Your config (gitignored)
├── js/
│   ├── admin-enhanced.js   # Main admin application
│   └── admin-app.js        # Legacy version
├── css/
│   └── admin-styles.css    # Admin panel styles
└── images/                 # Uploaded photos go here
```

## Troubleshooting

### "Configuration error: config.json not found"

Make sure you've created `config.json` from the example file.

### "Failed to fetch photos.html"

Check your GitHub token has `repo` scope and is correctly entered in `config.json`.

### EXIF data not showing

Not all photos have EXIF data. The admin will show what data is available.

### Images not optimizing

Check that your browser supports the required APIs. The admin uses Pica for image processing.

## Security Considerations

- Always use HTTPS for the admin panel
- Keep your `config.json` secure and never commit it
- Use a strong admin password
- Rotate your GitHub token periodically
- The admin uses sessionStorage for authentication (cleared when tab closes)
