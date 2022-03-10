import { UserLogin, UserLoginResponse } from "../../types/userPymeTypes";

export interface LoginRequest {
    type: string,
    loginError?: Error,
    response?: UserLoginResponse
  }
  
  const attemptLogin: Function = (
    request: LoginRequest
  ): LoginRequest => {
    return {
      type: request.type,
    };
  };
  
  const loginAccepted: Function = (
    request: LoginRequest
  ): LoginRequest => {
    return {
      type: request.type,
      response: request.response,
    };
  };

  const loginDeclined: Function = (
    request: LoginRequest
  ): LoginRequest => {
    return {
      type: request.type,
      response: request.response,
      loginError: request.loginError,
    };
  };
  
  export default {
    attemptLogin,
    loginAccepted,
    loginDeclined
  };