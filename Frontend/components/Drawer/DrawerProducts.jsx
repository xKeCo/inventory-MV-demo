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
  Select,
  Stack,
} from "@chakra-ui/react";

// Styles
import s from "./Drawers.module.css";

function DrawerProducts({
  isOpen,
  onClose,
  firstField,
  handleChange,
  handleSubmit,
  docsProvs,
  docsCategories,
  docsPets,
  loadingProducts,
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
            Crear nuevo producto
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">ID del producto</FormLabel>
                <Input
                  isRequired
                  name="prod_id"
                  ref={firstField}
                  placeholder="Ingrese nombre del proveedor"
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Nombre del producto</FormLabel>
                <Input
                  isRequired
                  name="name"
                  id="name"
                  placeholder="Ingrese nombre del proveedor"
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="stock">Stock actual</FormLabel>
                <NumberInput
                  isRequired
                  name="stock"
                  type="number"
                  min={0}
                  max={100}
                  onChange={(value) =>
                    handleChange({ target: { name: "stock", value } })
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
                <FormLabel htmlFor="peso">Peso</FormLabel>
                <Flex gap="1rem">
                  <NumberInput
                    isRequired
                    name="peso"
                    precision={2}
                    step={0.2}
                    min={0}
                    max={100}
                    onChange={(value) =>
                      handleChange({ target: { name: "peso", value } })
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Select
                    isRequired
                    w="150px"
                    name="unidad_medida"
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="KG">KG</option>
                    <option value="LB">LB</option>
                  </Select>
                </Flex>
              </Box>

              <Box>
                <FormLabel htmlFor="price">Precio</FormLabel>
                <NumberInput
                  isRequired
                  name="price"
                  min={0}
                  max={1000000}
                  onChange={(value) =>
                    handleChange({ target: { name: "price", value } })
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
                <FormLabel htmlFor="provid_fk">Proveedor</FormLabel>

                <Select isRequired name="provid_fk" onChange={handleChange}>
                  <option value=""></option>
                  {docsProvs.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="categid_fk">Categoria</FormLabel>

                <Select isRequired name="categid_fk" onChange={handleChange}>
                  <option value=""></option>
                  {docsCategories.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="mascotaid_fk">Mascota</FormLabel>

                <Select
                  isRequired
                  name="mascotaid_fk"
                  onChange={handleChange}
                  mb="3rem"
                >
                  <option value=""></option>
                  {docsPets.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </Select>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              className={
                loadingProducts
                  ? s.proveedor__form__button__disabled
                  : s.proveedor__form__button
              }
              type="submit"
              disabled={loadingProducts}
            >
              {loadingProducts ? "Cargando..." : "Agregar producto"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}

export default DrawerProducts;
