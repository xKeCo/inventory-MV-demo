// React
import { useEffect, useState } from "react";

// React-hot-toast Notifications
import { toast } from "react-hot-toast";

// Axios
import axios from "axios";

const useCategories = () => {
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
        "https://mascotas-back.herokuapp.com/api/category/all",
        config
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
      // toast.error(error.message);
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
