import { LogoutRequest } from "../actions/logoutActions";

export interface LogoutStatus {
  isLoading: boolean;
  logguedOut: boolean;
}

export const defaultLogoutState: LogoutStatus = {
  isLoading: false,
  logguedOut: true,
};

const logoutReducer = (
  state = defaultLogoutState,
  action: LogoutRequest
): LogoutStatus => {
  switch (action.type) {
    case "LOGOUT":
      return { isLoading: true, logguedOut: false };
    case "LOGGED_OUT":
      return { isLoading: true, logguedOut: true };
    case "NOT_LOGGED_OUT":
      return { isLoading: false, logguedOut: false };
    case "CLEAR":
      return defaultLogoutState;
    default:
      return state;
  }
};

export default logoutReducer;
