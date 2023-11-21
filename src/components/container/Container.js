import { Outlet } from "react-router-dom";
import styles from "../../assets/styles/MainContainer.module.css"

const Container = () => {
  return (
    <main className={styles.container}>
      <Outlet />
    </main>
  );
};

export default Container;
