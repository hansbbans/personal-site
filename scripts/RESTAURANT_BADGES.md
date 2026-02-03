# Restaurant Badge Updater

A script to cross-reference your restaurant data with Eater 38, Infatuation, and Michelin lists.

## Sources to Check

### Eater 38 Lists (by city)
- NYC: https://ny.eater.com/maps/best-new-york-restaurants-38-map
- Chicago: https://chicago.eater.com/maps/best-restaurants-chicago-eater-38
- Philly: https://philly.eater.com/maps/best-restaurants-philadelphia-eater-38
- Denver: https://denver.eater.com/maps/best-restaurants-denver-eater-38
- Phoenix: https://phoenix.eater.com/maps/best-restaurants-phoenix-eater-38
- And more at: https://www.eater.com/eater-38

### Infatuation Guides
- NYC: https://www.theinfatuation.com/new-york/guides/best-restaurants-nyc
- Search pattern: `https://www.theinfatuation.com/[city]/guides/best-restaurants-[city]`

### Michelin Guide
- NYC: https://ny.eater.com/maps/michelin-starred-restaurants-nyc-2024
- Official: https://guide.michelin.com/us/en/article/michelin-guide-ceremony/all-the-stars-in-the-michelin-guide-to-new-york-city-2025
- Wikipedia (comprehensive lists): https://en.wikipedia.org/wiki/List_of_Michelin-starred_restaurants_in_New_York_City

## Data Fields to Update

Add these fields to restaurant objects in `data/food-data.json`:

```json
{
  "onEaterList": true,
  "onInfatuationList": true,
  "michelinStars": 1, // 1, 2, or 3
  "michelinBibGourmand": true
}
```

## Badge Display Priority

1. **Michelin Stars** (3⭐, 2⭐, 1⭐) - highest priority
2. **Michelin Bib Gourmand** (🍽️ Bib)
3. **Hans Favorite** (❤️)
4. **Eater 38** (🏆)
5. **Infatuation** (🔥)
6. **Google Rating** (⭐ 4.5+)

## Manual Process (for now)

1. Visit the Eater 38 page for your city
2. Open browser console and run scraping script (see `scripts/scrape-eater.js`)
3. Copy the restaurant names
4. Search your `food-data.json` for matches
5. Add `"onEaterList": true` to matching restaurants

6. Repeat for Infatuation and Michelin lists

## Future: Automated Script

Ideally, create a script that:
- Fetches the HTML from each list URL
- Extracts restaurant names using CSS selectors
- Fuzzy matches against your restaurant database
- Updates the JSON automatically
- Runs on a schedule (monthly/quarterly)

## Notes

- Eater 38 lists are updated quarterly
- Michelin Guide is updated annually (November)
- Infatuation updates their guides regularly
- Restaurant names may vary slightly between sources (use fuzzy matching)
