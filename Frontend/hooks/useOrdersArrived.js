// React
import { useEffect, useState } from "react";

// Axios
import axios from "axios";

const useOrdersArrived = () => {
  // State for Order data
  const [docsOrdersArrived, setDocsOrdersArrived] = useState([]);

  // Number of Order

  // Loading state
  const [loadingOrdersArrived, setLoadingOrdersArrived] = useState(true);

  // error state
  const [errorOrdersArrived, setErrorOrdersArrived] = useState(null);

  // Get the token from local storage to verrify if the user is logged in
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch Order data
  const getOrdersArrived = async () => {
    try {
      const { data } = await axios.get(
        "https://mascotas-back-production.up.railway.app/api/order/all-order-arrive",
        config
      );

      const docs = data.orders.map(
        ({
          order_id,
          count,
          provider_name,
          provider_id,
          arrive,
          order_date,
        }) => ({
          id: order_id,
          count,
          provName: provider_name,
          provID: provider_id,
          arrive,
          date: order_date.substring(0, 10),
        })
      );

      setDocsOrdersArrived(docs);
      setLoadingOrdersArrived(false);
    } catch (error) {
      console.log(error);
      setErrorOrdersArrived(error);
      setLoadingOrdersArrived(false);
    }
  };

  useEffect(() => {
    getOrdersArrived();
  }, []);

  return {
    docsOrdersArrived,
    loadingOrdersArrived,
    errorOrdersArrived,
    setLoadingOrdersArrived,
    getOrdersArrived,
  };
};

export default useOrdersArrived;
