import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyC7zl1G4ftZ4UitctRUL6cLuIzsMATqGqE",
    authDomain: "take-five-6ea15.firebaseapp.com",
    projectId: "take-five-6ea15",
    storageBucket: "take-five-6ea15.appspot.com",
    messagingSenderId: "823930985758",
    appId: "1:823930985758:web:a2731d64527c35c77bfd0f",
    measurementId: "G-JBXWGJ2XTM",
  });
  firebase.analytics();
} else {
  firebase.app();
}
const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/signedIn",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};
export const GoogleSignButton = () => {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
};
export const SignOut = () => {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
};
export const auth = firebase.auth();
export const db = firebase.firestore();
export const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp();
export const storageRef = firebase.storage().ref();
export const gameRoomRef = db.collection("game-rooms");
export const usersRef = db.collection("users");
export const avatarRef = db.collection("avatars");
