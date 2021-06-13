import { createContext, useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../config/firebase";

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsSignedIn(true);
      } else {
        setUser(null);
        setIsSignedIn(false);
      }
    });
  }, [user]);

  const signInContext = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  const signOutContext = () => {
    firebase.auth().signOut();
    setUser(null);
  };

  const getCurrentUserIdToken = () => {
    return firebase.auth().currentUser.getIdToken(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        // setUser,
        signInContext,
        signOutContext,
        getCurrentUserIdToken,
        isSignedIn,
        setIsSignedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
