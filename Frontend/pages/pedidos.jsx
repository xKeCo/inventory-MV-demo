// React
import { useRef, useEffect, useContext } from "react";

// Next
import { useRouter } from "next/router";
import Link from "next/link";

// Local Components
import { Loader, Navbar, Sidebar, SEO } from "../components/";

// Context
import AuthContext from "../context/AuthProvider";

// Excel
import { useDownloadExcel } from "react-export-table-to-excel";

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
  Text,
} from "@chakra-ui/react";

// Styles
import s from "../styles/Pedidos.module.css";

// Hooks
import { useOrdersArrived } from "../hooks/";

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
    getOrdersArrived,
  } = useOrdersArrived();

  // Ref of the table
  const tableRef = useRef(null);

  const tableHeader = [
    "ID",
    "Proveedor",
    "Fecha",
    "Cantidad",
    "Estado",
    "Manejo",
  ];

  // Donwload Excel
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Pedidos recibidos",
    sheet: "Recibidos",
  });

  useEffect(() => {
    getOrdersArrived();
  }, []);

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
                <Button
                  colorScheme="green"
                  onClick={onDownload}
                  className={s.order__arrive}
                >
                  Descargar reporte
                </Button>

                <div className={s.pedidos__table}>
                  <TableContainer w="100%" height="100%" ref={tableRef}>
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
