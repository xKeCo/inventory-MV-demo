import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const usePets = () => {
  // State for pets data
  const [docsPets, setDocsPets] = useState([]);

  // Number of pets
  const [numPets, setNumPets] = useState(0);

  // Loading state
  const [loadingPets, setLoadingPets] = useState(true);

  // Error state
  const [errorPets, setErrorPets] = useState(null);

  // Fetch pets data
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://mascotas-back.herokuapp.com/api/pet/all"
      );

      const docs = data.result.map(({ mascota_id, name, description }) => ({
        id: mascota_id,
        name,
        description,
      }));

      setDocsPets(docs);
      setNumPets(data.result.length);
      setLoadingPets(false);
    } catch (error) {
      setErrorPets(error);
      setLoadingPets(false);
      toast.error(error.message);
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
