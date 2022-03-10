import { UserLoginResponse } from "../../types/userPymeTypes";
import { LoginActions } from "../actions/ActionTypes";
import { LoginRequest } from "../actions/loginActions";

interface LoginStatus {
  loginAttemptLoading: boolean;
  accepted: boolean;
  response?: UserLoginResponse;
  loginError?: Error;
}

class LoginStatusImpl implements LoginStatus {
  loginAttemptLoading: boolean;
  accepted: boolean;
  response?: UserLoginResponse;
  loginError?: Error;

  constructor(
    public loading: boolean,
    public loginAccepted: boolean,
    public responseData: UserLoginResponse | undefined,
    public error: Error | undefined
  ) {
    this.loginAttemptLoading = loading;
    this.accepted = loginAccepted;
    this.response = responseData;
    this.loginError = error;
  }
}

const defaultState: LoginStatus = {
  loginAttemptLoading: false,
  accepted: false,
  response: undefined,
  loginError: undefined,
};

const loginReducer = (
  state = defaultState,
  action: LoginRequest
): LoginStatus => {
  switch (action.type) {
    case LoginActions.ATTEMPT:
      return new LoginStatusImpl(true, false, undefined, undefined);
    case LoginActions.ACCEPTED:
      return new LoginStatusImpl(false, true, action.response, undefined);
    case LoginActions.DECLINED:
      return new LoginStatusImpl(false, false, undefined, action.loginError);
    default:
      return defaultState;
  }
};

export default loginReducer;
