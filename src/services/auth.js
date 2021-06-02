import { useState } from "react";
import {
  googleProvider,
  facebookProvider,
  githubProvider,
  twitterProvider,
} from "../config/auth-config";
import firebase from "../config/firebase";
import { store } from "react-notifications-component";
import db from "./db";

const logUser = (user) => {
  if (user.additionalUserInfo.isNewUser) {
    db.collection("users")
      .add({ email: user.user.email, stays: null })
      .then(console.log("New user added to db"))
      .catch((error) => console.log(error));
  }
};
const handleError = (error) => {
  store.addNotification({
    title: "Error!",
    message: error.message,
    type: "danger",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3500,
    },
    slidingEnter: {
      swipe: {
        duration: 400,
        timingFunction: "ease-out",
        delay: 0,
      },
      fade: {
        duration: 400,
        timingFunction: "ease-out",
        delay: 0,
      },
    },
  });
};
export const googleAuth = () => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      logUser(result);
    })
    .catch((error) => {
      handleError(error);
    });
};
export const facebookAuth = () => {
  firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then((result) => {
      logUser(result);
    })
    .catch((error) => {
      handleError(error);
    });
};

export const githubAuth = () => {
  firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((result) => {
      logUser(result);
    })
    .catch((error) => {
      handleError(error);
    });
};
export const twitterAuth = () => {
  firebase
    .auth()
    .signInWithPopup(twitterProvider)
    .then((result) => {
      logUser(result);
    })
    .catch((error) => {
      handleError(error);
    });
};
export const emailAuth = (user) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((result) => {
      logUser(result);
    })
    .catch((error) => {
      handleError(error);
    });
};
export const createAccount = (user) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((result) => {
      logUser(result);
    })
    .catch((error) => {
      handleError(error);
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
