// Import necessary functions from the Firebase client-side SDK
import { initializeApp } from 'firebase/app' // For initializing Firebase app
import {
  getAuth, // For client-side authentication
  createUserWithEmailAndPassword, // For creating users with email and password
  signInWithEmailAndPassword, // For signing in users with email and password
  setPersistence, // For setting authentication persistence
  inMemoryPersistence, // For in-memory authentication persistence
  GoogleAuthProvider, // For Google sign-in
  signInWithPopup, // For popup-based sign-in methods
  getIdToken, // For getting user ID tokens
  signOut, // For signing out users
  sendEmailVerification, // For sending email verification links
} from 'firebase/auth'

// Retrieve client-side Firebase configuration from runtime config
const runtime = useRuntimeConfig()

// Initialize Firebase app with client-side configuration
const app = initializeApp({
  apiKey: runtime.public.firebaseApiKey,
  authDomain: runtime.public.firebaseAuthDomain,
  projectId: runtime.public.firebaseProjectId,
  storageBucket: runtime.public.firebaseStorageBucket,
  messagingSenderId: runtime.public.firebaseMessagingSenderId,
  appId: runtime.public.firebaseAppId,
  measurementId: runtime.public.firebaseMeasurementId,
})

// Get the Firebase Authentication instance for client-side operations
const auth = getAuth(app)

// Create a GoogleAuthProvider instance for Google sign-in
const provider = new GoogleAuthProvider()

// Export necessary Firebase Authentication functions and the GoogleAuthProvider instance
export {
  auth, // Firebase Authentication instance
  createUserWithEmailAndPassword, // Function to create users with email and password
  signInWithEmailAndPassword, // Function to sign in users with email and password
  setPersistence, // Function to set authentication persistence
  inMemoryPersistence, // In-memory authentication persistence option
  provider, // GoogleAuthProvider instance for Google sign-in
  signInWithPopup, // Function for popup-based sign-in methods
  getIdToken, // Function to get user ID tokens
  signOut, // Function to sign out users
  sendEmailVerification, // Function to send email verification links
}
