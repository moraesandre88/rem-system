import { Outlet } from "react-router-dom";
import styles from "../../assets/styles/SubContainer.module.css"

const SubContainer = () => {
  return (
    <main className={styles.container}>
      <Outlet />
    </main>
  );
};

export default SubContainer;
