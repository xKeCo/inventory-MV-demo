// React
import { useContext } from "react";

// Next
import { useRouter } from "next/router";

// Local Components
import { Navbar, Sidebar, SEO } from "../components/";

// Context
import AuthContext from "../context/AuthProvider";

// Styles
import s from "../styles/Reportes.module.css";

function Reportes() {
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
      <SEO title={"Reportes"} />

      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <h1 className={s.title}>Reportes</h1>
        </div>
      </div>
    </>
  );
}

export default Reportes;
