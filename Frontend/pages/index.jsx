// React
import { useContext, useEffect } from "react";

// Next
import Head from "next/head";
import { useRouter } from "next/router";

// Styles
import s from "../styles/Home.module.css";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

// Hooks
import useProducts from "../hooks/useProducts";
import useProvs from "../hooks/useProvs";
import useStock from "../hooks/useStock";

// Context
import AuthContext from "../context/AuthProvider";

export default function Home() {
  const { numProducts } = useProducts();
  const { numProvs } = useProvs();
  const { numStock } = useStock();

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
            <link rel="icon" href="/logos/icon_orange.png" />
          </Head>
          <main className={s.main}>
            <h1 className={s.title}>Inicio</h1>

            <div className={s.summary__container}>
              <div className={s.summary__container__item}>
                <h2 className={s.summary__item_title}>
                  Cantidad de proveedores
                </h2>
                <code className={s.summary__value}> {numProvs}</code>
              </div>
              <div className={s.summary__container__item}>
                <h2 className={s.summary__item_title}>Cantidad de productos</h2>
                <code className={s.summary__value}> {numProducts}</code>
              </div>
              <div className={s.summary__container__item}>
                <h2 className={s.summary__item_title}>
                  Productos con poco stock
                </h2>
                <code className={s.summary__value}> {numStock}</code>
              </div>
              <div className={s.summary__container__item}>
                <h2 className={s.summary__item_title}>
                  Ultimo pedido generado
                </h2>
                <code className={s.summary__value}> 21/Agosto/2022 </code>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
