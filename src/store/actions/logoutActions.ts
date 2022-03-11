export interface LogoutRequest {
    type: string,
  }
  
  const logout: Function = (
    request: LogoutRequest
  ): LogoutRequest => {
    return {
      type: request.type,
    };
  };
  
  const loggedOut: Function = (
    request: LogoutRequest
  ): LogoutRequest => {
    return {
      type: request.type,
    };
  };
  
  export default {
    logout,
    loggedOut
  };