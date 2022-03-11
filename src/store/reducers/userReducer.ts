import { UserDataType } from "../../types/userPymeTypes";
import { UserRelatedRequest } from "../actions/userActions";
import { UserActions } from "../actions/ActionTypes";

export interface UserStatus {
  userOperationLoading: boolean;
  user?: UserDataType;
  errorOnUserOperation?: Error;
}

class UserStatusImpl implements UserStatus {
  userOperationLoading: boolean;
  user?: UserDataType;
  errorOnUserOperation?: Error;

  constructor(
    public loading: boolean,
    public userData: UserDataType | undefined,
    public errorData: Error | undefined
  ) {
    this.userOperationLoading = loading;
    this.user = userData;
    this.errorOnUserOperation = errorData;
  }
}

export const defaultUserState: UserStatus = {
  userOperationLoading: false,
  user: undefined,
  errorOnUserOperation: undefined,
};

const pictureChangeReducer = (
  state = defaultUserState,
  action: UserRelatedRequest
): UserStatus => {
  switch (action.type) {
    case UserActions.LOADING_USER_CREATION_OR_FETCHING:
      const user = state.user || undefined;
      return new UserStatusImpl(true, user, undefined);
    case UserActions.USER_CREATED:
      //In the api this should add to the existent users
      return new UserStatusImpl(false, state.user, undefined);
    case UserActions.USER_FETCHED:
      return new UserStatusImpl(false, action.user, undefined);
    case UserActions.USER_UPDATED:
      return new UserStatusImpl(false, action.user, undefined);
    case UserActions.USER_ERROR:
      return new UserStatusImpl(false, undefined, action.errorOnUserOp);
    case UserActions.CLEAR:
      return defaultUserState;
    default:
      return state;
  }
};

export default pictureChangeReducer;
