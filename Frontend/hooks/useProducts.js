import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useProducts = () => {
  // State for products data
  const [docsProducts, setDocsProducts] = useState([]);

  // Number of products
  const [numProducts, setNumProducts] = useState(0);

  // Loading state
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Error state
  const [errorProducts, setErrorProducts] = useState(null);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://mascotas-back.herokuapp.com/api/product/all"
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
      setDocsProducts(docs);
      setNumProducts(data.result.length);
      setLoadingProducts(false);
    } catch (error) {
      setErrorProducts(error);
      setLoadingProducts(false);
      toast.error(error.message);
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

export default useProducts;
