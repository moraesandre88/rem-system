import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "../../assets/styles/AssetsSidebar.module.css"

const AssetsSidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <Link className={styles.link} to="/assets/newasset">
        <FontAwesomeIcon className={styles.icon} icon={faPlus} />
        <p>Novo</p>
      </Link>
      <Link className={styles.link} to="/assets/search">
        <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
        <p>Buscar</p>
      </Link>
    </nav>
  );
};

export default AssetsSidebar;
