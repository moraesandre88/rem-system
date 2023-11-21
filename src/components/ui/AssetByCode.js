import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchPrivate from "../../modules/hooks/useFetchPrivate";

const AssetByCode = () => {
  const [asset, setAsset] = useState({});
  const { code } = useParams();
  const fetchPrivate = useFetchPrivate();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const getAssetByCode = async () => {
      try {
        const response = await fetchPrivate(
          `http://localhost:3500/assets/${code}`,
          {
            method: "GET",
            signal: controller.signal,
            credentials: "include",
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          console.log(responseData.message);
        } else {
          mounted && setAsset(responseData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAssetByCode();
    return () => {
      mounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(asset);

  return (
    <>
      <p>Imovel - {code}</p>
      <p>{asset.type}</p>
    </>
  );
};

export default AssetByCode;
