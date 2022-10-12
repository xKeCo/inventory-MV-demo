// React
import { useRef, useState } from "react";

// Next
import Head from "next/head";

// Axios
import axios from "axios";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Loader from "../components/Loader/Loader";
import DrawerProducts from "../components/Drawer/DrawerProducts";

// Styles
import s from "../styles/Productos.module.css";

// Hooks
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import useProvs from "../hooks/useProvs";
import usePets from "../hooks/usePets";

// Chakra UI
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

// Chakra UI Icons
import { AddIcon, DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";

// React Toast notifications
import { toast } from "react-hot-toast";

function Productos() {
  const {
    docsProducts,
    loadingProducts,
    errorProducts,
    setLoadingProducts,
    getProducts,
  } = useProducts();

  const {
    docsProvs,
    // loadingProvs,
    // errorProvs,
    // setLoadingProvs,
    // getProveedores,
  } = useProvs();

  const {
    docsCategories,
    // loadingCategories,
    // numCategories,
    // errorCategories,
    // setLoadingCategories,
    // getCategories,
  } = useCategories();
  const {
    docsPets,
    // loadingCategories,
    // numCategories,
    // errorCategories,
    // setLoadingCategories,
    // getCategories,
  } = usePets();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const [productData, setProductData] = useState({
    prod_id: "",
    name: "",
    stock: "",
    peso: "",
    unidad_medida: "",
    price: "",
    provid_fk: "",
    categid_fk: "",
    mascotaid_fk: "",
  });

  // handle input change
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
    console.log(productData);
  };

  // handle submit to post data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://mascotas-back.herokuapp.com/api/product/new",
        productData
      );
      getProducts();
      onClose();
      setLoadingProducts(false);
      toast.success("Se ha agregado el nuevo producto");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);

      setLoadingProducts(false);
    }
  };

  // handle delete
  const handleDelete = async (id, name) => {
    try {
      await axios.delete(
        `https://mascotas-back.herokuapp.com/api/product/delete/${id}`
      );
      getProducts();
      setLoadingProducts(false);
      toast.success(`Se ha eliminado el producto ${name}`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);

      setLoadingProducts(false);
    }
  };

  return (
    <>
      <Head>
        <title>Mascotas del Valle - Productos</title>
        <meta
          name="description"
          content="Productos page of Mascotas del Valle"
        />
        <link rel="icon" href="/logos/icon_orange.png" />
      </Head>
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <div className={s.products__header__container}>
            <h1 className={s.products__title__text}>Productos</h1>
            <Button
              leftIcon={<AddIcon />}
              onClick={onOpen}
              className={s.products__add__button}
              disabled={errorProducts}
            >
              Nuevo producto
            </Button>
          </div>
          {loadingProducts ? (
            <Loader />
          ) : errorProducts ? (
            <h1>Error</h1>
          ) : (
            <>
              <div className={s.products}>
                <div className={s.products__table}>
                  <TableContainer w="100%" height="100%">
                    <Table w="100%" variant="striped" size="sm">
                      <Thead>
                        <Tr>
                          <Th
                            w="200px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            ID
                          </Th>
                          <Th
                            w="260px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Nombre
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Cant
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Peso
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Unidad
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Precio
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Prov
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Categor&iacute;a
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Mascota
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Manejo
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {docsProducts.map((doc) => (
                          <Tr key={doc.id}>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.id}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.name}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.stock}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.peso}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.unidad_medida}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.price}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.provName}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.categoryName}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.petName}
                            </Td>
                            <Td>
                              <Menu>
                                <MenuButton
                                  as={IconButton}
                                  aria-label="Options"
                                  backgroundColor="#e4531b"
                                  _hover={{ backgroundColor: "#83bb26" }}
                                  _active={{ backgroundColor: "#83bb26" }}
                                  icon={
                                    <EditIcon color="#fff" fontSize="20px" />
                                  }
                                  variant="outline"
                                />
                                <MenuList>
                                  <MenuItem icon={<InfoIcon />} isDisabled>
                                    Mas info
                                  </MenuItem>
                                  <MenuItem icon={<EditIcon />} isDisabled>
                                    Modificar
                                  </MenuItem>
                                  <MenuItem
                                    icon={<DeleteIcon />}
                                    onClick={() =>
                                      handleDelete(doc.id, doc.name)
                                    }
                                  >
                                    Eliminar
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <DrawerProducts
        isOpen={isOpen}
        onClose={onClose}
        firstField={firstField}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        docsProvs={docsProvs}
        docsCategories={docsCategories}
        docsPets={docsPets}
        loadingProducts={loadingProducts}
      />
    </>
  );
}

export default Productos;
