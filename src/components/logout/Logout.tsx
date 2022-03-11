import React, { useState, useEffect } from "react";
import "./Logout.scss";

import LogoutComponent from "./LogoutComponent";

const Login = () => {
  const [mode, setMode] = useState("logout");

  return (
    <div className={`app app--is-${mode}`}>
      <LogoutComponent mode={mode} />
    </div>
  );
};

export default Login;
