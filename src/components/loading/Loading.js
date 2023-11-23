import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../assets/styles/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading_wrapper}>
      <FontAwesomeIcon className={styles.icon} icon={faSpinner} spin />
    </div>
  );
};

export default Loading;
