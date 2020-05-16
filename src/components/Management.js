import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { Link } from "react-router-dom";

const Management = () => {
  const [list, setList] = useState([]);
  const [serchtext, setSerchTeaxt] = useState("");
  const db = firebase.firestore();

  const getData = async (serchtext) => {
    if (serchtext) {
      let colRef = db.collection("EntryDate");
      const serchsnapshots = await colRef.get();
      let serchdocs = [];
      serchsnapshots.docs.map((doc) => {
        if (
          doc.data().name === serchtext ||
          doc.data().email === serchtext ||
          doc.data().status === serchtext
        ) {
          return serchdocs.push(doc.data());
        }
        return;
      });
      await setList(serchdocs);
    } else {
      const colRef = db.collection("EntryDate");
      const snapshots = await colRef.get();
      const docs = snapshots.docs.map((doc) => doc.data());
      await setList(docs);
    }
  };

  //データ取得
  useEffect(() => {
    getData(serchtext);
  }, []);

  return (
    <div>
      <h4>管理画面</h4>
      <input
        className="form-control"
        id="exampleInputTitle"
        defaultValue={serchtext}
        onChange={(e) => setSerchTeaxt(e.target.value)}
      />
      <button className="btn btn-primary" onClick={() => getData(serchtext)}>
        検索
      </button>

      <h4>エントリー者一覧</h4>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">名前</th>
            <th scope="col">Email</th>
            <th scope="col">ステータス</th>
            <th scope="col">詳細</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.status}</td>
              <td>
                <Link
                  to={{
                    pathname: "/Detail",
                    state: {
                      docId: item.docId,
                      name: item.name,
                      email: item.email,
                      age: item.age,
                      job: item.job,
                      status: item.status,
                      reason: item.reason,
                    },
                  }}
                >
                  詳細
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Management;
