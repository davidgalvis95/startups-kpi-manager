import { UserLoginResponse } from "../../types/userPymeTypes";
import { LoginActions } from "../actions/ActionTypes";
import { LoginRequest } from "../actions/loginActions";

export interface LoginStatus {
  loginAttemptLoading: boolean;
  accepted: boolean;
  finishedOk: boolean;
  response?: UserLoginResponse;
  loginError?: Error;
}

class LoginStatusImpl implements LoginStatus {
  loginAttemptLoading: boolean;
  accepted: boolean;
  finishedOk: boolean;
  response?: UserLoginResponse;
  loginError?: Error;

  constructor(
    public loading: boolean,
    public loginAccepted: boolean,
    public finishedSuccesfully: boolean,
    public responseData: UserLoginResponse | undefined,
    public error: Error | undefined
  ) {
    this.loginAttemptLoading = loading;
    this.accepted = loginAccepted;
    this.finishedOk = finishedSuccesfully;
    this.response = responseData;
    this.loginError = error;
  }
}

export const defaultLoginState: LoginStatus = {
  loginAttemptLoading: false,
  accepted: false,
  finishedOk: false,
  response: undefined,
  loginError: undefined,
};

const loginReducer = (
  state = defaultLoginState,
  action: LoginRequest
): LoginStatus => {
  switch (action.type) {
    case LoginActions.ATTEMPT:
      return new LoginStatusImpl(true, false, false, undefined, undefined);
    case LoginActions.ACCEPTED:
      return new LoginStatusImpl(
        false,
        true,
        false,
        action.response,
        undefined
      );
    case LoginActions.DECLINED:
      return new LoginStatusImpl(
        false,
        false,
        false,
        undefined,
        action.loginError
      );
    case LoginActions.FINISHED_OK:
      return new LoginStatusImpl(
        state.loginAttemptLoading,
        state.accepted,
        true,
        state.response,
        state.loginError
      );
    case LoginActions.CLEAR:
      return defaultLoginState;
    default:
      return state;
  }
};

export default loginReducer;
