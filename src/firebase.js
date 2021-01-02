import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC_KL75wjYak3eFpCfiJNr-ns3y3xvgOx8",
    authDomain: "react-social-app-24b28.firebaseapp.com",
    projectId: "react-social-app-24b28",
    storageBucket: "react-social-app-24b28.appspot.com",
    messagingSenderId: "541252284799",
    appId: "1:541252284799:web:7ff5a57a9cde35d65f2a4a"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
