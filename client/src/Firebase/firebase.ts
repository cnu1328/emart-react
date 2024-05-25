// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAIYiMJEtozpA1CkHwq7SK1A8TNEvKuFCo",
  authDomain: "images-bucket-62acb.firebaseapp.com",
  projectId: "images-bucket-62acb",
  storageBucket: "images-bucket-62acb.appspot.com",
  messagingSenderId: "58176737276",
  appId: "1:58176737276:web:9809b0710705e18cedec79",
  measurementId: "G-6L02TWE0X1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);





