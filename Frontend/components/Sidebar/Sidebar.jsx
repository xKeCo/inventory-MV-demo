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
  Tooltip,
} from "@chakra-ui/react";
// Chakra UI Icons
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

// Styles
import s from "./Sidebar.module.css";

// Context
import AppContext from "../../context/AppProvider";
import AuthContext from "../../context/AuthProvider";

function Sidebar() {
  // User context = User data
  const { auth, setAuth } = useContext(AuthContext);

  // Router = Redirect
  const router = useRouter();

  // SingOut function
  const signOut = () => {
    try {
      localStorage.removeItem("token");
      setAuth(null);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // handle if sidebar is open or not
  const { expanded, setExpanded } = useContext(AppContext);

  return (
    <>
      <div
        className={
          expanded ? `${s.sidebar}` : `${s.sidebar} ${s.sidebar__small}`
        }
      >
        <div>
          <div
            className={
              expanded
                ? `${s.sidebar__logo__container}`
                : `${s.sidebar__logo__container} ${s.sidebar__logo__container__small}`
            }
          >
            {expanded && (
              <img
                src="/logos/icon_orange.png"
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

          <div className={s.sidebar__links__container}>
            <ul>
              <Link href="/">
                <Tooltip label="Inicio" isDisabled={expanded} placement="right">
                  <li
                    className={
                      router.pathname === "/"
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
              </Link>
              <Link href="/proveedores">
                <Tooltip
                  label="Proveedores"
                  isDisabled={expanded}
                  placement="right"
                >
                  <li
                    className={
                      router.pathname === "/proveedores"
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
              </Link>
              <Link href="/productos">
                <Tooltip
                  label="Productos"
                  isDisabled={expanded}
                  placement="right"
                >
                  <li
                    className={
                      router.pathname === "/productos"
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
              </Link>
              <Link href="/orders">
                <Tooltip
                  label="Ordenes"
                  isDisabled={expanded}
                  placement="right"
                >
                  <li
                    className={
                      router.pathname === "/orders"
                        ? `${s.sidebar__link} ${s.active}`
                        : `${s.sidebar__link}`
                    }
                  >
                    <img
                      className={s.icon_image}
                      src="/icons/order.svg"
                      alt="order"
                    />
                    {expanded && <p>Ordenes</p>}
                  </li>
                </Tooltip>
              </Link>
              <Link href="/pedidos">
                <Tooltip
                  label="Pedidos"
                  isDisabled={expanded}
                  placement="right"
                >
                  <li
                    className={
                      router.pathname === "/pedidos"
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
              </Link>
              <Link href="/reportes">
                <Tooltip
                  label="Reportes"
                  isDisabled={expanded}
                  placement="right"
                >
                  <li
                    className={
                      router.pathname === "/reportes"
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
              </Link>
            </ul>
          </div>
        </div>

        <div className={router.pathname === "/setting" && `${s.active}`}>
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
                    <Avatar size="sm" name={`${auth?.name || ""}`}>
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                    {expanded && (
                      <p className={s.user__name}>
                        {auth?.name || ""} <br />
                        <span className={s.user__role}>
                          {auth?.type === "A" ? "Admin" : "Trabajador"}
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
                <MenuGroup
                  title={`${auth?.name} - ${
                    auth?.type === "A" ? "Admin" : "Trabajador"
                  }`}
                >
                  <Link href="/setting">
                    <MenuItem>Ajuste de cuenta</MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem onClick={signOut} color="#FF0000" fontWeight="500">
                    Cerrar sesi&oacute;n
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
