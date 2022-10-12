// React

// Next
import Head from "next/head";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

// Styles
import s from "../styles/Stock.module.css";

function Stock() {
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
