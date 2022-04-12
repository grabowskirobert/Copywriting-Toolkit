import { getAuth } from 'firebase/auth'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCNvkuajRJloP5c22SZ_O0lvBvqDlJARnE',
  authDomain: 'copywriting-toolkit.firebaseapp.com',
  projectId: 'copywriting-toolkit',
  storageBucket: 'copywriting-toolkit.appspot.com',
  messagingSenderId: '287829564531',
  appId: '1:287829564531:web:0ee494167db4a4acf4de06',
  measurementId: 'G-ZVG9V1VSG1',
}

const app: FirebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
