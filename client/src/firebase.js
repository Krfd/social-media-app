// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDu8ynU1gYnx9p6wG5XT8kPkfjxqPt2eDw",
    // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "project-databases-3e075.firebaseapp.com",
    projectId: "project-databases-3e075",
    storageBucket: "project-databases-3e075.appspot.com",
    messagingSenderId: "866559414523",
    appId: "1:866559414523:web:2416cee2adb5a52740a05e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
