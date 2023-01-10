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
  Select,
  Stack,
} from "@chakra-ui/react";

// Styles
import s from "./Drawers.module.css";

export function DrawerOrder({
  isOpen,
  onClose,
  handleChange,
  handleSubmit,
  docsProvs,
  loadingOrders,
}) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />
      <form onSubmit={handleSubmit}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Crear nueva orden</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="provider">
                  Seleccione el proveedor
                </FormLabel>

                <Select isRequired name="provider" onChange={handleChange}>
                  <option value=""></option>
                  {docsProvs.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              </Box>

              <Box></Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              className={
                loadingOrders ? s.form__button__disabled : s.form__button
              }
              type="submit"
              disabled={loadingOrders}
            >
              {loadingOrders ? "Cargando..." : "Crear Orden"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}
