# Google Sheets Template for Restaurant Data

## Setup Instructions

1. Create a new Google Spreadsheet
2. Create one sheet (tab) for each city
3. Name each sheet with the city name (e.g., "New York", "San Francisco", "Tokyo")
4. Use the exact column structure below

## Column Structure

Each sheet should have these columns in this exact order:

| Column | Header    | Description                           | Example                    |
|--------|-----------|---------------------------------------|----------------------------|
| A      | Name      | Restaurant name                       | Joe's Pizza                |
| B      | Address   | Full street address                   | 7 Carmine St, New York, NY |
| C      | Dishes    | Comma-separated dish names            | Margherita, Pepperoni      |
| D      | Latitude  | Decimal latitude coordinate           | 40.7308                    |
| E      | Longitude | Decimal longitude coordinate          | -74.0023                   |

## Example Sheet: "New York"

```
Name                    | Address                           | Dishes                              | Latitude | Longitude
Joe's Pizza             | 7 Carmine St, New York, NY        | Margherita, Pepperoni              | 40.7308  | -74.0023
Katz's Delicatessen     | 205 E Houston St, New York, NY    | Pastrami, Reuben Sandwich          | 40.7223  | -73.9873
Levain Bakery           | 167 W 74th St, New York, NY       | Chocolate Chip Cookie, Oatmeal     | 40.7789  | -73.9810
Xi'an Famous Foods      | 67 Bayard St, New York, NY        | Hand-Ripped Noodles, Lamb Burger   | 40.7159  | -73.9979
```

## Example Sheet: "San Francisco"

```
Name                    | Address                           | Dishes                              | Latitude | Longitude
Tartine Bakery          | 600 Guerrero St, San Francisco    | Morning Bun, Croissant             | 37.7618  | -122.4220
Swan Oyster Depot       | 1517 Polk St, San Francisco       | Clam Chowder, Oysters              | 37.7914  | -122.4213
La Taqueria             | 2889 Mission St, San Francisco    | Carne Asada Burrito                | 37.7518  | -122.4180
Zuni Café               | 1658 Market St, San Francisco     | Roast Chicken, Caesar Salad        | 37.7728  | -122.4211
```

## Example Sheet: "Tokyo"

```
Name                    | Address                           | Dishes                              | Latitude  | Longitude
Sukiyabashi Jiro        | 2-15 Ginza 4-chome, Tokyo         | Omakase Sushi                      | 35.6714   | 139.7635
Ichiran Ramen           | 1-22-7 Shibuya, Tokyo             | Tonkotsu Ramen                     | 35.6602   | 139.7005
Tsukiji Market          | 5-2-1 Tsukiji, Chuo, Tokyo        | Fresh Sashimi, Sea Urchin          | 35.6654   | 139.7707
Narisawa                | 2-6-15 Minami-Aoyama, Tokyo       | Tasting Menu                       | 35.6658   | 139.7151
```

## Tips for Getting Coordinates

### Method 1: Google Maps
1. Go to https://maps.google.com
2. Search for the restaurant
3. Right-click on the location pin
4. Select "What's here?"
5. The coordinates appear at the bottom of the screen
6. Click to copy them

### Method 2: Address Bar
1. Search for the restaurant in Google Maps
2. Look at the URL in your browser
3. Find the `@` symbol followed by coordinates
4. Example: `@37.7618,-122.4220` means latitude 37.7618, longitude -122.4220

### Method 3: Bulk Geocoding
For many restaurants at once:
1. Use a service like Geocodio (https://www.geocod.io/)
2. Upload your list of addresses
3. Download the results with coordinates

## Important Notes

- **First row MUST be headers**: Name, Address, Dishes, Latitude, Longitude
- **Don't skip columns**: Even if you don't have dishes, leave the column empty
- **Coordinates are optional**: If you don't provide lat/lng, the restaurant will still show in the list, just not on the map
- **Dishes can be empty**: If you don't want to list specific dishes, leave column C blank
- **Use decimal degrees**: Not degrees/minutes/seconds (use 40.7308, not 40°43'50.9"N)
- **Negative longitude**: Western hemisphere uses negative values (e.g., -122.4220 for San Francisco)

## Making the Spreadsheet Public

1. Click the "Share" button in the top right
2. Click "Change to anyone with the link"
3. Make sure it's set to "Viewer" permissions
4. Copy the link
5. Extract the Spreadsheet ID from the link

The ID is the long string between `/d/` and `/edit`:
```
https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p/edit
                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                        This is your Spreadsheet ID
```

## Testing Your Spreadsheet

Before using it on your website:
1. Make sure all sheets are named correctly (these become city tabs)
2. Check that coordinates are correct by plotting them in Google Maps
3. Verify the spreadsheet is publicly viewable
4. Test the API URL in your browser:

```
https://sheets.googleapis.com/v4/spreadsheets/YOUR_SPREADSHEET_ID/values/New%20York?key=YOUR_API_KEY
```

Replace `YOUR_SPREADSHEET_ID`, `New%20York` (city name), and `YOUR_API_KEY` with your actual values.
