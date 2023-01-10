// React
import { useContext } from "react";

// Next
import { useRouter } from "next/router";
import Link from "next/link";

// Styles
import s from "../styles/Home.module.css";

// Local Components
import {
  SEO,
  Sidebar,
  Navbar,
  Vertical,
  AreaGraph,
  MultiAxis,
} from "../components";

// Hooks
import { useProducts, useProvs, useOrders, useOrdersArrived } from "../hooks/";

// Context
import AuthContext from "../context/AuthProvider";

export default function Home() {
  // Get number of products, providers and stock
  const { numProducts } = useProducts();
  const { numProvs } = useProvs();
  const { numOrders } = useOrders();
  const { numOrdersArrived } = useOrdersArrived();

  // User context = User data
  const { auth } = useContext(AuthContext);

  // Router = Redirect
  const router = useRouter();

  // redirect to home if already logged in
  if (!auth) {
    router.push("/login");
  }

  return (
    <>
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <SEO title={"Inicio"} />

          <main className={s.main}>
            <h1 className={s.title}>Inicio</h1>

            <div className={s.summary__container}>
              <Link href="/proveedores">
                <div className={s.summary__container__item}>
                  <h2 className={s.summary__item_title}>
                    Cantidad de proveedores
                  </h2>
                  <code className={s.summary__value}> {numProvs}</code>
                </div>
              </Link>

              <Link href="/productos">
                <div className={s.summary__container__item}>
                  <h2 className={s.summary__item_title}>
                    Cantidad de productos
                  </h2>
                  <code className={s.summary__value}> {numProducts}</code>
                </div>
              </Link>

              <div className={s.summary__container__item}>
                <h2 className={s.summary__item_title}>Cantidad de ordenes</h2>
                <div className={s.summary__orders}>
                  <Link href="/orders">
                    <div>
                      <h2 className={s.summary__item_title}>En Camino</h2>
                      <code className={s.summary__value}> {numOrders}</code>
                    </div>
                  </Link>

                  <Link href="/pedidos">
                    <div>
                      <h2 className={s.summary__item_title}>Recibidas</h2>
                      <code className={s.summary__value}>
                        {numOrdersArrived}
                      </code>
                    </div>
                  </Link>
                </div>
              </div>
              <div className={s.summary__container__item}>
                <h2 className={s.summary__item_title}>
                  Ultimo pedido generado
                </h2>
                <code className={s.summary__value}> 11/09/2022 </code>
              </div>
            </div>

            <div className={s.summary__container}>
              <div className={s.summary__container__graphic__item}>
                <h2 className={s.summary__graphic__item__title}>
                  Cantidad de vendidos
                </h2>
                <h1 className={s.summary__graphic__value}>$ 248.600</h1>
                <p className={s.summary__graphic__item__subtitle}>Por dias</p>
                <Vertical />
              </div>
              <div className={s.summary__container__graphic__item}>
                <h2 className={s.summary__graphic__item__title}>
                  Mas vendidos
                </h2>
                <h1 className={s.summary__graphic__value}>$ 7.460.000</h1>
                <p className={s.summary__graphic__item__subtitle}>Por meses</p>
                <AreaGraph />
              </div>
              <div className={s.summary__container__graphic__item}>
                <h2 className={s.summary__graphic__item__title}>Productos</h2>
                <h1 className={s.summary__graphic__value}>1.600</h1>
                <p className={s.summary__graphic__item__subtitle}>En Stock</p>
                <MultiAxis />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
