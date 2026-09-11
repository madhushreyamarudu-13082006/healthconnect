import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1CTwni_Uyx4plrBNc-q3n934NzNorTZk",
  authDomain: "healthconnect-b23c8.firebaseapp.com",
  projectId: "healthconnect-b23c8",
  storageBucket: "healthconnect-b23c8.firebasestorage.app",
  messagingSenderId: "80964254232",
  appId: "1:80964254232:web:a8b88426766aed353de16d",
  measurementId: "G-6KHXJLVG4Q"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };