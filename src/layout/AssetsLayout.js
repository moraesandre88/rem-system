import { Outlet } from "react-router-dom";
import AssetsSidebar from "../components/sidebar/AssetsSidebar";
import SubContainer from "../components/container/SubContainer";

const AssetsLayout = () => {
  return (
    <>
      <AssetsSidebar/>
      <SubContainer>
        <Outlet/>
      </SubContainer>
    </>
  )
}

export default AssetsLayout