// React
import { useState, useContext } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Local Components
import Navbar from "../../components/Navbar/Navbar";
import Loader from "../../components/Loader/Loader";
import Sidebar from "../../components/Sidebar/Sidebar";
import SEO from "../../components/SEO/SEO";
import DrawerOrder from "../../components/Drawer/DrawerOrder";

// Context
import AuthContext from "../../context/AuthProvider";

// Styles
import s from "../../styles/Order.module.css";

// Hooks
import useOrders from "../../hooks/useOrders";
import useProvs from "../../hooks/useProvs";

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
  Text,
} from "@chakra-ui/react";
// Chakra UI Icons
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

// Axios
import axios from "axios";

// React hot toast
import { toast } from "react-hot-toast";

function Orders() {
  // Provider Data
  const [orderData, setOrderData] = useState({
    provider: "",
  });

  // Get the token from local storage to verrify if the user is logged in
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Chakra UI Drawer handler
  const { isOpen, onOpen, onClose } = useDisclosure();

  // User context = User data
  const { auth } = useContext(AuthContext);

  // Router = Redirect
  const router = useRouter();

  // Get Order data from db
  const {
    docsOrders,
    loadingOrders,
    setLoadingOrders,
    errorOrders,
    getOrders,
  } = useOrders();
  // Get providers
  const { docsProvs } = useProvs();

  // handle input change = get data from inputs
  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit to post data = send data to db
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://mascotas-back-production.up.railway.app/api/order/new",
        orderData,
        config
      );
      getOrders();
      onClose();
      setLoadingOrders(false);
      toast.success("Se ha agregado el nuevo producto");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
      setLoadingOrders(false);
    }
  };

  const handleDelete = (id) => {
    try {
      axios.patch(
        `https://mascotas-back-production.up.railway.app/api/order/update-order/${id}`,
        {
          is_active: false,
        },
        config
      );
      getOrders();
      toast.success(`Se ha eliminado la orden ${id}`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  // redirect to login if it's not logged in
  if (!auth) {
    router.push("/login");
  }

  return (
    <>
      <SEO title={"Ordenes"} />

      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <div className={s.order__header__container}>
            <h1 className={s.title}>Ordenes</h1>
            <Button
              leftIcon={<AddIcon />}
              onClick={onOpen}
              className={s.order__add__button}
              disabled={errorOrders}
            >
              Nueva Orden
            </Button>
          </div>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <h1>
              No se pueden mostrar las ordenes en este momento, int&eacute;ntalo
              de nuevo mas tarde.
            </h1>
          ) : (
            <>
              <div className={s.order}>
                <div className={s.order__table}>
                  <TableContainer w="100%" height="100%">
                    <Table w="100%" variant="striped" size="sm">
                      <Thead>
                        <Tr>
                          <Th
                            w="150px"
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
                            Proveedor
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Fecha
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Cantidad
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Estado
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
                        {docsOrders.map((doc) => (
                          <Tr key={doc.id}>
                            <Td
                              fontWeight="500"
                              fontSize="15px"
                              className={s.id}
                            >
                              {doc.id}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.provName}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.date}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.count}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.arrive ? (
                                <Text fontSize="16px" color="green">
                                  Recibido
                                </Text>
                              ) : (
                                <Text fontSize="16px" color="black">
                                  En camino
                                </Text>
                              )}
                            </Td>
                            <Td>
                              {doc.count > 0 ? (
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
                                    <Link href={`/orders/${doc.id}`}>
                                      <MenuItem icon={<EditIcon />}>
                                        Mas info.
                                      </MenuItem>
                                    </Link>
                                    <MenuItem
                                      icon={<DeleteIcon />}
                                      onClick={() => handleDelete(doc.id)}
                                      isDisabled
                                    >
                                      Eliminar
                                    </MenuItem>
                                  </MenuList>
                                </Menu>
                              ) : (
                                <Link href={`/orders/add/${doc.id}`}>
                                  <Button colorScheme="blue" size="sm">
                                    Completar orden
                                  </Button>
                                </Link>
                              )}
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

      <DrawerOrder
        isOpen={isOpen}
        onClose={onClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        docsProvs={docsProvs}
        loadingOrders={loadingOrders}
      />
    </>
  );
}

export default Orders;
