// React
import { useContext } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Chakra UI
import { IconButton } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
// Chakra UI Icons
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

// Styles
import s from "./Sidebar.module.css";
import AppContext from "../../context/AppProvider";

function Sidebar() {
  const router = useRouter();

  const { expanded, setExpanded } = useContext(AppContext);

  return (
    <div
      className={expanded ? `${s.sidebar}` : `${s.sidebar} ${s.sidebar__small}`}
    >
      {/* <Link href="/"> */}
      <div className={s.sidebar__logo__container}>
        {expanded && (
          <img src="/logo.png" alt="Logo de mascotas del valle" width="75%" />
        )}
        <IconButton
          variant="ghost"
          icon={expanded ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          onClick={() => {
            setExpanded(!expanded);
          }}
        />
      </div>
      {/* </Link> */}

      <div className={s.sidebar__links__container}>
        <ul>
          <Link href="/">
            <a>
              <Tooltip label="Inicio" isDisabled={expanded} placement="right">
                <li
                  className={
                    router.pathname == "/"
                      ? `${s.sidebar__link} ${s.active}`
                      : `${s.sidebar__link}`
                  }
                >
                  <img
                    className={s.icon_image}
                    src="/icons/home.svg"
                    alt="Home"
                  />
                  {expanded && <p>Inicio</p>}
                </li>
              </Tooltip>
            </a>
          </Link>
          <Link href="/proveedores">
            <a>
              <Tooltip
                label="Proveedores"
                isDisabled={expanded}
                placement="right"
              >
                <li
                  className={
                    router.pathname == "/proveedores"
                      ? `${s.sidebar__link} ${s.active}`
                      : `${s.sidebar__link}`
                  }
                >
                  <img
                    className={s.icon_image}
                    src="/icons/proveedores.svg"
                    alt="Proveedores"
                  />

                  {expanded && <p>Proveedores</p>}
                </li>
              </Tooltip>
            </a>
          </Link>
          <Link href="/productos">
            <a>
              <Tooltip
                label="Productos"
                isDisabled={expanded}
                placement="right"
              >
                <li
                  className={
                    router.pathname == "/productos"
                      ? `${s.sidebar__link} ${s.active}`
                      : `${s.sidebar__link}`
                  }
                >
                  <img
                    className={s.icon_image}
                    src="/icons/productos.svg"
                    alt="Productos"
                  />
                  {expanded && <p>Productos</p>}
                </li>
              </Tooltip>
            </a>
          </Link>
          <Link href="/stock">
            <a>
              <Tooltip label="Stock" isDisabled={expanded} placement="right">
                <li
                  className={
                    router.pathname == "/stock"
                      ? `${s.sidebar__link} ${s.active}`
                      : `${s.sidebar__link}`
                  }
                >
                  <img
                    className={s.icon_image}
                    src="/icons/stock.svg"
                    alt="Stock"
                  />
                  {expanded && <p>Stock</p>}
                </li>
              </Tooltip>
            </a>
          </Link>
          <Link href="/pedidos">
            <a>
              <Tooltip label="Pedidos" isDisabled={expanded} placement="right">
                <li
                  className={
                    router.pathname == "/pedidos"
                      ? `${s.sidebar__link} ${s.active}`
                      : `${s.sidebar__link}`
                  }
                >
                  <img
                    className={s.icon_image}
                    src="/icons/pedidos.svg"
                    alt="Pedidos"
                  />
                  {expanded && <p>Pedidos</p>}
                </li>
              </Tooltip>
            </a>
          </Link>
          <Link href="/reportes">
            <a>
              <Tooltip label="Reportes" isDisabled={expanded} placement="right">
                <li
                  className={
                    router.pathname == "/reportes"
                      ? `${s.sidebar__link} ${s.active}`
                      : `${s.sidebar__link}`
                  }
                >
                  <img
                    className={s.icon_image}
                    src="/icons/reportes.svg"
                    alt="Reportes"
                  />

                  {expanded && <p>Reportes</p>}
                </li>
              </Tooltip>
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
