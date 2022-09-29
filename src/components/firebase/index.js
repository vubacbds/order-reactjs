import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQijFIvbdxgy3oF-19gVHCgjrr5dbT2aE",
  authDomain: "product-oder.firebaseapp.com",
  projectId: "product-oder",
  storageBucket: "product-oder.appspot.com",
  messagingSenderId: "328255215115",
  appId: "1:328255215115:web:5c053e8936150973edd90e",
  measurementId: "G-VZC2VQRKBG",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
