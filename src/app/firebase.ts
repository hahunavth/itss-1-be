import admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: 'AIzaSyBnWrkJuzSQEiyop9XI4aWRQolbbcmX_Bg',
  authDomain: 'itss-1-be.firebaseapp.com',
  projectId: 'itss-1-be',
  storageBucket: 'itss-1-be.appspot.com',
  messagingSenderId: '513575793287',
  appId: '1:513575793287:web:28a8408cc5c05319b03e22',
  measurementId: 'G-B7KXPZZTD0',
};

export const storageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o`;

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert('./serviceAccount.json'),
  storageBucket: firebaseConfig.storageBucket,
});
// Cloud storage
// const bucket = admin.storage().bucket();

export default admin;
