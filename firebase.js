import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDFEyre-F44Li858TxbjMcbuu8YUp7Znio",
    authDomain: "lifecapsuleservices.firebaseapp.com",
    databaseURL: "https://lifecapsuleservices-default-rtdb.firebaseio.com",
    projectId: "lifecapsuleservices",
    storageBucket: "lifecapsuleservices.appspot.com",
    messagingSenderId: "545126475294",
    appId: "1:545126475294:web:34f146878813a3c66c300f",
    measurementId: "G-GWXNBEBE9N"
  };

async function loginWithEmail (email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
}

async function registerWithEmail (email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

firebase.initializeApp(firebaseConfig);

export { firebase, loginWithEmail, registerWithEmail };