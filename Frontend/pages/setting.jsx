// React
import { useContext, useState, useRef } from "react";

// Next
import { useRouter } from "next/router";

// Context
import AuthContext from "../context/AuthProvider";

// Local Components
import { Navbar, Sidebar, SEO, Loader, DrawerUsers } from "../components/";

// Hooks
import { useUsers } from "../hooks";

// Chakra UI
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
  Button,
  useDisclosure,
} from "@chakra-ui/react";
// Chakra UI - Icons
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

// Styles
import s from "../styles/Setting.module.css";

// Axios
import axios from "axios";

// react-hot-toast notifications
import { toast } from "react-hot-toast";

function Setting() {
  // User context = User data
  const { auth, userAuth } = useContext(AuthContext);

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

  // Chakra UI Drawer handler
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Auto-select first input on drawer open
  const firstField = useRef();

  // Data State = Users data
  const [userData, setUserData] = useState({
    name: auth?.name || "",
    email: auth?.email || "",
  });

  const [userDataUser, setUserDataUser] = useState({
    username: "",
    name: "",
    email: "",
    type: "",
    password: "",
  });

  const [oneProvData, setOneProvData] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // redirect to login if it's not logged in
  if (!auth) {
    router.push("/login");
  }

  // Get users from db
  const { docsUsers, loadingUsers, errorUsers, setLoadingUsers, getUsers } =
    useUsers();

  // handle delete = delete user
  const handleDelete = async (id, name) => {
    try {
      await axios.patch(
        `https://mascotas-back.onrender.com/api/user/delete/${id}`,
        {
          is_active: false,
        },
        config
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
  const handleChangeCurrentUser = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // handle onChange = get data from input
  const handleChangeUser = (e) => {
    setUserDataUser({
      ...userDataUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (oneProvData === null) {
        await axios.post(
          "https://mascotas-back.onrender.com/api/user/create",
          userDataUser,
          config
        );
        getUsers();
        setLoadingUsers(false);
        onClose();
        toast.success("Se ha agregado el nuevo usuario");
      } else {
        await axios.patch(
          `https://mascotas-back.onrender.com/api/user/update/${oneProvData.id}`,
          userDataUser,
          config
        );
        getUsers();
        setLoadingUsers(false);
        onClose();
        toast.success(`Se ha editado el usuario ${provData.name}`);
      }

      setOneProvData(null);
      setUserDataUser({
        username: "",
        name: "",
        email: "",
        type: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);

      setLoadingUsers(false);
    }
  };

  // handle form submit = update user data
  const handleUpdateCurrentUser = async (e, id) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(
        `https://mascotas-back.onrender.com/api/user/update/${id}`,
        userData,
        config
      );

      setLoading(false);
      getUsers();
      userAuth();

      toast.success("Usuario actualizado con éxito");
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
      setLoading(false);
    }
  };

  const tableHeader = [
    "ID",
    "Nombre",
    "Usuario",
    "Rol",
    "Correo",
    "Creado en:",
    "Creado por:",
    "Manejo",
  ];

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
          ) : (
            <>
              <div className={s.settings}>
                <div className={s.settings__update}>
                  <h1 className={s.settings__update__title}>
                    Actualizar cuenta
                  </h1>
                  <form
                    className={s.settings__update__form}
                    onSubmit={(e) => handleUpdateCurrentUser(e, auth.user_id)}
                  >
                    <FormControl
                      id="username"
                      isRequired
                      className={s.settings__update__form__item}
                    >
                      <p>Usuario</p>
                      <Input
                        disabled
                        name="username"
                        type="text"
                        value={auth?.username}
                        maxWidth="300px"
                      />
                    </FormControl>
                    <FormControl
                      id="name"
                      isRequired
                      className={s.settings__update__form__item}
                    >
                      <p>Nombre</p>
                      <Input
                        name="name"
                        type="text"
                        defaultValue={auth?.name}
                        onChange={handleChangeCurrentUser}
                        maxWidth="300px"
                      />
                    </FormControl>
                    <FormControl
                      id="email"
                      isRequired
                      className={s.settings__update__form__item}
                    >
                      <p>Correo electr&oacute;nico </p>
                      <Input
                        name="email"
                        type="text"
                        defaultValue={auth?.email}
                        onChange={handleChangeCurrentUser}
                        maxWidth="300px"
                      />
                    </FormControl>
                    <div className={s.settings__form__button__container}>
                      <button
                        className={
                          loading ||
                          (userData?.name === auth?.name &&
                            userData?.email === auth?.email)
                            ? s.settings__form__button__disabled
                            : s.settings__form__button
                        }
                        type="submit"
                        disabled={
                          loading ||
                          (userData?.name === auth?.name &&
                            userData?.email === auth?.email)
                        }
                      >
                        {loading ? "Cargando..." : "Actualizar datos"}
                      </button>
                    </div>
                  </form>
                </div>
                {errorUsers ? (
                  <h1>
                    No se pueden mostrar los usuarios registrados en este
                    momento, int&eacute;ntalo de nuevo mas tarde.
                  </h1>
                ) : (
                  auth &&
                  auth.type === "A" && (
                    <>
                      <div className={s.settings__header__container}>
                        <h1 className={s.settings__title__text}>Cuentas</h1>
                        <Button
                          leftIcon={<AddIcon />}
                          onClick={onOpen}
                          className={s.settings__add__button}
                        >
                          Nuevo usuario
                        </Button>
                      </div>
                      <div className={s.settings__table}>
                        <TableContainer w="100%" height="100%">
                          <Table w="100%" variant="striped" size="sm">
                            <Thead>
                              <Tr>
                                {tableHeader.map((header) => (
                                  <Th
                                    key={header}
                                    color="#000"
                                    fontFamily="Inter, sans-serif"
                                    fontSize="14px"
                                  >
                                    {header}
                                  </Th>
                                ))}
                              </Tr>
                            </Thead>
                            <Tbody>
                              {docsUsers.map((doc) => (
                                <Tr key={doc.id}>
                                  <Td
                                    fontWeight="500"
                                    fontSize="15px"
                                    className={s.id}
                                  >
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
                                  <Td fontWeight="500" fontSize="15px">
                                    {doc.created_by}
                                  </Td>
                                  <Td>
                                    <Menu>
                                      <MenuButton
                                        as={IconButton}
                                        aria-label="Options"
                                        backgroundColor="#e4531b"
                                        _hover={{
                                          backgroundColor: "#83bb26",
                                        }}
                                        _active={{
                                          backgroundColor: "#83bb26",
                                        }}
                                        icon={
                                          <EditIcon
                                            color="#fff"
                                            fontSize="20px"
                                          />
                                        }
                                        variant="outline"
                                        isDisabled={
                                          doc?.username === auth?.username
                                        }
                                      />
                                      <MenuList>
                                        <MenuItem
                                          icon={<EditIcon />}
                                          onClick={() => {
                                            setOneProvData(doc);
                                            setUserDataUser(doc);
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
                    </>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <DrawerUsers
        isOpen={isOpen}
        onClose={(event) => {
          onClose(event);
          setOneProvData(null);
          setUserDataUser({
            username: "",
            name: "",
            email: "",
            type: "",
            password: "",
          });
        }}
        firstField={firstField}
        handleChange={handleChangeUser}
        handleSubmit={handleSubmit}
        loadingUsers={loadingUsers}
        oneProvData={oneProvData}
        userDataUser={userDataUser}
      />
    </>
  );
}

export default Setting;
