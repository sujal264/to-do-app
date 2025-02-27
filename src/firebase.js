import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDx6K2GmvTaWKKn8N71RV8KEyNXgivABmI",
    authDomain: "todo-a6f5a.firebaseapp.com",
    projectId: "todo-a6f5a",
    storageBucket: "todo-a6f5a.firebasestorage.app",
    messagingSenderId: "650323667792",
    appId: "1:650323667792:web:4d3b58abe1913a758b9a55"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };



