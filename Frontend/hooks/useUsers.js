import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useUsers = () => {
  const [docsUsers, setDocsUsers] = useState([]);

  // Nnumber of Users

  // loader
  const [loadingUsers, setLoadingUsers] = useState(true);

  // error
  const [errorUsers, setErrorUsers] = useState(null);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://mascotas-back.herokuapp.com/api/user/all"
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
      toast.error(error.message);
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
