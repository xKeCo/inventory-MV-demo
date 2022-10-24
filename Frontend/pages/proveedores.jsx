// React
import { useContext, useRef, useState } from "react";

// Next
import { useRouter } from "next/router";

// Axios
import axios from "axios";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Loader from "../components/Loader/Loader";
import DrawerProvs from "../components/Drawer/DrawerProvs";
import SEO from "../components/SEO/SEO";

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

// Context
import AuthContext from "../context/AuthProvider";

function Proveedores() {
  // User context = User data
  const { auth } = useContext(AuthContext);

  // Get the token from local storage to verrify if the user is logged in
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Router = Redirect
  const router = useRouter();

  // redirect to home if already logged in
  if (!auth) {
    router.push("/login");
  }

  // Get all providers data
  const {
    docsProvs,
    loadingProvs,
    errorProvs,
    setLoadingProvs,
    getProveedores,
  } = useProvs();

  // Chakra UI Drawer handler
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Auto-select first input on drawer open
  const firstField = useRef();

  // Provider data to send
  const [provData, setProvData] = useState({
    name: "",
    number: "",
    other_contact: "",
  });

  const [oneProvData, setOneProvData] = useState(null);

  // handle input change = get data from inputs
  const handleChange = (e) => {
    setProvData({
      ...provData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit = send data to db
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (oneProvData === null) {
        await axios.post(
          "https://mascotas-back.herokuapp.com/api/provider/new",
          provData,
          config
        );
        getProveedores();
        setLoadingProvs(false);
        onClose();
        toast.success("Se ha agregado el nuevo proveedor");
      } else {
        await axios.put(
          `https://mascotas-back.herokuapp.com/api/provider/update/${oneProvData.id}`,
          provData,
          config
        );
        getProveedores();
        setLoadingProvs(false);
        onClose();
        toast.success(`Se ha editado el proveedor ${provData.name}`);
      }

      setOneProvData(null);
      setProvData({
        name: "",
        number: "",
        other_contact: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);

      setLoadingProvs(false);
    }
  };

  // handle delete = delete provider from db
  const handleDelete = async (id, name) => {
    try {
      await axios.delete(
        `https://mascotas-back.herokuapp.com/api/provider/delete/${id}`,
        config
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
      <SEO title={"Proveedores"} />

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
            <h1>
              No se pueden mostrar los proveedores en este momento,
              int&eacute;ntalo de nuevo mas tarde.
            </h1>
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
                                  <MenuItem
                                    icon={<EditIcon />}
                                    onClick={() => {
                                      setOneProvData(doc);
                                      setProvData(doc);
                                      onOpen();
                                    }}
                                  >
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
        onClose={(event) => {
          onClose(event);
          setOneProvData(null);
          setProvData({
            name: "",
            number: "",
            other_contact: "",
          });
        }}
        firstField={firstField}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loadingProvs={loadingProvs}
        oneProvData={oneProvData}
        provData={provData}
      />
    </>
  );
}

export default Proveedores;
