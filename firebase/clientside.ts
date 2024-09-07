import { initializeApp } from 'firebase/app' 
import {
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  setPersistence, 
  inMemoryPersistence, 
  GoogleAuthProvider, 
  signInWithPopup, 
  getIdToken, 
  signOut, 
  sendEmailVerification, 
} from 'firebase/auth'

const runtime = useRuntimeConfig()

const app = initializeApp({
  apiKey: runtime.public.firebaseApiKey,
  authDomain: runtime.public.firebaseAuthDomain,
  projectId: runtime.public.firebaseProjectId,
  storageBucket: runtime.public.firebaseStorageBucket,
  messagingSenderId: runtime.public.firebaseMessagingSenderId,
  appId: runtime.public.firebaseAppId,
  measurementId: runtime.public.firebaseMeasurementId,
})

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  setPersistence, 
  inMemoryPersistence, 
  provider, 
  signInWithPopup, 
  getIdToken, 
  signOut, 
  sendEmailVerification, 
}
