import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// export const initFirebase = () => {
//     // const apiKey = process.env.REACT_APP_API_KEY;
//     // const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
//     // const projectId = process.env.REACT_APP_PROJECT_ID;
//     // const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
//     // const messagingSenderId = process.env.REACT_APP_MSG_SENDER_ID;
//     // const appId = process.env.REACT_APP_ID;
//     // const measurementId = process.env.REACT_APP_MEASUREMENT_ID;

//     return app;
//     };
    
const firebaseConfig = {
    apiKey: "AIzaSyD7N4AFXc9S0jRWYI_v0QvzFni36m8sDjo",
    authDomain: "portal-esg.firebaseapp.com",
    projectId: "portal-esg",
    storageBucket: "portal-esg.appspot.com",
    messagingSenderId: "686734819601",
    appId: "1:686734819601:web:bc9887e8f752824bfcccb0",
    measurementId: "G-Z8HJ49S6RJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };