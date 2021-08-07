import firebase from "firebase/app";
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

export const GoogleSignButton = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <button onClick={signInWithGoogle} className="g-sign-in-button btn">
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        className="icon"
        alt="google sign-in"
      />
      <span className="buttonText"> Sign In With Google</span>
    </button>
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
export const tauntsRef = db.collection("taunts");
