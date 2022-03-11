export interface SideBarStatusRequest {
  type: string;
}

export class SideBarStatusRequestImpl implements SideBarStatusRequest {
  type: string;

  constructor(public typeOfAction: string) {
    this.type = typeOfAction;
  }

  public getType(): string {
    return this.type;
  }
}

const clear: Function = (
  request: SideBarStatusRequest
): SideBarStatusRequest => {
  return {
    type: request.type,
  };
};

const sendSetSideBarStatus: Function = (
  request: SideBarStatusRequest
): SideBarStatusRequest => {
  return {
    type: request.type,
  };
};

export default {
  sendSetSideBarStatus,
  clear
};
