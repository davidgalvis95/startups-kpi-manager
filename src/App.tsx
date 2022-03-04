import { SideBarMenu } from "./components/navbar/vertical/SideBarMenu";
import { TopNavBarMenu } from "./components/navbar/horizontal/TopNavBarMenu";
import Profile from "./components/body/profile/Profile"
import StartupTable from "./components/body/startup-table/StartupTable"
import NewAccountForm from "./components/body/account-form/NewAccountForm"
import { SideBarMenuCard, SideBarMenuItem } from "./types/types";
import { GoGraph } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import { BsGrid1X2Fill } from "react-icons/bs";
import { buildSampleRowContent } from "./assets/sample-data/StartUpBodyRowContentSample";
import {StartUpBodyRowContent} from "./types/types";
import "./App.css"



function App() {

  const startupsContent: StartUpBodyRowContent[] = buildSampleRowContent();

  const items: SideBarMenuItem[] = [
    {
      id: "1",
      label: "Perfil",
      icon: BsFillPersonFill,
      url: "/",
    },
    {
      id: "2",
      label: "Dashboard",
      icon: GoGraph,
      url: "/",
    },
    {
      id: "3",
      label: "Listado de Startups",
      icon: BsGrid1X2Fill,
      url: "/",
    },
  ];

  const card: SideBarMenuCard = {
    id: "",
    displayName: "CUBE VENTURES",
    // TODO quitar de componentes hijos y de los css
    title: "",
    photoUrl: "./assets/images/cube_logo.jpg",
    url: "/",
  };

  return (
    <div>
      {/* <header> */}
        <SideBarMenu items={items} card={card} />
        <div className="divApp">
            <TopNavBarMenu photoUrl={card.photoUrl}/>
            {/* <Profile card={card}/> */}
            {/* <StartupTable contentArray={startupsContent}/> */}
            <NewAccountForm/>
        </div>

      {/* </header> */}
    </div>
  );
}

export default App;
