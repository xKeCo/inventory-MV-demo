// Local Components
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

// Styles
import s from "../styles/Proveedores.module.css";

function Proveedores() {
  return (
    <>
      <Head>
        <title>Mascotas del Valle - Proveedores</title>
        <meta
          name="description"
          content="Proveedores page of Mascotas del Valle"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />

          <h1 className={s.title}>Proveedores</h1>
        </div>
      </div>
    </>
  );
}

export default Proveedores;
