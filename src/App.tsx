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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import React from "react";
import NavBar from "./components/navbar/NavBar";
import Layout from "./components/layout/Layout";

function App() {
  return <Layout />;
}

export default App;
