// React
import { useEffect, useState } from "react";

// Axios
import axios from "axios";

const usePets = () => {
  // State for pets data
  const [docsPets, setDocsPets] = useState([]);

  // Number of pets
  const [numPets, setNumPets] = useState(0);

  // Loading state
  const [loadingPets, setLoadingPets] = useState(true);

  // Error state
  const [errorPets, setErrorPets] = useState(null);

  // Get the token from local storage to verrify if the user is logged in
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch pets data
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://mascotas-back-production.up.railway.app/api/pet/all",
        config
      );

      const docs = data.result.map(({ pet_id, name, description }) => ({
        id: pet_id,
        name,
        description,
      }));

      setDocsPets(docs);
      setNumPets(data.result.length);
      setLoadingPets(false);
    } catch (error) {
      setErrorPets(error);
      setLoadingPets(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    docsPets,
    loadingPets,
    numPets,
    errorPets,
    setLoadingPets,
    getCategories,
  };
};

export default usePets;
