import { SideBarMenuItem } from "../../../types/types";
import { classNames } from "../../../util/classes";
import "./SideBarMenuItemView.scss";

interface SideBarMenuItemViewProps {
  item: SideBarMenuItem;
  isOpen: boolean;
}

export default function SideBarMenuItemView({
  item,
  isOpen,
}: SideBarMenuItemViewProps) {
  const profileStyle = { color: "#fc5c65"};
  const dashboardStyle = { color: "#78e08f"};
  const tableStyle = { color: "#eccc68"};

  return (
    <div className="SideBarMenuItemView">
      <a href={item.url}>
        <div className={classNames("ItemContent", isOpen ? "" : "collapsed")}>
          <div className="icon">
            {item.label==="Perfil"?<item.icon size="30" style={profileStyle}></item.icon>:
            (item.label==="Dashboard"?<item.icon size="30" style={dashboardStyle}></item.icon>:
            <item.icon size="30" style={tableStyle}></item.icon>)}
          </div>
          <span className="label">{item.label}</span>
        </div>
      </a>
      {!isOpen ? <div className="tooltip">{item.label}</div> : ""}
    </div>
  );
}
