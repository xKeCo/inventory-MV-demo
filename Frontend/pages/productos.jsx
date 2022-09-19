// Local Components
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

// Styles
import s from "../styles/Productos.module.css";

function Productos() {
  return (
    <>
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <Head>
            <title>Mascotas del Valle - Productos</title>
            <meta
              name="description"
              content="Productos page of Mascotas del Valle"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <h1 className={s.title}>Productos</h1>
        </div>
      </div>
    </>
  );
}

export default Productos;
