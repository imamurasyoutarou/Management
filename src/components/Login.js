import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const history = useHistory();

  const hadleClickLoginCheck = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push({
          pathname: "/Management",
        });
      })
      .catch(() => {
        alert("ログイン情報が違います");
      });
  };

  const unCreatavle = email === "" || password === "";
  return (
    <div>
      <h4>ログイン画面</h4>
      <label htmlFor="exampleInputEmail">Email</label>

      <input
        className="form-control"
        id="exampleInputEmail"
        defaultValue={email}
        onChange={(e) => SetEmail(e.target.value)}
      />
      <label htmlFor="exampleInputEmail">Password</label>

      <input
        className="form-control"
        id="exampleInputEmail"
        defaultValue={password}
        onChange={(e) => SetPassword(e.target.value)}
      />
      <button
        className="btn btn-primary"
        disabled={unCreatavle}
        onClick={hadleClickLoginCheck}
      >
        ログイン
      </button>
    </div>
  );
};
export default Login;
