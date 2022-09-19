import { useState } from "react";
import Head from "next/head";

// Styles
import s from "../styles/Login.module.css";

// Chakra UI
import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import axios from "axios";

function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const res = await axios.post(
      "https://mascotas-back.herokuapp.com/api/user/login",
      credentials
    );
    console.log(res);
  };

  return (
    <>
      <Head>
        <title>Mascotas del Valle - Login</title>
        <meta name="description" content="Login page of Mascotas del Valle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={s.login}>
        <div className={s.login__image__container}>
          <img
            src="/logoLogin.png"
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

          <button
            className={s.login__form__button}
            // isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className={s.forgot__password}>
          <p className={s.forgot__password__text}>
            ¿Olvidaste tu contrase&ntilde;a?
          </p>
          <Link href="/">
            <p className={s.forgot__password__link}>Restablecer</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
