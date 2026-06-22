# 📱 RecipeApp — Frontend

The mobile client for RecipeApp, built with **React Native** and **Expo**. It connects to the [RecipeApp backend](../backend/README.md) for recipe/category/favorites data and uses **Firebase** for user authentication.

## Features

- **User Authentication** — Sign up and log in via Firebase
- **Recipe Browsing** — View all recipes, filter by category and difficulty
- **Add Recipe** — Authenticated users can create recipes with an uploaded image
- **My Recipes** — View/manage recipes you've posted
- **Favorites** — Add/remove recipes from your favorites list
- **Admin Category Management** — Admin-only screen to add/remove categories
- **Offline Detection** — Alerts the user when network connectivity is lost

## Tech Stack

- **React Native** 0.81 + **Expo** 54
- **React Navigation** (Drawer + Bottom Tabs)
- **Zustand** for state management
- **Firebase Auth** with AsyncStorage persistence
- **NativeWind** (Tailwind CSS for React Native)
- **Expo Image Picker** for selecting/uploading recipe photos

## Project Structure

```
frontend/
├── App.js                  # Root navigator (Drawer + conditional admin/user routes)
├── Screens/                 # Sign in/up, Add Recipe, Admin Category, Settings, etc.
├── Tabs/                    # Bottom tab screens (Home, Favorites)
├── Components/              # Card, Sign_In, Sign_Up, Drawer content, etc.
├── Store/
│   ├── Store.js              # Zustand stores (recipes, favorites, categories, user)
│   └── config.js             # Reads SERVER_URL from Expo config
├── Firebase/
│   └── Firebase.js           # Firebase app + auth initialization
├── assets/                   # Icons, splash screens, images
├── app.json                  # Expo app config (incl. SERVER_URL under "extra")
└── eas.json                  # EAS Build profiles (dev / preview / production)
```

## Prerequisites

- Node.js v18 or later
- npm or yarn
- Expo CLI (`npm install -g expo-cli`) — or just use `npx expo`
- The [RecipeApp backend](../backend/README.md) running locally or deployed
- A Firebase project (Authentication enabled)

## Installation

1. Clone the repository and move into the frontend folder:
   ```bash
   git clone https://github.com/ebaadraheem/RecipeApp.git
   cd RecipeApp/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

This app does **not** read a `.env` file directly — the API base URL is configured through **Expo's app config** (`app.json` → `expo.extra.SERVER_URL`) and read at runtime via `expo-constants` in `Store/config.js`.

### 1. Set the backend URL

Open `app.json` and update the `extra.SERVER_URL` value to point at your running backend:

```json
{
  "expo": {
    "extra": {
      "SERVER_URL": "http://localhost:3000"
    }
  }
}
```

> For physical-device testing, use your machine's LAN IP (e.g. `http://192.168.1.10:3000`) instead of `localhost`, since the phone can't resolve your computer's `localhost`.

If you're building with **EAS**, the equivalent values live in `eas.json` under each build profile's `env.SERVER_URL` (and `production` pulls from an EAS secret named `SERVER_URL`).

### 2. Firebase configuration

Firebase config currently lives in `Firebase/Firebase.js`. If you're standing up your **own** Firebase project, replace the `firebaseConfig` object with your project's credentials from the Firebase console:

```js
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};
```

> ⚠️ **Security note:** Firebase web API keys are safe to ship in a client app (they identify your project, not a secret), but you should still lock down access using [Firebase Security Rules](https://firebase.google.com/docs/rules) and restrict the key in the Google Cloud Console for production apps.

### 3. Admin access

The app currently checks for a single hardcoded admin UID in `Store/Store.js` (`IsAdmin`). Update this UID to your own Firebase user's UID to access the Admin Category screen:

```js
IsAdmin: user ? user.uid === "your-firebase-uid-here" : false,
```

## Running the App

Start the Metro bundler / Expo Dev Tools:

```bash
npm start
```

Then choose a platform:

```bash
npm run android   # Run on Android emulator/device
npm run ios        # Run on iOS simulator/device (macOS only)
npm run web        # Run in the browser
```

Or scan the QR code shown in the terminal with the **Expo Go** app on your phone.

## Building for Production

This project uses **EAS Build**:

```bash
npx eas build --profile preview --platform android
npx eas build --profile production --platform all
```

Make sure `SERVER_URL` is set correctly for each profile in `eas.json` before building.

## Notes

- The backend repository/folder is referenced as `RecipeApp_Backend` — see [`../backend/README.md`](../backend/README.md) for setup.
- Styling is done with **NativeWind**; Tailwind classes are available directly on React Native components.
