import { LogoutRequest } from "../actions/logoutActions";

interface LogoutStatus {
  isLoading: boolean;
  logguedOut: boolean;
}

const defaultState: LogoutStatus = {
  isLoading: false,
  logguedOut: false,
};

const logoutReducer = (
  state = defaultState,
  action: LogoutRequest
): LogoutStatus => {
  switch (action.type) {
    case "LOGOUT":
      return { isLoading: true, logguedOut: false };
    case "LOGGED_OUT":
      return { isLoading: true, logguedOut: true };
    default:
      return state;
  }
};

export default logoutReducer;
