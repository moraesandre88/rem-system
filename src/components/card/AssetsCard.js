import { Link } from "react-router-dom";
import Slider from "../slider/Slider";
import styles from "../../assets/styles/AssetsCard.module.css";

const AssetsCard = ({
  //customkey,
  images,
  type,
  street,
  neighborhood,
  state,
  size,
  bedrooms,
  parkingSpaces,
  selling,
  rental,
  sellingPrice,
  rentalPrice,
  monthlyCondominium,
  published,
  code,
}) => {
  return (
    <section className={styles.card_container}>
      <div className={styles.slider_container}>
        <Slider images={images} />
      </div>
      <p className={styles.infos}>{type}</p>
      <p className={styles.infos}>{street}</p>
      <p className={styles.infos}>
        {neighborhood}, {state}
      </p>
      <p className={styles.infos}>{size} m²</p>
      <p className={styles.infos}>{bedrooms} quarto(s)</p>
      <p className={styles.infos}>{parkingSpaces} vaga(s)</p>
      {selling && <p className={styles.infos}>Venda: {sellingPrice}</p>}
      {rental && <p className={styles.infos}>Locação: {rentalPrice}</p>}
      {monthlyCondominium > 0 && (
        <p className={styles.infos}>Condomínio: {monthlyCondominium}</p>
      )}
      <p className={styles.infos}>Código: {code}</p>
      <p className={styles.infos}>
        Status: {published ? "ativado" : "desativado"}
      </p>
      <Link to={`/assets/${code}`}>
        <button type="button">Mais informações</button>
      </Link>
    </section>
  );
};

export default AssetsCard;
