import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { RootState } from "./store/reducers/rootReducer";
import { encrypt } from "./util/Encryptor";

function App() {
  const { user } = useSelector((state: RootState) => state?.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.rights === "ADMIN") {
        navigate("/cube/platform/startup-table");
      } else if (user.rights === "USER") {
        navigate(`/cube/platform/dashboard/${encrypt(user.pymeId)}`);
      } else {
        navigate("/cube/platform/startup-table");
      }
    } else {
      navigate("/cube/login");
    }
  }, []);

  return <Layout />;
}

export default App;
