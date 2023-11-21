import { Outlet } from "react-router-dom";
import styles from "../assets/styles/PublicLayout.module.css"

const PublicLayout = () => {
  return (
    <main className={styles.container}>
      <Outlet />
    </main >
  );
};

export default PublicLayout;
