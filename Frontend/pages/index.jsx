// React

// Next
import Head from "next/head";

// Styles
import s from "../styles/Home.module.css";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

// Hooks
import useProducts from "../hooks/useProducts";
import useProvs from "../hooks/useProvs";

export default function Home() {
  const { numProducts } = useProducts();
  const { numProvs } = useProvs();

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
                <code className={s.summary__value}> {numProvs}</code>
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
