// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API"),
  authDomain: "ideaorbit-68b64.firebaseapp.com",
  projectId: "ideaorbit-68b64",
  storageBucket: "ideaorbit-68b64.firebasestorage.app",
  messagingSenderId: "22091289049",
  appId: "1:22091289049:web:ac58ed2d3e6c26899689c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider};