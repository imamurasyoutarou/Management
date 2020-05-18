import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
function EntryForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(15);
  const [job, setJob] = useState("プログラマー");
  const [reason, setReason] = useState("");
  const history = useHistory();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("メールの方式で入力してください"),
  });
  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const ConfirmationRouting = () => {
    history.push({
      pathname: "/Confirmation",
      state: {
        name: name,
        email: formik.values.email,
        age: age,
        job: job,
        reason: reason,
      },
    });
  };
  const LoginRouting = () => {
    history.push({
      pathname: "/Login",
    });
  };

  const unCreatavle =
    name === "" || formik.values.email === "" || reason === "";

  return (
    <form onSubmit={formik.handleSubmit}>
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
        type="email"
        id="exampleInputEmail"
        name="email"
        className="form-control"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      {formik.touched.email && formik.errors.email ? (
        <p className="error">{formik.errors.email}</p>
      ) : null}

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
            onChange={(e) => setAge(Number(e.target.value))}
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
      <button
        className="btn btn-primary"
        onClick={ConfirmationRouting}
        disabled={unCreatavle}
      >
        確認画面へ
      </button>
      <button className="btn btn-info" onClick={LoginRouting}>
        ログイン画面へ
      </button>
    </form>
  );
}

export default withRouter(EntryForm);
