import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useProvs = () => {
  const [docsProvs, setDocsProvs] = useState([]);

  const [numProvs, setNumProvs] = useState(0);

  // loader
  const [loadingProvs, setLoadingProvs] = useState(true);

  // error
  const [errorProvs, setErrorProvs] = useState(null);

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
