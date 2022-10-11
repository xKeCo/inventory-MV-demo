import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useCategories = () => {
  const [docsCategories, setDocsCategories] = useState([]);

  // Nnumber of Category
  const [numCategories, setNumCategories] = useState(0);

  // loader
  const [loadingCategories, setLoadingCategories] = useState(true);

  // error
  const [errorCategories, setErrorCategories] = useState(null);

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
