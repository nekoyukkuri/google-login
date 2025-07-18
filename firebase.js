// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCBaWx8XWkZ4hByEvk861p1zP4AI73h2B0",
  authDomain: "login-56835.firebaseapp.com",
  projectId: "login-56835",
  storageBucket: "login-56835.firebasestorage.app",
  messagingSenderId: "966452989756",
  appId: "1:966452989756:web:fa814f6e74bb0cbc3dd839",
  measurementId: "G-9RBJHKQL7Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
