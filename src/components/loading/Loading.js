import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = ({styles}) => {
  return (
    <>
      <FontAwesomeIcon className={styles} icon={faSpinner} spin />
    </>
  );
};

export default Loading;
