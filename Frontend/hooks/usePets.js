import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const usePets = () => {
  const [docsPets, setDocsPets] = useState([]);

  // Nnumber of Category
  const [numPets, setNumPets] = useState(0);

  // loader
  const [loadingPets, setLoadingPets] = useState(true);

  // error
  const [errorPets, setErrorPets] = useState(null);

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
