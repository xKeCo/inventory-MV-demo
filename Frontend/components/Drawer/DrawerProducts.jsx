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

export function DrawerProducts({
  isOpen,
  onClose,
  firstField,
  handleChange,
  handleSubmit,
  docsProvs,
  docsCategories,
  docsPets,
  loadingProducts,
  oneProductData,
  productData,
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
            {oneProductData ? "Editar producto" : "Crear nuevo producto"}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">ID del producto</FormLabel>
                <Input
                  isRequired
                  name="product_id"
                  ref={firstField}
                  placeholder="Ingrese nombre del proveedor"
                  onChange={handleChange}
                  defaultValue={oneProductData?.id || ""}
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
                  defaultValue={oneProductData?.name || ""}
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
                  defaultValue={oneProductData?.stock || ""}
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
                <FormLabel htmlFor="weigth">Peso</FormLabel>
                <Flex gap="1rem">
                  <NumberInput
                    isRequired
                    name="weigth"
                    precision={2}
                    step={0.2}
                    min={0}
                    max={100}
                    defaultValue={oneProductData?.weigth || ""}
                    onChange={(value) =>
                      handleChange({ target: { name: "weigth", value } })
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
                    name="measure"
                    onChange={handleChange}
                    defaultValue={oneProductData?.measure || ""}
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
                  defaultValue={oneProductData?.price || ""}
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
                <FormLabel htmlFor="provider_fk">Proveedor</FormLabel>

                <Select
                  isRequired
                  name="provider_fk"
                  // defaultValue={oneProductData?.provName || ""}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  {docsProvs.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="category_fk">Categoria</FormLabel>

                <Select
                  isRequired
                  name="category_fk"
                  onChange={handleChange}
                  // defaultValue={oneProductData?.categoryName || ""}
                >
                  <option value=""></option>
                  {docsCategories.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="pet_fk">Mascota</FormLabel>

                <Select
                  isRequired
                  name="pet_fk"
                  mb="3rem"
                  // defaultValue={oneProductData?.petName || ""}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  {docsPets.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
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
                loadingProducts ? s.form__button__disabled : s.form__button
              }
              type="submit"
              disabled={
                loadingProducts ||
                (productData.id === oneProductData?.id &&
                  productData.name === oneProductData?.name &&
                  productData.stock === oneProductData?.stock &&
                  productData.weigth === oneProductData?.weigth &&
                  productData.measure === oneProductData?.measure &&
                  productData.price === oneProductData?.price)
              }
            >
              {loadingProducts ? "Cargando..." : "Agregar producto"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}
