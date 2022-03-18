import React, { ReactChild, ReactChildren, useEffect, useState } from "react";
import { TopNavBarMenu } from "./horizontal/TopNavBarMenu";
import { SideBarMenu } from "./vertical/SideBarMenu";
import { GoGraph } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FcFactory } from "react-icons/fc";
import { FaUserPlus } from "react-icons/fa";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { SideBarMenuCard, SideBarMenuItem } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducer";
import classes from "./NavBar.module.css";
import { encrypt } from "../../util/Encryptor";

const defaultItems: SideBarMenuItem[] = [
  {
    id: "profile",
    label: "Perfil",
    icon: BsFillPersonFill,
    url: "/cube/platform/profile",
  },
];

const itemsForAdmin: SideBarMenuItem[] = [
  {
    id: "profile",
    label: "Perfil",
    icon: BsFillPersonFill,
    url: "/cube/platform/profile",
  },
  {
    id: "startups",
    label: "Listado de Startups",
    icon: BsGrid1X2Fill,
    url: "/cube/platform/startup-table",
  },
  {
    id: "newPyme",
    label: "Crear Nueva Startup",
    icon: FcFactory,
    url: "/cube/platform/new-pyme",
  },
  {
    id: "newUser",
    label: "Crear Nuevo Usuario",
    icon: FaUserPlus,
    url: "/cube/platform/new-user",
  },
];

const itemsForUser: SideBarMenuItem[] = [
  {
    id: "profile",
    label: "Perfil",
    icon: BsFillPersonFill,
    url: "/cube/platform/profile",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: GoGraph,
    url: "/cube/platform/dashboard/uyGVSUYVKVuyvXxdXG",
  },
  {
    id: "uploadKpiData",
    label: "Actualizar Datos de Kpi",
    icon: BsFileEarmarkBarGraph,
    url: "/cube/platform/create-or-update-kpi",
  },
];

const defaultCard: SideBarMenuCard = {
  id: "",
  displayName: "STARTUP",
  title: "",
  photoUrl: "../../../assets/images/factory.jpeg",
  url: "/",
};

const cubeCard: SideBarMenuCard = {
  id: "",
  displayName: "CUBE VENTURES",
  title: "",
  //This is nested in a route so the path changes deeper
  photoUrl: "../../../assets/images/cube_logo.jpg",
  url: "/",
};

//This is nested in a route so the path changes deeper
const defaultUserPhotoUrl = "../../../assets/images/profile.png";

interface NavBarProps {
  children: ReactChild | ReactChildren;
}

const NavBar = (props: NavBarProps) => {
  const [items, setItems] = useState<SideBarMenuItem[]>(defaultItems);
  const [card, setCard] = useState<SideBarMenuCard>(defaultCard);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string>(defaultUserPhotoUrl);
  const { user } = useSelector((state: RootState) => state?.userReducer);
  const sideNavBarStatus = useSelector(
    (state: RootState) => state?.sideNavBarStatusReducer
  );

  useEffect(() => {
    if (user) {
      if (user.rights === "ADMIN") {
          // console.log(user);
        setCard(cubeCard);
        setItems(itemsForAdmin);
      } else {
        // console.log(user);
        setCard({
          ...defaultCard,
          id: user.pymeId,
          displayName: user.pyme?.name || defaultCard.displayName,
          photoUrl: user.pyme?.photoUrl || defaultCard.photoUrl,
        });
        setUserPhotoUrl(user.photoUrl || defaultUserPhotoUrl);
        const newItems = [...itemsForUser];
        const dashboardItem = newItems[1];
        const newDashBoardItem = {
          ...dashboardItem,
          url: `/cube/platform/dashboard/${encrypt(user.pymeId)}`,
        };
  
        newItems[1] = newDashBoardItem;
        setItems(newItems);
      }
    }
  }, [user]);

  return (
    <React.Fragment>
      <SideBarMenu items={items} card={card} />
      <div
        className={
          sideNavBarStatus.isOpen
            ? `${classes.bodyApp} ${classes.bodyAppCollapsed}`
            : `${classes.bodyApp} ${classes.bodyAppExpanded}`
        }
      >
        <TopNavBarMenu photoUrl={userPhotoUrl} />
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default NavBar;
