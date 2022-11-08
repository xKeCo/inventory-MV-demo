// React
import { useEffect, useState } from "react";

// Axios
import axios from "axios";

const useOrderByID = () => {
  // State for Order data
  const [docsOrderByID, setDocsOrderByID] = useState([]);

  // Number of Order
  const [numOrderByID, setNumOrderByID] = useState(0);

  // Loading state
  const [loadingOrderByID, setLoadingOrderByID] = useState(true);

  // error state
  const [errorOrderByID, setErrorOrderByID] = useState(null);

  // Get the token from local storage to verrify if the user is logged in
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch Order data
  const getOrderByID = async (id) => {
    try {
      const { data } = await axios.get(
        `https://mascotas-back-production.up.railway.app/api/order/order/${id}`,
        config
      );

      const docs = data.orders.map(
        ({
          order_details_id,
          product_id,
          product_name,
          unit_price,
          quantity,
          total,
          weigth,
          measure,
          adding_by,
        }) => ({
          orderDetailID: order_details_id,
          prodID: product_id,
          prodName: product_name,
          unit_price,
          quantity,
          total,
          weigth,
          measure,
          adding_by,
        })
      );
      setDocsOrderByID(docs);
      setNumOrderByID(data.orders.length);
      setLoadingOrderByID(false);
    } catch (error) {
      console.log(error);
      setErrorOrderByID(error);
      setLoadingOrderByID(false);
    }
  };

  return {
    docsOrderByID,
    loadingOrderByID,
    numOrderByID,
    errorOrderByID,
    setLoadingOrderByID,
    getOrderByID,
  };
};

export default useOrderByID;
