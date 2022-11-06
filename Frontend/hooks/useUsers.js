// React
import { useEffect, useState } from "react";

// Axios
import axios from "axios";

const useUsers = () => {
  // State for users data
  const [docsUsers, setDocsUsers] = useState([]);

  // Loading state
  const [loadingUsers, setLoadingUsers] = useState(true);

  // error state
  const [errorUsers, setErrorUsers] = useState(null);

  // Get the token from local storage to verrify if the user is logged in
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch users data
  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://mascotas-back-production.up.railway.app/api/user/all",
        config
      );

      const docs = data.users.map(
        ({ user_id, username, name, email, type, created_at, created_by }) => ({
          id: user_id,
          username,
          name,
          email,
          type,
          date: created_at.substring(0, 10),
          created_by,
        })
      );
      setDocsUsers(docs);
      setLoadingUsers(false);
    } catch (error) {
      setErrorUsers(error);
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    docsUsers,
    loadingUsers,
    errorUsers,
    setLoadingUsers,
    getUsers,
  };
};

export default useUsers;
