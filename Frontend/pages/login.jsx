// React
import { useContext, useState } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Styles
import s from "../styles/Login.module.css";

// Local Components
import SEO from "../components/SEO/SEO";

// Chakra UI
import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
// Chakra UI Icons
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// Axios
import axios from "axios";

// Context
import AuthContext from "../context/AuthProvider.jsx";

// Toast notifications
import { toast } from "react-hot-toast";

function Login() {
  // Show and hide password
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // SetLoading
  const [loading, setloading] = useState(false);

  // Router
  const router = useRouter();

  // Credentials
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // User context = User data
  const { auth, setAuth } = useContext(AuthContext);

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const { data } = await axios.post(
        "https://mascotas-back.herokuapp.com/api/user/login",
        credentials
      );

      localStorage.setItem("token", data.token);

      setAuth(data);

      router.push("/");
      setloading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setloading(false);
    }
  };

  // redirect to home if already logged in
  if (auth) {
    router.push("/");
  }

  return (
    <>
      <SEO title={"Login"} />

      <div className={s.login}>
        <div className={s.login__image__container}>
          <img
            src="/logos/logoLogin.png"
            alt="Logo de mascotas del valle"
            width="100%"
          />
        </div>
        <form className={s.login__form__container} onSubmit={handleSubmit}>
          <div className={s.login__form__text__container}>
            <h1 className={s.login__form__text1}>Bienvenido,</h1>
            <p className={s.login__form__text2}>
              Inicia sesi&oacute;n para ingresar al panel.
            </p>
          </div>
          <FormControl id="email" isRequired className={s.login__form}>
            {/* <FormLabel>Usuario</FormLabel> */}
            <p>Usuario</p>
            <Input
              name="username"
              type="text"
              placeholder="Ingrese su usuario"
              onChange={handleChange}
            />
          </FormControl>

          {/* <FormLabel>Contrase&ntilde;a</FormLabel> */}
          <p>Contrase&ntilde;a</p>

          <FormControl id="password" isRequired className={s.login__form}>
            <InputGroup size="md">
              <Input
                name="password"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Ingrese su contrase&ntilde;a"
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <button
            className={
              loading ? s.login__form__button__disabled : s.login__form__button
            }
            type="submit"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
        <div className={s.forgot__password}>
          <p className={s.forgot__password__text}>
            ¿Olvidaste tu contrase&ntilde;a?
          </p>
          <Link href="/resetPassword">
            <p className={s.forgot__password__link}>Restablecer</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
