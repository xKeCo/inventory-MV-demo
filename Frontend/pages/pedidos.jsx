// React
import { useContext, useEffect } from "react";

// Next
import Head from "next/head";
import { useRouter } from "next/router";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

// Context
import AuthContext from "../context/AuthProvider";

// Styles
import s from "../styles/Pedidos.module.css";

function Pedidos() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Mascotas del Valle - Pedidos</title>
        <meta name="description" content="Pedidos page of Mascotas del Valle" />
        <link rel="icon" href="/logos/icon_orange.png" />
      </Head>
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
