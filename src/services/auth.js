import { useEffect, useState } from "react";
import {
  googleProvider,
  facebookProvider,
  emailProvider,
  githubProvider,
  twitterProvider,
} from "../config/auth-config";
import firebase from "../config/firebase";

export const googleAuth = () => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const facebookAuth = () => {
  firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const githubAuth = () => {
  firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const twitterAuth = () => {
  firebase
    .auth()
    .signInWithPopup(twitterProvider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const logOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Logged out successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const useUserLoggedin = () => {
  const [user, setUser] = useState(undefined);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
  return user;
};
