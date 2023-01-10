// React
import { useEffect, useState } from "react";

// Axios
import axios from "axios";

export const useProducts = () => {
  // State for products data
  const [docsProducts, setDocsProducts] = useState([]);

  // Number of products
  const [numProducts, setNumProducts] = useState(0);

  // Loading state
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Error state
  const [errorProducts, setErrorProducts] = useState(null);

  // Get the token from local storage to verrify if the user is logged in
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://mascotas-back.onrender.com/api/product/all",
        config
      );

      const docs = data.result.map(
        ({
          product_id,
          name,
          stock,
          weigth,
          measure,
          price,
          provider_name,
          provider_id,
          category_name,
          pet_name,
        }) => ({
          id: product_id,
          name,
          stock,
          weigth,
          measure,
          price,
          provName: provider_name,
          provId: provider_id,
          categoryName: category_name,
          petName: pet_name,
        })
      );
      setDocsProducts(docs);
      setNumProducts(data.result.length);
      setLoadingProducts(false);
    } catch (error) {
      setErrorProducts(error);
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    docsProducts,
    loadingProducts,
    numProducts,
    errorProducts,
    setLoadingProducts,
    getProducts,
  };
};
