import { color } from "@mui/system";
import { SideBarStatusRequest } from "../actions/sideNavBarStatus";

interface SideBarStatus {
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

const defaultState: SideBarStatus = {
  isOpen: false,
};

const sideNavBarStatusReducer = (
  state = defaultState,
  action: SideBarStatusRequest
):SideBarStatus => {
  switch (action.type) {
    case "OPEN":
      return new SideBarStatusImpl(true);
    case "COLLAPSE":
      return new SideBarStatusImpl(false);
    default:
      return defaultState;
  }
};

export default sideNavBarStatusReducer;
