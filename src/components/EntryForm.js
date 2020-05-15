import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

function EntryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(15);
  const [job, setJob] = useState("プログラマー");
  const [reason, setReason] = useState("");
  const history = useHistory();
  const handleClickRouting = () => {
    history.push({
      pathname: "/Confirmation",
      state: { name: name, email: email, age: age, job: job, reason: reason },
    });
  };

  const unCreatavle = name === "" || email === "" || reason === "";

  return (
    <div>
      <h4>エントリー画面</h4>
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
      <button onClick={handleClickRouting} disabled={unCreatavle}>
        確認画面へ
      </button>
    </div>
  );
}

export default withRouter(EntryForm);
