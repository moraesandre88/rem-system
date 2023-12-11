import { useEffect, useState } from "react";
import useFetchPrivate from "../../modules/hooks/useFetchPrivate";
import AssetsCard from "../card/AssetsCard";
import styles from "../../assets/styles/Assets.module.css";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [message, setMessage] = useState("");
  const [occurredError, setOccurredError] = useState(false);
  const fetchPrivate = useFetchPrivate();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const getAssets = async () => {
      try {
        const response = await fetchPrivate("http://localhost:3500/assets", {
          method: "GET",
          signal: controller.signal,
          credentials: "include",
        });
        const responseData = await response.json();
        // if (!response?.ok) {
        //   setOccurredError(true);
        //   if ([401, 403, 500].includes(response?.status)) {
        //     setMessage(responseData?.message);
        //   } else {
        //     setMessage("Falha na obtenção dos dados");
        //   }
        // } else {
        //   setOccurredError(false); //check this later
        //   if (response.status === 204) {
        //     setMessage(responseData?.message);
        //   } else {
        //     mounted && setAssets(responseData);
        //   }
        // }
        if (!response?.ok) {
          console.log(responseData.message)
        } else {
          mounted && setAssets(responseData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAssets();
    return () => {
      mounted = false;
      controller.abort();
    };
    
  }, []);

  console.log(assets)

  return (
    <div className={styles.main}>
      {/* {occurredError ? (
        <p>{message}</p>
      ) : message ? (
        <p>{message}</p>
      ) : ( */}
        <>
          {assets.map((asset) => (
            <AssetsCard
              key={asset.code}
              images={asset.images}
              type={asset.type}
              neighborhood={asset.neighborhood}
              state={asset.state}
              size={asset.size}
              bedrooms={asset.bedrooms}
              parkingSpaces={asset.parkingSpaces}
              selling={asset.selling}
              rental={asset.rental}
              sellingPrice={asset.sellingPrice}
              rentalPrice={asset.rentalPrice}
              monthlyCondominium={asset.monthlyCondominium}
              published={asset.published}
              code={asset.code}
            />
          ))}
        </>
      {/* )} */}
    </div>
  );
};

export default Assets;
