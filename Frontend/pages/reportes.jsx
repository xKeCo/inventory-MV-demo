// React

// Next
import Head from "next/head";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

// Styles
import s from "../styles/Reportes.module.css";

function Reportes() {
  return (
    <>
      <Head>
        <title>Mascotas del Valle - Reportes</title>
        <meta
          name="description"
          content="Reportes page of Mascotas del Valle"
        />
        <link rel="icon" href="/logos/icon_orange.png" />
      </Head>
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
