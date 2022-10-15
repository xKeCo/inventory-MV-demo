// React
import { useEffect, useState } from "react";

// React-hot-toast Notifications
import { toast } from "react-hot-toast";

// Axios
import axios from "axios";

const useStock = () => {
  // State for stock data
  const [docsStock, setDocsStock] = useState([]);

  // Number of Stock
  const [numStock, setNumStock] = useState(0);

  // Loading state
  const [loadingStock, setLoadingStock] = useState(true);

  // error state
  const [errorStock, setErrorStock] = useState(null);

  // Fetch stock data
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
