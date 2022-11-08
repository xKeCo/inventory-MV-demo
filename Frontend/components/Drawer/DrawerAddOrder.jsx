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
  Flex,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";

// Styles
import s from "./Drawers.module.css";

function DrawerAddOrder({
  isOpen,
  onClose,
  handleChange,
  handleSubmit,
  loadingProductByProv,
  oneOrderData,
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
                <FormLabel htmlFor="product_fk">ID del producto</FormLabel>
                <Input
                  isReadOnly
                  name="product_fk"
                  id="product_fk"
                  placeholder="Ingrese nombre del proveedor"
                  onChange={handleChange}
                  defaultValue={oneOrderData?.prodID}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="prodName">Nombre del producto</FormLabel>
                <Input
                  isReadOnly
                  name="prodName"
                  id="prodName"
                  placeholder="Ingrese nombre del proveedor"
                  onChange={handleChange}
                  defaultValue={oneOrderData?.prodName}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="price">Precio</FormLabel>
                <Input
                  isReadOnly
                  name="price"
                  id="price"
                  placeholder="Ingrese nombre del proveedor"
                  onChange={handleChange}
                  defaultValue={oneOrderData?.price}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="stock">Cantidad ACTUAL</FormLabel>
                <Input
                  isReadOnly
                  name="stock"
                  id="stock"
                  defaultValue={oneOrderData?.stock}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="quantity">Cantidad A PEDIR</FormLabel>
                <NumberInput
                  isRequired
                  name="quantity"
                  min={0}
                  max={1000000}
                  onChange={(value) =>
                    handleChange({ target: { name: "quantity", value } })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>

              <Box>
                <FormLabel htmlFor="price">Peso</FormLabel>
                <Flex gap="1rem">
                  <Input
                    isReadOnly
                    name="weight"
                    id="weight"
                    placeholder="Ingrese nombre del proveedor"
                    onChange={handleChange}
                    defaultValue={oneOrderData?.weigth}
                  />
                  <Input
                    isReadOnly
                    name="measure"
                    id="measure"
                    placeholder="Ingrese nombre del proveedor"
                    onChange={handleChange}
                    defaultValue={oneOrderData?.measure}
                  />
                </Flex>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              className={
                loadingProductByProv ? s.form__button__disabled : s.form__button
              }
              type="submit"
              disabled={loadingProductByProv}
            >
              {loadingProductByProv ? "Cargando..." : "Crear Orden"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}

export default DrawerAddOrder;
