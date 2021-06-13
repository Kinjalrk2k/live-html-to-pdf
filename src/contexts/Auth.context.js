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

  const signInContext = async () => {
    try {
      const res = await firebase.auth().signInWithPopup(provider);
      setUser(res.user);
      setIsSignedIn(true);
    } catch (e) {
      setUser(null);
      setIsSignedIn(false);
    }
  };

  const signOutContext = () => {
    firebase.auth().signOut();
    setUser(null);
    setIsSignedIn(false);
  };

  const getCurrentUserIdToken = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      return await currentUser.getIdToken(true);
    } else {
      return null;
    }
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
