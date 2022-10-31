// React
import { useState, useEffect, createContext } from "react";

// Next
import { useRouter } from "next/router";

// Axios
import axios from "axios";

// Local components
import Loader from "../components/Loader/Loader";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Get current user data
  const userAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        "https://mascotas-back-production.up.railway.app/api/user/auth",
        config
      );
      setAuth(data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        localStorage.removeItem("token");
        router.push("/login");
        setLoading(false);
      }
      console.log("hola", error);
    }
  };

  useEffect(() => {
    userAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        userAuth,
      }}
    >
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
