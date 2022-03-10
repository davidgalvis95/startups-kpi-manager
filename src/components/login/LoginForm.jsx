import React from "react";
import LoginInput from "./LoginInput";
import "./Login.scss";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="form-block__input-wrapper">
        <div className="form-group form-group--login">
          <LoginInput
            type="text"
            id="username"
            label="Correo Electrónico"
            disabled={props.mode === "signup"}
          />
          <LoginInput
            type="password"
            id="password"
            label="Contraseña"
            disabled={props.mode === "signup"}
          />
        </div>
        <div className="form-group form-group--signup">
          <LoginInput
            type="text"
            id="fullname"
            label="Nombre Completo"
            disabled={props.mode === "login"}
          />
          <LoginInput
            type="email"
            id="email"
            label="Correo Electrónico"
            disabled={props.mode === "login"}
          />
          <LoginInput
            type="password"
            id="createpassword"
            label="Contraseña"
            disabled={props.mode === "login"}
          />
          <LoginInput
            type="password"
            id="repeatpassword"
            label="Confirmar Contraseña"
            disabled={props.mode === "login"}
          />
        </div>
      </div>
      <button className="button button--primary full-width" type="submit">
        {props.mode === "login" ? "Ingresa" : "Registrate"}
      </button>
    </form>
  );
};

export default LoginForm;
