import{getAuth} from "firebase/auth"
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCWX5LIX1ZxlOB9ksK4nUIIkEkgOpT8oLs",
  authDomain: "fir-561cc.firebaseapp.com",
  projectId: "fir-561cc",
  storageBucket: "fir-561cc.firebasestorage.app",
  messagingSenderId: "166950667388",
  appId: "1:166950667388:web:f0aaf1aaa3892ea013b5f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 export const db = getFirestore(app);
 export const provider = new GoogleAuthProvider()

 export default auth