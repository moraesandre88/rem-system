import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faPerson,
  faBriefcase,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../assets/styles/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.link} to="/">
        <FontAwesomeIcon className={styles.icon} icon={faHouse} />
        <p>Home</p>
      </Link>
      <Link className={styles.link} to="/assets">
        <FontAwesomeIcon className={styles.icon} icon={faBuilding} />
        <p>Imóveis</p>
      </Link>
      <Link className={styles.link} to="/clients">
        <FontAwesomeIcon className={styles.icon} icon={faPerson} />
        <p>Clientes</p>
      </Link>
      <Link className={styles.link} to="/manager">
        <FontAwesomeIcon className={styles.icon} icon={faBriefcase} />
        <p>Gerência</p>
      </Link>
    </nav>
  );
}

export default Navbar;
