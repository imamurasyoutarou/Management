import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/firestore";
// require("firebase/functions");

const Confirmation = () => {
  const location = useLocation();
  const history = useHistory();
  var db = firebase.firestore();
  const { name, email, age, job, reason } = location.state;

  useEffect(() => {
    if (!name) {
      history.push({
        pathname: "/",
      });
    }
  });

  const firestoreAdd = () => {
    db.collection("EntryDate").doc("Data").set({
      name: name,
      email: email,
      age: age,
      job: job,
      reason: reason,
    });
  };

  const mailFnction = () => {
    let data = {};
    data.name = name;
    data.email = email;
    data.content = reason;

    // let sendMail = firebase.functions().httpsCallable("sendMail");
    // sendMail(data);
  };

  const hadleClickButton = () => {
    firestoreAdd();
    mailFnction();
  };

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan="2" scope="col">
              エントリー情報
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">名前</th>
            <th>{name}</th>
          </tr>
          <tr>
            <th scope="row">Email</th>
            <th>{email}</th>
          </tr>
          <tr>
            <th scope="row">年齢</th>
            <th scope="row">{age}</th>
          </tr>
          <tr>
            <th scope="row">希望職種</th>
            <th scope="row">{job}</th>
          </tr>
          <tr>
            <th scope="row">希望理由</th>
            <th scope="row">{reason}</th>
          </tr>
        </tbody>
      </table>
      <button onClick={hadleClickButton}>送信</button>
    </div>
  );
};

export default Confirmation;
