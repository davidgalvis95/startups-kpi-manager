import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./TopNavBarMenu.module.css";
import { SideBarMenuCard } from "../../../types/types";
import { useDispatch } from "react-redux";
import allActions from "../../../store/actions/allActions";

interface TopNavBarMenuProps {
  photoUrl: string;
}

export function TopNavBarMenu({ photoUrl }: TopNavBarMenuProps) {
  const [showLogoutMenu, setShowLogoutMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutActions = allActions.logoutActions;
  const kpiActions = allActions.kpiActions;
  const userActions = allActions.userActions;
  const pymeActions = allActions.pymeActions;
  const loginActions = allActions.loginActions;
  const pictureChangeActions = allActions.pictureChangeActions;
  const sendSetSideBarStatus = allActions.sendSetSideBarStatus;

  const handleLogout = () => {
    setShowLogoutMenu(false);
    dispatch(logoutActions.logout({ type: "LOGOUT" }));
    dispatch(logoutActions.loggedOut({ type: "LOGGED_OUT" }));
    localStorage.clear();
    dispatch(kpiActions.clear({ type: "CLEAR" }));
    dispatch(userActions.clear({ type: "CLEAR" }));
    dispatch(pymeActions.clear({ type: "CLEAR" }));
    dispatch(loginActions.clear({ type: "CLEAR" }));
    dispatch(pictureChangeActions.clear({ type: "CLEAR" }));
    dispatch(sendSetSideBarStatus.clear({ type: "CLEAR" }));
    dispatch(logoutActions.clear({ type: "CLEAR" }));
    navigate("/cube/logout");
  };

  const handleSettings = () => {
    setShowLogoutMenu(false);
  };

  return (
    <div onMouseLeave={() => setShowLogoutMenu(false)}>
      <div className={classes.Navbar}>
        <div
          className={classes.NavBtn}
          onMouseEnter={() => setShowLogoutMenu(true)}
        >
          <img className={classes.profile} src={photoUrl} width="100%" />
          {/* </NavLink> */}
        </div>
      </div>
      {showLogoutMenu ? (
        <div className={classes.LogoutScreen}>
          <div className={classes.listContainer} onClick={() => handleLogout()}>
            <p>Logout</p>
          </div>
          <div
            className={classes.listContainer}
            onClick={() => handleSettings()}
          >
            <p>Settings</p>
          </div>
        </div>
      ) : null}{" "}
    </div>
  );
}
