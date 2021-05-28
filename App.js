import Navigator from './routes/drawer'
import React from 'react';
import * as firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyBES8nyG7xcMiN_WI0GhoYIYRewJ3JiiuQ",
  authDomain: "setramadministration.firebaseapp.com",
  databaseURL: "https://setramadministration-default-rtdb.firebaseio.com",
  projectId: "setramadministration",
  storageBucket: "setramadministration.appspot.com",
  messagingSenderId: "650733919828",
  appId: "1:650733919828:web:9c0bf179e07e5ff53dd7c1",
  measurementId: "G-XJ2Z1Z1LQJ"
}; 
  firebase.initializeApp(firebaseConfig); 
export default function App() {
  return (
    <Navigator/>
  );
}
