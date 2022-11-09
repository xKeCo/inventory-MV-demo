// React
import { useContext } from "react";

// Next
import { useRouter } from "next/router";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import SEO from "../components/SEO/SEO";

// Context
import AuthContext from "../context/AuthProvider";

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
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

// Styles
import s from "../styles/Pedidos.module.css";
import useOrdersArrived from "../hooks/useOrdersArrived";
import Loader from "../components/Loader/Loader";
import Link from "next/link";

function Pedidos() {
  // User context = User data
  const { auth } = useContext(AuthContext);

  // Router = Redirect
  const router = useRouter();

  // redirect to home if already logged in
  if (!auth) {
    router.push("/login");
  }

  const {
    docsOrdersArrived,
    loadingOrdersArrived,
    errorOrdersArrived,
    setLoadingOrdersArrived,
    getOrdersArrived,
  } = useOrdersArrived();

  return (
    <>
      <SEO title={"Pedidos"} />

      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <div className={s.pedidos__header__container}>
            <h1 className={s.title}>Pedidos</h1>
          </div>
          {loadingOrdersArrived ? (
            <Loader />
          ) : errorOrdersArrived ? (
            <h1>
              No se pueden mostrar las ordenes recibidas en este momento,
              int&eacute;ntalo de nuevo mas tarde.
            </h1>
          ) : (
            <>
              <div className={s.pedidos}>
                <div className={s.pedidos__table}>
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
                        {docsOrdersArrived.map((doc) => (
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
                              <Link href={`/orders/${doc.id}`}>
                                <Button colorScheme="blue" size="sm">
                                  Ver info.
                                </Button>
                              </Link>
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

export default Pedidos;
