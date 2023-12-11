import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import styles from "../../assets/styles/Footer.module.css"

const Footer = () => {
  let year = new Date().getFullYear();

  return (
    <AppBar className={styles.footer} position="fixed" color="primary">
      <Typography variant="subtitle1">REMsys&copy;{year}</Typography>
    </AppBar>
  )
}

export default Footer