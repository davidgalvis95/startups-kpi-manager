import { UserDataType } from "../../types/userPymeTypes";
import { UserActions } from "./ActionTypes";

export interface UserRelatedRequest {
  type: UserActions;
  user?: UserDataType;
  errorOnUserOp?: Error;
}

export class UserRelatedRequestImpl implements UserRelatedRequest {
  type: UserActions;
  user?: UserDataType;
  errorOnUserOp?: Error;

  constructor(
    public typeOfAction: UserActions,
    public incomingUser: UserDataType | undefined,
    public errorData: Error | undefined
  ) {
    this.type = typeOfAction;
    this.user = incomingUser;
    this.errorOnUserOp = errorData;
  }

  public getType(): string {
    return this.type;
  }
}

const clear: Function = (request: UserRelatedRequest): UserRelatedRequest => {
  return {
    type: request.type,
  };
};

const loadingUserOperation: Function = (
  request: UserRelatedRequest
): UserRelatedRequest => {
  return {
    type: request.type,
  };
};

const updatedUser: Function = (
  request: UserRelatedRequest
): UserRelatedRequest => {
  return {
    type: request.type,
    user: request.user,
  };
};

const gotUser: Function = (request: UserRelatedRequest): UserRelatedRequest => {
  return {
    type: request.type,
    user: request.user,
  };
};

const userCreated: Function = (
  request: UserRelatedRequest
): UserRelatedRequest => {
  return {
    type: request.type,
    user: request.user,
  };
};

const errorOnUserOperation: Function = (
  request: UserRelatedRequest
): UserRelatedRequest => {
  return {
    type: request.type,
    errorOnUserOp: request.errorOnUserOp,
  };
};

export default {
  loadingUserOperation,
  userCreated,
  gotUser,
  updatedUser,
  errorOnUserOperation,
  clear
};
