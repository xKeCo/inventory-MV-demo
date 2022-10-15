import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useProvs = () => {
  // State for provs data
  const [docsProvs, setDocsProvs] = useState([]);

  // Number of Provs
  const [numProvs, setNumProvs] = useState(0);

  // Loading state
  const [loadingProvs, setLoadingProvs] = useState(true);

  // Error state
  const [errorProvs, setErrorProvs] = useState(null);

  // Fetch provs data
  const getProveedores = async () => {
    try {
      const { data } = await axios.get(
        "https://mascotas-back.herokuapp.com/api/provider/all"
      );

      const docs = data.query.map(
        ({ prov_id, name, number, other_contact }) => ({
          id: prov_id,
          name,
          number,
          other_contact,
        })
      );

      setDocsProvs(docs);
      setNumProvs(data.query.length);
      setLoadingProvs(false);
    } catch (error) {
      setErrorProvs(error);
      setLoadingProvs(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProveedores();
  }, []);

  return {
    docsProvs,
    numProvs,
    loadingProvs,
    errorProvs,
    setLoadingProvs,
    getProveedores,
  };
};

export default useProvs;
