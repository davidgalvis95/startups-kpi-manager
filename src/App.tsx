import { SideBarMenu } from "./components/navbar/vertical/SideBarMenu";
import { TopNavBarMenu } from "./components/navbar/horizontal/TopNavBarMenu";
import { useSelector } from "react-redux";
import { RootState } from "./store/reducers/rootReducer";
import Profile from "./components/body/profile/Profile";
import StartupTable from "./components/body/startup-table/StartupTable";
import NewAccountForm from "./components/body/account-form/NewAccountForm";
import { SideBarMenuCard, SideBarMenuItem } from "./types/types";
import { GoGraph } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import { BsGrid1X2Fill } from "react-icons/bs";
import { buildSampleRowContent } from "./assets/sample-data/StartUpBodyRowContentSample";
import { StartUpBodyRowContent } from "./types/types";
import classes from "./App.module.css";
import { useEffect } from "react";
import sideNavBarStatus from "./store/actions/sideNavBarStatus";
import Dashboard from "./components/body/dashboard/DashBoard";
import CreateNewKpi from "./components/body/create-kpi-form/CreateNewKpi";
import KpiDataUploading from "./components/body/create-kpi-form/KpiDataUploading";
import { sampleDataSet } from "./assets/sample-data/BarLineChartDataset"
import UpdateKpi from "./components/body/create-kpi-form/UpdateKpi";

function App() {
  const sideNavBarStatus = useSelector(
    (state: RootState) => state?.sideNavBarStatusReducer
  );

  useEffect(() => {}, [sideNavBarStatus]);

  const kpis = sampleDataSet.allKpisDetailed;

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
      <div
        className={
          sideNavBarStatus.isOpen
            ? `${classes.bodyApp} ${classes.bodyAppCollapsed}`
            : `${classes.bodyApp} ${classes.bodyAppExpanded}`
        }
      >
        <TopNavBarMenu photoUrl={card.photoUrl} />
        <Profile card={card}/>
        {/* <StartupTable displayContentArray={startupsContent}/> */}
        {/* <NewAccountForm /> */}
        {/* <Dashboard/> */}
        {/* <CreateNewKpi/> */}
        {/* <UpdateKpi kpis={kpis}/> */}
        {/* <KpiDataUploading kpis={kpis}/> */}
      </div>

      {/* </header> */}
    </div>
  );
}

export default App;
