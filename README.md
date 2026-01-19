# Personal Website

A clean, modern personal website featuring gear recommendations, city food guides, photography, and book reviews.

## Features

- **Gear Section**: Showcase products you love with Amazon affiliate links
- **City Food Guides**: Restaurant recommendations by city with Google Maps integration
- **Photography Gallery**: Display your photos in a responsive grid
- **Books Section**: Share book reviews and recommendations
- **Fully Responsive**: Works perfectly on mobile and desktop devices

## Setup Instructions

### 1. Google Sheets Setup for Restaurant Data

1. Create a new Google Spreadsheet
2. For each city, create a separate sheet (tab) with the city name
3. In each sheet, use the following column structure:
   - Column A: Restaurant Name
   - Column B: Address
   - Column C: Dishes (comma-separated)
   - Column D: Latitude
   - Column E: Longitude

Example spreadsheet structure:

**Sheet: "New York"**
```
Name                | Address                      | Dishes                    | Latitude  | Longitude
Joe's Pizza         | 7 Carmine St, New York       | Margherita, Pepperoni     | 40.7308   | -74.0023
Katz's Delicatessen | 205 E Houston St, New York   | Pastrami, Reuben Sandwich | 40.7223   | -73.9873
```

**Sheet: "San Francisco"**
```
Name                | Address                      | Dishes                    | Latitude  | Longitude
Tartine Bakery      | 600 Guerrero St, SF          | Morning Bun, Croissant    | 37.7618   | -122.4220
Swan Oyster Depot   | 1517 Polk St, SF             | Clam Chowder, Oysters     | 37.7914   | -122.4213
```

4. Make the spreadsheet public:
   - Click "Share" → "Get link" → "Anyone with the link can view"
5. Copy the Spreadsheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

### 2. Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps JavaScript API:
   - Go to "APIs & Services" → "Library"
   - Search for "Maps JavaScript API"
   - Click "Enable"
4. Create API credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key
5. (Optional) Restrict the API key:
   - Click on your API key
   - Under "Application restrictions", select "HTTP referrers"
   - Add your website domain

### 3. Google Sheets API Setup

1. In the same Google Cloud Console project
2. Enable the Google Sheets API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
3. You can use the same API key from the Maps setup

### 4. Configure the Website

Edit `/Users/hans/code/Site/js/script.js`:

```javascript
const GOOGLE_SHEETS_API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY';
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
```

Edit `/Users/hans/code/Site/index.html` (line with Google Maps script):

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap" async defer></script>
```

### 5. Add Your Content

#### Gear Section
Edit the gear items in `index.html` (starting at line 31):
- Replace placeholder images with your product images
- Update product names, descriptions, and categories
- Add your Amazon affiliate links

#### Photos Section
1. Add your photos to `/Users/hans/code/Site/images/`
2. Update the photo grid in `index.html` (starting at line 93)
3. Update image paths and location names

#### Books Section
Edit the books in `index.html` (starting at line 127):
- Add book cover images to `/Users/hans/code/Site/images/`
- Update book titles, authors, and reviews

### 6. Amazon Affiliate Links

1. Sign up for [Amazon Associates](https://affiliate-program.amazon.com/)
2. Create affiliate links for your products
3. Replace `YOUR_AMAZON_AFFILIATE_LINK` in the HTML with your actual affiliate links

### 7. Deploy Your Website

You can deploy this website using any of these services:

**GitHub Pages (Free):**
1. Create a GitHub repository
2. Push your code
3. Go to Settings → Pages
4. Select your main branch as source

**Netlify (Free):**
1. Sign up at [netlify.com](https://www.netlify.com/)
2. Drag and drop your site folder
3. Get instant deployment

**Vercel (Free):**
1. Sign up at [vercel.com](https://vercel.com/)
2. Import your project
3. Deploy with one click

## Finding Coordinates for Restaurants

To get latitude and longitude for your restaurants:

1. **Google Maps Method:**
   - Go to [Google Maps](https://maps.google.com/)
   - Search for the restaurant
   - Right-click on the location marker
   - Click "What's here?"
   - The coordinates will appear at the bottom

2. **Bulk Method:**
   - Use a geocoding service like [Geocodio](https://www.geocod.io/)
   - Upload addresses in bulk
   - Download coordinates

## Customization

### Colors
Edit the CSS variables in `/Users/hans/code/Site/css/style.css`:

```css
:root {
    --primary-color: #2563eb;  /* Change to your preferred color */
    --primary-dark: #1e40af;
    /* ... other colors */
}
```

### Fonts
Replace the Google Fonts import in `index.html` with your preferred font.

### Layout
Modify grid columns in `style.css`:
- `.gear-grid`, `.photos-grid`, `.books-grid` - adjust `minmax()` values

## Testing Locally

Simply open `index.html` in your web browser. The Google Sheets and Maps integration will work once you've added your API keys.

## Troubleshooting

**Restaurant data not loading:**
- Check that your Google Sheets API key is correct
- Verify the spreadsheet ID
- Make sure the spreadsheet is publicly viewable
- Check browser console for errors

**Map not displaying:**
- Verify Google Maps API key
- Ensure Maps JavaScript API is enabled
- Check that you have valid coordinates in your spreadsheet

**Images not showing:**
- Make sure image paths are correct
- Images should be in `/Users/hans/code/Site/images/`
- Use relative paths like `images/photo.jpg`

## File Structure

```
Site/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Store all images here
└── README.md           # This file
```

## License

This is your personal website - use it however you'd like!
