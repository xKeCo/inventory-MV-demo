// React
import { useEffect, useState } from "react";

// React-hot-toast Notifications
import { toast } from "react-hot-toast";

// Axios
import axios from "axios";

const useProvs = () => {
  // State for provs data
  const [docsProvs, setDocsProvs] = useState([]);

  // Number of Provs
  const [numProvs, setNumProvs] = useState(0);

  // Loading state
  const [loadingProvs, setLoadingProvs] = useState(true);

  // Error state
  const [errorProvs, setErrorProvs] = useState(null);

  // Get the token from local storage to verrify if the user is logged in
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch provs data
  const getProveedores = async () => {
    try {
      const { data } = await axios.get(
        "https://mascotas-back.herokuapp.com/api/provider/all",
        config
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
      // toast.error(error.message);
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
