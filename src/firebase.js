import firebase from 'firebase';
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3wSRppYrftrdoDhhx5IQDRtN_pMQSrvU",
  authDomain: "login-crud-profile.firebaseapp.com",
  databaseURL: "https://login-crud-profile.firebaseio.com",
  projectId: "login-crud-profile",
  storageBucket: "login-crud-profile.appspot.com",
  messagingSenderId: "745007968106",
  appId: "1:745007968106:web:3181f39e055c1b242a3f13"
};
  // Initialize Firebase
  export const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const storage= firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{storage,db,provider, firebase as default}; 