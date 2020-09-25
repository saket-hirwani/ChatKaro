import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBQFWsgB9zqNHdAO3Ts1cMIBiZH3tnjIKM",
    authDomain: "chatting-app-a4d30.firebaseapp.com",
    databaseURL: "https://chatting-app-a4d30.firebaseio.com",
    projectId: "chatting-app-a4d30",
    storageBucket: "chatting-app-a4d30.appspot.com",
    messagingSenderId: "937558461485",
    appId: "1:937558461485:web:db47695146ee43cf283ca4",
    measurementId: "G-JE60V99TSP"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider}
  export default db;