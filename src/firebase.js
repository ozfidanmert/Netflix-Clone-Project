
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAPg5XB3qvNeGRhZJC9Ewlgw_mR9LmwkEQ",
  authDomain: "nety-a9ca8.firebaseapp.com",
  projectId: "nety-a9ca8",
  storageBucket: "nety-a9ca8.appspot.com",
  messagingSenderId: "493610170315",
  appId: "1:493610170315:web:724cd787b004b3d420684e",
  measurementId: "G-T0L1B0HHLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


//* Kullanıcı kaydı oluşturma fonk.
const signup = async (name, lastname, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user;

    //* yeni kullanıcıyı ekler
    await setDoc(doc(db, "user", user.uid), {
      uid: user.uid,
      name,
      lastname,
      authProvider: "local",
      email,
    })
    toast.success("Tebrikler! Başarılı bir şekilde kayıt oldun.")

  } catch (error) {
    console.error(error)
    toast.error(error.code.toUpperCase().split('/')[1].split('-').join(' '))
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    toast.success("Tebrikler! Giriş Yaptın.")

  } catch (error) {
    console.error(error)
    toast.error(error.code.toUpperCase().split('/')[1].split('-').join(' '))
  }
}

const logout = async () => {
  try {

    const user = auth.currentUser

    if (user) {
      toast.success("Çıkış yaptın! Görüşmek üzere...")
    }
    await signOut(auth)

  } catch (error) {
    console.error(error)
  }
}

export { signup, login, logout, auth, db }