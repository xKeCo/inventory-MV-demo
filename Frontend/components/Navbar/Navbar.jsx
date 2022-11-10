// React
import { useContext } from "react";

// Next
import { useRouter } from "next/router";
import Link from "next/link";

// Styles
import s from "./Navbar.module.css";

// Chakra UI
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";

// Chakra UI Icons
import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";

// Local Components
import AuthContext from "../../context/AuthProvider";

function Navbar() {
  // User context = User data
  const { auth, setAuth } = useContext(AuthContext);

  // Router = Redirect
  const router = useRouter();

  // Chakra UI Drawer handler
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <>
      <div className={s.navbar}>
        <IconButton
          className={s.drawer__Button}
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
        <div>
          <Menu>
            <MenuButton w="100%" h="100%">
              <Avatar size="sm" name={`${auth?.name || ""}`}>
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </MenuButton>
            <MenuList mt="0.8rem">
              <MenuGroup
                title={`${auth?.name} - ${
                  auth?.type === "A" ? "Admin" : "Trabajador"
                }`}
              >
                <Link href="/setting">
                  <MenuItem>Ajuste de cuenta</MenuItem>
                </Link>
              </MenuGroup>
              <MenuDivider />
              <MenuItem onClick={signOut} color="#FF0000" fontWeight="500">
                Cerrar sesi&oacute;n
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        size="md"
        autoFocus={false}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <img
              src="/logos/icon_orange.png"
              alt="Logo de mascotas del valle"
              width="50px"
            />
            <DrawerCloseButton h="60px" mr="0.7rem" />
          </DrawerHeader>
          <DrawerBody padding="0">
            <div className={s.navbar__links__container}>
              <ul>
                <Link href="/">
                  <li
                    className={
                      router.pathname == "/"
                        ? `${s.navbar__link} ${s.active}`
                        : `${s.navbar__link}`
                    }
                  >
                    <img
                      className={s.icon_image}
                      src="/icons/home.svg"
                      alt="Home"
                      width="16px"
                      height="16px"
                    />
                    <p>Inicio</p>
                  </li>
                </Link>
                <Link href="/proveedores">
                  <li
                    className={
                      router.pathname == "/proveedores"
                        ? `${s.navbar__link} ${s.active}`
                        : `${s.navbar__link}`
                    }
                  >
                    <img
                      className={s.icon_image}
                      src="/icons/proveedores.svg"
                      alt="Proveedores"
                      width="16px"
                      height="16px"
                    />

                    <p>Proveedores</p>
                  </li>
                </Link>
                <Link href="/productos">
                  <li
                    className={
                      router.pathname == "/productos"
                        ? `${s.navbar__link} ${s.active}`
                        : `${s.navbar__link}`
                    }
                  >
                    <img
                      className={s.icon_image}
                      src="/icons/productos.svg"
                      alt="Productos"
                      width="16px"
                      height="16px"
                    />
                    <p>Productos</p>
                  </li>
                </Link>
                <Link href="/orders">
                  <li
                    className={
                      router.pathname == "/orders"
                        ? `${s.navbar__link} ${s.active}`
                        : `${s.navbar__link}`
                    }
                  >
                    <img
                      className={s.icon_image}
                      src="/icons/order.svg"
                      alt="Order"
                      width="16px"
                      height="16px"
                    />
                    <p>Ordenes</p>
                  </li>
                </Link>
                <Link href="/pedidos">
                  <li
                    className={
                      router.pathname == "/pedidos"
                        ? `${s.navbar__link} ${s.active}`
                        : `${s.navbar__link}`
                    }
                  >
                    <img
                      className={s.icon_image}
                      src="/icons/pedidos.svg"
                      alt="Pedidos"
                      width="16px"
                      height="16px"
                    />
                    <p>Pedidos</p>
                  </li>
                </Link>
                <Link href="/reportes">
                  <li
                    className={
                      router.pathname == "/reportes"
                        ? `${s.navbar__link} ${s.active}`
                        : `${s.navbar__link}`
                    }
                  >
                    <img
                      className={s.icon_image}
                      src="/icons/reportes.svg"
                      alt="Reportes"
                      width="16px"
                      height="16px"
                    />

                    <p>Reportes</p>
                  </li>
                </Link>
              </ul>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;
