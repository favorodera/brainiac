import { getApps, initializeApp, cert } from 'firebase-admin/app' 
import { getAuth } from 'firebase-admin/auth' 
import { getFirestore,FieldValue } from 'firebase-admin/firestore' 

const runtime = useRuntimeConfig()

const app = getApps().length === 0
  ? initializeApp({ credential: cert(runtime.firebaseServiceAccount) })
  : getApps()[0]

const auth = getAuth(app)

const database = getFirestore(app)

export { auth, database,app,FieldValue }
