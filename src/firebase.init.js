// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5yghYBNqW1mrHzfsJWMnu3iHg7AeUZuw",
  authDomain: "create-a-website-like-tw-b0760.firebaseapp.com",
  projectId: "create-a-website-like-tw-b0760",
  storageBucket: "create-a-website-like-tw-b0760.appspot.com",
  messagingSenderId: "533406032698",
  appId: "1:533406032698:web:dc90e93aa9cb230b57e603",
  measurementId: "G-LHVL131EQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app)
export default auth