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
import s from "../styles/Stock.module.css";

function Stock() {
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
        <title>Mascotas del Valle - Stock</title>
        <meta name="description" content="Stock page of Mascotas del Valle" />
        <link rel="icon" href="/logos/icon_orange.png" />
      </Head>
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <h1 className={s.title}>Stock</h1>
        </div>
      </div>
    </>
  );
}

export default Stock;
