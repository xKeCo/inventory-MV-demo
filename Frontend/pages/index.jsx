// React
import { useContext } from "react";

// Next
import { useRouter } from "next/router";

// Styles
import s from "../styles/Home.module.css";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import SEO from "../components/SEO/SEO";

// Hooks
import useProducts from "../hooks/useProducts";
import useProvs from "../hooks/useProvs";
import useOrders from "../hooks/useOrders";

// Context
import AuthContext from "../context/AuthProvider";

export default function Home() {
  // Get number of products, providers and stock
  const { numProducts } = useProducts();
  const { numProvs } = useProvs();
  const { numOrders } = useOrders();

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
                <code className={s.summary__value}> {numOrders}</code>
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
