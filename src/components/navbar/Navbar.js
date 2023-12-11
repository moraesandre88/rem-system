import { Link } from "react-router-dom";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import styles from "../../assets/styles/Navbar.module.css";

function Navbar() {
  const [activatedLink, setActivatedLink] = useState("home");

  const handleClick = (link) => {
    setActivatedLink(link);
  };

  return (
    <AppBar className={styles.navbar} position="fixed" color="primary">
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <Typography variant="subtitle1">
          <Link to="/" onClick={() => handleClick("home")}>
            <Button
              className={
                activatedLink === "home"
                  ? styles.button_activated
                  : styles.button_deactivated
              }
              variant="text"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          </Link>
        </Typography>
        <Typography variant="subtitle1">
          <Link to="/assets" onClick={() => handleClick("assets")}>
            <Button
              className={
                activatedLink === "assets"
                  ? styles.button_activated
                  : styles.button_deactivated
              }
              variant="text"
              startIcon={<ApartmentIcon />}
            >
              Imóveis
            </Button>
          </Link>
        </Typography>
        <Typography variant="subtitle1">
          <Link to="/clients" onClick={() => handleClick("clients")}>
            <Button
              className={
                activatedLink === "clients"
                  ? styles.button_activated
                  : styles.button_deactivated
              }
              variant="text"
              startIcon={<PersonIcon />}
            >
              Clientes
            </Button>
          </Link>
        </Typography>
        <Typography variant="subtitle1">
          <Link to="/manager" onClick={() => handleClick("manager")}>
            <Button
              className={
                activatedLink === "manager"
                  ? styles.button_activated
                  : styles.button_deactivated
              }
              variant="text"
              startIcon={<BusinessCenterIcon />}
            >
              Gerência
            </Button>
          </Link>
        </Typography>
      </Stack>
    </AppBar>
  );
}

export default Navbar;
