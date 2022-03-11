import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoginComponent from "./LoginComponent";
import useLoginAxios from "../../hooks/useLoginAxios";
import useUserAxios from "../../hooks/useUserAxios";
import usePymeAxios from "../../hooks/usePymeAxios";
import useKpiAxios from "../../hooks/useKpiAxios";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import {encrypt} from "../../util/Encryptor"
import { useDispatch } from "react-redux";
import allActions from "../../store/actions/allActions";


const CryptoJS = require("crypto-js");

const Login = () => {
  const [mode, setMode] = useState("login");
  const [loginLoading, setLoginLoading] = useState(false);
  const [user1, setUser] = useState(undefined);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector(
    (state) => state
  ); 

  const { accepted, finishedOk, response, loginError } = useSelector(
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

  const logoutActions = allActions.logoutActions;

  const {
    requestLoginPointer,
    finishLoginGracefullyPointer,
    startLoginOperationPointer,
  } = useLoginAxios();
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
      finishLoginGracefullyPointer();
      navigate("/cube/platform/startup-table")
      dispatch(logoutActions.loggedOut({ type: "NOT_LOGGED_OUT" }));
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
      finishLoginGracefullyPointer();
      const dashboardUrl = `/cube/platform/dashboard/${encrypt(user.pymeId)}`;
      setLoginLoading(false);
      //redirect to the Dashboard component
      navigate(dashboardUrl);
      dispatch(logoutActions.loggedOut({ type: "NOT_LOGGED_OUT" }));

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
