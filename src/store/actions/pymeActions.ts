import { StartUpType } from "../../types/userPymeTypes";
import { PymeActions } from "./ActionTypes";

export interface PymeRelatedRequest {
  type: PymeActions;
  pyme?: StartUpType;
  pymes?: StartUpType[];
  userRights?: string;
  errorOnPymeOp?: Error;
}

export class PymeRelatedRequestImpl implements PymeRelatedRequest {
  type: PymeActions;
  pyme?: StartUpType;
  pymes?: StartUpType[];
  userRights?: string;
  errorOnPymeOp?: Error;

  constructor(
    public typeOfAction: PymeActions,
    public incomingPyme: StartUpType | undefined,
    public incomingPymes: StartUpType[] | undefined,
    public userRights1: string | undefined,
    public errorData: Error | undefined
  ) {
    this.type = typeOfAction;
    this.pyme = incomingPyme;
    this.pymes = incomingPymes;
    this.userRights = userRights1;
    this.errorOnPymeOp = errorData;
  }

  public getType(): string {
    return this.type;
  }
}

const clear: Function = (request: PymeRelatedRequest): PymeRelatedRequest => {
  return {
    type: request.type,
  };
};

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
    userRights: request.userRights,
  };
};

const gotPyme: Function = (request: PymeRelatedRequest): PymeRelatedRequest => {
  return {
    type: request.type,
    pyme: request.pyme,
    userRights: request.userRights,
  };
};

const gotPymes: Function = (
  request: PymeRelatedRequest
): PymeRelatedRequest => {
  return {
    type: request.type,
    pymes: request.pymes,
    userRights: request.userRights,
  };
};

const pymeCreated: Function = (
  request: PymeRelatedRequest
): PymeRelatedRequest => {
  return {
    type: request.type,
    pyme: request.pyme,
    userRights: request.userRights,
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
  clear
};
