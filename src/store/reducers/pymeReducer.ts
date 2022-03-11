import { StartUpType } from "../../types/userPymeTypes";
import { PymeRelatedRequest } from "../actions/pymeActions";
import { PymeActions } from "../actions/ActionTypes";

export interface PymeStatus {
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

export const defaultPymeState: PymeStatus = {
  pymeOperationLoading: false,
  pyme: undefined,
  pymes: undefined,
  errorOnPymeOperation: undefined,
};

const addNewPymeDetailToNonExistentPymes = (
  pyme?: StartUpType
): StartUpType[] | undefined => {
  if (!pyme) {
    return undefined;
  }
  return [pyme];
};

const addNewPymeDetailToExistentPymes = (
  pymes: StartUpType[],
  pyme?: StartUpType
): StartUpType[] => {
  if (!pyme) return pymes;
  const newPymes = [...pymes];
  newPymes.push(pyme);
  return newPymes;
};

const updatePymeDetailOnExistentPymes = (
  pymes: StartUpType[],
  pyme?: StartUpType
): StartUpType[] => {
  if (!pyme) return pymes;
  const newPymes: StartUpType[] = [...pymes];
  const index: number = newPymes.indexOf(
    newPymes.filter((oldPyme) => oldPyme.pymeId === oldPyme.pymeId)[0]
  );
  newPymes[index] = pyme;
  return newPymes;
};

const pictureChangeReducer = (
  state = defaultPymeState,
  action: PymeRelatedRequest
): PymeStatus => {
  const pyme = state.pyme || undefined;
  const pymes = state.pymes || undefined;
  switch (action.type) {
    case PymeActions.LOADING_PYME_CREATION_OR_FETCHING:
      return new PymeStatusImpl(true, pyme, pymes, undefined);
    case PymeActions.PYME_CREATED:
      const newPymes = pymes
        ? addNewPymeDetailToExistentPymes(pymes, action.pyme)
        : addNewPymeDetailToNonExistentPymes(action.pyme);
      return new PymeStatusImpl(false, action.pyme, newPymes, undefined);
    case PymeActions.PYME_FETCHED:
      return new PymeStatusImpl(false, action.pyme, pymes, undefined);
    case PymeActions.PYMES_FETCHED:
      return new PymeStatusImpl(false, pyme, action.pymes, undefined);
    case PymeActions.PYME_UPDATED:
      if (action.userRights === "ADMIN") {
        const newUpdatedPymes = updatePymeDetailOnExistentPymes(
          action.pymes!,
          action.pyme
        );
        return new PymeStatusImpl(
          false,
          action.pyme,
          newUpdatedPymes,
          undefined
        );
      } else {
        return new PymeStatusImpl(false, action.pyme, pymes, undefined);
      }
    case PymeActions.PYME_ERROR:
      return new PymeStatusImpl(
        false,
        undefined,
        undefined,
        action.errorOnPymeOp
      );
    case PymeActions.CLEAR:
      return defaultPymeState;
    default:
      return state;
  }
};

export default pictureChangeReducer;
