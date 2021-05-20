import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

var firebaseConfig = {
    apiKey: "AIzaSyB39gXUxJaHvEXHouMs8pvfhfUy4PTKkj8",
    authDomain: "login-maps-agenda.firebaseapp.com",
    projectId: "login-maps-agenda",
    storageBucket: "login-maps-agenda.appspot.com",
    messagingSenderId: "929689512979",
    appId: "1:929689512979:web:8c53173081592046ac63e6",
    measurementId: "G-G5FJTTW3NQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
