// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp_0J-Ejp3Ra_jhl0bpA05Z40pEba5LpI",
  authDomain: "superrabbithero-d28ad.firebaseapp.com",
  projectId: "superrabbithero-d28ad",
  storageBucket: "superrabbithero-d28ad.appspot.com",
  messagingSenderId: "1001601054901",
  appId: "1:1001601054901:web:750109108e47d5d1b466fc",
  measurementId: "G-4Z4MT2MJXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const storage = getStorage(app);
const db = getFirestore(app)

export { db };