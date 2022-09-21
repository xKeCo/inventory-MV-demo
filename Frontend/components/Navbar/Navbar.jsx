// React
import { useContext, useRef } from "react";

// Next
import { useRouter } from "next/router";

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
  Button,
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
} from "@chakra-ui/react";

// Chakra UI Icons
import {
  ChevronDownIcon,
  SearchIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";

// Local Components
import AuthContext from "../../context/AuthProvider";

function Navbar() {
  let router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const signOut = () => {
    localStorage.removeItem("token");
    setAuth(null);
    router.push("/login");
    console.log(auth);
    console.log(localStorage);
  };

  return (
    <>
      <div className={s.navbar}>
        <IconButton
          className={s.drawer__Button}
          icon={<TriangleDownIcon />}
          onClick={onOpen}
        />
        <div className={s.search__Container}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input placeholder="Buscar" />
          </InputGroup>
        </div>
        <div>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {auth ? auth.name : ""}
            </MenuButton>
            <MenuList>
              <MenuGroup
                title={auth && auth.type === "A" ? "Admin" : "Empleado"}
              >
                <MenuItem>Mi Cuenta</MenuItem>
                <MenuItem>Configuraci&oacute;n </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem onClick={signOut}>Cerrar sesi&oacute;n</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        size="full"
        autoFocus={false}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Basic Drawer
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;
