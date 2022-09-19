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

// Icons
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

function Navbar() {
  return (
    <div className={s.navbar}>
      <div>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.500" />}
          />
          <Input placeholder="Buscar" />
        </InputGroup>
      </div>
      <div>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Nombre persona
          </MenuButton>
          <MenuList>
            <MenuGroup title="Admin">
              <MenuItem>Mi Cuenta</MenuItem>
              <MenuItem>Configuraci&oacute;n </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem>Cerrar sesi&oacute;n</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
