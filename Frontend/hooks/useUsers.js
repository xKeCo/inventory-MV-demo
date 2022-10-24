// React
import { useEffect, useState } from "react";

// React-hot-toast Notifications
import { toast } from "react-hot-toast";

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
        "https://mascotas-back.herokuapp.com/api/user/all",
        config
      );

      const docs = data.users.map(
        ({ user_id, username, name, email, type, created_at }) => ({
          id: user_id.substring(0, 8),
          username,
          name,
          email,
          type,
          date: created_at.substring(0, 10),
        })
      );
      setDocsUsers(docs);
      setLoadingUsers(false);
    } catch (error) {
      setErrorUsers(error);
      setLoadingUsers(false);
      // toast.error(error.message);
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
