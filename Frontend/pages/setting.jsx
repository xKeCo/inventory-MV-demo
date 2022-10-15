// React
import { useContext, useEffect } from "react";
// Next
import Head from "next/head";
import { useRouter } from "next/router";

// Context
import AuthContext from "../context/AuthProvider";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

// Hooks
import useUsers from "../hooks/useUsers";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
// Chakra UI - Icons
import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";

// Styles
import s from "../styles/Setting.module.css";
import Loader from "../components/Loader/Loader";

function Setting() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // redirect to login if it's not logged in
    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  const { docsUsers, loadingUsers, errorUsers, setLoadingUsers, getUsers } =
    useUsers();

  // handle delete
  const handleDelete = async (id, name) => {
    try {
      await axios.delete(
        `https://mascotas-back.herokuapp.com/api/user/delete/${id}`
      );
      getUsers();
      setLoadingUsers(false);
      toast.success(`Se ha eliminado el proveedor ${name}`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);

      setLoadingUsers(false);
    }
  };

  return (
    <>
      <Head>
        <title>Mascotas del Valle - Ajustes</title>
        <meta name="description" content="Setting page of Mascotas del Valle" />
        <link rel="icon" href="/logos/icon_orange.png" />
      </Head>
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <h1 className={s.title}>Ajustes</h1>

          {loadingUsers ? (
            <Loader />
          ) : errorUsers ? (
            <p>{errorUsers}</p>
          ) : (
            <>
              <div className={s.settings}>
                <div className={s.settings__table}>
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
                            Usuario
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Rol
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Correo
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Creado
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
                        {docsUsers.map((doc) => (
                          <Tr key={doc.id}>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.id}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.name}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.username}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.type === "A" ? "Admin" : "Trabajador"}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.email}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.date}
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
    </>
  );
}

export default Setting;
