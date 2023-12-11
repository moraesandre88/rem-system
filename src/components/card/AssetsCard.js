import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Slider from "../slider/Slider";
import styles from "../../assets/styles/AssetsCard.module.css";

const AssetsCard = ({
  images,
  type,
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
  <Link className={styles.link} to={`/assets/${code}`}>
    <Card square={false} elevation={3} variant="elevation" sx={{ maxWidth: 250, height:420 }}>
      <div className={styles.slider_container}>
        <Slider images={images} imageWidth={250} imageHeight={180} />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h6">
          {type}
        </Typography>
        <Typography className={styles.infos} gutterBottom paragraph>
          {neighborhood}, {state}
        </Typography>
        <Typography className={styles.infos} gutterBottom paragraph>
          {size} m² | {bedrooms} quarto(s) | {parkingSpaces} vaga(s)
        </Typography>
        {selling && (
          <Typography className={styles.infos} gutterBottom paragraph>
            Venda: R${sellingPrice}
          </Typography>
        )}
        {rental && (
          <Typography className={styles.infos} gutterBottom paragraph>
            Locação: R${rentalPrice}
          </Typography>
        )}
        {monthlyCondominium > 0 && (
          <Typography className={styles.infos} gutterBottom paragraph>
            Condomínio: R${monthlyCondominium}
          </Typography>
        )}
        <Typography className={styles.infos} gutterBottom paragraph>
          Código: {code}
        </Typography>
        <Typography
          className={styles.infos}
          gutterBottom
          paragraph
          color={published ? "primary.main" : "error.main"}
        >
          Status: {published ? "ativado" : "desativado"}
        </Typography>
      </CardContent>
    </Card>
  </Link>
    
  );
};

export default AssetsCard;
