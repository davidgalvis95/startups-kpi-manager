import { UserLogin, UserLoginResponse } from "../../types/userPymeTypes";

export interface LoginRequest {
  type: string;
  loginError?: Error;
  response?: UserLoginResponse;
}

const clear: Function = (request: LoginRequest): LoginRequest => {
  return {
    type: request.type,
  };
};

const attemptLogin: Function = (request: LoginRequest): LoginRequest => {
  return {
    type: request.type,
  };
};

const loginAccepted: Function = (request: LoginRequest): LoginRequest => {
  return {
    type: request.type,
    response: request.response,
  };
};

const loginDeclined: Function = (request: LoginRequest): LoginRequest => {
  return {
    type: request.type,
    response: request.response,
    loginError: request.loginError,
  };
};

const loginFinishedOk: Function = (request: LoginRequest): LoginRequest => {
  return {
    type: request.type,
  };
};

export default {
  attemptLogin,
  loginAccepted,
  loginDeclined,
  loginFinishedOk,
  clear
};
