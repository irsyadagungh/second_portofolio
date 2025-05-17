"use client";

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "irsyad-agung-hidayatullah.firebaseapp.com",
  projectId: "irsyad-agung-hidayatullah",
  storageBucket: "irsyad-agung-hidayatullah.appspot.com",
  messagingSenderId: "44331252675",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-GKG9PB9NLS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)

// Initialize Analytics if supported and in client environment
let analytics;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
export default firestore;
