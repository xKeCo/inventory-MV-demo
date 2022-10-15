// React
import { useContext, useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";

// Context
import AuthContext from "../context/AuthProvider";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import SEO from "../components/SEO/SEO";
import Loader from "../components/Loader/Loader";

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
  FormControl,
  Input,
} from "@chakra-ui/react";
// Chakra UI - Icons
import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";

// Styles
import s from "../styles/Setting.module.css";

// Axios
import axios from "axios";

// react-hot-toast notifications
import { toast } from "react-hot-toast";

function Setting() {
  // User context = User data
  const { auth } = useContext(AuthContext);

  // Router = Redirect
  const router = useRouter();

  // Data State = Users data
  const [userData, setUserData] = useState({
    username: auth && auth.username,
    name: (auth && auth.name) || "",
    email: (auth && auth.email) || "",
    password: "",
    role: auth && auth.type,
  });

  // Loading state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // redirect to login if it's not logged in
    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  // Get users from db
  const { docsUsers, loadingUsers, errorUsers, setLoadingUsers, getUsers } =
    useUsers();

  // handle delete = delete user
  const handleDelete = async (id, name) => {
    try {
      await axios.delete(
        `https://mascotas-back.herokuapp.com/api/user/delete/${id}`
      );
      getUsers();
      setLoadingUsers(false);

      toast.success(`Se ha eliminado el usuario ${name}`);
    } catch (error) {
      toast.error(error.response.data.msg);

      setLoadingUsers(false);
    }
  };

  // handle onChange = get data from input
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    console.log(userData);
  };

  // handle form submit = update user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `https://mascotas-back.herokuapp.com/api/user/update/${auth.user_id}`,
        userData
      );
      // router.push("/");
      setLoading(false);
      toast.success("Usuario actualizado con éxito");
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title={"Ajustes"} />

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
                <div className={s.settings__update}>
                  <h1 className={s.settings__update__title}>
                    Actualizar cuenta
                  </h1>
                  <form
                    className={s.settings__update__form}
                    onSubmit={handleSubmit}
                  >
                    <FormControl
                      id="username"
                      isRequired
                      className={s.settings__update__form__item}
                    >
                      <p>Usuario</p>
                      {auth && (
                        <Input
                          disabled
                          name="username"
                          type="text"
                          value={auth.username}
                          maxWidth="300px"
                        />
                      )}
                    </FormControl>
                    <FormControl
                      id="name"
                      isRequired
                      className={s.settings__update__form__item}
                    >
                      <p>Usuario</p>
                      {auth && (
                        <Input
                          name="name"
                          type="text"
                          defaultValue={auth && auth.name}
                          onChange={handleChange}
                          maxWidth="300px"
                        />
                      )}
                    </FormControl>
                    <FormControl
                      id="email"
                      isRequired
                      className={s.settings__update__form__item}
                    >
                      <p>Correo electr&oacute;nico </p>
                      {auth && (
                        <Input
                          name="email"
                          type="text"
                          defaultValue={auth && auth.email}
                          onChange={handleChange}
                          maxWidth="300px"
                        />
                      )}
                    </FormControl>

                    <FormControl
                      id="password"
                      isRequired
                      className={s.settings__update__form__item}
                    >
                      <p> Contrase&ntilde;a </p>
                      <Input
                        name="password"
                        type="text"
                        placeholder="Nueva contrase&ntilde;a"
                        onChange={handleChange}
                        maxWidth="300px"
                      />
                    </FormControl>
                    <FormControl
                      id="repeatPassword"
                      isRequired
                      className={s.settings__update__form__item}
                    >
                      <p>Repetir contrase&ntilde;a</p>
                      <Input
                        name="repeatPassword"
                        type="text"
                        placeholder="Repetir contrase&ntilde;a"
                        onChange={handleChange}
                        maxWidth="300px"
                      />
                    </FormControl>
                    <div className={s.settings__form__button__container}>
                      <button
                        className={
                          loading
                            ? s.settings__form__button__disabled
                            : s.settings__form__button
                        }
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Cargando..." : "Actualizar datos"}
                      </button>
                    </div>
                  </form>
                </div>
                {auth && auth.type === "A" && (
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
                                    {auth && doc.name !== auth.name && (
                                      <MenuItem
                                        icon={<DeleteIcon />}
                                        onClick={() =>
                                          handleDelete(doc.id, doc.name)
                                        }
                                      >
                                        Eliminar
                                      </MenuItem>
                                    )}
                                  </MenuList>
                                </Menu>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Setting;
