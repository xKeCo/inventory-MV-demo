// Next
import Head from "next/head";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

// Styles
import s from "../styles/Productos.module.css";

function Productos() {
  return (
    <>
      <Head>
        <title>Mascotas del Valle - Productos</title>
        <meta
          name="description"
          content="Productos page of Mascotas del Valle"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <h1 className={s.title}>Productos</h1>
        </div>
      </div>
    </>
  );
}

export default Productos;
