import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

let app;
export let auth: any;
export let db: any;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  if (!auth) {
    console.error("Firebase auth is not initialized");
    throw new Error("Firebase is not initialized");
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  if (auth) {
    return signOut(auth);
  }
};

// MJ Commit
