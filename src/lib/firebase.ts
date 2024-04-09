// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCJeSwlUc16LaCpbuoB20KBPzk1lTie5kQ",
  authDomain: "railway-reservation-csbs.firebaseapp.com",
  databaseURL: "https://railway-reservation-csbs-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "railway-reservation-csbs",
  storageBucket: "railway-reservation-csbs.appspot.com",
  messagingSenderId: "423531585880",
  appId: "1:423531585880:web:f11489659968489728452d",
  measurementId: "G-QPQJEZRD4T"
};

const app = initializeApp(firebaseConfig);
export default app;
// const analytics = getAnalytics(app);