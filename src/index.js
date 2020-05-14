import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase";
import firebaseConfig from "./firebase/config";
import "bootstrap/dist/css/bootstrap.min.css";

firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
