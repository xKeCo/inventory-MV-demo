// React
import { useEffect, useContext } from "react";

// Next
import { useRouter } from "next/router";

// Local Components
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import SEO from "../../components/SEO/SEO";

// Context
import AuthContext from "../../context/AuthProvider";

// Styles
import s from "../../styles/Order.module.css";
import useOrderByID from "../../hooks/useOrderByID";
import Loader from "../../components/Loader/Loader";
import {
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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Link from "next/link";

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
    loadingOrderByID,
    errorOrderByID,
    numOrderByID,
    getOrderByID,
  } = useOrderByID();

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
              <div className={s.Order}>
                <div className={s.Order__table}>
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
                            Nombre del producto
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Precio Unitario
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
                            Total
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
                            A&ntilde;adido por:
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
