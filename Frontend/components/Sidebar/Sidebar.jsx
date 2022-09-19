import Link from "next/link";
import { useRouter } from "next/router";

// Styles
import s from "./Sidebar.module.css";

function Sidebar() {
  const router = useRouter();

  return (
    <div className={s.sidebar}>
      <Link href="/">
        <div className={s.sidebar__logo__container}>
          <img src="/logo.png" alt="Logo de mascotas del valle" width="85%" />
        </div>
      </Link>

      <div className={s.sidebar__links__container}>
        <ul>
          <Link href="/">
            <li
              className={
                router.pathname == "/"
                  ? `${s.sidebar__link} ${s.active}`
                  : `${s.sidebar__link}`
              }
            >
              Inicio
            </li>
          </Link>
          <Link href="/proveedores">
            <li
              className={
                router.pathname == "/proveedores"
                  ? `${s.sidebar__link} ${s.active}`
                  : `${s.sidebar__link}`
              }
            >
              Proveedores
            </li>
          </Link>
          <Link href="/productos">
            <li
              className={
                router.pathname == "/productos"
                  ? `${s.sidebar__link} ${s.active}`
                  : `${s.sidebar__link}`
              }
            >
              Productos
            </li>
          </Link>
          <Link href="/stock">
            <li
              className={
                router.pathname == "/stock"
                  ? `${s.sidebar__link} ${s.active}`
                  : `${s.sidebar__link}`
              }
            >
              Stock
            </li>
          </Link>
          <Link href="/pedidos">
            <li
              className={
                router.pathname == "/pedidos"
                  ? `${s.sidebar__link} ${s.active}`
                  : `${s.sidebar__link}`
              }
            >
              Pedidos
            </li>
          </Link>
          <Link href="/reportes">
            <li
              className={
                router.pathname == "/reportes"
                  ? `${s.sidebar__link} ${s.active}`
                  : `${s.sidebar__link}`
              }
            >
              Reportes
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
