import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js'

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js'

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc,
  query,
  where,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyBknJqOfLN4Vs_pXdFzGVeXNYOItDvoPgw',
  authDomain: 'licorerafantasma.firebaseapp.com',
  projectId: 'licorerafantasma',
  storageBucket: 'licorerafantasma.appspot.com',
  messagingSenderId: '155235992711',
  appId: '1:155235992711:web:09bb2ab6306583ac95a422',
  measurementId: 'G-W3QW35PG2H',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage()

//agregar datos con id
export const Setregister = (codigo, name, categoria, precio, urlproducto) =>
  setDoc(doc(db, 'Productos', codigo), {
    codigo,
    name,
    categoria,
    precio,
    urlproducto,
  })

//Leer registro especifico
export const Getregister = (codigo) => getDoc(doc(db, 'Productos', codigo))

//Unidad de almacenamiento storage
export const archivoimg = async (file, referencia) => {
  const storageref = ref(storage, `ProductosImg/${referencia + file.name}`)
  await uploadBytes(storageref, file)
  const url = await getDownloadURL(storageref)
  return url
}

//autenticacion de usuario
export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const userCollectionRef = collection(db, 'usuario')

export const q = async (email) => {
  try {
    const querySnapshot = await getDocs(
      query(userCollectionRef, where('email', '==', email))
    )
    return querySnapshot
  } catch (error) {
    throw error
  }
}

// cerrar sesion usuario
export const loginout = () => signOut(auth)

// estado del usuario
export function userstate() {
  onAuthStateChanged(auth, (user) => {
    const uid = user.uid
    console.log(uid)
    if (user) {
    } else {
      window.location.href = '../templates/home.html'
    }
  })
}

//registrar usuario en authentication

export const registerAuth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

//crear datos de usuario

export const CrearUsuario = async (
  identificacion,
  nombre,
  fnacimiento,
  direccion,
  telefono,
  email,
  contra
) => {
  try {
    const docRef = await addDoc(collection(db, 'usuario'), {
      identificacion,
      nombre,
      fnacimiento,
      direccion,
      telefono,
      email,
      contra,
    })
    return docRef
  } catch (error) {
    throw error
  }
}

//mensaje de creacion de cuenta

export const mensajeA = () => sendEmailVerification(auth.currentUser)

// Función para obtener documentos por descripción (categoria)
export async function Getcategoria(categoria) {
  const q = query(collection(db, 'Productos'), where('categoria', '==', categoria));
  const querySnapshot = await getDocs(q);
  console.log("Número de documentos encontrados:", querySnapshot.size);
  return querySnapshot;
}

export async function Getcategorias(categorias) {
  const promises = categorias.map(async (categoria) => {
      const q = query(collection(db, 'Productos'), where('categoria', '==', categoria));
      return await getDocs(q);
  });

  // Esperar a que todas las consultas se resuelvan
  const querySnapshots = await Promise.all(promises);

  // Combinar todos los documentos obtenidos en un solo array
  let combinedResults = [];
  querySnapshots.forEach((snapshot) => {
      snapshot.forEach((doc) => {
          combinedResults.push(doc);
      });
  });

  console.log("Número total de documentos encontrados:", combinedResults.length);
  return combinedResults;
}