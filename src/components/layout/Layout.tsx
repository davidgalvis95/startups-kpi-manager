import { Route, Routes } from "react-router-dom";
import CreateNewKpi from "../body/create-kpi-form/CreateNewKpi";
import NewUserAccountForm from "../body/account-form/NewUserAccountForm";
import NewPymeAccountForm from "../body/account-form/NewPymeAccountForm";
import UpdateKpi from "../body/create-kpi-form/UpdateKpi";
import KpiDataUploading from "../body/create-kpi-form/KpiDataUploading";
import Profile from "../body/profile/Profile";
import StartupTable from "../body/startup-table/StartupTable";
import Dashboard from "../body/dashboard/DashBoard";
import NavBar from "../navbar/NavBar";
import { RootState } from "../../store/reducers/rootReducer";
import { useSelector } from "react-redux";
import Login from "../login/Login";

const Layout = () => {
  const loginStatus = useSelector((state: RootState) => state?.loginReducer);
  const { user } = useSelector((state: RootState) => state?.userReducer);
  const { kpis } = useSelector((state: RootState) => state?.kpiReducer);


  const loginRoutes = (
    <Routes>
      <Route path="/cube/login" element={<Login />} />
    </Routes>
  );

  const defaultRoute = (
    <Routes>
      <Route path="/cube/platform/profile" element={<Profile />} />
      <Route path="/cube/platform/new-kpi" element={<CreateNewKpi />} />
      <Route path="/cube/platform/update-kpi" element={<UpdateKpi kpis={kpis?.allKpisDetailed}/>} />
      <Route
        path="/cube/platform/update-kpi/upload-kpi-data"
        element={<KpiDataUploading />}
      />
      <Route path="/cube/platform/profile" element={<Profile />} />
      <Route path="/cube/platform/new-user" element={<NewUserAccountForm />} />
      <Route path="/cube/platform/new-pyme" element={<NewPymeAccountForm />} />
      <Route path="/cube/platform/startup-table" element={<StartupTable />} />
      <Route path="/cube/platform/dashboard/:id" element={<Dashboard />} />
      <Route
        index // <-- "/"
        element={<div>Default Page Content</div>}
      />
    </Routes>
  );

  const userRoutes = (
    <Routes>
      <Route path="/cube/platform/profile" element={<Profile />} />
      <Route path="/cube/platform/new-kpi" element={<CreateNewKpi />} />
      <Route path="/cube/platform/update-kpi" element={<UpdateKpi kpis={kpis?.allKpisDetailed}/>} />
      <Route
        path="/cube/platform/update-kpi/upload-kpi-data"
        element={<KpiDataUploading />}
      />
      <Route path="/cube/platform/dashboard/:id" element={<Dashboard />} />
    </Routes>
  );

  const adminRoutes = (
    <Routes>
      <Route path="/cube/platform/profile" element={<Profile />} />
      <Route path="/cube/platform/new-user" element={<NewUserAccountForm />} />
      <Route path="/cube/platform/new-pyme" element={<NewPymeAccountForm />} />
      <Route path="/cube/platform/startup-table" element={<StartupTable />} />
      <Route path="/cube/platform/dashboard/:id" element={<Dashboard />} />
    </Routes>
  );

  const routes = user
    ? user.rights === "ADMIN"
      ? adminRoutes
      : userRoutes
    : defaultRoute;

  return (
    <div>
      {/* {!loginStatus.accepted || !loginStatus.finishedOk ? (
        loginRoutes
      ) : (
        <NavBar>{routes}</NavBar>
      )} */}

      {loginRoutes}
      <NavBar>{defaultRoute}</NavBar>
    </div>
  );
};

export default Layout;
