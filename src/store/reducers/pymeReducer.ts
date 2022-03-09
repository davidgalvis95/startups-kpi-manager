import { StartUpType } from "../../types/userPymeTypes";
import { PymeRelatedRequest } from "../actions/pymeActions";
import { PymeActions } from "../actions/ActionTypes";


interface PymeStatus {
  pymeOperationLoading: boolean;
  pyme?: StartUpType;
  pymes?: StartUpType[];
  errorOnPymeOperation?: Error;
}

class PymeStatusImpl implements PymeStatus {
  pymeOperationLoading: boolean;
  pyme?: StartUpType;
  pymes?: StartUpType[];
  errorOnPymeOperation?: Error;

  constructor(
    public loading: boolean,
    public pymeData: StartUpType | undefined,
    public pymesData: StartUpType[] | undefined,
    public errorData: Error | undefined
  ) {
    this.pymeOperationLoading = loading;
    this.pyme = pymeData;
    this.pymes = pymesData;
    this.errorOnPymeOperation = errorData;
  }
}

const defaultState: PymeStatus = {
  pymeOperationLoading: false,
  pyme: undefined,
  pymes: undefined,
  errorOnPymeOperation: undefined,
};

const pictureChangeReducer = (
  state = defaultState,
  action: PymeRelatedRequest
): PymeStatus => {
  switch (action.type) {
    case PymeActions.LOADING_PYME_CREATION_OR_FETCHING:
      return new PymeStatusImpl(true, undefined, undefined, undefined);
    case PymeActions.PYME_CREATED:
      return new PymeStatusImpl(false, action.pyme, undefined, undefined);
    case PymeActions.PYME_FETCHED:
      return new PymeStatusImpl(false, undefined, action.pymes, undefined);
    case PymeActions.PYMES_FETCHED:
      return new PymeStatusImpl(false, action.pyme, undefined, undefined);
    case PymeActions.PYME_UPDATED:
      return new PymeStatusImpl(false, action.pyme, undefined, undefined);
    case PymeActions.PYME_ERROR:
      return new PymeStatusImpl(
        false,
        undefined,
        undefined,
        action.errorOnPymeOp
      );
    default:
      return defaultState;
  }
};

export default pictureChangeReducer;
