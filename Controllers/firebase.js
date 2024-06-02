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
    apiKey: "AIzaSyBknJqOfLN4Vs_pXdFzGVeXNYOItDvoPgw",
    authDomain: "licorerafantasma.firebaseapp.com",
    projectId: "licorerafantasma",
    storageBucket: "licorerafantasma.appspot.com",
    messagingSenderId: "155235992711",
    appId: "1:155235992711:web:09bb2ab6306583ac95a422",
    measurementId: "G-W3QW35PG2H"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage();
  
//agregar datos con id
export const Setregister=(codigo,name,descripcion,precio,urlproducto)=> 
  setDoc(doc(db, "Productos", codigo), {
    codigo,
    name,
    descripcion,
    precio,
    urlproducto
  });

  //Leer registro especifico
export const Getregister=(codigo)=> 
  getDoc(doc(db, "Productos", codigo))

  //Unidad de almacenamiento storage
export const archivoimg = async (file, referencia)=>{
  const storageref=ref(storage,`ProductosImg/${referencia+file.name}`)
  await uploadBytes(storageref, file);
  const url = await getDownloadURL(storageref);
  return url;
};