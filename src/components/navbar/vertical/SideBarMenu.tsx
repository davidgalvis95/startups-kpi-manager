import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SideBarMenuCard, SideBarMenuItem } from "../../../types/types";
import { classNames } from "../../../util/classes";
import { VscMenu } from "react-icons/vsc";
import SideBarMenuCardView from "./SideBarMenuCardView";
import SideBarMenuItemView from "./SideBarMenuItemView";
import allActions from "../../../store/actions/allActions";
import {
  SideBarStatusRequestImpl,
  SideBarStatusRequest,
} from "../../../store/actions/sideNavBarStatus";
import "./SideBarMenu.scss";
import { RootState } from "../../../store/reducers/rootReducer";

interface SideBarMenuProps {
  items: SideBarMenuItem[];
  card: SideBarMenuCard;
}

export function SideBarMenu({ items, card }: SideBarMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sideNavBarState = useSelector((state: RootState) => state?.sideNavBarStatusReducer)
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(allActions.sendSetSideBarStatus.sendSetSideBarStatus({type:isOpen ? "COLLAPSE" : "OPEN"}));
  }

  useEffect(() => {
      setIsOpen(sideNavBarState.isOpen);
  }, [sideNavBarState]);

  return (
    <div
      className={classNames("SideBarMenu", isOpen ? "expanded" : "collapsed")}
    >
      <div className="menuButton">
        <button className="hamburguerIcon" onClick={handleClick}>
          <VscMenu />
        </button>
      </div>
      <SideBarMenuCardView card={card} isOpen={isOpen} />
      {items.map((item) => (
        <SideBarMenuItemView key={item.id} item={item} isOpen={isOpen} />
      ))}
    </div>
  );
}
