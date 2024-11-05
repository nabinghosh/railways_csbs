// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import 'firebase/compat/auth';
import {getFirestore} from 'firebase/firestore';
import { getDatabase } from "firebase/database";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "",
  authDomain: "railway-reservation-csbs.firebaseapp.com",
  databaseURL: "https://railway-reservation-csbs-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "railway-reservation-csbs",
  storageBucket: "railway-reservation-csbs.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const rdb = getDatabase(app);  //realtime database
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// const analytics = getAnalytics(app);

export { auth, provider, db, rdb, app };
