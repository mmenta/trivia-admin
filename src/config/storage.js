import { initializeApp, storage } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBXFEkNhGKJgP_We4zacdi7PwFG38KD2pw",
  authDomain: "trivia-7527d.firebaseapp.com",
  projectId: "trivia-7527d",
  storageBucket: "trivia-7527d.appspot.com",
  messagingSenderId: "172629526227",
  appId: "1:172629526227:web:7ac74c94fad60874003626",
  measurementId: "G-3L3BWRRVYM"
};

// Initialize Firebase
initializeApp(firebaseConfig);
var store = storage();
export default store;