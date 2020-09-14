import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBa2NeaUk1XpSTJQ2vhl_a3uEAHmWaNulI",
  authDomain: "main-project-2926d.firebaseapp.com",
  databaseURL: "https://main-project-2926d.firebaseio.com",
  projectId: "main-project-2926d",
  storageBucket: "main-project-2926d.appspot.com",
  messagingSenderId: "229608266220",
  appId: "1:229608266220:web:daa743b3b196a7054708c9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
