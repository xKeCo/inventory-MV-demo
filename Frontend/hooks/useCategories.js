// React
import { useEffect, useState } from "react";

// Axios
import axios from "axios";

export const useCategories = () => {
  // State for categories data
  const [docsCategories, setDocsCategories] = useState([]);

  // Number of categories
  const [numCategories, setNumCategories] = useState(0);

  // Loading state
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Error state
  const [errorCategories, setErrorCategories] = useState(null);

  // Get the token from local storage to verrify if the user is logged in
  const token = localStorage.getItem("token");

  // console.log(token);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch categories data
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://mascotas-back.onrender.com/api/category/all",
        config
      );

      const docs = data.response.map(({ category_id, name, description }) => ({
        id: category_id,
        name,
        description,
      }));

      setDocsCategories(docs);
      setNumCategories(data.response.length);
      setLoadingCategories(false);
    } catch (error) {
      setErrorCategories(error);
      setLoadingCategories(false);
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
