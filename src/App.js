import { Routes, Route } from "react-router-dom";
import useGlobal from "./modules/hooks/useGlobal";
import RequiredAuth from "./modules/RequiredAuth";
import PublicLayout from "./layout/PublicLayout";
import MainLayout from "./layout/MainLayout";
import AssetsLayout from "./layout/AssetsLayout";
import Login from "./components/ui/Login";
import Register from "./components/ui/Register";
import Home from "./components/ui/Home";
import Assets from "./components/ui/Assets";
import AssetByCode from "./components/ui/AssetByCode";
import NewAsset from "./components/ui/NewAsset"
import Search from "./components/ui/Search"
import Clients from "./components/ui/Clients";
import Manager from "./components/ui/Manager";

function App() {
  const { roles } = useGlobal();

  return (
    <Routes>
      {/*Public routes */}
      <Route element={<PublicLayout/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      {/*Private routes*/}
      <Route element={<RequiredAuth allowedRoles={[roles.Broker]} />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/assets" element={<AssetsLayout />}>
            <Route index element={<Assets />}/>
            <Route path="/assets/newasset" element={<NewAsset/>}/>
            <Route path="/assets/search" element={<Search/>}/>
            <Route path="/assets/:code" element={<AssetByCode/>}/>
          </Route>
          <Route path="clients" element={<Clients />} />
          <Route path="manager" element={<Manager />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;