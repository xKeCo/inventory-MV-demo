import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useProducts = () => {
  const [docsProducts, setDocsProducts] = useState([]);

  // Nnumber of products
  const [numProducts, setNumProducts] = useState(0);

  // loader
  const [loadingProducts, setLoadingProducts] = useState(true);

  // error
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
          price,
          historic,
          provider_name,
          category_name,
          pet_name,
        }) => ({
          id: prod_id,
          name,
          stock,
          peso,
          price,
          historic,
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
