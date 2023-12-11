import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import styles from "../../assets/styles/Header.module.css";

const Header = () => {
  return (
    <AppBar className={styles.header} position="fixed" color="primary">
      <Typography variant="subtitle1">REMsys</Typography>
    </AppBar>
  );
};

export default Header;
