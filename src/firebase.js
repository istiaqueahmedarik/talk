import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    // your config
  
});
const db = firebaseApp.firestore();
const storage = firebase.storage();
export {db,storage} ;
