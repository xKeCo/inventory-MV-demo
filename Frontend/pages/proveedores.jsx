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
import DrawerProvs from "../components/Drawer/DrawerProvs";

// Styles
import s from "../styles/Proveedores.module.css";

// Hooks
import useProvs from "../hooks/useProvs";

// Chakra UI
import {
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

// Chakra UI Icons
import { AddIcon, DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";

// React Toast notifications
import { toast } from "react-hot-toast";

function Proveedores() {
  const {
    docsProvs,
    loadingProvs,
    errorProvs,
    setLoadingProvs,
    getProveedores,
  } = useProvs();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const [provData, setProvData] = useState({
    name: "",
    number: "",
    other_contact: "",
  });

  // handle input change
  const handleChange = (e) => {
    setProvData({
      ...provData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit to post data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://mascotas-back.herokuapp.com/api/provider/new",
        provData
      );
      getProveedores();
      setLoadingProvs(false);
      onClose();
      toast.success("Se ha agregado el nuevo proveedor");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);

      setLoadingProvs(false);
    }
  };

  // handle delete
  const handleDelete = async (id, name) => {
    try {
      await axios.delete(
        `https://mascotas-back.herokuapp.com/api/provider/delete/${id}`
      );
      getProveedores();
      setLoadingProvs(false);
      toast.success(`Se ha eliminado el proveedor ${name}`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);

      setLoadingProvs(false);
    }
  };

  return (
    <>
      <Head>
        <title>Mascotas del Valle - Proveedores</title>
        <meta
          name="description"
          content="Proveedores page of Mascotas del Valle"
        />
        <link rel="icon" href="/logos/icon_orange.png" />
      </Head>
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <div className={s.proveedores__header__container}>
            <h1 className={s.proveedores__title__text}>Proveedores</h1>
            <Button
              leftIcon={<AddIcon />}
              onClick={onOpen}
              className={s.proveedores__add__button}
              disabled={errorProvs}
            >
              Nuevo proveedor
            </Button>
          </div>
          {loadingProvs ? (
            <Loader />
          ) : errorProvs ? (
            <h1>Error</h1>
          ) : (
            <>
              <div className={s.proveedores}>
                <div className={s.proveedores__table}>
                  <TableContainer height="100%">
                    <Table w="100%" variant="striped" size="sm">
                      <Thead>
                        <Tr>
                          <Th
                            w="200px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Nombre
                          </Th>
                          <Th
                            w="260px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Contacto
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Otro medio de contacto
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
                        {docsProvs.map((doc) => (
                          <Tr key={doc.id}>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.name}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.number}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.other_contact}
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

      <DrawerProvs
        isOpen={isOpen}
        onClose={onClose}
        firstField={firstField}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loadingProvs={loadingProvs}
      />
    </>
  );
}

export default Proveedores;
