import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        const { data } = await axios(
          "https://mascotas-back.herokuapp.com/api/user/auth",
          config
        );
        setAuth(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    userAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {loading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
