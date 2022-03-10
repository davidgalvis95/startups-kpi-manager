import React, { useState } from "react";
import LoginForm from "./LoginForm"
import "./Login.scss";

const LoginComponent = (props) => {
  const [mode, setMode] = useState("login");
  const toggleMode = () => {
    var newMode = mode === "login" ? "signup" : "login";
    setMode(newMode);
  };

  return (
    <div>
      <div
        className={`form-block-wrapper form-block-wrapper--is-${mode}`}
      ></div>
      <section className={`form-block form-block--is-${mode}`}>
        <header className="form-block__header">
          <h1>{mode === "login" ? "Welcome back!" : "Sign up"}</h1>
          <img
            className="profile"
            src={"/assets/images/cube_logo.jpg"}
            width="100%"
          />
          <div className="form-block__toggle-block">
            <span>
              {mode === "login" ? "Aun no" : "Ya"} eres parte?, da click aqui
              &#8594;
            </span>
            <input id="form-toggler" type="checkbox" onClick={toggleMode} />
            <label htmlFor="form-toggler"></label>
          </div>
        </header>
        <LoginForm mode={mode} onSubmit={props.onSubmit} />
      </section>
    </div>
  );
};

export default LoginComponent;
