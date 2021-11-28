import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const firebaseConfig = {
    apiKey: publicRuntimeConfig.FIREBASE_apiKey,
    authDomain: publicRuntimeConfig.FIREBASE_authDomain,
    projectId: publicRuntimeConfig.FIREBASE_projectId,
    storageBucket: publicRuntimeConfig.FIREBASE_storageBucket,
    messagingSenderId: publicRuntimeConfig.FIREBASE_messagingSenderId,
    appId: publicRuntimeConfig.FIREBASE_appId,
    measurementId: publicRuntimeConfig.FIREBASE_measurementId,
    databaseURL: publicRuntimeConfig.FIREBASE_databaseURL,
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();

export default firebaseApp;
