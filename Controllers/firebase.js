import { 
  initializeApp 
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'

import { 
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js'

import { 
    getAuth, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js'

import{
  getFirestore,
  collection, 
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc 
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
