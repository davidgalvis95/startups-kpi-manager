import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import Login from "../login/Login";
import Logout from "../logout/Logout";
import allActions from "../../store/actions/allActions";

const Layout = () => {
  const loginStatus = useSelector((state: RootState) => state?.loginReducer);
  const logoutStatus = useSelector((state: RootState) => state?.logoutReducer);

  const { user } = useSelector((state: RootState) => state?.userReducer);
  const { kpis } = useSelector((state: RootState) => state?.kpiReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutActions = allActions.logoutActions;
  const kpiActions = allActions.kpiActions;
  const userActions = allActions.userActions;
  const pymeActions = allActions.pymeActions;
  const loginActions = allActions.loginActions;
  const pictureChangeActions = allActions.pictureChangeActions;
  const sendSetSideBarStatus = allActions.sendSetSideBarStatus;

  const handleLogout = () => {
    localStorage.clear();
    dispatch(kpiActions.clear({ type: "CLEAR" }));
    dispatch(userActions.clear({ type: "CLEAR" }));
    dispatch(pymeActions.clear({ type: "CLEAR" }));
    dispatch(loginActions.clear({ type: "CLEAR" }));
    dispatch(pictureChangeActions.clear({ type: "CLEAR" }));
    dispatch(sendSetSideBarStatus.clear({ type: "CLEAR" }));
    dispatch(logoutActions.clear({ type: "CLEAR" }));
    navigate("/cube/login");
  };

  const defaultRoutes = (
    <Routes>
      <Route path="/cube/login" element={<Login />} />
      <Route path="/cube/logout" element={<Logout />} />
      {/* <Route path="/" element={() => (<Navigate to="/cube/login" />)} />           */}
    </Routes>
  );



  const userRoutes = (
    <Routes>
      <Route path="/cube/platform/profile" element={<Profile />} />
      <Route path="/cube/platform/new-kpi" element={<CreateNewKpi />} />
      <Route
        path="/cube/platform/update-kpi"
        element={<UpdateKpi kpis={kpis?.allKpisDetailed} />}
      />
      <Route
        path="/cube/platform/update-kpi/upload-kpi-data"
        element={<KpiDataUploading />}
      />
      <Route path="/cube/platform/dashboard/:id" element={<Dashboard />} />
      <Route path="/cube/logout" element={() => <Logout />} />
      {/* <Route path="/cube/login" element={() => (<Navigate to="/cube/platform/dashboard/:id" />)} /> */}
      {/* <Route path="/" element={() => (<Navigate to="/cube/platform/dashboard/:id" />)} /> */}
      <Route
        index // <-- "/"
        element={<div>Default Page Content</div>}
      />
    </Routes>
  );

  const adminRoutes = (
    <Routes>
      <Route path="/cube/platform/profile" element={<Profile />} />
      <Route path="/cube/platform/new-user" element={<NewUserAccountForm />} />
      <Route path="/cube/platform/new-pyme" element={<NewPymeAccountForm />} />
      <Route path="/cube/platform/startup-table" element={<StartupTable />} />
      <Route path="/cube/platform/dashboard/:id" element={<Dashboard />} />
      <Route path="/cube/logout" element={<Logout />} />
      {/* <Route path="/cube/login" element={() => (<Navigate to="/cube/platform/startup-table" />)} /> */}
      {/* <Route path="/" element={() => (<Navigate to="/cube/platform/startup-table" />)} /> */}
      <Route
        index // <-- "/"
        element={<div>Default Page Content</div>}
      />
    </Routes>
  );

  const routes = user
    ? user.rights === "ADMIN"
      ? adminRoutes
      : userRoutes
    : defaultRoutes;

  return (
    <div>
      {!loginStatus.accepted ||
      !loginStatus.finishedOk ||
      logoutStatus.logguedOut ? (
        defaultRoutes
      ) : (
        <NavBar>{routes}</NavBar>
      )} 

       {/* {loginRoutes}
      {logoutRoutes}
      <NavBar>{adminRoutes}</NavBar>  */}
    </div>
  );
};

export default Layout;
