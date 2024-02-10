import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

console.log("process.env.FIREBASE_API_KEY", process.env.REACT_APP_FIREBASE_API_KEY)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
