import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import useGlobal from "./modules/hooks/useGlobal";
import RequiredAuth from "./modules/RequiredAuth";
const PublicLayout = lazy(() => import("./layout/PublicLayout"));
const MainLayout = lazy(() => import("./layout/MainLayout"));
const AssetsLayout = lazy(() => import("./layout/AssetsLayout"));
const Login = lazy(() => import("./components/ui/Login"));
const Register = lazy(() => import("./components/ui/Register"));
const Home = lazy(() => import("./components/ui/Home"));
const Assets = lazy(() => import("./components/ui/Assets"));
const AssetByCode = lazy(() => import("./components/ui/AssetByCode"));
const NewAsset = lazy(() => import("./components/ui/NewAsset"));
const Search = lazy(() => import("./components/ui/Search"));
const Clients = lazy(() => import("./components/ui/Clients"));
const Manager = lazy(() => import("./components/ui/Manager"));
const Loading = lazy(() => import("./components/loading/Loading"));

function App() {
  const { roles } = useGlobal();

  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        {/*Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/*Private routes*/}
        <Route element={<RequiredAuth allowedRoles={[roles.Broker]} />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/assets" element={<AssetsLayout />}>
              <Route index element={<Assets />} />
              <Route path="/assets/newasset" element={<NewAsset />} />
              <Route path="/assets/search" element={<Search />} />
              <Route path="/assets/:code" element={<AssetByCode />} />
            </Route>
            <Route path="clients" element={<Clients />} />
            <Route path="manager" element={<Manager />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
