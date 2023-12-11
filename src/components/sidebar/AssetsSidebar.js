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

  const handleClick = (link) => {
    setActivatedLink(link);
  };

  useEffect(() => {
    if (location.pathname === "/assets") {
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
      top="15vh"
      right="95vw"
      bottom="5vh"
      left="0"
      padding="10px"
      textAlign="center"
      flexWrap="wrap"
    >
      <Typography variant="subtitle1">
        <Link to="/assets/newasset" onClick={() => handleClick("newasset")}>
          <Button
            className={
              activatedLink === "newasset"
                ? styles.button_activated
                : styles.button_deactivated
            }
            variant="text"
            startIcon={<AddIcon />}
          />
        </Link>
      </Typography>
      <Typography variant="subtitle1">
        <Link to="/assets/search" onClick={() => handleClick("search")}>
          <Button
            className={
              activatedLink === "search"
                ? styles.button_activated
                : styles.button_deactivated
            }
            variant="text"
            startIcon={<SearchIcon />}
          />
        </Link>
      </Typography>
    </Stack>
  );
};

export default AssetsSidebar;
