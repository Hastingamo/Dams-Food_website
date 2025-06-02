import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwb9jrWvZLtBAyQkhFjjru7LgDMpRsas8",
  authDomain: "dams-food-website.firebaseapp.com",
  projectId: "dams-food-website",
  storageBucket: "dams-food-website.appspot.com",  // corrected here
  messagingSenderId: "152833830424",
  appId: "1:152833830424:web:ce1a23521357a00632dd6d"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const projectAuth = firebase.auth();

export { projectAuth };
