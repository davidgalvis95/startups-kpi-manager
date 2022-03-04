import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './TopNavBarMenu.module.css';
import { SideBarMenuCard } from "../../../types/types";

interface TopNavBarMenuProps {
    photoUrl : string;
}

export function TopNavBarMenu({photoUrl} : TopNavBarMenuProps) {
    return (
            <div className={classes.Navbar}>
                <div className={classes.NavBtn}>
                    {/* TODO fix the appearing and dissapearing of the photo */}
                    {/* <NavLink to="/home"> */}
                        <img className={classes.profile} src={photoUrl} width="100%"/>
                    {/* </NavLink> */}
                </div>
            </div>
    )
}