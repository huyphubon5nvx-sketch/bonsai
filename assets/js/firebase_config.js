// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPD-FQ-CbzGOilwmj2ql6OT4BzJ3O-v0Y",
  authDomain: "cay-phu-ebf92.firebaseapp.com",
  projectId: "cay-phu-ebf92",
  storageBucket: "cay-phu-ebf92.firebasestorage.app",
  messagingSenderId: "475750546402",
  appId: "1:475750546402:web:c37cad64b4203324dd17bb",
  measurementId: "G-JYWZVLQWPC"
};
const app = initializeApp(firebaseConfig)
console.log(app.name);
export { app }