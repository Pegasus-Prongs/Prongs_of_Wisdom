// lib/firebase_admin.js
import admin from 'firebase-admin';
import serviceAccount from '@/serviceAccountKey.json';
import { Firestore } from 'firebase-admin/firestore'; // Import Firestore type

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

const adminDb: Firestore = admin.firestore(); // Explicitly set the type of db
export { adminDb };