/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        FIREBASE_apiKey: process.env.FIREBASE_apiKey,
        FIREBASE_authDomain: process.env.FIREBASE_authDomain,
        FIREBASE_projectId: process.env.FIREBASE_projectId,
        FIREBASE_storageBucket: process.env.FIREBASE_storageBucket,
        FIREBASE_messagingSenderId: process.env.FIREBASE_messagingSenderId,
        FIREBASE_appId: process.env.FIREBASE_appId,
        FIREBASE_measurementId: process.env.FIREBASE_measurementId,
        NODE_SERVER: process.env.NODE_SERVER,
        PYTHON_SERVER: process.env.PYTHON_SERVER,
    },
    images: {
        domains: [
            "tailwindui.com",
            "images.unsplash.com",
            "robohash.org",
            "dummyimage.com",
            "firebasestorage.googleapis.com",
        ],
    },
};
