// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkW6Xbp1SudauRK-dXgJhXGNsIfEEcAfE",
  authDomain: "canvamini-78507.firebaseapp.com",
  projectId: "canvamini-78507",
  storageBucket: "canvamini-78507.firebasestorage.app",
  messagingSenderId: "132949136554",
  appId: "1:132949136554:web:423f80d7caab21c8e2acd3",
  measurementId: "G-ZWKQ5SDS29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
