// Import necessary functions from the Firebase Admin SDK
import { getApps, initializeApp, cert } from 'firebase-admin/app' // For initializing Firebase Admin app
import { getAuth } from 'firebase-admin/auth' // For server-side authentication
import { getFirestore } from 'firebase-admin/firestore' // For interacting with Firestore database

// Retrieve server-side Firebase configuration from runtime config
const runtime = useRuntimeConfig()

// Initialize Firebase Admin app if not already initialized
// Check if there are any existing Firebase apps initialized
const app = getApps().length === 0
  // If no existing apps, initialize a new app with server-side credentials
  ? initializeApp({ credential: cert(runtime.firebaseServiceAccount) })
  // If an app already exists, use the first one
  : getApps()[0]

// Get the Firebase Authentication instance for server-side operations
const auth = getAuth(app)

// Get the Firestore database instance
const database = getFirestore(app)

// Export the Firebase Authentication and Firestore database instances
export { auth, database,app }
