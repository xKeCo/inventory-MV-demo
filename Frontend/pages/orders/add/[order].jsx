// React
import { useState, useEffect, useContext } from "react";

// Next
import { useRouter } from "next/router";

// Local Components
import {
  Navbar,
  Sidebar,
  SEO,
  Loader,
  DrawerAddOrder,
} from "../../../components/";

// Context
import AuthContext from "../../../context/AuthProvider";

// Styles
import s from "../../../styles/Order.module.css";

// Hooks
import { useProductByProv } from "../../../hooks/";

// Chakra UI
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

// Axios
import axios from "axios";

// React hot toast
import { toast } from "react-hot-toast";

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
  const [oneOrderData, setOneOrderData] = useState(null);

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

  // Router = Redirect
  const router = useRouter();
  const ID = router.query.order;

  // redirect to home if already logged in
  if (!auth) {
    router.push("/login");
  }

  // hanlde change in the form inputs
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
        `https://mascotas-back.onrender.com/api/order/order/${ID}`,
        orderData,
        config
      );
      getProductByProv(ID);
      onClose();
      setLoadingProductByProv(false);
      toast.success("Se ha agregado el producto a la orden");
    } catch (error) {
      toast.error(error.response.data.msg);
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

  const tableHeader = [
    "Nombre del producto",
    "Precio Unitario",
    "Actual",
    "Mascota",
    "Categoria",
    "Peso",
    "Unidad",
    "Manejo",
  ];

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
              <div className={s.order}>
                {docsProductByProv.length === 0 ? (
                  <h1 className={s.order__info__title}>
                    No hay productos ligados a este proveedor.
                  </h1>
                ) : (
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
