// React
import { useState, useEffect, useContext } from "react";

// Next
import { useRouter } from "next/router";

// Local Components
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar.jsx";
import SEO from "../../../components/SEO/SEO";

// Context
import AuthContext from "../../../context/AuthProvider.jsx";

// Styles
import s from "../../../styles/Order.module.css";
import Loader from "../../../components/Loader/Loader";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import useProductByProv from "../../../hooks/useProductByProv";
import DrawerAddOrder from "../../../components/Drawer/DrawerAddOrder";
import { toast } from "react-hot-toast";
import axios from "axios";

function Order() {
  // User context = User data
  const { auth } = useContext(AuthContext);

  const [orderData, setOrderData] = useState({
    product_fk: "",
    price: "",
    quantity: "",
    measure: "",
    created_by: auth.name,
  });

  // Get the token from local storage to verrify if the user is logged in
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const [oneOrderData, setOneOrderData] = useState(null);

  // Chakra UI Drawer handler
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Router = Redirect
  const router = useRouter();
  const ID = router.query.order;

  // redirect to home if already logged in
  if (!auth) {
    router.push("/login");
  }

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
        `https://mascotas-back-production.up.railway.app/api/order/order/${ID}`,
        orderData,
        config
      );
      getProductByProv(ID);
      onClose();
      setLoadingProductByProv(false);
      toast.success("Se ha agregado el producto a la orden");
    } catch (error) {
      console.log(error);
      console.log(orderData);
      // toast.error(error.response.data.msg);
      setLoadingProductByProv(false);
    }
  };

  const {
    docsProductByProv,
    loadingProductByProv,
    errorProductByProv,
    setLoadingProductByProv,
    getProductByProv,
  } = useProductByProv();

  useEffect(() => {
    getProductByProv(ID);
  }, [ID]);

  return (
    <>
      <SEO title={"order"} />

      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Navbar />
          <div className={s.order__header__container}>
            <h1 className={s.title}>Orden</h1>
            <h2 className={s.order__info__title}>
              Agregar productos a la orden - {router.query.order}
            </h2>
          </div>

          {loadingProductByProv ? (
            <Loader />
          ) : errorProductByProv ? (
            <h1>
              No se pueden mostrar los productos de esta orden en estos
              momentos, int&eacute;ntalo de nuevo mas tarde.
            </h1>
          ) : (
            <>
              <div className={s.Order}>
                {docsProductByProv.length === 0 ? (
                  <h1 className={s.order__info__title}>
                    No hay productos ligados a este proveedor.
                  </h1>
                ) : (
                  <div className={s.Order__table}>
                    <TableContainer w="100%" height="100%">
                      <Table w="100%" variant="striped" size="sm">
                        <Thead>
                          <Tr>
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
                              Actual
                            </Th>
                            <Th
                              w="100px"
                              color="#000"
                              fontFamily="Inter, sans-serif"
                              fontSize="14px"
                            >
                              MASCOTA
                            </Th>
                            <Th
                              w="100px"
                              color="#000"
                              fontFamily="Inter, sans-serif"
                              fontSize="14px"
                            >
                              CATEGORIA
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
                              Manejo
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {docsProductByProv.map((doc) => (
                            <Tr key={doc.prodID}>
                              <Td fontWeight="500" fontSize="15px">
                                {doc.prodName}
                              </Td>
                              <Td fontWeight="500" fontSize="15px">
                                {doc.price}
                              </Td>
                              <Td fontWeight="500" fontSize="15px">
                                {doc.stock}
                              </Td>
                              <Td fontWeight="500" fontSize="15px">
                                {doc.pet_name}
                              </Td>
                              <Td fontWeight="500" fontSize="15px">
                                {doc.category_name}
                              </Td>
                              <Td fontWeight="500" fontSize="15px">
                                {doc.weigth}
                              </Td>
                              <Td fontWeight="500" fontSize="15px">
                                {doc.measure}
                              </Td>
                              <Td fontWeight="500" fontSize="15px">
                                <Button
                                  colorScheme="blue"
                                  size="sm"
                                  onClick={() => {
                                    setOrderData({
                                      ...orderData,
                                      product_fk: doc.prodID,
                                      price: doc.price,
                                      quantity: "",
                                      weigth: doc.weigth,
                                      measure: doc.measure,

                                      created_by: auth.name,
                                    });
                                    setOneOrderData(doc);
                                    onOpen();
                                  }}
                                >
                                  Agregar a la orden
                                </Button>
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

      <DrawerAddOrder
        isOpen={isOpen}
        onClose={onClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        oneOrderData={oneOrderData}
        loadingProductByProv={loadingProductByProv}
      />
    </>
  );
}

export default Order;
