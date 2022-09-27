import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useProvs = () => {
  const [docs, setDocs] = useState([]);

  // loader
  const [loading, setLoading] = useState(true);

  // error
  const [error, setError] = useState(null);

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

      setDocs(docs);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProveedores();
  }, []);

  return {
    docs,
    loading,
    error,
    setLoading,
    getProveedores,
  };
};

export default useProvs;
