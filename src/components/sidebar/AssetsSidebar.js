import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../assets/styles/AssetsSidebar.module.css";

const AssetsSidebar = () => {
  const [activatedLink, setActivatedLink] = useState();
  const location = useLocation();

  // const handleClick = (link) => {
  //   setActivatedLink(link);
  // };

  useEffect(() => {
    if (location.pathname === "/assets/newasset") {
      setActivatedLink("newasset");
    } else if (location.pathname === "/assets/search") {
      setActivatedLink("search");
    } else {
      setActivatedLink();
    }
  }, [location]);

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="space-around"
      bgcolor="primary.main"
      position="fixed"
      top="17vh"
      right="95vw"
      bottom="5vh"
      left="0"
      textAlign="center"
      flexWrap="wrap"
    >
      <Link to="/assets/newasset">
        <Button
          className={
            activatedLink === "newasset"
              ? styles.button_activated
              : styles.button_deactivated
          }
          variant="text"
        >
          <Stack direction="column" alignItems="center">
            <AddIcon />
            <Typography variant="subtitle1">Novo</Typography>
          </Stack>
        </Button>
      </Link>

      <Link to="/assets/search">
        <Button
          className={
            activatedLink === "search"
              ? styles.button_activated
              : styles.button_deactivated
          }
          variant="text"
        >
          <Stack direction="column" alignItems="center">
            <SearchIcon />
            <Typography variant="subtitle1">Busca</Typography>
          </Stack>
        </Button>
      </Link>
    </Stack>
  );
};

export default AssetsSidebar;
