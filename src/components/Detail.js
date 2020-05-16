import React, { useState } from "react";
import { useHistory, withRouter, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
function Detail() {
  const location = useLocation();
  const history = useHistory();
  const [name, setName] = useState(location.state.name);
  const [email, setEmail] = useState(location.state.email);
  const [age, setAge] = useState(location.state.age);
  const [job, setJob] = useState(location.state.job);
  const [reason, setReason] = useState(location.state.reason);
  const [stetus, setStetus] = useState(location.state.stetus);
  const [docId] = useState(location.state.docId);
  const db = firebase.firestore();

  const handleClickDUpdete = () => {
    const userRef = db.collection("EntryDate").doc(docId);
    userRef.update({
      docId: docId,
      name: name,
      email: email,
      age: age,
      job: job,
      reason: reason,
      status: stetus,
    });
    history.push({
      pathname: "/Management",
    });
  };
  const handleClickDelete = () => {
    db.collection("EntryDate").doc(docId).delete();
  };
  const ManagementRouting = () => {
    history.push({
      pathname: "/Management",
    });
  };

  const unCreatavle = name === "" || email === "" || reason === "";

  return (
    <div>
      <h4>詳細画面</h4>
      <label htmlFor="exampleInputTitle">名前</label>

      <input
        className="form-control"
        id="exampleInputTitle"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="exampleInputEmail">Email</label>

      <input
        className="form-control"
        id="exampleInputEmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="GroupSelectAge">年齢</label>
      {(() => {
        let i;
        const ageItems = [];
        for (i = 15; i < 100; i++) {
          ageItems.push(
            <option key={i} value={i}>
              {i}歳
            </option>
          );
        }
        return (
          <select
            onChange={(e) => setAge(e.target.value)}
            value={age}
            className="custom-select"
            id="GroupSelectAge"
          >
            >{ageItems}
          </select>
        );
      })()}
      <label htmlFor="exampleInputJobs">希望職種</label>
      <select
        value={job}
        onChange={(e) => setJob(e.target.value)}
        className="custom-select"
        id="exampleInputJobs"
      >
        <option value="プログラマー">プログラマー</option>
        <option value="デザイナー">デザイナー</option>
        <option value="ディレクター">ディレクター</option>
      </select>

      <label htmlFor="exampleInputBody">希望理由</label>
      <textarea
        className="form-control"
        id="exampleInputBody"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <label htmlFor="exampleInputStetus">ステータス</label>

      <select
        value={stetus}
        onChange={(e) => setStetus(e.target.value)}
        className="custom-select"
        id="exampleInputStetus"
      >
        <option value="未対応">未対応</option>
        <option value="対応済み">対応ずみ</option>
      </select>

      <button
        onClick={handleClickDUpdete}
        className="btn btn-primary"
        disabled={unCreatavle}
      >
        更新
      </button>

      <button className="btn btn-danger" onClick={handleClickDelete}>
        削除
      </button>
      <button className="btn btn-info" onClick={ManagementRouting}>
        戻る
      </button>
    </div>
  );
}

export default withRouter(Detail);
