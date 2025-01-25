// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1LAJM2l2K6qsieFFVPdXfKJHn8s0WgdA",
    authDomain: "edumanage-f0f88.firebaseapp.com",
    projectId: "edumanage-f0f88",
    storageBucket: "edumanage-f0f88.firebasestorage.app",
    messagingSenderId: "348318672745",
    appId: "1:348318672745:web:6ecf5f149e98e7dd2bfff8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;