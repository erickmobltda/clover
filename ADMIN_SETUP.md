# Admin Setup Guide

This guide will help you set up the admin section for the Clover Pub website.

## Prerequisites

1. A Firebase project with Firestore and Authentication enabled
2. Node.js and npm installed

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password authentication
4. Enable Firestore:
   - Go to Firestore Database
   - Create database in production mode
   - Set up security rules (see below)
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Copy the config values to your `.env` file

## Firestore Security Rules

Set up these security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Hall of Fame - read for all, write only for authenticated users
    match /hallOfFame/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Menu Items - read for all, write only for authenticated users
    match /menuItems/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Creating Admin User

1. Go to Firebase Console > Authentication
2. Click "Add user"
3. Enter email and password for your admin account
4. Save the credentials

## Accessing Admin Panel

1. Navigate to `/admin` in your browser
2. Login with the admin credentials you created
3. You'll be redirected to `/admin/dashboard`

## Admin Features

### Hall of Fame Management
- View all Hall of Fame entries
- Add new entries (name, liters, date, image URL)
- Edit existing entries
- Delete entries

### Menu Management
- View all menu items grouped by category
- Filter by category
- Add new menu items (category, name, description, value, image URL)
- Edit existing items
- Delete items

## Data Structure

### Hall of Fame Collection (`hallOfFame`)
```typescript
{
  name: string;
  litters: number;
  date: string; // ISO date string
  image: string; // URL
}
```

### Menu Items Collection (`menuItems`)
```typescript
{
  category: string; // e.g., 'sobremesas', 'petiscos', etc.
  name: string;
  description: string;
  value: number; // Price in R$
  img_url: string; // URL
}
```

## Notes

- The admin section is not visible in the public navigation
- Only accessible via direct URL: `/admin`
- All admin routes require authentication
- The public site will automatically fetch data from Firestore
- If Firestore is unavailable, the site will show empty states gracefully

