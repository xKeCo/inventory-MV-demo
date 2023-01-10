// React
import { useEffect, useContext } from "react";

// Next
import { useRouter } from "next/router";
import Link from "next/link";

// Local Components
import { Navbar, Sidebar, SEO, Loader } from "../../components/";

// Context
import AuthContext from "../../context/AuthProvider";

// Styles
import s from "../../styles/Order.module.css";

// Hooks
import { useOrderByID, useOrders } from "../../hooks/";

// Chakra UI
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
// Chakra UI Icons
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

// Axios
import axios from "axios";

// React hot toast
import { toast } from "react-hot-toast";

function Order() {
  // User context = User data
  const { auth } = useContext(AuthContext);

  // Router = Redirect
  const router = useRouter();
  const ID = router.query.order;

  // redirect to home if already logged in
  if (!auth) {
    router.push("/login");
  }

  const {
    docsOrderByID,
    order_status,
    setOrder_status,
    loadingOrderByID,
    errorOrderByID,
    setLoadingOrderByID,
    getOrderByID,
  } = useOrderByID();

  const { getOrders, setLoadingOrders } = useOrders();

  // Get the token from local storage to verrify if the user is logged in
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleArrived = async (e) => {
    e.preventDefault();
    setOrder_status(!order_status);

    try {
      await axios.patch(
        `https://mascotas-back.onrender.com/api/order/update-order/${ID}`,
        {
          order_status: !order_status,
        },
        config
      );
      getOrders();
      setLoadingOrders(false);
      setLoadingOrderByID(false);

      if (!order_status) {
        toast.success("Pedido marcado como entregado");
      } else {
        toast.error("Pedido marcado como no entregado");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.msg);
      setLoadingOrders(false);
      setLoadingOrderByID(false);
    }
  };

  const tableHeader = [
    "ID",
    "Nombre del producto",
    "Precio Unitario",
    "Cantidad",
    "Total",
    "Peso",
    "Unidad",
    "Añadido por:",
    "Manejo",
  ];

  useEffect(() => {
    getOrderByID(ID);
  }, [ID]);

  return (
    <div>
      <SEO title={"order"} />

      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <div className={s.order__header__container}>
            <h1 className={s.title}>Orden</h1>
            <h2 className={s.order__info__title}>
              Informaci&oacute;n de la orden - {router.query.order}
            </h2>
          </div>

          {loadingOrderByID ? (
            <Loader />
          ) : errorOrderByID ? (
            <h1>
              No se pueden mostrar los productos de esta orden en estos
              momentos, int&eacute;ntalo de nuevo mas tarde.
            </h1>
          ) : (
            <>
              <div className={s.order}>
                <div className={s.order__button__container}>
                  <Link href={`/orders/add/${ID}`}>
                    <Button
                      className={s.order__arrive}
                      colorScheme="blue"
                      isDisabled={order_status}
                    >
                      Agregar productos
                    </Button>
                  </Link>
                  <Button
                    className={s.order__arrive}
                    colorScheme={order_status ? "red" : "green"}
                    onClick={handleArrived}
                    isDisabled={order_status}
                  >
                    {order_status
                      ? " Orden entregada"
                      : "Marcar orden como entregada"}
                  </Button>
                </div>
                <div className={s.order__table}>
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
                        {docsOrderByID.map((doc) => (
                          <Tr key={doc.orderDetailID}>
                            <Td
                              fontWeight="500"
                              fontSize="15px"
                              className={s.id}
                            >
                              {doc.orderDetailID}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.prodName}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.unit_price}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.quantity}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.total}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.weigth}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.measure}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.adding_by}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              <Menu>
                                <MenuButton
                                  isDisabled
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
                                    <MenuItem icon={<EditIcon />} isDisabled>
                                      Modificar
                                    </MenuItem>
                                  </Link>
                                  <MenuItem
                                    isDisabled
                                    icon={<DeleteIcon />}
                                    // onClick={() =>
                                    //   handleDelete(doc.id, doc.name)
                                    // }
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
    </div>
  );
}

export default Order;
