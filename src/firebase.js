import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    apiKey: "AIzaSyDYTGQdZsgLfZ6LnkisH-WgOeozBCSwupc",
  authDomain: "messenger-d3559.firebaseapp.com",
  databaseURL: "https://messenger-d3559.firebaseio.com",
  projectId: "messenger-d3559",
  storageBucket: "messenger-d3559.appspot.com",
  messagingSenderId: "464109178666",
  appId: "1:464109178666:web:a5d635a3b07d029e515853",
  measurementId: "G-R9BWPDQXLE"
  
});
const db = firebaseApp.firestore();
const storage = firebase.storage();
export {db,storage} ;