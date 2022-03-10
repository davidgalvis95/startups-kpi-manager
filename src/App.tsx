import { SideBarMenu } from "./components/navbar/vertical/SideBarMenu";
import { TopNavBarMenu } from "./components/navbar/horizontal/TopNavBarMenu";
import { useSelector } from "react-redux";
import { RootState } from "./store/reducers/rootReducer";
import Profile from "./components/body/profile/Profile";
import StartupTable from "./components/body/startup-table/StartupTable";
import NewPymeAccountForm from "./components/body/account-form/NewPymeAccountForm";
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
import { sampleDataSet } from "./assets/sample-data/BarLineChartDataset";
import UpdateKpi from "./components/body/create-kpi-form/UpdateKpi";
import { SampleUser } from "./assets/sample-data/SamplePymeAndUserData";
import { SamplePymes } from "./assets/sample-data/SamplePymeAndUserData";
import NewUserAccountForm from "./components/body/account-form/NewUserAccountForm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/login/Login";

function App() {
  const sideNavBarStatus = useSelector(
    (state: RootState) => state?.sideNavBarStatusReducer
  );



  useEffect(() => {}, [sideNavBarStatus]);

  const routes = (
    <Routes>
      {/* <Route exact path='/login' component={Login} /> */}
      <Route path="/create-kpi" element={<CreateNewKpi />} />
      <Route path="/update-kpi" element={<UpdateKpi />} />
      <Route
        path="/update-kpi/upload-kpi-data"
        element={<KpiDataUploading />}
      />
      <Route path="/start-up-table" element={<StartupTable />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard/:id" element={<Dashboard />} />
    </Routes>
  );

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

  // return (
  //   <div>
  //     {/* <header> */}
  //     <SideBarMenu items={items} card={card} />
  //     <div
  //       className={
  //         sideNavBarStatus.isOpen
  //           ? `${classes.bodyApp} ${classes.bodyAppCollapsed}`
  //           : `${classes.bodyApp} ${classes.bodyAppExpanded}`
  //       }
  //     >
  //       <TopNavBarMenu photoUrl={card.photoUrl} />
  //       {/* <Profile card={card} user={SampleUser}/> */}
  //       {/* <StartupTable displayContentArray={startupsContent}/> */}
  //       {/* <NewPymeAccountForm /> */}
  //       {/* <NewUserAccountForm pymes={SamplePymes}/> */}
  //       {/* <Dashboard/> */}
  //       {/* <CreateNewKpi/> */}
  //       {/* <UpdateKpi kpis={kpis}/> */}
  //       {/* <KpiDataUploading kpis={kpis}/> */}
  //     </div>

  //     {/* </header> */}
  //   </div>
  // );

  return (
    <Login/>
  )
}

export default App;
// yiqjdpmj
