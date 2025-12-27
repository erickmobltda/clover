# Data Import Guide

This guide explains how to import data from `content.ts` into your Firebase Firestore database.

## Available Import Scripts

- **Menu Items**: `npm run import-menu`
- **Hall of Fame**: `npm run import-hall-of-fame`

## Prerequisites

1. ✅ Firebase project set up (as per `ADMIN_SETUP.md`)
2. ✅ `.env` file configured with Firebase credentials
3. ✅ Dependencies installed (`npm install`)

## How to Run the Import Script

### Step 1: Verify Your Environment

Make sure your `.env` file in the root directory contains all required Firebase variables:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Admin credentials for import script (same as your /admin login)
FIREBASE_ADMIN_EMAIL=your_admin_email@example.com
FIREBASE_ADMIN_PASSWORD=your_admin_password
```

**Important:** The `FIREBASE_ADMIN_EMAIL` and `FIREBASE_ADMIN_PASSWORD` should be the same credentials you use to login to the `/admin` panel in your browser.

### Step 2: Run the Import Script

Simply run:

```bash
npm run import-menu
```

### Step 3: Monitor the Output

The script will:
- ✅ Check each menu item to avoid duplicates
- ✅ Import new items to Firestore
- ✅ Skip items that already exist
- ✅ Show progress for each category
- ✅ Display a summary at the end

Example output:
```
🚀 Starting menu import...

📦 Processing category: SOBREMESAS (sobremesas)
  ✅ Imported: "Petit Gâteau" (R$ 29.00)
  ✅ Imported: "Sorvete Dark Ganache" (R$ 20.00)
  ...

📊 Import Summary:
   Total items: 150
   ✅ Imported: 150
   ⏭️  Skipped (already exist): 0
   ❌ Errors: 0

✨ Import completed!
🎉 All done!
```

## What the Script Does

1. **Reads menu data** from `src/data/content.ts`
2. **Transforms the data** to match Firestore structure:
   - `category` → category ID (e.g., "sobremesas")
   - `name` → item name
   - `description` → item description
   - `price` → converted to `value` (number)
   - `image` → `img_url`
3. **Checks for duplicates** before importing
4. **Uploads to Firestore** collection `menuItems`

## Price Handling

The script handles different price formats:
- **Numbers**: Used directly (e.g., `29` → `29.00`)
- **String "-"**: Converted to `0` (for items without fixed price)
- **Complex strings** (e.g., "+7 / +20"): Converted to `0`

## Troubleshooting

### Error: "Firebase configuration is missing"
- Check that your `.env` file exists and contains all required variables
- Make sure variable names start with `VITE_FIREBASE_`

### Error: "Permission denied" or "Missing or insufficient permissions"
- **Make sure you added `FIREBASE_ADMIN_EMAIL` and `FIREBASE_ADMIN_PASSWORD` to your `.env` file**
- Verify the credentials match your admin user in Firebase Authentication
- Check that Email/Password authentication is enabled in Firebase Console
- The script will authenticate automatically before importing

### Error: "Authentication failed"
- Verify `FIREBASE_ADMIN_EMAIL` and `FIREBASE_ADMIN_PASSWORD` are correct in `.env`
- Make sure the user exists in Firebase Authentication
- Check that Email/Password sign-in method is enabled in Firebase Console

### Items not importing
- Check the browser console or terminal for specific error messages
- Verify your Firebase project ID is correct
- Ensure Firestore is enabled in your Firebase project

## Running Multiple Times

The script is **safe to run multiple times**:
- It checks if items already exist before importing
- Duplicate items (same category + name) will be skipped
- Only new items will be added

## Next Steps

After importing:
1. Visit `/admin` in your browser
2. Login to the admin panel
3. Go to "Gerenciar Menu" to verify all items were imported
4. Edit any items that need adjustments (prices, descriptions, images)

---

# Hall of Fame Import Guide

This guide explains how to import Hall of Fame entries from `content.ts` into your Firebase Firestore database.

## How to Run the Hall of Fame Import Script

### Step 1: Verify Your Environment

Make sure your `.env` file contains the same Firebase and admin credentials as described above.

### Step 2: Run the Import Script

Simply run:

```bash
npm run import-hall-of-fame
```

### Step 3: Monitor the Output

The script will:
- ✅ Check each entry to avoid duplicates (by name)
- ✅ Import new entries to Firestore
- ✅ Skip entries that already exist
- ✅ Convert score strings (e.g., "13 Pints") to liters (number)
- ✅ Set current date as default date
- ✅ Display a summary at the end

Example output:
```
🚀 Starting Hall of Fame import...

  ✅ Imported: "IRINEU" (13L)
  ✅ Imported: "JAYNE" (14L)
  ✅ Imported: "ANDERSON" (12L)

📊 Import Summary:
   Total entries: 3
   ✅ Imported: 3
   ⏭️  Skipped (already exist): 0
   ❌ Errors: 0

✨ Import completed!
🎉 All done!
```

## What the Script Does

1. **Reads Hall of Fame data** from `src/data/content.ts`
2. **Transforms the data** to match Firestore structure:
   - `name` → name (kept as is)
   - `score` → converted to `litters` (number, extracted from strings like "13 Pints")
   - `date` → set to current date (YYYY-MM-DD format)
   - `image` → image URL (kept as is)
3. **Checks for duplicates** before importing (by name)
4. **Uploads to Firestore** collection `hallOfFame`

## Score to Liters Conversion

The script automatically extracts numbers from score strings:
- `"13 Pints"` → `13` liters
- `"14 Pints"` → `14` liters
- If no number is found, it defaults to `0` and shows a warning

## Date Handling

- **Default**: Uses current date (today) in YYYY-MM-DD format
- You can manually edit dates in the admin panel after importing if needed

## Running Multiple Times

The script is **safe to run multiple times**:
- It checks if entries already exist (by name) before importing
- Duplicate entries will be skipped
- Only new entries will be added

## Next Steps

After importing:
1. Visit `/admin` in your browser
2. Login to the admin panel
3. Go to "Gerenciar Hall of Fame" to verify all entries were imported
4. Edit dates or other details if needed

