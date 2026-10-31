import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Without config (e.g. a local build with no VITE_FIREBASE_* vars) getAuth throws
// at import time and blanks the whole site, so login/comments just switch off instead.
const app = firebaseConfig.apiKey ? initializeApp(firebaseConfig) : null;
if (!app) console.warn("Firebase env vars missing: login and comments are disabled.");
export const auth = app && getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = app && getFirestore(app);
