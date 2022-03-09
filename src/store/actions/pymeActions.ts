import { StartUpType } from "../../types/userPymeTypes";
import { PymeActions } from "./ActionTypes";

export interface PymeRelatedRequest {
  type: PymeActions;
  pyme?: StartUpType;
  pymes?: StartUpType[];
  errorOnPymeOp?: Error;
}

export class PymeRelatedRequestImpl implements PymeRelatedRequest {
  type: PymeActions;
  pyme: StartUpType;
  pymes: StartUpType[];
  errorOnPymeOp?: Error;

  constructor(
    public typeOfAction: PymeActions,
    public incomingPyme: StartUpType,
    public incomingPymes: StartUpType[],
    public errorData: Error
  ) {
    this.type = typeOfAction;
    this.pyme = incomingPyme;
    this.pymes = incomingPymes;
    this.errorOnPymeOp = errorData;
  }

  public getType(): string {
    return this.type;
  }
}

const loadingPymesOperation: Function = (
  request: PymeRelatedRequest
): PymeRelatedRequest => {
  return {
    type: request.type,
  };
};

const updatedPyme: Function = (
  request: PymeRelatedRequest
): PymeRelatedRequest => {
  return {
    type: request.type,
    pyme: request.pyme,
  };
};

const gotPyme: Function = (request: PymeRelatedRequest): PymeRelatedRequest => {
  return {
    type: request.type,
    pyme: request.pyme,
  };
};

const gotPymes: Function = (
  request: PymeRelatedRequest
): PymeRelatedRequest => {
  return {
    type: request.type,
    pymes: request.pymes,
  };
};

const pymeCreated: Function = (
  request: PymeRelatedRequest
): PymeRelatedRequest => {
  return {
    type: request.type,
    pyme: request.pyme,
  };
};

const errorOnPymeOperation: Function = (
  request: PymeRelatedRequest
): PymeRelatedRequest => {
  return {
    type: request.type,
    errorOnPymeOp: request.errorOnPymeOp,
  };
};

export default {
  loadingPymesOperation,
  pymeCreated,
  gotPyme,
  gotPymes,
  updatedPyme,
  errorOnPymeOperation,
};
