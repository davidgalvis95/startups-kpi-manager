import { useEffect, useState } from "react";
import { SideBarMenuCard, SideBarMenuItem } from "../../../types/types";
import {classNames} from "../../../util/classes"
import {VscMenu} from "react-icons/vsc"
import SideBarMenuCardView from "./SideBarMenuCardView"
import SideBarMenuItemView from "./SideBarMenuItemView"
import "./SideBarMenu.scss";

interface SideBarMenuProps {
    items : SideBarMenuItem[];
    card: SideBarMenuCard;
}

export function SideBarMenu({items, card}: SideBarMenuProps){
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleClick(){
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        console.log(items)
    },[])

    return (
    <div className={classNames("SideBarMenu", isOpen? "expanded": "collapsed")}>

        <div className="menuButton">
            <button className="hamburguerIcon" onClick={handleClick}>
                <VscMenu/>
            </button>
        </div>
        <SideBarMenuCardView card={card} isOpen={isOpen}/>
        {
            items.map(item => <SideBarMenuItemView key={item.id} item={item} isOpen={isOpen}/>)
        }
    </div>)

}