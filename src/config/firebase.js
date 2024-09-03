
import { initializeApp } from "firebase/app";

 import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGNl5bWdTrXcq9csHsdYUCnkP6zLranj0",
  authDomain: "vite-contact-6c5ff.firebaseapp.com",
  projectId: "vite-contact-6c5ff",
  storageBucket: "vite-contact-6c5ff.appspot.com",
  messagingSenderId: "1060274299940",
  appId: "1:1060274299940:web:5157d2687cb994f9c5e4b1",
  measurementId: "G-CXL2YEJ775"
};


export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);

