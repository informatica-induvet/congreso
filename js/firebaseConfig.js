// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyCCoAvbBK2Q0mdygKt06iaBI9dICSXUJVE",
    authDomain: "promos-induvet.firebaseapp.com",
    projectId: "promos-induvet",
    storageBucket: "promos-induvet.firebasestorage.app",
    messagingSenderId: "634462478777",
    appId: "1:634462478777:web:6bad90141f3b34d6359668"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Function to save registration data
export const saveRegistro = async (name, email, phone, invoice, location, product, quantity) => {
  try {
    await addDoc(collection(db, "participaciones"), {
      nombre: name,
      email: email,
      telefono: phone,
      factura: invoice,
      sucursal: location,
      fecha: new Date(),
      producto: product,
      cantidad: quantity
    });
    console.log("Registro guardado con éxito.");
  } catch (error) {
    console.error("Error al guardar el registro:", error);
  }
};

console.log("El archivo firebaseConfig.js se cargó correctamente.");