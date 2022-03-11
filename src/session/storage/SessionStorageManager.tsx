import { defaultKpiState, KpiStatus } from "../../store/reducers/kpiReducer";
import {
  defaultLoginState,
  LoginStatus,
} from "../../store/reducers/loginReducer";
import {
  defaultLogoutState,
  LogoutStatus,
} from "../../store/reducers/logoutReducer";
import {
  defaultPictureState,
  PictureUploadStatus,
} from "../../store/reducers/pictureChangeReducer";
import { defaultPymeState, PymeStatus } from "../../store/reducers/pymeReducer";
import { RootState } from "../../store/reducers/rootReducer";
import {
  defaultaNavbarState,
  SideBarStatus,
} from "../../store/reducers/sideNavBarStatusReducer";
import { defaultUserState, UserStatus } from "../../store/reducers/userReducer";

export class SessionStorageManager {
  currentState: RootState = {
    sideNavBarStatusReducer: defaultaNavbarState,
    pictureChangeReducer: defaultPictureState,
    kpiReducer: defaultKpiState,
    pymeReducer: defaultPymeState,
    userReducer: defaultUserState,
    loginReducer: defaultLoginState,
    logoutReducer: defaultLogoutState,
  };
  constructor() {}

  buildState(
    sideNavBarState: SideBarStatus,
    pictureState: PictureUploadStatus,
    kpiState: KpiStatus,
    pymeState: PymeStatus,
    userState: UserStatus,
    loginState: LoginStatus,
    logoutState: LogoutStatus
  ): RootState {
    return {
      sideNavBarStatusReducer: sideNavBarState,
      pictureChangeReducer: pictureState,
      kpiReducer: kpiState,
      pymeReducer: pymeState,
      userReducer: userState,
      loginReducer: loginState,
      logoutReducer: logoutState,
    };
  }

  storeSessionState(state: RootState): void {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("sessionState", serializedState);
    } catch {}
  }

  getSessionStateFromLocalStorage(): RootState | undefined {
    try {
      const serializedState = localStorage.getItem("sessionState");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }
}
