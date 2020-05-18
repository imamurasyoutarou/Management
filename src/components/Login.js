import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const history = useHistory();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("メールの方式で入力してください")
      .required("入力必須です"),
    password: Yup.string().required("必須入力です"),
  });

  const hadleClickLoginCheck = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(formik.values.email, formik.values.password)
      .then(() => {
        history.push({
          pathname: "/Management",
        });
      })
      .catch(() => {
        alert("ログイン情報が違います");
      });
  };
  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const unCreatavle =
    formik.values.email === "" || formik.values.password === "";

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        name="email"
        className="form-control"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <p className="error">{formik.errors.email}</p>
      ) : null}

      <label htmlFor="name">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        className="form-control"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      {formik.touched.password && formik.errors.password ? (
        <p className="error">{formik.errors.password}</p>
      ) : null}

      <button
        disabled={unCreatavle}
        className="btn btn-primary"
        onClick={hadleClickLoginCheck}
      >
        ログイン
      </button>
    </form>
  );
}

export default Login;
