import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { timeCurrentIso8601 } from "../utils";
require("firebase/functions");

const Confirmation = () => {
  const location = useLocation();
  const history = useHistory();
  const db = firebase.firestore();
  const { name, email, age, job, reason } = location.state;

  useEffect(() => {
    if (!name) {
      history.push({
        pathname: "/",
      });
    }
  });

  const firestoreAdd = () => {
    const docId = db.collection("EntryDate").doc().id;
    db.collection("EntryDate").doc(docId).set({
      docId: docId,
      name: name,
      email: email,
      age: age,
      job: job,
      reason: reason,
      time: timeCurrentIso8601(),
      status: "未対応",
    });
  };

  const mailFnction = () => {
    let data = {
      name: name,
      email: email,
      age: age,
      job: job,
      reason: reason,
    };

    let sendMail = firebase.functions().httpsCallable("sendMail");
    sendMail(data);
  };

  const hadleClickButton = () => {
    // firestoreAdd();
    mailFnction();
    // history.push({
    //   pathname: "/",
    // });
  };

  return (
    <div>
      <h4>確認画面</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan={2} scope="col">
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
      <button className="btn btn-primary" onClick={hadleClickButton}>
        送信
      </button>
    </div>
  );
};

export default Confirmation;
