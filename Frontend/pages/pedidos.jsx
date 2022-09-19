// Local Components
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

// Styles
import s from "../styles/Pedidos.module.css";

function pedidos() {
  return (
    <>
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <Head>
            <title>Mascotas del Valle - Pedidos</title>
            <meta
              name="description"
              content="Pedidos page of Mascotas del Valle"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <h1 className={s.title}>Pedidos</h1>
        </div>
      </div>
    </>
  );
}

export default pedidos;
