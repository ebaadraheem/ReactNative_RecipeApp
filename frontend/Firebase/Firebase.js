// firebase.js
import { initializeApp, getApps } from "firebase/app";
// *** NEW: Import initializeAuth and persistence utilities ***
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// Import AsyncStorage for session persistence in React Native
import AsyncStorage from "@react-native-async-storage/async-storage"; 


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXYVdXeXugHoATxiugi1fUJOhSVXYDWco",
    authDomain: "recipeapp-68623.firebaseapp.com",
    projectId: "recipeapp-68623",
    storageBucket: "recipeapp-68623.appspot.com",
    messagingSenderId: "112962203301",
    appId: "1:112962203301:web:2710e86135a141910ea74c",
    measurementId: "G-9THP2XPPK5",
};

// Initialize Firebase App (use getApps() to prevent re-initialization in Fast Refresh)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// *** NEW: Initialize Auth with React Native Persistence ***
// This is what registers the 'auth' component!
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Remove unused getAnalytics unless you specifically need it
// const analytics = getAnalytics(app); 

export { app, auth };