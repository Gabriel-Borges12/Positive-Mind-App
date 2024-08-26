import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa o Firestore

const firebaseConfig = {
  apiKey: "AIzaSyD_Jh9mic3StjEPajei82QjZBPrLRueQEM",
  authDomain: "positivemind-9937c.firebaseapp.com",
  projectId: "positivemind-9937c",
  storageBucket: "positivemind-9937c.appspot.com",
  messagingSenderId: "61713422871",
  appId: "1:61713422871:web:55415bfca3f27028e71a52",
  measurementId: "G-EFDDNGPJWF"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializa o Firestore

export { db };