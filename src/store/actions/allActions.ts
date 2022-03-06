import sendSetSideBarStatus, { SideBarStatusRequest } from "./sideNavBarStatus";

export interface AllActions {
    sideNavBarStatusActions: Function
}

const allActions = {
    sendSetSideBarStatus
}

export default allActions;