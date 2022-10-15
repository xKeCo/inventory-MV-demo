// React
import { useContext } from "react";

// Next
import { useRouter } from "next/router";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import SEO from "../components/SEO/SEO";

// Context
import AuthContext from "../context/AuthProvider";

// Styles
import s from "../styles/Pedidos.module.css";

function Pedidos() {
  // User context = User data
  const { auth } = useContext(AuthContext);

  // Router = Redirect
  const router = useRouter();

  // redirect to home if already logged in
  if (!auth) {
    router.push("/login");
  }

  return (
    <>
      <SEO title={"Pedidos"} />

      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <h1 className={s.title}>Pedidos</h1>
        </div>
      </div>
    </>
  );
}

export default Pedidos;
