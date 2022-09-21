// React
import { useContext } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Chakra UI
import {
  IconButton,
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  color,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
// Chakra UI Icons
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

// Styles
import s from "./Sidebar.module.css";
import AppContext from "../../context/AppProvider";
import AuthContext from "../../context/AuthProvider";

function Sidebar() {
  const router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);

  const signOut = () => {
    localStorage.removeItem("token");
    setAuth(null);
    router.push("/login");
    console.log(auth);
    console.log(localStorage);
  };

  const { expanded, setExpanded } = useContext(AppContext);

  return (
    <div
      className={expanded ? `${s.sidebar}` : `${s.sidebar} ${s.sidebar__small}`}
    >
      <div>
        {/* <Link href="/"> */}
        <div
          className={
            expanded
              ? `${s.sidebar__logo__container}`
              : `${s.sidebar__logo__container} ${s.sidebar__logo__container__small}`
          }
        >
          {expanded && (
            <img
              src="/logos/logo1.png"
              alt="Logo de mascotas del valle"
              width="25%"
            />
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
                <Tooltip
                  label="Pedidos"
                  isDisabled={expanded}
                  placement="right"
                >
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
                <Tooltip
                  label="Reportes"
                  isDisabled={expanded}
                  placement="right"
                >
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

      <div>
        <ul>
          <Menu>
            <Tooltip label="Cuenta" isDisabled={expanded} placement="right">
              <MenuButton w="100%">
                <li
                  className={
                    expanded
                      ? `${s.sidebar__user__menu}`
                      : `${s.sidebar__user__menu} ${s.sidebar__user__menu__small}`
                  }
                >
                  <Avatar size="sm" name={`${auth ? auth.name : ""}`}>
                    <AvatarBadge boxSize="1.25em" bg="green.500" />
                  </Avatar>
                  {expanded && (
                    <p className={s.user__name}>
                      {auth ? auth.name : ""} <br />
                      <span className={s.user__role}>
                        {auth && auth.type === "A" ? "Admin" : "Empleado"}
                      </span>
                    </p>
                  )}
                </li>
              </MenuButton>
            </Tooltip>
            <MenuList
              {...(!expanded
                ? {
                    ml: "5.5rem",
                    mb: "-4rem",
                  }
                : {
                    ml: "0",
                    mb: "0",
                  })}
            >
              <MenuGroup>
                <MenuItem>Mi Cuenta</MenuItem>
                <MenuItem>Configuraci&oacute;n </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem onClick={signOut} className={s.singOut__Text}>
                Cerrar sesi&oacute;n
              </MenuItem>
            </MenuList>
          </Menu>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
