// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQwcnh3SwII883AmTMGsRIAY6p5Lbukhs",
  authDomain: "gcconsulting-todoapp.firebaseapp.com",
  projectId: "gcconsulting-todoapp",
  storageBucket: "gcconsulting-todoapp.appspot.com",
  messagingSenderId: "799250728153",
  appId: "1:799250728153:web:4faaa151713b0d040a2ac8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

//exporting firebase connection
export { db };
