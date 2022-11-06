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
  Stack,
} from "@chakra-ui/react";

// Styles
import s from "./Drawers.module.css";

function DrawerProvs({
  isOpen,
  onClose,
  firstField,
  handleChange,
  handleSubmit,
  loadingProvs,
  oneProvData,
  provData,
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
            {oneProvData ? "Editar proveedor" : "Crear nuevo proveedor"}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Nombre del proveedor</FormLabel>
                <Input
                  isRequired
                  name="name"
                  ref={firstField}
                  id="name"
                  placeholder="Ingrese nombre del proveedor"
                  onChange={handleChange}
                  defaultValue={oneProvData?.name || ""}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="contact">Contacto</FormLabel>
                <Input
                  isRequired
                  name="contact"
                  type="contact"
                  id="contact"
                  placeholder="Contacto del proveedor"
                  onChange={handleChange}
                  defaultValue={oneProvData?.contact || ""}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="other_contact">
                  Otro medio de contacto
                </FormLabel>
                <Input
                  name="other_contact"
                  placeholder="Otro medio de contacto"
                  onChange={handleChange}
                  defaultValue={oneProvData?.other_contact || ""}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              className={
                loadingProvs
                  ? s.drawer__form__button__disabled
                  : s.drawer__form__button
              }
              type="submit"
              disabled={
                loadingProvs ||
                (provData.name === oneProvData?.name &&
                  provData.contact === oneProvData?.contact &&
                  provData.other_contact === oneProvData?.other_contact)
              }
            >
              {loadingProvs
                ? "Cargando..."
                : oneProvData
                ? "Actualizar proveedor"
                : "Agregar proveedor"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}

export default DrawerProvs;
