# 🍳 RecipeApp

RecipeApp is a full-stack mobile application for discovering, posting, and saving recipes. It's built with **React Native (Expo)** on the frontend and a **Node.js / Express / MongoDB** REST API on the backend, with **Firebase Authentication** for user accounts and **AWS S3** for recipe image storage.

This repository contains both halves of the project:

```
ReactNative_RecipeApp/
├── frontend/   → React Native (Expo) mobile app
└── backend/    → Express + MongoDB REST API
```

## Features

- 🔐 **Authentication** – Sign up / log in with Firebase Auth
- 📖 **Browse Recipes** – View all recipes, organized by category and difficulty
- ✍️ **Add Recipes** – Authenticated users can post their own recipes with images
- ⭐ **Favorites** – Save and manage favorite recipes
- 🗂️ **My Recipes** – View and manage recipes you've personally posted
- 🛠️ **Admin Panel** – Admin-only category management screen
- 🖼️ **Image Uploads** – Recipe images uploaded to AWS S3 via the backend
- 📶 **Offline Detection** – Notifies users when they lose internet connectivity

## Tech Stack

| Layer        | Technology |
|--------------|------------|
| Mobile App   | React Native, Expo, NativeWind (Tailwind), Zustand, React Navigation |
| Auth         | Firebase Authentication |
| Backend API  | Node.js, Express |
| Database     | MongoDB (Mongoose) |
| File Storage | AWS S3 |
| Deployment   | EAS Build (frontend), Azure Web App (backend) |

## Project Structure

```
ReactNative_RecipeApp/
├── frontend/
│   ├── App.js                 # Root navigation (Drawer + Tabs)
│   ├── Screens/                # App screens (Sign in, Add Recipe, Admin, etc.)
│   ├── Tabs/                   # Bottom tab navigator screens
│   ├── Components/             # Reusable UI components
│   ├── Store/                  # Zustand state management + API calls
│   ├── Firebase/               # Firebase config & auth setup
│   └── assets/                 # Images, icons, splash screens
│
└── backend/
    ├── server.js               # Express app entry point
    ├── routes/                 # API route definitions
    ├── Functions/              # Business logic per resource
    ├── model/                  # Mongoose schemas
    └── AWS/                    # S3 client setup
```

## Getting Started

This is a monorepo-style layout — the frontend and backend are run and configured **independently**. See the dedicated README in each folder for full setup instructions:

- 📱 [`frontend/README.md`](./frontend/README.md) — running the mobile app with Expo
- 🖥️ [`backend/README.md`](./backend/README.md) — running the API server

### Quick Start

1. **Start the backend first** (the app needs a live API to fetch data):
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Then start the frontend**, pointing it at your backend's URL:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Prerequisites

- Node.js v18+ and npm
- Expo CLI (`npm install -g expo-cli`) or use `npx expo`
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- An AWS account with an S3 bucket (for image uploads)
- A Firebase project with Authentication enabled

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push to the branch and open a Pull Request

## License

This project is licensed under the MIT License.
