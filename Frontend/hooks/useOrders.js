// React
import { useEffect, useState } from "react";

// Axios
import axios from "axios";

export const useOrders = () => {
  // State for Order data
  const [docsOrders, setDocsOrders] = useState([]);

  // Number of Order
  const [numOrders, setNumOrders] = useState(0);

  // Loading state
  const [loadingOrders, setLoadingOrders] = useState(true);

  // error state
  const [errorOrders, setErrorOrders] = useState(null);

  // Get the token from local storage to verrify if the user is logged in
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch Order data
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://mascotas-back.onrender.com/api/order/all",
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

      setDocsOrders(docs);
      setNumOrders(data.orders.length);
      setLoadingOrders(false);
    } catch (error) {
      console.log(error);
      setErrorOrders(error);
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return {
    docsOrders,
    loadingOrders,
    numOrders,
    errorOrders,
    setLoadingOrders,
    getOrders,
  };
};
