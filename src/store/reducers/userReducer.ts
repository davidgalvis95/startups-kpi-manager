import { UserDataType } from "../../types/userPymeTypes";
import { UserRelatedRequest } from "../actions/userActions";
import { UserActions } from "../actions/ActionTypes";


interface UserStatus {
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

const defaultState: UserStatus = {
  userOperationLoading: false,
  user: undefined,
  errorOnUserOperation: undefined,
};

const pictureChangeReducer = (
  state = defaultState,
  action: UserRelatedRequest
): UserStatus => {
  switch (action.type) {
    case UserActions.LOADING_USER_CREATION_OR_FETCHING:
      return new UserStatusImpl(true, undefined, undefined);
    case UserActions.USER_CREATED:
      return new UserStatusImpl(false, action.user, undefined);
    case UserActions.USER_FETCHED:
      return new UserStatusImpl(false, action.user, undefined);
    case UserActions.USER_UPDATED:
      return new UserStatusImpl(false, action.user, undefined);
    case UserActions.USER_ERROR:
      return new UserStatusImpl(false, undefined, action.errorOnUserOp);
    default:
      return state;
  }
};

export default pictureChangeReducer;
