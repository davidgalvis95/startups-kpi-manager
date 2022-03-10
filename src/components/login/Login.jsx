import React, { useState } from "react";
import LoginComponent from "./LoginComponent"
import "./Login.scss";

const Login = () => {
  const [mode, setMode] = useState("login");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("enviando!!!");
  };
  return (
    <div className={`app app--is-${mode}`}>
      <LoginComponent mode={mode} onSubmit={submitHandler} />
    </div>
  );
};

export default Login;
