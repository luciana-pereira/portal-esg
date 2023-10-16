import { initializeApp } from "firebase/app";

export const initFirebase = () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
    const messagingSenderId = process.env.REACT_APP_MSG_SENDER_ID;
    const appId = process.env.REACT_APP_ID;
    const measurementId = process.env.REACT_APP_MEASUREMENT_ID;

    const firebaseConfig = {
        apiKey: apiKey,
        authDomain: authDomain,
        projectId: projectId,
        storageBucket: storageBucket,
        messagingSenderId: messagingSenderId,
        appId: appId,
        measurementId: measurementId
    };
    const app = initializeApp(firebaseConfig);
    return app;
};
