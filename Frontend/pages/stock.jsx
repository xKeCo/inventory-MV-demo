// React
import { useContext, useEffect } from "react";

// Next
import Head from "next/head";
import { useRouter } from "next/router";

// Local Components
import Navbar from "../components/Navbar/Navbar";
import Loader from "../components/Loader/Loader";
import Sidebar from "../components/Sidebar/Sidebar";

// Context
import AuthContext from "../context/AuthProvider";

// Styles
import s from "../styles/Stock.module.css";

// Hooks
import useStock from "../hooks/useStock";

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
  Button,
} from "@chakra-ui/react";
// Chakra UI Icons
import { AddIcon, DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";

function Stock() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  const { docsStock, loadingStock, errorStock, setLoadingStock, getStock } =
    useStock();

  useEffect(() => {
    // redirect to login if it's not logged in
    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Mascotas del Valle - Stock</title>
        <meta name="description" content="Stock page of Mascotas del Valle" />
        <link rel="icon" href="/logos/icon_orange.png" />
      </Head>
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <h1 className={s.title}>Stock</h1>
          {loadingStock ? (
            <Loader />
          ) : errorStock ? (
            <p>Error</p>
          ) : (
            <>
              <div className={s.stock}>
                <div className={s.stock__table}>
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
                            Cant
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
                            Precio
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Prov
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Categor&iacute;a
                          </Th>
                          <Th
                            w="100px"
                            color="#000"
                            fontFamily="Inter, sans-serif"
                            fontSize="14px"
                          >
                            Mascota
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
                        {docsStock.map((doc) => (
                          <Tr key={doc.id}>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.id}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.name}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.stock}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.peso}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.unidad_medida}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.price}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.provName}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.categoryName}
                            </Td>
                            <Td fontWeight="500" fontSize="15px">
                              {doc.petName}
                            </Td>
                            <Td>
                              <Button isDisabled colorScheme="blue" size="sm">
                                A&ntilde;adir a pedido
                              </Button>
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

export default Stock;
