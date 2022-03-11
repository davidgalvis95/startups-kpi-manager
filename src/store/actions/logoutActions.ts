export interface LogoutRequest {
  type: string;
}

const clear: Function = (request: LogoutRequest): LogoutRequest => {
  return {
    type: request.type,
  };
};

const logout: Function = (request: LogoutRequest): LogoutRequest => {
  return {
    type: request.type,
  };
};

const loggedOut: Function = (request: LogoutRequest): LogoutRequest => {
  return {
    type: request.type,
  };
};

const notLoggedOut: Function = (request: LogoutRequest): LogoutRequest => {
  return {
    type: request.type,
  };
};

export default {
  logout,
  loggedOut,
  clear
};
