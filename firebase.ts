// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "firebase/firestore";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
const runtimeConfig = useRuntimeConfig();

const firebaseConfig = {
  apiKey: runtimeConfig.firebaseApiKey,
  authDomain: "brainiacaichat.firebaseapp.com",
  projectId: "brainiacaichat",
  storageBucket: "brainiacaichat.appspot.com",
  messagingSenderId: runtimeConfig.firebaseMessagingSenderId,
  appId: runtimeConfig.firebaseAppId,
  measurementId: runtimeConfig.firebaseMeasurementId,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const dataBase = getFirestore(app);

export {
  addDoc,
  auth,
  collection,
  dataBase,
  doc,
  getDoc,
  provider,
  setDoc,
  signInWithPopup,
  signOut,
  updateDoc,
  arrayUnion,
  arrayRemove,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
