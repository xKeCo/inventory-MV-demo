// React
import { useState } from "react";

// Axios
import axios from "axios";

const useProductByProv = () => {
  // State for Order data
  const [docsProductByProv, setDocsProductByProv] = useState([]);

  // Number of Order
  const [numProductByProv, setNumProductByProv] = useState(0);

  // Loading state
  const [loadingProductByProv, setLoadingProductByProv] = useState(true);

  // error state
  const [errorProductByProv, setErrorProductByProv] = useState(null);

  // Get the token from local storage to verrify if the user is logged in
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch Order data
  const getProductByProv = async (id) => {
    try {
      const { data } = await axios.get(
        `https://mascotas-back-production.up.railway.app/api/order/products/${id}`,
        config
      );

      const docs = data.result.map(
        ({
          product_id,
          name,
          price,
          weigth,
          measure,
          pet_name,
          category_name,
          stock,
          provider_name,
        }) => ({
          prodID: product_id,
          prodName: name,
          provName: provider_name,
          price,
          weigth,
          measure,
          stock,
          pet_name,
          category_name,
        })
      );
      setDocsProductByProv(docs);
      setLoadingProductByProv(false);
    } catch (error) {
      console.log(error);
      setErrorProductByProv(error);
      setLoadingProductByProv(false);
    }
  };

  return {
    docsProductByProv,
    loadingProductByProv,
    numProductByProv,
    errorProductByProv,
    setLoadingProductByProv,
    getProductByProv,
  };
};

export default useProductByProv;
