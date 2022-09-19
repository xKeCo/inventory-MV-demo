import Head from "next/head";
import Image from "next/image";
import s from "../styles/Home.module.css";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <Head>
            <title>Mascotas del Valle - Home</title>
            <meta
              name="description"
              content="Inventory of Mascotas del Valle"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className={s.main}>
            <h1 className={s.title}>Inicio</h1>
          </main>
        </div>
      </div>
    </>
  );
}
