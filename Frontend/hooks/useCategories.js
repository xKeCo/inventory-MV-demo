import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useCategories = () => {
  // State for categories data
  const [docsCategories, setDocsCategories] = useState([]);

  // Number of categories
  const [numCategories, setNumCategories] = useState(0);

  // Loading state
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Error state
  const [errorCategories, setErrorCategories] = useState(null);

  // Fetch categories data
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://mascotas-back.herokuapp.com/api/category/all"
      );

      const docs = data.response.map(({ categ_id, name, description }) => ({
        id: categ_id,
        name,
        description,
      }));

      setDocsCategories(docs);
      setNumCategories(data.response.length);
      setLoadingCategories(false);
    } catch (error) {
      setErrorCategories(error);
      setLoadingCategories(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    docsCategories,
    loadingCategories,
    numCategories,
    errorCategories,
    setLoadingCategories,
    getCategories,
  };
};

export default useCategories;
