// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARaYSZ4-36xSSDt-qGePLlXK8grRZSZEM",
  authDomain: "finanzas-personales-5d16e.firebaseapp.com",
  projectId: "finanzas-personales-5d16e",
  storageBucket: "finanzas-personales-5d16e.appspot.com",
  messagingSenderId: "758709157624",
  appId: "1:758709157624:web:7077d1c86e54b9fb84050d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);