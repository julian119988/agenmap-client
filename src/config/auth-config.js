import firebase from "./firebase";

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const emailProvider = new firebase.auth.EmailAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
