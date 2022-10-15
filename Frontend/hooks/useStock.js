import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useStock = () => {
  const [docsStock, setDocsStock] = useState([]);

  // Nnumber of products
  const [numStock, setNumStock] = useState(0);

  // loader
  const [loadingStock, setLoadingStock] = useState(true);

  // error
  const [errorStock, setErrorStock] = useState(null);

  const getStock = async () => {
    try {
      const { data } = await axios.get(
        "https://mascotas-back.herokuapp.com/api/stock/product"
      );

      const docs = data.result.map(
        ({
          prod_id,
          name,
          stock,
          peso,
          unidad_medida,
          price,
          provider_name,
          category_name,
          pet_name,
        }) => ({
          id: prod_id,
          name,
          stock,
          peso,
          unidad_medida,
          price,
          provName: provider_name,
          categoryName: category_name,
          petName: pet_name,
        })
      );
      setDocsStock(docs);
      setNumStock(data.result.length);
      setLoadingStock(false);
    } catch (error) {
      setErrorStock(error);
      setLoadingStock(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getStock();
  }, []);

  return {
    docsStock,
    loadingStock,
    numStock,
    errorStock,
    setLoadingStock,
    getStock,
  };
};

export default useStock;
