import { SideBarStatusRequest } from "../actions/sideNavBarStatus";

export interface SideBarStatus {
  isOpen: boolean;
}

class SideBarStatusImpl implements SideBarStatus {
  isOpen: boolean;

  constructor(public newStatus: boolean) {
    this.isOpen = newStatus;
  }

  setIsOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  public getIsOpen() {
    return this.isOpen;
  }
}

export const defaultaNavbarState: SideBarStatus = {
  isOpen: false,
};

const sideNavBarStatusReducer = (
  state = defaultaNavbarState,
  action: SideBarStatusRequest
): SideBarStatus => {
  switch (action.type) {
    case "OPEN":
      return new SideBarStatusImpl(true);
    case "COLLAPSE":
      return new SideBarStatusImpl(false);
    case "CLEAR":
      return defaultaNavbarState;
    default:
      return state;
  }
};

export default sideNavBarStatusReducer;
