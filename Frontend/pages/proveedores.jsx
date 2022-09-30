// React
import { useState } from "react";

// Next
import Head from "next/head";

// Axios
import axios from "axios";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Loader from "../components/Loader/Loader";

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
  FormControl,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

// Chakra UI Icons
import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          {loadingProvs ? (
            <Loader />
          ) : errorProvs ? (
            <h1>Error</h1>
          ) : (
            <>
              <h1 className={s.proveedores__title__text}>Proveedores</h1>
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
                <div className={s.proveedores__new__container}>
                  <form
                    className={s.proveedor__form__container}
                    onSubmit={handleSubmit}
                  >
                    <h2 className={s.proveedor__form__text}>
                      Crear nuevo proveedor
                    </h2>

                    <FormControl
                      id="name"
                      isRequired
                      className={s.proveedor__form}
                    >
                      <p>Nombre del proveedor</p>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Ingrese nombre del proveedor"
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl
                      id="number"
                      isRequired
                      className={s.proveedor__form}
                    >
                      <p>Contacto</p>
                      <Input
                        name="number"
                        pr="4.5rem"
                        type="number"
                        placeholder="Contacto del proveedor"
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl
                      id="other_contact"
                      className={s.proveedor__form}
                    >
                      <p>Otro medio de contacto</p>

                      <Input
                        name="other_contact"
                        pr="4.5rem"
                        placeholder="Otro medio de contacto"
                        onChange={handleChange}
                      />
                    </FormControl>

                    <button
                      className={
                        loadingProvs
                          ? s.proveedor__form__button__disabled
                          : s.proveedor__form__button
                      }
                      type="submit"
                      disabled={loadingProvs}
                    >
                      {loadingProvs ? "Cargando..." : "Agregar proveedor"}
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Proveedores;
