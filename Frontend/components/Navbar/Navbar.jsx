// React
import { useContext } from "react";

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
} from "@chakra-ui/react";
// Chakra UI Icons
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

// Local Components
import AuthContext from "../../context/AuthProvider";

function Navbar() {
  let router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);

  const signOut = () => {
    localStorage.removeItem("token");
    setAuth(null);
    router.push("/login");
    console.log(auth);
    console.log(localStorage);
  };

  return (
    <div className={s.navbar}>
      <div>
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
            <MenuGroup title={auth && auth.type === "A" ? "Admin" : "Empleado"}>
              <MenuItem>Mi Cuenta</MenuItem>
              <MenuItem>Configuraci&oacute;n </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem onClick={signOut}>Cerrar sesi&oacute;n</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
