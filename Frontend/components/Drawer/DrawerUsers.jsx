// Chakra UI
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

// Styles
import s from "./Drawers.module.css";

function DrawerUsers({
  isOpen,
  onClose,
  firstField,
  handleChange,
  handleSubmit,
  loadingUsers,
  userDataUser,
  oneProvData,
}) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
      size="sm"
    >
      <DrawerOverlay />
      <form onSubmit={handleSubmit}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {oneProvData ? "Editar usuario" : "Crear nuevo usuario"}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Usuario del trabajador</FormLabel>
                <Input
                  isRequired
                  name="username"
                  ref={firstField}
                  placeholder="Ingrese el usuario del trabajador"
                  onChange={handleChange}
                  defaultValue={oneProvData?.username || ""}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Nombre del trabajador</FormLabel>
                <Input
                  isRequired
                  name="name"
                  id="name"
                  placeholder="Ingrese nombre del trabajador"
                  onChange={handleChange}
                  defaultValue={oneProvData?.name || ""}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="email">Email del trabajador</FormLabel>
                <Input
                  isRequired
                  name="email"
                  id="email"
                  placeholder="Ingrese email del trabajador"
                  onChange={handleChange}
                  defaultValue={oneProvData?.email || ""}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="type">Rol del trabajador</FormLabel>

                <Select isRequired name="type" onChange={handleChange}>
                  {!oneProvData ? (
                    <>
                      <option value=""></option>
                      <option value="A">A - Administrador</option>
                      <option value="T">T - Trabajdor</option>
                    </>
                  ) : oneProvData && oneProvData.type === "A" ? (
                    <>
                      <option value="A">A - Administrador</option>
                      <option value="T">T - Trabajdor</option>
                    </>
                  ) : (
                    <>
                      <option value="T">T - Trabajdor</option>
                      <option value="A">A - Administrador</option>
                    </>
                  )}
                </Select>
              </Box>

              {!oneProvData && (
                <Box>
                  <FormLabel htmlFor="password">
                    Contrase&ntilde;a temporal del trabajador
                  </FormLabel>
                  <Input
                    isRequired
                    name="password"
                    id="password"
                    placeholder="Ingrese la contrase&ntilde;a temporal del trabajador"
                    onChange={handleChange}
                  />
                </Box>
              )}
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              className={
                loadingUsers
                  ? s.proveedor__form__button__disabled
                  : s.proveedor__form__button
              }
              type="submit"
              disabled={
                loadingUsers ||
                (userDataUser.username === oneProvData?.username &&
                  userDataUser.name === oneProvData?.name &&
                  userDataUser.email === oneProvData?.email &&
                  userDataUser.type === oneProvData?.type)
              }
            >
              {loadingUsers ? "Cargando..." : "Agregar usuario"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}

export default DrawerUsers;
