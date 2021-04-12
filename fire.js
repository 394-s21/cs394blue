import firebase from "firebase/app";
import "firebase/database";

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

firebase.initializeApp(firebaseConfig);

export { firebase };