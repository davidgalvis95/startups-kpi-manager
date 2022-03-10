import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoginComponent from "./LoginComponent";
import useLoginAxios from "../../hooks/useLoginAxios";
import useUserAxios from "../../hooks/useUserAxios";
import usePymeAxios from "../../hooks/usePymeAxios";
import useKpiAxios from "../../hooks/useKpiAxios";
import "./Login.scss";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [loginLoading, setLoginLoading] = useState(false);

  const { accepted, response, loginError } = useSelector(
    (state) => state?.loginReducer
  );
  const { user, errorOnUserOperation } = useSelector(
    (state) => state?.userReducer
  );

  const { pymes, errorOnPymeOperation } = useSelector(
    (state) => state?.pymeReducer
  );

  const { kpis, errorOnKpiOperation } = useSelector(
    (state) => state?.kpiReducer
  );

  const { requestLoginPointer, startLoginOperationPointer } = useLoginAxios();
  const { getUserPointer, startUserOperationPointer } = useUserAxios();
  const { getPymesPointer, startPymeOperationPointer } = usePymeAxios();
  const { getKpisPointer, startKpiOperationPointer } = useKpiAxios();

  useEffect(() => {
    if (accepted) {
      startUserOperationPointer();
      getUserPointer(response.email);
    } else {
      if (loginError) {
        //TODO show a modal with the error
      } else {
        //TODO show something went wrong
      }
    }
  }, [accepted, response]);

  useEffect(() => {
    if (user) {
      if (user.rights === "USER") {
        startKpiOperationPointer();
        getKpisPointer(user.pymeId);
      } else {
        startPymeOperationPointer();
        getPymesPointer();
      }
    } else {
      if (errorOnUserOperation) {
        //TODO show a modal with the error
        setLoginLoading(false);
      } else {
        //TODO show something went wrong
        setLoginLoading(false);
      }
    }
  }, [user, errorOnUserOperation]);

  useEffect(() => {
    if (pymes) {
      setLoginLoading(false);

      //redirect to the StartUpTable component
    } else {
      if (errorOnPymeOperation) {
        console.log(errorOnPymeOperation);
        //TODO show a modal with the error
        setLoginLoading(false);
      } else {
        //TODO show something went wrong
        setLoginLoading(false);
      }
    }
  }, [pymes, errorOnPymeOperation]);

  useEffect(() => {
    if (kpis) {
      setLoginLoading(false);

      //redirect to the Dashboard component
    } else {
      if (errorOnKpiOperation) {
        console.log(errorOnKpiOperation);
        //TODO show a modal with the error
        setLoginLoading(false);
      } else {
        //TODO show something went wrong
        setLoginLoading(false);
      }
    }
  }, [kpis, errorOnKpiOperation]);

  const submitHandler = (e) => {
    e.preventDefault();
    startLoginOperationPointer();
    setLoginLoading(true);
    requestLoginPointer({
      email: e.target[0].value,
      password: e.target[1].value,
    });
  };

  return (
    <div className={`app app--is-${mode}`}>
      {loginLoading ? (
        <div className="ldsSpinnerContainer">
          <div className="ldsSpinner"></div>
        </div>
      ) : (
        <LoginComponent mode={mode} onSubmit={submitHandler} />
      )}
    </div>
  );
};

export default Login;
