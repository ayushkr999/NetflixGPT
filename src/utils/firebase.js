import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getEnv } from "./constant";

const firebaseConfig = {
  apiKey: getEnv("REACT_APP_FIREBASE_API_KEY", "AIzaSyAospYRS1blHvOjDYnf-XDKIlL3PgSdYqc"),
  authDomain: getEnv("REACT_APP_FIREBASE_AUTH_DOMAIN", "netflix-gpt-9f7ca.firebaseapp.com"),
  projectId: getEnv("REACT_APP_FIREBASE_PROJECT_ID", "netflix-gpt-9f7ca"),
  storageBucket: getEnv("REACT_APP_FIREBASE_STORAGE_BUCKET", "netflix-gpt-9f7ca.firebasestorage.app"),
  messagingSenderId: getEnv("REACT_APP_FIREBASE_MESSAGING_SENDER_ID", "203387071268"),
  appId: getEnv("REACT_APP_FIREBASE_APP_ID", "1:203387071268:web:17fff8736fd5c0ccf321b1"),
};

// Initialize Firebase safely without duplicate initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export default app;
