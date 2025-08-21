// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJqjodUM1Gf4xmS77wcOcZbyZ8fG4uXKs",
  authDomain: "my-portfolio-b6547.firebaseapp.com",
  projectId: "my-portfolio-b6547",
  storageBucket: "my-portfolio-b6547.firebasestorage.app",
  messagingSenderId: "882195988407",
  appId: "1:882195988407:web:ad46efdb7fdb9efba33232",
  measurementId: "G-G7VC4V1RJK"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
